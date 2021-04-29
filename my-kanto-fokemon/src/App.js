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
import Navbar from "./components/navbar.jsx"

function App() {
    return(
    <Router>
      <Navbar />
      <Switch>
        <Route path="/fokedex/:id">
          <FokemonDetail />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    )
}

export default App;
