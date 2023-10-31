import "./style.scss"
import useFetch from "../../../hooks/useFetch"
import { ContentWrapper, Carousel } from "../../../components"


export default function Recommendations({ mediaType, id }) {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)

  return (
    data?.results.length > 0 && (
      <>
        <ContentWrapper>
          <div className="title">
            Recommendations
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
