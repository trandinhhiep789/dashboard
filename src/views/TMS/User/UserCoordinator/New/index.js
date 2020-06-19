import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import {
    APIHostName,
    PagePath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    MLObjectStoreItem,
    DataGridColumnStoreList
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_CARRIERTYPE } from "../../../../../constants/keyCache";

class NewCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            Username: "",
            DepartmentName: "",
            PositionName: "",
            Address: ""
        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
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

    onChangeUser(name, objuser) {
        this.setState({
            Username: objuser.value,
            DepartmentName: objuser.DepartmentName,
            PositionName: objuser.PositionName,
            Address: objuser.Address
        });
    }

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
            <React.Fragment>
                <div className="col-lg-6 page-detail">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Cấp quyền nhân viên theo kho</h4>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
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
                                <div className="col-md-12">
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
                                <div className="col-md-12">
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

                                <div className="col-md-12">
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

                                <div className="col-md-12">
                                    <h3 className="title">Danh sách kho</h3>
                                </div>
                                <div className="col-md-12">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: "30%" }}>Mã kho</th>
                                                <th className="jsgrid-header-cell" style={{ width: "60%" }}>tên kho</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td> <MultiSelectComboBox
                                                    name="User"
                                                    colspan="8"
                                                    labelcolspan="4"
                                                    label="Người dùng"
                                                    disabled={false}
                                                    IsLabelDiv={false}
                                                    isautoloaditemfromcache={false}
                                                    onChange={this.onChangeUser.bind(this)}
                                                    controltype="InputControl"
                                                    value={[]}
                                                    listoption={[]}
                                                    isMultiSelect={false}
                                                    datasourcemember="User"
                                                    validationErrorMessage={''}
                                                /></td>
                                                <td></td>
                                                <td>
                                                    <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff"> Thêm</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Kho tân bình</td>
                                                <td>
                                                    <button type="button" className="btn btnDeleteTable" title="" data-provide="tooltip" data-original-title="Xóa" >
                                                        <i class="ti-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 page-detail">
                    aa
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

const New = connect(mapStateToProps, mapDispatchToProps)(NewCom);
export default New;