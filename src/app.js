import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, HashRouter } from "react-router-dom";
import App from "./views/App";
import authenticationReducer from "./reducers";
import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "./constants/actionTypes";
import { logout } from "./actions/loginAction";
import "./css/core.min.css";
import "./css/app.min.css";
import "./css/style.min.css";

const customMiddleWare = store => next => action => {

    if (action.type == FETCH_API_FAILURE) {
        console.log("Middleware check FETCH_API_FAILURE:", store.getState());
        console.log("Middleware check FETCH_API_FAILURE action:", action);
        //RegisterClientInfo
        const unAuthenStatus = [10, 11, 12, 13, 18];
        const state = store.getState();
        if (unAuthenStatus.includes(action.ErrorStatus)) {
            store.dispatch(logout());
            return;
        }
    }

    next(action);
}

const store = createStore(authenticationReducer,
    applyMiddleware(thunkMiddleware, customMiddleWare)
);
const Index = () => {
    return (<Provider store={store}><div>Test App</div>
    </Provider>
    );
};

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("index")
);
