import "./style.scss";
// -libraries
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// -components
import {
    Img,
    MovieRatingCircle,
    Genres
} from "../index"
// -assets
import PosterFallback from "../../assets/no-poster.png";

const MovieCards = ({ data, fromSearch, mediaType }) => {
    const navigate = useNavigate();

    const { url } = useSelector(state => state.home);
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <>
                        <MovieRatingCircle rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCards;