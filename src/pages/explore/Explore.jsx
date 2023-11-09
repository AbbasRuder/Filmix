import "./style.scss"
import { useState, useEffect } from 'react'
// -helpers
import fetchDataFromApi from '../../utils/fetchData'
import useFetch from "../../hooks/useFetch";
// -libraries
import { useParams } from 'react-router-dom'
import Select from "react-select"
import InfiniteScroll from "react-infinite-scroll-component";
// -components
import {
  ContentWrapper,
  MovieCards,
  Spinner
} from "../../components"


// -filtering options for sortby for movies and tv-shows
const sortByDataForTV = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending", },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const sortByDataForMovies = [
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
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const { mediaType } = useParams()

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = (params) => {
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}`, params)
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
    setGenre(null)
    setSortBy(null)
    // -fetching initial data with no parameters
    fetchInitialData()
  }, [mediaType])

  const handleFilterSelection = (selectedItem, action) => {
    if (action.name === "genres") {
      setGenre(selectedItem)
      if (action.action !== "clear") {
        let genreIds = selectedItem.map(genre => genre.id)
        genreIds = genreIds.join(',')
        filters.with_genres = genreIds
      } else {
        delete filters.with_genres
      }
    }

    if (action.name === "sortby") {
      setSortBy(selectedItem)
      if (action.action !== "clear") {
        filters.sort_by = selectedItem.value
      } else {
        delete filters.sort_by
      }
    }

    setPageNumber(1)
    // -fetching initial data with filter parameters
    fetchInitialData(filters)
  }

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === 'movie' ? 'Explore Movies' : 'Explore TV Shows'}
          </div>

          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              options={genresData?.genres}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id}
              onChange={handleFilterSelection}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />

            {/* notice in this Select, we are not using "getOptionLabel" and "getOptionValue", and that is because the object
                'sortByData' that we are using, already has `label` and `value` property which is what the react-select lib 
                looks for to use as label and value by default. */}
            <Select
              name="sortby"
              value={sortBy}
              options={mediaType === "movie" ? sortByDataForMovies : sortByDataForTV}
              onChange={handleFilterSelection}
              // -provides the clear icon to clear the selections. (don't have to explicitly define it in case of `multi` select but have to define it here)
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
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
