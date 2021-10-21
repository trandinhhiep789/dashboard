import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import {
    APIDAStoreGoodsGroupLoadList,
    APIHostName,
    InputDAStoreGoodsGroupColumnList,
    MLObjectDefinitionModal,
} from "../constants";


import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import DataGrid from "../../../../../common/components/DataGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { AddDAStoreGoodsGroup } from "../../DeliveryAbilityStore/constants";

class DataGridCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSource: [],
            IsError: false
        };

        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);

    }

    componentDidMount() {
        this.callSearchData();
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

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    callSearchData() {
        if (this.props.deliveryAbilityStoreID == null) {
            this.addNotification("Lỗi nạp danh sách tỷ lệ phân bổ tải theo từng kho", true);
        } else {
            this.props.callFetchAPI(APIHostName, APIDAStoreGoodsGroupLoadList, this.props.deliveryAbilityStoreID).then(apiResult => {
                if (apiResult.IsError) {
                    this.addNotification(apiResult.Message, true);
                } else {
                    const updateDataSource = apiResult.ResultObject.map(item => {
                        if (!item.DeliveryAbilityStoreName) {
                            item.DeliveryAbilityStoreID = this.props.deliveryAbilityStoreID;
                            item.DeliveryAbilityStoreName = this.props.deliveryAbilityStoreName;
                        }
                        return item;
                    });
                    this.setState({
                        DataSource: updateDataSource
                    })
                }
            });
        }
    }

    prevDataSubmit(formData, MLObject) {
        console.log("prevDataSubmit", formData, MLObject)
        if (formData.listDAStoreGoodsGroup.value.length == 0 || this.state.IsError) {
            return false;
        }

        let _ApportionFactor = 0;
        formData.listDAStoreGoodsGroup.value.map((item) => {
            _ApportionFactor += parseFloat(item.ApportionFactor);
        });

        if (_ApportionFactor > 100) {
            this.addNotification("Tỷ lệ phân bổ tải vượt quá 100", true);
            return false;
        }

        this.props.callFetchAPI(APIHostName, AddDAStoreGoodsGroup, formData.listDAStoreGoodsGroup.value).then(apiResult => {  
            if (!apiResult.IsError) {
                this.callSearchData();
            } 
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }


    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        //console.log("valueChangeInputGrid", elementdata, index, name, gridFormValidation)
        let item = elementdata.Name + '_' + index;

        if (elementdata.Name == "ApportionFactor" && elementdata.Value != "") {
            if (!(/^[0-9][0-9]*$/.test(elementdata.Value))) {
                gridFormValidation[item].IsValidationError = true;
                gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                this.setState({
                    IsError: true,
                    IsCallAPIError: true,
                })
            } else if (elementdata.Value < 0) {
                gridFormValidation[item].IsValidationError = true;
                gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số dương";
                this.setState({
                    IsError: true,
                    IsCallAPIError: true,
                })
            }
            else {
                gridFormValidation[item].IsValidationError = false;
                gridFormValidation[item].ValidationErrorMessage = "";
                this.setState({
                    IsError: false,
                    IsCallAPIError: false,
                })
            }
        }

    }

    render() {
        if (this.state.DataSource == null) {
            return <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
            </React.Fragment>
        } else {
            return (
                <div className="sub-grid">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName={""}
                        MLObjectDefinition={[]}
                        listelement={[]}
                        //BackLink={BackLink}
                        //RequirePermission={DESTROYREQUEST_ADD}
                        onSubmit={this.prevDataSubmit.bind(this)}
                    //onchange={this.handleChange.bind(this)}
                    >
                        <InputGrid
                            headingTitle="Danh sách tỷ lệ phân bố tải theo từng kho"
                            colspan="12"
                            controltype="GridControl"
                            dataSource={this.state.DataSource}
                            isHideHeaderToolbar={true}
                            listColumn={InputDAStoreGoodsGroupColumnList}
                            MLObjectDefinition={MLObjectDefinitionModal}
                            name="listDAStoreGoodsGroup"
                            onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                        />
                    </FormContainer>
                </div>



            );
        }
    }
}

DataGridCom.defaultProps = {
    deliveryAbilityStoreID: null
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridCom);