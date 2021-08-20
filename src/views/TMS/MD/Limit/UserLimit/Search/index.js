import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
//import SearchForm from "../../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    DataGridColumnList, AddNewAPIPath,
    AddLink,
    APIHostName,
    SearchUserLimitAPIPath,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParamsNew,
    PagePath,
    SearchMLObjectDefinitionNew,
    SearchElementListNew,
    DefaultMaxLimitCoil, DefaultMaxLimitAmount,
    GetAllUserLimitAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { LIMITTYPE_VIEW, LIMITTYPE_DELETE } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { numberDecimalWithComma } from '../../../../../../utils/function';
import { ERPCOMMONCACHE_LIMITTYPE, ERPCOMMONCACHE_USER_LIMIT } from "../../../../../../constants/keyCache";
import { formatDate, formatMonthDate } from "../../../../../../common/library/CommonLib.js";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.getTableHeader = this.getTableHeader.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.initGridDataSource = this.initGridDataSource.bind(this);
        this.initArrInputError = this.initArrInputError.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.getDataForExport = this.getDataForExport.bind(this);

        this.state = {
            gridDataSource: [],
            SearchData: InitSearchParamsNew,
            cssNotification: "",
            iconNotification: "",
            listColumn: [],
            arrInputError: [],
            isErrorValidate: false,
            DataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getDataForExport();
    }

    getDataForExport() {
        this.props.callFetchAPI(APIHostName, GetAllUserLimitAPIPath, null).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.UserName,
                        "Tên nhân viên": item.FullName,
                        "Mã loại giới hạn": item.LimitTypeID,
                        "Tên loại giới hạn": item.LimitTypeName,
                        "Giá trị giới hạn": item.LimitValue,
                        "Ngày cập nhật": formatDate(item.UpdatedDate),
                        "Người cập nhật": item.UpdatedUserFullName
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
        // if (!this.state.IsAllowExport) {
        //     result = {
        //         IsError: true,
        //         Message: "Bạn không có quyền xuất file exel!"
        //     };
        // }
        if (this.state.DataExport.length == 0) {
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


            FileSaver.saveAs(data, "Danh sách giới hạn theo người dùng" + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        //this.props.onExportFile(result);
        this.addNotification(result.Message, result.IsError);

    }

    handleSearchSubmit(formData, MLObject) {
        let result;

        if (MLObject.UserName != -1 && MLObject.UserName != null) {
            result = MLObject.UserName.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item.value;
            }, '');
        }
        else {
            result = ""
        }
        const postData = [
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID

            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@POSITIONID",
                SearchValue: MLObject.PositionID
            },
            {
                SearchKey: "@USERNAMELIST",
                SearchValue: result
            }
        ];
        this.setState({ SearchData: postData, });
        this.callSearchData(postData);
    }

    getTableHeader(data) {
        try {

            if (data.length > 0) {
                const { initialData } = data[0];

                const listColumn = initialData.reduce((acc, val, ind, arr) => {
                    acc.push({
                        name: val.LimitTypeName,
                        dataSource: val.LimitTypeID,
                        width: 60,
                        type: "input"
                    })

                    return acc;
                }, [
                    { name: "Nhân viên", dataSource: "UserName", width: 80, type: "text" },
                    { name: "Tên nhân viên", dataSource: "FullName", width: 100, type: "text" },
                    { name: "Ngày cập nhật", dataSource: "UpdatedDate", width: 100, type: "text" },
                    { name: "Ngưởi cập nhật", dataSource: "UpdatedUserFullName", width: 100, type: "text" }
                ])

                return listColumn;

            } else {
                return [];
            }

        } catch (error) {
            return [];
        }
    }

    initGridDataSource(data) {
        const groupData = data.reduce((acc, val, ind, arr) => {
            // console.log("acc", acc, val, ind, arr)
            const tempItemAcc = acc.findIndex(item => item.UserName == val.UserName);
            const objDataLimit = {
                LimitValue: val.LimitValue,
                IsAllowdecimalLimitValue: val.IsAllowdecimalLimitValue,
                IsCheckRangeLimitValue: val.IsCheckRangeLimitValue,
                MaxLimitValue: val.MaxLimitValue,
                MinLimitValue: val.MinLimitValue,
                IsRegister: val.IsRegister
            }

            if (tempItemAcc == -1) {
                return [
                    ...acc,
                    {
                        UserName: val.UserName,
                        FullName: val.FullName,
                        UpdatedUserFullName: val.UpdatedUserFullName,
                        UpdatedDate: formatDate(val.UpdatedDate, false),
                        [val.LimitTypeID]: objDataLimit,
                        initialData: [val]
                    }
                ];
            } else {
                acc[tempItemAcc] = {
                    ...acc[tempItemAcc],
                    [val.LimitTypeID]: objDataLimit,
                    initialData: [...acc[tempItemAcc].initialData, val]
                }

                return acc;
            }

        }, []);

        return groupData;
    }

    initArrInputError(data) {
        const groupData = data.reduce((acc, val, ind, arr) => {

            const tempItemAcc = acc.findIndex(item => item.UserName == val.UserName);

            if (tempItemAcc == -1) {
                return [
                    ...acc,
                    {
                        UserName: val.UserName,
                        FullName: val.FullName,
                        [val.LimitTypeID]: {
                            isError: false,
                            status: ""
                        },

                    }
                ];
            } else {
                acc[tempItemAcc] = {
                    ...acc[tempItemAcc],
                    [val.LimitTypeID]: {
                        isError: false,
                        status: ""
                    },
                }

                return acc;
            }

        }, []);

        return groupData;
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchUserLimitAPIPath, searchData).then(apiResult => {
            // console.log("data", apiResult, searchData)
            const groupData = this.initGridDataSource(apiResult.ResultObject);
            const initInputError = this.initArrInputError(apiResult.ResultObject);
            const listColumn = this.getTableHeader(groupData);


            let exelData = [];
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.UserName,
                        "Tên nhân viên": item.FullName,
                        "Mã loại giới hạn": item.LimitTypeID,
                        "Tên loại giới hạn": item.LimitTypeName,
                        "Giá trị giới hạn": item.LimitValue,
                        "Ngày cập nhật": formatDate(item.UpdatedDate),
                        "Người cập nhật": item.UpdatedUserFullName
                    };
                    return element;

                })
            }

            this.setState({
                listColumn: listColumn,
                gridDataSource: groupData,
                arrInputError: initInputError,
                DataExport: exelData
            });

        });
    }

    handleCloseMessage() {

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

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
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



    handleSubmit() {
        const { gridDataSource } = this.state;

        const dataSubmit = gridDataSource.reduce((acc, val) => {
            const { initialData } = val;

            const updateInitData = initialData.reduce((acc1, val1) => {
                acc1.push({
                    ...val1,
                    LimitValue: parseFloat(val[val1.LimitTypeID].LimitValue),
                    IsRegister: val[val1.LimitTypeID].IsRegister
                })

                return acc1;
            }, [])

            return [...acc, ...updateInitData];

        }, [])

        this.props.callFetchAPI(APIHostName, AddNewAPIPath, dataSubmit).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(ERPCOMMONCACHE_USER_LIMIT)
            }
        });


    }


    handleChange(e, param1, param2, dataInput) {
        const cloneGridDataSource = [...this.state.gridDataSource];
        const cloneArrInputError = [...this.state.arrInputError];
        const { IsAllowdecimalLimitValue, IsCheckRangeLimitValue, LimitValue, MaxLimitValue, MinLimitValue } = dataInput;
        const pattern = param2 == 1
            ? /^\d+$/igm // check so nguyen
            : /(^[+]?[0-9]+\.[0-9]+$|^\d+$)/igm // check so thap phan hoac so nguyen

        let flagError = false;
        let valueInput = e.target.value;


        switch (param2) {
            case 1:
                const arr = valueInput.split(",");
                valueInput = arr.join('');
                break;

            default:
                break;
        }

        cloneGridDataSource[param1][param2].LimitValue = valueInput;


        // begin validate
        if (pattern.test(valueInput)) {
            cloneArrInputError[param1][param2] = {
                isError: false,
                status: ""
            }

        } else {
            cloneArrInputError[param1][param2] = {
                isError: true,
                status: "Vui lòng nhập số"
            }
            flagError = true;
        }

        if (flagError) {
            this.setState({
                gridDataSource: cloneGridDataSource,
                isErrorValidate: true
            })
            return;
        }


        if (IsAllowdecimalLimitValue) {

        } else {
            if (/^\d+$/igm.test(valueInput)) {
                cloneArrInputError[param1][param2] = {
                    isError: false,
                    status: ""
                }
            } else {
                cloneArrInputError[param1][param2] = {
                    isError: true,
                    status: "Vui lòng nhập số nguyên"
                }
                flagError = true;
            }
        }

        if (flagError) {
            this.setState({
                gridDataSource: cloneGridDataSource,
                isErrorValidate: true
            })
            return;
        }


        if (IsCheckRangeLimitValue) {

            if (parseFloat(valueInput) >= MinLimitValue && parseFloat(valueInput) <= MaxLimitValue) {
                cloneArrInputError[param1][param2] = {
                    isError: false,
                    status: ""
                }
            } else {
                cloneArrInputError[param1][param2] = {
                    isError: true,
                    status: `Vượt quá số lượng hạn mức (<=${numberDecimalWithComma(MaxLimitValue)})`
                }
                flagError = true;
            }

        } else {

            switch (param2) {
                case 1:
                    if (parseFloat(valueInput) >= 0 && parseFloat(valueInput) <= DefaultMaxLimitAmount) {

                        cloneArrInputError[param1][param2] = {
                            isError: false,
                            status: ""
                        }
                    } else {

                        cloneArrInputError[param1][param2] = {
                            isError: true,
                            status: `Vượt quá số lượng hạn mức (<=${numberDecimalWithComma(DefaultMaxLimitAmount)})`
                        }
                        flagError = true;
                    }
                    break;

                default:
                    if (parseFloat(valueInput) >= 0 && parseFloat(valueInput) <= DefaultMaxLimitCoil) {

                        cloneArrInputError[param1][param2] = {
                            isError: false,
                            status: ""
                        }
                    } else {

                        cloneArrInputError[param1][param2] = {
                            isError: true,
                            status: `Vượt quá số lượng hạn mức (<=${DefaultMaxLimitCoil})`
                        }

                        flagError = true;
                    }
                    break;
            }

        }
        // end validate

        if (flagError) {
            this.setState({
                gridDataSource: cloneGridDataSource,
                isErrorValidate: true
            })
            return;
        } else {
            cloneGridDataSource[param1][param2].IsRegister = true;

            this.setState({
                gridDataSource: cloneGridDataSource,
                isErrorValidate: false
            })
        }


    }

    render() {
        const { listColumn, gridDataSource, arrInputError, isErrorValidate } = this.state;

        // console.log("listColumn", listColumn, gridDataSource)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm danh sách giới hạn theo người dùng"
                    MLObjectDefinition={SearchMLObjectDefinitionNew}
                    listelement={SearchElementListNew}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                {/* xuất file exel */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-toolbar" style={{ position: "absolute", bottom: "-40px", right: "30px", zIndex: "1" }}>
                            <div className="btn-group btn-group-sm">
                                <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.handleExportCSV}>
                                    <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-lg-12 user-limt">
                    <br /><br />
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        {
                                            listColumn && listColumn.map((item, index) => {
                                                return (
                                                    <th key={index} className="jsgrid-header-cell" style={{ width: item.width }}>
                                                        {item.name}
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridDataSource.length > 0 && gridDataSource.map((item, index) => {
                                            // console.log("object1111", item, index)
                                            return <tr key={item.UserName}>
                                                {
                                                    listColumn.map((item1, index1) => {
                                                        // console.log("222", item1, index1)

                                                        switch (item1.type) {
                                                            case "text":
                                                                return <td key={index1}>{item[item1.dataSource]}</td>

                                                            case "input":
                                                                return <td key={index1}>
                                                                    <input type="text"
                                                                        className="form-control form-control-sm"
                                                                        value={item1.dataSource == 1
                                                                            ? numberDecimalWithComma(item[item1.dataSource].LimitValue)
                                                                            : item[item1.dataSource].LimitValue}
                                                                        onChange={(e) => this.handleChange(e, index, item1.dataSource, item[item1.dataSource])}
                                                                    />

                                                                    {
                                                                        arrInputError[index][item1.dataSource].isError
                                                                        && <span className="text-danger">{arrInputError[index][item1.dataSource].status}</span>
                                                                    }
                                                                </td>

                                                            default:
                                                                return <td key={index1}>{item[item1.dataSource]}</td>
                                                        }
                                                    })
                                                }
                                            </tr>
                                        })
                                    }
                                </tbody>

                            </table>
                            <div className="text-right">
                                <button type="button" className="btn btn-info" data-provide="tooltip" data-original-title="Cập nhật" onClick={this.handleSubmit.bind(this)} disabled={isErrorValidate}>
                                    <span className="fa fa-check-square-o"> Cập nhật</span>
                                </button>
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

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
