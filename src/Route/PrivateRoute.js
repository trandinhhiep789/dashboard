import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const PrivateRoute = ({ component: Component, isLoggedIn, isRelogin, ...rest }) => (
    <React.Suspense fallback={loading()}>
        <Route {...rest} render={(props) => (
            isLoggedIn === true && !isRelogin
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    </React.Suspense>
)
export default PrivateRoute