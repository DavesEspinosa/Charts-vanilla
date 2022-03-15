// Import stylesheets
import './style.css';
import { handleData } from './Chart.js'

async function petition() {
  try{
      const response = await fetch("https://api.streamhatchet.com/discovery/games/month/2021-01?token=kx8Lm6spO9Lx6xNa8lNC51Kx20Qg65")
      const data = await response.json();
      handleData(data)
  } catch (error){
    console.log(error)
  }
};

petition()

