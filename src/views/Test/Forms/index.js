import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Route,
    Switch
} from "react-router-dom";


export class Forms extends Component {
    render() {
        return (
            <div>Forms</div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Forms)
