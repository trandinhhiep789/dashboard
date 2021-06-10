import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalManager } from "react-dynamic-modal"

import ReactContext from '../ReactContext'
import {
    APIHostName,
    MLObjectDefinitionAdd,
    AddAPIPath
} from '../constants'
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../common/components/Modal";

export class AddCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            QualityAssessType: null,
            optQualityAssessType: [{ value: -1, label: "--Vui lòng chọn--" }]
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.fetchQualityAssessValue = this.fetchQualityAssessValue.bind(this);
    }

    componentDidMount() {
        this.fetchQualityAssessValue([{ SearchKey: "@Keyword", SearchValue: "" }]);
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    fetchQualityAssessValue(data) {
        this.props.callFetchAPI(APIHostName, "api/QualityAssessType/Search", data).then(apiResult => {
            if (!apiResult.IsError) {

                const optQualityAssessType = apiResult.ResultObject.reduce((acc, val) => {
                    return [
                        ...acc,
                        {
                            value: val.QualityAssessTypeID,
                            label: `${val.QualityAssessTypeID} - ${val.QualityAssessTypeName}`
                        }
                    ]
                }, [{ value: -1, label: "--Vui lòng chọn--" }])

                this.setState({
                    QualityAssessType: apiResult.ResultObject,
                    optQualityAssessType
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    onSubmit(FormData, MLObject) {
        const tempMLObject = {
            ...MLObject,
            AssessDate: new Date()
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, tempMLObject).then(apiResult => {
            if (!apiResult.IsError) {

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { QualityAssessType, optQualityAssessType } = this.state;

        if (QualityAssessType === null) {
            return <React.Fragment></React.Fragment>
        } else {
            return (
                <ReactContext.Consumer>
                    {
                        ({ handleDataGrid }) => (
                            <FormContainer
                                MLObjectDefinition={MLObjectDefinitionAdd}
                                listelement={[]}
                                onSubmit={this.onSubmit}
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name="txtShipmentOrderID"
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={false}
                                            label="Mã hợp đồng"
                                            placeholder="Mã hợp đồng"
                                            controltype="InputControl"
                                            value=""
                                            datasourcemember="ShipmentOrderID"
                                            validatonList={['required']}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name="txtPartnerSaleOrderID"
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={false}
                                            label="Mã đơn hàng đối tác"
                                            placeholder="Mã đơn hàng đối tác"
                                            controltype="InputControl"
                                            value=""
                                            datasourcemember="PartnerSaleOrderID"
                                            validatonList={['required']}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl.ComboBoxSelect
                                            name="txtQualityAssessTypeID"
                                            colspan="8"
                                            labelcolspan="4"
                                            label="Loại tiêu chí đánh giá"
                                            validatonList={["Comborequired"]}
                                            placeholder="-- Vui lòng chọn --"
                                            isautoloaditemfromcache={false}
                                            valuemember="QualityAssessTypeID"
                                            nameMember="QualityAssessTypeID"
                                            controltype="InputControl"
                                            value={-1}
                                            listoption={optQualityAssessType}
                                            datasourcemember="QualityAssessTypeID"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl.TextArea
                                            labelcolspan={4}
                                            colspan={8}
                                            rows={6}
                                            maxSize={500}
                                            name="txtQualityAssessNote"
                                            label="Mô tả"
                                            placeholder="Mô tả"
                                            datasourcemember="QualityAssessNote"
                                            controltype="InputControl"
                                            classNameCustom="customcontrol"
                                        />
                                    </div>
                                </div>

                            </FormContainer>
                        )
                    }
                </ReactContext.Consumer>
            )
        }

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom)
