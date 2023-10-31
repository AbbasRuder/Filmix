import "./style.scss"
import useFetch from "../../../hooks/useFetch"
import { ContentWrapper, Carousel } from "../../../components"


export default function SimilarMovies({ mediaType, id }) {

  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)

  return (
    data?.results.length > 0 && (
      <>
        <ContentWrapper>
          <div className="title">
            Similar Movies
          </div>
        </ContentWrapper>
        <Carousel
          data={data}
          loading={loading}
          navigationType={mediaType}
        />
      </>
    )
  )
}
