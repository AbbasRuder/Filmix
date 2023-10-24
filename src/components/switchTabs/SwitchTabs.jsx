import { useState } from "react"

import "./style.scss";


export default function SwitchTabs({ data, onTabSwitch }) {

  const [selectedTab, setSelectedTab] = useState(0);
  // -to position the bg-gradient
  const [left, setLeft] = useState(0)

  const activeTab = (tabItem, index) => {
    // -sets the position for the bg-gradient based on the index number
    setLeft(index * 100)
    setTimeout(() => {
      setSelectedTab(index)
    }, 300);
    onTabSwitch(tabItem, index)
  }
 
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tabItem, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? 'active' : ''}`}
            onClick={() => activeTab(tabItem, index)}
          >
            {tabItem}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  )
}
