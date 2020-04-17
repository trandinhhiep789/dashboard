import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { ATTRIBUTE_CATEGORY_TYPE_ADD } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_PIMATTRIBUTECATEGORYTYPE } from "../../../../../constants/keyCache";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName}`;
        MLObject.ActivityDetail = `Thêm mới loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_ATTRIBUTECATEGORYTYPE";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            //console.log("handleSubmit", apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_PIMATTRIBUTECATEGORYTYPE)
                this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
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
            <SimpleForm
                FormName="Thêm loại danh mục thuộc tính"
                MLObjectDefinition={MLObjectDefinition} ƒ
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={ATTRIBUTE_CATEGORY_TYPE_ADD}
                ref={this.searchref}
            />
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
