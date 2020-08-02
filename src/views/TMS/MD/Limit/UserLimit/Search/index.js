import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
//import SearchForm from "../../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { LIMITTYPE_VIEW, LIMITTYPE_DELETE } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            gridDataLimtType: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            IsLoadDataComplete: false
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.searchData)
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@DEPARTMENTID",
                SearchValue: 944
            },
            {
                SearchKey: "@USERNAMELIST",
                SearchValue: "1125,74260"
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {

            if (!apiResult.IsError) {

                const sortResult = apiResult.ResultObject.sort((a, b) => (a.UserName > b.UserName) ? 1
                    : (a.UserName === b.UserName)
                        ? (a.LimitTypeID > b.LimitTypeID) ? 1 : -1 : -1)

                const dataSource = sortResult.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.UserName]) catsSoFar[item.UserName] = [];
                    catsSoFar[item.UserName].push(item);
                    return catsSoFar;
                }, {});

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

                this.setState({
                    gridDataSource: init,
                    gridDataLimtType: dataSource,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.showMessage(apiResult.Message);
                this.setState({
                    IsLoadDataComplete: false,
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

    handleChangeLimitType(e){
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const index = e.target.name;
        const userItem = e.target.attributes['data-user'].value;

        const dataFind = this.state.gridDataLimtType[userItem].find(n => {
            return n.LimitTypeID == inputvalue && n.UserName == userItem
        });
        if (ischecked) {
            dataFind.IsRegister = ischecked
        }
        else {
            dataFind.IsRegister = ischecked
        }
        let Item = this.state.gridDataLimtType[userItem];
        let formDatanew = []
        let formData = []
        formDatanew = Object.assign([], Item, { [index]: dataFind });
        formData = Object.assign([], this.state.gridDataLimtType, { [userItem]: formDatanew });

        this.setState({
            gridDataLimtType: formData
        })
    }

    onClickLimitType(){
        let lstUserLimit = [];
        this.state.gridDataLimtType.map((item) => {
            item.map((e) => {
                lstUserLimit.push(e)
            })
        })
        this.props.callFetchAPI(APIHostName, 'api/User_Limit/AddNew', lstUserLimit).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.searchData)
            }


        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách giới hạn theo người dùng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
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
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Mã nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 300 }}>Tên nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Loại 1</th>
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Loại 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.gridDataSource && this.state.gridDataSource.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.UserName}</td>
                                                    <td>{item.FullName}</td>
                                                    {
                                                        this.state.gridDataLimtType && this.state.gridDataLimtType[item.UserName].map((item1, index1) => {
                                                            return (
                                                                <td key={index1}>
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" className="form-control form-control-sm"
                                                                                onChange={this.handleChangeLimitType.bind(this)}
                                                                                value={item1.LimitTypeID}
                                                                                name={index1}
                                                                                data-index={index}
                                                                                data-user={item.UserName}
                                                                                checked={item1.IsRegister}
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
                                <button type="button" className="btn btn-info" data-provide="tooltip" data-original-title="Cập nhật" onClick={this.onClickLimitType.bind(this)}>
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
