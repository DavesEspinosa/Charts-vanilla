import ApexCharts from 'apexcharts';

export const handleData = (games, platforms, attribute) => {
  const initData = {};
  const dataSeries = []

  platforms.forEach((platform) => {
    initData[platform] = Array(games.length).fill(0);
  });
  console.log(initData);

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

  var chart = new ApexCharts(document.querySelector('#app'), options);
  chart.render();
};