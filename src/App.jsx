import { useEffect } from 'react'
// -utils
import fetchDataFromApi from './utils/fetchData'
// -redux
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
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
import { Layout } from './components'


export default function App() {
  const dispatch = useDispatch()
  const url = useSelector(state => state.home.url)

  useEffect(() => {
    callFetchApi()
    getAllGenres()
  }, [])

  // -fetching all the base url for images and saving it to the store
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

  // -fetching all the genre categories and saving it to the store
  const getAllGenres = async () => {
    const promises = []
    const mediaTypes = ['tv', 'movie']
    const allGenres = {}

    mediaTypes.forEach((type) => {
      promises.push(fetchDataFromApi(`/genre/${type}/list`))
    })

    const data = await Promise.all(promises)

    data.map(item => {
      item.genres.map(genreItem => allGenres[genreItem.id] = genreItem)
    })
    dispatch(getGenres(allGenres))
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
