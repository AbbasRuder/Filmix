import { useState } from "react"
// -hooks
import useFetch from "../../../hooks/useFetch"
// -components
import {
    ContentWrapper,
    SwitchTabs,
    Carousel
} from "../../../components"


export default function TopRated() {
    const [urlEndpoint, setUrlEndpoint] = useState('movie')

    const { data, loading } = useFetch(`/${urlEndpoint}/top_rated`)

    const onTabSwitch = (tab) => {
        // -here tab is an item from the data array that we send to 'SwitchTabs'
        const selectedTab = tab === 'Movie' ? 'movie' : 'tv'
        setUrlEndpoint(selectedTab)
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">
                    Top Rated
                </span>
                <SwitchTabs tabItems={['Movie', 'TV Shows']} onTabSwitch={onTabSwitch} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} navigationType={urlEndpoint} />
        </div>
    )
}
