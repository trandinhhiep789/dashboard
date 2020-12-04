import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    GetParent
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { AREA_ADD } from "../../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { createListTree } from '../../../../../../common/library/ultils';
import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import { ERPCOMMONCACHE_AREA, ERPCOMMONCACHE_AREATT } from "../../../../../../constants/keyCache";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AddElementList: AddElementList,
            IsLoadDataComplete: false
        };
    }

    GetParentList() {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: ""
        },
        {
            SearchKey: "@IsActived",
            SearchValue: 1
        }
        ];

        this.props.callFetchAPI(APIHostName, GetParent, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {

                const sortTemp = apiResult.ResultObject.sort((a, b) => (a.ParentID > b.ParentID) ? 1 : (a.ParentID === b.ParentID) ? ((a.AppFeedBackCategoryID > b.AppFeedBackCategoryID) ? 1 : -1) : -1)
                let treeData = createListTree(sortTemp, -1, "ParentID", "AppFeedBackCategoryID", "AppFeedBackCategoryName")
                treeData.unshift({
                    ParentID: -1,
                    AppFeedBackCategoryID: -1,
                    AppFeedBackCategoryName: "-- Vui lòng chọn --",
                    key: -1,
                    value: -1,
                    title: "-- Vui lòng chọn --",
                })
                this.setState({ treeData })
                let _AddElementList = this.state.AddElementList;
                _AddElementList.forEach(function (objElement) {
                    if (objElement.type == 'treeSelect') {
                        objElement.treeData = treeData;
                        objElement.value = -1;
                    }
                });
                this.setState({
                    AddElementList: _AddElementList,
                    IsLoadDataComplete: true
                });

            }
        });
    }

    componentDidMount() {
        this.GetParentList();
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                // this.props.callClearLocalCache(ERPCOMMONCACHE_AREA);
                // this.props.callClearLocalCache(ERPCOMMONCACHE_AREATT);
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog(MLObject);
            }
        });
        //console.log("handleSubmit",MLObject);
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
                    FormName="Thêm danh mục phản hồi"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.AddElementList}
                    IsAutoLayout={true}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={[]}
                    BackLink={BackLink}
                    RequirePermission={AREA_ADD}
                >
                </FormContainer>
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
