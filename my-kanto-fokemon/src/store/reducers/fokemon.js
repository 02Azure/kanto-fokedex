import { 
  SET_FOKEMON
} from "../constants"

export default function fokemon(state = {}, action) {
  let { type, payload } = action

  if(type === SET_FOKEMON) {
    return payload
  }

  return state
}