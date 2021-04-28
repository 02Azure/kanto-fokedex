import "./App.css"
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "./views/Home.jsx"
import Favorites from "./views/Favorites"
import FokemonDetail from "./views/FokemonDetail.jsx"
import NotFound from "./views/NotFound.jsx"
import useFavFokemons from "./hooks/useFavFokemons.jsx"

function App() {
  const { favorites, addToFavorites, removeFromFavorites } = useFavFokemons()

    return(
    <Router>
      <div>
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
      </div>
    </Router>
    )
}

export default App;
