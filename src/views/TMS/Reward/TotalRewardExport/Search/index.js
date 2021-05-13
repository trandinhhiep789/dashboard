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
    SearchByUserAPIPath,
    titleModal
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_EXPORT, TMS_TMSREWARD_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'
import DataGirdRewardShipmentOrder from '../component/DataGirdRewardShipmentOrder'
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        // this.handleCallData = this.handleCallData.bind(this);
        this.renderRewardTotalTable = this.renderRewardTotalTable.bind(this);
        this.setExcelDataExport = this.setExcelDataExport.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            dataExport: [],
            widthPercent: "",
            fromDate: '',
            toDate: '',
            listColumn: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.handleCallData();
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    // handleCallData() {
    //     const { SearchData } = this.state;
    //     this.callSearchData(SearchData);
    // }

    setExcelDataExport(dataSource = [], arrColumn = []) {
        try {
            const tempDataExport = dataSource.map((item, index) => {

                const element = arrColumn.reduce((acc, val) => {
                    return {
                        ...acc,
                        [val.Caption]: typeof item[val.DataSourceMember] == "string"
                            ? item[val.DataSourceMember].trim()
                            : item[val.DataSourceMember]
                    }
                }, {})

                return element;
            });

            this.setState({
                dataExport: tempDataExport
            });
        } catch (error) {
            console.log(error)
            this.showMessage("Lỗi client, vui lòng liên hệ quản trị viên.");
        }
    }

    renderRewardTotalTable(searchData, apiResultObject) {
        try {
            const objRewardTypeIDSearch = searchData.find(item => item.SearchKey == "@REWARDTYPEID");

            this.props.callGetCache("ERPCOMMONCACHE.TMSREWARDTYPE").then((result) => {
                const objRewardType = result.ResultObject.CacheData.find(item => item.RewardTypeID == parseInt(objRewardTypeIDSearch.SearchValue));

                if (objRewardType == undefined || objRewardType == -1) {
                    this.setState({
                        listColumn: []
                    });

                    // set data export excel
                    this.setExcelDataExport(apiResultObject, []);
                } else {
                    let cloneGridColumnList = [...GridColumnList];

                    cloneGridColumnList[3] = {
                        Name: "TotalReward1",
                        Type: "textCurrency",
                        Caption: objRewardType.RewardTypeName,
                        DataSourceMember: "TotalReward1",
                        Width: 100
                    };

                    this.setState({
                        listColumn: cloneGridColumnList
                    });

                    // set data export excel
                    this.setExcelDataExport(apiResultObject, cloneGridColumnList);
                }
            });

        } catch (error) {
            this.showMessage("Lỗi client, vui lòng liên hệ quản trị viên.");
        }
    }

    handleSearchSubmit(formData, MLObject) {
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
                SearchKey: "@REWARDPOSITIONID",
                SearchValue: MLObject.RewardPositionID
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            }
        ];
        this.setState({
            fromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            toDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
        })
        this.callSearchData(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                this.renderRewardTotalTable(searchData, apiResult.ResultObject);

                // const tempDataExport = apiResult.ResultObject.map((item, index) => {
                //     let element = {
                //         "Mã nhân viên": item.RewardUser.trim(),
                //         "Tên nhân viên": item.FullName.trim(),
                //         "Thưởng giao hàng": item.TotalReward1,
                //         "Phụ cấp ống đồng": item.TotalReward2,
                //         "Tiền xăng": item.TotalReward3,
                //         "Thực lãnh": item.TotalReward,

                //     };

                //     return element;

                // })

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    // dataExport: tempDataExport
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

    onShowModalDetail(objValue, name) {
        const { fromDate, toDate } = this.state;
        //console.log("objValue, name", objValue, fromDate, toDate)
        const postData = {
            UserName: objValue[0].value,
            FromDate: fromDate,
            ToDate: toDate
        }

        this.props.callFetchAPI(APIHostName, SearchByUserAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleShowModal(apiResult.ResultObject, postData)
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        })
    }

    handleShowModal(data, paramData) {
        const { widthPercent } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleModal,
            content: {
                text: <DataGirdRewardShipmentOrder
                    dataSource={data}
                    paramData={paramData}
                    RowsPerPage={20}
                    IsAutoPaging={true}
                />

            },
            maxWidth: widthPercent + 'px'
        });
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
                    // listColumn={GridColumnList}
                    listColumn={this.state.listColumn}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'RewardUser'}
                    PKColumnName={'RewardUser'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={50}
                    RequirePermission={TMS_TMSREWARD_VIEW}
                    ExportPermission={TMS_TMSREWARD_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách tổng xuất thưởng"
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail.bind(this)}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
