import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { DetailPagePath } from "../Constants";
import {
    APIHostName, SearchGeneralInfoAPIPath,
    InputBarcodeColumnList, GridMLObjectBarcodeDefinition, editBarcode, DeleteBarcode,
    InputProductAttributeColumnList, GridMLObjectProductAttributeDefinition, DeleteAttribute, editAttribute,
    InputProductStatusColumnList, GridMLObjectProductStatusDefinition, DeleteProductStatus, editProductStatus,
    InputOutputAnotherStoreColumnList, GridMLObjectOutputAnotherStoreDefinition, Deleteanotherstore, editanotherstore,
    InputProductPartnerColumnList, GridMLObjectPartnerDefinition, DeletePartnermap, editPartnermap,
    InputProductContentColumnList, GridMLObjectContentDefinition, Deletecontent, editcontent,
    InputProductArticleColumnList, GridMLObjectArticleDefinition, Deletearticle, editarticle,
    InputProductImagesColumnList,GridMLObjectImagesDefinition,DeleteImages, editImages,
    InputProductAlbumColumnList,GridMLObjectAlbumDefinition,DeleteAlbum, editAlbum
} from "./Constants";
import Collapsible from 'react-collapsible';
import InputGridNew from "../../../../../common/components/FormContainer/FormControl/InputGridNew";

import Slide from './Slide';
import Image from './Image';
import Video from './Video';

