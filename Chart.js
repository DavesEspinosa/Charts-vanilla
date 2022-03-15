import ApexCharts from 'apexcharts';

export const handleAttribute = (games, platforms, attributes) => {
  console.log(attributes)
  attributes.forEach(attribute => {
    switch (attribute) {
      case 'hours_watched':
        handleData(games, platforms, attribute, 'chart1')
        break;
      case 'airtime_hours':
        handleData(games, platforms, attribute, 'chart2')
        break;
      case 'average_viewers':
        handleData(games, platforms, attribute, 'chart3')
      break;
      default:
          break;
    } 
  })
}


export const handleData = (games, platforms, attribute, selector) => {
  console.log(selector)
  const initData = {};
  const dataSeries = []

  platforms.forEach((platform) => {
    initData[platform] = Array(games.length).fill(0);
  });

  const data = games.reduce((prev, curr, gameIndex) => {
    curr.platform_data.forEach((platformData) => {
      prev[platformData.platform][gameIndex] = platformData[attribute];
    });
    return prev;
  }, initData);

  Object.entries(data).map(item => {
    dataSeries.push({
      name: item[0].toUpperCase(),
      data: item[1]
    })
  })

  console.log(dataSeries)

  var options = {
    series: dataSeries,
    chart: {
      type: 'bar',
      height: 700,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: attribute,
    },
    xaxis: {
      title: {
        text: undefined,
      },
      type: 'category',
      categories: games.map((game) => game.game),
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  var chart = new ApexCharts(document.querySelector(`#${selector}`), options);
  chart.render();
};