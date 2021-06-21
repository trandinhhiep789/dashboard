import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../../utils/function';
import DataGrid from "../../../../../common/components/DataGrid";
import { DataGirdStaffDebtColumnList, UpdateUnlockDetailAPIPath, APIHostName, SearchDetailAPIPath } from '../constants'
import ChangeActiveDetailtModal from "../ChangeActiveDetailtModal";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ReactNotification from "react-notifications-component";
import DataGirdHistoryStaffDebtDetail from "../DataGirdHistoryStaffDebtDetail";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
class DataGirdStaffDebtCom extends Component {
    constructor(props) {
        super(props);
        this.updateStaffDebtStatus = this.updateStaffDebtStatus.bind(this);
        this.onShowModalDetail = this.onShowModalDetail.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            dataSource: this.props.dataSource,
            dataItem: this.props.dataItem,
            param: this.props.param,
            widthPercent: "",

        }
    }

    componentDidMount() {

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


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }
        if (JSON.stringify(this.props.dataItem) !== JSON.stringify(nextProps.dataItem)) {
            this.setState({
                dataItem: nextProps.dataItem
            })
        }

    }

    onShowModalDetail(param) {


        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, param).then(apiResult => {
            console.log("aaa11", param, apiResult)
            if (!apiResult.IsError) {
                const dataTemp = apiResult.ResultObject.map((item, index) => {
                    item.FullNameMemer = item.UserName + " - " + item.FullName
                    if (item.IsLockDelivery) {
                        item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
                    }
                    else {
                        item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
                    }
                    return item;
                })
                this.setState({
                    dataSource: dataTemp
                })
            }
            else {
                this.showMessage(apiResult.Message)
            }
        })

    }


    updateStaffDebtStatus(objDataRequest) {
        const { param } = this.state

        this.props.callFetchAPI(APIHostName, UpdateUnlockDetailAPIPath, objDataRequest).then(apiResult => {
            console.log("update", param, objDataRequest, apiResult)
            if (!apiResult.IsError) {
                this.onShowModalDetail(param)
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }

        });
    }

    onhandleUpdateItem(objId) {
        const { dataSource } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Mô tả lý do thay đổi trạng thái",
            content: {
                text: <ChangeActiveDetailtModal
                    dataSource={dataSource}
                    objId={objId}
                    ObjDataRequest={this.updateStaffDebtStatus}
                />
            },
            maxWidth: '800px'
        });

    }

    onhandleHistoryItem(objId) {

        const { dataSource } = this.state;
        const dataFind = dataSource.find(n => {
            return n.StaffDebtDetailID == objId[0].value
        });

        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: dataFind.UserName
            },
            {
                SearchKey: "@STOREID",
                SearchValue: dataFind.StoreID
            },
            {
                SearchKey: "@SHIPMENTORDERID",
                SearchValue: dataFind.ShipmentOrderID
            },

        ];


        this.props.callFetchAPI(APIHostName, "api/StaffDebtDetail_UnLockLog/Search", postData).then(apiResult => {
            console.log("history", objId, postData, apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {

                this.onShowModalHistory(apiResult.ResultObject, dataFind);
            }
        })

    }

    onShowModalHistory(dataSource = [], dataItem) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Danh sách lịch sử xử lý",
            content: {
                text: <DataGirdHistoryStaffDebtDetail
                    dataSource={dataSource}
                    dataItem={dataItem}
                />

            },
            maxWidth: this.state.widthPercent + 'px'
        });
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


    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    render() {
        const { dataItem, dataSource } = this.state;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-12" style={{ textAlign: 'initial' }}>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="col-form-label bold">Nhân viên:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">
                                {dataItem.FullNameMember}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Kho điều phối:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">
                                {dataItem.StoreID + " - " + dataItem.StoreName}
                            </label>
                        </div>

                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền COD:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalCOD, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền vật tư:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalSaleMaterialMoney, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền cần thu:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalMoney, 0)}
                            </label>
                        </div>

                        <div className="col-md-2">
                            <label className="col-form-label bold">Tiền đã thu của khách:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.CollectedTotalMoney, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Số đơn nợ:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {dataItem.TotalDebtOrders}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Số đơn quá hạn:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {dataItem.TotALoverDueDebtOrders}
                            </label>
                        </div>

                    </div>
                </div>

                <DataGrid
                    listColumn={DataGirdStaffDebtColumnList}
                    dataSource={dataSource}
                    IDSelectColumnName={"StaffDebtDetailID"}
                    PKColumnName={"StaffDebtDetailID"}
                    onUpdateItem={this.onhandleUpdateItem.bind(this)}
                    onHistoryItem={this.onhandleHistoryItem.bind(this)}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    RowsPerPage={10}
                    IsExportFile={false}
                />
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    }
}
const DataGirdStaffDebt = connect(mapStateToProps, mapDispatchToProps)(DataGirdStaffDebtCom);
export default DataGirdStaffDebt;