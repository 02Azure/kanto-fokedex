const initialState = {
  favorites: [],
  fokemons: [],
  fokemon: {}
}

function reducer(state = initialState, action) {
  let { type, payload } = action

  if(type === "fokemons/getAll") {
    return { ...state, fokemons: payload }

  } else if(type === "fokemon/getOne") {
    return { ...state, fokemon: payload }

  } else if(type === "favorites/add") {
    return { ...state, favorites: [...state.favorites, payload ]}
  
  } else if(type === "favorites/remove") {
    let removedIndex = state.favorites.findIndex(favFokemon => favFokemon.id === payload.id)
    let newFavorite = [...state.favorites]
    newFavorite.splice(removedIndex, 1)

    return { ...state, favorites: newFavorite}

  } else {
    return state
  }
}

export default reducer