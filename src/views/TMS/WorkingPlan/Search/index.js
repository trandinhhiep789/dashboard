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
import { da } from "date-fns/locale";

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
            gridDataWorking: [],
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
        this.getCacheWorkingShift()
    }



    callDataTest() {
        const APIParams = {
            "FromDate": "2020-07-20 00:00",
            "ToDate": "2020-07-26 00:00",
            "StoreID": 4240
        };
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/LoadByUser', APIParams).then(apiResult => {
            console.log("callDataTest", apiResult)
        })
    }

    callDataTestWeb(searchData) {
        // console.log('searchData', searchData)
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/SearchWeb', searchData).then(apiResult => {
            console.log("searchData apiResult", apiResult)
            if (!apiResult.IsError) {
                const date = new Date();
                const dataResult = apiResult.ResultObject.map((item, index) => {

                    if (new Date(item.WorkingDate) > date) {
                        item.isHidden = false
                    }
                    else {
                        item.isHidden = true
                    }
                    return item;
                })

                console.log("dataResult", dataResult)

                const sortResult = dataResult.sort((a, b) => (a.UserName > b.UserName) ? 1
                    : (a.UserName === b.UserName)
                        ? (a.WorkingShiftID > b.WorkingShiftID) ? 1 : -1 : -1)
                console.log("sortResult", sortResult)
                const dataSource = sortResult.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.UserName]) catsSoFar[item.UserName] = [];
                    catsSoFar[item.UserName].push(item);
                    return catsSoFar;
                }, {});
                console.log("dataSource", dataSource)
                let init = []
                let userName = '';

                sortResult.map((e, i) => {
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

                console.log("init", init)

                this.setState({
                    gridDataSource: dataResult,
                    gridData: init,
                    gridDataWorking: dataSource,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.showMessage(apiResult.MessageDetail)
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


    onClickWorkingPlan() {
        let lstWorkingPlan = [];
        const gridDataWorking = Object.assign({}, this.state.gridDataWorking)
        Object.keys(gridDataWorking).map((key) => {
            gridDataWorking[key].map((e) => {
                lstWorkingPlan.push(e)
            })
        })
        // this.state.gridDataWorking.map((item) => {
        //     item.map((e) => {
        //         lstWorkingPlan.push(e)
        //     })
        // })

        // UpdateWorkingPlanWebAPIPath
        this.props.callFetchAPI(APIHostName, 'api/WorkingPlan/UpdateWorkingPlanWebNew', lstWorkingPlan).then(apiResult => {
            // console.log("111", apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callDataTestWeb(this.state.SearchDataWeb);
            }


        });
    }

    handleChangeWorkingShift(e) {

        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        const userItem = e.target.attributes['data-user'].value;


        const dataFind = this.state.gridDataWorking[userItem].find(n => {
            return n.ShiftNumber == inputvalue && n.UserName == userItem
        });
        if (ischecked) {
            dataFind.IsRegister = ischecked
        }
        else {
            dataFind.IsRegister = ischecked
        }

        let Item = this.state.gridDataWorking[userItem];
        let formDatanew = []
        let formData = []
        formDatanew = Object.assign([], Item, { [index]: dataFind });
        formData = Object.assign([], this.state.gridDataWorking, { [userItem]: formDatanew });

        this.setState({
            gridDataWorking: formData
        })


    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@WORKINGDATE",
                SearchValue: MLObject.WorkingDate
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@USERNAME",
                SearchValue: ""
            },

        ];
        this.setState({ SearchData: postData, SearchDataWeb: postData });
        this.callDataTestWeb(postData);
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callDataTestWeb(this.state.SearchData);
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



    render() {
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

                                    {
                                        this.state.gridData && this.state.gridData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{formatDate(item.WorkingDate, true)}</td>
                                                    <td>{item.UserName}</td>
                                                    <td>{item.FullName}</td>
                                                    <td>{item.StoreName}</td>


                                                    {
                                                        this.state.gridDataWorking && this.state.gridDataWorking[item.UserName].map((item1, index1) => {
                                                            return (
                                                                <td key={index1}>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" className="form-control form-control-sm"
                                                                                onChange={this.handleChangeWorkingShift.bind(this)}
                                                                                value={item1.ShiftNumber}
                                                                                name={index1}
                                                                                data-index={index}
                                                                                data-user={item.UserName}
                                                                                checked={item1.IsRegister}
                                                                                disabled={item1.isHidden}
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
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

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
