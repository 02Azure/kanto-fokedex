import { combineReducers } from "redux"
import error from "./error"
import favorites from "./favorites"
import fokemon from "./fokemon"
import fokemons from "./fokemons"

export default combineReducers({
  error,
  favorites,
  fokemon,
  fokemons
})
