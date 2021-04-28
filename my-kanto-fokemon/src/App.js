import "./App.css"
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Home from "./views/Home.jsx"
import Favorites from "./views/Favorites"
import FokemonDetail from "./views/FokemonDetail.jsx"
import NotFound from "./views/NotFound.jsx"
import Navbar from "./components/navbar.jsx"

function App() {
  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()

  const addToFavorites = fokemon => event => {
    event.stopPropagation()
    if(!favorites.find(favFokemon => favFokemon.id === fokemon.id)) dispatch({ type: "favorites/add", payload: fokemon }) 
  }

  const removeFromFavorites = fokemon => event => {
    event.stopPropagation()
    dispatch({ type: "favorites/remove", payload: fokemon })
  }

    return(
    <Router>
      <Navbar />
      <Switch>
        <Route path="/fokedex/:id">
          <FokemonDetail />
        </Route>
        <Route path="/favorites">
          <Favorites 
            favorites = { favorites }
            removeFromFavorites = { removeFromFavorites }
          />
        </Route>
        <Route exact path="/">
          <Home
            addToFavorites = { addToFavorites }
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    )
}

export default App;
