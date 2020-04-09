import React from "react";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Row from "../../../../../common/components/PageLayout/Row.js";
import Col from "../../../../../common/components/PageLayout/Col.js";
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { updatePagePath } from "../../../../../actions/pageAction";
//import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
//import FormControl from "../../../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
//import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import UpLoadFile from '../../../../../common/components/UploadModal/UploadFile'
//import TabPage from "../../../../../common/components/Tabs/TabPage";
import TabContainer from "../../../../../common/components/FormContainer/TabContainer";
import TabPage from "../../../../../common/components/FormContainer/TabPage";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
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
import { PRODUCT_ADD } from "../../../../../constants/functionLists";
import {
    AddAPIPath, AddElementList, AddPagePath, APIHostName, BackLink, GridMLObjectBarcodeDefinition, LoadAPIPath,
    InputBarcodeColumnList, MLObjectDefinition, IDSelectColumnName, InputCategoryTypeColumnList,
    GridMLObjectCategoryTypeDefinition, GridMLObjectProductAttributeDefinition, InputProductAttributeColumnList,
    InputProductStatusColumnList, GridMLObjectProductStatusDefinition, InputProductLimitColumnList, GridMLObjectProductLimitDefinition,
    GridMLObjectArticleDefinition, InputProductArticleColumnList, GridMLObjectOutputAnotherStoreDefinition, InputOutputAnotherStoreColumnList,
    InputProductPartnerColumnList, GridMLObjectPartnerDefinition, GridMLObjectContentDefinition, InputProductContentColumnList, InputProductAlbumColumnList,
    GridMLObjectAlbumDefinition, GridMLObjectImagesDefinition, InputProductImagesColumnList,
    GridMLObjectVideoDefinition, InputProductVideoColumnList, AddLogAPIPath
} from "../Constants";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.state = {
            CallAPIMessage: "", gridDataSource: [], IsCallAPIError: false, IsCloseForm: false, FormData: {}, DataSource: [],
            Product_Attribute: {}, Product_Partnermap: {}, Product_Content: {}, Product_Article: {}, Product_Video: {}, Isedit: false,
            LstCacheAttribute: [],
            LstCacheAttributeValueID: [],
            CategoryDataSource: [],
            SearchAPIPath: SearchAPIPath,
            SearchModelAPIPath: SearchModelAPIPath,
            SearchMLObjectDefinition: SearchMLObjectDefinition,
            SearchElementList: SearchElementList,
            DataGridColumnList: DataGridColumnList,
            lstOptionInputMultiple: [],
            lstChangvalition: {}
        };

        this.searchref = React.createRef();
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleInputAttributeInsert = this.handleInputAttributeInsert.bind(this);
        this.handleAttributeInsert = this.handleAttributeInsert.bind(this);
        this.onTextChange1 = this.onTextChange1.bind(this);
        this.handleInputAttributeEdit = this.handleInputAttributeEdit.bind(this);

        this.handleInputArticleInsert = this.handleInputArticleInsert.bind(this);
        this.handleArticleInsert = this.handleArticleInsert.bind(this);
        this.handleInputArticleEdit = this.handleInputArticleEdit.bind(this);

        this.handleOutputAnotherStoreInsert = this.handleOutputAnotherStoreInsert.bind(this);

        this.handleInputPartnerInsert = this.handleInputPartnerInsert.bind(this);
        this.handlePartnerInsert = this.handlePartnerInsert.bind(this);
        this.handleInputPartnerEdit = this.handleInputPartnerEdit.bind(this);

        this.handleInputContentInsert = this.handleInputContentInsert.bind(this);
        this.handleContentInsert = this.handleContentInsert.bind(this);
        this.handleInputContentEdit = this.handleInputContentEdit.bind(this);

        this.handleInputGridAlbumInsert = this.handleInputGridAlbumInsert.bind(this);

        this.handleInputImagesInsert = this.handleInputImagesInsert.bind(this);
        this.handleInputImagesEdit = this.handleInputImagesEdit.bind(this);
        this.handleImagesInsert = this.handleImagesInsert.bind(this);

        this.handleInputVideoInsert = this.handleInputVideoInsert.bind(this);
        this.handleInputVideoEdit = this.handleInputVideoEdit.bind(this);
        this.handleVideoInsert = this.handleVideoInsert.bind(this);

        this.handleSubmitBtn = this.handleSubmitBtn.bind(this);

    }

    handleInputChangeList(formDataTemp, tabNameList, tabMLObjectDefinitionList) {
        this.setState({ FormData: formDataTemp });
    }
    //Barcode
    handleInputGridInsert() {
        let LstProduct_Barcode = this.state.FormData.LstProduct_Barcode;
        const BarcodeItem = {
            BarcodeID: "",
            BarcodeDescription: "",
            IsActived: false,
            IsSystem: false
        };
        LstProduct_Barcode.push(BarcodeItem);
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Barcode: LstProduct_Barcode });
        this.setState({ FormData: formData });
    }
    // End Barcode

    //Product_Attribute
    handleInputAttributeInsert() {
        this.state.Product_Attribute = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Attribute: this.state.Product_Attribute }, () => {
            this.openAttributeModal();
        });
    }
    handleInputAttributeEdit(id) {
        const Product_Attribute = {
            AttributeID: this.state.FormData.LstProduct_Attribute[id].AttributeID,
            AttributeValue: this.state.FormData.LstProduct_Attribute[id].AttributeValue,
            AttributeValueID: this.state.FormData.LstProduct_Attribute[id].AttributeValueID,
            Isvariantattribute: this.state.FormData.LstProduct_Attribute[id].Isvariantattribute
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Attribute: Product_Attribute }, () => {
            this.openAttributeModal()
        });
    }
    handleAttributeInsert() {

        let LstProduct_Attribute = this.state.FormData.LstProduct_Attribute;
        if (this.state.Isedit) {
            let Product_Attribute = this.state.FormData.LstProduct_Attribute.filter(a => parseInt(a.AttributeID) === parseInt(this.state.Product_Attribute.AttributeID));
            Product_Attribute[0].AttributeID = this.state.Product_Attribute.AttributeID
            Product_Attribute[0].AttributeValue = this.state.Product_Attribute.AttributeValue
            Product_Attribute[0].AttributeValueID = this.state.Product_Attribute.AttributeValueID
            Product_Attribute[0].Isvariantattribute = this.state.Product_Attribute.Isvariantattribute
        }
        else {
            LstProduct_Attribute.push(this.state.Product_Attribute);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Attribute: LstProduct_Attribute });
        this.setState({ FormData: formData }, () => {
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
    //End Product_Attribute

    //Product_Article
    handleInputArticleInsert() {
        this.state.Product_Article = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Article: this.state.Product_Article }, () => {
            this.openArticleModal();
        });

    }
    handleInputArticleEdit(id) {
        const Product_Article = {
            ArticleID: this.state.FormData.LstProduct_Article[id].ArticleID,
            Content: this.state.FormData.LstProduct_Article[id].Content,
            Description: this.state.FormData.LstProduct_Article[id].Description,
            IsActived: this.state.FormData.LstProduct_Article[id].IsActived,
            ProductID: this.state.FormData.LstProduct_Article[id].ProductID,
            Title: this.state.FormData.LstProduct_Article[id].Title
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Article: Product_Article }, () => {
            this.openArticleModal()
        });
    }
    handleArticleInsert() {
        let LstProduct_Article = this.state.FormData.LstProduct_Article;
        if (this.state.Isedit) {
            let Product_Attribute = this.state.FormData.LstProduct_Article.filter(a => a.ArticleID === parseInt(this.state.Product_Article.ArticleID));
            Product_Attribute[0].Content = this.state.Product_Article.Content
            Product_Attribute[0].Description = this.state.Product_Article.Description
            Product_Attribute[0].Title = this.state.Product_Article.Title
            Product_Attribute[0].IsActived = this.state.Product_Article.IsActived
        }
        else {
            LstProduct_Article.push(this.state.Product_Article);
        }
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Article: LstProduct_Article });
        // this.setState({ FormData: formData });
        this.setState({ FormData: formData }, () => {
            this.openArticleModal();
        });
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
    // End Product_Article

    // Output Another Store
    handleOutputAnotherStoreInsert() {

        let LstProduct_OutputAnotherStore = this.state.FormData.LstProduct_OutputAnotherStore;
        const OutputAnotherStore = {
            OutputTypeID: -1,
            CompanyID: -1,
            InstockstoreID: -1,
            IsRequireVoucher: false
        };
        LstProduct_OutputAnotherStore.push(OutputAnotherStore);
        const formData = Object.assign({}, this.state.FormData, { LstProduct_OutputAnotherStore: LstProduct_OutputAnotherStore });
        this.setState({ FormData: formData });
    }
    //End Output Another Store

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
        this.setState({ FormData: formData }, () => {
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
                            </option><option value='1' label="Công ty Cổ Phần Thế Giới Di Động">
                            </option><option value="2" label="Công ty Cổ Phần Thương Mại Bách Hóa Xanh">  </option>
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
        this.setState({ FormData: formData }, () => {
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
    // End Product_Connect

    // Product_Album
    handleInputGridAlbumInsert() {
        let LstProduct_Album = this.state.FormData.LstProduct_Album;
        const AlbumItem = {
            AlbumID: "",
            AlbumName: "",
            IconfileURL: "",
            Isdefault: false
        };
        LstProduct_Album.push(AlbumItem);
        const formData = Object.assign({}, this.state.FormData, { LstProduct_Album: LstProduct_Album });
        this.setState({ FormData: formData });
    }
    // END Product_Album

    //Product_Images
    handleInputImagesInsert() {
        this.state.Product_Images = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Images: this.state.Product_Images }, () => {
            this.openImagesModal();
        });

    }
    handleInputImagesEdit(id) {
        const Product_Images = {
            AlbumID: this.state.FormData.LstProduct_Images[id].AlbumID,
            ImageName: this.state.FormData.LstProduct_Images[id].ImageName,
            ProductImageTypeID: this.state.FormData.LstProduct_Images[id].ProductImageTypeID,
            ImagefileURL: this.state.FormData.LstProduct_Images[id].ImagefileURL,
            Isdefault: this.state.FormData.LstProduct_Images[id].Isdefault,
            IsActived: this.state.FormData.LstProduct_Images[id].IsActived
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Images: Product_Images }, () => {
            this.openImagesModal()
        });
    }
    handleImagesInsert() {

        let LstProduct_Images = this.state.FormData.LstProduct_Images;
        if (this.state.Isedit) {
            let Product_Images = this.state.FormData.LstProduct_Images.filter(a => a.AlbumID === this.state.Product_Images.AlbumID);
            Product_Images[0].AlbumID = this.state.Product_Images.AlbumID
            Product_Images[0].ImageName = this.state.Product_Images.ImageName
            Product_Images[0].ProductImageTypeID = this.state.Product_Images.ProductImageTypeID
            Product_Images[0].ImagefileURL = this.state.Product_Images.ImagefileURL
            Product_Images[0].Isdefault = this.state.Product_Images.Isdefault
            Product_Images[0].IsActived = this.state.Product_Images.IsActived
        }
        else {
            LstProduct_Images.push(this.state.Product_Images);
        }

        const formData = Object.assign({}, this.state.FormData, { LstProduct_Images: LstProduct_Images });

        // this.setState({ FormData: formData });
        this.setState({ FormData: formData }, () => {
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
                        <label className="col-form-label">Đường dẫn:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ImagefileURL" onChange={this.onTextChangeImages.bind(this)} value={this.state.Product_Images.ImagefileURL} placeholder="Đường dẫn" />
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
    // End Product_Images

    //Product_Video
    handleInputVideoInsert() {
        //console.log("handleInputVideoInsert",this.state.Product_Video);
        this.state.Product_Video = {};
        this.setState({ Isedit: false });
        this.setState({ Product_Video: this.state.Product_Video }, () => {
            this.openVideoModal();
        });
    }
    handleInputVideoEdit(id) {
        const Product_Video = {
            VideoID: this.state.FormData.LstProduct_Video[id].VideoID,
            VideoName: this.state.FormData.LstProduct_Video[id].VideoName,
            VideofileURL: this.state.FormData.LstProduct_Video[id].VideofileURL,
            ImagefileURL: this.state.FormData.LstProduct_Video[id].ImagefileURL,
            ImageVideofileURL: this.state.FormData.LstProduct_Video[id].ImageVideofileURL,
            Isdefault: this.state.FormData.LstProduct_Video[id].Isdefault,
            IsActived: this.state.FormData.LstProduct_Video[id].IsActived
        }
        this.setState({ Isedit: true });
        this.setState({ Product_Video: Product_Video }, () => {
            this.openVideoModal()
        });
    }
    handleVideoInsert() {

        let LstProduct_Video = this.state.FormData.LstProduct_Video;
        if (this.state.Isedit) {
            let Product_Video = this.state.FormData.LstProduct_Video.filter(a => a.VideoID === this.state.Product_Video.VideoID);
            Product_Video[0].VideoID = this.state.Product_Video.VideoID
            Product_Video[0].VideoName = this.state.Product_Video.VideoName
            Product_Video[0].VideofileURL = this.state.Product_Video.VideofileURL
            Product_Video[0].ImageVideofileURL = this.state.Product_Video.ImageVideofileURL
            Product_Video[0].Isdefault = this.state.Product_Video.Isdefault
            Product_Video[0].IsActived = this.state.Product_Video.IsActived
        }
        else {
            LstProduct_Video.push(this.state.Product_Video);
        }

        const formData = Object.assign({}, this.state.FormData, { LstProduct_Video: LstProduct_Video });

        // this.setState({ FormData: formData });
        this.setState({ FormData: formData }, () => {
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
                        <input className="form-control form-control-sm" name="VideoID" onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.VideoID} placeholder="Tiêu đề" />
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
                        <label className="col-form-label">Đường dẫn:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="VideofileURL" onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.VideofileURL} placeholder="Đường dẫn" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Đường dẫn:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input className="form-control form-control-sm" name="ImageVideofileURL" onChange={this.onTextChangeVideo.bind(this)} value={this.state.Product_Video.ImageVideofileURL} placeholder="Đường dẫn" />
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
    // End Product_Video

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
    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSource: apiResult.ResultObject });
            }
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới sản phẩm: ${MLObject.ProductName}`;
        MLObject.ActivityDetail = `Thêm mới sản phẩm: ${MLObject.ProductName} ${"\n"}Mô tả: ${MLObject.ProductshortName}`;
        MLObject.ObjectID = "PIM_PRODUCT";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ModelID = this.state.lstOptionInputMultiple[0].value;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(MLObject);
            }
        }
        );
    }

    handleSubmitBtn() {
        console.log("aaaa");
    }

    handleInsertItem(lstOption) {
        console.log("lstOption", lstOption);
        this.setState({
            lstOptionInputMultiple: lstOption
        })

    }

    render() {

        const listOption = [{ value: 1, label: "0 %" }, { value: 2, label: "5 %" }, { value: 3, label: "10 %" }];
        const listOption2 = [];

        const dataSource = {
            UOMTypeID: "",
            UOMTypeName: "",
            Description: "",
            IsActived: true
        }
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        const gridDataSource = { value: 1, name: "Xe máy" }
        return (
            <FormContainer FormName="Thêm sản phẩm"
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                IsAutoLayout={AddElementList}
                dataSource={[]}
                ClassNameSingePage="page-product"
                // onInputChangeList={this.handleInputChangeList}
                Lstchangvalition={this.state.lstChangvalition}
                //RequirePermission={PRODUCT_ADD}
                onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <FormControl.TextBox name="txtProductID" colspan="8" labelcolspan="4" readOnly={true} label="Mã sản phẩm:" placeholder="Mã sản phẩm" controltype="InputControl" readonly="true" value={this.state.DataSource != [] ? this.state.DataSource.ProductID : ""} datasourcemember="ProductID" />
                        <FormControl.TextBox name="txtProductName" colspan="8" labelcolspan="4" label="Tên sản phẩm:" placeholder="Tên sản phẩm" validatonList={["required"]} controltype="InputControl" value="" datasourcemember="ProductName" />
                        <FormControl.TextBox name="txtProductshortName" colspan="8" labelcolspan="4" label="Tên rút gọn sản phẩm:" placeholder="Tên rút gọn sản phẩm" validatonList={["required"]} controltype="InputControl" value="" datasourcemember="ProductshortName" />
                        <FormControl.ComboBox name="cboProductTypeID" colspan="8" labelcolspan="4" type="select" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.PRODUCTTYPE" valuemember="ProductTypeID" nameMember="ProductTypeName" label="Loại sản phẩm:" controltype="InputControl" value={-1} listoption={listOption2} datasourcemember="ProductTypeID" />
                        <FormControl.ComboBox name="cboDefaultCategoryID" colspan="8" validatonList={["Comborequired"]} isautoloaditemfromcache={true} isCategory={true} loaditemcachekeyid="PIMCACHE.CATEGORY" valuemember="CategoryID" nameMember="CategoryName" labelcolspan="4" label="Danh mục mặc định:" controltype="InputControl" value={-1} listoption={listOption} datasourcemember="DefaultCategoryID" />
                        <FormControl.ComboBox name="cboBrandID" colspan="8" labelcolspan="4" label="Nhãn hiệu:" controltype="InputControl" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.BRAND" valuemember="BrandID" nameMember="BrandName" value={-1} listoption={[]} datasourcemember="BrandID" />
                        <FormControl.ComboBox name="cboDefaultquantityunitID" colspan="8" labelcolspan="4" label="Đơn vị tính mặc định:" validatonList={["Comborequired"]} isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.QUANTITYUNIT" valuemember="QuantityUnitID" nameMember="QuantityUnitName" controltype="InputControl" value={-1} listoption={null} datasourcemember="DefaultquantityunitID" />
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
                            gridDataSource={gridDataSource}
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
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu IMEI:" name="chkIsrequesTimei" datasourcemember="IsrequesTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsrequesTimei} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm có yêu cầu quản lý theo lô:" name="chkIsrequestlot" datasourcemember="Isrequestlot" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequestlot} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm yêu cầu nhập PINCode:" name="chkIsrequirepincode" datasourcemember="Isrequirepincode" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isrequirepincode} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động tạo IMEI khi nhập:" name="chkIsautocreateimei" datasourcemember="Isautocreateimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isautocreateimei} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Có kiểm tra tồn kho:" name="chkIscheckinstock" datasourcemember="Ischeckinstock" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Ischeckinstock} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm tự động lấy IMEI khi xuất:" name="chkIsautogeTimei" datasourcemember="IsautogeTimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.IsautogeTimei} />
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm bắt buộc nhập IMEI sản phẩm được lắp đặt:" name="chkIsinputinstallimei" datasourcemember="Isinputinstallimei" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isinputinstallimei} />
                            </div>
                            <div className="col-lg-6">
                                <FormControl.CheckBox colspan="4" labelcolspan="8" label="Là sản phẩm phải vận chuyển và lắp đặt tận nhà:" name="chkIsshippingandinstall" datasourcemember="Isshippingandinstall" className="form-check-input" controltype="InputControl" value={this.state.DataSource.Isshippingandinstall} />
                            </div>
                        </div>
                    </TabPage>
                    <TabPage title="" name="" >
                    </TabPage>
                </TabContainer>
            </FormContainer>
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;