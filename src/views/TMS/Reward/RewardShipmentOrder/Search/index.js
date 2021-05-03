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
    SearchAPIPath,
    SearchNewAPIPath,
    InitSearchParams
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_EXPORT, TMS_TMSREWARD_VIEW } from "../../../../../constants/functionLists";
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
            params: {},
            totalAmount: '',
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

        const param = {
            FromDate: InitSearchParams[0].SearchValue,
            ToDate: InitSearchParams[1].SearchValue,
            CoordinatorStore: InitSearchParams[2].SearchValue,
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
            // FromDate: MLObject.FromDate,
            // ToDate: MLObject.ToDate,
            FromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()), //MLObject.FromDate,
            ToDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString()), // MLObject.ToDate
            CoordinatorStore: MLObject.CoordinatorStore
        }

        this.setState({
            params: param
        })

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())//MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStore
            },
            {
                SearchKey: "@UserName",
                SearchValue: MLObject.UserName.value
            },

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

                const tempDataExport = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.RewardUser.trim(),
                        "Tên nhân viên": item.FullName.trim(),
                        "Tổng thưởng": item.TotalReward,

                    };

                    return element;
                });

                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.NoteReward = "Điểm thưởng này chỉ mang tính chất tham khảo, kết quả thưởng cuối cùng sẽ được KSNB và Phòng Lao động tiền lương điều chỉnh sau khi đối chiếu với các số liệu khác";

                    return item;

                })

                this.setState({
                    gridDataSource: tempData,
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



    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
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
                    IDSelectColumnName={''}
                    PKColumnName={'RewardUser'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    params={this.state.params}
                    totalCurrency={true}
                    totalCurrencyColSpan={4}
                    totalCurrencyNumber={this.state.totalAmount}
                    RequirePermission={TMS_TMSREWARD_VIEW}
                    ExportPermission={TMS_TMSREWARD_EXPORT}
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
