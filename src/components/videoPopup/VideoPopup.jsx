import "./style.scss"
import ReactPlayer from "react-player/youtube"


export default function VideoPopup({ show, setShow, videoID, setVideoID }) {

    const hidePopup = () => {
        setShow(false)
        setVideoID(null)
    }
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoID}`}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    )
}
