import React from 'react'
import loadingImg from "../assets/loadingFokeball.gif"

function LoadingFokeball(props) {
  return(
    <div id="loading-fokeball">
      <img 
        className = "loading-image"
        src = { loadingImg } 
        alt = "loadingFokeball.gif"
      /> 
      <h2 className="loading-text"> { props.msg }</h2>
    </div>
  )

}

export default LoadingFokeball