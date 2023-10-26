import { useState } from "react"
// -hooks
import useFetch from "../../../hooks/useFetch"
// -components
import { 
  ContentWrapper, 
  SwitchTabs, 
  Carousel
} from "../../../components"


export default function Trending() {
  const [urlEndpoint, setUrlEndpoint] = useState('day')

  const {data, loading} = useFetch(`/trending/all/${urlEndpoint}`)

  const onTabSwitch = (tab) => {
    // -here tab is an item from the data array that we send to 'SwitchTabs'
    setUrlEndpoint(tab.toLowerCase())
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">
          Trending
        </span>
        <SwitchTabs tabItems={['Day', 'Week']} onTabSwitch={onTabSwitch}/>
      </ContentWrapper>
      <Carousel data={data} loading={loading}/>
    </div>
  )
}
