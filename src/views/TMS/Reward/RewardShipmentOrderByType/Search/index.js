import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchNewAPIPath,
    InitSearchParams
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_VIEW, TMS_TMSREWARD_SO_TYPE_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            totalAmount: '',
            param: {},
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const param = {
            RewardTypeID: ""
        }
        this.setState({
            params: param
        })
        this.props.updatePagePath(PagePath);
         this.handleCallData();
    }

   

    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        const param = {
            RewardTypeID: MLObject.RewardTypeID
        }
        this.setState({
            params: param
        })

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            },
          

        ];
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchNewAPIPath, searchData).then(apiResult => {
            console.log("1111", searchData, apiResult)
            if (!apiResult.IsError) {
                const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.TotalReward
                    return sum
                }, 0);

                const tempDataExport = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.RewardUser,
                        "Tên nhân viên": item.FullName,
                        "Tổng thưởng": item.TotalReward,
                      
                    };

                    return element;

                })

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    totalAmount: totalAmount,
                    IsLoadDataComplete: true,
                    dataExport: tempDataExport
                });
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
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

    handleExportFile(result) {
        this.addNotification(result.Message);
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'RewardDate'}
                    PKColumnName={'RewardDate'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    totalCurrency={true}
                    params={this.state.params}
                    totalCurrencyColSpan={2}
                    totalCurrencyNumber={this.state.totalAmount}
                    RequirePermission={TMS_TMSREWARD_SO_TYPE_VIEW}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách thưởng giao hàng"
                    onExportFile={this.handleExportFile.bind(this)}
                    ref={this.gridref}
                />
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
