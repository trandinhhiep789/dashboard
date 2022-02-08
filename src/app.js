import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import './i18n'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './views/App'
import authenticationReducer from './reducers'
import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from './constants/actionTypes'
import { logout, calllogout, relogin } from './actions/loginAction'
import '../node_modules/react-image-gallery/styles/css/image-gallery.css'
import 'jquery'

import ErrorBoundary from './actions/ErrorBoundary'

const customMiddleWare = store => next => action => {
  if (action.type == FETCH_API_FAILURE) {
    //RegisterClientInfo
    const unAuthenStatus = [10, 11, 12, 13, 18]
    const state = store.getState()
    if (unAuthenStatus.includes(action.ErrorStatus)) {
      //store.dispatch(calllogout());
      store.dispatch(relogin())
      return
    }
  }

  next(action)
}

const store = createStore(authenticationReducer, applyMiddleware(thunkMiddleware, customMiddleWare))
const Index = () => {
  return (
    <Provider store={store}>
      <div>Test App</div>
    </Provider>
    // <ConfigProvider locale={locale}></ConfigProvider>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div></div>}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>{' '}
    </Suspense>
  </Provider>,
  document.getElementById('index')
)
