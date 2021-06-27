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
    GetAllByUserNameAPIPath,
    GetAllAPIPath,
    DataTemplateExport,
    schema,
    AddByFileAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ERPUSERCACHE_FUNCTION } from "../../../../../constants/keyCache";
import { USERSKILL_VIEW, USERSKILL_UPDATE, GET_CACHE_USER_FUNCTION_LIST, USER_REWARDPOSITION_VIEW, USER_REWARDPOSITION_UPDATE, USER_REWARDPOSITION_ADD, USER_REWARDPOSITION_EXPORT } from "../../../../../constants/functionLists";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'
import { formatDate } from "../../../../../common/library/CommonLib";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataCombobox = this.getDataCombobox.bind(this);
        this.onClickUser_RewardPosition = this.onClickUser_RewardPosition.bind(this);
        this.checkAddPermission = this.checkAddPermission.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.getDataForExport = this.getDataForExport.bind(this);
        // this.handleImportFile = this.handleImportFile.bind(this);
        // this.onHandleImportFile = this.onHandleImportFile.bind(this);
        this.state = {
            Username: "",
            DepartmentName: "",
            PositionName: "",
            Address: "",
            DataSource: [],
            DataSourceUser_RewardPosition: [],
            DataExport: []
        };

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.checkAddPermission();
        this.props.updatePagePath(PagePath);
        this.getDataForExport();
    }

    checkAddPermission() {
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _view = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_REWARDPOSITION_VIEW);
                if (_view && _view.length > 0) {
                    this.setState({ IsAllowView: true });
                }

                let _update = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_REWARDPOSITION_ADD);
                if (_update && _update.length > 0) {
                    this.setState({ IsAllowUpdate: true });
                }

                let _export = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_REWARDPOSITION_EXPORT);
                if (_export && _export.length > 0) {
                    this.setState({ IsAllowExport: true });
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
        this.props.callFetchAPI(APIHostName, GetAllByUserNameAPIPath, postData).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError) {
                let id = "";
                let uniqueArray = apiResult.ResultObject;
                uniqueArray = uniqueArray.filter(function (item, index) {
                    if (index == 0) {
                        id = item.RewardPositionID;
                        return item;
                    }
                    if (index > 0 && item.RewardPositionID != id) {
                        id = item.RewardPositionID;
                        return item;

                    }

                })
                this.setState({
                    DataSource: apiResult.ResultObject,
                    DataSourceUser_RewardPosition: uniqueArray
                });


                // let countSelected = 0;
                // countSelected = apiResult.ResultObject.filter(item => item.IsSelected == true).length;
                // if (countSelected > 1) {
                //     this.showMessage("Chỉ được phép chọn 1 vị trí thưởng");
                // }
                //console.log("uniqueArray", apiResult.ResultObject);
            }
        });
    }



    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
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
        let { DataSourceUser_RewardPosition } = this.state;

        if (e.target.type.toString().indexOf("select") !== -1) {
            DataSourceUser_RewardPosition[index].User_RewardPositionRankID = inputvalue;
        } else if (e.target.type == 'checkbox') {
            let ischecked = e.target.checked;
            if (name == "chkAdd") {
                //DataSourceUser_RewardPosition.filter(item => item.IsSelected = false);
                DataSourceUser_RewardPosition[index].IsSelected = ischecked;
            } else if (name == "chkIsActived") {
                DataSourceUser_RewardPosition[index].IsActived = ischecked;
            } else if (name == "chkIsSystem") {
                DataSourceUser_RewardPosition[index].IsSystem = ischecked;
            }
        } else if (e.target.type == 'text') {
            DataSourceUser_RewardPosition[index].Note = inputvalue;
        }

        //console.log("DataSourceUser_RewardPosition", DataSourceUser_RewardPosition);
        this.setState({ DataSourceUser_RewardPosition: DataSourceUser_RewardPosition });
    }

    onClickUser_RewardPosition() {
        if (this.state.IsAllowUpdate) {
            let data = this.state.DataSourceUser_RewardPosition;
            data[0].CreatedUser = this.props.AppInfo.LoginInfo.Username;
            data[0].LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

            //console.log("this.state.DataSourceUser_RewardPosition", this.state.DataSourceUser_RewardPosition);

            let countSelected = 0;
            countSelected = data.filter(item => item.IsSelected == true && (item.RewardPositionID === 1 || item.RewardPositionID === 5)).length;
            if (countSelected > 1) {
                this.addNotification("Vị trí thưởng nhân viên và cộng tác viên chỉ được phép chọn 1.", true);
            } else {
                this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                });
            }



        } else {
            this.addNotification("Bạn không có quyền cập nhật", true);
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

    getDataForExport() {
        this.props.callFetchAPI(APIHostName, GetAllAPIPath, null).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.UserName,
                        "Tên nhân viên": item.FullName,
                        "Mã vị trí thưởng": item.RewardPositionID,
                        "Tên vị trí thưởng": item.RewardPositionName,
                        "Loại nhân viên": item.StaffTypeName
                    };
                    return element;

                })

                this.setState({
                    DataExport: exelData
                });
            }
        });
    }



    handleExportCSV() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        if (!this.state.IsAllowExport) {
            result = {
                IsError: true,
                Message: "Bạn không có quyền xuất file exel!"
            };
        }
        else if (this.state.DataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(this.state.DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, "Danh sách vị trí thưởng của nhân viên" + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        //this.props.onExportFile(result);
        this.addNotification(result.Message, result.IsError);

    }

    //import exel file 
    handleExportFileTemplate() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;

        try {
            const ws = XLSX.utils.json_to_sheet(DataTemplateExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Danh sách vị trí thưởng của 1 nhân viên" + fileExtension);
            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        } catch (error) {
            result = {
                IsError: true,
                Message: "Lỗi xuất file!"
            }
        } finally {
            this.addNotification(result.Message, result.IsError);
        }
    }

    handleImportFile() {
        const input = document.getElementById('buttonImportFile');
        input.click();

        let count = 0;
        //const schema = this.props.SchemaData;
       
        input.addEventListener('change', () => {
            readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
                if(count > 0){
                    return;
                }
                this.onHandleImportFile(rows, errors);
                count ++;
                
            }, function (error) {
                alert("File vừa chọn lỗi. Vui lòng chọn file khác.")
            });

            setTimeout(() => {
                input.value = '';
            }, 1000);

            
            
        });
    }


    onHandleImportFile(resultRows, errors) {
        const CreatedUser = this.props.AppInfo.LoginInfo.Username;
        const LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        const importData = resultRows.map(item => {
            const { UserName, RewardPositionID, IsSystem } = item
            return {
                ...item,
                CreatedUser,
                LoginLogID
                //ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                //WardFullName: `${WardID} - ${WardName}`
            }
        })


        //console.log("data", importData);

        let _isError = false;
        importData.map((itemObject, index) => {
            if (!itemObject.UserName && _isError == false) {
                this.addNotification("Vui lòng chọn người dùng.", true);
                _isError = true;
            } else if (!itemObject.RewardPositionID && _isError == false) {
                this.addNotification("Vui lòng chọn mã vị trí thưởng.", true);
                _isError = true;
            }
        });

        if (_isError) {
            return;
        }


        this.props.callFetchAPI(APIHostName, AddByFileAPIPath, importData).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            // if (!apiResult.IsError) {
            //     this.callSearchData(this.state.SearchData);
            // }

            this.addNotification(apiResult.Message, apiResult.IsError);

        });



    }

    render() {
        if (this.state.IsAllowView) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-lg-12 page-detail">
                        <div className="card">
                            <div className="card-title">
                                <h4 className="title">Vị trí thưởng của một nhân viên</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <MultiSelectComboBox
                                                    name="User"
                                                    colspan={7}
                                                    labelcolspan={4}
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
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {this.state.FullName ?
                                                    <div>
                                                        <label className="col-form-label">Tên nhân viên:</label> &nbsp; &nbsp;
                                                        <b style={{ color: "blue" }}>{this.state.FullName}</b>
                                                    </div>
                                                    : ""
                                                }

                                            </div>
                                            {
                                                this.state.DataSourceUser_RewardPosition.length > 0 && this.state.DataSourceUser_RewardPosition[0].UpdatedDate ?
                                                    <div style={{ position: "absolute", display: "inherit", left: "39%" }}>
                                                        <div>
                                                            <div>
                                                                <label className="col-form-label">Ngày cập nhật:</label> &nbsp; &nbsp;
                                                                <span>{formatDate(this.state.DataSourceUser_RewardPosition[0].UpdatedDate)}</span>
                                                            </div>
                                                        </div>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <div>
                                                            <div>
                                                                <label className="col-form-label">Người cập nhật:</label> &nbsp; &nbsp;
                                                                <span>{this.state.DataSourceUser_RewardPosition[0].UpdatedUserFullName}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    : ""

                                            }


                                        </div>
                                    </div>
                                    {/* <div className="col-md-2">
                                        <button type="button" class="btn btn-primary" style={{ position: "absolute", bottom: "-47px", right: "16px", zIndex: "1" }} onClick={this.handleExportCSV}>Xuất exel</button>
                                    </div> */}


                                    <div className="col-md-1">
                                        <div className="btn-toolbar" style={{ position: "absolute", bottom: "-47px", right: "16px", zIndex: "1" }}>
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.handleExportCSV}>
                                                    <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                                </button>

                                                {/* import file exel */}
                                                <button type="button" className="btn btn-export ml-10" onClick={this.handleExportFileTemplate.bind(this)}>
                                                    <span className="fa fa-exchange">Xuất file mẫu</span>
                                                </button>
                                                <button type="button" className="btn btn-export  ml-10" onClick={this.handleImportFile.bind(this)} >
                                                    <span className="fa fa-exchange"> Import File </span>
                                                </button>
                                                < input type="file" id="buttonImportFile" style={{ display: "none" }} ref={input => this.inputElement = input} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="title">Danh sách vị trí thưởng</h3>
                                    </div>
                                    <div className="col-md-12">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Chọn</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã vị trí thưởng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Tên vị trí thưởng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Loại nhân viên</th>
                                                    {/* <th className="jsgrid-header-cell" style={{ width: "15%" }}>Cấp bậc kỹ năng</th> */}
                                                    {/* <th className="jsgrid-header-cell" style={{ width: "25%" }}>Mô tả</th> */}
                                                    {/* <th className="jsgrid-header-cell" style={{ width: "10%" }}>Kích hoạt</th> */}
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Hệ thống</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.DataSourceUser_RewardPosition && this.state.DataSourceUser_RewardPosition.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.RewardPositionID}
                                                                            name={`chkAdd-${index}`}
                                                                            checked={item.IsSelected} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{item.RewardPositionID}</td>
                                                            <td>{item.RewardPositionName}</td>
                                                            <td>{item.StaffTypeName}</td>
                                                            {/* <td>
                                                                <select className="form-control form-control-sm" name={`txtSkillRank-${index}`} onChange={this.handleInputChange} value={item.User_RewardPositionRankID}>
                                                                    <option value="-1" key={0}>--Vui lòng chọn--</option>
                                                                    {this.getDataCombobox(item.SkillID)}
                                                                </select>
                                                            </td> */}
                                                            {/* <td>
                                                                <input type="text" name={`txtNote-${index}`} className="form-control form-control-sm" placeholder="" onChange={this.handleInputChange} value={item.Note} />
                                                            </td> */}
                                                            {/* <td>
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


                                                            </td> */}
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
                                                this.state.Username != "" ? <button type="button" className="btn btn-info" onClick={this.onClickUser_RewardPosition} data-provide="tooltip" data-original-title="Thêm">
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
                <div className="col-md-12 message-detail">
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
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }

    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