import GeneralInfo from './GeneralInfo';
class DetailCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GeneralInfo: {},
            LstProduct_Attribute: [],
            LstProduct_Barcode: [],
            LstProduct_Content: [],
            LstProduct_ProductStatus: [],
            LstProduct_Partnermap: [],
            LstProduct_Limit: [],
            LstProduct_Article: [],
            LstProduct_Album: [],
            LstCategory_Member: [],
            LstProduct_Images: [],
            LstProduct_Video: [],
            LstProduct_OutputAnotherStore: [],
            Model: {},
        }
    }

    componentDidMount() {
        //const id = this.props.match.params.id;
        // console.log("id product", id)
        this.props.updatePagePath(DetailPagePath);
        this.getGeneralInfoProduct();

    }

    getGeneralInfoProduct() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, SearchGeneralInfoAPIPath, id).then((apiResult) => {
          //  console.log("apiResult.ResultObject",apiResult.ResultObject)
            if (!apiResult.IsError) {
                this.setState({
                    GeneralInfo: apiResult.ResultObject,
                    LstProduct_Attribute: apiResult.ResultObject.LstProduct_Attribute,
                    LstProduct_ProductStatus: apiResult.ResultObject.LstProduct_ProductStatus,
                    LstProduct_Content: apiResult.ResultObject.LstProduct_Content,
                    LstProduct_Barcode: apiResult.ResultObject.LstProduct_Barcode,
                    LstProduct_Partnermap: apiResult.ResultObject.LstProduct_Partnermap,
                    LstProduct_Limit: apiResult.ResultObject.LstProduct_Limit,
                    LstProduct_Article: apiResult.ResultObject.LstProduct_Article,
                    LstProduct_Album: apiResult.ResultObject.LstProduct_Album,
                    LstProduct_Images: apiResult.ResultObject.LstProduct_Images,
                    LstProduct_Video: apiResult.ResultObject.LstProduct_Video,
                    LstCategory_Member: apiResult.ResultObject.LstCategory_Member,
                    LstProduct_OutputAnotherStore: apiResult.ResultObject.LstProduct_OutputAnotherStore,
                })

                this.props.callFetchAPI(APIHostName, "api/Model/Load", apiResult.ResultObject.ModelID).then((apiResultModel) => {
                    if (!apiResultModel.IsError) {
                        this.setState({
                            Model: apiResultModel.ResultObject
                        })
                    }
                });
            }
        });
    }


    render() {
        const id = this.props.match.params.id;
        return (
            <div className="Col-12 col-md-12 col-lg-12 product-detail">
                <div className="card">
                    <div className="card-body ">
                        <div className="row">
                            <GeneralInfo ProductID={this.props.match.params.id} Model={this.state.Model} />
                            <Slide lstImage={this.state.LstProduct_Images} />
                        </div>
                    </div>
                </div>

                <InputGridNew name="LstProduct_Barcode" controltype="GridControl"
                    title="Barcode"
                    listColumn={InputBarcodeColumnList}
                    dataSource={this.state.LstProduct_Barcode}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectBarcodeDefinition}
                    ID={this.props.match.params.id}
                    // IDSelectColumnName={"Barcode"}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editBarcode}
                    Delete={DeleteBarcode}
                />
                <InputGridNew name="LstProduct_Attribute" controltype="GridControl"
                    title="Thuộc tính sản phẩm"
                    listColumn={InputProductAttributeColumnList}
                    dataSource={this.state.LstProduct_Attribute}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectProductAttributeDefinition}
                    ID={this.props.match.params.id}
                    // IDSelectColumnName={"AttributeID"}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editAttribute}
                    Delete={DeleteAttribute}
                />
                <InputGridNew name="LstProduct_ProductStatus" controltype="GridControl"
                    title="Trạng thái sản phẩm"
                    listColumn={InputProductStatusColumnList}
                    dataSource={this.state.LstProduct_ProductStatus}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectProductStatusDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editProductStatus}
                    Delete={DeleteProductStatus}
                />
                <InputGridNew name="LstProduct_OutputAnotherStore" controltype="GridControl"
                    title="Xuất khác nơi TK"
                    listColumn={InputOutputAnotherStoreColumnList}
                    dataSource={this.state.LstProduct_OutputAnotherStore}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectOutputAnotherStoreDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editanotherstore}
                    Delete={Deleteanotherstore}
                />
                <InputGridNew name="LstProduct_Partnermap" controltype="GridControl"
                    title="Đối tác"
                    listColumn={InputProductPartnerColumnList}
                    dataSource={this.state.LstProduct_Partnermap}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectPartnerDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editPartnermap}
                    Delete={DeletePartnermap}
                />
                <InputGridNew name="LstProduct_Content" controltype="GridControl"
                    title="Nội dung"
                    listColumn={InputProductContentColumnList}
                    dataSource={this.state.LstProduct_Content}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectContentDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editcontent}
                    Delete={Deletecontent}
                />
                <InputGridNew name="LstProduct_Article" controltype="GridControl"
                    title="bài Viết"
                    listColumn={InputProductArticleColumnList}
                    dataSource={this.state.LstProduct_Article}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectArticleDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editarticle}
                    Delete={Deletearticle}
                />
                <InputGridNew name="LstProduct_Album" controltype="GridControl"
                    title="Album"
                    listColumn={InputProductAlbumColumnList}
                    dataSource={this.state.LstProduct_Album}
                    Ispopup={true}
                    MLObjectDefinition={GridMLObjectAlbumDefinition}
                    ID={this.props.match.params.id}
                    IsAutoPaging={true}
                    RowsPerPage={5}
                    colspan="10"
                    IsPermisionAdd={true}
                    IsPermisionDelete={true}
                    APIHostName={APIHostName}
                    edit={editAlbum}
                    Delete={DeleteAlbum}
                />
               <Image
                listColumn={InputProductImagesColumnList}
                Images={this.state.LstProduct_Images}
                Album={this.state.LstProduct_Album}
                MLObjectDefinition={GridMLObjectImagesDefinition}
                ID={this.props.match.params.id}
                APIHostName={APIHostName}
                edit={editImages}
                Delete={DeleteImages}
               />   

                <Video
                Videos={this.state.LstProduct_Video}
                ID={this.props.match.params.id}
                APIHostName={APIHostName}
               />       
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
        }

    }
}


const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;