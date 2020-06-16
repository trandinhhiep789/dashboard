import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_CARRIERTYPE } from "../../../../../constants/keyCache";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.setState({
            IsLoadDataComplete: true
        });
        // const id = this.props.match.params.id;
        // this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
        //         if (apiResult.IsError) {
        //             this.setState({
        //                 IsCallAPIError: apiResult.IsError
        //             });
        //             this.showMessage(apiResult.Message);
        //         } else {
        //             this.setState({ DataSource: apiResult.ResultObject });
        //         }
        //         this.setState({
        //             IsLoadDataComplete: true
        //         });
        //     });
    }

    // handleClearLocalCache() {
    //     const cacheKeyID = "PIMCACHE.PIMATTRIBUTECATEGORYTYPE";
    //     const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
    //     return db.delete(cacheKeyID).then((result) => {
    //         const postData = {
    //             CacheKeyID: cacheKeyID,
    //             UserName: this.props.AppInfo.LoginInfo.Username,
    //             AdditionParamList: []
    //         };
    //         this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
    //             this.handleGetCache();
    //             //console.log("apiResult", apiResult)
    //         });
    //     }
    //     );
    // }

    // handleGetCache() {
    //     this.props.callGetCache("PIMCACHE.PIMATTRIBUTECATEGORYTYPE").then((result) => {
    //         console.log("handleGetCache: ", result);
    //     });
    // }

    // handleSubmitInsertLog(MLObject) {
    //     MLObject.ActivityTitle = `Cập nhật loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName}`;
    //     MLObject.ActivityDetail = `Cập nhật loại danh mục thuộc tính: ${MLObject.AttributeCategoryTypeName} ${"\n"}Mô tả: ${MLObject.Description}`;
    //     MLObject.ObjectID = "PIM_ATTRIBUTECATEGORYTYPE";
    //     MLObject.ActivityUser = MLObject.UpdatedUser;
    //     this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    // }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_CARRIERTYPE);
                // this.handleSubmitInsertLog(MLObject);
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
        return (
            <div className="col-lg-12 page-detail">
                <div className="card">
                    <div className="card-title">
                        <h4 className="title">Địa chỉ</h4>
                    </div>
                    <div className="card-body">
                        <div className="card">
                            <div className="card-title">
                                <h4 className="title">Ngưởi gửi</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="đối tác gửi"
                                            placeholder="Đối tác gửi"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="kho gửi"
                                            placeholder="Kho gửi"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="họ tên người gửi"
                                            placeholder="Họ tên người gửi"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="số điện thoại"
                                            placeholder="Số điện thoại"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="10"
                                            labelcolspan="2"
                                            readOnly={true}
                                            label="địa chỉ email"
                                            placeholder="Địa chỉ email"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                            classNameCustom="customcontrol"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="tỉnh/thành phố"
                                            placeholder="Tỉnh/thành phố"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="quận/huyện"
                                            placeholder="Quận/huyện"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="phường/xã"
                                            placeholder="Phường/xã"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="số nhà/đường"
                                            placeholder="Số nhà/đường"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl.TextBox
                                            name=""
                                            colspan="8"
                                            labelcolspan="4"
                                            readOnly={true}
                                            label="địa chỉ đầy đủ"
                                            placeholder="Địa chỉ đầy đủ"
                                            controltype="InputControl"
                                            value={""}
                                            datasourcemember=""
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
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
