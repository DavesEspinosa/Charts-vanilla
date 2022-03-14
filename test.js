// Import stylesheets
import './style.css';
import ApexCharts from  'apexcharts'

async function petition() {
  try{
  //   const query = Object.keys({ user, pass, device })
  //   .map((k) => {
  //     return (
  //       encodeURIComponent(k) +
  //       "=" +
  //       encodeURIComponent({ user, pass, device }[k])
  //     );
  //   })
  //   .join("&");

  // fetch("https://dev.perseo.tv/ws/Login.php", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   mode: "cors",
  //   body: query,
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const token = data.token;
  //     if (token !== "") {
  //       localStorage.setItem("token", token);
  //     }
    // const headers = {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    //     "x-rapidapi-key": "4a192c5e44mshc97b1a2d4b82251p137cb0jsnfb7ef90cb4af"
    //   }
    // }
    const response = await fetch("https://swapi.dev/api/people")
    const data = await response.json();
    handleData(data)
  }catch (error){
    console.log(error)
  }
};

const test = (results) => {
  const array = results.map(numbers => {
    return numbers.height
})
  return array
}

const handleData = (data) => {
  const {results} = data
  console.log(results)
  // Write Javascript code!
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `<h1>JS Starter</h1>`;


  var options = {
    series: [{
    name: 'height',
    data: test(results)
  }],
    chart: {
    type: 'bar',
    height: 440
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
    categories: results.map(names => names.name),
  }
  };

  var chart = new ApexCharts(document.querySelector("#app"), options);
  chart.render();

}

  petition()

