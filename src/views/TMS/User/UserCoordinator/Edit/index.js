import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";

import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import {
    APIHostName,
    PagePath,
    AddAPIPath,
    SearchAPIPath,
    SearchAPISearchUser,
    DeleteAPIPath,
    UpdateAPIPath,
    DeleteUserAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            Username: "",
            DepartmentName: "",
            PositionName: "",
            Address: "",
            DataSourceStore: [],
            StoreID: "",
            StoreName: "",
            StoreFax: "",
            StoreAddress: "",
            DataSourceUser: [],
            objUserStore: { StoreName: "", StoreID: 0 },
            validationUserStore: "",
            validationStoreUser: "",
            objStoreUser: { UserName: "", FullName: "" },
            DataUserGroup: []
        };

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    onChangeUser(name, objUser) {
        if (name == "StoreUser") {
            let validationStoreUser = ""
            if (objUser.value == "") {
                validationStoreUser = "vui lòng chọn nhân viên";
            }

            let objStoreUser = {
                UserName: objUser.value,
                FullName: objUser.FullName
            }
            this.setState({
                objStoreUser: objStoreUser,
                validationStoreUser: validationStoreUser
            });
        }
        else {
            this.setState({
                Username: objUser.value,
                DepartmentName: objUser.DepartmentName,
                PositionName: objUser.PositionName,
                Address: objUser.Address
            });

            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                this.callSearchDataUser(postData);
                this.callSearchDataUserGroup(postData)
            }
        }
    }
    onChangeStore(name, objstore) {
        if (name == "UserStore") {
            let validationUserStore = ""
            if (objstore.value == "") {
                validationUserStore = "vui lòng chọn kho";
            }

            let objUserStore = {
                StoreID: objstore.value,
                StoreName: objstore.name
            }
            this.setState({
                objUserStore: objUserStore,
                validationUserStore: validationUserStore
            });


        }
        else {
            this.setState({
                StoreID: objstore.value,
                StoreName: objstore.name,
                StoreFax: objstore.StoreFax,
                StoreAddress: objstore.StoreAddress
            });
            if (objstore.value != "") {
                const postData = [
                    {
                        SearchKey: "@StoreID",
                        SearchValue: objstore.value
                    }
                ];
                this.callSearchDataStore(postData);
            }
        }

    }

    callSearchDataUser(postData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({ DataSourceStore: apiResult.ResultObject });
            }
        });
    }

    callSearchDataUserGroup(postData) {
        this.props.callFetchAPI(APIHostName, 'api/User_UserGroup/Search', postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({ DataUserGroup: apiResult.ResultObject });
            }
        });
    }
    callSearchDataStore(postData) {
        this.props.callFetchAPI(APIHostName, SearchAPISearchUser, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({ DataSourceUser: apiResult.ResultObject });
            }
        });
    }
    onClickUserStore() {
        if (this.state.objUserStore.StoreID == "") {
            this.setState({ validationUserStore: "vui lòng chọn kho" });
        }
        else {
            let MLObject = {
                UserName: this.state.Username,
                StoreID: this.state.objUserStore.StoreID,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }
            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.setState({ DataSourceStore: apiResult.ResultObject });
                }
            });
        }
    }

    onClickStoreUser() {
        if (this.state.objStoreUser.UserName == "") {
            this.setState({ validationStoreUser: "vui lòng chọn nhân viên" });
        }
        else {
            let MLObject = {
                UserName: this.state.objStoreUser.UserName,
                StoreID: this.state.StoreID,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.setState({ DataSourceUser: apiResult.ResultObject });
                }
            });
        }

    }

    handleonClickDeleteStore(e) {
        const id = e.currentTarget.dataset.id;
        let MLObject = {
            UserName: this.state.Username,
            StoreID: id,
            DeletedUser: this.props.AppInfo.LoginInfo.Username,
            LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        }
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, MLObject).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.setState({ DataSourceStore: apiResult.ResultObject });
            }
        });

    }

    handleonClickDeleteUser(e) {
        const strUsername = e.currentTarget.dataset.id;
        let MLObject = {
            UserName: strUsername,
            StoreID: this.state.StoreID,
            DeletedUser: this.props.AppInfo.LoginInfo.Username,
            LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        }
        this.props.callFetchAPI(APIHostName, DeleteUserAPIPath, MLObject).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.setState({ DataSourceUser: apiResult.ResultObject });
            }
        });

    }


    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        let { DataUserGroup } = this.state
        DataUserGroup[index].IsSelected = ischecked
        this.setState({ DataUserGroup: DataUserGroup });
    }
    onClickUserGroup() {
        this.props.callFetchAPI(APIHostName, "api/User_UserGroup/InsertUserGroupList", this.state.DataUserGroup).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-lg-12 page-detail">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Cấp quyền kho theo nhân viên</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <MultiSelectComboBox
                                        name="User"
                                        colspan="9"
                                        labelcolspan="3"
                                        label="Người dùng"
                                        disabled={false}
                                        IsLabelDiv={true}
                                        isautoloaditemfromcache={false}
                                        onChange={this.onChangeUser.bind(this)}
                                        controltype="InputControl"
                                        value={[]}
                                        listoption={[]}
                                        isMultiSelect={false}
                                        datasourcemember="User"
                                        validationErrorMessage={''}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name="txtSenderFullName"
                                        colspan="9"
                                        labelcolspan="3"
                                        readOnly={false}
                                        label="Phòng ban"
                                        placeholder=""
                                        controltype="InputControl"
                                        value={this.state.DepartmentName}
                                        datasourcemember="SenderFullName"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name="txtSenderFullName"
                                        colspan="9"
                                        labelcolspan="3"
                                        readOnly={false}
                                        label="Chức vụ"
                                        placeholder=""
                                        controltype="InputControl"
                                        value={this.state.PositionName}
                                        datasourcemember="SenderFullName"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name="txtSenderFullName"
                                        colspan="9"
                                        labelcolspan="3"
                                        readOnly={false}
                                        label="Nơi làm việc"
                                        placeholder=""
                                        controltype="InputControl"
                                        value={this.state.Address}
                                        datasourcemember="SenderFullName"
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="title">Danh sách kho</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="jsgrid-header-cell" style={{ width: "30%" }}>Mã kho</th>
                                                        <th className="jsgrid-header-cell" style={{ width: "60%" }}>Tên kho</th>
                                                        <th className="jsgrid-header-cell" style={{ width: "10%" }}>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr>
                                                        <td> <MultiStoreComboBox
                                                            name="UserStore"
                                                            colspan="8"
                                                            labelcolspan="4"
                                                            label="Người dùng"
                                                            disabled={false}
                                                            IsLabelDiv={false}
                                                            isautoloaditemfromcache={false}
                                                            onChange={this.onChangeStore.bind(this)}
                                                            controltype="InputControl"
                                                            value={[]}
                                                            listoption={[]}
                                                            isMultiSelect={false}
                                                            datasourcemember="User"
                                                            validationErrorMessage={this.state.validationUserStore}
                                                        /></td>
                                                        <td>{this.state.objUserStore.StoreName}</td>
                                                        <td>
                                                            {
                                                                this.state.Username != "" ? <button type="button" className="btn btn-info" onClick={this.onClickUserStore.bind(this)} data-provide="tooltip" data-original-title="Thêm">
                                                                    <span className="fa fa-plus ff"> Thêm</span>
                                                                </button> : ""
                                                            }

                                                        </td>
                                                    </tr>

                                                    {this.state.DataSourceStore && this.state.DataSourceStore.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.StoreID}</td>
                                                                <td>{item.StoreName}</td>
                                                                <td>

                                                                    <button type="button" className="btn btnDeleteTable" title=""
                                                                        data-provide="tooltip" data-original-title="Xóa"
                                                                        onClick={this.handleonClickDeleteStore.bind(this)}
                                                                        data-id={item.StoreID}
                                                                    >
                                                                        <i className="ti-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="title">Danh nhóm quyền</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="jsgrid-header-cell" style={{ width: "10%" }}>Tác vụ</th>
                                                        <th className="jsgrid-header-cell" style={{ width: "30%" }}>Mã nhóm quyền</th>
                                                        <th className="jsgrid-header-cell" style={{ width: "60%" }}>Tên nhóm quyền</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.DataUserGroup && this.state.DataUserGroup.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" className="form-control form-control-sm"
                                                                                onChange={this.handleInputChange} value={item.UserGroupID}
                                                                                name={index}
                                                                                checked={item.IsSelected} />
                                                                            <span className="cr">
                                                                                <i className="cr-icon fa fa-check"></i>
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>{item.UserGroupID}</td>
                                                                <td>{item.UserGroupName}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    }

                                                </tbody>
                                            </table>
                                            <div className="text-right">
                                                {
                                                    this.state.Username != "" ? <button type="button" className="btn btn-info" onClick={this.onClickUserGroup.bind(this)} data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff">Cập nhật</span>
                                                    </button> : ""
                                                }
                                            </div>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
