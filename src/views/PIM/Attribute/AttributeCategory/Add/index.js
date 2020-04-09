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
import { APIHostName, AddAPIPath, AddElementList, MLObjectDefinition, BackLink, AddPagePath, GetAttributeCategoryParentAPIPath, InitSearchParams, ComboAttributeCategoryTypeID, GridMLObjectDefinition, InputLanguageColumnList, LoadAPIPathLanguage, AddLogAPIPath } from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { ATTRIBUTE_CATEGORY_ADD } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CallAPIMessage: "", IsCallAPIError: false, IsCloseForm: false, IsLoadDataComplete: false, SearchData: InitSearchParams, AddElementList, ResultLanguage: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.getAttributeCategoryParentList = this.getAttributeCategoryParentList.bind(this);
        this.searchref = React.createRef();


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

    //lấy combobox mã danh muc thuộc tính cha
    getAttributeCategoryParentList() {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: 0
        }];
        this.props.callFetchAPI(APIHostName, GetAttributeCategoryParentAPIPath, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {

                let comboParentIDList = apiResult.ResultObject.map(function (objData) {
                    if (objData.AttributeCategoryID === -1) {
                        return {};
                    }
                    return { value: objData.AttributeCategoryID, name: `${objData.AttributeCategoryID}. ${objData.AttributeCategoryName}`, label: objData.AttributeCategoryName }
                });
                comboParentIDList.unshift({ value: -1, name:"Vuilongchon", label:"--Vui lòng chọn--"});
                comboParentIDList = comboParentIDList.filter(value => Object.keys(value).length !== 0);
                let _AddElementList = this.state.AddElementList;
                _AddElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'ParentID' && comboParentIDList.length > 0) {
                        objElement.listoption = comboParentIDList;
                        objElement.value = comboParentIDList[0].value;
                    }             

                });

                this.setState({
                    AddElementList: _AddElementList,
                    IsLoadDataComplete: true
                });
                //console.log("hahaha", this.state.AddElementList);
            }
        }
        );
    }

    componentDidMount() {
        this.getAttributeCategoryParentList();
        this.props.updatePagePath(AddPagePath);
        this.props.callFetchAPI(APIHostName, LoadAPIPathLanguage, 0).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject);
                    this.setState({ ResultLanguage });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            });
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

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, ComboAttributeCategoryTypeID, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                const convertdata = apiResult.ResultObject.map(function (objData) {
                    return { value: objData.AttributeCategoryTypeID, name: objData.AttributeCategoryTypeName }
                })
                let _AddElementList = this.state.AddElementList;
                _AddElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'ListAttributeCategoryTypeID') {
                        objElement.listoption = convertdata;
                        objElement.value = convertdata[0].value
                    }
                })
                this.setState({
                    AddElementList: _AddElementList,
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

    handleClearLocalCache() {
        const cacheKeyID = "PIMCACHE.ATTRIBUTECATEGORY";
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
        this.props.callGetCache("PIMCACHE.ATTRIBUTECATEGORY").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }


    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới danh mục thuộc tính: ${MLObject.AttributeCategoryName}`;
        MLObject.ActivityDetail = `Thêm mới danh mục thuộc tính: ${MLObject.AttributeCategoryName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTECATEGORY";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductFeatureGroupName !== null
        );

        MLObject.ResultLanguage = ResultLanguage;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if(!apiResult.IsError){
                this.handleClearLocalCache();
                this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        }

        );

    }
    render() {
        
          const dataSource = {
            IsActived: true
          }

        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        if (this.state.IsLoadDataComplete) {
            return (
                // <SimpleForm FormName="Thêm danh mục thuộc tính sản phẩm" MLObjectDefinition = {MLObjectDefinition} 
                //   listelement={AddElementList} url="http://localhost:8910/api/contact" 
                //   onSubmit={this.handleSubmit}
                //   FormMessage = {this.state.CallAPIMessage} IsErrorMessage= {this.state.IsCallAPIError}
                //   dataSource = {dataSource}
                //   BackLink = {BackLink}
                //   ref={this.searchref}
                //   />
                <FormContainer FormName="Thêm danh mục thuộc tính sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.AddElementList}
                    IsAutoLayout={true}
                    ref={this.searchref}
                    BackLink={BackLink}
                    dataSource={dataSource}
                    RequirePermission={ATTRIBUTE_CATEGORY_ADD}
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
                    
                </FormContainer>
            );
        }



        return (
            <div>
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


const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;