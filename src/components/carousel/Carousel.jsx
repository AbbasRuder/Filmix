import "./style.scss";
import { useRef } from "react";
// -icons
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
// -components
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Img from '../lazyLoader/Img'
import MovieRatingCircle from "../movieRatingCircle/MovieRatingCircle";
import Genres from "../genres/Genres";
// -assets
import FallbackPoster from '../../assets/no-poster.png'
// -dayjs
import dayjs from "dayjs";
// -react-redux
import { useSelector } from "react-redux";
// -rrd
import { useNavigate } from "react-router-dom";

export default function Carousel({ data, loading, navigationType}) {

    const navigate = useNavigate()

    const { url } = useSelector(state => state.home)
    const posterURLInitials = url.poster

    const carouselContainerRef = useRef()

    // -to scroll using the left/right arrows while on bigger screens
    const carouselScrollByArrows = (direction) => {
        const container = carouselContainerRef.current;

        // -if 'left' --> minus the total viewable width from the amount scrolled to the left
        // -if 'right' --> plus the total viewable width from the amount scrolled to the left
        const scrollAmount =
            direction === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    const loadingSkeleton = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => carouselScrollByArrows('left')}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => carouselScrollByArrows('right')}
                />

                {loading ? (
                    <div className="loadingSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                ) : (
                    <div className="carouselItems" ref={carouselContainerRef}>
                        {data?.results?.map(item => {
                            const posterURL = item.poster_path
                                ? posterURLInitials + item.poster_path
                                : FallbackPoster

                            return (
                                <div className="carouselItem" 
                                    key={item.id}
                                    onClick={() => navigate(`/${item.media_type || navigationType}/${item.id}`)}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterURL} />
                                        <MovieRatingCircle rating={item.vote_average.toFixed(1)} />
                                        <Genres genreID={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <div className="date">
                                            {dayjs(item.release_date || item.first_air_date).format('MMM D, YYYY')}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}
