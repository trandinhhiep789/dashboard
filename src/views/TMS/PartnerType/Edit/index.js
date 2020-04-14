import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    InputLanguageColumnList,
    GridMLObjectDefinition,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_UPDATE } from "../../../../constants/functionLists";
import { callGetCache } from "../../../../actions/cacheAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.handleGetCache = this.handleGetCache.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            DataSource: [],
            ResultLanguage: [],
            Files: {},
            IsDeletedFile: false
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject.ResultLanguage);
                    const DataSource = Object.assign([], this.state.DataSource, apiResult.ResultObject);
                    this.setState({ DataSource, ResultLanguage });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, { [index]: rowGridData });
        this.setState({ ResultLanguage: dataSource });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật nhãn hiệu: ${MLObject.BrandName}`;
        MLObject.ActivityDetail = `Cập nhật nhãn hiệu: ${MLObject.BrandName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_BRAND";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.BrandName !== null);
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        if (this.state.IsDeletedFile) {
            MLObject.LogoImageURL = "";
        }
        let data = new FormData();
        data.append("LogoImageURL", this.state.Files.LogoImageURL);
        data.append("BrandObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if(!apiResult.IsError){
                this.handleClearLocalCache();
                this.handleSubmitInsertLog(MLObject);
            }
        });
    }

    
    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
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

    handleClearLocalCache() {
        const CacheKeyID = "PIMCACHE.BRAND";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(CacheKeyID).then((result) => {
            const postData = {
                CacheKeyID: CacheKeyID,
                UserName: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
                AdditionParamList: []
            };
            this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                //console.log("apiResult cache", apiResult);
                this.handleGetCache();
            });
        });
    }

    handleGetCache() {
        this.props.callGetCache("PIMCACHE.BRAND").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Cập nhật nhãn hiệu"
                    IsAutoLayout={true}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    onHandleSelectedFile={this.handleSelectedFile}
                    dataSource={this.state.DataSource}
                    ref={this.searchref}
                    RequirePermission={BRAND_UPDATE}
                    BackLink={BackLink}
                >
                    <InputGrid
                        name="ResultLanguage"
                        controltype="InputControl"
                        isHideHeaderToolbar={true}
                        listColumn={InputLanguageColumnList}
                        dataSource={this.state.ResultLanguage}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="12"
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                    />
                </FormContainer>
            );
        }
        return <label>Đang nạp dữ liệu...</label>;
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
