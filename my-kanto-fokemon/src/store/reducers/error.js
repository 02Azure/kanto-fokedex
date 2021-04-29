import { 
  SET_ERROR
} from "../constants"

export default function error(state = {}, action) {
  let { type, payload } = action

  if(type === SET_ERROR) {
    return payload
  }

  return state
}