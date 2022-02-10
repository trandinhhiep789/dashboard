import React, { memo, useState } from 'react'

// react library
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// ACTIONS
import { callClearLocalCache, callGetCacheFromLocal } from '../../actions/cacheAction'
import { callLogin, loginFailure, loginRequest, loginSuccess } from '../../actions/loginAction'
import { callFetchAPI } from '../../actions/fetchAPIAction'

// LAYOUTS
import AppPath from '../Layout/AppPath'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import MainMenuLeftNhatCuong from '../Layout/menu/MainMenuLeftNhatCuong'
import HeaderMainMenuLeft from '../Layout/header/HeaderMainMenuLeft'

// VIEWS
import AccountInfo from '../../views/Account'
import CacheManager from '../../views/System/CacheManager'
import ChangePassword from '../../views/ChangePassword'
import Dashboard from '../../views/Dashboard'
import Forms from '../../views/Test/Forms'
import PageTest from '../../views/Test/PageTest'
import PageUI from '../../views/Test/PageUI'
import PartnerUI from '../../views/Test/PartnerUI'
import TestCache from '../../views/Test/TestCache'
import TestFormContainer from '../../views/Test/TestFormContainer'
import TestModal from '../../views/Test/TestModal'
import TestPageLayout from '../../views/Test/TestPageLayout'
import TestTabs from '../../views/Test/TestTabs'
import UseGuide from '../../views/UseGuide'

// OTHERS
import { COOKIELOGIN } from '../../constants/systemVars.js'
import NotFound from '../NotFound'
import { PagePath, HiddenAppPath } from './constants'
import PrivateRoute from '../../route/PrivateRoute'
import { getCookie } from '../../common/library/CommonLib.js'
import { Spin } from 'antd'

// import { MenuOutlined } from '@ant-design/icons'
import * as Icons from '@ant-design/icons'

import './Dashboard.css'
import '../Layout/menu/MainMenuLeftNhatCuong.css'
import '../../css/animation.css'

export default memo(function Dashboard() {
  const { MenuOutlined } = Icons
  const [isExpandWidthMenuLeft, setIsExpandWidthMenuLeft] = useState(false)
  return (
    <div className="dashboard">
      <div className="dashboard__header animated fadeInDown">
        <HeaderMainMenuLeft />
      </div>
      <div className="dashboard--dflex">
        <div className="dashboard__mainMenuLeft--iconMenu">
          <div>
            <MenuOutlined />
          </div>
        </div>
        <div
          className={
            isExpandWidthMenuLeft
              ? 'dashboard__mainMenuLeft animated fadeInLeftBig'
              : 'dashboard__mainMenuLeft--hover animated fadeInLeftBig'
          }
        >
          <div className="mainMenuLeft">
            <MainMenuLeftNhatCuong setIsExpandWidthMenuLeft={setIsExpandWidthMenuLeft} />
          </div>
        </div>
        <div className="dashboard__contentRight">display child components</div>
      </div>
    </div>
  )
})
