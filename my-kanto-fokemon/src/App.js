import './App.css';
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "./views/Home.jsx"
import FokemonDetail from './views/FokemonDetail.jsx'

class App extends React.Component {
  render() {
    return(
    <Router>
      <div>
        <Switch>
          <Route path="/fokedex/:id">
            <FokemonDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
