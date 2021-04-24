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
    DefaultMaxLimitCoil, DefaultMaxLimitAmount
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { LIMITTYPE_VIEW, LIMITTYPE_DELETE } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { formatMoney, numberWithComma } from '../../../../../../utils/function';
import { ERPCOMMONCACHE_LIMITTYPE } from "../../../../../../constants/keyCache";

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

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            SearchData: InitSearchParamsNew,
            cssNotification: "",
            iconNotification: "",
            listColumn: [],
            arrInputError: [],
            isErrorValidate: false
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(PagePath);
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
                    { name: "Mã nhân viên", dataSource: "UserName", width: 100, type: "text" },
                    { name: "Tên nhân viên", dataSource: "FullName", width: 100, type: "text" }
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

            const tempItemAcc = acc.findIndex(item => item.UserName == val.UserName);

            const objDataLimit = {
                LimitValue: val.LimitValue,
                IsAllowdecimalLimitValue: val.IsAllowdecimalLimitValue,
                IsCheckRangeLimitValue: val.IsCheckRangeLimitValue,
                MaxLimitValue: val.MaxLimitValue,
                MinLimitValue: val.MinLimitValue
            }

            if (tempItemAcc == -1) {
                return [
                    ...acc,
                    {
                        UserName: val.UserName,
                        FullName: val.FullName,
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

            const groupData = this.initGridDataSource(apiResult.ResultObject);
            const initInputError = this.initArrInputError(apiResult.ResultObject);
            const listColumn = this.getTableHeader(groupData);

            this.setState({
                listColumn: listColumn,
                gridDataSource: groupData,
                arrInputError: initInputError
            })

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

    handleSubmit() {
        const { gridDataSource } = this.state;

        const dataSubmit = gridDataSource.reduce((acc, val) => {
            const { initialData } = val;

            const updateInitData = initialData.reduce((acc1, val1) => {
                acc1.push({
                    ...val1,
                    LimitValue: parseFloat(val[val1.LimitTypeID].LimitValue)
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
                this.callSearchData(this.state.SearchData)
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
                cloneGridDataSource[param1][param2].LimitValue = valueInput;
                break;

            default:
                cloneGridDataSource[param1][param2].LimitValue = valueInput;
                break;
        }

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
                    status: `Vượt quá số lượng hạn mức (<=${numberWithComma(MaxLimitValue)})`
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
                            status: `Vượt quá số lượng hạn mức (<=${numberWithComma(DefaultMaxLimitAmount)})`
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
            this.setState({
                gridDataSource: cloneGridDataSource,
                isErrorValidate: false
            })
        }


    }

    render() {
        const { listColumn, gridDataSource, arrInputError, isErrorValidate } = this.state;

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

                <div className="col-lg-12 user-limt">
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
                                            return <tr key={item.UserName}>
                                                {
                                                    listColumn.map((item1, index1) => {
                                                        switch (item1.type) {
                                                            case "text":
                                                                return <td key={index1}>{item[item1.dataSource]}</td>

                                                            case "input":
                                                                return <td key={index1}>
                                                                    <input type="text"
                                                                        className="form-control form-control-sm"
                                                                        value={item1.dataSource == 1
                                                                            ? numberWithComma(item[item1.dataSource].LimitValue)
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
