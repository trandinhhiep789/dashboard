import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { MessageModal } from "../../../../../common/components/Modal";
import TabContainer from "../../../../../common/components/FormContainer/TabContainer";
import TabPage from "../../../../../common/components/FormContainer/TabPage";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import { callGetCache } from "../../../../../actions/cacheAction";
import { PRODUCT_UPDATE } from "../../../../../constants/functionLists";
import EditImage from "../Component";
import Collapsible from 'react-collapsible';

import {
    SearchAPIPath,
    SearchModelAPIPath,
    PKColumnName,
    SearchMLObjectDefinition,
    SearchElementList,
    DataGridColumnList,
    DataGridColumnListMultiple,
    IDSelectColumnNameItem,
    IDSelectColumnNameMultiple

} from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal/constants";
import {
    APIHostName, LoadAPIPathNew, UpdateAPIPath, AddElementList, MLObjectDefinition, BackLink, EditPagePath, AddLogAPIPath
} from "../Constants";
import { showModal, hideModal } from "../../../../../actions/modal";
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputImagesInsert = this.handleInputImagesInsert.bind(this);
        this.closeVariant = this.closeVariant.bind(this);
        this.state = {
            CallAPIMessage: "", gridDataSource: [], DataSource: [], IsCallAPIError: false,
            FormContent: "", IsLoadDataComplete: false, IsCloseForm: false,
            FormData: {}, Product_Attribute: {}, Product_Partnermap: {}, Product_Content: {}, Product_Article: {}, Product_Video: {}, Isedit: false,
            FocusTabIndex: 3,
            LstCacheAttribute: [],
            LstCacheAttributeValueID: [],
            SearchAPIPath: SearchAPIPath,
            SearchModelAPIPath: SearchModelAPIPath,
            SearchMLObjectDefinition: SearchMLObjectDefinition,
            SearchElementList: SearchElementList,
            DataGridColumnList: DataGridColumnList,
            lstOptionInputMultiple: [],
            lstChangvalition: {}
        };


    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPathNew, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                if (apiResult.ResultObject.ModelID != "")
                    this.setState({ lstOptionInputMultiple: [{ value: apiResult.ResultObject.ModelID, label: apiResult.ResultObject.ModelName }] });
                this.setState({ DataSource: apiResult.ResultObject, IsLoadDataComplete: true });

            }
        });
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

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật sản phẩm: ${MLObject.ProductName}`;
        MLObject.ActivityDetail = `Cập nhật sản phẩm: ${MLObject.ProductName} ${"\n"}Mô tả: ${MLObject.ProductshortName}`;
        MLObject.ObjectID = "PIM_PRODUCT";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleInputImagesInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: { text: <EditImage handleImages={this.closeVariant} /> },
            maxWidth: '1000px'
        });
    }

    closeVariant(formData, MLObject) {
        console.log("closeVariant", formData, MLObject);
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ModelID = this.state.lstOptionInputMultiple[0].value;
        // console.log("handleSubmit",formData, MLObject);
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(MLObject);
            }
        });
    }

    handleInsertItem(lstOption) {
        this.setState({
            lstOptionInputMultiple: lstOption
        })

    }

    // Componentcontent(formData, MLObject) {
    //     console.log("vao", formData, MLObject);
    // }

    render() {
        const listOption = [{ value: 1, label: "0 %" }, { value: 2, label: "5 %" }, { value: 3, label: "10 %" }];
        const listOption2 = [];
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer FormName="Sửa sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={AddElementList}
                    dataSource={this.state.DataSource}
                    IsAutoLayout={true}
                    ClassNameSingePage="page-product"
                    // onInputChangeList={this.handleInputChangeList}
                    Lstchangvalition={this.state.lstChangvalition}
                    //RequirePermission={PRODUCT_UPDATE}
                    onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormControl.TextBox name="txtProductID" colspan="8" labelcolspan="4" readOnly={true} label="Mã sản phẩm:" placeholder="Mã sản phẩm" controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ProductID : ""} datasourcemember="ProductID" />
                            <FormControl.TextBox name="txtProductName" colspan="8" labelcolspan="4" label="Tên sản phẩm:" placeholder="Tên sản phẩm" validatonList={["required"]} controltype="InputControl" value={this.state.DataSource.ProductName} datasourcemember="ProductName" />
                            <FormControl.TextBox name="txtProductshortName" colspan="8" labelcolspan="4" label="Tên rút gọn sản phẩm:" placeholder="Tên rút gọn sản phẩm" validatonList={["required"]} controltype="InputControl" value={this.state.DataSource.ProductshortName} datasourcemember="ProductshortName" />
                            <FormControl.ComboBox name="cboProductTypeID" colspan="8" labelcolspan="4" type="select" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE" valuemember="ProductTypeID" nameMember="ProductTypeName" label="Loại sản phẩm:" controltype="InputControl" value={this.state.DataSource.ProductTypeID} listoption={listOption2} datasourcemember="ProductTypeID" />
                            <FormControl.ComboBox name="cboDefaultCategoryID" colspan="8" validatonList={["Comborequired"]} isautoloaditemfromcache={true} isCategory={true} loaditemcachekeyid="PIMCACHE.CATEGORY" valuemember="CategoryID" nameMember="CategoryName" labelcolspan="4" label="Danh mục mặc định:" controltype="InputControl" value={this.state.DataSource.DefaultCategoryID} listoption={listOption} datasourcemember="DefaultCategoryID" />
                            <FormControl.ComboBox name="cboBrandID" colspan="8" labelcolspan="4" label="Nhãn hiệu:" controltype="InputControl" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.BRAND" valuemember="BrandID" nameMember="BrandName" value={this.state.DataSource.BrandID} listoption={[]} datasourcemember="BrandID" />
                            <FormControl.ComboBox name="cboDefaultquantityunitID" colspan="8" labelcolspan="4" label="Đơn vị tính mặc định:" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.QUANTITYUNIT" valuemember="QuantityUnitID" nameMember="QuantityUnitName" controltype="InputControl" value={this.state.DataSource.DefaultquantityunitID} listoption={null} datasourcemember="DefaultquantityunitID" />
                            <FormControl.MultiSelectComboBox name="ArryProduct_Feature" colspan="8" labelcolspan="4" label="Đặc điểm sản phẩm:"
                                IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTFEATURE" valuemember="ProductFeatureID" nameMember="ProductFeatureName" controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_Feature : -1} listoption={null} datasourcemember="ArryProduct_Feature" />

                            <FormControl.GroupTextBox
                                name="txtModelID"
                                colspan="8"
                                labelcolspan="4"
                                readonly={false}
                                label="Model:"
                                placeholder="Model"
                                controltype="InputControl"
                                PKColumnName={PKColumnName}
                                lstOption={this.state.lstOptionInputMultiple}
                                datasourcemember="ModelID"
                                dataNamesourcemember="ModelName"
                                IsDisabledButton="false"
                                dataGridColumnList={DataGridColumnList}
                                IDSelectColumnName={IDSelectColumnNameItem}
                                SearchAPIPath={this.state.SearchModelAPIPath}
                                titleModal="Thông tin tìm kiếm"
                                gridDataSource={this.state.gridDataSource}
                                SearchMLObjectDefinition={this.state.SearchMLObjectDefinition}
                                SearchElementList={this.state.SearchElementList}
                                multipleCheck={false}
                                onClickInsertItem={this.handleInsertItem.bind(this)}
                            />
                        </div>
                        <div className="col-lg-6">
                            <div className="form-row default-image-product">
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">Ảnh đại diện:</label>
                                </div>
                                <div className="form-group col-md-8 image-product">
                                    {/* <img name="DefaultImageURL" src="/src/img/iphone.png" data-original-src="../assets/img/iphone.png" /> */}
                                    <p name="DefaultImageURL" className="defaultImage" style={{ height: 250, backgroundImage: "url(" + (this.state.DataSource.DefaultImageURL != "" ? this.state.DataSource.DefaultImageURL : "/src/img/mwg-icon.png") + ")" }}></p>
                                </div>
                            </div>

                            <FormControl.MultiSelectComboBox name="ArryProduct_ShippingMethod" colspan="8" labelcolspan="4" label="Phương thức vận chuyển:"
                                IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PIM_SHIPPINGMETHOD" valuemember="ShippingMethodID" nameMember="ShippingMethodName" controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_ShippingMethod : -1} listoption={[]} datasourcemember="ArryProduct_ShippingMethod" />

                            <div className="form-row">
                                <FormControl.ComboBox name="cboVat" isautoloaditemfromcache={false} label="VAT(%):" colspan="8" labelcolspan="0" controltype="InputControl" value={this.state.DataSource.Vat} listoption={listOption} datasourcemember="Vat" labelcolspan={7} colspan={5} rowspan={7} paddinginput={8} />
                                <FormControl.CheckBox name="chkIsnovat" label="Không thuế suất:" datasourcemember="Isnovat" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isnovat} labelcolspan={10} colspan={2} rowspan={5} swaplabel={true} />
                            </div>

                            <div className="form-row">
                                <FormControl.ComboBox name="cboPovat" isautoloaditemfromcache={false} label="VAT mua hàng(%):" colspan="8" labelcolspan="0" controltype="InputControl" value={this.state.DataSource.Povat} listoption={listOption} datasourcemember="Povat" labelcolspan={7} colspan={5} rowspan={7} paddinginput={8} />
                                <FormControl.CheckBox name="chkIsnopovat" label="Không thuế xuất mua hàng:" datasourcemember="Isnopovat" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isnopovat} labelcolspan={10} colspan={2} rowspan={5} swaplabel={true} />
                            </div>
                        </div>
                    </div>

                    <TabContainer defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" ClassNameProductTab="tab-product">
                        <TabPage title="Thông tin khác" name="Product" >
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu IMEI:" name="IsrequesTimei" datasourcemember="IsrequesTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsrequesTimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu quản lý theo lô:" name="Isrequestlot" datasourcemember="Isrequestlot" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequestlot} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm yêu cầu nhập PINCode:" name="Isrequirepincode" datasourcemember="Isrequirepincode" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequirepincode} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động tạo IMEI khi nhập:" name="Isautocreateimei" datasourcemember="Isautocreateimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isautocreateimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Có kiểm tra tồn kho:" name="Ischeckinstock" datasourcemember="Ischeckinstock" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Ischeckinstock} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động lấy IMEI khi xuất:" name="IsautogeTimei" datasourcemember="IsautogeTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsautogeTimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm bắt buộc nhập IMEI sản phẩm được lắp đặt:" name="Isinputinstallimei" datasourcemember="Isinputinstallimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isinputinstallimei} />
                                </div>
                                <div className="col-lg-6">
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm phải vận chuyển và lắp đặt tận nhà:" name="Isshippingandinstall" datasourcemember="Isshippingandinstall" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isshippingandinstall} />
                                </div>
                            </div>
                        </TabPage>
                        <TabPage title="" name="" >
                        </TabPage>
                    </TabContainer>
                </FormContainer>
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;