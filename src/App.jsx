import { useEffect } from 'react'
import './App.css'
// -utils
import fetchData from './utils/fetchData'
// -redux
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
// -components
import {
  PageNotFound,
  Details,
  Explore,
  Home,
  SearchResult
} from "./pages"
import {
  Header,
  Footer
} from './components'


export default function App() {
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
      <h1>
        Movie app setup
      </h1>

      <Home />
      <Details />
      <PageNotFound />
      <Explore />
      <SearchResult />

      <Header />
      <Footer />
    </>
  )
}
