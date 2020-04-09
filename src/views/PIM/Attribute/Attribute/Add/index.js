import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    InitSearchParams,
    AddPagePath,
    ComboDataLink,
    GridMLObjectDefinition,
    InputLanguageColumnList,
    LoadAPIPathLanguage,
    AddLogAPIPath
} from "../constants";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { ATTRIBUTE_ADD } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            SearchData: InitSearchParams,
            AddElementList,
            Files: {},
            ResultLanguage: []
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
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

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
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
        this.props.callGetCache("PIMCACHE.PIMATTRIBUTE").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }


    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới thuộc tính: ${MLObject.AttributeName}`;
        MLObject.ActivityDetail = `Thêm mới thuộc tính: ${MLObject.AttributeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTE";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductFeatureGroupName !== null
        );
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.AttributeID = -1;
        
        var data = new FormData();
        data.append("AttributeImageURL", this.state.Files.AttributeImageURL);
        data.append("AttributeObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if(!apiResult.IsError){
                this.handleClearLocalCache();
                this.handleSubmitInsertLog(MLObject);
            }
        });
    }

    loadComboData(searchData) {
        //lấy dữ liệu combo mã danh mục thuộc tính sản phẩm
        this.props
            .callFetchAPI(APIHostName, ComboDataLink, searchData)
            .then(apiResult => {
                if (!apiResult.IsError) {
                    let comboAttributeCategory = apiResult.ResultObject.map(
                        function (objData) {
                            if (objData.AttributeCategoryID === -1) {
                                return {};
                            }
                            return {
                                value: objData.AttributeCategoryID,
                                name: `${objData.AttributeCategoryID}. ${
                                    objData.AttributeCategoryName
                                    }`
                            };
                        }
                    );
                    let comboAttributeDataType = apiResult.ResultObject.map(
                        function (objData) {
                            if (objData.AttributeDataTypeID === -1) {
                                return {};
                            }
                            return {
                                value: objData.AttributeDataTypeID,
                                name: `${objData.AttributeDataTypeID}. ${
                                    objData.AttributeDataTypeName
                                    }`
                            };
                        }
                    );

                    comboAttributeCategory = comboAttributeCategory.filter(
                        value => Object.keys(value).length !== 0
                    );
                    comboAttributeDataType = comboAttributeDataType.filter(
                        value => Object.keys(value).length !== 0
                    );

                    let _AddElementList = this.state.AddElementList;
                    _AddElementList.forEach(function (objElement) {
                        if (
                            objElement.DataSourceMember ==
                            "ListAttributeCategoryID" &&
                            comboAttributeCategory.length > 0
                        ) {
                            objElement.listoption = comboAttributeCategory;
                            objElement.value = comboAttributeCategory[0].value;
                        }
                        if (
                            objElement.DataSourceMember ==
                            "ListAttributeDataTypeID" &&
                            comboAttributeDataType.length > 0
                        ) {
                            objElement.listoption = comboAttributeDataType;
                            objElement.value = comboAttributeDataType[0].value;
                        }
                    });
                    this.setState({
                        AddElementList: _AddElementList
                    });
                } else if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                }
            });
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

    render() {
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
    
            <FormContainer
                FormName="Thêm thuộc tính sản phẩm"
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                url="http://localhost:8910/api/contact"
                IsAutoLayout={true}
                ref={this.searchref}
                BackLink={BackLink}
                dataSource={dataSource}
                RequirePermission={ATTRIBUTE_ADD}
                onHandleSelectedFile={this.handleSelectedFile}
                onSubmit={this.handleSubmit}
            >

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
                {/* <InputGrid
                    name="inputGridAttribute_Lang"
                    controltype="InputControl"
                    isHideHeaderToolbar={true}
                    listColumn={InputLanguageColumnList}
                    dataSource={this.state.InputLanguageDataSource}
                    MLObjectDefinition={GridMLObjectDefinition}
                    colspan="10"
                /> */}
            </FormContainer>
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
        callGetCache: cacheKeyID => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps,mapDispatchToProps)(AddCom);
export default Add;
