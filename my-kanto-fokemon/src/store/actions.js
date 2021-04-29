import { 
  SET_FOKEMONS,
  SET_FOKEMON,
  ADD_FAVORITES,
  DEL_FAVORITES,
  SET_ERROR 
} from "./constants" 

export function setFokemons(payload) {
  return { type: SET_FOKEMONS, payload }
}

export function setFokemon(payload) {
  return { type: SET_FOKEMON, payload }
}

export function addFavorites(payload) {
  return { type: ADD_FAVORITES, payload }
}

export function removeFavorites(payload) {
  return { type: DEL_FAVORITES, payload }
}

export function setError(payload) {
  return { type: SET_ERROR, payload }
}

export function fetchFokemons() {
  return dispatch => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  }
}

export function fetchFokemonDetail(id) {
  return dispatch => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }  
}