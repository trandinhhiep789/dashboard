import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    GridMLObjectDefinition,
    InputLanguageColumnList,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PRODUCT_TYPE_UPDATE } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache } from "../../../../../actions/cacheAction";
import ProductTypeAttibute from "../../ProductTypeAttibute/index";
import ProductTypeImeiFormat from "../../ProductTypeImeiFormat/index";
import ProductTypeInventoryStatus from "../../ProductTypeInventoryStatus/index";

class EditCom extends React.Component {
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
            IsLoadDataComplete: false,
            IsCloseForm: false,
            DataSource: [],
            ResultLanguage: []
        };
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
        this.props.updatePagePath(EditPagePath);
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, { [index]: rowGridData });
        this.setState({ ResultLanguage: dataSource });
    }

    handleClearLocalCache() {
        const cacheKeyID = "PIMCACHE.PRODUCTTYPE";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(cacheKeyID).then((result) => {
            const postData = {
                CacheKeyID: cacheKeyID,
                UserName: this.props.AppInfo.LoginInfo.Username,
                AdditionParamList: []
            };
            this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                //console.log("apiResult cache", apiResult);
                this.handleGetCache();
            });
        }
        );
    }

    handleGetCache() {
        this.props.callGetCache("PIMCACHE.PRODUCTTYPE").then((result) => {
            //console.log("handleGetCache: ", result);
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật loại sản phẩm: ${MLObject.ProductTypeName}`;
        MLObject.ActivityDetail = `Cập nhật loại sản phẩm: ${MLObject.ProductTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_PRODUCTTYPE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.ProductTypeName !== null);
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            const ProductTypeID = this.state.DataSource.ProductTypeID;
            const ProductTypeName = this.state.DataSource.ProductTypeName;
            return (
                <React.Fragment>
                    <FormContainer
                        FormName="Cập nhật loại nội dung sản phẩm"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={EditElementList}
                        IsAutoLayout={true}
                        onSubmit={this.handleSubmit}
                        FormMessage={this.state.CallAPIMessage}
                        IsErrorMessage={this.state.IsCallAPIError}
                        dataSource={this.state.DataSource}
                        BackLink={BackLink}
                        RequirePermission={PRODUCT_TYPE_UPDATE}
                    >
                        <InputGrid
                            name="ResultLanguage"
                            controltype="InputControl"
                            listColumn={InputLanguageColumnList}
                            dataSource={this.state.ResultLanguage}
                            MLObjectDefinition={GridMLObjectDefinition}
                            colspan="12"
                            isHideHeaderToolbar={true}
                            isDisabled={this.state.DataSource.IsSystem}
                            onValueChangeInputGrid={this.valueChangeInputGrid}
                        />
                    </FormContainer>
                    <div className="Col-12 col-md-12 col-lg-12 product-detail">
                        <ProductTypeAttibute ProductTypeID={ProductTypeID} isSystem={this.state.DataSource.IsSystem}/>
                        <ProductTypeImeiFormat ProductTypeID={ProductTypeID} isSystem={this.state.DataSource.IsSystem}/>
                        <ProductTypeInventoryStatus ProductTypeID={ProductTypeID} isSystem={this.state.DataSource.IsSystem}/>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <label>Đang nạp dữ liệu...</label>
            </React.Fragment>
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
