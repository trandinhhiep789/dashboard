import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, LoadAPIPath, UpdateAPIPath, EditElementList, MLObjectDefinition, BackLink, EditPagePath, GetActivedAttributeCategoryTypeAPIPath, GetAttributeCategoryParentAPIPath, GridMLObjectDefinition, InputLanguageColumnList, AddLogAPIPath } from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { ATTRIBUTE_CATEGORY_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_ATTRIBUTECATEGORY } from "../../../../../constants/keyCache";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.state = { CallAPIMessage: "", IsCallAPIError: false, FormContent: "", IsLoadDataComplete: false, IsCloseForm: false, EditElementList, ResultLanguage: [] };
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

    handleIsSystemData(isSystem) {
        if (isSystem) {
            // let _EditElementList = this.state.EditElementList;
            // _EditElementList.forEach(function (objElement) {
            //     if (objElement.DataSourceMember == 'ParentID' && comboParentIDList.length > 0) {
            //         objElement.listoption = comboParentIDList;
            //         objElement.value = comboParentIDList[0].value;
            //     }
            //     objElement.readonly=true;
            // });
            document.querySelectorAll('[type=submit]').disabled = "disafdfdf";
        }
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.getAttributeCategoryParentList(id);
        this.getActivedAttributeCategoryTypeList(id);
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            //console.log("componentDidMount:", apiResult);
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
                    this.setState({ DataSource, ResultLanguage, IsLoadDataComplete: true });
                }
            }
            this.handleIsSystemData(apiResult.ResultObject.IsSystem);
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

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật danh mục thuộc tính: ${MLObject.AttributeCategoryName}`;
        MLObject.ActivityDetail = `Cập nhật danh mục thuộc tính: ${MLObject.AttributeCategoryName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTECATEGORY";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        // console.log("formData:", formData);
        // console.log("MLObject:", MLObject);
        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductFeatureGroupName !== null
        );
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
            //console.log("apiResult:", apiResult);
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_ATTRIBUTECATEGORY)
                this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        });
    }

    //lấy combobox mã danh muc thuộc tính cha
    getAttributeCategoryParentList(id) {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: id
        }];
        this.props.callFetchAPI(APIHostName, GetAttributeCategoryParentAPIPath, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {
                let comboParentIDList = apiResult.ResultObject.map(function (objData) {
                    if (objData.AttributeCategoryID === -1) {
                        return {};
                    }
                    return { value: objData.AttributeCategoryID, ParentID: objData.ParentID, name: `${objData.AttributeCategoryID}. ${objData.AttributeCategoryName}`, label: objData.AttributeCategoryName }
                });
                comboParentIDList = comboParentIDList.filter(value => Object.keys(value).length !== 0);
                let _EditElementList = this.state.EditElementList;
                _EditElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'ParentID' && comboParentIDList.length > 0) {
                        objElement.listoption = comboParentIDList;
                        objElement.value = comboParentIDList[0].value;
                    }
                });
                this.setState({
                    EditElementList: _EditElementList,
                });
            }
        });
    }

    //lấy combobox loại danh muc thuộc tính (không lấy mã chưa active)
    getActivedAttributeCategoryTypeList(id) {
        this.props.callFetchAPI(APIHostName, GetActivedAttributeCategoryTypeAPIPath, id).then((apiResult) => {
            if (!apiResult.IsError) {
                let activeAttributeCategoryTypeList = apiResult.ResultObject.map(function (objData) {
                    if (objData.AttributeCategoryTypeID === -1) {
                        return {};
                    }
                    return { value: objData.AttributeCategoryTypeID, name: `${objData.AttributeCategoryTypeID}. ${objData.AttributeCategoryName}`, label: objData.AttributeCategoryTypeName }
                });
                activeAttributeCategoryTypeList.unshift({ value: -1, name: "Vuilongchon", label: "--Vui lòng chọn--" });
                activeAttributeCategoryTypeList = activeAttributeCategoryTypeList.filter(value => Object.keys(value).length !== 0);
                let _EditElementList = this.state.EditElementList;
                _EditElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == 'AttributeCategoryTypeID' && activeAttributeCategoryTypeList.length > 0) {
                        objElement.listoption = activeAttributeCategoryTypeList;
                        objElement.value = activeAttributeCategoryTypeList[0].value;
                    }
                });
                this.setState({
                    EditElementList: _EditElementList,
                });
            }
        });
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
            return (
                // <SimpleForm FormName="Cập nhật danh mục thuộc tính sản phẩm" MLObjectDefinition={MLObjectDefinition} listelement={EditElementList} url="http://localhost:8910/api/contact" onSubmit={this.handleSubmit}
                //     FormMessage={this.state.CallAPIMessage} IsErrorMessage={this.state.IsCallAPIError}
                //     dataSource={this.state.DataSource}
                //     BackLink={BackLink}
                //     ref={this.searchref}
                // />

                <FormContainer FormName="Cập nhật danh mục thuộc tính sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    dataSource={this.state.DataSource}
                    ref={this.searchref}
                    IsAutoLayout={true}
                    BackLink={BackLink}
                    RequirePermission={ATTRIBUTE_CATEGORY_UPDATE}
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;