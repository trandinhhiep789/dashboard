import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, LoadAPIPath, UpdateAPIPath, EditElementList, MLObjectDefinition, BackLink, EditPagePath, InitSearchParams, ComboDataLink, GridMLObjectDefinition, InputLanguageColumnList, AddLogAPIPath } from "../constants";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { ATTRIBUTE_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_PIMATTRIBUTE } from "../../../../../constants/keyCache";
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
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject.ResultLanguage);
                    const DataSource = Object.assign([], this.state.DataSource, apiResult.ResultObject);
                    this.setState({ DataSource, ResultLanguage });
                }
                this.loadComboData(this.state.SearchData);
            }
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

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật thuộc tính: ${MLObject.AttributeName}`;
        MLObject.ActivityDetail = `Cập nhật thuộc tính: ${MLObject.AttributeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
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
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_PIMATTRIBUTE)
                this.handleSubmitInsertLog(MLObject);
            }
        });
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
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    }
}


const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;