import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
//import SearchForm from "../../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    DataGridColumnList,
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
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { LIMITTYPE_VIEW, LIMITTYPE_DELETE } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { formatMoney } from '../../../../../../utils/function';
import { ERPCOMMONCACHE_LIMITTYPE } from "../../../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleChangeLimitType = this.handleChangeLimitType.bind(this);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            gridDataLimtType: [],
            dataLimitTyle: [],
            IsCallAPIError: false,
            SearchData: InitSearchParamsNew,
            cssNotification: "",
            iconNotification: "",
            IsLoadDataComplete: false,
            isValidate: false,
            lstUserNameFind: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getCacheLimitTyle();
    }

    getCacheLimitTyle() {
        this.props.callGetCache(ERPCOMMONCACHE_LIMITTYPE).then((result) => {

            if (!result.IsError) {
                this.setState({
                    dataLimitTyle: result.ResultObject.CacheData
                })
            }
            else {
                this.showMessage(result.Message)
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        // console.log('aaa',formData, MLObject)
        let result;
        
        if (MLObject.UserName != -1 && MLObject.UserName!=null) {
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
        this.setState({ SearchData: postData,  });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchUserLimitAPIPath, searchData).then(apiResult => {
            console.log('SearchUserLimit', apiResult, searchData);
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const sortResult = apiResult.ResultObject.sort((a, b) => (a.UserName > b.UserName) ? 1
                        : (a.UserName === b.UserName)
                            ? (a.LimitTypeID > b.LimitTypeID) ? 1 : -1 : -1);
                   
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
                    let lstUserNameFind = [];
                    init.map((item, index)=>{
                        lstUserNameFind.push(item.UserName)
                    })

                    this.setState({
                        gridDataSource: init,
                        gridDataLimtType: dataSource,
                        IsCallAPIError: apiResult.IsError,
                        IsLoadDataComplete: true,
                        lstUserNameFind: lstUserNameFind
                    });
                }
                else {
                    this.showMessage("Không tồn tại dữ liệu.");
                    this.setState({
                        IsLoadDataComplete: false,
                    });
                }

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
        if (!this.state.IsCallAPIError);
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

    handleChangeLimitType(e) {
        const inputvalue = e.target.value;
        const inputName = e.target.name;
        const inputValueNew = inputvalue.toString().replace(new RegExp(',', 'g'), "");
        const userItem = e.target.attributes['data-user'].value;
        const userlimitType = e.target.attributes['data-limittype'].value;
        const index = e.target.attributes['data-index'].value;

        const dataFind = this.state.gridDataLimtType[userItem].find(n => {
            return n.LimitTypeID == inputName && n.UserName == userItem
        });
        dataFind.LimitValue = inputValueNew;

        if (inputValueNew > 0) {
            dataFind.IsRegister = true;
        }
        else {
            dataFind.IsRegister = false;
        }

        if (inputValueNew.toString().length > 1) {
            if (/^[0-9]*$/.test(inputValueNew)) {
                this.setState({
                    isValidate: false
                })
                e.target.classList.remove('is-invalid')
            }
            else {
                e.target.classList.add('is-invalid')
                this.setState({
                    isValidate: true
                })
            }
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

    onClickLimitType() {
        // console.log("gridDataLimtType", this.state.gridDataLimtType, this.state.gridDataLimtType.length)
        let lstUserLimit = [];
        this.state.lstUserNameFind.map((item) => {
            this.state.gridDataLimtType[item].map((e) => {
                lstUserLimit.push(e)
            })
        })
        this.props.callFetchAPI(APIHostName, 'api/User_Limit/AddNew', lstUserLimit).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.SearchData)
            }
        });


    }

    render() {
        let className = "form-control form-control-sm";

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
                                        <th className="jsgrid-header-cell" style={{ width: 100 }}>Mã nhân viên</th>
                                        <th className="jsgrid-header-cell" style={{ width: 300 }}>Tên nhân viên</th>
                                        {
                                            this.state.dataLimitTyle && this.state.dataLimitTyle.map((item, index) => {
                                                return (
                                                    <th key={index} className="jsgrid-header-cell" style={{ width: 100 }}>{item.LimitTypeName}</th>
                                                )
                                            })
                                        }

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
                                                                    <input type="text" className={className}
                                                                        onChange={this.handleChangeLimitType}
                                                                        value={formatMoney(item1.LimitValue, 0)}
                                                                        name={item1.LimitTypeID}
                                                                        data-index={index1}
                                                                        data-user={item.UserName}
                                                                        data-limittype={item1.LimitTypeID}
                                                                        maxLength={15}
                                                                    />

                                                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>Vui lòng nhập số</li></ul></div>

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
