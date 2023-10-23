import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
// -components
import { Img, ContentWrapper } from '../../../components'


export default function HeroBanner() {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const { backdrop } = useSelector(state => state.home.url)

  const { data, loading } = useFetch("/movie/upcoming")

  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  useEffect(() => {
    const imgUrl = backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(imgUrl)
  }, [data])

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop_img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer">

      </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for a movie or a TV show'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearchQuery}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
