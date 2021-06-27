import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormContainer from '../FormContainer'

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormContainer
                classNameForm="form-container"
                FormName="Form Test"
                initialValues={{ firstInput: "first value 1" }}
            >
                <FormContainer.Item
                    label="Input 1"
                    name="firstInput"
                    rules={{
                        required: true, message: 'Please input your username!'
                    }}
                >
                    <input></input>
                </FormContainer.Item>

                <FormContainer.Item
                    label="Input 2"
                    name="secondInput"
                    rules={{
                        required: true, message: 'Please input your username!'
                    }}>
                    <input></input>
                </FormContainer.Item>

            </FormContainer>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
