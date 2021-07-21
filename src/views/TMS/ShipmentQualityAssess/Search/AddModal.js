import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { withRouter } from "react-router-dom";
import "react-notifications-component/dist/theme.css";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { AddLink } from "./constants";
import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_QUALITYASSESSTYPE } from "../../../../constants/keyCache";

class AddModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            QualityAssessTypeID: '',
            MessageError: ''
        }

        this.notificationDOMRef = React.createRef();
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
    }

    componentDidMount() {

    }

    handleCloseMessage() {
        this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleOnValueChange(name, value) {
        if (name == 'cboQualityAssessTypeID') {
            if (value > 0) {
                this.setState({
                    QualityAssessTypeID: value,
                    MessageError: ''
                })
            }
            else {
                this.setState({
                    QualityAssessTypeID: value,
                    MessageError: 'Vui lòng chọn loại Tiêu Chí Đánh Giá Chất Lượng',
                })
            }
        }
    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { QualityAssessTypeID } = this.state;
        if (QualityAssessTypeID > 0) {
            this.setState({
                MessageError: ''
            })
            this.props.history.push("/ShipmentQualityAssess/Add", {
                QualityAssessTypeID
            })
            this.handleCloseModal();
        } else {
            if (QualityAssessTypeID < 0) {
                this.setState({
                    MessageError: 'Vui lòng chọn loại Tiêu Chí Đánh Giá Chất Lượng',
                })
            }
        }
    }

    render() {
        return (
            <div className="card modalForm">
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                name="cboQualityAssessTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="Loại Tiêu Chí Đánh Giá Chất Lượng"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_QUALITYASSESSTYPE}
                                valuemember="QualityAssessTypeID"
                                nameMember="QualityAssessTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.QualityAssessTypeID}
                                listoption={null}
                                datasourcemember="QualityAssessTypeID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={this.state.MessageError}
                                isMultiSelect={false}
                                validatonList={["Comborequired"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}>
                        Cập nhật
                    </button>

                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>
                        Đóng
                    </button>
                </div>
            </div>
        )
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddModal));