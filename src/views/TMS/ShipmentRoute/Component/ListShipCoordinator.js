import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ElementInputModal from '../../../../common/components/FormContainer/FormElement/ElementInputModal';
import { formatMoney, formatNumber } from '../../../../utils/function';
import {
    APIHostName
} from "../constants";

class ListShipCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.HandleChangeGird = this.HandleChangeGird.bind(this)
        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1, IsRoute: true },
            selectedOption: [],
            objDeliverUser: [],
            DeliverUserList: {},
            DeliverUserServerList: [],
            FormValidation: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            ShipmentRouteID: this.props.ShipmentRouteID,
            ShipmentRouteLst: [],
            ShipmentOrderSameLst: this.props.ShipmentOrderSame,
            Via_Durations: 0,
            Via_Distances: "",
            ShipmentRouteSameLst: [],
            Distances_RouteLst: [],
            girdSlide: false

        }
        this.notificationDOMRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoCoordinator) !== JSON.stringify(nextProps.InfoCoordinator)) {
            this.setState({
                ShipmentOrder: nextProps.InfoCoordinator,
                ShipmentOrderSameLst: nextProps.ShipmentOrderSame,
                Via_Durations: 0,
                Via_Distances: ""
            })
        }
    }

    handleOnValueChange(name, value) {
        let { objCoordinator, objDeliverUser } = this.state;
        objCoordinator[name] = value;
        if (name == "CarrierPartnerID") {
            objDeliverUser = [];
            this.state.ShipmentOrder.map((row, indexRow) => {
                if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true) {
                    row[name] = value;
                    row["ShipmentOrder_DeliverUserList"] = [];
                }
            });
        }
        // else if(name="IsRoute")
        // {
        //     objDeliverUser = [];
        //     this.state.ShipmentOrder.map((row, indexRow) => {
        //         if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true) {
        //           row["CarrierPartnerID"] = -1;
        //                row["ShipmentOrder_DeliverUserList"] = [];
        //         }
        //     });

        // }
        else {
            this.state.ShipmentOrder.map((row, indexRow) => {
                if (!row.IsCoordinator && row.IsPermission == true) {
                    row[name] = value;
                }
            });
        }


        this.setState({

            objCoordinator: objCoordinator,
            objDeliverUser: objDeliverUser,
            ShipmentOrder: this.state.ShipmentOrder
        })
    }

    handleValueChange1(e, selectedOption1) {

        let objDeliverUser = [];
        let listStaffDebtObject = [];
        selectedOption1 && selectedOption1.map((item, index) => {
            let objShip_DeliverUser = { UserName: item.value, FullName: item.FullName }
            objDeliverUser.push(objShip_DeliverUser)
            listStaffDebtObject.push({
                UserName: item.value,
                StoreID: this.state.ShipmentOrder.length > 0 ? this.state.ShipmentOrder[0].CoordinatorStoreID : 0
            });
        })
        if (selectedOption1) {
            this.props.callFetchAPI(APIHostName, 'api/ShipmentRoute/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.state.ShipmentOrder.map((row, indexRow) => {
                        if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true && row.CarrierPartnerID <= 0) {
                            row["ShipmentOrder_DeliverUserList"] = objDeliverUser;
                        }
                    });
                    this.setState({ selectedOption: selectedOption1, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject });
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            this.setState({ selectedOption: selectedOption1, ShipmentRouteLst: [] });
        }
    }

    handleOnValueChangeDeliverUser(name, value, selectedOption) {

        let objMultiDeliverUser = [];
        let listStaffDebtObject = [];
        selectedOption && selectedOption.map((item, index) => {
            let objMultiShip_DeliverUser = { UserName: item.value, FullName: item.name }
            objMultiDeliverUser.push(objMultiShip_DeliverUser)
            listStaffDebtObject.push({
                UserName: item.value,
                StoreID: this.state.ShipmentOrder[0].CoordinatorStoreID
            });
        })
        if (selectedOption) {
            this.props.callFetchAPI(APIHostName, 'api/ShipmentRoute/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.state.ShipmentOrder.map((row, indexRow) => {
                        if (row.IsPermission == true && row.CarrierPartnerID > 0) {
                            row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;

                        }

                    });
                    this.setState({ objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject });
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            this.state.ShipmentOrder.map((row, indexRow) => {
                if (row.IsPermission == true && row.CarrierPartnerID > 0) {
                    row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;
                }
            });
            this.setState({ objDeliverUser: value, ShipmentRouteLst: [] });
        }
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

    groupByNew(data, fields, sumBy = 'TotalCOD') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }

    checkInputName(formValidation) {
        for (const key in formValidation) {
            //      console.log("formValidation:", formValidation);

            if (formValidation[key] != undefined) {
                // console.log("validation:", key, this.elementItemRefs[key]);
                if (formValidation[key] != [] && formValidation[key].IsValidatonError) {
                    return formValidation[key].ValidationErrorMessage;
                }
            }
        }
        return "";
    }

    handleDeleteShip(e) {
        const value = e.currentTarget.dataset.id
        this.state.ShipmentOrder.splice(this.state.ShipmentOrder.findIndex(n => n.ShipmentOrderID == value), 1);
        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    }

    handleonValueChange(rowname, rowvalue, rowIndex) {

        let objDeliverUser = [];
        let { ShipmentOrder } = this.state;
        if (rowname == "ShipmentOrder_DeliverUserList") {
            let listStaffDebtObject = [];
            rowvalue && rowvalue.map((item, index) => {
                if (item.value != -1 && item.value != 0) {
                    let objShipmentOrder_DeliverUser = { UserName: item.value, FullName: item.FullName }
                    objDeliverUser.push(objShipmentOrder_DeliverUser)
                    listStaffDebtObject.push({
                        UserName: item.value,
                        StoreID: this.state.ShipmentOrder[rowIndex]["CoordinatorStoreID"]
                    });
                }
            })

            if (listStaffDebtObject) {
                this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                    if (!apiResult.IsError) {
                        ShipmentOrder[rowIndex][rowname] = objDeliverUser;
                        this.setState({ ShipmentOrder: ShipmentOrder });
                    }
                    else {
                        this.addNotification(apiResult.Message, apiResult.IsError);
                    }
                });
            }
            else {
                ShipmentOrder[rowIndex][rowname] = [];
                this.setState({ ShipmentOrder: ShipmentOrder });
            }
        }

        if (rowname == "CarrierPartnerID") {
            ShipmentOrder[rowIndex]["ShipmentOrder_DeliverUserList"] = [];
            ShipmentOrder[rowIndex][rowname] = rowvalue
            this.setState({ ShipmentOrder: ShipmentOrder });
        }

        if (rowname == "CarrierTypeID") {
            ShipmentOrder[rowIndex]["DriverUser"] = "";
            ShipmentOrder[rowIndex]["DriverUserFull"] = "";
            ShipmentOrder[rowIndex].VehicleID = -1;
            ShipmentOrder[rowIndex][rowname] = rowvalue;
            this.setState({ ShipmentOrder: ShipmentOrder });
        }

        if (rowname == "DriverUser") {
            ShipmentOrder[rowIndex][rowname] = rowvalue.value;
            ShipmentOrder[rowIndex]["DriverUserFull"] = rowvalue.FullName;
            this.setState({ ShipmentOrder: ShipmentOrder });
        }
        if (rowname == "VehicleID") {
            ShipmentOrder[rowIndex][rowname] = rowvalue
            this.setState({ ShipmentOrder: ShipmentOrder });
        }
    }

    onValueChangeComboUser(rowname, rowvalue, rowIndex) {
        console.log("onValueChangeComboUser", rowname, rowvalue, rowIndex)
    }
    // check trùng nhân viên giao hàng
    checkDeliverUser(DeliverUserLst, RowDeliverUserLst) {
        let element = [];
        let Rowelement = [];
        if (DeliverUserLst) {
            DeliverUserLst.map((item, indexRow) => {
                element.push(item.UserName)
            });
        }

        if (RowDeliverUserLst) {
            RowDeliverUserLst.map((item, indexRow) => {
                Rowelement.push(item.UserName)
            });
        }
        if (JSON.stringify(element.sort()) != JSON.stringify(Rowelement.sort())) {
            return false;
        }
        return true;
    }

    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        return timeDisplay;
    }

    handleCloseModal() {
        this.props.hideModal();
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
    handleClose() {
        if (this.props.onChangeClose != null) {
            this.props.onChangeClose();
        }
    }



    handleConfirm() {
        let elementobject = {};
        let element = [];
        let elementDeliverUserList = [];
        let elementDeliverUserFullList = [];
        this.state.ShipmentOrder.map((row, indexRow) => {
            if (this.state.objCoordinator.IsRoute == true && row.CarrierTypeID != this.state.ShipmentOrder[0].CarrierTypeID) {
                //  this.addNotification("không cùng phương tiện giao hàng", true);
                const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn phương tiện" };
                elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
                return;
            }
            if (this.state.objCoordinator.IsRoute == true) {
                if (this.checkDeliverUser(row.ShipmentOrder_DeliverUserList, this.state.ShipmentOrder[0].ShipmentOrder_DeliverUserList) == false) {
                    //   this.addNotification("không cùng nhân viên giao hàng", true);
                    const validationObject = { IsValidatonError: true, ValidationErrorMessage: "không cùng nhân viên giao hàng" };
                    elementobject = Object.assign({}, elementobject, { ["ShipmentOrder_DeliverUserList-" + indexRow]: validationObject });
                    return;
                }
            }

            if (row["CarrierTypeID"] == -1 || row["CarrierTypeID"] == "-1") {
                const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn phương tiện" };
                elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
            }
            else {
                const validationObject = { IsValidatonError: false, ValidationErrorMessage: "" };
                elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
            }
            if (row["TotalCOD"] > 0 && row["IsPaidIn"] == false) {
                row["ShipmentOrder_DeliverUserList"].map((item, indexRow) => {
                    let objMultDeliverUser = { UserName: item.UserName, CarrierTypeID: row["CarrierTypeID"], TotalCOD: row["TotalCOD"] / row["ShipmentOrder_DeliverUserList"].length }
                    element.push(objMultDeliverUser)
                    // console.log("UserName", row["ShipmentOrderID"], item.UserName, row["TotalCOD"] / row["ShipmentOrder_DeliverUserList"].length)
                });
            }

            row["ShipmentOrder_DeliverUserList"].map((item, indexRow) => {
                elementDeliverUserList.push(item.UserName)
                elementDeliverUserFullList.push(item.UserName + "-" + item.FullName)
            });

            this.state.ShipmentOrder[indexRow].IsRoute = this.state.objCoordinator.IsRoute;
            this.state.ShipmentOrder[indexRow].OrderIndex = indexRow;
            this.state.ShipmentOrder[indexRow].DeliverUserLst = elementDeliverUserList.join();
            this.state.ShipmentOrder[indexRow].DeliverUserFullNameList = elementDeliverUserFullList.join();
        });

        this.state.ShipmentOrder[0].DeliverUserTotalCODList = this.groupByNew(element, ['UserName', 'CarrierTypeID']);
        this.state.ShipmentOrder[0].ShipmentRouteID = this.state.ShipmentRouteID;
        this.setState({ FormValidation: elementobject });

        if (this.checkInputName(elementobject) != "") {
            this.addNotification(this.checkInputName(elementobject), true);
            return;
        }
        if (this.state.ShipmentRouteID != "") {
            this.props.callFetchAPI(APIHostName, 'api/ShipmentRoute/AddShipmentRouteLst', this.state.ShipmentOrder).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (this.props.onChangeValue != null)
                    this.props.onChangeValue(apiResult);
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, 'api/ShipmentRoute/AddInfoCoordinatorLst', this.state.ShipmentOrder).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (this.props.onChangeValue != null)
                    this.props.onChangeValue(apiResult);
            });
        }
    }

    handleChangeCourse = (CarrierTypeID, rowIndex) => e => {
        let { ShipmentOrder } = this.state;
        ShipmentOrder[rowIndex]["DriverUser"] = "";
        ShipmentOrder[rowIndex]["DriverUserFull"] = "";
        ShipmentOrder[rowIndex].VehicleID = -1;
        ShipmentOrder[rowIndex]['CarrierTypeID'] = CarrierTypeID;
        this.setState({ ShipmentOrder: ShipmentOrder });
    };

    handleDeleteID = (id) => e => {
        let resultRouteID = this.state.ShipmentOrder.find(n => n.ShipmentOrderID == id).ShipmentRouteID;
        this.state.ShipmentOrder.splice(this.state.ShipmentOrder.findIndex(n => n.ShipmentOrderID == id), 1);

        let resultCheckRouteID = this.state.ShipmentOrder.find(n => n.ShipmentRouteID == resultRouteID);


        if (resultRouteID == "" || resultCheckRouteID != null || this.props.ShipmentRouteID != "") {
            this.setState({
                ShipmentOrder: this.state.ShipmentOrder,
                Via_Durations: 0,
                Via_Distances: ""
            });
        }
        else {
            this.setState({
                ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteID: "",
                Via_Durations: 0,
                Via_Distances: ""
            });
        }
    };
    handleChangeOder = (rowIndex, OrderID) => e => {
        let { ShipmentOrder } = this.state;
        let totalcout = ShipmentOrder.length - 1;
        let OrderIDOlw = 0;
        let OrderIDNew = 0;
        let OrderIndexOlw = 0;
        let OrderIndexNew = 0;

        if (rowIndex == 0 && OrderID == -1) {
            OrderIDOlw = rowIndex;
            OrderIndexOlw = totalcout;
            OrderIDNew = totalcout;
            OrderIndexNew = 0
        }
        else if (rowIndex == totalcout && OrderID == 1) {
            OrderIDOlw = rowIndex;
            OrderIndexOlw = 0;
            OrderIDNew = 0;
            OrderIndexNew = totalcout
        }
        else {
            OrderIDOlw = rowIndex;
            OrderIndexOlw = rowIndex + OrderID;
            OrderIDNew = rowIndex + OrderID;
            OrderIndexNew = rowIndex - OrderID;
        }
        ShipmentOrder[OrderIDOlw]["OrderIndex"] = OrderIndexOlw;
        ShipmentOrder[OrderIDNew]["OrderIndex"] = OrderIndexNew;
        ShipmentOrder.sort((a, b) => a.OrderIndex - b.OrderIndex);
        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    };

    handleClickRoute = (RouteID) => e => {
        let { ShipmentOrder } = this.state;
        ShipmentOrder = ShipmentOrder.filter(n => n.ShipmentRouteID == "");
        this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentOrderRouteLst", RouteID).then(apiResult => {
            if (!apiResult.IsError) {

                apiResult.ResultObject.map((item) => {
                    let resultdd = ShipmentOrder.find(n => n.ShipmentOrderID == item.ShipmentOrderID)
                    // console.log("resultdd",resultdd)
                    if (resultdd == undefined)
                        ShipmentOrder.push(item);
                });
                this.setState({
                    ShipmentRouteID: RouteID, ShipmentOrder: ShipmentOrder,
                    Via_Durations: 0,
                    Via_Distances: ""
                });
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    };

    handleClickShipmentOrderSame = (ShipmentOrderID) => e => {
        let { ShipmentOrder, ShipmentOrderSameLst } = this.state;
        let resultShipmentOrderSame = ShipmentOrderSameLst.find(n => n.ShipmentOrderID == ShipmentOrderID);
        let resultdd = ShipmentOrder.find(n => n.ShipmentOrderID == ShipmentOrderID);
        if (resultdd == undefined)
            ShipmentOrder.push(resultShipmentOrderSame);
        this.setState({ ShipmentOrder: ShipmentOrder });
    };
    handleDistances = () => {
        let { ShipmentOrder, ShipmentOrderSameLst } = this.state;
        let Points = [];
        let DistancesRouteLst = [];

        ShipmentOrder.map((item, index) => {
            let strDistances = "";
            const Receivervalues = item.ReceiverGeoLocation.split(",");
            if (Receivervalues == "") {
                this.addNotification("Không xác định được tạo độ nhà vận đơn " + item.ShipmentOrderID, true);
            }

            let objReceiverPoints = {
                "Latitude": Receivervalues[0],
                "Longitude": Receivervalues[1]
            };
            if (index == 0) {
                strDistances = "Kho => " + ShipmentOrder[0].ShipmentOrderID
                const values = ShipmentOrder[0].SenderGeoLocation.split(",");
                let objPoints = {
                    "Latitude": values[0],
                    "Longitude": values[1]
                };
                Points.push(objPoints);
                DistancesRouteLst.push(strDistances);
            }

            Points.push(objReceiverPoints);
            if (index > 0 && ShipmentOrder.length - 1 > index) {
                strDistances = ShipmentOrder[index - 1].ShipmentOrderID + "=> " + item.ShipmentOrderID;
                DistancesRouteLst.push(strDistances);
            }

            if (ShipmentOrder.length - 1 == index) {
                const values = ShipmentOrder[0].SenderGeoLocation.split(",");
                strDistances = ShipmentOrder[index - 1].ShipmentOrderID + " => " + item.ShipmentOrderID;
                DistancesRouteLst.push(strDistances);
                strDistances = item.ShipmentOrderID + " => Kho";
                DistancesRouteLst.push(strDistances);
                let objPoints = {
                    "Latitude": values[0],
                    "Longitude": values[1]
                };
                Points.push(objPoints);
            }
        });

        let paramsRequest = {
            "Alternative": 2147483647,
            "Distance": true,
            "Duration": true,
            "Geometry": true,
            "Instructions": true,
            "Points": Points,
            "RouteCriteria": 0,
            "Uturn": true,
            "VehicleType": 2
        };


        let resultPoints = Points.find(n => n.Latitude == "");
        let Distances_RouteLst = [];
        if (resultPoints == undefined) {
            this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
                if (!apiResult.IsError) {
                    let Durationslst = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Durations;
                    let Distanceslst = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Distances;

                    DistancesRouteLst.map((item, index) => {
                        let ViaDistances = Distanceslst[index + 1] - Distanceslst[index];
                        let objRouteitem = { Routeitem: item, Distances: ViaDistances > 1000 ? ViaDistances / 1000 + "km" : ViaDistances + "m" }
                        Distances_RouteLst.push(objRouteitem);
                    });
                    this.setState({
                        Distances_RouteLst: Distances_RouteLst,
                        Via_Durations: Math.floor(Durationslst[Durationslst.length - 1] / 60),
                        Via_Distances: Distanceslst[Distanceslst.length - 1] >= 1000 ? Distanceslst[Distanceslst.length - 1] / 1000 + "km" : Distanceslst[Distanceslst.length - 1] + "m"
                    });
                }
            });

        }
    };

    HandleChangeGird(id) {
        if (id == 1) {
            this.setState({
                girdSlide: true
            })
        }
        else {
            let { ShipmentOrder } = this.state;
            let RowWardIDelement = [];
            ShipmentOrder.map((row, indexRow) => {
                RowWardIDelement.push(row.ReceiverWardID)
            });
            let objRouteByWard = { CoordinatorStoreID: "73309", WardIDLst: RowWardIDelement.join() }
            this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentRouteByWardID", objRouteByWard).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        girdSlide: false,
                        ShipmentRouteSameLst: apiResult.ResultObject
                    })
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });


        }
    }
    render() {
        let { ShipmentOrder, ShipmentRouteID, ShipmentOrderSameLst, ShipmentRouteLst, ShipmentRouteSameLst, Distances_RouteLst, Via_Distances, Via_Durations, girdSlide } = this.state;
        let resultShipmentRoute = ShipmentRouteLst.filter(n => n.ShipmentRouteID != ShipmentRouteID);
        let resultShipmentRouteSame = ShipmentRouteSameLst.filter(n => n.ShipmentRouteID != ShipmentRouteID);
        console.log("ShipmentOrderSameLst", ShipmentOrderSameLst)
        return (
            <React.Fragment>
                <div className="card">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card-body">
                        <div className="form-row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxPartner
                                    name="CarrierPartnerID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Đối tác:"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                    valuemember="PartnerID"
                                    nameMember="PartnerName"
                                    controltype="InputControl"
                                    onChange={this.handleOnValueChange}
                                    value={this.state.objCoordinator.CarrierPartnerID}
                                    listoption={null}
                                    datasourcemember="CarrierPartnerID"
                                    placeholder="---Vui lòng chọn---"
                                    isMultiSelect={false}
                                    disabled={!this.props.IsCoordinator}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    name="IsRoute"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Cùng tuyến"
                                    disabled={this.state.ShipmentRouteID != "" ? true : false}
                                    value={this.state.objCoordinator.IsRoute}
                                    onValueChange={this.handleOnValueChange}
                                />
                            </div>
                        </div>
                        {(this.state.objCoordinator.CarrierPartnerID == -1 || this.state.objCoordinator.CarrierPartnerID == 0) ?
                            <MultiSelectComboBox
                                name="ShipmentOrder_DeliverUserList"
                                colspan="10"
                                labelcolspan="2"
                                label="Nhân viên giao"
                                disabled={!this.props.IsUserCoordinator}
                                IsLabelDiv={true}
                                isSelectedOption={true}

                                isautoloaditemfromcache={false}
                                controltype="InputControl"
                                onChange={this.handleValueChange1}
                                value={this.state.selectedOption}
                                listoption={[]}
                                isMultiSelect={true}
                                isPartner={true}
                                datasourcemember="ShipmentOrder_DeliverUserList"
                            /> :
                            <FormControl.FormControlComboBoxUser
                                name="ShipmentOrder_DeliverUserList"
                                colspan="10"
                                labelcolspan="2"
                                label="Nhân viên giao"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                                valuemember="UserName"
                                nameMember="FullName"
                                controltype="InputControl"
                                value={this.state.objDeliverUser}
                                onValueChange={this.handleOnValueChangeDeliverUser}
                                listoption={null}
                                datasourcemember="PartnerID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={true}
                                filterValue={this.state.objCoordinator.CarrierPartnerID}
                                filterobj="PartnerID"
                                disabled={!this.props.IsCoordinator}
                            />
                        }

                        <div className="row  mt-10 lstProductSelect">
                            <div className="col-12 group-shipingorder">
                                <div className="jsgrid">
                                    <div className="jsgrid-grid-body">
                                        <table className="jsgrid-table">
                                            <tbody>
                                                {
                                                    ShipmentOrder && ShipmentOrder.map((item, index) => {
                                                        let isPermission = false;
                                                        if (item.IsPermission == false) {
                                                            isPermission = true
                                                        }

                                                        let listOption = [];
                                                        let objDeliverUser = [];
                                                        if (item.CarrierPartnerID > 0) {
                                                            item.ShipmentOrder_DeliverUserList && item.ShipmentOrder_DeliverUserList.map((item1, index) => {
                                                                objDeliverUser.push(item1.UserName)
                                                            })
                                                        }
                                                        else {
                                                            item.ShipmentOrder_DeliverUserList && item.ShipmentOrder_DeliverUserList.map((item2, index) => {
                                                                listOption.push({ value: item2.UserName, label: item2.UserName + "-" + item2.FullName, FullName: item2.FullName });
                                                            })
                                                        }

                                                        let CarrierTypeCss = "badge badge-secondary mr-10";
                                                        let CarrierTypeTruncCss = "badge badge-secondary badge-active";
                                                        if (item.CarrierTypeID == 1) {
                                                            CarrierTypeCss = "badge badge-secondary  mr-10 badge-active";
                                                            CarrierTypeTruncCss = "badge badge-secondary";
                                                        }

                                                        return (
                                                            <tr key={index} className="jsgrid-row">
                                                                <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                                </td>
                                                                <td className="jsgrid-cell group-products" style={{ width: '50%' }}>
                                                                    <ul>
                                                                        <li className="item infoOder">
                                                                            <span className="nameOrder">
                                                                                <Link
                                                                                    className="linktext blank"
                                                                                    target="_blank"
                                                                                    to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                                                                    {item.ShipmentOrderID} </Link>
                                                                            </span>
                                                                            <span className="badge badge-warning time"><i className="ti ti-timer"></i> {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}</span>
                                                                        </li>
                                                                        <li className="item infoProduict">
                                                                            <span data-tip data-for={item.ShipmentOrderID} data-id={item.ShipmentOrderID}>{item.PrimaryShipItemName}</span>
                                                                            <ReactTooltip id={item.ShipmentOrderID} type='warning'>
                                                                                <span>{item.ShipItemNameList}</span>
                                                                            </ReactTooltip>

                                                                        </li>
                                                                        <li className="item delivery-status">
                                                                            <div className="item group-status">

                                                                                {isPermission == false ? (
                                                                                    <span className={CarrierTypeCss} onClick={this.handleChangeCourse(1, index)}><i className="fa fa-motorcycle"></i> Xe máy</span>
                                                                                ) :
                                                                                    (
                                                                                        <span className={CarrierTypeCss}><i className="fa fa-motorcycle fffff"></i> Xe máy</span>
                                                                                    )
                                                                                }
                                                                                {isPermission == false ? (
                                                                                    <span className={CarrierTypeTruncCss} onClick={this.handleChangeCourse(2, index)}><i className="fa fa-truck"></i> Xe tải</span>
                                                                                ) :
                                                                                    (
                                                                                        <span className={CarrierTypeTruncCss} ><i className="fa fa-truck fff"></i> Xe tải</span>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <div className="item group-cod">
                                                                                <span className="badge badge-secondary badge-active"><i className="fa fa-dollar"></i> {formatMoney(item.TotalCOD, 0)}đ</span>
                                                                            </div>

                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                                <td className="jsgrid-cell group-controll" style={{ width: '44%' }}>
                                                                    <div className="form-row">
                                                                        <div className="form-group col-md-12">
                                                                            <ElementInputModal.ElementModalComboBox
                                                                                name="CarrierPartnerID"
                                                                                type="ComboBox"
                                                                                caption="Đối tác"
                                                                                onValueChange={this.handleonValueChange.bind(this)}
                                                                                dataSourcemember="CarrierPartnerID"
                                                                                isautoloaditemfromcache={true}
                                                                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                                                                valuemember="PartnerID"
                                                                                nameMember="PartnerName"
                                                                                rowIndex={index}
                                                                                value={item.CarrierPartnerID}
                                                                                listoption={null}
                                                                                filterValue="2"
                                                                                filterobj="PartnerTypeID"
                                                                                placeholder="---Chọn đối tác---"
                                                                                isMultiSelect={false}
                                                                                disabled={isPermission}
                                                                            />
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-row">
                                                                        <div className="form-group col-md-12">
                                                                            {item.CarrierPartnerID > 0 ?
                                                                                (
                                                                                    <ElementInputModal.ElementModalComboBox
                                                                                        name="ShipmentOrder_DeliverUserList"
                                                                                        type="ComboUserBox"
                                                                                        caption="Nhân viên giao nhận"
                                                                                        dataSourcemember="ShipmentOrder_DeliverUserList"
                                                                                        isautoloaditemfromcache={true}
                                                                                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                                                                                        valuemember="UserName"
                                                                                        nameMember="FullName"
                                                                                        isselectedOp={true}
                                                                                        value={objDeliverUser}
                                                                                        rowIndex={index}
                                                                                        listoption={null}
                                                                                        onValueChange={this.handleonValueChange.bind(this)}
                                                                                        placeholder="---Nhân viên giao nhận---"
                                                                                        isMultiSelect={true}
                                                                                        disabled={isPermission}
                                                                                        isPartner={true}
                                                                                        filterValue={item.CarrierPartnerID}
                                                                                        filterobj="PartnerID"
                                                                                        filterrest="CarrierPartnerID"
                                                                                    />
                                                                                ) :
                                                                                (
                                                                                    <ElementInputModal.MultiUserComboBox
                                                                                        name="ShipmentOrder_DeliverUserList"
                                                                                        type="ComboUserBox"
                                                                                        caption="Nhân viên giao nhận"
                                                                                        dataSourcemember="ShipmentOrder_DeliverUserList"
                                                                                        isautoloaditemfromcache={false}
                                                                                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                                                                                        valuemember="UserName"
                                                                                        nameMember="FullName"
                                                                                        rowIndex={index}
                                                                                        listoption={listOption}
                                                                                        value={listOption}
                                                                                        onValueChange={this.handleonValueChange.bind(this)}
                                                                                        placeholder="---Nhân viên giao nhận---"
                                                                                        isMultiSelect={true}
                                                                                        disabled={isPermission}
                                                                                        isPartner={true}
                                                                                        filterValue="-1"
                                                                                        filterobj="PartnerID"
                                                                                        filterrest="CarrierPartnerID"
                                                                                    />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="jsgrid-cell " style={{ width: '5%' }}>
                                                                    <div className="group-action">
                                                                        {ShipmentOrder.length > 1 ?
                                                                            (
                                                                                <a onClick={this.handleChangeOder(index, -1)} className="table-action hover-danger item-action">
                                                                                    <i className="ti-angle-up"></i>
                                                                                </a>
                                                                            ) :
                                                                            ""
                                                                        }
                                                                        {isPermission == false ?
                                                                            (<a titel="Bạn không có quyền thao tác" onClick={this.handleDeleteID(item.ShipmentOrderID)} className="table-action hover-danger item-action">
                                                                                <i className="ti-trash"></i>
                                                                            </a>) :
                                                                            ""
                                                                        }
                                                                        {ShipmentOrder.length > 1 ?
                                                                            (
                                                                                <a onClick={this.handleChangeOder(index, 1)} className="table-action hover-danger item-action">
                                                                                    <i className="ti-angle-down"></i>
                                                                                </a>
                                                                            ) :
                                                                            ""
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row  mt-10 lstProduct">
                            <div className="col-12 ">
                                <div className="pull-left group-info-Route">
                                    <ul>
                                        {ShipmentRouteID != "" ? (
                                            <li>
                                                <span>Mã tuyến: <span className="fw-600">{ShipmentRouteID}</span> <button className="btn-close"><i className="ti-close"></i></button></span>
                                            </li>
                                        ) : ""}

                                        {Via_Distances != "" ? (
                                            <React.Fragment>
                                                <li className="kmestimates">
                                                    <span>Km ước lượng:
                                                        <span data-tip data-for="Distances" data-id="Distances" className="numkm fw-600">{Via_Distances}</span>
                                                        <ReactTooltip id="Distances" type='warning' className="title-tooltip-estimates">
                                                            {Distances_RouteLst && Distances_RouteLst.map((item, index) => {
                                                                return (
                                                                    <span>{item.Routeitem} : {item.Distances}</span>
                                                                )
                                                            })
                                                            }
                                                        </ReactTooltip>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>di chuyển: <span className="fw-600">{Via_Durations}'</span></span>
                                                </li>
                                            </React.Fragment>

                                        ) : ""}
                                    </ul>
                                </div>
                                <div className="nav-group-action">
                                    {ShipmentOrder.length > 1 ?
                                        (
                                            <button className="btn btn-w-md btn-round btn-info" type="button" onClick={this.handleDistances.bind(this)}>Tính khoản cách</button>
                                        ) : ""
                                    }
                                    <button type="button" onClick={() => this.HandleChangeGird(1)}><i className="ti-menu-alt"></i></button>
                                    <button type="button" onClick={() => this.HandleChangeGird(2)}><i className="ti-menu"></i></button>
                                </div>

                            </div>
                            {(() => {
                                if (resultShipmentRoute.length > 0) {
                                    return (
                                        <div className="col-12">
                                            <Slide easing="ease" slidesToShow={resultShipmentRoute.length >= 3 ? 2 : 2} slidesToScroll={1} autoplay={false} cssClass="slide-product">
                                                {resultShipmentRoute.map((item, index) => {
                                                    return (
                                                        <div key={"Route" + index} className="col-md-6 col-lg-4 each-slide">
                                                            <div className="card card-secondary">
                                                                <div className="card-body">
                                                                    <ul onClick={this.handleClickRoute(item.ShipmentRouteID)} >
                                                                        <li className="item infoOder">
                                                                            <span className="nameOrder">
                                                                                <a>{item.ShipmentRouteID}</a>
                                                                            </span>
                                                                            <span className="badge badge-warning time"><i className="ti ti-timer"></i> {item.ExpectedBeginDeliveryDate != null ? this._genCommentTime(item.ExpectedBeginDeliveryDate) : ""}</span>
                                                                        </li>
                                                                        <li className="item infoProduict">
                                                                            <span>{item.DeliverUserFullNameList}</span>
                                                                        </li>
                                                                        <li className="item address-customer">
                                                                            <span className="title" data-tip data-for={item.ShipmentRouteID} data-id={item.ShipmentRouteID} >{item.RouteNote.split(';')[0]}</span>
                                                                            <ReactTooltip id={item.ShipmentRouteID} type='warning' className="title-tooltip-estimates">
                                                                                <span>{item.RouteNote}</span>
                                                                            </ReactTooltip>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </Slide>
                                        </div>
                                    )
                                } else if (resultShipmentRouteSame.length > 0 && girdSlide == false) {
                                    return (
                                        <div className="col-12">
                                            <Slide easing="ease" slidesToShow={resultShipmentRouteSame.length >= 3 ? 2 : 2} slidesToScroll={1} autoplay={false} cssClass="slide-product">
                                                {resultShipmentRouteSame.map((item, index) => {
                                                    return (
                                                        <div key={"Route" + index} className="col-md-6 col-lg-4 each-slide">
                                                            <div className="card card-secondary">
                                                                <div className="card-body">
                                                                    <ul onClick={this.handleClickRoute(item.ShipmentRouteID)} >
                                                                        <li className="item infoOder">
                                                                            <span className="nameOrder">
                                                                                <a>{item.ShipmentRouteID}</a>
                                                                            </span>
                                                                            <span className="badge badge-warning time"><i className="ti ti-timer"></i> {item.ExpectedBeginDeliveryDate != null ? this._genCommentTime(item.ExpectedBeginDeliveryDate) : ""}</span>
                                                                        </li>
                                                                        <li className="item infoProduict">
                                                                            <span >{item.DeliverUserFullNameList}</span>
                                                                        </li>
                                                                        <li className="item address-customer">
                                                                            <span data-tip data-for={item.ShipmentRouteID} data-id={item.ShipmentRouteID} >{item.RouteNote.split(';')[0]}</span>
                                                                            <ReactTooltip id={item.ShipmentRouteID} type='warning' className="title-tooltip-estimates">
                                                                                <span>{item.RouteNote}</span>
                                                                            </ReactTooltip>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </Slide>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="col-12">
                                            <Slide easing="ease" slidesToShow={ShipmentOrderSameLst.length >= 3 ? 2 : 2} slidesToScroll={1} autoplay={false} cssClass="slide-product">
                                                {ShipmentOrderSameLst.map((item, index) => {
                                                    let resultdd = ShipmentOrder.find(n => n.ShipmentOrderID == item.ShipmentOrderID)
                                                    if (resultdd == undefined) {
                                                        return (
                                                            <div key={"Same" + index} className="col-md-6 col-lg-4 each-slide">
                                                                <div className="card card-secondary">
                                                                    <div className="card-body">
                                                                        <ul onClick={this.handleClickShipmentOrderSame(item.ShipmentOrderID)} >
                                                                            <li className="item infoOder">
                                                                                <span className="nameOrder">
                                                                                    <Link
                                                                                        className="linktext blank"
                                                                                        target="_blank"
                                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                                                                        {item.ShipmentOrderID} </Link>
                                                                                </span>
                                                                                <span className="badge badge-warning time"><i className="ti ti-timer"></i> {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}</span>
                                                                            </li>
                                                                            <li className="item infoProduict">
                                                                                <span data-tip data-for={item.ShipmentOrderID} data-id={item.ShipmentOrderID}>{item.PrimaryShipItemName}</span>
                                                                                <ReactTooltip id={item.ShipmentOrderID} type='warning' className="title-tooltip" place="right">
                                                                                    <span>{item.ShipItemNameList}</span>
                                                                                </ReactTooltip>

                                                                            </li>
                                                                            <li className="item address-customer">
                                                                                <span>{item.ReceiverFullAddress}</span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </Slide>
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                </div>
                <div className="modal-footer modal-footer-center">
                    <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose.bind(this)}>Làm mới</button>
                    <button className="btn btn-w-md btn-round btn-info ml-10" type="button" onClick={this.handleConfirm.bind(this)}>Cập nhật</button>
                </div>
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
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const ListShipCoordinator = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorCom);
export default ListShipCoordinator;