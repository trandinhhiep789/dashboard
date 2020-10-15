import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    GetParent
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { AREA_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import { createListTree } from '../../../../../common/library/ultils';
import Area_Store from "../../Area_Store";
import { ERPCOMMONCACHE_AREATT } from "../../../../../constants/keyCache";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onAreaStoreChange = this.onAreaStoreChange.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            AreaStore: []
        };
    }

    GetParentList(id) {
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: id
        },
        {
            SearchKey: "@IsActived",
            SearchValue: 1
        }
        ];

        this.props.callFetchAPI(APIHostName, GetParent, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {

                const sortTemp = apiResult.ResultObject.sort((a, b) => (a.ParentID > b.ParentID) ? 1 : (a.ParentID === b.ParentID) ? ((a.AreaID > b.AreaID) ? 1 : -1) : -1)
                let treeData = createListTree(sortTemp, -1, "ParentID", "AreaID", "AreaName")
                treeData.unshift({
                    ParentID: -1,
                    AreaID: -1,
                    AreaName: "-- Vui lòng chọn --",
                    key: -1,
                    value: -1,
                    title: "-- Vui lòng chọn --",
                })
                this.setState({ treeData })
                let _EditElementList = this.state.EditElementList;
                _EditElementList.forEach(function (objElement) {
                    if (objElement.type == 'treeSelect') {
                        objElement.treeData = treeData;
                    }
                });
                this.setState({
                    EditElementList: _EditElementList,
                });

            }
        });
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.GetParentList(id);
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    AreaStore: apiResult.ResultObject.AreaStore ? apiResult.ResultObject.AreaStore : [],
                    //SkillSkillRank: apiResult.ResultObject.SkillSkillRank ? apiResult.ResultObject.SkillSkillRank : [],
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });

    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.GetParentList(id);
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    AreaStore: apiResult.ResultObject.AreaStore ? apiResult.ResultObject.AreaStore : [],
                    //SkillSkillRank: apiResult.ResultObject.SkillSkillRank ? apiResult.ResultObject.SkillSkillRank : [],
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    onAreaStoreChange() {
        //this.setState({ AreaStore: list });
        this.callLoadData();
        //console.log("onAreaStoreChange", list);
    }




    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.AreaStore = this.state.AreaStore;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_AREA);
                this.props.callClearLocalCache(ERPCOMMONCACHE_AREATT);
            }
        });
        //console.log("MLObject",MLObject);
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
                <React.Fragment>

                    <FormContainer
                        FormName="Cập nhật khu vực"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={EditElementList}
                        IsAutoLayout={true}
                        onSubmit={this.handleSubmit}
                        FormMessage={this.state.CallAPIMessage}
                        IsErrorMessage={this.state.IsCallAPIError}
                        dataSource={this.state.DataSource}
                        BackLink={BackLink}
                        RequirePermission={AREA_UPDATE}
                    >

                        {/* <br />
                        <Area_Store
                            AreaID={this.props.match.params.id}
                            AreaStoreDataSource={this.state.AreaStore}
                            onAreaStoreChange={this.onAreaStoreChange}
                        /> */}
                    </FormContainer>
                </React.Fragment>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
