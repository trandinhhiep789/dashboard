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
    SearchAPIPath,
    InitSearchParams
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            UserName: '',
            SearchData: InitSearchParams,
            params: {},
            totalAmount: '',
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

        const param = {
            UserName: ""
        }

        this.setState({
            params: param
        })

        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData)
        //this.callDataMobi();
    }

    callDataMobi() {
        const dtFromdate = new Date();
        dtFromdate.setDate(new Date().getDate() - 60);
        const searchData = {
            FromDate: "2021-01-01T00:00:00+07:00",
            ToDate: "2021-01-31T23:59:59+07:00",
            Username: "0041018"
        }
        this.props.callFetchAPI(APIHostName, 'api/TMSRewardDetail/LoadByUserNameMobi', searchData).then(apiResult => {
            console.log("callDataMobi", searchData, apiResult)

        });
    }

    handleSearchSubmit(formData, MLObject) {
        let result;

        if (MLObject.UserName != -1 && MLObject.UserName != null && MLObject.UserName != "") {
            result = MLObject.UserName.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item.value;
            }, '');
        }
        else {
            result = ""
        }

        const param = {
            UserName: result
        }

        this.setState({
            UserName: result,
            params: param
        })

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) // MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            },
            {
                SearchKey: "@USERNAMELIST",
                SearchValue: result  //MLObject.CoordinatorStoreID
            }
        ];

        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchNewAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.TotalReward
                    return sum
                }, 0);

                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.NoteReward = "Điểm thưởng này chỉ mang tính chất tham khảo, kết quả thưởng cuối cùng sẽ được KSNB và Phòng Lao động tiền lương điều chỉnh sau khi đối chiếu với các số liệu khác";

                    return item;

                })

                this.setState({
                    gridDataSource: tempData,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    totalAmount: totalAmount
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

    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        className="multiple"
                        FormName="Tìm kiếm danh sách thống kê vận đơn theo ngày"
                        listelement={SearchElementList}
                        MLObjectDefinition={SearchMLObjectDefinition}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />

                    <DataGrid
                        // AddLink=""
                        // IDSelectColumnName={"TotalReward"}
                        dataSource={this.state.gridDataSource}
                        IsAutoPaging={true}
                        IsExportFile={false}
                        isHideHeaderToolbar={false}
                        IsPrint={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        listColumn={GridColumnList}
                        params={this.state.params}
                        PKColumnName={"RewardDate"}
                        ref={this.gridref}
                        RequirePermission={TMS_TMSREWARD_VIEW}
                        RowsPerPage={31}
                        totalCurrency={true}
                        totalCurrencyColSpan={2}
                        totalCurrencyNumber={this.state.totalAmount}
                    />
                </React.Fragment>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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
