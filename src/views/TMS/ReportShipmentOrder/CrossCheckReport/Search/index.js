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
    DataGridModalAdvanceMaterial,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_BEGINTERMADVANCEDEBT_EXPORT, TMS_BEGINTERMADVANCEDEBT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus } from '../../../../../utils/function'
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_DOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import ModalDetail from '../components/ModalDetail'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [
                {
                    CrossCheckID: "00011",
                    BusinessID: 1,
                    Date: '2021-05-31T17:00:00.000Z',
                    TMS: 0,
                    ERP: 0,
                    Difference: 0


                },
            ],
            IsLoadDataComplete: false,
            widthPercent: "",
            params: {},
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    }


    handleSearchSubmit(formData, MLObject) {
        console.log("aaa", formData, MLObject)
        // const objData = {
        //     FromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()), //MLObject.FromDate,
        //     ToDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) // MLObject.ToDate

        // }

        const objParams = {
            FromDate: MLObject.FromDate,
            ToDate: MLObject.ToDate,
            BusinessID: MLObject.BusinessID,
            Difference: MLObject.Difference
        }

        const objDataNew =  [
            {
                "name": "V_FROMDATE",
                "value": MLObject.FromDate,
                "op": "timestamp"
            },
            {
                "name": "V_TODATE",
                "value": MLObject.ToDate,
                "op": "timestamp"
            },
            {
                "name": "V_OUTPUTTYPEIDLIST",
                "value": MLObject.BusinessID,
                "op": "array"
            }
        ]

        this.setState({
            params: objParams
        })

        this.callSearchData(objDataNew)
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReport", searchData).then(apiResult => {
            // console.log("apiResult", apiResult)
            if (!apiResult.IsError) {
                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.TotalAmount = item.Price * item.EndTermAdvanceDebt;
                    return item;
                })

                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Nghiệp vụ": item.ProductID,
                        "Tên vật tư": item.ProductName,
                        "Đơn vị tính": item.QuantityUnitName,
                        "Tồn đầu kỳ": item.BeginTermAdvanceDebt,
                        "Tăng trong kỳ": item.IncreaseAdvanceDebt,
                        "Giảm trong kỳ": item.DecreaseAdvanceDebt,
                        "Tồn cuối kỳ": item.EndTermAdvanceDebt,
                        "Đơn giá": item.Price,
                        "Thành tiền": item.TotalAmount
                    };
                    return element;

                })

                this.setState({
                    gridDataSource: tempData,
                    dataExport: exelData,
                    IsCallAPIError: apiResult.IsError,
                });

            }
            else {
                this.setState({
                    gridDataSource: [],
                    dataExport: [],
                    IsCallAPIError: apiResult.IsError,
                })
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

    onShowModal(data, typeDataGrid) {
        const { params, widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Báo cáo chi tiết tạm ứng vật tư",
            content: {
                text: <ModalDetail
                    param={params}
                    listColumn={DataGridModalAdvanceMaterial}
                    dataSource={data}
                    fileName={"Báo cáo chi tiết tạm ứng vật tư"}
                />
            },
            maxWidth: widthPercent + 'px'
        });
    }

    onShowModalDetail(objValue, name) {
        console.log("onShowModalDetail", objValue, name)
        const { params } = this.state;
        console.log("params", params)
        this.onShowModal()

    }


    render() {
        console.log("state", this.state)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách báo đối soát"
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
                    IsFixheaderTable={true}
                    IDSelectColumnName={'CrossCheckID'}
                    PKColumnName={'CrossCheckID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    params={this.state.params}
                    RowsPerPage={20}
                    // RequirePermission={TMS_BEGINTERMADVANCEDEBT_VIEW}
                    // ExportPermission={TMS_BEGINTERMADVANCEDEBT_EXPORT}
                    ref={this.gridref}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách báo đối soát"
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail.bind(this)}
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
