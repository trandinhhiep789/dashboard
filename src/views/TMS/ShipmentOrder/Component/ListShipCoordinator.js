import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { formatMoney } from '../../../../utils/function';
import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName
} from "../constants";

class ListShipCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            ShipmentOrderID: this.props.ShipmentOrderID,
            InfoCoordinator: this.props.InfoCoordinator,
            objCoordinator: { CancelDeliveryReasonID: -1, CancelDeliveryUser: "", CancelDeliveryReasonNote: "" },
            ErrorCoordinator: { CancelDeliveryReasonID: "", CancelDeliveryUser: "", CancelDeliveryReasonNote: "" },
            CallAPIMessage: "",
            IsCallAPIError: false
        }
        this.notificationDOMRef = React.createRef();
    }



    handleOnValueChange(name, value) {

        let { objCoordinator, ErrorCoordinator, InfoCoordinator } = this.state;
        objCoordinator[name] = value;
        if (name == "CancelDeliveryReasonID" && value == -1) {
            ErrorCoordinator[name] = "Vui lòng chọn lý do hủy giao"
        }
        else if (name == "CancelDeliveryUser") {
            if (value == "") {
                ErrorCoordinator[name] = "Vui lòng chọn nhân viên yêu cầu";
            }
            else {
                if (InfoCoordinator.DeliverUserLst != "" && InfoCoordinator.DeliverUserLst.includes(value.value) == false) {
                    ErrorCoordinator[name] = "Vui lòng chọn nhân viên yêu cầu đúng với nhân viên giao hàng";
                }
                else {
                    ErrorCoordinator[name] = ""
                }
            }
        }
        else if (name == "CancelDeliveryReasonNote" && (value == "" || value.length == 0)) {
            ErrorCoordinator[name] = "Vui lòng nhập nội dung"
        }
        else {
            ErrorCoordinator[name] = ""
        }
        this.setState({
            objCoordinator: objCoordinator,
            ErrorCoordinator, ErrorCoordinator
        })
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            if (this.props.onChangeValue != null)
                this.props.onChangeValue();
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

    handleCancelDeliveryInsert() {

        let { objCoordinator, ErrorCoordinator, ShipmentOrderID, InfoCoordinator } = this.state;
        if (objCoordinator.CancelDeliveryReasonID == -1) {
            ErrorCoordinator.CancelDeliveryReasonID = "Vui lòng chọn lý do hủy giao";
        }
        if (objCoordinator.CancelDeliveryUser == "") {
            ErrorCoordinator.CancelDeliveryUser = "Vui lòng chọn nhân viên yêu cầu";
        }

        if (InfoCoordinator.DeliverUserLst != "" && InfoCoordinator.DeliverUserLst.includes(objCoordinator.CancelDeliveryUser.value) == false) {
            ErrorCoordinator[name] = "Vui lòng chọn nhân viên yêu cầu đúng với nhân viên giao hàng";
        }

        if (objCoordinator.CancelDeliveryReasonNote == "" || objCoordinator.CancelDeliveryReasonNote.length == 0 || String(objCoordinator.CancelDeliveryReasonNote).trim() == "") {
            ErrorCoordinator.CancelDeliveryReasonNote = "Vui lòng nhập nội dung";
        }
        this.setState({
            ErrorCoordinator, ErrorCoordinator
        })
        if (ErrorCoordinator.CancelDeliveryReasonID == "" && ErrorCoordinator.CancelDeliveryUser == "" && ErrorCoordinator.CancelDeliveryReasonNote == "") {
            let ShipmentOrder = {};
            ShipmentOrder.ShipmentOrderID = ShipmentOrderID;
            ShipmentOrder.CancelDeliveryReasonID = objCoordinator.CancelDeliveryReasonID;
            ShipmentOrder.CancelDeliveryUser = objCoordinator.CancelDeliveryUser.value;
            ShipmentOrder.CancelDeliveryReasonNote = objCoordinator.CancelDeliveryReasonNote;

            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateCancelDelivery', ShipmentOrder).then((apiResult) => {
                if (!apiResult.IsError) {
                    if (this.props.onhandleChange != null)
                        this.props.onhandleChange(apiResult)
                }
            });
        }
    }

    handleCloseModal() {
        this.props.hideModal();
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

    sortDataShipmentOrderItemList(dataa) {
        debugger
        let data =dataa.filter(n  =>  n.MainGroupID !=704 || n.ProductID.trim() =="7042011000112")
        try {
            if (data.length == 1) {
                return data;
            }

            let cloneData = [...data], tempIndex = [];

            // lấy sản phẩm chính
            const mainProduct = cloneData.filter((item, index) => {
                // if (item.Price != 0 || item.ProductSerial != "") {
                if (item.Price != 0) {
                    tempIndex.push(index);
                    return true;
                }
                return false;
            });

            // xóa sản phẩm chính khỏi arr ban đầu
            tempIndex.sort((a, b) => b - a);
            for (let index = 0; index < tempIndex.length; index++) {
                cloneData.splice(tempIndex[index], 1);
            }
            tempIndex.length = 0;

            let result = mainProduct.reduce((acc, val) => {
                let arrTemp = [];

                // lấy danh sách sản phẩm khuyến mãi theo sp chính
                cloneData.forEach((ele, index) => {
                    if (val.ProductID.trim() == ele.RelateProductID.trim()) {
                        let isExist = false;

                        // không lấy trùng lặp
                        arrTemp.forEach(ele1 => {
                            if (ele1.ProductID == ele.ProductID) {
                                isExist = true;
                            }
                        });
                        if (isExist == false) {
                            arrTemp.push(ele);
                            tempIndex.push(index);
                        }
                    }
                });

                // remove những sp khuyến mãi khỏi mảng ban đầu
                tempIndex.sort((a, b) => b - a);
                for (let index = 0; index < tempIndex.length; index++) {
                    cloneData.splice(tempIndex[index], 1);
                }
                tempIndex.length = 0;

                // sắp xếp thứ tự sp khuyến mãi
                arrTemp.sort((a, b) => a.ProductID.trim() - b.ProductID.trim());

                return [...acc, val, ...arrTemp];
            }, []);

            // push những sản phẩm không liên quan còn lại
            if (cloneData.length > 0) {
                cloneData.sort((a, b) => a.ProductID.trim() - b.ProductID.trim());
                result.push(...cloneData);
            };

            // kiem tra có đúng so luong san pham
            if (result.length != data.length) {
                return data;
            } else {
                return result;
            }

        } catch (error) {
            return data;
        }
    }
    render() {
        let { objCoordinator, ErrorCoordinator, InfoCoordinator } = this.state;
        return (
            <div className="card modalForm">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="card-body" style={{ minHeight: 430 }}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="CancelDeliveryReasonID"
                                colspan="8"
                                labelcolspan="4"
                                label="Lý do hủy giao hàng:"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.CANCELDELIVERYREASON"
                                valuemember="CancelDeliveryReasonID"
                                nameMember="CancelDeliveryReasonName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryReasonID}
                                listoption={null}
                                datasourcemember="CancelDeliveryReasonID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryReasonID}
                                validatonList={"Comborequired"}
                            />
                        </div>
                        <div className="col-md-6">
                            <MultiSelectComboBox
                                name="CancelDeliveryUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên yêu cầu"
                                IsLabelDiv={true}
                                isSelectedOption={true}
                                isautoloaditemfromcache={false}
                                controltype="InputControl"
                                onChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryUser}
                                listoption={[]}
                                isMultiSelect={false}
                                isCheckPartner={false}
                                datasourcemember="CancelDeliveryUser"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryUser}
                                validatonList={"Comborequired"}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.TextArea
                                name="CancelDeliveryReasonNote"
                                colspan="10"
                                labelcolspan="2"
                                label="Nội dung hủy giao hàng"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryReasonNote}
                                datasourcemember="CancelDeliveryReasonNote"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryReasonNote}
                                validatonList={"required"}
                            />
                        </div>
                    </div>

                    <div className="card-body table-scrollbar">
                        <div className="form-row">
                            <div className="jsgrid">
                                <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                    <table className="jsgrid-table">
                                        <thead className="jsgrid-header-row">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Mã sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "36%" }}>Sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "12%" }}>Serial/IMEI</th>
                                                <th className="jsgrid-header-cell" style={{ width: "8%" }}>Giá</th>
                                                <th className="jsgrid-header-cell" style={{ width: "8%" }}>Số lượng</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="jsgrid-grid-body">
                                    <table className="jsgrid-table">
                                        <tbody>
                                            {
                                                InfoCoordinator.ShipmentOrder_ItemList
                                                && this.sortDataShipmentOrderItemList(InfoCoordinator.ShipmentOrder_ItemList).map((item, index) => {
                                                    return <tr
                                                        key={"Product" + index}
                                                        className={parseFloat(item.Price) != 0 || item.ProductSerial.trim() != ""
                                                            ? "jsgrid-row row-main-product" : "jsgrid-row " + undefined}
                                                    >
                                                        <td className="jsgrid-cell txt-product-name" style={{ width: "10%" }}>{item.ProductID}</td>
                                                        <td className="jsgrid-cell txt-product-name" style={{ width: "36%" }}>{item.ProductName}</td>
                                                        <td className="jsgrid-cell" style={{ width: "12%" }}>{item.ProductSerial}</td>
                                                        <td className="jsgrid-cell" style={{ width: "8%" }}>{formatMoney(item.Price, 0)}đ</td>
                                                        <td className="jsgrid-cell" style={{ width: "8%" }}>{item.Quantity}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="modal-footer">
                    <button className="btn btnEditCard" onClick={this.handleCancelDeliveryInsert.bind(this)} type="submit" > Cập nhật</button>
                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>Đóng</button>
                </div>
            </div>
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


const ListShipCoordinator = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorCom);
export default ListShipCoordinator;