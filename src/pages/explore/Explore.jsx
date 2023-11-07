import "./style.scss"
import { useState, useEffect } from 'react'
import fetchDataFromApi from '../../utils/fetchData'
// -libraries
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
// -components
import {
  ContentWrapper,
  MovieCards,
  Spinner
} from "../../components"


// -filtering options
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending", },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "revenue.desc", label: "Revenue Descending" },
  { value: "revenue.asc", label: "Revenue Ascending" },
];

// -api parameters for filtering
const filters = {}

export default function Explore() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  const { mediaType } = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}`, filters)
      .then(res => {
        setData(res)
        setPageNumber(2)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log("Error in fetching data,", error)
      })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNumber}`, filters)
      .then(res => {
        setData(currentPageData => {
          return {
            ...currentPageData,
            results: [...currentPageData.results, ...res.results]
          }
        })
        setPageNumber(pageNo => pageNo + 1)
      })
      .catch(error => {
        console.log("Error in fetching data,", error)
      })
  }

  useEffect(() => {
    fetchInitialData()
  }, [mediaType])

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === 'movie' ? 'Explore Movies' : 'Explore TV Shows'}
          </div>
        </div>

        {loading ?
          (
            <Spinner initial={true} />
          ) :
          (
            <ContentWrapper>

              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results?.map(item => {
                    if (item.media_type === "person") return
                    return (
                      <MovieCards
                        key={item.id}
                        data={item}
                        mediaType={mediaType}
                      />
                    )
                  })}
                </InfiniteScroll>
              ) : (
                <span className="resultNotFound">
                  Sorry, Results not found!
                </span>
              )}
            </ContentWrapper>
          )
        }
      </ContentWrapper>
    </div>
  )
}
