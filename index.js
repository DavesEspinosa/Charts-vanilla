// Import stylesheets
import './style.css';
import ApexCharts from  'apexcharts'

async function petition() {
  try{
    // const headers = {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    //     "x-rapidapi-key": "4a192c5e44mshc97b1a2d4b82251p137cb0jsnfb7ef90cb4af"
    //   }
    // }
    const response = await fetch("https://yoga-app-m1.herokuapp.com/yoga")
    const data =  await response.json();
    handleData(data)
  }catch (error){
    console.log(error)
  }
};

const handleData = (data) => {
  console.log(data)
  // Write Javascript code!
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `<h1>JS Starter</h1>`;

  var options = {
    series: [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
      'United States', 'China', 'Germany'
    ],
  }
  };

  var chart = new ApexCharts(document.querySelector("#app"), options);
  chart.render();

}

petition()

