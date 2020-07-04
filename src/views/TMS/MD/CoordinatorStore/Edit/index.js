import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_SEARCH, MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import SearchModal from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import InputGridControl from "../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import MD5Digest from "../../../../../common/library/cryptography/MD5Digest.js";
import {
    APIHostName,
    BackLink,
    EditPagePath,
    UpdateNewAPIPath,
    LoadNewAPIPath,
    MLObjectDefinition,
    DataGridColumnList,
    PKColumnNameWard
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_ADD } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onCoordinatorStoreWardChange = this.onCoordinatorStoreWardChange.bind(this)
        this.handleInsertNew = this.handleInsertNew.bind(this)
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsShowCustomerAddress: true,
            DataSource: [],
            DataWard: [],
            IsLoadDataComplete: false,
            cssNotification: "",
            iconNotification: ""
        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);

    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            console.log('callLoadData', apiResult, id)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                let IsShowCustomerAddress;
                if (apiResult.ResultObject.IsCheckCustomerAddress) {
                    IsShowCustomerAddress = false
                }
                else {
                    IsShowCustomerAddress = true
                }

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    DataWard: apiResult.ResultObject.CoordinatorStoreWard_ItemList,
                    IsShowCustomerAddress,
                });
            }
        });
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


    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.CoordinatorStoreID = this.props.match.params.id.trim();
        console.log("edit", MLObject)

        this.props.callFetchAPI(APIHostName, UpdateNewAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }

    handleChange(formData, MLObject) {
        if (formData.chkIsCheckCustomerAddress.value) {
            this.setState({
                IsShowCustomerAddress: false
            })
        }
        else {
            this.setState({
                IsShowCustomerAddress: true
            })
        }
    }
    onCoordinatorStoreWardChange(list, deleteList) {

    }

    handleInsertNew() {

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    DataWard={this.state.DataWard}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        })
    }

    handleInputChangeObjItem(ObjItem, result) {
        this.addNotification(result.Message, result.IsError);
        this.props.hideModal()
    }

    handleEdit(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    DataWard={this.state.DataWard}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        })
    }

    handleDelete(index) {
       
        let dataSourceValue = this.state.DataWard.filter(function (value, index1) { return index1 != index; });
        const formData = Object.assign({}, this.state.DataWard,[{ dataSourceValue }]);
        console.log('aa',dataSourceValue, index )
        this.setState({ DataWard: formData });
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        const { DataSource, IsShowCustomerAddress, DataWard } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Thêm định nghĩa kho điều phối giao hàng"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    dataSource={this.state.DataSource}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    onchange={this.handleChange.bind(this)}
                //RequirePermission={COORDINATORSTORE_ADD}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect

                                name="cbShipmentOrderTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu xuất"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                                valuemember="ShipmentOrderTypeID"
                                nameMember="ShipmentOrderTypeName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="ShipmentOrderTypeID" />
                        </div>
                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect

                                name="cbPartnerID"
                                colspan="8"
                                labelcolspan="4"
                                label="đối tác"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                valuemember="PartnerID"
                                nameMember="PartnerName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="PartnerID" />

                        </div>

                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect

                                name="cbStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho điều phối"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="StoreID"
                                filterValue={10}
                                filterobj="CompanyID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                name="cbSenderStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho gửi"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="SenderStoreID"
                                filterValue={1}
                                filterobj="CompanyID"
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsActived"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="kích hoạt"
                                controltype="InputControl"
                                value={true}
                                datasourcemember="IsActived"
                                classNameCustom="customCheckbox"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsSystem"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="hệ thống"
                                controltype="InputControl"
                                value=""
                                datasourcemember="IsSystem"
                                classNameCustom="customCheckbox"
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.CheckBox
                                label="kiểm tra địa chỉ khách hàng"
                                name="chkIsCheckCustomerAddress"
                                datasourcemember="IsCheckCustomerAddress"
                                controltype="InputControl"
                                colspan="8"
                                value={false}
                                labelcolspan="4"
                                classNameCustom="customCheckbox"
                            />
                        </div>
                        <div className="col-md-6"></div>
                    </div>

             

                    <InputGridControl
                        name="CoordinatorStoreWard_ItemList"
                        controltype="InputGridControl"
                        title="Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"
                        IDSelectColumnName={"WardID"}
                        listColumn={DataGridColumnList}
                        PKColumnName={"WardID"}
                        dataSource={DataWard}
                        onInsertClick={this.handleInsertNew}
                        onEditClick={this.handleEdit}
                        onDeleteClick={this.handleDelete}
                        isHiddenButtonAdd={IsShowCustomerAddress}
                    />



                </FormContainer>
            </React.Fragment>


        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
