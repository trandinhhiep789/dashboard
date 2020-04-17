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
} from "../Constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PRODUCT_ASSOC_TYPE_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_PRODUCTASSOCTYPE } from "../../../../../constants/keyCache";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            DataSource: [],
            ResultLanguage: []
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            console.log("apiResult", apiResult.ResultObject);
            if (apiResult.IsError) {
                this.setState({ IsCallAPIError: !apiResult.IsError });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject.ResultLanguage);
                    const DataSource = Object.assign([], this.state.DataSource, apiResult.ResultObject);
                    this.setState({ DataSource, ResultLanguage, sLoadDataComplete: true });
                }
            }
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật loại kết hợp sản phẩm: ${MLObject.ProductAssocTypeName}`;
        MLObject.ActivityDetail = `Cập nhật loại kết hợp sản phẩm: ${MLObject.ProductAssocTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_PRODUCTASSOCTYPE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(
            x => x.HasChanged == true && x.ProductAssocTypeName !== null
        );
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_PRODUCTASSOCTYPE)
                this.handleSubmitInsertLog(MLObject);
            }
        });
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, {
            [index]: rowGridData
        });
        this.setState({ ResultLanguage: dataSource });
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
            return (
                <FormContainer
                    FormName="Cập nhật loại kết hợp sản phẩm"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    dataSource={this.state.DataSource}
                    ref={this.searchref}
                    IsAutoLayout={true}
                    RequirePermission={PRODUCT_ASSOC_TYPE_UPDATE}
                    BackLink={BackLink}
                    onSubmit={this.handleSubmit}
                >
                    <InputGrid
                        name="inputGridProductAssocType_lang"
                        controltype="InputControl"
                        listColumn={InputLanguageColumnList}
                        isHideHeaderToolbar={true}
                        dataSource={this.state.ResultLanguage}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="10"
                        isDisabled={this.state.DataSource.IsSystem}
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
