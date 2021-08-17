import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
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
    PKColumnNameWard,
    schema,
    DataTemplateExport
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_ADD, COORDINATORSTORE_UPDATE } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";

import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import MultiAllStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiAllStoreComboBox";

class EditCom extends React.Component {
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
        this.convertDataCoordinatorStoreWard = this.convertDataCoordinatorStoreWard.bind(this)
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsShowCustomerAddress: true,
            DataSource: [],
            DataWard: [],
            IsLoadDataComplete: false,
            cssNotification: "",
            iconNotification: "",
            SenderStoreID: "",
            SenderStoreSelect: [],
            IsSystem: false,
            DataTemplateExport,
            DbCoordinatorStoreWard: []
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
        const { SenderStoreSelect, StoreSelect } = this.state;
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                let IsShowCustomerAddress;
                let SenderStoreItem = {};
                SenderStoreItem.value = apiResult.ResultObject.SenderStoreID;
                SenderStoreItem.label = apiResult.ResultObject.SenderStoreID + " - " + apiResult.ResultObject.SenderStoreName;
                SenderStoreItem.name = apiResult.ResultObject.SenderStoreName;
                SenderStoreSelect.push(SenderStoreItem);

                if (apiResult.ResultObject.IsCheckCustomerAddress) {
                    if (apiResult.ResultObject.IsSystem) {
                        IsShowCustomerAddress = true
                    }
                    else {
                        IsShowCustomerAddress = false
                    }
                }
                else {
                    IsShowCustomerAddress = true
                }

                this.convertDataCoordinatorStoreWard(apiResult.ResultObject.CoordinatorStoreWard_ItemList)

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    DataWard: apiResult.ResultObject.CoordinatorStoreWard_ItemList,
                    IsShowCustomerAddress,
                });
            }
        });
    }

    convertDataCoordinatorStoreWard(CoordinatorStoreWard_ItemList) {
        try {
            const arrResult = CoordinatorStoreWard_ItemList.map(item => {
                const { DistrictID, DistrictName, ProvinceID, ProvinceName, WardID, WardName } = item
                item.DistrictFullName = `${DistrictID} - ${DistrictName}`;
                item.ProvinceFullName = `${ProvinceID} - ${ProvinceName}`;
                item.WardFullName = `${WardID} - ${WardName}`;
                return item;
            })

            this.setState({
                DbCoordinatorStoreWard: arrResult
            })
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối")
        }
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
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.CoordinatorStoreID = this.props.match.params.id.trim();
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
            maxWidth: '800px'
        })
    }

    handleInputChangeObjItem(ObjItem, result) {
        console.log(ObjItem, result)
        const tempData = ObjItem.map((item, index) => {
            return {
                ...item,
                DistrictFullName: `${item.DistrictID} - ${item.DistrictName}`,
                ProvinceFullName: `${item.ProvinceID} - ${item.ProvinceName}`,
                WardFullName: `${item.WardID} - ${item.WardName}`
            }
        });
        const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: tempData });
        // const formData = Object.assign({}, this.state.DataSource, { ["CoordinatorStoreWard_ItemList"]: ObjItem });
        this.setState({
            DataSource: formData,
            DbCoordinatorStoreWard: tempData
        });
        this.props.hideModal()
    }

    handleEdit(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    DataSource={this.state.DataSource.CoordinatorStoreWard_ItemList}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}
                    isMultiSelectWard={false}
                />
            },
            maxWidth: '800px'
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

    handleImportFile(resultRows, errors) {
        const arrResultRows = resultRows.map(item => {
            const { DistrictID, DistrictName, ProvinceID, ProvinceName, WardID, WardName } = item
            return {
                ...item,
                DistrictFullName: `${DistrictID} - ${DistrictName}`,
                ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                WardFullName: `${WardID} - ${WardName}`
            }
        })

        this.setState({
            DataSource: {
                ...this.state.DataSource,
                CoordinatorStoreWard_ItemList: [...this.state.DataSource.CoordinatorStoreWard_ItemList, ...arrResultRows]
            }
        })
        // this.props.callFetchAPI(APIHostName, AddAutoAPIPath, resultRows).then(apiResult => {
        //     console.log('apiResult', apiResult)
        // });
    }

    handleExportFileTemplate(result) {
        this.addNotification(result.Message);
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
                    FormName="Cập nhật định nghĩa kho điều phối giao hàng"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    dataSource={this.state.DataSource}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    onchange={this.handleChange.bind(this)}
                    RequirePermission={COORDINATORSTORE_UPDATE}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                name="cbShipmentOrderTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu vẫn chuyển"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                                valuemember="ShipmentOrderTypeID"
                                nameMember="ShipmentOrderTypeName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                datasourcemember="ShipmentOrderTypeID" />
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                            />
                        </div>
                        {/* <div className="col-md-6">
                            <MultiAllStoreComboBox
                                name="cbSenderStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho xuất"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                IsLabelDiv={false}
                                isautoloaditemfromcache={false}
                                validatonList={["Comborequired"]}
                                onChange={this.onChangeAllStore.bind(this)}
                                controltype="InputControl"
                                value={this.state.SenderStoreSelect}
                                listoption={this.state.SenderStoreSelect}
                                isMultiSelect={false}
                                datasourcemember="SenderStoreID"
                                validationErrorMessage={''}
                                IsLabelDiv="kho xuất"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                            />
                        </div> */}

                        <div className="col-md-6">
                            <FormControl.FormControlComboBoxNew

                                name="cbSenderStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho xuất"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
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
                                filterValue={[1, 10]}
                                filterobj="CompanyID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsActived"
                                colspan="8"
                                labelcolspan="4"
                                label="kích hoạt"
                                controltype="InputControl"
                                value={true}
                                datasourcemember="IsActived"
                                classNameCustom="customCheckbox"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                            />
                        </div>
                        <div className="col-md-6"></div>
                    </div>

                    <InputGridControl
                        // value={null}
                        controltype="InputGridControl"
                        dataSource={this.state.DbCoordinatorStoreWard}
                        DataTemplateExport={this.state.DataTemplateExport}
                        fileNameTemplate={"Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"}
                        IDSelectColumnName={"WardID"}
                        isExportFileTemplate={true}
                        isHiddenButtonAdd={IsShowCustomerAddress}
                        isImportFile={true}
                        IsPermisionDelete={false}
                        listColumn={DataGridColumnList}
                        name="CoordinatorStoreWard_ItemList"
                        onDeleteClick={this.handleDelete}
                        onEditClick={this.handleEdit}
                        onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
                        onImportFile={this.handleImportFile.bind(this)}
                        onInsertClick={this.handleInsertNew}
                        PKColumnName={"WardID"}
                        schemaData={schema}
                        title="Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối"
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
