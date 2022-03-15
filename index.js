// Import stylesheets
import './style.css';
import { handleAttribute } from './Chart.js'

async function petition() {
  try{
      const response = await fetch("https://api.streamhatchet.com/discovery/games/month/2021-01?token=kx8Lm6spO9Lx6xNa8lNC61Kx20Ql37")
      const { games } = await response.json();
      const attributes = Object.keys(games[0]?.platform_data[0]) 
      const arrPlatforms = games.map(game => {
        return game.platform_data.map(platform=> {
            return platform.platform
        })
      })
      const platforms = [...new Set(arrPlatforms.flat())]
      
      handleAttribute(games, platforms, attributes)
      // handleData(games, platforms, 'hours_watched')
  } catch (error){
    console.log(error)
  }
};

petition()

