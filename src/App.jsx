import { useEffect } from 'react'
import './App.css'
import fetchData from './utils/fetchData'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

function App() {
  const dispatch = useDispatch()
  const url = useSelector(state => state.home.url)
  console.log('url', url)


  useEffect(() => {
    fetchApiData()
  }, [])

  const fetchApiData = () => {
    fetchData("movie/popular")
      .then(res => {
        console.log(res)
        dispatch(getApiConfiguration(res))
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <p>
        Movie app setup
      </p>

    </>
  )
}

export default App
