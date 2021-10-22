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
    AddByFileAPIPath,
    LoadAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ERPUSERCACHE_FUNCTION } from "../../../../../constants/keyCache";
import { GET_CACHE_USER_FUNCTION_LIST, USER_LIMIT_VIEW, USER_LIMIT_ADD, USERDEBTLIMIT_VIEW, USERDEBTLIMIT_ADD } from "../../../../../constants/functionLists";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'
import { formatDate } from "../../../../../common/library/CommonLib";
import { numberDecimalWithComma } from "../../../../../utils/function";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataCombobox = this.getDataCombobox.bind(this);
        this.onClickUserDebtLimit = this.onClickUserDebtLimit.bind(this);
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
        //this.getDataForExport();
    }

    checkAddPermission() {
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _view = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_LIMIT_VIEW);
                if (_view && _view.length > 0) {
                    this.setState({ IsAllowView: true });
                }

                let _update = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_LIMIT_ADD);
                if (_update && _update.length > 0) {
                    this.setState({ IsAllowUpdate: true });
                }

                let _export = result.ResultObject.CacheData.filter(x => x.FunctionID == USER_LIMIT_VIEW);
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
                // const postData = [
                //     {
                //         SearchKey: "@USERNAME",
                //         SearchValue: objUser.value
                //     }
                // ];
                this.callLoadData(objUser.value);
                //this.callLoadDataSkill(postData)
            }
        }
    }


    callLoadData(postData) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, postData).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError) {
                let dataResult = apiResult.ResultObject;
                if (dataResult.length == 0) {
                    dataResult = [
                        { UserName: postData, CarrierTypeID: 1, LimitValue: 0 },
                        { UserName: postData, CarrierTypeID: 2, LimitValue: 0 }
                    ]
                    document.getElementsByName("xemay")[0].value = 0;
                    document.getElementsByName("xetai")[0].value = 0;
                } else {
                    let xemayvalue = dataResult.filter(x => x.CarrierTypeID == 1)[0].LimitValue;
                    let xetaivalue = dataResult.filter(x => x.CarrierTypeID == 2)[0].LimitValue;
                    document.getElementsByName("xemay")[0].value = numberDecimalWithComma(xemayvalue);
                    document.getElementsByName("xetai")[0].value = numberDecimalWithComma(xetaivalue);
                }

                this.setState({
                    DataSource: dataResult
                });
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
        let name = e.target.name;
        // let name = e.target.name.split("-")[0];
        // let index = e.target.name.split("-")[1];
        let { DataSource } = this.state;

        inputvalue = parseFloat(inputvalue.replace(/,/g, ''));
        if (name == "xemay") {
            let xemay = { UserName: this.state.Username, CarrierTypeID: 1, LimitValue: inputvalue };
            const index = DataSource.findIndex(item => item.CarrierTypeID == 1);
            if (index >= 0) {
                DataSource.splice(index, 1);
            }
            DataSource.push(xemay);
        } else if (name == "xetai") {
            let xetai = { UserName: this.state.Username, CarrierTypeID: 2, LimitValue: inputvalue };
            const index = DataSource.findIndex(item => item.CarrierTypeID == 2);
            if (index >= 0) {
                DataSource.splice(index, 1);
            }
            DataSource.push(xetai);
        }

        if (name == "xemay" || name == "xetai") {
            document.getElementsByName(name)[0].value = numberDecimalWithComma(inputvalue);

        }

        // if (e.target.type.toString().indexOf("select") !== -1) {
        //     DataSourceUser_RewardPosition[index].User_RewardPositionRankID = inputvalue;
        // } else if (e.target.type == 'checkbox') {
        //     let ischecked = e.target.checked;
        //     if (name == "chkAdd") {
        //         //DataSourceUser_RewardPosition.filter(item => item.IsSelected = false);
        //         DataSourceUser_RewardPosition[index].IsSelected = ischecked;
        //     } else if (name == "chkIsActived") {
        //         DataSourceUser_RewardPosition[index].IsActived = ischecked;
        //     } else if (name == "chkIsSystem") {
        //         DataSourceUser_RewardPosition[index].IsSystem = ischecked;
        //     }
        // } else if (e.target.type == 'text') {
        //     DataSourceUser_RewardPosition[index].Note = inputvalue;
        // }

        //console.log("DataSourceUser_RewardPosition", DataSourceUser_RewardPosition);
        this.setState({ DataSource });
    }

    checkValidData(data) {
        let isError = false;
        if (!this.state.Username) {
            this.addNotification("Vui lòng chọn nhân viên", true);
            isError = true;
        }
        data.map((item) => {
            if (isNaN(item.LimitValue)) {
                this.addNotification("Vui lòng nhập số", true);
                isError = true;
            }
            else if (item.LimitValue < 0) {
                this.addNotification("Vui lòng nhập số dương", true);
                isError = true;
            }
            else if (item.CarrierTypeID == 1) {
                if (item.LimitValue > 50000000) {
                    this.addNotification("Hạn mức xe máy tối đa 50.000.000đ", true);
                    isError = true;
                }
            }
            else if (item.CarrierTypeID == 2) {
                if (item.LimitValue > 100000000) {
                    this.addNotification("Hạn mức xe tải tối đa 100.000.000đ", true);
                    isError = true;
                }
            }
        });
        return isError;
    }

    onClickUserDebtLimit() {
        if (this.state.IsAllowUpdate) {
            let data = this.state.DataSource;
            if (data.length > 0) {
                data[0].CreatedUser = this.props.AppInfo.LoginInfo.Username;
                data[0].LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            } else {
                return;
            }



            if (this.checkValidData(data)) {
                return;
            }

            const confir = confirm("Nếu có phát sinh rủi ro thất thoát công nợ Trưởng Phòng chịu trách nhiệm hoàn tiền Công ty theo quy định.");
            if (confir == 1) {
                this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                });
            }

            //console.log("this.state.DataSource", this.state.DataSource);



            // let countSelected = 0;
            // countSelected = data.filter(item => item.IsSelected == true && (item.RewardPositionID === 1 || item.RewardPositionID === 5)).length;
            // if (countSelected > 1) {
            //     this.addNotification("Vị trí thưởng nhân viên và cộng tác viên chỉ được phép chọn 1.", true);
            // } else {
            //     this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            //         this.addNotification(apiResult.Message, apiResult.IsError);
            //     });
            // }



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
                if (count > 0) {
                    return;
                }
                this.onHandleImportFile(rows, errors);
                count++;

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
                                <h4 className="title">Hạn mức công nợ theo nhân viên</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <MultiSelectComboBox
                                                    name="User"
                                                    colspan={6}
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
                                                    isCheckPartner={true}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            {/* <div className="col-md-6">
                                                {this.state.FullName ?
                                                    <div>
                                                        <label className="col-form-label">Tên nhân viên:</label> &nbsp; &nbsp;
                                                        <b style={{ color: "blue" }}>{this.state.FullName}</b>
                                                    </div>
                                                    : ""
                                                }

                                            </div> */}
                                            {
                                                this.state.DataSource.length > 0 && this.state.DataSource[0].UpdatedDate ?
                                                    <div style={{ position: "absolute", display: "inherit", left: "36%" }}>
                                                        <div>
                                                            <div>
                                                                <label className="col-form-label">Ngày cập nhật:</label> &nbsp; &nbsp;
                                                                <span>{formatDate(this.state.DataSource[0].UpdatedDate)}</span>
                                                            </div>
                                                        </div>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <div>
                                                            <div>
                                                                <label className="col-form-label">Người cập nhật:</label> &nbsp; &nbsp;
                                                                <span>{this.state.DataSource[0].UpdatedUserFullName}</span>
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


                                    {/* exel */}
                                    {/* <div className="col-md-1">
                                        <div className="btn-toolbar" style={{ position: "absolute", bottom: "-47px", right: "16px", zIndex: "1" }}>
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.handleExportCSV}>
                                                    <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                                </button>

                                                import file exel
                                                <button type="button" className="btn btn-export ml-10" onClick={this.handleExportFileTemplate.bind(this)}>
                                                    <span className="fa fa-exchange">Xuất file mẫu</span>
                                                </button>
                                                <button type="button" className="btn btn-export  ml-10" onClick={this.handleImportFile.bind(this)} >
                                                    <span className="fa fa-exchange"> Import File </span>
                                                </button>
                                                < input type="file" id="buttonImportFile" style={{ display: "none" }} ref={input => this.inputElement = input} />
                                            </div>
                                        </div>
                                    </div> */}

                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label className="col-form-label 11">Hạn mức xe máy</label>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <input className="form-control form-control-sm" name="xemay" type="text" placeholder="" maxlength="20" onChange={this.handleInputChange} />
                                        <div className="invalid-feedback"><ul className="list-unstyled"><li></li></ul></div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <span className="text-danger">* tăng tối đa 50.000.000đ</span>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label className="col-form-label 11">Hạn mức xe tải</label>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <input className="form-control form-control-sm" name="xetai" type="text" placeholder="" maxlength="20" onChange={this.handleInputChange} />
                                        <div className="invalid-feedback"><ul className="list-unstyled"><li></li></ul></div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <span className="text-danger">* tăng tối đa 100.000.000đ</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-2"></div>
                                    <div className="form-group col-md-3">
                                        <button type="button" className="btn btn-info" onClick={this.onClickUserDebtLimit} data-provide="tooltip" data-original-title="Thêm">
                                            <span className="fa fa-plus ff">Cập nhật</span>
                                        </button>
                                    </div>
                                </div>

                                <br />
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
