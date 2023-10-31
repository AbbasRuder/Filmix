import useFetch from '../../hooks/useFetch'
// -react-router
import { useParams } from 'react-router-dom'
// -components
import MainDetails from './mainDetails/MainDetails'
import Cast from './cast/cast'
import MovieVideos from './movieVideos/MovieVideos'

export default function Details() {

  const { mediaType, id } = useParams()

  const { data: CreditsData, loading: CreditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
  const { data: VideosData, loading: VideosLoading } = useFetch(`/${mediaType}/${id}/videos`)

  return (
    <>
      <MainDetails trailer={VideosData?.results[0]} crew={CreditsData?.crew} />
      <Cast castData={CreditsData?.cast} loading={CreditsLoading} />
      <MovieVideos videosData={VideosData} loading={VideosLoading} />
    </>
  )
}
