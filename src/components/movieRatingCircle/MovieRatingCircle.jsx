import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import './style.scss'
import "react-circular-progressbar/dist/styles.css";

export default function MovieRatingCircle({ rating }) {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                // -default maxValue is 100
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'
                })}
                
            />
        </div>
    )
}
