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
    AddNewAPIPath,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
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
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import MultiAllStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiAllStoreComboBox";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
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
            DataSource: {},
            DataWard: [],
            cssNotification: "",
            iconNotification: "",
            SenderStoreID: "",
        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(AddPagePath);

    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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
        const { SenderStoreID } = this.state;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.CoordinatorStoreWard_ItemList = this.state.DataSource.CoordinatorStoreWard_ItemList;
        MLObject.SenderStoreID = SenderStoreID;

        if(MLObject.ShipmentOrderTypeID && Array.isArray(MLObject.ShipmentOrderTypeID)){
            let result = MLObject.ShipmentOrderTypeID.filter(item => Number.isInteger(item) === true);
            MLObject.ListShipmentOrderTypeID = result;
            MLObject.ShipmentOrderTypeID = -1;
        }

        this.props.callFetchAPI(APIHostName, AddNewAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

        //console.log("databc", MLObject);
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

    handleInsertNew() {
        if (this.state.DataSource.CoordinatorStoreWard_ItemList == null) {
            this.state.DataSource.CoordinatorStoreWard_ItemList = []
        }
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    DataSource={this.state.DataSource.CoordinatorStoreWard_ItemList}
                    onInputChangeObj={this.handleInputChangeObjItem}
                    isMultiSelectWard={true}
                />
            },
            maxWidth: '1000px'
        })
    }

    handleInputChangeObjItem(ObjItem, result) {
        const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: ObjItem });
        this.setState({ DataSource: formData });
        this.props.hideModal()
    }

    handleEdit(index) {
        console.log('handleEdit', index)
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    D DataSource={this.state.DataSource.CoordinatorStoreWard_ItemList}
                    index={parseInt(index)}
                    onInputChangeObj={this.handleInputChangeObjItem}
                    isMultiSelectWard={false}
                />
            },
            maxWidth: '1000px'
        })
    }

    handleDelete(id) {

        let dataSourceValue = this.state.DataSource.CoordinatorStoreWard_ItemList.filter(function (value, index) {
            return value.WardID != id;
        });
        const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: dataSourceValue });
        this.setState({ DataSource: formData });
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

    onChangeAllStore(name, objstore) {

        this.setState({
            SenderStoreID: objstore.value
        })

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
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    onchange={this.handleChange.bind(this)}
                    RequirePermission={COORDINATORSTORE_ADD}
                >
                    <div className="row">
                        <div className="col-md-6">
                            {/* <FormControl.ComboBoxSelect

                                name="cbShipmentOrderTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu vận chuyển"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                                valuemember="ShipmentOrderTypeID"
                                nameMember="ShipmentOrderTypeName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                isMultiSelect={true}
                                datasourcemember="ShipmentOrderTypeID" /> */}

                            <FormControl.FormControlComboBox
                                name="cbShipmentOrderTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu vận chuyển"
                                // validatonList={[""]}
                                isautoloaditemfromcache={true}
                                validatonList={["Comborequired"]}
                                isMultiSelect={true}
                                placeholder="-- Vui lòng chọn --"
                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                                valuemember="ShipmentOrderTypeID"
                                nameMember="ShipmentOrderTypeName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="ShipmentOrderTypeID"
                                isAllowSelectAll={true}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox

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
                                datasourcemember="PartnerID"
                                filterValue={1}
                                filterobj="PartnerTypeID"
                            />

                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox

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
                            <MultiAllStoreComboBox
                                name="cbSenderStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho xuất"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                validatonList={["Comborequired"]}
                                IsLabelDiv={false}
                                isautoloaditemfromcache={false}
                                onChange={this.onChangeAllStore.bind(this)}
                                controltype="InputControl"
                                value={[]}
                                listoption={[]}
                                isMultiSelect={false}
                                datasourcemember="SenderStoreID"
                                validationErrorMessage={''}
                                IsLabelDiv="kho xuất"
                            />
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cbDistrictID"
                                colspan="8"
                                labelcolspan="4"
                                disabled=""
                                label="Quận/huyện"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.DISTRICT"
                                valuemember="DistrictID"
                                nameMember="DistrictName"
                                controltype="InputControl"
                                value={-1}
                                listoption={[]}
                                datasourcemember="DistrictID"
                                filterValue=""
                                filterobj="DistrictID"
                                filterrest="cbSenderStoreID"
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
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
                                filterName="cbDistrictID"
                                filterValue=""
                                filterobj="DistrictID"
                            />
                        </div> */}

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
                                disabled={true}
                                labelcolspan="4"
                                classNameCustom="customCheckbox"
                                titleSmall="Chọn vào đây để khai báo danh sách phường/xã"
                            />
                        </div>
                        <div className="col-md-6"></div>
                    </div>

                    {/* <InputGridControl
                        name="CoordinatorStoreWard_ItemList"
                        controltype="InputGridControl"
                        title="Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"
                        IDSelectColumnName={"WardID"}
                        listColumn={DataGridColumnList}
                        PKColumnName={PKColumnNameWard}
                        dataSource={this.state.DataSource.CoordinatorStoreWard_ItemList}
                        onInsertClick={this.handleInsertNew}
                        onEditClick={this.handleEdit}
                        onDeleteClick={this.handleDelete}
                        isHiddenButtonAdd={IsShowCustomerAddress}
                        ref={this.gridref}
                    /> */}

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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
