import { useSelector } from "react-redux"
import "./style.scss"

export default function Genres({ genreID }) {
    const allGenres = useSelector(state => state.home.genres)

    // -finding the genre categories for a movie/tv-show
    const genres = genreID.map(itemID => {
        if (!allGenres?.[itemID]?.name) return null
        return allGenres?.[itemID]?.name
    })

    // -filtering out null values, so that we can later check if any genre exist for a given movie or not
    const filteredGenres = genres.filter(item => item !== null)

    return (
        <div className="genres">
            {filteredGenres.length > 0 && genres.map((genre, index) => {
                return (
                    <div key={index} className="genre">
                        {genre}
                    </div>
                )
            })}
        </div>
    )
}
