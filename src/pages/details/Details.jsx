import useFetch from '../../hooks/useFetch'
// -react-router
import { useParams } from 'react-router-dom'
// -components
import MainDetails from './mainDetails/MainDetails'

export default function Details() {

  const { mediaType, id } = useParams()

  const { data: CreditsData } = useFetch(`/${mediaType}/${id}/credits`)
  const { data: VideoData } = useFetch(`/${mediaType}/${id}/videos`)

  return (
    <>
      <MainDetails trailer={VideoData?.results[0]} crew={CreditsData?.crew} />
    </>
  )
}
