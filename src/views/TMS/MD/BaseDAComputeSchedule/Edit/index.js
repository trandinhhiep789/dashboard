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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { REWARDCOMPUTESCHEDULE_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_AREATYPE, ERPCOMMONCACHE_MATERIALGROUP } from "../../../../../constants/keyCache";
import { toIsoStringCus } from "../../../../../utils/function";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            MaterialGroup_InstallCond: [],
            MaterialGroup_Product: [],
        };
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();

    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject.IsAutoAdd) {
                    this.showMessage("Lịch tự động thêm, không thể chỉnh sửa.");
                    this.setState({ IsCloseForm: true });
                } else {
                    this.setState({
                        DataSource: apiResult.ResultObject
                    });
                }
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }



    handleSubmit(formData, MLObject) {
        MLObject.BaseDAComputeScheduleID = this.props.match.params.id;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        if (MLObject.DeliveryDate.getMonth) {
            //MLObject.DeliveryDate.setDate(MLObject.DeliveryDate.getDate() + 1);
            MLObject.DeliveryDate = toIsoStringCus(new Date(MLObject.DeliveryDate).toISOString());
        } else {
            MLObject.DeliveryDate = this.state.DataSource.DeliveryDate;
        }

        // MLObject.MaterialGroup_Product = this.state.MaterialGroup_Product;
        // MLObject.MaterialGroup_InstallCond = this.state.MaterialGroup_InstallCond;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
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
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <SimpleForm
                    FormName="Cập nhật lịch tính và đồng bộ tải chuẩn"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                    RequirePermission={REWARDCOMPUTESCHEDULE_UPDATE}
                    ref={this.searchref}
                />

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
