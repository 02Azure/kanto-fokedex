import React from 'react'
import FokemonTile from '../components/fokemon-tile'

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

  addToFavorites = (fokemon) => () => {
    this.setState({
      favorites: [...this.state.favorites, fokemon]
    })
  }

  render() {
    let fokemonTiles = this.state.fokemons.map(fokemon => {

      return (
        <FokemonTile 
          id = { fokemon.id } 
          name = { fokemon.name }
          sprite = { fokemon.sprite }
          key = { fokemon.id }
          addToFavorites = { this.addToFavorites.bind(this) } 
        />
      )
    })

    let favoriteTiles = this.state.favorites.map((fokemon, i ) => {

      return (
        <FokemonTile 
          id = { fokemon.id } 
          name = { fokemon.name }
          sprite = { fokemon.sprite }
          key = { i }
        />
      )
    })

    return(
      <div id="home-page" className="page">
        <h2>Kanto Fokemon List</h2>

        <h3>My Favorites</h3>
        <div className="fokemon-container">
          { favoriteTiles }
        </div>

        <h3>All Pokemon ( Click to add to your favorites! )</h3>
        <div className="fokemon-container">
          { fokemonTiles }
        </div>
      </div>
    )
  }
}

export default Home