import React from 'react'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      fokemons: [],
      favorites: []
    }
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        let fokemons = data.results

        fokemons.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })

        this.setState({
          fokemons
        })
      })
  }

  addToFavorites(event) {
    let index = event.target.id
    console.log(index)
    // this.setState({
    //   favorites: this.state.favorites.push()
    // })
  }

  render() {
    let fokemonTiles = this.state.fokemons.map(fokemon => {
      return (
      <div 
        id = { "fokemon-tile" + fokemon.id } 
        className = "fokemon-tile" 
        key = { fokemon.id }
        onClick = { this.addToFavorites.bind(this) } 
      >
        <span className="fokemon-name"> #{ fokemon.id } { fokemon.name } </span>
        <img className="sprite" src={ fokemon.sprite } alt = { fokemon.name + "_image" }></img>
      </div>
      )
    })

    return(
      <div id="home-page" className="page">
        <h2>Kanto Fokemon List</h2>
        <div className="fokemon-container">
          { fokemonTiles }
        </div>
      </div>
    )
  }
}

export default Home