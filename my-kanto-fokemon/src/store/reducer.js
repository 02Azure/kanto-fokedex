import { 
  SET_FOKEMONS,
  SET_FOKEMON,
  ADD_FAVORITES,
  DEL_FAVORITES
} from "./actions"

const initialState = {
  favorites: [],
  fokemons: [],
  fokemon: {}
}

function reducer(state = initialState, action) {
  let { type, payload } = action

  if(type === SET_FOKEMONS) {
    return { ...state, fokemons: payload }

  } else if(type === SET_FOKEMON) {
    return { ...state, fokemon: payload }

  } else if(type === ADD_FAVORITES) {
    return { ...state, favorites: [...state.favorites, payload ]}
  
  } else if(type === DEL_FAVORITES) {
    let removedIndex = state.favorites.findIndex(favFokemon => favFokemon.id === payload.id)
    let newFavorite = [...state.favorites]
    newFavorite.splice(removedIndex, 1)

    return { ...state, favorites: newFavorite}

  } else {
    return state
  }
}

export default reducer