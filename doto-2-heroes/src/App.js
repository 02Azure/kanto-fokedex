import './App.css';
import React from 'react';
const base = "https://api.pandascore.co/dota2"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      iseng: 'state awal',
      heroes: []
    }
  }

  componentDidMount() {
    fetch(base + '/heroes/?token=' + process.env.REACT_APP_PANDASCORE_APIKEY)
    .then(response => response.json())
    .then(data => {
      this.setState({
        heroes: data
      })
      
    });

  }

  render() {
    console.log('hello')
    let heroTiles = this.state.heroes.map(hero => 
      <li key = { hero.id } className = "hero-tile">
        <p>{ hero.localized_name }</p>
        <img src = { hero.image_url } alt = "hero_image" />
      </li>
    )
    return (
      <div> 
        <ul>
          { heroTiles }
        </ul>
      </div>
    )
  }
}


export default App;