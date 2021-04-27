import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "./views/Home.jsx"
import FokemonDetail from './views/FokemonDetail.jsx'
import useFavFokemons from './hooks/useFavFokemons.jsx'

function App() {
  const { favorites, addToFavorites, removeFromFavorites } = useFavFokemons()

    return(
    <Router>
      <div>
        <Switch>
          <Route path="/fokedex/:id">
            <FokemonDetail />
          </Route>
          <Route path="/">
            <Home
              favorites = { favorites }
              addToFavorites = { addToFavorites }
              removeFromFavorites = { removeFromFavorites }
            />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default App;
