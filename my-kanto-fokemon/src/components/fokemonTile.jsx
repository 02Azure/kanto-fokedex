import React from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addFavorites, removeFavorites } from "../store/actions"  

function FokemonTile(props) {
  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()
  let history = useHistory()

  function toFokemonDetail() {
    history.push(`/fokedex/${fokemon.id}`)
  }

  const addToFavorites = fokemon => event => {
    event.stopPropagation()
    if(!favorites.find(favFokemon => favFokemon.id === fokemon.id)) dispatch(addFavorites(fokemon)) 
  }

  const removeFromFavorites = fokemon => event => {
    event.stopPropagation()
    dispatch(removeFavorites(fokemon))
  }

  let fokemon = {
    id: props.id,
    name: props.name,
    sprite: props.sprite
  }

  return (
    <div 
      className = "fokemon-tile" 
      key = { fokemon.id }
      onClick = { toFokemonDetail }
    >
      <span className = "fokemon-name">
        #{ fokemon.id } { fokemon.name } 
      </span>
      <img 
        className = "sprite" 
        src = { fokemon.sprite } 
        alt = { fokemon.name + "_image" } 
      />
      { props.action === "add" ?       
        <i 
          className = "fa fa-star"
          title = "Add to My Favorites"
          onClick = { addToFavorites(fokemon) }
        /> :
        <i 
        className = "fa fa-times"
        title = "Remove from My Favorites"
        onClick = { removeFromFavorites(fokemon) }
        /> 
      }

    </div>
  )
}
export default FokemonTile