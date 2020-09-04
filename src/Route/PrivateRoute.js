import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, isRelogin, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn === true && !isRelogin
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)
export default PrivateRoute