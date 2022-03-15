import ApexCharts from 'apexcharts';

export const handleAttribute = (games, platforms, attributes) => {
  const attrIncrease = attributes.filter(attribute => attribute !== 'platform')
  
  const attributesFiltered = attrIncrease.filter(attribute => !attribute.includes('_increase'))
console.log(attributesFiltered)
attributesFiltered.forEach(attribute => {
    const chart = document.createElement('div');
    chart.setAttribute("id", attribute);
    document.body.appendChild(chart);
    handleData(games, platforms, attribute, attribute)

  })
}

export const handleData = (games, platforms, attribute, selector) => {
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