import { useState } from 'react'
import './style.scss'
// -libraries
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
// -hooks
import useFetch from '../../../hooks/useFetch'
// -components
import {
    ContentWrapper,
    Genres,
    Img,
    MovieRatingCircle,
    VideoPopup
} from '../../../components'
import PlayIcon from '../playIcon/PlayIcon'
// -assets
import FallbackPoster from '../../../assets/no-poster.png'


export default function DetailsBanner({ trailer, crew }) {
    const [show, setShow] = useState(false)
    const [videoID, setVideoID] = useState(null)

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector(state => state.home)
    const poster = data?.poster_path ? url.backdrop + data.poster_path : FallbackPoster

    const genreID = data?.genres?.map(genre => genre.id)

    const directors = crew?.filter(item => item.job === 'Director')
    const writers = crew?.filter(item => item.job === "Writer" || item.job === "Screenplay" || item.job === "Story")

    // -changing total minutes into hours and minutes --> 114 to 1h 54m
    const toHourAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""}`
    }

    // -handling the movie trailer popup states
    const handleTrailerVideoPopup = () => {
        setShow(true)
        setVideoID(trailer?.key)
    }

    // -to display movie/tv-shows information's
    const movieInfo = (label, info) => {
        return (
            <div className="infoItem">
                <span className="text bold">
                    {label}
                </span>
                <span className="text">
                    {info}
                </span>
            </div>
        )
    }

    // -more info (cast, crew and creators)
    const movieCreationInfo = (label, itemsArray) => {
        return (
            <div className="info">
                <span className="text bold">
                    {label}
                </span>
                <div className="text">
                    {itemsArray.map((item, index) => {
                        return (
                            <span key={item.id}>
                                {item.name}
                                {/* For multiple items -> commas between each items except the last one */}
                                {itemsArray.length - 1 !== index && ", "}
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="detailsBanner">
            {loading ? (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            ) : (
                data && (
                    <>
                        <div className="backdrop-img">
                            <Img src={url.backdrop + data.backdrop_path} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    <Img src={poster} className='posterImg' />
                                </div>

                                <div className="right">
                                    <div className="title">
                                        {`${data.name || data.title} (${dayjs(data?.release_date || data.first_air_date).format("YYYY")})`}
                                    </div>
                                    <div className="subtitle">
                                        {data.tagline}
                                    </div>

                                    <Genres genreID={genreID} />

                                    <div className="row">
                                        <MovieRatingCircle rating={data.vote_average.toFixed(1)} />
                                        <div
                                            className="playbtn"
                                            onClick={handleTrailerVideoPopup}
                                        >
                                            <PlayIcon />
                                            <span className="text">Watch Trailer</span>
                                        </div>
                                    </div>

                                    <div className="overview">
                                        <div className="heading">
                                            Overview
                                        </div>
                                        <div className="description">
                                            {data.overview}
                                        </div>
                                    </div>

                                    <div className="info">
                                        {data.status && movieInfo("Status:", data.status)}
                                        {
                                            (data.release_date || data.first_air_date) &&
                                            movieInfo(
                                                "Release Date:",
                                                dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")
                                            )
                                        }
                                        {data.runtime && movieInfo("Runtime:", toHourAndMinutes(data.runtime))}
                                    </div>

                                    {directors?.length > 0 && movieCreationInfo("Director:", directors)}
                                    {writers?.length > 0 && movieCreationInfo("Writer", writers)}
                                    {data?.created_by?.length > 0 && movieCreationInfo("Creator:", data.created_by)}
                                </div>
                            </div>

                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoID={videoID}
                                setVideoID={setVideoID}
                            />
                        </ContentWrapper>
                    </>
                )
            )}
        </div>
    )
}
