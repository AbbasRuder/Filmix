import "./style.scss"
import { useState } from "react";
import { ContentWrapper, Img, VideoPopup } from "../../../components"
import PlayIcon from "../playIcon/PlayIcon"

export default function MovieVideos({ videosData, videosLoading }) {
    const [show, setShow] = useState(false);
    const [videoID, setVideoID] = useState(null);

    const handleVideoPopup = (key) => {
        setShow(true)
        setVideoID(key)
    }

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {videosLoading ? (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                ) : (
                    <div className="videos">
                        {videosData?.results?.map(videoItem => {
                            return (
                                <div
                                    key={videoItem.id}
                                    className="videoItem"
                                    onClick={() => handleVideoPopup(videoItem.key)}
                                >
                                    <div className="videoThumbnail">
                                        <Img src={`https://img.youtube.com/vi/${videoItem.key}/mqdefault.jpg`} />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle">{videoItem.name}</div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ContentWrapper>

            <VideoPopup
                show={show}
                setShow={setShow}
                videoID={videoID}
                setVideoID={setVideoID}
            />
        </div>
    )
}
