import React, { useState } from 'react'

import MainMenuLeft from '../Layout/MainMenuLeft'
import './Dashboard.css'

const Dashboard = () => {
  const [openWidthMenuLeft, setOpenWidthMenuLeft] = useState(false)
  const expandWidthMenuLeft = () => {
    setOpenWidthMenuLeft(!openWidthMenuLeft)
    console.log('openWidthMenuLeft: ', openWidthMenuLeft)
  }

  return (
    <div className="dashboard">
      <div className="dashboard__mainMenuLeft" onMouseOver={expandWidthMenuLeft} onMouseOut={expandWidthMenuLeft}>
        <MainMenuLeft openWidthMenuLeft={openWidthMenuLeft} />
      </div>
      <div className="dashboard__contentRight"></div>
    </div>
  )
}

export default Dashboard
