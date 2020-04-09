import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import MD5Digest from "../../../../../common/library/cryptography/MD5Digest.js";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, LoadAPIPath, UpdateAPIPath, EditElementList, MLObjectDefinition, BackLink, EditPagePath, InitSearchParams, ComboDataLink, GridMLObjectDefinition, InputLanguageColumnList, AddLogAPIPath } from "../constants";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { Z_DEFAULT_COMPRESSION } from "zlib";
import { ATTRIBUTE_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            SearchData: InitSearchParams,
            EditElementList,
            Files: {},
            ResultLanguage: [],
            IsDeletedFile: false
        };
        this.searchref = React.createRef();
        //console.log("EditCom this.props:", this.props);
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
    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            //console.log("componentDidMount:", apiResult);

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError

                });
                this.showMessage(apiResult.Message);
            }
            else {
                // this.setState({ DataSource: apiResult.ResultObject });
                // if (!apiResult.ResultObject.LstAttribute_Lang.length) {
                //     //load ngôn ngữ
                //     this.props.callGetCache("PIMCACHE.MDLANGUAGE").then((result) => {
                //         if (!result.IsError && result.ResultObject.CacheData != null) {
                //             this.setState({ InputLanguageDataSource: result.ResultObject.CacheData });
                //         }
                //     });
                // }
                // else {
                //     this.setState({ InputLanguageDataSource: apiResult.ResultObject.LstAttribute_Lang });

                // }
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject.ResultLanguage);
                    const DataSource = Object.assign([], this.state.DataSource, apiResult.ResultObject);
                    this.setState({ DataSource, ResultLanguage });
                }
                this.loadComboData(this.state.SearchData);
            }


            //console.log("componentDidMount:", apiResult);
            this.setState({
                IsLoadDataComplete: true
            })

        });



    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign(
            {},
            this.state.ResultLanguage[index],
            { [elementdata.Name]: elementdata.Value },
            { HasChanged: true }
        );
        const dataSource = Object.assign([], this.state.ResultLanguage, {
            [index]: rowGridData
        });
        this.setState({ ResultLanguage: dataSource });
    }


    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
    }

    handleClearLocalCache() {
        const cacheKeyID = "PIMCACHE.PIMATTRIBUTE";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(cacheKeyID).then((result) => {
            const postData = {
                CacheKeyID: cacheKeyID,
                UserName: this.props.AppInfo.LoginInfo.Username,
                AdditionParamList: []
            };
            this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                this.handleGetCache();
                //console.log("apiResult", apiResult)
            });
        }
        );
    }

    handleGetCache() {
        ''
        this.props.callGetCache("PIMCACHE.PIMATTRIBUTE").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật thuộc tính: ${MLObject.AttributeName}`;
        MLObject.ActivityDetail = `Cập nhật thuộc tính: ${MLObject.AttributeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        // console.log("formData:", formData);
        // console.log("MLObject:", MLObject);
        console.log("files:", this.state.Files);

        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductFeatureGroupName !== null
        );

        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ResultLanguage = ResultLanguage;

        if (this.state.IsDeletedFile) {
            MLObject.AttributeImageURL = "";
        }

        var data = new FormData();
        data.append('AttributeImageURL', this.state.Files.AttributeImageURL);
        data.append('AttributeObj', JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then((apiResult) => {
            console.log("apiResult:", apiResult);
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleClearLocalCache();
                this.handleSubmitInsertLog(MLObject);
            }

        }

        );

    }
    loadComboData(searchData) {
        //lấy dữ liệu combo mã danh mục thuộc tính sản phẩm
        this.props.callFetchAPI(APIHostName, ComboDataLink, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                let comboAttributeCategory = apiResult.ResultObject.map(function (objData) {
                    if (objData.AttributeCategoryID === -1) {
                        return {};
                    }
                    return { value: objData.AttributeCategoryID, name: `${objData.AttributeCategoryID}. ${objData.AttributeCategoryName}` }
                });
                let comboAttributeDataType = apiResult.ResultObject.map(function (objData) {
                    if (objData.AttributeDataTypeID === -1) {
                        return {};
                    }
                    return { value: objData.AttributeDataTypeID, name: `${objData.AttributeDataTypeID}. ${objData.AttributeDataTypeName}` }
                });

                comboAttributeCategory = comboAttributeCategory.filter(value => Object.keys(value).length !== 0);
                comboAttributeDataType = comboAttributeDataType.filter(value => Object.keys(value).length !== 0);

                let _EditElementList = this.state.EditElementList;
                _EditElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'AttributeCategoryID' && comboAttributeCategory.length > 0) {
                        objElement.listoption = comboAttributeCategory;
                        //objElement.value = comboAttributeCategory[0].value                
                    }
                    if (objElement.DataSourceMember == 'AttributeDataTypeID' && comboAttributeDataType.length > 0) {
                        objElement.listoption = comboAttributeDataType;
                        //objElement.value = comboAttributeDataType[0].value
                    }
                });
                this.setState({
                    EditElementList: _EditElementList,
                });
            }
            else if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }

        }
        );
    }



    render() {
        //let listElement1 = SearchElementList;

        //const apiMessage = getAPIMessageFromReduxState(this.props.AppInfo,this.state.IsClickSubmit);
        //console.log("this.state.DataSource:", this.state.DataSource);
        //listElement1[0].value = this.props.AppInfo.LoginInfo.LoginUserInfo.UserName;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }


        if (this.state.IsLoadDataComplete) {
            //return (<SimpleForm FormName="Cập nhật thuộc tính sản phẩm" MLObjectDefinition = {MLObjectDefinition} listelement={EditElementList} url="http://localhost:8910/api/contact" onSubmit={this.handleSubmit}
            //FormMessage = {this.state.CallAPIMessage} IsErrorMessage= {this.state.IsCallAPIError}
            //dataSource = {this.state.DataSource}
            //BackLink = {BackLink}
            //ref={this.searchref}
            ///>);

            return (
                <FormContainer FormName="Cập nhật thuộc tính sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    dataSource={this.state.DataSource}
                    ref={this.searchref}
                    IsAutoLayout={true}
                    BackLink={BackLink}
                    onHandleSelectedFile={this.handleSelectedFile}
                    RequirePermission={ATTRIBUTE_UPDATE}
                    onSubmit={this.handleSubmit}>
                    <InputGrid
                        name="ResultLanguage"
                        controltype="InputControl"
                        listColumn={InputLanguageColumnList}
                        isHideHeaderToolbar={true}
                        dataSource={this.state.ResultLanguage}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="12"
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                    />
                    {/* <InputGrid name="inputGridAttribute_Lang" controltype="InputControl"
                        listColumn={InputLanguageColumnList}
                        isHideHeaderToolbar={true}
                        dataSource={this.state.InputLanguageDataSource}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="10" /> */}
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