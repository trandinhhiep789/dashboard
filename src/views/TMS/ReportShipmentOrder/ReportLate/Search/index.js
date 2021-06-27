import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    SearchReportLateDetailAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';
import DataGirdReportLate from '../../components/DataGirdReportLate'
import { toIsoStringCus } from '../../../../../utils/function'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            shipmentOrderTypeID: "",
            coordinatorStoreID: "",
            cssNotification: "notification-custom-success",
            iconNotification: "fa fa-check",
            dataExport: []
        };
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: ""
            },
        ];
        this.callSearchData(postData);
        this.props.updatePagePath(PagePath);
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

  
    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã khu vực": item.AreaID,
                        "Tên khu vực": item.AreaName,
                        "Tổng vận đơn trễ": item.TotalLate,
                        "Tổng vận đơn trễ dưới 30 phút": item.TotalLate30
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.setState({
                    dataExport: [],
                    gridDataSource: [],
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
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
                onCloseModal={this.handleCloseMessage}
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

    getStatusDelivery(status) {
        switch (status) {
            case 'TotalLate':
                return 1;
            case 'TotalLate30':
                return 2;
            default:
                return 0;
        }
    }

    onShowModalDetail(objValue, name) {
   
        const { shipmentOrderTypeID, coordinatorStoreID } = this.state;
        const status = this.getStatusDelivery(name);
        const areaID = objValue[0].value
        this.props.callFetchAPI(APIHostName, SearchReportLateDetailAPIPath, areaID).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleShowModal(apiResult.ResultObject, status)
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        });


    }

    handleShowModal(data, status) {
        const { widthPercent } = this.state;
        console.log('status', status)
        let titleModal;
        let areaName;
        if (data && data.length > 0) {
            areaName = " - khu vực " + data[0].AreaName;
        }

        titleModal = "Danh sách vận đơn trễ" + areaName;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleModal,
            content: {
                text: <DataGirdReportLate
                    dataSource={data}
                    RowsPerPage={20}
                    IsAutoPaging={true}
                    Status={status}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={true}
                    IDSelectColumnName={'AreaID'}
                    PKColumnName={'AreaID'}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách thống kê vận đơn trễ"
                    onExportFile={this.handleExportFile.bind(this)}
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
