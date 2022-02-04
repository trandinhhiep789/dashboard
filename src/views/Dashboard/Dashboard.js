import React, { memo, useState } from 'react'

import MainMenuLeft from '../Layout/menu/MainMenuLeft'
import MainMenuLeftNhatCuong from '../Layout/menu/MainMenuLeftNhatCuong'
import HeaderMainMenuLeft from '../Layout/header/HeaderMainMenuLeft'
import { MenuOutlined } from '@ant-design/icons'

import './Dashboard.css'
import '../Layout/menu/MainMenuLeftNhatCuong.css'
import '../../css/animation.css'

import CollapseMainMenuLeft from '../Layout/menu/collapse/CollapseMainMenuLeft'

export default memo(function Dashboard() {
  const [isExpandWidthMenuLeft, setIsExpandWidthMenuLeft] = useState(false)

  return (
    <div className="dashboard">
      <div className="dashboard__header animated fadeInDown">
        <HeaderMainMenuLeft />
      </div>
      <div className="dashboard--dflex">
        <div
          className={
            isExpandWidthMenuLeft
              ? 'dashboard__mainMenuLeft animated fadeInLeftBig'
              : 'dashboard__mainMenuLeft--hover animated fadeInLeftBig'
          }
        >
          <div className="dashboard__mainMenuLeft--iconMenu">
            <div>
              <MenuOutlined />
            </div>
          </div>
          <div className="mainMenuLeft">
            <MainMenuLeftNhatCuong setIsExpandWidthMenuLeft={setIsExpandWidthMenuLeft} />
          </div>
        </div>
        <div className="dashboard__contentRight">display child components</div>
      </div>
    </div>
  )
})
