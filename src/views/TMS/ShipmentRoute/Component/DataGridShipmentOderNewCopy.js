import React, { Component, PropTypes, useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import Media from "react-media";
import { MessageModal } from "../../../../common/components/Modal";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";
import GridCell from "../../../../common/components/DataGrid/GridCell";
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { connect } from "react-redux";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";
import { formatDate, formatMonthDate } from "../../../../common/library/CommonLib.js";
import { formatMoney, formatNumber } from "../../../../utils/function";
import { showModal, hideModal } from "../../../../actions/modal";
import { MODAL_TYPE_VIEW } from "../../../../constants/actionTypes";
//import ListShipCoordinator from '../Component/ListShipCoordinator.js';
import ListShipCoordinator from "../Component/ListShipCoordinatorRoute.js";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { APIHostName } from "../constants";

const dataGridShipmentOderNewCom = (props) => {
    const pkColumnName = props.PKColumnName.split(",");
    const listPKColumn = pkColumnName.map((item) => {
        return { key: item };
    });
    const [changeIsserver, setChangeIsserver] = useState(false);
    const [maxWidthGird, setMaxWidthGird] = useState(0);
    const [changeGird, setChangeGird] = useState(false);
    const [widthPercent, setWidthPercent] = useState(0);
    const [shipmentRouteID, setShipmentRouteID] = useState("");
    const [printDataID, setPrintDataID] = useState("");
    const [keywordId, setKeywordId] = useState("");
    const [gridDataShip, setGridDataShip] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [gridData, setGridData] = useState({});
    const [pageNumber, setPageNumber] = useState(props.PageNumber);
    const [listPKColumnName, setListPKColumnName] = useState(listPKColumn);
    const [dataSource, setDataSource] = useState(props.dataSource);
    const notificationDOMRef = useRef();

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener("resize", updateWindowDimensions);

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    useEffect(() => {
        if (dataSourceMemo) {
            const gridData = getCheckList(dataSource);
            const localIsserverInfo = localStorage.getItem("IsserverInfo");
            if (localIsserverInfo != null) {
                const IsserverInfo = JSON.parse(localIsserverInfo);
                setGridData(gridData);
                setChangeIsserver(IsserverInfo.Isserver);
            } else {
                setGridData(gridData);
            }
        }
    }, [dataSourceMemo]);

    const getCheckList = (dataSource) => {
        const idSelectColumnName = props.IDSelectColumnName;
        const pkColumnName = listPKColumnName;
        let checkList = [];
        dataSource.map((rowItem, rowIndex) => {
            const value = pkColumnName.map((obj, index) => {
                return { key: obj.key, value: rowItem[obj.key] };
            });
            const elementobject = { pkColumnName: value, IsChecked: false };
            checkList = Object.assign([], checkList, { [rowIndex]: elementobject });
        });
        return { [idSelectColumnName]: checkList };
    };

    const updateWindowDimensions = () => {
        const widthModal = (window.innerWidth * 55) / 100;
        const clientWidth = document.getElementById("SearchFormCustom").clientWidth;
        setWidthPercent(widthModal);
        setMaxWidthGird(clientWidth);
    };

    const copyToClipboard = (e) => {
        const PartnerSaleOrderID = e.target.attributes["data-id"].value;
        let temponaryInput = $("<input>").val(PartnerSaleOrderID).appendTo("body").select();
        document.execCommand("copy");
        temponaryInput.remove();
    };

    const copyToClipboardShipmentOrder = (e) => {
        const ShipmentOrderID = e.target.attributes["data-id"].value;
        let temponaryInput = $("<input>").val(ShipmentOrderID).appendTo("body").select();
        document.execCommand("copy");
        temponaryInput.remove();
    };

    const onChangePageHandle = (pageNum) => {
        setPageNumber(pageNumber);
        if (props.onChangePage != null) props.onChangePage(pageNum);
    };

    const handleKeyPress = (e) => {
        setKeywordId(e.target.value);
        if (e.key == "Enter") {
            const searchText = e.target.value;
            handleonSearchEvent(searchText);
        }
    };

    const handleonChange = (e) => {
        setKeywordId(e.target.value);
    };

    const handleSearchShip = () => {
        handleonSearchEvent(keywordId);
    };

    const handleonSearchEvent = (Keywordid) => {
        if (changeIsserver) {
            let resultShipment = dataSource.filter(
                (n) =>
                    n.ShipmentOrderID.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.ReceiverFullName.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.ReceiverPhoneNumber.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.PartnerSaleOrderID.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.PrimaryShipItemName.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.ReceiverFullAddress.toLowerCase().includes(Keywordid.toLowerCase()) ||
                    n.ShipItemNameList.toLowerCase().includes(Keywordid.toLowerCase())
            );
            setDataSource(resultShipment);
        } else {
            if (Keywordid != "") {
                let apiPath = "";
                switch (Keywordid.trim().length) {
                    case 15:
                        apiPath = "api/ShipmentOrder/SearchByKeyword";
                        break;
                    case 10:
                        apiPath = "api/ShipmentOrder/SearchByPhoneNember";
                        break;
                    default:
                        apiPath = "api/ShipmentOrder/SearchByPartnerSaleOrderID";
                        break;
                }

                props.callFetchAPI(APIHostName, apiPath, String(Keywordid).trim()).then((apiResult) => {
                    if (!apiResult.IsError) {
                        setDataSource(apiResult.ResultObject);
                    }
                });
            }
        }
    };

    const handleUserCoordinator = () => {
        props.hideModal();
        if (gridDataShip.length > 0) {
            gridDataShip[0].ShipmentOrderTypelst = props.ShipmentOrderTypelst;
            const widthModal = (window.innerWidth * 55) / 100;
            props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", gridDataShip).then((apiResult) => {
                if (!apiResult.IsError) {
                    setGridDataShip(apiResult.ResultObject.ShipmentOrderDeliverList);
                    setChangeGird(true);
                    props.showModal(MODAL_TYPE_VIEW, {
                        title: "Phân tuyến điều phối vận đơn",
                        isShowOverlay: false,
                        onhideModal: handleClose,
                        content: {
                            text: (
                                <ListShipCoordinator
                                    ShipmentOrderID={0}
                                    ShipmentRouteID
                                    ShipmentRouteID={shipmentRouteID}
                                    InfoCoordinator={apiResult.ResultObject.ShipmentOrderDeliverList}
                                    ShipmentOrderSame={apiResult.ResultObject.ShipmentOrderDeliverSameList}
                                    IsUserCoordinator={true}
                                    IsCoordinator={true}
                                    IsCancelDelivery={true}
                                    onChangeValue={handleShipmentOrder}
                                    onChangeClose={handleCloseModal}
                                />
                            ),
                        },
                        maxWidth: widthModal + "px",
                    });
                } else {
                    showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
                }
            });
        } else {
            showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
        }
    };

    const handleChangeIsserver = (Isserver) => {
        setChangeIsserver(!Isserver);
        let MLObject = { Isserver: !Isserver };
        var MLObjectInfo = JSON.stringify(MLObject);
        localStorage.setItem("IsserverInfo", MLObjectInfo);
    };

    const handleCheckShip = (e) => {
        const strShipmentOrdervalue = e.target.value;
        const name = e.target.name;
        const objShipmentOrder = dataSource.find((n) => n[name] == strShipmentOrdervalue);
        let objShip = {
            ShipmentOrderID: objShipmentOrder.ShipmentOrderID,
            ShipmentOrderTypeID: objShipmentOrder.ShipmentOrderTypeID,
            CarrierPartnerID: objShipmentOrder.CarrierPartnerID,
            CarrierTypeID: objShipmentOrder.CarrierTypeID,
            DeliverUserList: [],
            CurrentShipmentOrderStepID: objShipmentOrder.CurrentShipmentOrderStepID,
            ShipItemNameList: objShipmentOrder.ShipItemNameList,
            PrimaryShipItemName: objShipmentOrder.PrimaryShipItemName,
        };
        if (e.target.checked) {
            gridDataShip.push(objShip);
        } else {
            gridDataShip.splice(
                gridDataShip.findIndex((n) => n[name] == strShipmentOrdervalue),
                1
            );
        }
        setGridDataShip(gridDataShip);
        setDataSource(JSON.parse(JSON.stringify(dataSource)));
    };

    const handleClickShip = (ShipmentOrderID) => (e) => {
        props.hideModal();
        const widthModal = (window.innerWidth * 55) / 100;
        props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderDeliver", ShipmentOrderID).then((apiResult) => {
            if (!apiResult.IsError) {
                setChangeGird(true);
                let resultdd = gridDataShip.find((n) => n.ShipmentOrderID == ShipmentOrderID);
                if (!resultdd) {
                    if (gridDataShip.length > 0 && apiResult.ResultObject.ShipmentOrderDeliver.IsPermission && apiResult.ResultObject.ShipmentOrderDeliver.ShipmentOrder_DeliverUserList.length == 0) {
                        apiResult.ResultObject.ShipmentOrderDeliver["ShipmentOrder_DeliverUserList"] = gridDataShip[0].ShipmentOrder_DeliverUserList;
                    }
                    if (gridDataShip.length > 0 && apiResult.ResultObject.ShipmentOrderDeliver.IsPermission == true) {
                        apiResult.ResultObject.ShipmentOrderDeliver["VehicleID"] = gridDataShip[0].VehicleID;
                        apiResult.ResultObject.ShipmentOrderDeliver["DriverUser"] = gridDataShip[0].DriverUser;
                    }
                    gridDataShip.push(apiResult.ResultObject.ShipmentOrderDeliver);
                    setGridDataShip(gridDataShip);
                }
                props.showModal(MODAL_TYPE_VIEW, {
                    title: "Phân tuyến điều phối vận đơn ",
                    isShowOverlay: false,
                    onhideModal: handleClose,
                    content: {
                        text: (
                            <ListShipCoordinator
                                ShipmentOrderID={0}
                                ShipmentRouteID={shipmentRouteID}
                                InfoCoordinator={gridDataShip}
                                ShipmentOrderSame={apiResult.ResultObject.ShipmentOrderDeliverList}
                                IsUserCoordinator={true}
                                IsCoordinator={true}
                                IsCancelDelivery={true}
                                onChangeValue={handleShipmentOrder}
                                onChangeClose={handleCloseModal}
                            />
                        ),
                    },
                    maxWidth: widthModal + "px",
                });
            } else {
                showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
            }
        });
    };

    const _genCommentTime = (dates) => {
        const date = new Date(Date.parse(dates));
        //let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        let month = date.getMonth() + 1;
        return date.getDate() + "/" + (month < 10 ? "0" + month : month) + "/" + date.getFullYear() + " " + timeDisplay;
    };

    const _genCommentCarrierPartner = (CarrierTypeID, CarrierTypeName) => {
        if (CarrierTypeID < 1) {
            return (
                <label className="item vehicle">
                    <span>Chưa chọn phương tiện</span>
                </label>
            );
        } else if (CarrierTypeID == 1) {
            return (
                <label className="item vehicle">
                    <i className="fa fa-motorcycle"></i>
                    <span>{CarrierTypeName}</span>
                </label>
            );
        } else {
            return (
                <label className="item vehicle">
                    <i className="fa fa-truck"></i>
                    <span>{CarrierTypeName}</span>
                </label>
            );
        }
    };

    const _CheckTime = (dates) => {
        const date = new Date(Date.parse(dates));
        let currentDate = new Date();
        // var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        var timeDiff = date.getTime() - currentDate.getTime();
        var diffMinutes = parseInt(timeDiff / (3600 * 24));
        if (diffMinutes < 60) {
            return true;
        } else {
            return false;
        }
    };

    const handlePrintClickNew = (e) => {
        const ShipmentOrderID = e.target.attributes["data-id"].value;
        setPrintDataID(ShipmentOrderID);
        props.onPrint(ShipmentOrderID);
    };

    const handleClose = () => {
        setChangeGird(false);
        setGridDataShip([]);
        setShipmentRouteID("");
        props.hideModal();
    };

    const handleShipmentOrder = (apiResult) => {
        addNotification(apiResult.Message, apiResult.IsError);
        if (!apiResult.IsError) {
            props.hideModal();
            setChangeGird(false);
            setGridDataShip([]);
            setShipmentRouteID("");
            if (props.onChangePageLoad) props.onChangePageLoad();
        }
    };

    const addNotification = (message1, IsError) => {
        let cssNotification = "notification-danger";
        let iconNotification = "fa fa-exclamation";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        }

        notificationDOMRef.current.addNotification({
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
            dismiss: { duration: 4000 },
            dismissable: { click: true },
        });
    };

    const handleCloseModal = () => {
        props.hideModal();
        setChangeGird(false);
        setGridData([]);
        setShipmentRouteID("");
    };

    const handleClickShipmentRoute = (RouteID) => (e) => {
        props.hideModal();
        props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentOrderRouteLst", RouteID).then((apiResult) => {
            if (!apiResult.IsError) {
                setShipmentRouteID(RouteID);
                setGridDataShip(apiResult.ResultObject);
                setChangeGird(true);
                props.showModal(MODAL_TYPE_VIEW, {
                    title: "Phân tuyến điều phối vận đơn ",
                    isShowOverlay: false,
                    onhideModal: handleCloseModal,
                    content: {
                        text: (
                            <ListShipCoordinator
                                ShipmentOrderID={0}
                                ShipmentRouteID={RouteID}
                                InfoCoordinator={apiResult.ResultObject}
                                IsUserCoordinator={true}
                                ShipmentOrderSame={[]}
                                IsCoordinator={true}
                                IsCancelDelivery={true}
                                onChangeValue={handleShipmentOrder}
                                onChangeClose={handleCloseModal}
                            />
                        ),
                    },
                    maxWidth: widthPercent + "px",
                });
            } else {
                showMessage(apiResult.message);
            }
        });
    };

    useEffect(() => {
        setDataSource(props.dataSource);
    }, [props.dataSource]);

    const dataSourceMemo = useMemo(() => dataSource, [dataSource]);
    function renderDataGrid() {
        if (changeGird) {
            return (
                <React.Fragment>
                    <div className="tableChangeGird">
                        <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                            <table id="fixtable" className="jsgrid-table">
                                <thead className="jsgrid-header-row">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: "5%" }}></th>
                                        <th className="jsgrid-header-cell" style={{ width: "95%" }}>
                                            Thông tin vận đơn
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSourceMemo != null &&
                                        dataSourceMemo.map((rowItem, rowIndex) => {
                                            let rowtrClass = "jsgrid-row unread";
                                            if (rowItem.SelectedUser != "" || rowItem.IsView == true) {
                                                rowtrClass = "jsgrid-row unread";
                                            }

                                            let rowUndelivery = "jsgrid-cell";
                                            if (_CheckTime(rowItem.ExpectedDeliveryDate) == true && rowItem.CurrentShipmentOrderStepID < 105) {
                                                rowUndelivery = "jsgrid-cell action undelivery";
                                            } else {
                                                if (rowItem.CoordinatorUser == "") {
                                                    rowUndelivery = "jsgrid-cell action Uncoordinated";
                                                } else {
                                                    rowUndelivery = "jsgrid-cell action waitingDelivery";
                                                }
                                            }
                                            // console.log("check",rowItem.ShipmentOrderID,gridDataShip,gridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID))
                                            return (
                                                <tr key={rowIndex} className={rowtrClass}>
                                                    <td className={rowUndelivery} style={{ width: "5%" }}>
                                                        <ul>
                                                            {rowItem.ShipmentRouteID == "" ? (
                                                                <React.Fragment>
                                                                    <li className="item ">
                                                                        <div className="group-action">
                                                                            <div className="checkbox item-action">
                                                                                <label>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        readOnly
                                                                                        className="form-control form-control-sm"
                                                                                        name={"ShipmentOrderID"}
                                                                                        onChange={handleCheckShip}
                                                                                        value={rowItem.ShipmentOrderID}
                                                                                        checked={gridDataShip.some((n) => n.ShipmentOrderID == rowItem.ShipmentOrderID)}
                                                                                    />
                                                                                    <span className="cr">
                                                                                        <i className="cr-icon fa fa-check"></i>
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li className="item ">
                                                                        <button className="btn" onClick={handleClickShip(rowItem.ShipmentOrderID)}>
                                                                            <i className="fa fa-user-plus"></i>
                                                                        </button>
                                                                    </li>
                                                                </React.Fragment>
                                                            ) : (
                                                                <li className="item ">
                                                                    <button onClick={handleClickShipmentRoute(rowItem.ShipmentRouteID)} className="btn btn-user-plus" title="Đã được phân tuyến">
                                                                        <i className="fa fa-user-plus"></i>
                                                                    </button>
                                                                </li>
                                                            )}
                                                            <li className="item printing">
                                                                <button className="btn" onClick={handlePrintClickNew}>
                                                                    <i className="ti ti-printer" data-id={rowItem.ShipmentOrderID}></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>

                                                    <td className="jsgrid-cell group-info-limit" style={{ width: "95%" }}>
                                                        <ul>
                                                            <li className="info-time">
                                                                <span className="item times">
                                                                    <i className="ti ti-timer"></i>
                                                                    <span className="fw-600">{rowItem.ExpectedDeliveryDate != null ? _genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                                </span>
                                                                <span className="item status">
                                                                    <i className="fa fa-location-arrow"></i>
                                                                    <span>{rowItem.ShipmentOrderStatusName}</span>
                                                                </span>

                                                                <span className="item total price-success">
                                                                    <span className="price-title">COD: </span>
                                                                    <span className="price-debt">{formatMoney(rowItem.TotalCOD, 0)}</span>
                                                                </span>
                                                            </li>
                                                            <li className="info-customer">
                                                                <div className="item">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">{rowItem.ReceiverFullName}</span>
                                                                        <span className="line">-</span>
                                                                        <span className={rowItem.PhoneCount > 1 ? "phone  phonered" : "phone"}>({rowItem.ReceiverPhoneNumber})</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">{rowItem.PartnerSaleOrderID}</span>
                                                                        <button className="btn-copy-clipboard" data-id={rowItem.PartnerSaleOrderID} onClick={copyToClipboard}>
                                                                            <i className="fa fa-copy" data-id={rowItem.PartnerSaleOrderID}></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <Link className="linktext blank" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID }}>
                                                                        {rowItem.ShipmentOrderID}
                                                                    </Link>
                                                                    <button className="btn-copy-clipboard" data-id={rowItem.ShipmentOrderID} onClick={copyToClipboardShipmentOrder}>
                                                                        <i className="fa fa-copy" data-id={rowItem.ShipmentOrderID}></i>
                                                                    </button>
                                                                </div>
                                                            </li>

                                                            <li className="address-customer">
                                                                <span>{rowItem.ReceiverFullAddress}</span>
                                                            </li>

                                                            <li className={rowItem.IsInputReturn == true ? "item lstProducts lblReturns" : "item lstProducts"}>
                                                                <span>{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(/;/g, "<br/>"))}</span>
                                                            </li>

                                                            <li className="note">
                                                                <span>{rowItem.OrderNote != "" ? "Ghi chú: " + rowItem.OrderNote : ""}</span>
                                                            </li>

                                                            <li className="times">
                                                                <span className="group-times">
                                                                    <ul>{_genCommentCarrierPartner(rowItem.CarrierTypeID, rowItem.CarrierTypeName)}</ul>

                                                                    <span className="time-item">
                                                                        <span className="txtCreatedOrderTime">Tạo: {formatMonthDate(rowItem.CreatedOrderTime)}</span>
                                                                        <span className="txtCreatedOrderTime">Xuất: {formatMonthDate(rowItem.OutputGoodsDate)}</span>
                                                                    </span>
                                                                    <span className="time-item">
                                                                        <span className="intervale">
                                                                            <i className="fa fa-paper-plane-o"></i>
                                                                            <span className="txtintervale">
                                                                                {(rowItem.EstimateDeliveryDistance >= 0 ? rowItem.EstimateDeliveryDistance : 0) + "Km/" + rowItem.ActualDeliveryDistance.toFixed(2) + "Km"}
                                                                            </span>
                                                                        </span>
                                                                        <span className="intervale">
                                                                            <i className="ti ti-timer"></i>
                                                                            <span className="txtintervale">{rowItem.EstimateDeliveryLong + "'"}</span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className=" table-responsive">
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed datagirdshippingorder" cellSpacing="0">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell" style={{ width: "2%" }}></th>
                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>
                                    Thời gian giao
                                </th>
                                <th className="jsgrid-header-cell" style={{ width: "33%" }}>
                                    Địa chỉ
                                </th>
                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>
                                    Mã/Loại yêu cầu vận chuyển
                                </th>
                                <th className="jsgrid-header-cell" style={{ width: "24%" }}>
                                    Tên sản phẩm/Ghi chú
                                </th>
                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>
                                    Thanh toán
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSourceMemo != null &&
                                dataSourceMemo.map((rowItem, rowIndex) => {
                                    let rowtrClass = "unReadingItem";
                                    if (rowItem.SelectedUser != "" || rowItem.IsView == true) {
                                        rowtrClass = "noReadingItem readingItem";
                                    }

                                    let rowUndelivery = "btngroupleft";
                                    if (_CheckTime(rowItem.ExpectedDeliveryDate) == true && rowItem.CurrentShipmentOrderStepID < 105) {
                                        rowUndelivery = "btngroupleft Undelivery";
                                    } else {
                                        if (rowItem.CoordinatorUser == "") {
                                            rowUndelivery = "btngroupleft Uncoordinated";
                                        } else {
                                            rowUndelivery = "btngroupleft WaitingDelivery";
                                        }
                                    }
                                    return (
                                        <tr key={rowIndex} className={rowtrClass}>
                                            <td className={rowUndelivery} style={{ width: "2%" }}>
                                                <ul>
                                                    {rowItem.ShipmentRouteID == "" ? (
                                                        <React.Fragment>
                                                            <li className="item ">
                                                                <div className="group-action">
                                                                    <div className="checkbox item-action">
                                                                        <label>
                                                                            <input
                                                                                type="checkbox"
                                                                                readOnly
                                                                                className="form-control form-control-sm"
                                                                                name={"ShipmentOrderID"}
                                                                                onChange={handleCheckShip}
                                                                                value={rowItem.ShipmentOrderID}
                                                                                checked={gridDataShip.some((n) => n.ShipmentOrderID == rowItem.ShipmentOrderID)}
                                                                            />
                                                                            <span className="cr">
                                                                                <i className="cr-icon fa fa-check"></i>
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li className="item ">
                                                                <button className="btn" onClick={handleClickShip(rowItem.ShipmentOrderID)}>
                                                                    <i className="fa fa-user-plus"></i>
                                                                </button>
                                                            </li>
                                                        </React.Fragment>
                                                    ) : (
                                                        <li className="item ">
                                                            <button onClick={handleClickShipmentRoute(rowItem.ShipmentRouteID)} className="btn btn-user-plus" title="Đã được phân tuyến">
                                                                <i className="fa fa-user-plus"></i>
                                                            </button>
                                                        </li>
                                                    )}
                                                    <li className="item printing">
                                                        <button className="btn" onClick={handlePrintClickNew}>
                                                            <i className="ti ti-printer" data-id={rowItem.ShipmentOrderID}></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td className="groupInfoAction" style={{ width: "15%" }}>
                                                <div className="group-info-row">
                                                    <label className="item time">
                                                        <i className="ti ti-timer "></i>
                                                        <span className="fw-600">{rowItem.ExpectedDeliveryDate != null ? _genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                    </label>
                                                    <label className="item status">
                                                        <i className="fa fa-location-arrow"></i>
                                                        <span>{rowItem.ShipmentOrderStatusName}</span>
                                                    </label>
                                                    <label className="item vehicle">{_genCommentCarrierPartner(rowItem.CarrierTypeID, rowItem.CarrierTypeName)}</label>
                                                    <label className="item printing">
                                                        {rowItem.IsOutputGoods == false && rowItem.IsHandoverGoods == false ? <span className="badge badge-danger">Chưa xuất </span> : ""}
                                                        {rowItem.IsOutputGoods == true && rowItem.IsHandoverGoods == false ? <span className="badge badge-info">Đã xuất </span> : ""}
                                                        {rowItem.IsHandoverGoods == true ? <span className="badge badge-success">NV đã nhận </span> : ""}
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="group-address" style={{ width: "33%" }}>
                                                <div className="group-info-row">
                                                    <label className="item person">
                                                        <i className="fa fa-user"></i>
                                                        <div className="person-info">
                                                            <span className="name">{rowItem.ReceiverFullName}</span>
                                                            <span className="line">-</span>
                                                            <span className={rowItem.PhoneCount > 1 ? "phone  phonered" : "phone"}>({rowItem.ReceiverPhoneNumber})</span>
                                                            {rowItem.PartnerSaleOrderID != "" ? <span className="line">-</span> : ""}
                                                            <span className="phone partner-sale-Order fw-600">{rowItem.PartnerSaleOrderID}</span>
                                                            <button className="btn-copy-clipboard" data-id={rowItem.PartnerSaleOrderID} onClick={copyToClipboard}>
                                                                <i className="fa fa-copy" data-id={rowItem.PartnerSaleOrderID}></i>
                                                            </button>
                                                        </div>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span>{rowItem.ReceiverFullAddress}</span>
                                                    </label>
                                                    <label className="item address-repository-created">
                                                        <span>{`${rowItem.SenderStoreID} - ${rowItem.SenderFullName}`}</span>
                                                    </label>
                                                    <label className="item creacte-time">
                                                        <span className="times group-times">
                                                            <span className="time-item itemCreatedOrderTime">
                                                                <span className="txtCreatedOrderTime">Tạo: {formatMonthDate(rowItem.CreatedOrderTime)}</span>
                                                                <span className="txtCreatedOrderTime">Xuất: {formatMonthDate(rowItem.OutputGoodsDate)}</span>
                                                            </span>
                                                            <span className="time-item itemEstimat">
                                                                <span className="intervale itemDistance">
                                                                    <i className="fa fa-paper-plane-o"></i>
                                                                    <span className="txtintervale">{rowItem.EstimateDeliveryDistance + "Km/" + rowItem.ActualDeliveryDistance.toFixed(2) + "Km"}</span>
                                                                </span>
                                                                <span className="intervale itemLong">
                                                                    <i className="ti ti-timer"></i>
                                                                    <span className="txtintervale">{rowItem.EstimateDeliveryLong + "'"}</span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="group-infoShipmentOrder" style={{ width: "15%" }}>
                                                <div className="group-info-row">
                                                    <label className="item person">
                                                        <span className="person-info fw-600" style={{ fontSize: 12 }}>
                                                            <Link className="linktext blank" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID }}>
                                                                {rowItem.ShipmentOrderID}
                                                            </Link>
                                                        </span>
                                                        <button className="btn-copy-clipboard" data-id={rowItem.ShipmentOrderID} onClick={copyToClipboardShipmentOrder}>
                                                            <i className="fa fa-copy" data-id={rowItem.ShipmentOrderID}></i>
                                                        </button>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span>{rowItem.ShipmentOrderTypeName}</span>
                                                    </label>
                                                    {rowItem.CoordinatorUser != "" ? (
                                                        <React.Fragment>
                                                            <label className="item address-receiver">
                                                                <span>
                                                                    ĐP: <span className="coordinatorUser">{rowItem.CoordinatorUser + "-" + rowItem.CoordinatorUserName}</span>
                                                                </span>
                                                            </label>
                                                            {rowItem.DeliverUserFullNameList != "" ? (
                                                                <label className="item address-receiver">
                                                                    <span>{ReactHtmlParser(rowItem.DeliverUserFullNameList)}</span>
                                                                </label>
                                                            ) : (
                                                                ""
                                                            )}

                                                            <label className="item address-receiver">
                                                                <span className="receiverred">{rowItem.CoordinatorNote != "" ? "Ghi chú: " + rowItem.CoordinatorNote : ""}</span>
                                                            </label>
                                                        </React.Fragment>
                                                    ) : (
                                                        <label className="item address-receiver">
                                                            <span className="receiverred">{rowItem.CoordinatorNote != "" ? "Ghi chú: " + rowItem.CoordinatorNote : ""}</span>
                                                        </label>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="group-address" style={{ width: "24%" }}>
                                                <div className="group-info-row">
                                                    <label className={rowItem.IsInputReturn == true ? "item address-repository-created lblReturns" : "item address-repository-created"}>
                                                        <span className="coordinatorUser">{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(/;/g, "<br/>"))}</span>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span className="price-debt">{rowItem.OrderNote != "" ? "Ghi chú: " + rowItem.OrderNote : ""}</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="group-price" style={{ width: "10%" }}>
                                                <div className="group-row">
                                                    <span className="item price3">{rowItem.IsCancelDelivery == true ? <span className="badge badge-danger">Đã hủy</span> : ""}</span>
                                                    {rowItem.TotalCOD > 0 ? <span className="item pricecod">COD:{formatMoney(rowItem.TotalCOD, 0)}</span> : ""}
                                                    {rowItem.TotalSaleMaterialMoney > 0 ? <span className="item price-supplies">Vật tư:{formatMoney(rowItem.TotalSaleMaterialMoney, 0)}</span> : ""}
                                                    {rowItem.IsInputReturn == true ? <span className="item price-supplies">Nhập trả:{formatMoney(rowItem.TotalReturnPrice, 0)}</span> : ""}
                                                    {rowItem.IsPaidIn == true || rowItem.TotalSaleMaterialMoney + rowItem.TotalCOD - rowItem.TotalReturnPrice == 0 ? (
                                                        <span className="item price3 price-success">
                                                            <span className="price-title ">Nợ: </span>
                                                            <span className="price-debt">0đ</span>
                                                        </span>
                                                    ) : rowItem.TotalPaidInMoney + rowItem.TotalUnPaidInMoney > 0 ? (
                                                        <div className="item price3">
                                                            <span className="price-title">Nợ: </span>
                                                            <span className="price-debt">-{rowItem.TotalUnPaidInMoney >= 0 ? formatMoney(rowItem.TotalUnPaidInMoney, 0) : 0}đ</span>
                                                        </div>
                                                    ) : (
                                                        <div className="item price3">
                                                            <span className="price-title">Nợ: </span>
                                                            <span className="price-debt">
                                                                -
                                                                {rowItem.TotalCOD - rowItem.TotalReturnPrice <= 0
                                                                    ? formatMoney(rowItem.TotalSaleMaterialMoney)
                                                                    : formatMoney(rowItem.TotalCOD + rowItem.TotalSaleMaterialMoney - rowItem.TotalReturnPrice, 0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    function renderDataGridSmallSize() {
        const pageCount = getPageCount(dataSourceMemo[0]);
        return (
            <div className="card card-shipment-order-mobile-view">
                <ReactNotification ref={notificationDOMRef} />
                <div className="card-title">
                    <div className="total-orders">Tổng đơn: {dataSourceMemo.length > 0 ? formatNumber(dataSourceMemo[0].TotaLRows) : ""}</div>

                    <div className="input-group input-group-select">
                        <input type="text" onChange={handleonChange} onKeyPress={handleKeyPress} className="form-control" aria-label="Text input with dropdown button" placeholder="Từ khóa" />
                        <div className="input-group-append" onClick={handleSearchShip}>
                            <span className="input-group-text">
                                <i className="ti-search"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <table className="card-body">
                    <tbody>
                        {dataSourceMemo != null &&
                            dataSourceMemo.map((rowItem, rowIndex) => {
                                let rowtrClass = "un-reading-item";
                                if (SelectedUser != "") {
                                    rowtrClass = "un-reading-item reading-item";
                                }

                                let rowUndelivery = "btngroupleft";
                                if (_CheckTime(ExpectedDeliveryDate) == true && CurrentShipmentOrderStepID < 105) {
                                    rowUndelivery = "btngroupleft undelivery";
                                } else {
                                    if (CoordinatorUser == "") {
                                        rowUndelivery = "btngroupleft uncoordinated";
                                    } else {
                                        rowUndelivery = "btngroupleft waitingDelivery";
                                    }
                                }

                                return (
                                    <tr key={rowIndex} className={rowtrClass}>
                                        <td className={rowUndelivery}></td>
                                        <td className="data-row">
                                            <div className="group-shipment-order-status-name">
                                                <div>{rowItem.ShipmentOrderStatusName}</div>
                                                <div className="data-time">
                                                    <span className="fw-600">{ExpectedDeliveryDate != null ? _genCommentTime(ExpectedDeliveryDate) : ""}</span>
                                                </div>
                                            </div>

                                            <div className="group-shipment-order-and-vehicle">
                                                <div className="group-shipment-order">
                                                    <Link className="shipment-order fw-600" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + ShipmentOrderID }}>
                                                        {ShipmentOrderID}
                                                    </Link>
                                                    <button className="btn-copy-clipboard" data-id={ShipmentOrderID} onClick={copyToClipboardShipmentOrder}>
                                                        <i className="fa fa-copy" data-id={ShipmentOrderID}></i>
                                                    </button>
                                                </div>
                                                {_genCommentCarrierPartnerOnMobileView(rowItem.CarrierTypeID)}
                                            </div>

                                            <div className="group-address">
                                                <div className="person-info">
                                                    <span className="name">{ReceiverFullName}</span>
                                                    <span className="line">-</span>
                                                    <span className={PhoneCount > 1 ? "phone  phonered" : "phone"}>({ReceiverPhoneNumber.substr(0, 4)}****)</span>
                                                    {PartnerSaleOrderID != "" ? <span className="line">-</span> : ""}
                                                    <span className="phone partner-sale-Order fw-600">{PartnerSaleOrderID}</span>
                                                    <button className="btn-copy-clipboard" data-id={PartnerSaleOrderID} onClick={copyToClipboard}>
                                                        <i className="fa fa-copy" data-id={PartnerSaleOrderID}></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="group-address">
                                                <div className={IsInputReturn == true ? "item address-repository-created lblReturns" : "item address-repository-created"}>
                                                    <span>{ShipItemNameList == "" ? PrimaryShipItemName : ReactHtmlParser(ShipItemNameList.replace(/;/g, "<br/>"))}</span>
                                                </div>
                                            </div>

                                            <div className="address-receiver">
                                                <p className="receiver-full-address">{ReceiverFullAddress}</p>
                                                <p className="shipment-order-type-name">{ShipmentOrderTypeName}</p>
                                                {CoordinatorUser != "" ? (
                                                    <div className="receiverred">{CoordinatorNote != "" ? "Ghi chú: " + CoordinatorNote : ""}</div>
                                                ) : (
                                                    <div className="receiverred">{CoordinatorNote != "" ? "Ghi chú: " + CoordinatorNote : ""}</div>
                                                )}
                                            </div>

                                            <div className="price-debt">{OrderNote != "" && "Ghi chú: " + OrderNote}</div>

                                            <div className="group-price">
                                                <div>
                                                    {IsCancelDelivery && <div className="badge badge-danger">Đã hủy</div>}
                                                    {TotalCOD > 0 && <div className="pricecod">COD:{formatMoney(TotalCOD, 0)}</div>}
                                                    {TotalSaleMaterialMoney > 0 && <div className="price-supplies">Vật tư:{formatMoney(TotalSaleMaterialMoney, 0)}</div>}
                                                    {IsInputReturn && <div className="price-supplies">Nhập trả:{formatMoney(TotalReturnPrice, 0)}</div>}
                                                    {IsPaidIn == true || TotalSaleMaterialMoney + TotalCOD - TotalReturnPrice == 0 ? (
                                                        <div className="price-success">
                                                            <span className="price-title ">Nợ: </span>
                                                            <span className="price-debt">0đ</span>
                                                        </div>
                                                    ) : TotalPaidInMoney + TotalUnPaidInMoney > 0 ? (
                                                        <div className="price-error">
                                                            <span className="price-title ">Nợ: </span>
                                                            <span className="price-debt">-{TotalUnPaidInMoney >= 0 ? formatMoney(TotalUnPaidInMoney, 0) : 0}đ</span>
                                                        </div>
                                                    ) : (
                                                        <div className="price-error">
                                                            <span className="price-title">Nợ: </span>
                                                            <span className="price-debt">
                                                                -{TotalCOD - TotalReturnPrice <= 0 ? formatMoney(TotalSaleMaterialMoney) : formatMoney(TotalSaleMaterialMoney + TotalCOD - TotalReturnPrice, 0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    {IsOutputGoods == false && IsHandoverGoods == false ? <span className="badge badge-danger">Chưa xuất </span> : ""}
                                                    {IsOutputGoods == true && IsHandoverGoods == false ? <span className="badge badge-info">Đã xuất </span> : ""}
                                                    {IsHandoverGoods == true ? <span className="badge badge-success">NV đã nhận </span> : ""}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>

                <div>{props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={PageNumber} onChangePage={onChangePageHandle} />}</div>
            </div>
        );
    }
    const getPageCount = (dataRows) => {
        if (dataRows == null) return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (props.RowsPerPage != null) rowsPerPage = props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataRows.TotaLRows / rowsPerPage));
        if (pageCount < 1) pageCount = 1;
        return pageCount;
    };

    const handleSelected = () => {
        debugger;
        if (gridDataShip.length > 0) {
            props.callFetchAPI(APIHostName, "api/ShipmentOrder/UpdateSelected", gridDataShip).then((apiResult) => {
                addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    setGridData([]);
                }
            });
        } else {
            showMessage("Vui lòng chọn vận đơn để ghi nhớ!");
        }
    };

    const handleSelectedView = () => {
        if (props.onChangeView != null) props.onChangeView();
    };

    const showMessage = (message) => {
        ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={() => { }} />);
    };

    let searchTextbox = <div></div>;
    if (props.hasSearch) {
        searchTextbox = (
            <div className="lookup">
                <input className="w-200px" type="text" name="txtKeyword" placeholder="Search" onKeyPress={handleKeyPress} />
            </div>
        );
    }

    const pageCount = getPageCount(dataSource[0]);
    let hasHeaderToolbar = true;
    if (props.isHideHeaderToolbar) hasHeaderToolbar = false;
    let classCustom;
    if (props.classCustom != "") {
        classCustom = "col-lg-12 SearchForm ";
    } else {
        classCustom = "";
    }
    let classhearderFix;

    if (changeGird) {
        classhearderFix = "card-title fixCardTitle";
    } else {
        classhearderFix = "card-title fixCardTitle fixCardChangeGird";
    }
    return (
        <React.Fragment>
            <Media
                queries={{
                    small: "(max-width: 576px)",
                    large: "(min-width: 577px)",
                }}
            >
                {(matches) => (
                    <React.Fragment>
                        {matches.small && renderDataGridSmallSize()}
                        {matches.large && (
                            <div className={classCustom}>
                                <div id="changeMaxWidthNew" className="card cardShipmentOrder ShipmentRouteCus" style={{ maxWidth: !changeGird ? maxWidthGird : maxWidthGird - widthPercent }}>
                                    <ReactNotification ref={notificationDOMRef} />

                                    <div id="fixedCard" className={classhearderFix} style={{ maxWidth: !changeGird ? maxWidthGird : maxWidthGird - widthPercent }}>
                                        <h4 className="title">{props.title}</h4>

                                        {hasHeaderToolbar && (
                                            <div className="flexbox mb-10 ">
                                                {searchTextbox}
                                                <div className="btn-toolbar">
                                                    <div className="btn-group btn-group-sm">
                                                        <div className="group-left">
                                                            <button id="btnUserCoordinator" type="button" onClick={handleUserCoordinator} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                                <i className="fa fa-plus">Phân tuyến giao hàng</i>
                                                            </button>

                                                            <div className="input-group input-group-select">
                                                                <input type="text" onChange={handleonChange} onKeyPress={handleKeyPress} className="form-control" aria-label="Text input with dropdown button" placeholder="Từ khóa" />
                                                                <div className="input-group-append">
                                                                    <span onClick={handleSearchShip} className="input-group-text">
                                                                        <i className="ti-search"></i>
                                                                    </span>
                                                                    <span onClick={() => handleChangeIsserver(changeIsserver)} className="input-group-text">
                                                                        <i className={changeIsserver == true ? "fa fa-eye" : "fa"}></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="group-count">
                                                            <ul>
                                                                <li>
                                                                    <span className="count-name">Tổng đơn:</span>
                                                                    <span className="count-number">{dataSourceMemo.length > 0 ? formatNumber(dataSourceMemo[0].TotaLRows) : ""}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-title">
                                        {<h4 className="title">{props.title}</h4>}
                                        {hasHeaderToolbar && (
                                            <div className="flexbox mb-10 ">
                                                {searchTextbox}
                                                <div className="btn-toolbar">
                                                    <div className="btn-group btn-group-sm">
                                                        <div className="group-left">
                                                            <button id="btnUserCoordinator" type="button" onClick={handleUserCoordinator} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                                <i className="fa fa-plus">Phân tuyến giao hàng</i>
                                                            </button>
                                                            <div className="groupActionRemember ml-10">
                                                                <button type="button" onClick={handleSelected} className="btn " title="" data-provide="tooltip" data-original-title="Ghi nhớ">
                                                                    <i className="fa fa-save"></i>
                                                                </button>

                                                                <button type="button" onClick={handleSelectedView} className="btn " title="" data-provide="tooltip" data-original-title="Thêm">
                                                                    <i className="fa fa-history"></i>
                                                                </button>
                                                            </div>

                                                            <div className="input-group input-group-select">
                                                                <input type="text" onChange={handleonChange} onKeyPress={handleKeyPress} className="form-control" aria-label="Text input with dropdown button" placeholder="Từ khóa" />
                                                                <div className="input-group-append">
                                                                    <span onClick={handleSearchShip} className="input-group-text">
                                                                        <i className="ti-search"></i>
                                                                    </span>
                                                                    <span onClick={() => handleChangeIsserver(changeIsserver)} className="input-group-text">
                                                                        <i className={changeIsserver == true ? "fa fa-eye" : "fa"}></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="group-count">
                                                            <ul>
                                                                <li>
                                                                    <span className="count-name">Tổng đơn:</span>
                                                                    <span className="count-number">{dataSourceMemo.length > 0 ? formatNumber(dataSourceMemo[0].TotaLRows) : ""}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        {renderDataGrid()}

                                        {props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={pageNumber} onChangePage={onChangePageHandle} />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </Media>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
    };
};
const DataGridShipmentOderNewCopy = connect(mapStateToProps, mapDispatchToProps)(React.memo(dataGridShipmentOderNewCom));
export default DataGridShipmentOderNewCopy;
