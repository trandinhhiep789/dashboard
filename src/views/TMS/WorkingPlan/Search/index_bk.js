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
    UpdateWorkingPlanByUserAPIPath,
    InitSearchParamsNew,
    UpdateWorkingPlanWebAPIPath
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
            gridData: [],
            DataSourceSubmit: [],
            dataSourceItem: {},
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            SearchDataWeb: InitSearchParamsNew,
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
        //this.callSearchData(this.state.SearchData);
        this.callDataTestWeb(this.state.SearchDataWeb);
        this.props.updatePagePath(PagePath);
        //this.callDataTest()
        this.callDataTestWeb();
        this.getCacheWorkingShift()
    }



    callDataTest() {
        const APIParams = {
            "FromDate": "2020-07-06 00:00",
            "ToDate": "2020-07-12 00:00",
        };
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/LoadByUser', APIParams).then(apiResult => {
            console.log("callDataTest", apiResult)
        })
    }

    callDataTestWeb(searchData) {
        const InitSearchParams = [{
            SearchKey: "@STOREID",
            SearchValue: 6373
        },
        {
            SearchKey: "@WORKINGDATE",
            SearchValue: new Date()
        },
        {
            SearchKey: "@USERNAME",
            SearchValue: ""
        },
        ]
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/SearchWeb', searchData).then(apiResult => {

            console.log("apiResult", apiResult)


            // console.log("dataSource", dataSource)
            // console.log("gridData", gridData)


            if (!apiResult.IsError) {

                const dataSource = apiResult.ResultObject.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.UserName]) catsSoFar[item.UserName] = [];
                    catsSoFar[item.UserName].push(item);
                    return catsSoFar;
                }, {});

                let init = []
                let userName = '';
                const gridData = apiResult.ResultObject.sort((a, b) => (a.UserName >= b.UserName) ? 1 : -1)

                gridData.map((e, i) => {
                    if (init.length <= 0) {
                        init.push(e)
                        userName = e.UserName
                    }
                    else {
                        if (userName != e.UserName) {
                            init.push(e)
                            userName = e.UserName
                        }
                    }
                })

                console.log("11", gridData, dataSource)
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    gridData: init,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
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
            {
                SearchKey: "@USERNAME",
                SearchValue: ""
            },

        ];
        this.setState({ SearchData: postData });
        this.callDataTestWeb(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("callSearchData", apiResult.ResultObject);

            if (!apiResult.IsError) {

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
            // this.callSearchData(this.state.SearchData);
            this.callDataTestWeb(this.state.SearchData);

        });
    }

    onClickUpdateWorkingPlan(objWorkingPlan, WorkingShiftNumber) {
        objWorkingPlan[0].LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        objWorkingPlan[0].CreatedUser = this.props.AppInfo.LoginInfo.Username;
        objWorkingPlan[0].UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        objWorkingPlan[0].WorkingShiftID = WorkingShiftNumber;

        this.props.callFetchAPI(APIHostName, UpdateWorkingPlanByUserAPIPath, objWorkingPlan[0]).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            // this.callSearchData(this.state.SearchData);
            this.callDataTestWeb(this.state.SearchData);
        });
    }

    onClickWorkingPlan() {

        const { gridDataSource } = this.state
        // console.log("gridDataSource", gridDataSource)
        // this.props.callFetchAPI(APIHostName, UpdateWorkingPlanWebAPIPath, gridDataSource).then(apiResult => {
        //     console.log("apiResult", apiResult)
        //     //this.addNotification(apiResult.Message, apiResult.IsError);
        //     // this.callSearchData(this.state.SearchData);
        //     //this.callDataTestWeb(this.state.SearchData);
        // });
    }

    checkShift(index, value) {
        const found = this.state.gridDataSource[index].find(n => n.ShiftNumber == value && n.IsRegister);
        if (found == undefined || found == "undefined") {
            return false;
        }
        else {

            return true;
        }
    }

    handleWorkingShiftNumberInputChange(e) {

        const { DataSourceSubmit } = this.state;
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const indexItem = e.target.name;
        const indexWorkShift = e.target.attributes['data-id'].value;
        console.log("11", indexItem, indexWorkShift, inputvalue)
        const dataFind = this.state.gridDataSource[indexItem].find(n => {
            return n.ShiftNumber == inputvalue
        });

        if (ischecked) {
            dataFind.IsRegister = ischecked
        }
        else {
            dataFind.IsRegister = ischecked
        }

        // let dataItem= DataSourceSubmit.push(dataFind);
        let Item = this.state.gridDataSource[indexItem];
        console.log("Item", Item);
        let formDatanew = []
        let formData = []

        formDatanew = Object.assign([], Item, { [indexWorkShift]: dataFind });
        formData = Object.assign([], this.state.gridDataSource, { [indexItem]: formDatanew });
        console.log("formDatanew", formDatanew);
        //console.log("formData",formData);
        // this.setState({
        //     gridDataSource: formData,
        //     DataSourceSubmit: dataItem

        // })

    }

    handleShiftNumberInputChange(e) {
        debugger
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
        console.log('this', this.state)
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
                            <div className="table1">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell" style={{ width: 100 }}>Ngày làm việc</th>
                                            <th className="jsgrid-header-cell" style={{ width: 100 }}>Mã nhân viên</th>
                                            <th className="jsgrid-header-cell" style={{ width: 150 }}>Tên nhân viên</th>
                                            <th className="jsgrid-header-cell" style={{ width: 250 }}>Kho làm việc</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.gridData && this.state.gridData.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{formatDate(item.WorkingDate, true)}</td>
                                                        <td>{item.UserName}</td>
                                                        <td>{item.FullName}</td>
                                                        <td>{item.StoreName}</td>

                                                    </tr>
                                                )
                                            })
                                        }



                                    </tbody>
                                </table>
                            </div>
                            <div className="table2">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
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
                                        <tr>
                                            {
                                                this.state.gridDataSource && this.state.gridDataSource.map((item1, index1) => {
                                                    console.log('item1', item1)
                                                    return (
                                                        <td >
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" className="form-control form-control-sm"
                                                                        onChange={this.handleWorkingShiftNumberInputChange.bind(this)}
                                                                        value={item1.ShiftNumber}
                                                                        data-id={index1}
                                                                        name={index}
                                                                    //checked={this.checkShift(index, item1.ShiftNumber)} 
                                                                    />
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

                                    </tbody>
                                </table>
                            </div>



                            <div className="text-right">
                                <button type="button" className="btn btn-info" data-provide="tooltip" data-original-title="Cập nhật" onClick={this.onClickWorkingPlan.bind(this)}>
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
