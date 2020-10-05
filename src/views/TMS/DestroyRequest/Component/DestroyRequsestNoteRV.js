import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";

import {
    MLObjectDRNoteRV,
} from "../constants";


class DestroyRequsestNoteRVCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
    }

    componentDidMount() {
     
    }

    handleSubmit(From, MLObject) {
        this.props.onInputChangeObj(MLObject.ReViewedNote , this.props.StatusID);
    }


    render() {
        return (
            <FormContainer
                MLObjectDefinition={MLObjectDRNoteRV}
                dataSource={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
            >
                <div className="row">
                  

                    <div className="col-md-12">
                        <FormControl.TextArea
                            name="txtReViewedNote"
                            colspan="9"
                            labelcolspan="3"
                            label="ghi chú"
                            controltype="InputControl"
                            placeholder="Ghi chú"
                            value=""
                            datasourcemember="ReViewedNote"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    
                </div>

            </FormContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


const DestroyRequsestNoteRV = connect(mapStateToProps, mapDispatchToProps)(DestroyRequsestNoteRVCom);
export default DestroyRequsestNoteRV;