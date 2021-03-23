import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Switch
} from "react-router-dom";

import Home from './Home'
import NotFound from '../../NotFound'

export class PageTest extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/DevTest" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PageTest)
