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
    GetAllSkillByUserNameAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ERPUSERCACHE_FUNCTION } from "../../../../../constants/keyCache";
import { USERSKILL_VIEW, USERSKILL_UPDATE } from "../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataCombobox = this.getDataCombobox.bind(this);
        this.onClickUserSkill = this.onClickUserSkill.bind(this);
        this.checkAddPermission = this.checkAddPermission.bind(this);
        this.state = {
            Username: "",
            DepartmentName: "",
            PositionName: "",
            Address: "",
            DataSource: [],
            DataSourceUserSkill: [],
        };

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.checkAddPermission();
        this.props.updatePagePath(PagePath);
    }

    checkAddPermission() {
        this.props.callGetCache(ERPUSERCACHE_FUNCTION).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _view = result.ResultObject.CacheData.filter(x => x.FunctionID == USERSKILL_VIEW);
                if (_view && _view.length > 0) {
                    this.setState({ IsAllowView: true });
                }

                let _update = result.ResultObject.CacheData.filter(x => x.FunctionID == USERSKILL_UPDATE);
                if (_update && _update.length > 0) {
                    this.setState({ IsAllowUpdate: true });
                }
            }
            //console.log("handleGetCache: ", result);
        });
    }

    getDataCombobox(skillID) {
        let result = "";
        let match = this.state.DataSource.filter(x => x.SkillID == skillID);
        if (match && match.length > 0) {
            result = match.map(function (item, index) {
                if (item.SkillRankID && item.SkillRankName) {
                    return (<option value={item.SkillRankID} key={index + 1}>{item.SkillRankName}</option>);
                }

            });
        }
        return result;
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
                Address: objUser.Address,
                FullName: objUser.label
            });
            //console.log("objUser", objUser);
            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                this.callLoadData(postData);
                //this.callLoadDataSkill(postData)
            }
        }
    }


    callLoadData(postData) {
        this.props.callFetchAPI(APIHostName, GetAllSkillByUserNameAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                let id = "";
                let uniqueArray = apiResult.ResultObject;
                uniqueArray = uniqueArray.filter(function (item, index) {
                    if (index == 0) {
                        id = item.SkillID;
                        return item;
                    }
                    if (index > 0 && item.SkillID != id) {
                        id = item.SkillID;
                        return item;

                    }

                })
                this.setState({
                    DataSource: apiResult.ResultObject,
                    DataSourceUserSkill: uniqueArray
                });
                //console.log("uniqueArray", apiResult.ResultObject);
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
        let inputvalue = e.target.value;
        let name = e.target.name.split("-")[0];
        let index = e.target.name.split("-")[1];
        let { DataSourceUserSkill } = this.state;

        if (e.target.type.toString().indexOf("select") !== -1) {
            DataSourceUserSkill[index].UserSkillRankID = inputvalue;
        } else if (e.target.type == 'checkbox') {
            let ischecked = e.target.checked;
            if (name == "chkAdd") {
                DataSourceUserSkill[index].IsSelected = ischecked;
            } else if (name == "chkIsActived") {
                DataSourceUserSkill[index].IsActived = ischecked;
            } else if (name == "chkIsSystem") {
                DataSourceUserSkill[index].IsSystem = ischecked;
            }
        } else if (e.target.type == 'text') {
            DataSourceUserSkill[index].Note = inputvalue;
        }

        //console.log("DataSourceUserSkill", DataSourceUserSkill);
        this.setState({ DataSourceUserSkill: DataSourceUserSkill });
    }

    onClickUserSkill() {
        if (this.state.IsAllowUpdate) {
            let data = this.state.DataSourceUserSkill;
            data[0].CreatedUser = this.props.AppInfo.LoginInfo.Username;
            data[0].LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError);
            });
        } else {
            this.showMessage("Bạn không có quyền cập nhật");
        }

    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            //onCloseModal={this.handleCloseMessage}
            />
        );
    }

    render() {
        if (this.state.IsAllowView) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-lg-12 page-detail">
                        <div className="card">
                            <div className="card-title">
                                <h4 className="title">Kỹ năng của một nhân viên</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <MultiSelectComboBox
                                                    name="User"
                                                    colspan={9}
                                                    labelcolspan={3}
                                                    label="Nhập mã nhân viên"
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

                                        </div>
                                    </div>
                                    <div className="col-md-6 container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.state.FullName ?
                                                    <div>
                                                        <label className="col-form-label 6">Tên nhân viên:</label> &nbsp; &nbsp;
                                                        <b style={{color: "blue"}}>{this.state.FullName}</b>
                                                    </div>
                                                    : ""
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="title">Danh sách kỹ năng</h3>
                                    </div>
                                    <div className="col-md-12">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Tác vụ</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã kỹ năng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Tên kỹ năng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Cấp bậc kỹ năng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "25%" }}>Ghi chú</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Kích hoạt</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Hệ thống</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.DataSourceUserSkill && this.state.DataSourceUserSkill.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.SkillID}
                                                                            name={`chkAdd-${index}`}
                                                                            checked={item.IsSelected} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{item.SkillID}</td>
                                                            <td>{item.SkillName}</td>
                                                            <td>
                                                                <select className="form-control form-control-sm" name={`txtSkillRank-${index}`} onChange={this.handleInputChange} value={item.UserSkillRankID}>
                                                                    <option value="-1" key={0}>--Vui lòng chọn--</option>
                                                                    {this.getDataCombobox(item.SkillID)}
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input type="text" name={`txtNote-${index}`} className="form-control form-control-sm" placeholder="" onChange={this.handleInputChange} value={item.Note} />
                                                            </td>
                                                            <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.IsActived}
                                                                            name={`chkIsActived-${index}`}
                                                                            checked={item.IsActived} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>


                                                            </td>
                                                            <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.IsSystem}
                                                                            name={`chkIsSystem-${index}`}
                                                                            checked={item.IsSystem} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }

                                            </tbody>
                                        </table>
                                        <div className="text-right">
                                            {
                                                this.state.Username != "" ? <button type="button" className="btn btn-info" onClick={this.onClickUserSkill} data-provide="tooltip" data-original-title="Thêm">
                                                    <span className="fa fa-plus ff">Cập nhật</span>
                                                </button> : ""
                                            }
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </React.Fragment>

            );

        } else {
            return (
                <div>
                    <label>Bạn không có quyền</label>
                </div>
            );
        }

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
