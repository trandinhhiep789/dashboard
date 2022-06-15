// import React, { memo, useState, useEffect } from 'react'

// react library
import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// ACTIONS
import { callClearLocalCache, callGetCacheFromLocal } from '../../actions/cacheAction'
import { callLogin, loginFailure, loginRequest, loginSuccess } from '../../actions/loginAction'
import { callFetchAPI } from '../../actions/fetchAPIAction'

// LAYOUTS
import AppPath from '../Layout/AppPath'
import MainMenuLeftNhatCuong from '../Layout/menu/MainMenuLeftNhatCuong'
import HeaderMainMenuLeft from '../Layout/header/HeaderMainMenuLeft'

// VIEWS
import AccountInfo from '../../views/Account'
import CacheManager from '../../views/System/CacheManager'
import ChangePassword from '../../views/ChangePassword'
import Home from '../../views/Dashboard'
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
import { PagePath, HiddenAppPath } from '../Home/constants/index'
import PrivateRoute from '../../route/PrivateRoute'
import { getCookie } from '../../common/library/CommonLib.js'
import { Spin, Divider } from 'antd'

import { MenuOutlined, RedoOutlined } from '@ant-design/icons'

import './Dashboard.css'
import '../Layout/menu/MainMenuLeftNhatCuong.css'
import '../../css/animation.css'

export default memo(function Dashboard(props) {
  const [isExpandWidthMenuLeft, setIsExpandWidthMenuLeft] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isShowAppPath, setIsShowAppPath] = useState(true)

  const dispatch = useDispatch()
  const IsLoginSuccess = useSelector(state => state.LoginInfo.IsLoginSuccess)
  const Username = useSelector(state => state.LoginInfo.Username)
  useEffect(() => {
    const LoginInfo = localStorage.getItem('LoginInfo')
    if (!IsLoginSuccess) {
      if (LoginInfo) {
        const LoginInfo1 = JSON.parse(LoginInfo)
        dispatch(loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password))
        setIsLoggedIn(true)
        callLoadCacheList(LoginInfo1.LoginUserInfo.UserName)
      } else {
        setIsLoggedIn(false)
      }
    } else {
      callLoadCacheList(Username)
    }
  }, [IsLoginSuccess, Username])

  useEffect(() => {
    handleIsShowAppPath()
  }, [])
  const handleIsShowAppPath = () => {
    const found = HiddenAppPath.findIndex(item => item == props.location.pathname)

    if (found != -1) {
      setIsShowAppPath(false)
    } else {
      setIsShowAppPath(true)
    }
  }

  const callLoadCacheList = async userName => {
    const APIHostName = 'CacheAPI'
    const apiResult = await dispatch(callFetchAPI(APIHostName, 'api/Cache/GetCacheList', userName))
    if (!apiResult.IsError) {
      const listCacheItem = apiResult.ResultObject.ListCacheItem
      listCacheItem.map(async cacheItem => {
        let cacheItemLocal = await dispatch(callGetCacheFromLocal(cacheItem.CacheKeyID))

        if (cacheItemLocal != null) {
          if (cacheItemLocal.CreatedDate < cacheItem.CacheVersionDate) {
            dispatch(callClearLocalCache(cacheItem.CacheKeyID))
          }
        }
      })
    }
  }

  const isRelogin = useSelector(state => state.LoginInfo.IsRelogin)
  const IsFetchAPICompleted = useSelector(state => state.FetchAPIInfo.IsFetchAPICompleted)
  const HostURL = useSelector(state => state.FetchAPIInfo.HostURL)
  return (
    <div className="dashboard">
      <Spin
        className="ant-spin-custom"
        spinning={IsFetchAPICompleted === false && HostURL}
        size="large"
        indicator={
          <RedoOutlined
            style={{
              fontSize: 30,
              color: 'green'
            }}
            spin
          />
        }
      >
        <div className="dashboard__header animated fadeInDown">
          <HeaderMainMenuLeft />
        </div>
        <div className="dashboard--dflex">
          {/* main menu left */}
          <div className="dashboard__mainMenuLeft__div">
            <div
              className={
                isExpandWidthMenuLeft
                  ? 'dashboard__mainMenuLeft animated fadeInLeftBig'
                  : 'dashboard__mainMenuLeft--hover animated fadeInLeftBig'
              }
            >
              {/* icon menu */}
              <div className="dashboard__mainMenuLeft--iconMenu">
                <div>
                  <MenuOutlined />
                </div>
              </div>
              <div className="mainMenuLeft">
                <MainMenuLeftNhatCuong setIsExpandWidthMenuLeft={setIsExpandWidthMenuLeft} />
              </div>
            </div>
          </div>

          <div className="dashboard__mainMenuLeft__div__overlay"></div>
          {/* child component will appear here */}
          <div className="dashboard__contentRight">
            {isShowAppPath && <AppPath />}
            <Divider />
            <Switch>
              <PrivateRoute exact path="/" component={Home} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute path="/accountinfo" component={AccountInfo} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute path="/PageUI" component={PageUI} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

              <PrivateRoute path="/PartnerUI" component={PartnerUI} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute path="/UseGuide" component={UseGuide} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

              <PrivateRoute path="/TestModal" component={TestModal} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute path="/TestCache" component={TestCache} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute
                path="/TestFormContainer"
                component={TestFormContainer}
                isLoggedIn={isLoggedIn}
                isRelogin={isRelogin}
              />
              <PrivateRoute path="/TestTabs" component={TestTabs} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
              <PrivateRoute
                path="/TestPageLayout"
                component={TestPageLayout}
                isLoggedIn={isLoggedIn}
                isRelogin={isRelogin}
              />
              <PrivateRoute
                path="/changepassword"
                component={ChangePassword}
                isLoggedIn={isLoggedIn}
                isRelogin={isRelogin}
              />
              <PrivateRoute
                path="/CacheManager"
                component={CacheManager}
                isLoggedIn={isLoggedIn}
                isRelogin={isRelogin}
              />
              <PrivateRoute path="/Forms" component={Forms} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

              <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
            </Switch>
          </div>
        </div>
      </Spin>
    </div>
  )
})
