import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MLObjectDRNoteRV } from '../constants'
import FormContainer from '../../../../common/components/FormContainer';
import FormControl from "../../../../common/components/FormContainer/FormControl";

export class RenfundSuppliesNoteRV extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(From, MLObject) {
        this.props.onInputChangeObj(MLObject.ReViewedNote, this.props.StatusID);
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
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RenfundSuppliesNoteRV);
