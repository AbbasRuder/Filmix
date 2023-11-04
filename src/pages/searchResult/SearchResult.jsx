import { useEffect, useState } from 'react'
import "./style.scss"
// -utils
import fetchDataFromApi from '../../utils/fetchData'
// -components
import { ContentWrapper, MovieCards, Spinner } from "../../components"
// -libraries
import { useParams } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'


export default function SearchResult() {
  const [searchData, setSearchData] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  // -fetch the data for the next page (called by 'InfiniteScroll' component)
  const fetchNextPageData = async () => {
    try {
      const nextPageData = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumber}`)
      setSearchData(currentPageData => {
        return { ...currentPageData, results: [...currentPageData.results, ...nextPageData.results] }
      })
      setPageNumber(currentPage => currentPage + 1)
    } catch (error) {
      console.log("Error in fetching next page data", error)
    }
  }

  useEffect(() => {
    // -reset to 1 since the new search results should start from page 1
    setPageNumber(1)

    // - fetch the data on the initial loading
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        const data = await fetchDataFromApi(`/search/multi?query=${query}&page=1`)
        setSearchData({...data, searchQuery: query})
        setPageNumber(2)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("Error in fetching data", error)
      }
    }

    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading ?
        (
          <Spinner initial={true} />
        ) :
        (
          <ContentWrapper>

            {searchData?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search results for ${query}`}
                </div>

                <InfiniteScroll
                  className='content'
                  dataLength={searchData?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= searchData?.total_pages}
                  loader={<Spinner />}
                >
                  {searchData?.results?.map(item => {
                    if (item.media_type === "person") return
                    return (
                      <MovieCards
                        key={item.id}
                        data={item}
                        fromSearch={true}
                      />
                    )
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
          </ContentWrapper>
        )
      }
    </div >
  )
}
