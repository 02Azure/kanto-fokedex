import './App.css';
import React from "react"
import Home from "./views/Home.jsx"
import FokemonDetail from './views/FokemonDetail.jsx'

class App extends React.Component {
  render() {
    return(
      <>
        {/* <Home /> */}
        <FokemonDetail/>
      </>
    )
  }
}

export default App;
