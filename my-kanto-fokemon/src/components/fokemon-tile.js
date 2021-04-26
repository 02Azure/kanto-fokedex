import React from 'react'

class FokemonTile extends React.Component {
  render() {
    let fokemon = {
      id: this.props.id,
      name: this.props.name,
      sprite: this.props.sprite
    }
    if(this.props.addToFavorites) {
      return (
        <div 
          className = "fokemon-tile" 
          key = { this.props.id }
          onClick = { this.props.addToFavorites(fokemon) } 
        >
          <span className="fokemon-name"> #{ this.props.id } { this.props.name } </span>
          <img className="sprite" src={ this.props.sprite } alt = { this.props.name + "_image" }></img>
        </div>
        )
        
    } else {
      return (
        <div 
          className = "fokemon-tile" 
          key = { this.props.id }
        >
          <span className="fokemon-name"> #{ this.props.id } { this.props.name } </span>
          <img className="sprite" src={ this.props.sprite } alt = { this.props.name + "_image" }></img>
        </div>
      )
    }

  }
}

export default FokemonTile