import { useEffect } from 'react'
// -utils
import fetchDataFromApi from './utils/fetchData'
// -redux
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
// -react-router 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
  Footer,
  Layout
} from './components'


export default function App() {
  const dispatch = useDispatch()
  const url = useSelector(state => state.home.url)

  useEffect(() => {
    callFetchApi()
  }, [])

  const callFetchApi = () => {
    fetchDataFromApi("/configuration")
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }
        dispatch(getApiConfiguration(url))
      })
      .catch(error => console.log(error))
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/:mediaType/:id',
          element: <Details />
        },
        {
          path: '/search/:query',
          element: <SearchResult />
        },
        {
          path: '/explore/:mediaType',
          element: <Explore />
        },
        {
          path: '*',
          element: <PageNotFound />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
