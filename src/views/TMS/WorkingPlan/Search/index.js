import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
// import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import { formatDate } from "../../../../common/library/CommonLib.js";

import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    InitSearchParams,
    PagePath,
    UpdateDeleteAPIPath,
    UpdateWorkingPlanByUserAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { WORKINGPLAN_VIEW, WORKINGPLAN_DELETE } from "../../../../constants/functionLists";
import { ERPCOMMONCACHE_WORKINGSHIFT } from "../../../../constants/keyCache";


import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.getCacheWorkingShift = this.getCacheWorkingShift.bind(this);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            dataSourceItem: {},
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            PageNumber: 1,
            WorkingShiftNumber: "",
            IsLoadDataComplete: false,
            dataWorkingShift: [],
            IsShiftNumberOne: false,
            IsShiftNumberTwo: false,
            IsShiftNumberThree: false,
            data: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
        //  this.callDataTest()
        this.getCacheWorkingShift()
    }

    callDataTest() {
        const APIParams = {
            "FromDate": "",
            "ToDate": "",
        };
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/LoadByUser', APIParams).then(apiResult => {
            console.log("callDataTest", apiResult)
        })
    }

    getCacheWorkingShift() {
        this.props.callGetCache(ERPCOMMONCACHE_WORKINGSHIFT).then((result) => {

            if (!result.IsError) {
                this.setState({
                    dataWorkingShift: result.ResultObject.CacheData
                })
            }
            else {
                this.showMessage(result.Message)
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@WORKINGDATE",
                SearchValue: MLObject.WorkingDate
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.ServiceTypeID
            },

        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("callSearchData", apiResult.ResultObject);

            if (!apiResult.IsError) {
                // const result = apiResult.ResultObject.map((item, index) => {

                //     if (item.ShiftNumber == 1) {
                //         item.IsShiftNumberOne = true
                //     }
                //     else if (item.ShiftNumber == 2) {
                //         item.IsShiftNumberTwo = true
                //     }
                //     else if (item.ShiftNumber == 3) {
                //         item.IsShiftNumberThree = true
                //     }
                //     else {
                //         item.IsShiftNumberOne = false;
                //         item.IsShiftNumberTwo = false;
                //         item.IsShiftNumberThree = false;
                //     }

                //     return item;

                // })


                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
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

    handleShiftNumberTwoInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        let { gridDataSource, dataSourceItem } = this.state;

        if (ischecked) {
            gridDataSource[index].IsShiftNumberTwo = ischecked;
            gridDataSource[index].WorkingShiftNumber = 2;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickUpdateWorkingPlan(gridDataSource[index]);
        }
        else {
            gridDataSource[index].IsShiftNumberOne = ischecked;
            gridDataSource[index].WorkingShiftNumber = 2;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickDeleteWorkingPlan(gridDataSource[index]);
        }
    }

    handleShiftNumberOneInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        let { gridDataSource } = this.state;

        if (ischecked) {
            gridDataSource[index].IsShiftNumberOne = ischecked;
            gridDataSource[index].WorkingShiftNumber = 1;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickUpdateWorkingPlan(gridDataSource[index]);
        }
        else {
            gridDataSource[index].IsShiftNumberOne = ischecked;
            gridDataSource[index].WorkingShiftNumber = 1;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickDeleteWorkingPlan(gridDataSource[index]);
        }

    }

    handleShiftNumberThreeInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        let { gridDataSource } = this.state

        if (ischecked) {
            gridDataSource[index].IsShiftNumberThree = ischecked;
            gridDataSource[index].WorkingShiftNumber = 3;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickUpdateWorkingPlan(gridDataSource[index]);
        }
        else {
            gridDataSource[index].IsShiftNumberOne = ischecked;
            gridDataSource[index].WorkingShiftNumber = 3;
            this.setState({ gridDataSource: gridDataSource });
            this.onClickDeleteWorkingPlan(gridDataSource[index]);
        }
    }

    onClickDeleteWorkingPlan(objWorkingPlan) {
        debugger
        objWorkingPlan.DELETEDUSER = this.props.AppInfo.LoginInfo.Username;
        this.props.callFetchAPI(APIHostName, UpdateDeleteAPIPath, objWorkingPlan).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData(this.state.SearchData);

        });
    }

    onClickUpdateWorkingPlan(objWorkingPlan, WorkingShiftNumber) {
        objWorkingPlan[0].LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        objWorkingPlan[0].CreatedUser = this.props.AppInfo.LoginInfo.Username;
        objWorkingPlan[0].UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        objWorkingPlan[0].WorkingShiftID = WorkingShiftNumber;

        this.props.callFetchAPI(APIHostName, UpdateWorkingPlanByUserAPIPath, objWorkingPlan[0]).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData(this.state.SearchData);
        });
    }

    checkShift(index, value) {
        const found = this.state.gridDataSource[index].find(n => n.ShiftNumber == value);

        if (found == undefined || found == "undefined") {
            return false;
        }
        else {

            return true;
        }

    }

    handleShiftNumberInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        const dataFind = this.state.gridDataSource[index].find(n => {
            return n.ShiftNumber == inputvalue
        });

        if (ischecked) {
            this.onClickUpdateWorkingPlan(this.state.gridDataSource[index], inputvalue);
        }
        else {
            this.onClickDeleteWorkingPlan(dataFind)
        }


    }

    render() {
        // console.log("this.state", this.state);
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm danh sách ca làm việc"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <div className="col-lg-12 workingplan">
                    <div className="card">

                        <div className="card-body">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Ngày làm việc</th>
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Mã nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150 }}>Tên nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250 }}>Kho làm việc</th>
                                        {
                                            this.state.dataWorkingShift && this.state.dataWorkingShift.map((item, index) => {
                                                return (
                                                    <th key={index} className="jsgrid-header-cell" style={{ width: 100 }}>{item.WorkingShiftName}</th>
                                                )
                                            })
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.gridDataSource && this.state.gridDataSource.map((item, index) => {
                                        console.log("item", item);

                                        return (
                                            <tr key={index}>
                                                <td>{formatDate(item[0].WorkingDate, true)}</td>
                                                <td>{item[0].UserName}</td>
                                                <td>{item[0].FullName}</td>
                                                <td>{item[0].StoreName}</td>
                                                {
                                                    this.state.dataWorkingShift && this.state.dataWorkingShift.map((item1, index1) => {
                                                        return (
                                                            <td key={index1}>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleShiftNumberInputChange.bind(this)} value={item1.WorkingShiftID}
                                                                            name={index}
                                                                            checked={this.checkShift(index, item1.WorkingShiftID)} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        )
                                                    })
                                                }

                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>
                            {/* <div className="text-right">
                                <button type="button" className="btn btn-info" data-provide="tooltip" data-original-title="Cập nhật" onClick={this.onClickUpdateWorkingPlan.bind(this)}>
                                    <span className="fa fa-check-square-o"> Cập nhật</span>
                                </button>
                            </div> */}
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
