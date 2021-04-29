import { 
  SET_FOKEMONS
} from "../constants"

export default function fokemons(state = [], action) {
  let { type, payload } = action

  if(type === SET_FOKEMONS) {
    return payload
  }

  return state
}