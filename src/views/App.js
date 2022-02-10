import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter, Route, Switch, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import ModalRoot from '../common/components/Modal/ModalRoot'
import Dashboard from '../views/Dashboard/Dashboard'

class AppCom extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.updatePagePath(PagePath);
    var addScript = document.createElement('script')
    addScript.setAttribute('src', '/src/js/core.min.js')
    document.body.appendChild(addScript)
  }

  render() {
    return (
      <BrowserRouter>
        {/* <React.Suspense fallback={loading()}> */}
        <div id="mainRouter">
          <ModalRoot />
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={Dashboard} />
            {/* <Route path="*" component={Home} /> */}
          </Switch>
        </div>
        {/* </React.Suspense> */}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    AuthenticationInfo: state
  }
}

const App = connect(mapStateToProps, null)(AppCom)
export default App
