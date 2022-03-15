import ApexCharts from 'apexcharts';

export const handleAttribute = (games, platforms, attributes) => {
  const attributesFiltered = attributes.filter(attribute => attribute !== 'platform').filter(attribute => !attribute.includes('_increase'))

  attributesFiltered.forEach(attribute => {
    const app = document.querySelector('#app')
    const chart = document.createElement('div');
    chart.setAttribute("id", attribute);
    app.appendChild(chart);
    handleData(games, platforms, attribute)
  })
}

const handleData = (games, platforms, attribute) => {
  const initData = {};
  const dataSeries = []

  platforms.forEach((platform) => {
    initData[platform] = Array(games.length).fill(0);
  });
  
  const data = games.reduce((prev, curr, gameIndex) => {
    //prev es el initData creado para albergar las plataformas de forma dinamica
    //curr es el juego que se esta iterando en ése momento
    //se entra dentro del curr(game) para iterar en cada platform_data
    //
    curr.platform_data.forEach((platformData) => {
      //accesing to initdata object throw platfomr key on that precise index of games
      //accesing straight to the value of that concrete parameter throw the key
      // if(platformData[attribute]) prev[platformData.platform][gameIndex] = ((platformData[attribute])*1e-4).toFixed(2);
      prev[platformData.platform][gameIndex] = platformData[attribute];

    });
    return prev;
  }, initData);
  
  console.log(data)
  Object.entries(data).map(item => {
    dataSeries.push({
      name: item[0].toUpperCase(),
      data: item[1]
    })
  })

  var options = {
    series: dataSeries,
    chart: {
      type: 'bar',
      height: 800,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 0.5,
      colors: ['#fff'],
    },
    title: {
      text: attribute.replace('_',' ').toUpperCase(),
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



  var chart = new ApexCharts(document.querySelector(`#${attribute}`), options);
  chart.render();
};