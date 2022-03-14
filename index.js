// Import stylesheets
import './style.css';
import ApexCharts from  'apexcharts'

async function petition() {
  try{
      const response = await fetch("https://api.streamhatchet.com/discovery/games/month/2021-01?token=kx8Lm6spO9Lx6xNa8lNC51Kx20Qg65")
      const data = await response.json();
      handleData(data)
    }catch (error){
      console.log(error)
    }
};

const test = (results, value) => {
  const array = results.map(result => {
    switch(value){
      case 'Air Time':
        return result.airtime_hours
        
        case 'Peak Channels':
          return result.peak_channels
          
        case 'Average Viewers':
          return result.average_viewers
    
        default:
          break;
      }
      console.log(array)
  })
  return array
}

const handleData = (data) => {
  const { games } = data
  console.log(games)

  var options = {
    series: [{
      name: "Air Time",
      data: test(games, "Air Time")
    },
    {
      name: "Peak Channels",
      data: test(games, "Peak Channels")
    },
    {
      name: 'Average Viewers',
      data: test(games, "Average Viewers")
    }
  ],
    chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  title: {
    text: 'Page Statistics',
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
      '10 Jan', '11 Jan', '12 Jan'
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
  };

  var chart = new ApexCharts(document.querySelector("#app"), options);
  chart.render();

}

  petition()

