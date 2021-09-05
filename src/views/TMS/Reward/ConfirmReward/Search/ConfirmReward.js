import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {
    AddLink,
} from "../constants";

import { Menu, Dropdown } from 'antd';
import ElementInputModal from '../../../../../common/components/FormContainer/FormElement/ElementInputModal';
import { showModal, hideModal } from '../../../../../actions/modal';

class ConfirmRewardCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            ConfirmRewardData: this.props.ConfirmRewardData,
            MLObject: this.props.MLObject

        }
        this.notificationDOMRef = React.createRef();
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



    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { ConfirmRewardData, MLObject } = this.state;
        let result;
        result = ConfirmRewardData.reduce((data, item, index) => {
            const comma = data.length ? "," : "";
            return data + comma + item.value;
        }, '');
        console.log("submit", ConfirmRewardData, MLObject, result)
        this.props.hideModal()
        if(this.props.onSubmitConfirmReward)
        this.props.onSubmitConfirmReward(MLObject, result)
        
    }

    handleInputChangeComboBox(name, inputvalue, index) {
        const { ConfirmRewardData } = this.state;
        ConfirmRewardData[index].value = inputvalue;
        ConfirmRewardData[index].name = inputvalue
        console.log("chaneg ", name, inputvalue, index, ConfirmRewardData)
        this.setState({
            ConfirmRewardData
        })
    }

    render() {
        const { ConfirmRewardData } = this.state;

        return (
            <div className="card modalForm">
                <div className="card-body">
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell" style={{ width: 200 }}>Ngày Thưởng</th>
                                <th className="jsgrid-header-cell">Ngày chốt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ConfirmRewardData != null &&
                                ConfirmRewardData.map((rowItem, rowIndex) => {


                                    return (

                                        <tr key={rowIndex}>
                                            <td style={{ width: 200 }}>{rowItem.RewardDate}</td>

                                            <td>
                                                <ElementInputModal.ElementModalComboBox
                                                    rowIndex={rowIndex}
                                                    listoption={rowItem.children}
                                                    value={rowItem.value}
                                                    // disabled={}
                                                    onValueChange={this.handleInputChangeComboBox.bind(this)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}> Đồng ý</button>
                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>Đóng</button>
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


const ConfirmReward = connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmRewardCom));
export default ConfirmReward;