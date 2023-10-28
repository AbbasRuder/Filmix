import useFetch from '../../hooks/useFetch'
// -react-router
import { useParams } from 'react-router-dom'
// -components
import MainDetails from './mainDetails/MainDetails'
import Cast from './cast/cast'

export default function Details() {

  const { mediaType, id } = useParams()

  const { data: CreditsData, loading: CreditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
  const { data: VideoData } = useFetch(`/${mediaType}/${id}/videos`)

  return (
    <>
      <MainDetails trailer={VideoData?.results[0]} crew={CreditsData?.crew} />
      <Cast castData={CreditsData?.cast} loading={CreditsLoading}/>
    </>
  )
}
