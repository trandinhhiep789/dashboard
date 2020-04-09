import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import UpLoadFile from '../../../../common/components/UploadModal/UploadFile'
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    BackLink,
    AddAPIPath,
    LoadAPIPath,
    EditPagePath,
    UpdateAPIPath,
    AddElementList,
    MLObjectDefinition

} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class GeneralInfoCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.state = {
            CallAPIMessage: "",
            DataSource: [],
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false, FormData: {},
            Product_Attribute: {},
            Product_Partnermap: {},
            Product_Content: {},
            Product_Article: {},
            Product_Video: {},
            Isedit: false,
            cssNotification: "",
            iconNotification: "",
            CategoryDataSource: [],
            DataSourcePieRequest: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        let PieRequestListID = this.props.match.params.pierequestlistid;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, PieRequestListID).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
             //   console.log("apiResult.ResultObject ", apiResult.ResultObject)
                if (apiResult.ResultObject != null)
                    this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            })
        });

        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/Load", id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
             //   console.log(" apiResult.ResultObject", apiResult.ResultObject)
                this.setState({ DataSourcePieRequest: apiResult.ResultObject });
            }
        });

    }

    CheckPermissionUser(id) {
        if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs && this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.length > 0) {
            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs[0].IsFinishStep == true) {
                return false;
            }

            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.some(a => a.PiePermissionID === id)) {
                return true;
            }
        }
        return false;
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            })
        }
        else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            })
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }
    handleInputChangeList(formDataTemp, tabNameList, tabMLObjectDefinitionList) {
        this.setState({ FormData: formDataTemp });
    }
    handleSubmit(formData, MLObject) {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.PieRequestListID = PieRequestListID;
        MLObject.IsOldValue = true;
        if (MLObject.PieRequestListID != null && MLObject.PieRequestListID != "") {
            MLObject.UpDatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
            });
        }
    }

    render() {
        const listOption = [{ value: 1, name: "0 %", label: "0 %" }, { value: 2, name: "5 %", label: "5 %" }, { value: 3, name: "10 %", label: "10 %" }];
        //console.log("CategoryDataSource:", this.state.CategoryDataSource);
        // console.log("renderthis.state.DataSource", this.state.DataSource, this.state.DataSource.ProductName, this.state.IsLoadDataComplete);
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-md-9 col-lg-10">

                        <div className="row">
                            <FormContainer FormName="Thông tin Chung"
                                MLObjectDefinition={MLObjectDefinition}
                                listelement={AddElementList}
                                IsAutoLayout={true}
                                onInputChangeList={this.handleInputChangeList}
                                onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormControl.TextBox name="txtProductName" colspan="8" labelcolspan="4" label="Tên sản phẩm:" placeholder="Tên sản phẩm" readonly={this.CheckPermissionUser(7) == false ? true : false}
                                            controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ProductName : ""} datasourcemember="ProductName" />

                                        <FormControl.TextBox name="txtProductShortName" colspan="8" labelcolspan="4" label="Tên rút gọn sản phẩm:" placeholder="Tên rút gọn sản phẩm"  readonly={this.CheckPermissionUser(7) == false ? true : false}
                                            controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ProductShortName : ""} datasourcemember="ProductShortName" />

                                        <FormControl.ComboBox name="cboProductTypeID" value={this.state.DataSource != [] ? this.state.DataSource.ProductTypeID : -1} colspan="8" labelcolspan="4" type="select" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE"
                                            valuemember="ProductTypeID" nameMember="ProductTypeName" label="Loại sản phẩm:" controltype="InputControl" listoption={null} datasourcemember="ProductTypeID"  disabled={this.CheckPermissionUser(7) == false ? true : false} />

                                        <FormControl.ComboBox name="cboDefaultCategoryID" value={this.state.DataSource != [] ? this.state.DataSource.DefaultCategoryID : -1} colspan="8" isautoloaditemfromcache={true} isCategory={true} loaditemcachekeyid="PIMCACHE.CATEGORY" valuemember="CategoryID" listoption={this.state.CategoryDataSource}
                                            nameMember="CategoryName" labelcolspan="4" label="Danh mục mặc định:" controltype="InputControl" datasourcemember="DefaultCategoryID"  disabled={this.CheckPermissionUser(7) == false ? true : false} />

                                        <FormControl.ComboBox name="cboBrandID" value={this.state.DataSource != [] ? this.state.DataSource.BrandID : -1} colspan="8" labelcolspan="4" label="Nhãn hiệu:" controltype="InputControl" isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.BRAND"
                                            valuemember="BrandID" nameMember="BrandName" listoption={null} datasourcemember="BrandID" disabled={this.CheckPermissionUser(7) == false ? true : false} />

                                        <FormControl.ComboBox name="cboDefaultQuantityUnitID" value={this.state.DataSource != [] ? this.state.DataSource.DefaultQuantityUnitID : -1} colspan="8" labelcolspan="4" label="Đơn vị tính mặc định:"
                                            isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.QUANTITYUNIT" valuemember="QuantityUnitID" nameMember="QuantityUnitName"
                                            controltype="InputControl" listoption={null} datasourcemember="DefaultQuantityUnitID"  disabled={this.CheckPermissionUser(7) == false ? true : false} />

                                        <FormControl.MultiSelectComboBox name="ArryProduct_Feature" colspan="8" labelcolspan="4" label="Đặc điểm sản phẩm:"
                                            controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_Feature : -1}
                                            listoption={null} datasourcemember="ArryProduct_Feature"  disabled={this.CheckPermissionUser(7) == false ? true : false}
                                            IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTFEATURE" valuemember="ProductFeatureID" nameMember="ProductFeatureName"
                                        />
                                        <div className="form-row">
                                            <FormControl.ComboBox name="cboVat" isautoloaditemfromcache={false}
                                                label="VAT(%)"
                                                colspan="8" labelcolspan="0"
                                                controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.Vat : -1}
                                                listoption={listOption} datasourcemember="Vat"
                                                labelcolspan={6}
                                                colspan={6}
                                                rowspan={8}
                                                paddinginput={8}
                                                disabled={this.CheckPermissionUser(7) == false ? true : false}
                                            />
                                            <FormControl.CheckBox name="chkIsnovat" label="Không thuế suất "
                                                datasourcemember="Isnovat"
                                                className="form-check-input" controltype="InputControl"
                                                value={this.state.DataSource.Isnovat}
                                                labelcolspan={11}
                                                colspan={1}
                                                rowspan={4}
                                                swaplabel={true}
                                                disabled={this.CheckPermissionUser(7) == false ? true : false}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-row">
                                            <div className="form-group col-md-2">
                                            </div>
                                            <div className="form-group col-md-6" style={{ height: 379 }} >
                                                <UpLoadFile multiple={true} />
                                            </div>
                                        </div>
                                        <FormControl.MultiSelectComboBox
                                            name="ArryProduct_Ship" colspan="8" labelcolspan="4" label="Phương thức vận chuyển:"
                                            controltype="InputControl"
                                            IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PIM_SHIPPINGMETHOD" valuemember="ShippingMethodID" nameMember="ShippingMethodName"
                                            value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_Ship : -1}
                                            listoption={[]} datasourcemember="ArryProduct_Ship"
                                            disabled={this.CheckPermissionUser(7) == false ? true : false}
                                        />
                                        
                    
                                        <div className="form-row">
                                            <FormControl.ComboBox name="cboPovat" isautoloaditemfromcache={false}
                                                label="VAT mua hàng(%)"
                                                colspan="8"
                                                controltype="InputControl"
                                                value={this.state.DataSource != [] ? this.state.DataSource.Povat : -1}
                                                listoption={listOption} datasourcemember="Povat"
                                                labelcolspan={6}
                                                colspan={6}
                                                rowspan={8}
                                                paddinginput={8}
                                                disabled={this.CheckPermissionUser(7) == false ? true : false}
                                            />
                                            <FormControl.CheckBox name="chkIsnopovat" label="Không thuế xuất mua hàng"
                                                datasourcemember="Isnopovat"
                                                className="form-check-input" controltype="InputControl"
                                                value={this.state.DataSource.Isnopovat}
                                                labelcolspan={11}
                                                colspan={1}
                                                rowspan={4}
                                                swaplabel={true}
                                                disabled={this.CheckPermissionUser(7) == false ? true : false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return (<div>
            <label>Đang nạp dữ liệu...</label>
        </div>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }

    }
}

const GeneralInfo = connect(mapStateToProps, mapDispatchToProps)(GeneralInfoCom);
export default GeneralInfo;
