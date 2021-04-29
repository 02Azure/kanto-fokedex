import { 
  ADD_FAVORITES,
  DEL_FAVORITES
} from "../constants"

export default function favorites(state = [], action) {
  let { type, payload } = action

  if(type === ADD_FAVORITES) {
    return[...state, payload ]

  } else if(type === DEL_FAVORITES) {
    let removedIndex = state.findIndex(favFokemon => favFokemon.id === payload.id)
    let newFavorite = [...state]
    newFavorite.splice(removedIndex, 1)

    return newFavorite

  }
  return state
}