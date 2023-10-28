import "./style.scss"


import { ContentWrapper, Img } from '../../../components'
import avatar from "../../../assets/avatar.png"
import { useSelector } from "react-redux"


export default function Cast({ castData, loading }) {

    const { url } = useSelector(state => state.home)
    // console.log(url)

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    }
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {loading ? (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ) : (
                    <div className="listItems">
                        {castData?.map(item => {
                            const profileImg = item.profile_path ? url.profile + item.profile_path : avatar
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={profileImg} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}
