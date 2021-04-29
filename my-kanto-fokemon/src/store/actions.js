export const SET_FOKEMONS = "fokemons/set"
export const SET_FOKEMON = "fokemon/set"
export const ADD_FAVORITES = "favorites/add"
export const DEL_FAVORITES = "favorites/remove"
export const SET_ERROR = "error/set"

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
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => { 
        if(!response.ok) {
          let error = new Error(response.statusText)
          error.code = response.status
          throw error
        } 
        return response.json()
      })

      .then(data => {
        data.results.forEach((fokemon, i) => {
          fokemon.id = i + 1
          fokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
        })
        dispatch(setFokemons(data.results))
      })

      .catch(err => {
        dispatch(setError(err))
      })
  }
}

export function fetchFokemonDetail(id) {
  return dispatch => {
    let mainDetail = {}

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resMain => {
        if(!resMain.ok) {
          let error = new Error(resMain.statusText)
          error.code = resMain.status
          throw error
        } 
        return resMain.json()
      })

      .then(mainData => {
        mainDetail = mainData
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      })

      .then(resSecondary => {
        if(!resSecondary.ok) {
          let error = new Error(resSecondary.statusText)
          error.code = resSecondary.status
          throw error
        }
        return resSecondary.json()
      })

      .then(secondaryDetail => {
        let { id, name, height, weight, types } = mainDetail
        name = name[0].toUpperCase() + name.slice(1)
        height /= 10
        weight /= 10
        types = types.map(typeNum => typeNum.type.name[0].toUpperCase() + typeNum.type.name.slice(1)).join("/")

        let flavor_text = secondaryDetail.flavor_text_entries[0].flavor_text
        flavor_text = flavor_text.split(".").join(". ")

        let form = secondaryDetail.egg_groups[0].name
        form = form[0].toUpperCase() + form.slice(1)

        let fokemonData = {
          id, name, form, height, weight, types, flavor_text
        }

        dispatch(setFokemon(fokemonData))
      })

    .catch(err => {
      dispatch(setError(err))
    })
  }  
}