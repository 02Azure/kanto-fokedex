export const SET_FOKEMONS = "fokemons/set"
export const SET_FOKEMON = "fokemon/set"
export const ADD_FAVORITES = "favorites/add"
export const DEL_FAVORITES = "favorites/remove"

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

