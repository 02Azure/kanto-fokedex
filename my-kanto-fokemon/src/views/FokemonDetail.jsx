import { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchFokemonDetail, setFokemon } from "../store/actions.js"
import LoadingFokeball from "../components/loadingFokeball.jsx"

function FokemonDetail() {
  const dispatch = useDispatch()
  const fokemon = useSelector(state => state.fokemon)
  const error = useSelector(state => state.error)
  const [loading, setLoading] = useState(true)
  let history = useHistory()
  let { id } = useParams()
  
  useEffect(() => {
    dispatch(fetchFokemonDetail(id))

    return () => {
      dispatch(setFokemon({})) //reset fokemon biar kalau masuk lagi fokemon id akan kosong sehingga tidak men trigger fokemon.id
    }
  }, [id])

  useEffect(() => {
    if(fokemon.id) { //kondisional agar saat mounted tidak langsung ganti setloading ke false
      setTimeout(() => {
        setLoading(false)
      }, 900)

    } else if(error.code) { //jika fokemon.id tidak ada ( alias error di fetch )
      if(error.code === 404) {
        history.push("/notfound")
      }
    }
  }, [fokemon, error])

  return(
    <div id="fokemon-detail-page" className="page">
      { loading ? 
        <div className="loading-container">
          <LoadingFokeball msg="Loading Fokemon data..." /> 
        </div> 
      :
        <>
          <h2>{ "#" + fokemon.id + " " + fokemon.name }</h2>
          <hr/>
          
          <div id="fokemon-detail-container">
            <div id="fokemon-detail">
              <div id="fokebody-info">
                <h3 id="fokemon-form">{ fokemon.form } Fokemon</h3>
                <br/>

                <table>
                  <tbody>
                    <tr>
                      <th>Type</th>
                      <td>{ fokemon.types }</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{ fokemon.height} m</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{ fokemon.weight} kg</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div id="fokemon-main-image-container">
                <img 
                  id = "fokemon-main-image" 
                  src = { `https://pokeres.bastionbot.org/images/pokemon/${fokemon.id}.png`} 
                  alt = { fokemon.name + "_image" }
                />
              </div>
            </div>
          </div>

          <br/>
          <div id="fokemon-flavor-text">{ fokemon.flavor_text }</div>
          <Link className="return-link" to="/">Return</Link>
        </>
      }
    </div>
  )
}

export default FokemonDetail