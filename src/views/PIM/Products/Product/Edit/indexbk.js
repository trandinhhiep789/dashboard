import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../common/components/Tabs/TabPage";
import { callGetCache } from "../../../../../actions/cacheAction";

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
    APIHostName, LoadAPIPath, UpdateAPIPath, AddElementList, MLObjectDefinition, BackLink, EditPagePath, GridMLObjectBarcodeDefinition,
    InputBarcodeColumnList, IDSelectColumnName, InputCategoryTypeColumnList, GridMLObjectOutputAnotherStoreDefinition, InputOutputAnotherStoreColumnList,
    GridMLObjectCategoryTypeDefinition, GridMLObjectProductAttributeDefinition, InputProductAttributeColumnList,
    InputProductStatusColumnList, GridMLObjectProductStatusDefinition, InputProductLimitColumnList, GridMLObjectProductLimitDefinition,
    InputProductPartnerColumnList, GridMLObjectPartnerDefinition, GridMLObjectContentDefinition, InputProductContentColumnList, InputProductAlbumColumnList,
    GridMLObjectAlbumDefinition, GridMLObjectArticleDefinition, InputProductArticleColumnList, GridMLObjectImagesDefinition, InputProductImagesColumnList,
    GridMLObjectVideoDefinition, InputProductVideoColumnList, AddLogAPIPath
} from "../Constants";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
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
            lstOptionInputMultiple: []
        };
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleInputAttributeInsert = this.handleInputAttributeInsert.bind(this);
        this.handleAttributeInsert = this.handleAttributeInsert.bind(this);
        this.onTextChange1 = this.onTextChange1.bind(this);
        this.handleInputAttributeEdit = this.handleInputAttributeEdit.bind(this);
        this.handleDeleteProductAttribute = this.handleDeleteProductAttribute.bind(this);

        this.handleProductBarcodeInsert = this.handleProductBarcodeInsert.bind(this);
        this.handleChangeProductBarcode = this.handleChangeProductBarcode.bind(this);
        this.handleDeleteProductBarcode = this.handleDeleteProductBarcode.bind(this);

        this.handleInputPartnerInsert = this.handleInputPartnerInsert.bind(this);
        this.handlePartnerInsert = this.handlePartnerInsert.bind(this);
        this.handleInputPartnerEdit = this.handleInputPartnerEdit.bind(this);
        this.handleDeleteProductPartnermap = this.handleDeleteProductPartnermap.bind(this);

        this.handleInputContentInsert = this.handleInputContentInsert.bind(this);
        this.handleContentInsert = this.handleContentInsert.bind(this);
        this.handleInputContentEdit = this.handleInputContentEdit.bind(this);
        this.handleDeleteProductContent = this.handleDeleteProductContent.bind(this);

        this.handleInputGridAlbumInsert = this.handleInputGridAlbumInsert.bind(this);
        this.handleDeleteProductAlbum = this.handleDeleteProductAlbum.bind(this);
        this.handleChangeProductAlbum = this.handleChangeProductAlbum.bind(this);

        this.handleInputArticleInsert = this.handleInputArticleInsert.bind(this);
        this.handleArticleInsert = this.handleArticleInsert.bind(this);
        this.handleInputArticleEdit = this.handleInputArticleEdit.bind(this);
        this.handleDeleteProductArticle = this.handleDeleteProductArticle.bind(this);

        this.handleInputImagesInsert = this.handleInputImagesInsert.bind(this);
        this.handleInputImagesEdit = this.handleInputImagesEdit.bind(this);
        this.handleImagesInsert = this.handleImagesInsert.bind(this);
        this.handleDeleteProductImages = this.handleDeleteProductImages.bind(this);

        this.handleInputVideoInsert = this.handleInputVideoInsert.bind(this);
        this.handleInputVideoEdit = this.handleInputVideoEdit.bind(this);
        this.handleVideoInsert = this.handleVideoInsert.bind(this);
        this.handleDeleteProductVideo = this.handleDeleteProductVideo.bind(this);

        this.handleOutputAnotherStoreInsert = this.handleOutputAnotherStoreInsert.bind(this);
        this.handleDeleteProductOutput = this.handleDeleteProductOutput.bind(this);
        this.handleChangeProductOutput = this.handleChangeProductOutput.bind(this);

        this.handleSelectedFileImage = this.handleSelectedFileImage.bind(this);
        this.handleSelectedFileVideo = this.handleSelectedFileVideo.bind(this);
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this._getCacheAttribute();
        this._getCacheAttributeValue();
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                if (apiResult.ResultObject.ModelID != "")
                    this.setState({ lstOptionInputMultiple: [{ value: apiResult.ResultObject.ModelID, label: apiResult.ResultObject.ModelName }] });
                this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            })
        });
    }

    _getCacheAttribute() {
        this.props.callGetCache("PIMCACHE.PIMATTRIBUTE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheAttribute: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheAttributeValue() {
        this.props.callGetCache("PIMCACHE.ATTRIBUTEVALUE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheAttributeValueID: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    // getCacheCategory() {
    //     this.props.callGetCache("PIMCACHE.CATEGORY").then((apiResult) => {
    //         if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
    //             this.setState({
    //                 cacheCategoryType: apiResult.ResultObject.CacheData,
    //             });
    //             const LstCategory_Member = []
    //             const formData = Object.assign({}, this.state.cacheCategoryType, { LstCategory_Member });
    //             console.log("getCacheCategory",formData);
    //         }
    //     });
    // }
    handleInputChangeList(formDataTemp, tabNameList, tabMLObjectDefinitionList) {
        this.setState({ FormData: formDataTemp });
    }

    handleProductBarcodeInsert() {
        let LstProduct_Barcode = this.state.FormData.LstProduct_Barcode;
        const BarcodeItem = {
            Barcode: "",
            BarcodeDescription: "",
            IsActived: false,
            IsDeleted: false,
            IsSystem: false,
            LoginLogID: null,
            ProductID: this.state.DataSource.ProductID
        };
        LstProduct_Barcode.push(BarcodeItem);
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Barcode: LstProduct_Barcode });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Barcode: LstProduct_Barcode });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    handleDeleteProductBarcode(deleteList, result) {
        let LstProduct_Barcode = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Barcode.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Barcode: LstProduct_Barcode });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Barcode: LstProduct_Barcode });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    handleChangeProductBarcode(elementdata, index) {
        const element = Object.assign({}, this.state.FormData.LstProduct_Barcode[index], { [elementdata.Name]: elementdata.Value });
        const LstProduct_Barcode = Object.assign([], this.state.FormData.LstProduct_Barcode, { [index]: element });
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Barcode: LstProduct_Barcode });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Barcode: LstProduct_Barcode });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    //Product_Attribute
    handleInputAttributeInsert() {
        this.state.Product_Attribute = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Attribute: this.state.Product_Attribute }, () => {
            this.openAttributeModal();
        });
    }
    handleInputAttributeEdit(index) {
        const Product_Attribute = {
            AttributeID: this.state.FormData.LstProduct_Attribute[index].AttributeID,
            AttributeValue: this.state.FormData.LstProduct_Attribute[index].AttributeValue,
            AttributeValueID: this.state.FormData.LstProduct_Attribute[index].AttributeValueID,
            Isvariantattribute: this.state.FormData.LstProduct_Attribute[index].Isvariantattribute,
            index: index
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Attribute: Product_Attribute }, () => {
            this.openAttributeModal()
        });
    }
    handleAttributeInsert() {
        let LstProduct_Attribute = this.state.FormData.LstProduct_Attribute;
        console.log("handleAttributeInsert", this.state.FormData, LstProduct_Attribute, this.state.Product_Attribute);
        if (this.state.Isedit) {
            let Product_Attribute = this.state.FormData.LstProduct_Attribute[parseInt(this.state.Product_Attribute.index)];
            Product_Attribute.AttributeID = this.state.Product_Attribute.AttributeID
            Product_Attribute.AttributeValue = this.state.Product_Attribute.AttributeValue
            Product_Attribute.AttributeValueID = this.state.Product_Attribute.AttributeValueID
            Product_Attribute.Isvariantattribute = this.state.Product_Attribute.Isvariantattribute
        }
        else {
            LstProduct_Attribute.push(this.state.Product_Attribute);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Attribute: LstProduct_Attribute });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Attribute: LstProduct_Attribute });
        this.setState({ FormData: formData, DataSource: dataSource }, () => {
            this.openAttributeModal();
        });
        ModalManager.close();
    }
    onTextChange1(e) {
        const name = e.target.name;
        let value = e.target.value;
        let id = e.target.id;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }

        let { Product_Attribute } = this.state;
        Product_Attribute[name] = value;
        if (id != "") {
            Product_Attribute[id] = e.target.options[e.target.selectedIndex].label;
        }
        this.setState({ Product_Attribute: Product_Attribute }, () => {
            this.openAttributeModal();
        });
    }
    openAttributeModal() {
        console.log("openAttributeModal", this.state.Product_Attribute);
        ModalManager.open(
            <ModelContainer title="Thông báo" name="Product_Attribute"
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
                onChangeModal={this.handleAttributeInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Thuộc tính:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" value={this.state.Product_Attribute.AttributeID} id='AttributeName' onChange={this.onTextChange1.bind(this)} name="AttributeID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCacheAttribute.map((optionItem) => {
                                return (
                                    <option value={optionItem.AttributeID} label={optionItem.AttributeName} />
                                )
                            }
                            )}
                        </select>
                        {/* <input className="form-control form-control-sm" name="AttributeID" onChange={this.onTextChange1} placeholder="Mã sản phẩm" value={this.state.Product_Attribute.AttributeID} datasourcemember="AttributeID" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div> */}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Giá trị thuộc tính:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" value={this.state.Product_Attribute.AttributeValueID} id='AttributeValueName' onChange={this.onTextChange1.bind(this)} name="AttributeValueID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCacheAttributeValueID.map((optionItem) => {
                                return (
                                    <option value={optionItem.AttributeValueID} label={optionItem.AttributeValue} />
                                )
                            }
                            )}
                        </select>
                        {/* <input className="form-control form-control-sm" name="AttributevalueID" onChange={this.onTextChange1} placeholder="Mã sản phẩm" value={this.state.Product_Attribute.AttributevalueID} datasourcemember="AttributeID" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div> */}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên thuộc tính:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="AttributeValue" onChange={this.onTextChange1} placeholder="Mã sản phẩm" value={this.state.Product_Attribute.AttributeValue} datasourcemember="AttributeValue" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Là thuộc tính variant:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Attribute.Isvariantattribute} name="Isvariantattribute" onChange={this.onTextChange1} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleDeleteProductAttribute(deleteList, result) {
        let LstProduct_Attribute = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Attribute.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Attribute: LstProduct_Attribute });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Attribute: LstProduct_Attribute });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    //End Product_Attribute

    //Product_Partnermap
    handleInputPartnerInsert() {
        this.state.Product_Partnermap = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Partnermap: this.state.Product_Partnermap }, () => {
            this.openPartnerModal();
        });
    }
    handleInputPartnerEdit(id) {
        const Product_Partnermap = {
            PartnerProductCode: this.state.FormData.LstProduct_Partnermap[id].PartnerProductCode,
            PartnerProductName: this.state.FormData.LstProduct_Partnermap[id].PartnerProductName,
            CustomerID: this.state.FormData.LstProduct_Partnermap[id].CustomerID,
            CustomerName: this.state.FormData.LstProduct_Partnermap[id].CustomerName,
            PartnerProductmapTypeID: this.state.FormData.LstProduct_Partnermap[id].PartnerProductmapTypeID,
            PartnerProductmapTypeName: this.state.FormData.LstProduct_Partnermap[id].PartnerProductmapTypeName,
            PartnerQuantityunitName: this.state.FormData.LstProduct_Partnermap[id].PartnerQuantityunitName
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Partnermap: Product_Partnermap }, () => {
            this.openPartnerModal()
        });
    }
    handlePartnerInsert() {
        let LstProduct_Partnermap = this.state.FormData.LstProduct_Partnermap;
        if (this.state.Isedit) {
            let Product_Partnermap = this.state.FormData.LstProduct_Partnermap.filter(a => parseInt(a.CustomerID) === parseInt(this.state.Product_Partnermap.CustomerID));
            Product_Partnermap[0].PartnerProductCode = this.state.Product_Partnermap.PartnerProductCode
            Product_Partnermap[0].PartnerProductName = this.state.Product_Partnermap.PartnerProductName
            Product_Partnermap[0].CustomerID = this.state.Product_Partnermap.CustomerID
            Product_Partnermap[0].PartnerProductmapTypeID = this.state.Product_Partnermap.PartnerProductmapTypeID
            Product_Partnermap[0].CustomerName = this.state.Product_Partnermap.CustomerName
            Product_Partnermap[0].PartnerProductmapTypeName = this.state.Product_Partnermap.PartnerProductmapTypeName
            Product_Partnermap[0].PartnerQuantityunitName = this.state.Product_Partnermap.PartnerQuantityunitName
        }
        else {
            LstProduct_Partnermap.push(this.state.Product_Partnermap);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Partnermap: LstProduct_Partnermap });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Partnermap: LstProduct_Partnermap });
        this.setState({ FormData: formData, DataSource: dataSource }, () => {
            this.openPartnerModal();
        });
        ModalManager.close();
    }
    onTextChangePartner(e) {
        const name = e.target.name;
        const value = e.target.value;
        let id = e.target.id;
        // console.log("this.state", this.state);
        let { Product_Partnermap } = this.state;
        Product_Partnermap[name] = value;
        if (id != "") {
            Product_Partnermap[id] = e.target.options[e.target.selectedIndex].label;
        }
        this.setState({ Product_Partnermap: Product_Partnermap }, () => {
            this.openPartnerModal();
        });
    }
    openPartnerModal() {
        ModalManager.open(
            <ModelContainer title="Thông báo" name="Product_Partnermap"
                content={"Cập nhật đối tác!"} onRequestClose={() => true}
                onChangeModal={this.handlePartnerInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mã Sản phẩm của đối tác:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="PartnerProductCode" onChange={this.onTextChangePartner.bind(this)} value={this.state.Product_Partnermap.PartnerProductCode} placeholder="Mã Sản phẩm của đối tác" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên sản phẩm của đối tác:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="PartnerProductName" onChange={this.onTextChangePartner.bind(this)} value={this.state.Product_Partnermap.PartnerProductName} placeholder="Tên sản phẩm của đối tác" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đối tác:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" id='CustomerName' value={this.state.Product_Partnermap.CustomerID} onChange={this.onTextChangePartner.bind(this)} name="CustomerID">
                            <option value="-1" label="--Vui lòng chọn--">
                            </option><option value='1' label="SUMSUNG">
                            </option><option value="2" label="SONY">  </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại sản phẩm của đối tác:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" id='PartnerProductmapTypeName' value={this.state.Product_Partnermap.PartnerProductmapTypeID} onChange={this.onTextChangePartner.bind(this)} name="PartnerProductmapTypeID">
                            <option value="-1" label="--Vui lòng chọn--"> </option>
                            <option value="1" label="Mã sản phẩm của đối tác (giao tiếp,KHBH,Apple...)"></option>
                            <option value="2" label="Mã sản phẩm của Metro"> </option>
                            <option value="3" label="Mã sản phẩm của BigC"> </option>
                            <option value="4" label="Mã sản phẩm của Bách hóa xanh"> </option>
                            <option value="5" label="Mã sản phẩm của dược phẩm"> </option>
                            <option value="6" label="Mã sản phẩm đối tác của VuiVui"> </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đơn vị tính:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="PartnerQuantityunitName" onChange={this.onTextChangePartner.bind(this)} value={this.state.Product_Partnermap.PartnerQuantityunitName} placeholder="Đơn vị tính của đối tác" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>

            </ModelContainer>
        );
    }

    handleDeleteProductPartnermap(deleteList, result) {
        let LstProduct_Partnermap = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Partnermap.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Partnermap: LstProduct_Partnermap });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Partnermap: LstProduct_Partnermap });
        this.setState({ FormData: formData, DataSource: dataSource });
    }
    // End Product_Partnermap

    //Product_Content
    handleInputContentInsert() {
        this.state.Product_Content = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Content: this.state.Product_Content }, () => {
            this.openContentModal();
        });
    }
    handleInputContentEdit(id) {

        const Product_Content = {
            ProductContentID: this.state.FormData.LstProduct_Content[id].ProductContentID,
            ContentTypeID: this.state.FormData.LstProduct_Content[id].ContentTypeID,
            ContentTypeName: this.state.FormData.LstProduct_Content[id].ContentTypeName,
            LanguageID: this.state.FormData.LstProduct_Content[id].LanguageID,
            LanguageName: this.state.FormData.LstProduct_Content[id].LanguageName,
            ContentDescription: this.state.FormData.LstProduct_Content[id].ContentDescription
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Content: Product_Content }, () => {
            this.openContentModal()
        });
    }
    handleContentInsert() {
        let LstProduct_Content = this.state.FormData.LstProduct_Content;
        if (this.state.Isedit) {
            let Product_Content = this.state.FormData.LstProduct_Content.filter(a => a.ProductContentID === this.state.Product_Content.ProductContentID);

            Product_Content[0].ProductContentID = this.state.Product_Content.ProductContentID
            Product_Content[0].ContentTypeID = this.state.Product_Content.ContentTypeID
            Product_Content[0].ContentTypeName = this.state.Product_Content.ContentTypeName
            Product_Content[0].LanguageID = this.state.Product_Content.LanguageID
            Product_Content[0].LanguageName = this.state.Product_Content.LanguageName
            Product_Content[0].ContentDescription = this.state.Product_Content.ContentDescription
        }

        else {
            LstProduct_Content.push(this.state.Product_Content);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Content: LstProduct_Content });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Content: LstProduct_Content });
        this.setState({ FormData: formData, DataSource: dataSource }, () => {
            this.openContentModal();
        });
        ModalManager.close();
    }
    onTextChangeContent(e) {
        const name = e.target.name;
        const value = e.target.value;
        let id = e.target.id;
        let { Product_Content } = this.state;
        Product_Content[name] = value;
        if (id != "") {
            Product_Content[id] = e.target.options[e.target.selectedIndex].label;
        }
        this.setState({ Product_Content: Product_Content }, () => {
            this.openContentModal();
        });
    }
    openContentModal() {
        ModalManager.open(
            <ModelContainer title="Thông báo" name="Product_Content"
                content={"Cập nhật đối tác!"} onRequestClose={() => true}
                onChangeModal={this.handleContentInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại nội dung:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" id="ContentTypeName" value={this.state.Product_Content.ContentTypeID} onChange={this.onTextChangeContent.bind(this)} name="ContentTypeID">
                            <option value="-1" label="--Vui lòng chọn--">  </option>
                            <option value='1' label="Key selling point "></option>
                            <option value="2" label="Mô tả sản phẩm">  </option>
                            <option value="3" label="Cấu hình sản phẩm"></option>
                            <option value="4" label="Thông tin tùy chọn"></option>
                            <option value="5" label="Tính năng nổi bật"></option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Ngôn ngữ:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" id="LanguageName" value={this.state.Product_Content.LanguageID} onChange={this.onTextChangeContent.bind(this)} name="LanguageID">
                            <option value="-1" label="--Vui lòng chọn--">
                            </option><option value="1" label="English">
                            </option><option value="2" label="Vietnamese"> </option>
                            <option value="3" label="Khmer"> </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ContentDescription" onChange={this.onTextChangeContent.bind(this)} value={this.state.Product_Content.ContentDescription} placeholder="Mã Sản phẩm của đối tác" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleDeleteProductContent(deleteList, result) {
        let LstProduct_Content = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Content.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Content: LstProduct_Content });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Content: LstProduct_Content });
        this.setState({ FormData: formData, DataSource: dataSource });
    }
    // End Product_Connect

    // Product_Album
    handleInputGridAlbumInsert() {
        let LstProduct_Album = this.state.FormData.LstProduct_Album;
        const AlbumItem = {
            AlbumID: "",
            AlbumName: "",
            CreatedDate: null,
            CreatedUser: "",
            DeletedDate: null,
            DeletedUser: "",
            Description: "",
            IconfileURL: "",
            IsActived: false,
            IsDeleted: false,
            IsSystem: false,
            Isdefault: false,
            LoginLogID: null,
            ProductID: this.state.DataSource.ProductID,
            UpDatedDate: null,
            UpDatedUser: ""
        };
        LstProduct_Album.push(AlbumItem);
        const FormData = Object.assign({}, this.state.FormData, { LstProduct_Album: LstProduct_Album });
        const DataSource = Object.assign({}, this.state.DataSource, { LstProduct_Album: LstProduct_Album });
        this.setState({ FormData, DataSource });
    }

    handleDeleteProductAlbum(deleteList, result) {
        let LstProduct_Album = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Album.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Album: LstProduct_Album });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Album: LstProduct_Album });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    handleChangeProductAlbum(elementdata, index) {
        const element = Object.assign({}, this.state.FormData.LstProduct_Album[index], { [elementdata.Name]: elementdata.Value });
        const LstProduct_Album = Object.assign([], this.state.FormData.LstProduct_Album, { [index]: element });
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Album: LstProduct_Album });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Album: LstProduct_Album });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    // END Product_Album

    //Product_Images
    handleSelectedFileImage(event) {
        const SelectedFile = Object.assign({}, { [event.target.name]: event.target.files[0] });
        const Product_Images = Object.assign({}, this.state.Product_Images, { [event.target.name]: event.target.files[0].name }, { SelectedFile });
        this.setState({ Product_Images }, () => {
            this.openImagesModal();
        });

    }
    handleInputImagesInsert() {
        this.state.Product_Images = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Images: this.state.Product_Images }, () => {
            this.openImagesModal();
        });
    }
    handleInputImagesEdit(index) {
        const Product_Images = {
            AlbumID: this.state.FormData.LstProduct_Images[index].AlbumID,
            ImageName: this.state.FormData.LstProduct_Images[index].ImageName,
            ProductImageTypeID: this.state.FormData.LstProduct_Images[index].ProductImageTypeID,
            ImagefileURL: this.state.FormData.LstProduct_Images[index].ImagefileURL,
            Isdefault: this.state.FormData.LstProduct_Images[index].Isdefault,
            IsActived: this.state.FormData.LstProduct_Images[index].IsActived,
            index: index
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Images: Product_Images }, () => {
            this.openImagesModal()
        });
    }
    handleImagesInsert() {
        let LstProduct_Images = this.state.FormData.LstProduct_Images;
        if (this.state.Isedit) {
            let Product_Images = this.state.FormData.LstProduct_Images[this.state.Product_Images.index];
            Product_Images.AlbumID = this.state.Product_Images.AlbumID
            Product_Images.ImageName = this.state.Product_Images.ImageName
            Product_Images.ProductImageTypeID = this.state.Product_Images.ProductImageTypeID
            Product_Images.ImagefileURL = this.state.Product_Images.ImagefileURL
            Product_Images.Isdefault = this.state.Product_Images.Isdefault
            Product_Images.IsActived = this.state.Product_Images.IsActived
        }
        else {
            LstProduct_Images.push(this.state.Product_Images);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Images: LstProduct_Images });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Images: LstProduct_Images });
        this.setState({ FormData: formData, DataSource: dataSource }, () => {
            this.openImagesModal();
        });
        ModalManager.close();
    }
    onTextChangeImages(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { Product_Images } = this.state;
        Product_Images[name] = value;
        this.setState({ Product_Images: Product_Images }, () => {
            this.openImagesModal();
        });
    }
    openImagesModal() {
        ModalManager.open(
            <ModelContainer title="Thông báo" name="Product_Article"
                content={"Cập nhật đối tác!"} onRequestClose={() => true}
                onChangeModal={this.handleImagesInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Album:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="AlbumID" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.AlbumID} placeholder="Album" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ImageName" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.ImageName} placeholder="Tên hình ảnh" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ProductImageTypeID" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.ProductImageTypeID} placeholder="Loại hình ảnh" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn hình ảnh:</label>
                    </div>
                    <div className="form-group col-md-10">
                        {/* <input className="form-control form-control-sm" name="ImagefileURL" 
                            onChange={this.onTextChangeImages.bind(this)} 
                            value={this.state.Product_Images.ImagefileURL} placeholder="Đường dẫn" /> */}
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Images.ImagefileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="ImagefileURL" id="ImagefileURL" onChange={this.handleSelectedFileImage} accept="image/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="ImagefileURL" >
                                    <i className="fa fa-upload"></i>
                                </label>
                            </span>
                        </div>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mặc định:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Images.Isdefault} name="Isdefault" onChange={this.onTextChangeImages.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Images.IsActived} name="IsActived" onChange={this.onTextChangeImages.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleDeleteProductImages(deleteList, result) {
        let LstProduct_Images = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Images.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Images: LstProduct_Images });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Images: LstProduct_Images });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    // End Product_Images

    //Product_Video
    handleSelectedFileVideo(event) {
        const SelectedFile = Object.assign({}, { [event.target.name]: event.target.files[0] });
        const Product_Video = Object.assign({}, this.state.Product_Video, { [event.target.name]: event.target.files[0].name }, { SelectedFile });
        console.log("Product_Video", Product_Video);
        this.setState({ Product_Video }, () => {
            this.openVideoModal();
        });

    }
    handleInputVideoInsert() {
        this.state.Product_Video = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Video: this.state.Product_Video }, () => {
            this.openVideoModal();
        });
    }
    handleInputVideoEdit(index) {
        const Product_Video = {
            VideoID: this.state.FormData.LstProduct_Video[index].VideoID,
            VideoName: this.state.FormData.LstProduct_Video[index].VideoName,
            VideofileURL: this.state.FormData.LstProduct_Video[index].VideofileURL,
            ImagefileURL: this.state.FormData.LstProduct_Video[index].ImagefileURL,
            ImageVideofileURL: this.state.FormData.LstProduct_Video[index].ImageVideofileURL,
            Isdefault: this.state.FormData.LstProduct_Video[index].Isdefault,
            IsActived: this.state.FormData.LstProduct_Video[index].IsActived,
            index: index
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Video: Product_Video }, () => {
            this.openVideoModal()
        });
    }
    handleVideoInsert() {
        let LstProduct_Video = this.state.FormData.LstProduct_Video;
        if (this.state.Isedit) {
            let Product_Video = this.state.FormData.LstProduct_Video[this.state.Product_Video.index];
            Product_Video.VideoID = this.state.Product_Video.VideoID
            Product_Video.VideoName = this.state.Product_Video.VideoName
            Product_Video.VideofileURL = this.state.Product_Video.VideofileURL
            Product_Video.ImageVideofileURL = this.state.Product_Video.ImageVideofileURL
            Product_Video.Isdefault = this.state.Product_Video.Isdefault
            Product_Video.IsActived = this.state.Product_Video.IsActived
        }
        else {
            LstProduct_Video.push(this.state.Product_Video);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Video: LstProduct_Video });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Video: LstProduct_Video });
        this.setState({ FormData: formData, DataSource: dataSource }, () => {
            this.openVideoModal();
        });
        ModalManager.close();
    }
    onTextChangeVideo(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { Product_Video } = this.state;
        Product_Video[name] = value;
        this.setState({ Product_Video: Product_Video }, () => {
            this.openVideoModal();
        });
    }
    openVideoModal() {
        ModalManager.open(
            <ModelContainer title="Video" name="Product_Video"
                content={"Cập nhật đối tác!"} onRequestClose={() => true}
                onChangeModal={this.handleVideoInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mã video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" readOnly={true} name="VideoID" onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.VideoID} placeholder="Tiêu đề" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tên video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="VideoName" onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.VideoName} placeholder="Tên video" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn Video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        {/* <input className="form-control form-control-sm" name="VideofileURL"
                            onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.VideofileURL}
                            placeholder="Đường dẫn"
                        /> */}
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Video.VideofileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="VideofileURL" id="VideofileURL" onChange={this.handleSelectedFileVideo} accept="video/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="VideofileURL" >
                                    <i className="fa fa-upload"></i>
                                </label>
                            </span>
                        </div>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn hình ảnh video:</label>
                    </div>
                    <div className="form-group col-md-10">
                        {/* <input className="form-control form-control-sm" name="ImageVideofileURL"
                            onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.ImageVideofileURL}
                            placeholder="Đường dẫn"
                        /> */}
                        <div className="input-group file-group">
                            <input type="text" className="form-control file-value" value={this.state.Product_Video.ImageVideofileURL} placeholder="Choose file..." readOnly />
                            <input type="file" name="ImageVideofileURL" id="ImageVideofileURL" onChange={this.handleSelectedFileVideo} accept="image/*" />
                            <span className="input-group-append" >
                                <label className="btn btn-light file-browser" htmlFor="ImageVideofileURL" >
                                    <i className="fa fa-upload"></i>
                                </label>
                            </span>
                        </div>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mặc định:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Video.Isdefault} name="Isdefault" onChange={this.onTextChangeVideo.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Video.IsActived} name="IsActived" onChange={this.onTextChangeVideo.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleDeleteProductVideo(deleteList, result) {
        let LstProduct_Video = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Video.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Video: LstProduct_Video });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Video: LstProduct_Video });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    // End Product_Video

    //Product_Article
    handleInputArticleInsert() {
        this.state.Product_Article = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Article: this.state.Product_Article }, () => {
            this.openArticleModal();
        });
    }
    handleInputArticleEdit(index) {
        const Product_Article = {
            ArticleID: this.state.FormData.LstProduct_Article[index].ArticleID,
            Content: this.state.FormData.LstProduct_Article[index].Content,
            Description: this.state.FormData.LstProduct_Article[index].Description,
            IsActived: this.state.FormData.LstProduct_Article[index].IsActived,
            ProductID: this.state.FormData.LstProduct_Article[index].ProductID,
            Title: this.state.FormData.LstProduct_Article[index].Title,
            index: index
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Article: Product_Article }, () => {
            this.openArticleModal()
        });
    }
    handleArticleInsert() {
        let LstProduct_Article = this.state.FormData.LstProduct_Article;
        if (this.state.Isedit) {
            let Product_Attribute = this.state.FormData.LstProduct_Article[this.state.Product_Article.index];
            Product_Attribute.Content = this.state.Product_Article.Content
            Product_Attribute.Description = this.state.Product_Article.Description
            Product_Attribute.Title = this.state.Product_Article.Title
            Product_Attribute.IsActived = this.state.Product_Article.IsActived
        }
        else {
            LstProduct_Article.push(this.state.Product_Article);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Article: LstProduct_Article });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Article: LstProduct_Article });
        // this.setState({ FormData: formData, DataSource: dataSource }, () => {
        //     this.openArticleModal();
        // });
        this.setState({ FormData: formData, DataSource: dataSource });
        ModalManager.close();
    }
    onTextChangeArticle(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { Product_Article } = this.state;
        Product_Article[name] = value;
        this.setState({ Product_Article: Product_Article }, () => {
            this.openArticleModal();
        });
    }
    openArticleModal() {
        ModalManager.open(
            <ModelContainer title="Thông báo" name="Product_Article"
                content={"Cập nhật đối tác!"} onRequestClose={() => true}
                onChangeModal={this.handleArticleInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tiêu đề:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="Title" onChange={this.onTextChangeArticle.bind(this)} value={this.state.Product_Article.Title} placeholder="Tiêu đề" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Nội dung:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea className="form-control form-control-sm" name="Content" onChange={this.onTextChangeArticle.bind(this)} value={this.state.Product_Article.Content} placeholder="Nội dung" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea className="form-control form-control-sm" name="Description" onChange={this.onTextChangeArticle.bind(this)} value={this.state.Product_Article.Description} placeholder="Mô tả" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input type="checkbox" className="" checked={this.state.Product_Article.IsActived} name="IsActived" onChange={this.onTextChangeArticle.bind(this)} />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleDeleteProductArticle(deleteList, result) {
        let LstProduct_Article = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_Article.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Article: LstProduct_Article });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_Article: LstProduct_Article });
        this.setState({ FormData: formData, DataSource: dataSource });
    }
    // End Product_Article

    handleOutputAnotherStoreInsert() {
        let LstProduct_OutputAnotherStore = this.state.FormData.LstProduct_OutputAnotherStore;
        const OutputAnotherStore = {
            OutputTypeID: -1,
            CompanyID: -1,
            InstockstoreID: -1,
            IsRequireVoucher: false
        };
        LstProduct_OutputAnotherStore.push(OutputAnotherStore);
        const FormData = Object.assign({}, this.state.FormData, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        const DataSource = Object.assign({}, this.state.DataSource, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        this.setState({ FormData, DataSource });
    }

    handleDeleteProductOutput(deleteList, result) {
        let LstProduct_OutputAnotherStore = [];
        result.map((row, index) => {
            let isMath = false;
            deleteList.map((selectItem) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].key == "index") {
                            if (selectItem[i].value != index) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                        else {
                            if (selectItem[i].value != row[selectItem[i].key]) {
                                isMath = false;
                                break;
                            } else {
                                isMath = true;
                            }
                        }
                    }
                }
            })
            if (!isMath) {
                LstProduct_OutputAnotherStore.push(row);
            }
        })
        const formData = Object.assign({}, this.state.FormData, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        this.setState({ FormData: formData, DataSource: dataSource });
    }

    handleChangeProductOutput(elementdata, index) {
        const element = Object.assign({}, this.state.FormData.LstProduct_OutputAnotherStore[index], { [elementdata.Name]: elementdata.Value });
        const LstProduct_OutputAnotherStore = Object.assign([], this.state.FormData.LstProduct_OutputAnotherStore, { [index]: element });
        const formData = Object.assign({}, this.state.FormData, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        const dataSource = Object.assign({}, this.state.DataSource, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        this.setState({ FormData: formData, DataSource: dataSource });
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
    handleInsertItem(lstOption) {
        this.setState({
            lstOptionInputMultiple: lstOption
        })

    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật sản phẩm: ${MLObject.ProductName}`;
        MLObject.ActivityDetail = `Cập nhật sản phẩm: ${MLObject.ProductName} ${"\n"}Mô tả: ${MLObject.ProductshortName}`;
        MLObject.ObjectID = "PIM_PRODUCT";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ModelID = this.state.lstOptionInputMultiple[0].value;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
            // console.log("apiResult:", apiResult.IsError,apiResult.Message);
            //  this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(MLObject);
            }
        });
    }
    render() {

        const listOption = [{ value: 1, label: "0 %" }, { value: 2, label: "5 %" }, { value: 3, label: "10 %" }];
        const listOption2 = [];


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            //   console.log("render",this.state.FormData.LstProduct_Barcode);
            //    console.log("renderthis.state.DataSource", this.state.DataSource, this.state.DataSource.LstProduct_Content);
            return (

                <FormContainer FormName="Sửa sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={AddElementList}
                    // dataSource={dataSource}
                    IsAutoLayout={true}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={this.handleSubmit}>
                    <TabContainer defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" >
                        <TabPage title="Thông tin chung" name="Product" >
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl.TextBox name="txtProductID" colspan="8" labelcolspan="4" readonly="true" label="Mã sản phẩm:" placeholder="Mã sản phẩm" controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ProductID : ""} datasourcemember="ProductID" />
                                    <FormControl.TextBox name="txtProductName" colspan="8" labelcolspan="4" label="Tên sản phẩm:" placeholder="Tên sản phẩm" validatonList={["required"]}
                                        controltype="InputControl" value={this.state.DataSource.ProductName} datasourcemember="ProductName" />
                                    <FormControl.TextBox name="txtProductshortName" colspan="8" labelcolspan="4" label="Tên rút gọn sản phẩm:" placeholder="Tên rút gọn sản phẩm"
                                        controltype="InputControl" value={this.state.DataSource.ProductshortName} datasourcemember="ProductshortName" />
                                    <FormControl.ComboBox name="cboProductTypeID" colspan="8" labelcolspan="4" type="select"
                                        isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE" valuemember="ProductTypeID" nameMember="ProductTypeName" label="Loại sản phẩm:" controltype="InputControl" value={this.state.DataSource.ProductTypeID} listoption={listOption2} datasourcemember="ProductTypeID" />
                                    <FormControl.ComboBox name="cboDefaultCategoryID" colspan="8"
                                        isautoloaditemfromcache={true} isCategory={true} loaditemcachekeyid="PIMCACHE.CATEGORY" valuemember="CategoryID" nameMember="CategoryName"
                                        labelcolspan="4" label="Danh mục mặc định:" controltype="InputControl" value={this.state.DataSource.DefaultCategoryID} listoption={listOption} datasourcemember="DefaultCategoryID" />
                                    <FormControl.ComboBox name="cboBrandID" colspan="8" labelcolspan="4" label="Nhãn hiệu:" controltype="InputControl"
                                        isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.BRAND" valuemember="BrandID" nameMember="BrandName"
                                        value={this.state.DataSource.BrandID} listoption={[]} datasourcemember="BrandID" />
                                    <FormControl.ComboBox name="cboDefaultquantityunitID" colspan="8" labelcolspan="4" label="Đơn vị tính mặc định:"
                                        isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.QUANTITYUNIT" valuemember="QuantityUnitID" nameMember="QuantityUnitName"
                                        controltype="InputControl" value={this.state.DataSource.DefaultquantityunitID} listoption={null} datasourcemember="DefaultquantityunitID" />
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
                                        SearchMLObjectDefinition={this.state.SearchMLObjectDefinition}
                                        SearchElementList={this.state.SearchElementList}
                                        multipleCheck={false}
                                        onClickInsertItem={this.handleInsertItem.bind(this)}
                                    />
                                    <FormControl.MultiSelectComboBox name="ArryProduct_Feature" colspan="8" labelcolspan="4" label="Đặc điểm sản phẩm:"
                                        IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTFEATURE" valuemember="ProductFeatureID" nameMember="ProductFeatureName"
                                        controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_Feature : -1} listoption={null} datasourcemember="ArryProduct_Feature" />
                                    <div className="form-row">
                                        <FormControl.ComboBox name="cboVat" isautoloaditemfromcache={false}
                                            label="VAT(%)"
                                            colspan="8" labelcolspan="0"
                                            controltype="InputControl" value={this.state.DataSource.Vat}
                                            listoption={listOption} datasourcemember="Vat"
                                            labelcolspan={6}
                                            colspan={6}
                                            rowspan={8}
                                            paddinginput={8}
                                        />
                                        <FormControl.CheckBox name="chkIsnovat" label="Không thuế suất "
                                            datasourcemember="Isnovat"
                                            className="form-check-input" controltype="InputControl"
                                            value={this.state.DataSource.Isnovat}
                                            labelcolspan={10}
                                            colspan={1}
                                            rowspan={4}
                                            swaplabel={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                        </div>
                                        <div className="form-group col-md-6" style={{ height: 379 }} >

                                            <img name="DefaultImageURL" src="/src/img/avatar/1.jpg" data-original-src="../assets/img/gallery/1.jpg" />
                                        </div>
                                    </div>
                                    <FormControl.MultiSelectComboBox name="ArryProduct_ShippingMethod" colspan="8" labelcolspan="4" label="Phương thức vận chuyển:"
                                        IsLabelDiv={true} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PIM_SHIPPINGMETHOD" valuemember="ShippingMethodID" nameMember="ShippingMethodName"
                                        controltype="InputControl" value={this.state.DataSource != [] ? this.state.DataSource.ArryProduct_ShippingMethod : -1} listoption={[]} datasourcemember="ArryProduct_ShippingMethod" />
                                    <div className="form-row">
                                        <FormControl.ComboBox name="cboPovat" isautoloaditemfromcache={false}
                                            label="VAT mua hàng(%)"
                                            colspan="8"
                                            controltype="InputControl" value={this.state.DataSource.Povat}
                                            listoption={listOption} datasourcemember="Povat"
                                            labelcolspan={6}
                                            colspan={6}
                                            rowspan={8}
                                            paddinginput={8}
                                        />
                                        <FormControl.CheckBox name="chkIsnopovat" label="Không thuế xuất mua hàng"
                                            datasourcemember="Isnopovat"
                                            className="form-check-input" controltype="InputControl"
                                            value={this.state.DataSource.Isnopovat}
                                            labelcolspan={11}
                                            colspan={1}
                                            rowspan={4}
                                            swaplabel={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPage>
                        <TabPage title="Barcode" name="TabLstProduct_Barcode" >
                            <InputGrid name="LstProduct_Barcode" controltype="GridControl"
                                listColumn={InputBarcodeColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"BarcodeID"}
                                dataSource={this.state.DataSource.LstProduct_Barcode}
                                value={this.state.FormData.LstProduct_Barcode}
                                MLObjectDefinition={GridMLObjectBarcodeDefinition}
                                colspan="12"
                                onInsertClick={this.handleProductBarcodeInsert}
                                onDeleteClick_Customize={this.handleDeleteProductBarcode}
                                onValueChangeInputGrid={this.handleChangeProductBarcode}
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Danh mục" name="TabLstCategory_Member">
                            <InputGrid name="LstCategory_Member" controltype="GridControl"
                                listColumn={InputCategoryTypeColumnList}
                                isHideHeaderToolbar={true}
                                dataSource={this.state.DataSource.LstCategory_Member}
                                MLObjectDefinition={GridMLObjectCategoryTypeDefinition}
                                colspan="12" />
                        </TabPage>
                        <TabPage title="Thuộc tính sản phẩm" name="TabLstProduct_Attribute" >
                            <InputGrid name="LstProduct_Attribute" controltype="GridControl"
                                listColumn={InputProductAttributeColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"AttributeID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Attribute}
                                value={this.state.FormData.LstProduct_Attribute}
                                onInsertClick={this.handleInputAttributeInsert}
                                onInsertClickEdit={this.handleInputAttributeEdit}
                                MLObjectDefinition={GridMLObjectProductAttributeDefinition}
                                onDeleteClick_Customize={this.handleDeleteProductAttribute}
                                colspan="12" />
                        </TabPage>
                        <TabPage title="Trạnh thái sản phẩm" name="TabLstProduct_ProductStatus" >
                            <InputGrid name="LstProduct_ProductStatus" controltype="GridControl"
                                listColumn={InputProductStatusColumnList}
                                isHideHeaderToolbar={true}
                                dataSource={this.state.DataSource.LstProduct_ProductStatus}
                                MLObjectDefinition={GridMLObjectProductStatusDefinition}
                                colspan="12" />
                        </TabPage>
                        <TabPage title="Giới hạn" name="TabLstProduct_Limit" >
                            <InputGrid name="LstProduct_Limit" controltype="GridControl"
                                listColumn={InputProductLimitColumnList}
                                isHideHeaderToolbar={true}
                                dataSource={this.state.DataSource.LstProduct_Limit}
                                MLObjectDefinition={GridMLObjectProductLimitDefinition}
                                colspan="12" />
                        </TabPage>
                        <TabPage title="Xuất khác nơi TK" name="TabProduct_OutputAnotherStore" >
                            <InputGrid name="LstProduct_OutputAnotherStore" controltype="GridControl"
                                listColumn={InputOutputAnotherStoreColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"OutputTypeID"}
                                dataSource={this.state.DataSource.LstProduct_OutputAnotherStore}
                                value={this.state.FormData.LstProduct_OutputAnotherStore}
                                MLObjectDefinition={GridMLObjectOutputAnotherStoreDefinition}
                                colspan="12"
                                onInsertClick={this.handleOutputAnotherStoreInsert}
                                onDeleteClick_Customize={this.handleDeleteProductOutput}
                                onValueChangeInputGrid={this.handleChangeProductOutput}
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Đối tác" name="TabProduct_Partnermap" >
                            <InputGrid name="LstProduct_Partnermap" controltype="GridControl"
                                listColumn={InputProductPartnerColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"PartnerID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Partnermap}
                                value={this.state.FormData.LstProduct_Partnermap}
                                onInsertClick={this.handleInputPartnerInsert}
                                onInsertClickEdit={this.handleInputPartnerEdit}
                                onDeleteClick_Customize={this.handleDeleteProductPartnermap}
                                MLObjectDefinition={GridMLObjectPartnerDefinition}
                                colspan="12"
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Nội dung" name="TabProduct_Content" >
                            <InputGrid name="LstProduct_Content" controltype="GridControl"
                                listColumn={InputProductContentColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"PartnerID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Content}
                                value={this.state.FormData.LstProduct_Content}
                                onInsertClick={this.handleInputContentInsert}
                                onInsertClickEdit={this.handleInputContentEdit}
                                MLObjectDefinition={GridMLObjectContentDefinition}
                                onDeleteClick_Customize={this.handleDeleteProductContent}
                                colspan="12"
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Album" name="TabProduct_Album" >
                            <InputGrid name="LstProduct_Album" controltype="GridControl"
                                listColumn={InputProductAlbumColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"AlbumID"}
                                dataSource={this.state.DataSource.LstProduct_Album}
                                value={this.state.FormData.LstProduct_Album}
                                MLObjectDefinition={GridMLObjectAlbumDefinition}
                                colspan="12"
                                onInsertClick={this.handleInputGridAlbumInsert}
                                onDeleteClick_Customize={this.handleDeleteProductAlbum}
                                onValueChangeInputGrid={this.handleChangeProductAlbum}
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Hình ảnh" name="TabProduct_Images">
                            <InputGrid name="LstProduct_Images" controltype="GridControl"
                                listColumn={InputProductImagesColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"PartnerID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Images}
                                onInsertClick={this.handleInputImagesInsert}
                                onInsertClickEdit={this.handleInputImagesEdit}
                                onDeleteClick_Customize={this.handleDeleteProductImages}
                                MLObjectDefinition={GridMLObjectImagesDefinition}
                                colspan="12" />
                            {/* <div className="lstImages">
                                <div className="content-images">
                                    <Collapsible trigger="Tên Abum" easing="ease-in" open={true}>
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="abum">
                                                    <div className="abumName">
                                                        <div class="innerBody">
                                                            <h3>Tải tập tin/ hoặc hình ảnh</h3>
                                                        </div>
                                                    </div>
                                                    <div className="hover">
                                                        <div className="btnuploadbyabum">
                                                            <i className="fa fa-upload"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                               <div className="images">
                                                    <ul className="item">
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                        <li>
                                                            <img src="/src/img/samsung-galaxy.png" />
                                                            <h3>Samsung galaxy</h3>
                                                        </li>
                                                    </ul>
                                               </div>
                                            </div>
                                        </div>
                                    </Collapsible>
                                </div>
                            </div> */}
                        </TabPage>
                        <TabPage title="Video" name="TabProduct_Video" >
                            <InputGrid name="LstProduct_Video" controltype="GridControl"
                                listColumn={InputProductVideoColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"PartnerID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Video}
                                onInsertClick={this.handleInputVideoInsert}
                                onInsertClickEdit={this.handleInputVideoEdit}
                                onDeleteClick_Customize={this.handleDeleteProductVideo}
                                MLObjectDefinition={GridMLObjectVideoDefinition}
                                colspan="12"
                                isUseValueInputControl={true}
                            />
                        </TabPage>
                        <TabPage title="Bài Viết" name="TabProduct_Article" >
                            <InputGrid name="LstProduct_Article" controltype="GridControl"
                                listColumn={InputProductArticleColumnList}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"PartnerID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.LstProduct_Article}
                                value={this.state.FormData.LstProduct_Article}
                                onInsertClick={this.handleInputArticleInsert}
                                onInsertClickEdit={this.handleInputArticleEdit}
                                onDeleteClick_Customize={this.handleDeleteProductArticle}
                                MLObjectDefinition={GridMLObjectArticleDefinition}
                                colspan="12"
                                isUseValueInputControl={true}
                            />
                        </TabPage>

                        <TabPage title="Thông tin khác" name="Product" >
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu IMEI:" name="chkIsrequesTimei"
                                        datasourcemember="IsrequesTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsrequesTimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu quản lý theo lô:" name="chkIsrequestlot"
                                        datasourcemember="Isrequestlot" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequestlot} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm yêu cầu nhập PINCode:" name="chkIsrequirepincode"
                                        datasourcemember="Isrequirepincode" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequirepincode} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động tạo IMEI khi nhập:" name="chkIsautocreateimei"
                                        datasourcemember="Isautocreateimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isautocreateimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Có kiểm tra tồn kho:" name="chkIscheckinstock"
                                        datasourcemember="Ischeckinstock" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Ischeckinstock} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động lấy IMEI khi xuất:" name="chkIsautogeTimei"
                                        datasourcemember="IsautogeTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsautogeTimei} />
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm bắt buộc nhập IMEI sản phẩm được lắp đặt:" name="chkIsinputinstallimei"
                                        datasourcemember="Isinputinstallimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isinputinstallimei} />

                                </div>
                                <div className="col-lg-6">
                                    <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm phải vận chuyển và lắp đặt tận nhà:" name="chkIsshippingandinstall"
                                        datasourcemember="Isshippingandinstall" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isshippingandinstall} />


                                </div>
                            </div>

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
        }
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;