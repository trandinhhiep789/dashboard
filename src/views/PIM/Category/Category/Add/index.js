import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    LoadAPIPathLanguage,
    GridMLObjectDefinition,
    InputLanguageColumnList,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { CATEGORY_ADD } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache } from "../../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.handleGetCache = this.handleGetCache.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            ResultLanguage: [],
            DataSource: {
                CategoryID: "",
                CategoryTypeID: "",
                ParentID: "",
                CategoryName: "",
                Description: "",
                IsActived: true
            }
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
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, { [index]: rowGridData });
        this.setState({ ResultLanguage: dataSource });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới danh mục: ${MLObject.CategoryName}`;
        MLObject.ActivityDetail = `Thêm mới danh mục: ${MLObject.CategoryName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_CATEGORY";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.CategoryName !== null);
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleClearLocalCache();
                this.handleSubmitInsertLog(MLObject);
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

    handleClearLocalCache() {
        const CacheKeyID = "PIMCACHE.CATEGORY";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(CacheKeyID).then((result) => {
            const postData = {
                CacheKeyID: CacheKeyID,
                UserName: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
                AdditionParamList: []
            };
            this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                console.log("apiResult cache", apiResult);
                this.handleGetCache();
            });
        });
    }

    handleGetCache() {
        this.props.callGetCache("PIMCACHE.CATEGORY").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <FormContainer
                FormName="Thêm danh mục"
                IsAutoLayout={true}
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={this.state.DataSource}
                BackLink={BackLink}
                RequirePermission={CATEGORY_ADD}
                ref={this.searchref}
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
