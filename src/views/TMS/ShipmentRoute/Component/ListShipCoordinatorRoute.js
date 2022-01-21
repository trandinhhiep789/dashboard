import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from "../../../../actions/modal";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import ElementInputModal from "../../../../common/components/FormContainer/FormElement/ElementInputModal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import { formatMoney, formatNumber } from "../../../../utils/function";
import { APIHostName } from "../constants";
import { Input } from "antd";

class ListShipCoordinatorRouteCom extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange1 = this.handleValueChange1.bind(this);
    this.handleOnValueChange = this.handleOnValueChange.bind(this);
    this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.HandleChangeGird = this.HandleChangeGird.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleOnValueChangeselectedOp = this.handleOnValueChangeselectedOp.bind(this);
    this.handleOnValueChangeVehicleDriverUser = this.handleOnValueChangeVehicleDriverUser.bind(this);
    this.handleOnValueChangeRentalType = this.handleOnValueChangeRentalType.bind(this);
    this.state = {
      ShipmentOrder: this.props.InfoCoordinator,
      objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1, RentalTypeID: -1, IsRoute: true, VehicleID: -1, VehicleDriverUser: {} },
      VehicleLst: [],
      preVehicleLst: [],
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
      girdSlide: false,
      objectDescription: {}
    };
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount() {
    // console.log(this.props.ShipmentRouteID);

    this.handleMapObjectDescription();

    const isBelowThreshold = (currentValue) => currentValue.CarrierTypeID == 2;
    let isShow = this.props.InfoCoordinator.every(isBelowThreshold);

    let objVehicleLst = [];
    let objInfoCoordinator = {};
    let listOption = [];
    let listOptionUser = [];
    let objDeliverUser = [];
    if (isShow == true) {
      this.props.InfoCoordinator.sort(function (a, b) {
        return new Date(a.ExpectedDeliveryDate) - new Date(b.ExpectedDeliveryDate);
      });

      let objRouteVehicleRequset = {
        VehicleID: 1,
        ExpectedDeliveryDate: this.props.InfoCoordinator[0].ExpectedDeliveryDate,
        CoordinatorStoreIDLst: this.props.InfoCoordinator.map((e) => e.CoordinatorStoreID).join(","),
        ShipmentOrderIDLst: this.props.InfoCoordinator.map((e) => e.ShipmentOrderID).join(","),
      };

      objVehicleLst = this.getinitVehicellst(objRouteVehicleRequset);

      document.getElementsByClassName("car-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("car-menu")[0].style.color = "#fff";
      document.getElementsByClassName("motobike-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#616a78";
    } else {
      document.getElementsByClassName("motobike-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#fff";
      document.getElementsByClassName("car-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("car-menu")[0].style.color = "#616a78";
    }
    this.props.callGetUserCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
      result.ResultObject.CacheData.map((cacheItem) => {
        listOptionUser.push({ value: cacheItem.UserName, label: cacheItem.UserName + "-" + cacheItem.FullName, name: cacheItem.FullName });
      });
      this.setState({ listAllUser: listOptionUser });
    });

    let objRoute = this.props.InfoCoordinator.find((n) => n.ShipmentRouteID == this.props.ShipmentRouteID);

    if (objRoute != undefined) {
      if (objRoute != "") {
        objInfoCoordinator = {
          CarrierPartnerID: objRoute.CarrierPartnerID,
          CarrierTypeID: objRoute.CarrierTypeID,
          IsRoute: true,
          VehicleID: objRoute.VehicleID == 0 ? -1 : objRoute.VehicleID,
          VehicleDriverUser: {
            value: objRoute.DriverUser == "" ? -1 : objRoute.DriverUser,
            label: objRoute.DriverUser == "" || objRoute.DriverUserFull == "" ? objRoute.DriverUser + "-" + objRoute.DriverUserFull : "",
          },
          RentalTypeID: objRoute.RentalTypeID
        };
        // objInfoCoordinator = {
        //   CarrierPartnerID: objRoute.CarrierPartnerID,
        //   CarrierTypeID: objRoute.CarrierTypeID,
        //   IsRoute: true,
        //   VehicleID: objRoute.VehicleID,
        // };
      } else {
        objInfoCoordinator = {
          CarrierPartnerID: objRoute.CarrierPartnerID,
          CarrierTypeID: objRoute.CarrierTypeID,
          IsRoute: true,
          VehicleID: objRoute.VehicleID == 0 ? -1 : objRoute.VehicleID,
          VehicleDriverUser: {},
          RentalTypeID: objRoute.RentalTypeID
        };
      }

      if (objRoute.CarrierPartnerID > 0) {
        objRoute.ShipmentOrder_DeliverUserList &&
          objRoute.ShipmentOrder_DeliverUserList.map((item1, index) => {
            objDeliverUser.push(item1.UserName);
          });
      } else {
        objRoute.ShipmentOrder_DeliverUserList &&
          objRoute.ShipmentOrder_DeliverUserList.map((item2, index) => {
            listOption.push({ value: item2.UserName, label: item2.UserName + "-" + item2.FullName, FullName: item2.FullName });
          });
      }
    }

    this.setState({
      objCoordinator: objInfoCoordinator,
      VehicleLst: objVehicleLst,
      selectedOption: listOption,
      objDeliverUser: objDeliverUser,
      listAllUser: listOptionUser,
    });
  }

  getinitVehicellst(objRouteVehicleRequset) {
    let objVehicleLst = [];
    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetVehicleWorkingPlan", objRouteVehicleRequset).then((apiResult) => {
      if (!apiResult.IsError) {
        apiResult.ResultObject.map((item) => {
          if ((item.Volume > item.TotalVolume + item.TotalShipmentVolume && item.Weight >= item.TotalWeight + item.TotalShipmentWeight) || item.VehicleID == this.state.objCoordinator.VehicleID) {
            var m3 = item.Volume - (item.TotalVolume + item.TotalShipmentVolume);

            let objVehicle = {
              value: item.VehicleID,
              label: item.VehicleID + "-" + item.LicenSeplateNumber + " (" + m3.toFixed(3) + " m3)",
              MainDriverUser: item.MainDriverUser,
              MainDriverUserFullName: item.MainDriverUserFullName,
              TotalVolume: item.TotalVolume,
              TotalShipmentVolume: item.TotalShipmentVolume,
              TotalAbilityVolume: item.TotalAbilityVolume,
              OrderM3: parseFloat(m3.toFixed(3)),
              RentalTypeID: item.RentalTypeID
            };
            objVehicleLst.push(objVehicle);
          }
        });

        if (this.props.InfoCoordinator[0].VehicleID) {
          let vehicleID = this.props.InfoCoordinator[0].VehicleID;
          if (vehicleID !== 0 && vehicleID !== -1) {
            let vehicle = objVehicleLst.find((x) => x.value === vehicleID);
            if (vehicle && vehicle.TotalAbilityVolume >= vehicle.TotalShipmentVolume + vehicle.TotalVolume) {
              this.addNotification(
                "Tổng thể tích tối thiểu cần cho xe tải là " + vehicle.TotalAbilityVolume + " Hiện tại chỉ có " + (vehicle.TotalShipmentVolume + vehicle.TotalVolume),
                true,
                false,
                "rgb(255, 184, 24)",
                "rgb(186, 101, 8)"
              );
            }
          }
        }

        let objRoute = this.props.InfoCoordinator.find((n) => n.ShipmentRouteID == this.props.ShipmentRouteID);

        const objVehicle = objRoute && objVehicleLst.find((x) => x.value === objRoute.VehicleID);

        let objInfoCoordinator = this.state.objCoordinator;
        if (objVehicle) {
          objInfoCoordinator = {
            ...objInfoCoordinator,
            VehicleDriverUser: { value: objVehicle.MainDriverUser, label: objVehicle.MainDriverUser + "-" + objVehicle.MainDriverUserFullName },
          };
        } else {
          objInfoCoordinator = {
            ...objInfoCoordinator,
            VehicleDriverUser: { value: -1, label: "" },
          };
        }
        objVehicleLst.sort(function (a, b) {
          return a.OrderM3 - b.OrderM3;
        });

        if (objInfoCoordinator.RentalTypeID == -1) {
          objVehicleLst = objVehicleLst.filter(item => item.RentalTypeID == objInfoCoordinator.RentalTypeID);
        }

        this.setState({
          objCoordinator: objInfoCoordinator,
          VehicleLst: objVehicleLst,
          preVehicleLst: objVehicleLst,
        });
      }
    });
    return objVehicleLst;
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.InfoCoordinator) !== JSON.stringify(nextProps.InfoCoordinator)) {
      this.setState({
        ShipmentOrder: nextProps.InfoCoordinator,
        ShipmentOrderSameLst: nextProps.ShipmentOrderSame,
        Via_Durations: 0,
        Via_Distances: "",
      });
    }
  }

  handleMapObjectDescription = () => {
    const objectDescription = this.props.InfoCoordinator.reduce((a, v) => {
      return {
        ...a,
        [v.ShipmentOrderID]: {
          isShow: false,
          content: v.CoordinatorNote,
        },
      };
    }, {});
    this.setState({ objectDescription: objectDescription });
  };

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
    // else if(name=="VehicleID"){
    //     let { objCoordinator} = this.state;
    //     objCoordinator[name] = value;
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
      ShipmentOrder: this.state.ShipmentOrder,
    });
  }

  handleOnValueChangeRentalType(name, value) {
    // console.log(name, value);
    if (value != -1) {
      this.setState({
        objCoordinator: { ...this.state.objCoordinator, RentalTypeID: value, VehicleID: "", VehicleDriverUser: "" }
      });
      let listVehicleID = []
      if (this.state.preVehicleLst.length > 0) {
        try {
          this.props.callFetchAPI(APIHostName, "api/VehicleRentalRequest/LoadByRentalTypeID", value).then(apiResult => {
            apiResult.ResultObject.map((item, i, row) => {
              if (i + 1 === row.length) {
                // Last one.
                listVehicleID.push(item.VehicleID)

                // filter listVehicleID array unique
                var newArr = []
                for (var i = 0; i < listVehicleID.length; i++) {
                  if (newArr.indexOf(listVehicleID[i]) === -1) {
                    newArr.push(listVehicleID[i])
                  }
                }
                listVehicleID = newArr
                // console.log(listVehicleID)


                var IdVehicleLst = []
                const objVehicleLstFilter = [...this.state.preVehicleLst]
                objVehicleLstFilter.map((item, i, row) => {
                  if (i + 1 === row.length) {
                    // Last one.
                    IdVehicleLst.push(item.value)
                    const listId = listVehicleID.filter(value => IdVehicleLst.includes(value))

                    let objVehicleLst = objVehicleLstFilter.filter(function (obj) {
                      return (listId.includes(obj.value) === true)
                    });
                    this.setState({ VehicleLst: objVehicleLst })
                    // console.log("objVehicleLst: ", objVehicleLst)
                    // console.log("this.state.VehicleLst: ", this.state.VehicleLst)
                  } else {
                    // Not last one.
                    IdVehicleLst.push(item.value)
                  }
                })
              } else {
                listVehicleID.push(item.VehicleID)
              }
            })
          })
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      this.setState({
        objCoordinator: { ...this.state.objCoordinator, RentalTypeID: value, VehicleID: "", VehicleDriverUser: "" }
      });
      this.setState({ VehicleLst: [...this.state.preVehicleLst] })
    }
  }

  handleOnValueChangeselectedOp(name, selectedOption) {
    let { objCoordinator, ShipmentOrder } = this.state;

    if (selectedOption.TotalAbilityVolume >= selectedOption.TotalShipmentVolume + selectedOption.TotalVolume) {
      this.addNotification(
        "Tổng thể tích tối thiểu cần cho xe tải là " + selectedOption.TotalAbilityVolume + " Hiện tại chỉ có " + (selectedOption.TotalShipmentVolume + selectedOption.TotalVolume),
        true,
        false,
        "rgb(255, 184, 24)",
        "rgb(186, 101, 8)"
      );
    }

    objCoordinator[name] = selectedOption.value;
    if (selectedOption.MainDriverUser != "") {
      objCoordinator["VehicleDriverUser"] = { value: selectedOption.MainDriverUser, label: selectedOption.MainDriverUser + "-" + selectedOption.MainDriverUserFullName };
    } else {
      objCoordinator["VehicleDriverUser"] = "";
    }

    ShipmentOrder.map((row, indexRow) => {
      if (row.IsPermission == true) {
        row["VehicleDriverUser"] = selectedOption.MainDriverUser;
        row["VehicleID"] = selectedOption.value;
      }
    });

    objCoordinator.RentalTypeID = selectedOption.RentalTypeID;

    this.setState({
      objCoordinator: objCoordinator,
      ShipmentOrder: ShipmentOrder,
    });
  }

  handleValueChange1(e, selectedOption1, CarrierPartnerID) {
    // console.log("handleValueChange1_CarrierPartnerID", CarrierPartnerID);

    let objDeliverUser = [];
    let listStaffDebtObject = [];
    selectedOption1 &&
      selectedOption1.map((item, index) => {
        let objShip_DeliverUser = { UserName: item.value, FullName: item.FullName };
        objDeliverUser.push(objShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.value,
          StoreID: this.state.ShipmentOrder.length > 0 ? this.state.ShipmentOrder[0].CoordinatorStoreID : 0,
        });
      });

    if (selectedOption1) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.ShipmentOrder.map((row, indexRow) => {
            if (CarrierPartnerID) {
              // console.log("OKKKKKKKKKKK");
              if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true) {
                row["ShipmentOrder_DeliverUserList"] = objDeliverUser || [];
                row["CarrierPartnerID"] = CarrierPartnerID;
              }
            } else {
              if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true && row.CarrierPartnerID <= 0) {
                row["ShipmentOrder_DeliverUserList"] = objDeliverUser || [];
              }
            }
          });

          this.setState({ selectedOption: selectedOption1, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject });
        } else {
          this.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.state.ShipmentOrder.map((row, indexRow) => {
        if (row.IsPermission == true) {
          row["ShipmentOrder_DeliverUserList"] = objDeliverUser || [];
        }
      });
      this.setState({ selectedOption: selectedOption1, ShipmentRouteLst: [] });
    }
  }

  handleOnValueChangeDeliverUser(name, value, selectedOption, CarrierPartnerID) {
    let objMultiDeliverUser = [];
    let listStaffDebtObject = [];

    // console.log(value, selectedOption, CarrierPartnerID);

    selectedOption &&
      selectedOption.map((item, index) => {
        let objMultiShip_DeliverUser = { UserName: item.value, FullName: item.name };
        objMultiDeliverUser.push(objMultiShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.value,
          StoreID: this.state.ShipmentOrder[0].CoordinatorStoreID,
        });
      });

    if (selectedOption) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.ShipmentOrder.map((row, indexRow) => {
            if (CarrierPartnerID) {
              if (row.IsPermission == true) {
                row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser || [];
                row["CarrierPartnerID"] = CarrierPartnerID;
              }
            } else {
              if (row.IsPermission == true && row.CarrierPartnerID > 0) {
                row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser || [];
              }
            }
          });
          this.setState({ objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject });
        } else {
          this.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.state.ShipmentOrder.map((row, indexRow) => {
        if (row.IsPermission == true && row.CarrierPartnerID > 0) {
          row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser || [];
        }
      });
      this.setState({ objDeliverUser: value, ShipmentRouteLst: [] });
    }
  }

  handleOnValueChangeVehicleDriverUser(name, value, selectedOption) { }

  //thông báo
  handleCloseMessage() {
    if (!this.state.IsCallAPIError) {
      if (this.props.onChangeValue != null) this.props.onChangeValue();
    }
  }

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
  }

  handleCloseModal() {
    this.props.hideModal();
  }

  addNotification(message1, isError, isDefault = true, color = "#ba6508", borderLeftColor = "#d49a5b") {
    let cssNotification, iconNotification;
    if (!isError) {
      cssNotification = "notification-custom-success";
      iconNotification = "fa fa-check";
    } else {
      cssNotification = "notification-danger";
      iconNotification = "fa fa-exclamation";
    }
    this.notificationDOMRef.current.addNotification({
      container: "bottom-right",
      content: (
        <div className={cssNotification} style={{ background: !isDefault ? color : "", borderLeft: !isDefault ? borderLeftColor : "" }}>
          <div className="notification-custom-icon">
            <i className={iconNotification} />
          </div>
          <div className="notification-custom-content">
            <div className="notification-close">
              <span>×</span>
            </div>
            <h4 className="notification-title">Thông Báo</h4>
            <p className="notification-message">{ReactHtmlParser(message1)}</p>
          </div>
        </div>
      ),
      dismiss: { duration: 4000 },
      dismissable: { click: true },
    });
  }

  handleClose() {
    if (this.props.onChangeClose != null) {
      this.props.onChangeClose();
    }
  }
  //End thông báo

  groupByNew(data, fields, sumBy = "TotalCOD") {
    let r = [],
      cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
    data.forEach((x) => {
      let y = r.find((z) => cmp(x, z));
      let w = [...fields, sumBy].reduce((a, b) => ((a[b] = x[b]), a), {});
      y ? (y[sumBy] = +y[sumBy] + +x[sumBy]) : r.push(w);
    });
    return r;
  }

  checkInputName(formValidation) {
    for (const key in formValidation) {
      if (formValidation[key] != undefined) {
        if (formValidation[key] != [] && formValidation[key].IsValidatonError) {
          return formValidation[key].ValidationErrorMessage;
        }
      }
    }
    return "";
  }

  handleDeleteShip(e) {
    const value = e.currentTarget.dataset.id;
    this.state.ShipmentOrder.splice(
      this.state.ShipmentOrder.findIndex((n) => n.ShipmentOrderID == value),
      1
    );
    this.setState({ ShipmentOrder: this.state.ShipmentOrder });
  }

  handleonValueChange(rowname, rowvalue, rowIndex) {
    let objDeliverUser = [];
    let { ShipmentOrder } = this.state;
    if (rowname == "ShipmentOrder_DeliverUserList") {
      let listStaffDebtObject = [];
      rowvalue &&
        rowvalue.map((item, index) => {
          if (item.value != -1 && item.value != 0) {
            let objShipmentOrder_DeliverUser = { UserName: item.value, FullName: item.FullName };
            objDeliverUser.push(objShipmentOrder_DeliverUser);
            listStaffDebtObject.push({
              UserName: item.value,
              StoreID: this.state.ShipmentOrder[rowIndex]["CoordinatorStoreID"],
            });
          }
        });

      if (listStaffDebtObject) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
          if (!apiResult.IsError) {
            ShipmentOrder[rowIndex][rowname] = objDeliverUser;
            this.setState({ ShipmentOrder: ShipmentOrder });
          } else {
            this.addNotification(apiResult.Message, apiResult.IsError);
          }
        });
      } else {
        ShipmentOrder[rowIndex][rowname] = [];
        this.setState({ ShipmentOrder: ShipmentOrder });
      }
    }

    if (rowname == "CarrierPartnerID") {
      ShipmentOrder[rowIndex]["ShipmentOrder_DeliverUserList"] = [];
      ShipmentOrder[rowIndex][rowname] = rowvalue;
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
      ShipmentOrder[rowIndex][rowname] = rowvalue;
      this.setState({ ShipmentOrder: ShipmentOrder });
    }
  }

  onValueChangeComboUser(rowname, rowvalue, rowIndex) {
    // console.log("onValueChangeComboUser", rowname, rowvalue, rowIndex);
  }

  handleGetUserAll_1 = (listOption, CarrierPartnerID) => {
    let valuede = listOption ? listOption.map((e) => (e.value != "" && e.name != "" ? e.value : "")).filter((x) => x != "") : [];
    this.handleOnValueChange("CarrierPartnerID", CarrierPartnerID);
    this.handleOnValueChangeDeliverUser("ShipmentOrder_DeliverUserList", valuede, listOption, CarrierPartnerID);
    var stateint = this.state.objCoordinator;
    this.setState(...stateint, { CarrierTypeID: CarrierPartnerID });
  };

  handleGetUserAll_2 = (listOption, CarrierPartnerID) => {
    this.handleOnValueChange("CarrierPartnerID", CarrierPartnerID);

    this.handleValueChange1("ShipmentOrder_DeliverUserList", listOption, CarrierPartnerID);
    var stateint = this.state.objCoordinator;
    this.setState(...stateint, { CarrierTypeID: CarrierPartnerID });
  };

  // check trùng nhân viên giao hàng

  checkDeliverUser(DeliverUserLst, RowDeliverUserLst) {
    let element = [];
    let Rowelement = [];
    if (DeliverUserLst) {
      DeliverUserLst.map((item, indexRow) => {
        element.push(item.UserName);
      });
    }

    if (RowDeliverUserLst) {
      RowDeliverUserLst.map((item, indexRow) => {
        Rowelement.push(item.UserName);
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
    let timeDisplay = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
    return timeDisplay;
  }

  handleConfirm() {
    let elementobject = {};
    let element = [];
    let elementDeliverUserList = [];
    let elementDeliverUserFullList = [];
    this.state.ShipmentOrder.map((row, indexRow) => {
      if (this.state.objCoordinator.IsRoute == true && row.CarrierTypeID != this.state.ShipmentOrder[0].CarrierTypeID) {
        //  this.addNotification("không cùng phương tiện giao hàng", true);
        const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn lại, bắt buộc cùng loại phương tiện trong một tuyến." };
        elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
        return;
      }

      if (this.state.objCoordinator.IsRoute == true) {
        if (this.checkDeliverUser(row.ShipmentOrder_DeliverUserList, this.state.ShipmentOrder[0].ShipmentOrder_DeliverUserList) == false) {
          //   this.addNotification("không cùng nhân viên giao hàng", true);
          const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn lại, bắt buộc cùng nhân viên giao hàng trong một tuyến." };
          elementobject = Object.assign({}, elementobject, { ["ShipmentOrder_DeliverUserList-" + indexRow]: validationObject });
          return;
        }
      }

      if (row["CarrierTypeID"] == -1 || row["CarrierTypeID"] == "-1") {
        const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn phương tiện" };
        elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
      } else {
        const validationObject = { IsValidatonError: false, ValidationErrorMessage: "" };
        elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
      }

      if (row["TotalCOD"] > 0 && row["IsPaidIn"] == false) {
        if (Array.isArray(row["ShipmentOrder_DeliverUserList"])) {
          row["ShipmentOrder_DeliverUserList"].map((item, indexRow) => {
            if (row["ShipmentOrder_DeliverUserList"][indexRow] !== row["ShipmentOrder_DeliverUserList"][indexRow - 1]) {
              let objMultDeliverUser = { UserName: item.UserName, CarrierTypeID: row["CarrierTypeID"], TotalCOD: row["TotalCOD"] / row["ShipmentOrder_DeliverUserList"].length };
              element.push(objMultDeliverUser);
            }
          });
        }
      }

      if (row.CarrierTypeID === 2) {
        if (row.VehicleID === 0 || row.VehicleID === -1) {
          const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn xe tải" };
          elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
          return;
        }
      }
      if (Array.isArray(row["ShipmentOrder_DeliverUserList"])) {
        row["ShipmentOrder_DeliverUserList"].map((item, indexRow) => {
          if (row["ShipmentOrder_DeliverUserList"][indexRow] !== row["ShipmentOrder_DeliverUserList"][indexRow - 1]) {
            elementDeliverUserList.push(item.UserName);
            elementDeliverUserFullList.push(item.UserName + "-" + item.FullName);
          }
        });
      }

      this.state.ShipmentOrder[indexRow].IsRoute = this.state.objCoordinator.IsRoute;
      this.state.ShipmentOrder[indexRow].OrderIndex = indexRow;
      this.state.ShipmentOrder[indexRow].DeliverUserLst = elementDeliverUserList.join();
      this.state.ShipmentOrder[indexRow].DeliverUserFullNameList = elementDeliverUserFullList.join();
      if (this.state.objCoordinator.VehicleDriverUser.value) {
        this.state.ShipmentOrder[indexRow].DriverUser = this.state.objCoordinator.VehicleDriverUser.value;
      }
      this.state.ShipmentOrder[indexRow].VehicleID = this.state.objCoordinator.VehicleID;
      this.state.ShipmentOrder[indexRow].CoordinatorNote = this.state.objectDescription[row.ShipmentOrderID]["content"];
      elementDeliverUserList = [];
      elementDeliverUserFullList = [];
    });

    if (this.state.ShipmentOrder.length > 0) {
      this.state.ShipmentOrder[0].DeliverUserTotalCODList = this.groupByNew(element, ["UserName", "CarrierTypeID"]);
      this.state.ShipmentOrder[0].ShipmentRouteID = this.state.ShipmentRouteID;
    }
    this.setState({ FormValidation: elementobject });

    if (this.checkInputName(elementobject) != "") {
      this.addNotification(this.checkInputName(elementobject), true);
      return;
    }

    if (this.state.ShipmentRouteID != "") {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddShipmentRouteLstNew", this.state.ShipmentOrder).then((apiResult) => {
        this.addNotification(apiResult.Message, apiResult.IsError);
        if (this.props.onChangeValue != null) this.props.onChangeValue(apiResult);
      });
    } else {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddInfoCoordinatorLstNew", this.state.ShipmentOrder).then((apiResult) => {
        this.addNotification(apiResult.Message, apiResult.IsError);
        if (this.props.onChangeValue != null) this.props.onChangeValue(apiResult);
      });
    }
  }

  handleChangeCourseALL = (CarrierTypeID) => (e) => {
    let changeState = this.state;

    if (CarrierTypeID == 1) {
      document.getElementsByClassName("motobike-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#fff";
      document.getElementsByClassName("car-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("car-menu")[0].style.color = "#616a78";

      changeState["ShipmentOrder"].map((item, index) => {
        changeState["ShipmentOrder"][index]["DriverUser"] = "";
        changeState["ShipmentOrder"][index]["DriverUserFull"] = "";
        changeState["ShipmentOrder"][index]["VehicleID"] = -1;
        changeState["ShipmentOrder"][index]["CarrierTypeID"] = CarrierTypeID;
      });

      let objCoordinator = changeState["objCoordinator"];
      objCoordinator = { ...objCoordinator, CarrierTypeID: 1, IsRoute: true, VehicleID: -1, VehicleDriverUser: {} };
      changeState = { ...changeState, VehicleLst: [], objCoordinator: objCoordinator };
      this.setState(changeState);
    } else {
      document.getElementsByClassName("car-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("car-menu")[0].style.color = "#fff";
      document.getElementsByClassName("motobike-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#616a78";

      changeState["ShipmentOrder"].map((item, index) => {
        if (item.CarrierTypeID == 1) {
          changeState["ShipmentOrder"][index]["DriverUser"] = "";
          changeState["ShipmentOrder"][index]["DriverUserFull"] = "";
          changeState["ShipmentOrder"][index]["VehicleID"] = changeState["objCoordinator"]["VehicleID"];
          changeState["ShipmentOrder"][index]["CarrierTypeID"] = CarrierTypeID;
        }
      });
      let objRouteVehicleRequset = {
        VehicleID: 1,
        ExpectedDeliveryDate: changeState["ShipmentOrder"][0].ExpectedDeliveryDate,
        CoordinatorStoreIDLst: changeState["ShipmentOrder"].map((e) => e.CoordinatorStoreID).join(","),
        ShipmentOrderIDLst: changeState["ShipmentOrder"].map((e) => e.ShipmentOrderID).join(","),
      };

      let objVehicleLst = this.getinitVehicellst(objRouteVehicleRequset);

      changeState = { ...changeState, VehicleLst: objVehicleLst };
      this.setState(changeState);
    }
  };

  handleChangeCourse = (CarrierTypeID, rowIndex) => (e) => {
    let changeState = this.state;

    changeState["ShipmentOrder"][rowIndex]["DriverUser"] = "";
    changeState["ShipmentOrder"][rowIndex]["DriverUserFull"] = "";
    changeState["ShipmentOrder"][rowIndex].VehicleID = -1;
    changeState["ShipmentOrder"][rowIndex]["CarrierTypeID"] = CarrierTypeID;

    if (CarrierTypeID === 2) {
      changeState["ShipmentOrder"][rowIndex].VehicleID = this.state.objCoordinator.VehicleID;
    }

    const isBelowThreshold = (currentValue) => currentValue.CarrierTypeID == 2;

    let isShow = changeState["ShipmentOrder"].every(isBelowThreshold);

    if (isShow == true) {
      document.getElementsByClassName("car-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("car-menu")[0].style.color = "#fff";
      document.getElementsByClassName("motobike-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#616a78";

      let objRouteVehicleRequset = {
        VehicleID: 1,
        ExpectedDeliveryDate: changeState["ShipmentOrder"][0].ExpectedDeliveryDate,
        CoordinatorStoreIDLst: changeState["ShipmentOrder"].map((e) => e.CoordinatorStoreID).join(","),
        ShipmentOrderIDLst: changeState["ShipmentOrder"].map((e) => e.ShipmentOrderID).join(","),
      };
      let objVehicleLst = this.getinitVehicellst(objRouteVehicleRequset);

      changeState = { ...changeState, VehicleLst: objVehicleLst };

      this.setState(changeState);
    } else {
      let objCoordinator = changeState["objCoordinator"];

      objCoordinator = { ...objCoordinator, CarrierTypeID: 1, IsRoute: true, VehicleID: -1, VehicleDriverUser: {} };

      changeState = { ...changeState, VehicleLst: [], objCoordinator: objCoordinator };

      this.setState(changeState);

      document.getElementsByClassName("motobike-menu")[0].style.background = "#15c377";
      document.getElementsByClassName("motobike-menu")[0].style.color = "#fff";
      document.getElementsByClassName("car-menu")[0].style.background = "#e4e7ea";
      document.getElementsByClassName("car-menu")[0].style.color = "#616a78";
    }
  };

  handleDeleteID = (id) => (e) => {
    let resultRouteID = this.state.ShipmentOrder.find((n) => n.ShipmentOrderID == id).ShipmentRouteID;

    this.state.ShipmentOrder.splice(
      this.state.ShipmentOrder.findIndex((n) => n.ShipmentOrderID == id),
      1
    );

    let resultCheckRouteID = this.state.ShipmentOrder.find((n) => n.ShipmentRouteID == resultRouteID);

    if (resultRouteID == "" || resultCheckRouteID != null || this.props.ShipmentRouteID != "") {
      let changeState1 = this.state;
      let objectVehicleDriverUser = { ...changeState1.objCoordinator, CarrierPartnerID: -1, VehicleDriverUser: {} };
      changeState1 = { ...changeState1, ShipmentOrder: this.state.ShipmentOrder, Via_Durations: 0, Via_Distances: "", objCoordinator: { objectVehicleDriverUser } };
      this.setState(changeState1);

      // this.setState({
      //   ShipmentOrder: this.state.ShipmentOrder,
      //   Via_Durations: 0,
      //   Via_Distances: "",
      // });

      const isBelowThreshold = (currentValue) => currentValue.CarrierTypeID == 2;
      let isExistXeTai = this.state.ShipmentOrder.length === 0 ? false : this.state.ShipmentOrder.every(isBelowThreshold);

      if (isExistXeTai) {
        let objRouteVehicleRequset = {
          VehicleID: 1,
          ExpectedDeliveryDate: this.props.InfoCoordinator[0].ExpectedDeliveryDate,
          CoordinatorStoreIDLst: this.props.InfoCoordinator.map((e) => e.CoordinatorStoreID).join(","),
          ShipmentOrderIDLst: this.props.InfoCoordinator.map((e) => e.ShipmentOrderID).join(","),
        };

        let changeState2 = this.state;
        const vehicleResult = this.getinitVehicellst(objRouteVehicleRequset);
        changeState2 = { ...changeState2, VehicleLst: vehicleResult };
        this.setState(changeState2);
      }
    } else {
      this.setState({
        ShipmentOrder: this.state.ShipmentOrder,
        ShipmentRouteID: "",
        Via_Durations: 0,
        Via_Distances: "",
      });
    }
  };

  handleChangeOder = (rowIndex, OrderID) => (e) => {
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
      OrderIndexNew = 0;
    } else if (rowIndex == totalcout && OrderID == 1) {
      OrderIDOlw = rowIndex;
      OrderIndexOlw = 0;
      OrderIDNew = 0;
      OrderIndexNew = totalcout;
    } else {
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

  handleClickRoute = (RouteID) => (e) => {
    let { ShipmentOrder } = this.state;
    ShipmentOrder = ShipmentOrder.filter((n) => n.ShipmentRouteID == "");
    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentOrderRouteLst", RouteID).then((apiResult) => {
      if (!apiResult.IsError) {
        apiResult.ResultObject.map((item) => {
          let resultdd = ShipmentOrder.find((n) => n.ShipmentOrderID == item.ShipmentOrderID);

          if (resultdd == undefined) ShipmentOrder.push(item);
        });
        this.setState({
          ShipmentRouteID: RouteID,
          ShipmentOrder: ShipmentOrder,
          Via_Durations: 0,
          Via_Distances: "",
        });
      } else {
        this.addNotification(apiResult.Message, apiResult.IsError);
      }
    });
  };

  handleClickShipmentOrderSame = (ShipmentOrderID) => (e) => {
    let { ShipmentOrder, ShipmentOrderSameLst } = this.state;
    let resultShipmentOrderSame = ShipmentOrderSameLst.find((n) => n.ShipmentOrderID == ShipmentOrderID);
    let resultdd = ShipmentOrder.find((n) => n.ShipmentOrderID == ShipmentOrderID);
    if (resultdd == undefined) ShipmentOrder.push(resultShipmentOrderSame);
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
        Latitude: Receivervalues[0],
        Longitude: Receivervalues[1],
      };
      if (index == 0) {
        strDistances = "Kho => " + ShipmentOrder[0].ShipmentOrderID;
        const values = ShipmentOrder[0].SenderGeoLocation.split(",");
        let objPoints = {
          Latitude: values[0],
          Longitude: values[1],
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
          Latitude: values[0],
          Longitude: values[1],
        };
        Points.push(objPoints);
      }
    });

    let paramsRequest = {
      Alternative: 2147483647,
      Distance: true,
      Duration: true,
      Geometry: true,
      Instructions: true,
      Points: Points,
      RouteCriteria: 0,
      Uturn: true,
      VehicleType: 2,
    };

    let resultPoints = Points.find((n) => n.Latitude == "");
    let Distances_RouteLst = [];
    if (resultPoints == undefined) {
      this.props.callFetchAPI(APIHostName, "api/Maps/FindPathViaRoute", paramsRequest).then((apiResult) => {
        if (!apiResult.IsError) {
          let Durationslst = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Durations;
          let Distanceslst = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Distances;

          DistancesRouteLst.map((item, index) => {
            let ViaDistances = Distanceslst[index + 1] - Distanceslst[index];
            let objRouteitem = { Routeitem: item, Distances: ViaDistances > 1000 ? ViaDistances / 1000 + "km" : ViaDistances + "m" };
            Distances_RouteLst.push(objRouteitem);
          });
          this.setState({
            Distances_RouteLst: Distances_RouteLst,
            Via_Durations: Math.floor(Durationslst[Durationslst.length - 1] / 60),
            Via_Distances: Distanceslst[Distanceslst.length - 1] >= 1000 ? Distanceslst[Distanceslst.length - 1] / 1000 + "km" : Distanceslst[Distanceslst.length - 1] + "m",
          });
        }
      });
    }
  };

  HandleChangeGird(id) {
    if (id == 1) {
      this.setState({
        girdSlide: true,
      });
    } else {
      let { ShipmentOrder } = this.state;
      let RowWardIDelement = [];
      ShipmentOrder.map((row, indexRow) => {
        RowWardIDelement.push(row.ReceiverWardID);
      });
      let objRouteByWard = { CoordinatorStoreID: "73309", WardIDLst: RowWardIDelement.join() };
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentRouteByWardID", objRouteByWard).then((apiResult) => {
        if (!apiResult.IsError) {
          this.setState({
            girdSlide: false,
            ShipmentRouteSameLst: apiResult.ResultObject,
          });
        } else {
          this.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    }
  }

  handleDeleteRoute = (RouteID) => (e) => {
    let listMLObject = [];
    let MLObject = { ShipmentRouteID: RouteID };
    listMLObject.push(MLObject);

    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/DeleteList", listMLObject).then((apiResult) => {
      this.addNotification(apiResult.Message, apiResult.IsError);
      if (!apiResult.IsError) {
        if (this.props.onChangeValue != null) this.props.onChangeValue(apiResult);
      }
    });
  };

  handleDescriptionSubmit = (item) => {
    let varObjectDescription = this.state.objectDescription;
    let isShow = varObjectDescription[item.ShipmentOrderID]["isShow"];

    let varObjectChange = { ...varObjectDescription, [item.ShipmentOrderID]: { isShow: !isShow, content: varObjectDescription[item.ShipmentOrderID]["content"] } };

    this.setState({ objectDescription: varObjectChange });
  };

  handleDescriptionChange = (item, event) => {
    const { value } = event.target;
    let varObjectDescription = this.state.objectDescription;
    let varObjectChange = { ...varObjectDescription, [item.ShipmentOrderID]: { isShow: varObjectDescription[item.ShipmentOrderID]["isShow"], content: value } };
    this.setState({ objectDescription: varObjectChange });
  };

  render() {
    let { ShipmentOrder, ShipmentRouteID, ShipmentOrderSameLst, ShipmentRouteLst, ShipmentRouteSameLst, Distances_RouteLst, Via_Distances, Via_Durations, girdSlide, VehicleLst } = this.state;
    let resultShipmentRoute = ShipmentRouteLst.filter((n) => n.ShipmentRouteID != ShipmentRouteID);
    let resultShipmentRouteSame = ShipmentRouteSameLst.filter((n) => n.ShipmentRouteID != ShipmentRouteID);
    const isBelowThreshold = (currentValue) => currentValue.CarrierTypeID == 2;
    let isShow = ShipmentOrder.length === 0 ? false : ShipmentOrder.every(isBelowThreshold);


    return (
      <React.Fragment>
        <div className="card">
          <ReactNotification ref={this.notificationDOMRef} />
          <div className="card-body" style={{ backgroundColor: "aliceblue", padding: "10px" }}>
            <div className="form-row">
              <div className="col-md-6">
                <FormControl.ComboBoxSelect
                  name="CarrierPartnerID"
                  colspan="8"
                  labelcolspan="4"
                  label="Đối tác:"
                  isautoloaditemfromcache={true}
                  loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                  valuemember="PartnerID"
                  nameMember="PartnerName"
                  controltype="InputControl"
                  onValueChange={this.handleOnValueChange}
                  value={this.state.objCoordinator.CarrierPartnerID}
                  listoption={null}
                  datasourcemember="CarrierPartnerID"
                  placeholder="---Vui lòng chọn---"
                  isMultiSelect={false}
                  disabled={!this.props.IsCoordinator}
                />
              </div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <div className="item group-status">
                  <span className="badge badge-secondary mr-20 badge-active motobike-menu" onClick={this.handleChangeCourseALL(1)} style={{ cursor: "pointer", fontSize: "15px", boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px" }}>
                    <i className="fa fa-motorcycle"></i>&nbsp;
                    Xe máy
                  </span>
                  <span className="badge badge-secondary badge-active car-menu" onClick={this.handleChangeCourseALL(2)} style={{ cursor: "pointer", fontSize: "15px", boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px" }}>
                    <i className="fa fa-truck fff"></i>&nbsp;
                    Xe tải
                  </span>
                </div>
              </div>
            </div>
            {this.state.objCoordinator.CarrierPartnerID == -1 || this.state.objCoordinator.CarrierPartnerID == 0 ? (
              <div className="form-row">
                <div className="col-md-6">
                  <MultiSelectComboBox
                    name="ShipmentOrder_DeliverUserList"
                    colspan="8"
                    labelcolspan="4"
                    label="Nhân viên giao:"
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
                  />
                </div>
                {
                  isShow && <div className="col-md-6">
                    <FormControl.ComboBoxSelect
                      name="RentalTypeID"
                      colspan="8"
                      labelcolspan="4"
                      label="Hình thức thuê:"
                      isautoloaditemfromcache={true}
                      loaditemcachekeyid="ERPCOMMONCACHE.RENTALTYPE"
                      valuemember="RentalTypeID"
                      nameMember="RentalTypeName"
                      controltype="InputControl"
                      onValueChange={this.handleOnValueChangeRentalType}
                      value={this.state.objCoordinator.RentalTypeID}
                      listoption={null}
                      datasourcemember="RentalTypeID"
                      placeholder="---Vui lòng chọn---"
                      isMultiSelect={false}
                      disabled={!this.props.IsCoordinator}
                    />
                  </div>
                }
              </div>
            ) : (
              <div className="form-row">
                <div className="col-md-6">
                  <FormControl.FormControlComboBoxUser
                    name="ShipmentOrder_DeliverUserList"
                    colspan="8"
                    labelcolspan="4"
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
                </div>
                {
                  isShow && <div className="col-md-6">
                    <FormControl.ComboBoxSelect
                      name="RentalTypeID"
                      colspan="8"
                      labelcolspan="4"
                      label="Hình thức thuê:"
                      isautoloaditemfromcache={true}
                      loaditemcachekeyid="ERPCOMMONCACHE.RENTALTYPE"
                      valuemember="RentalTypeID"
                      nameMember="RentalTypeName"
                      controltype="InputControl"
                      onValueChange={this.handleOnValueChangeRentalType}
                      value={this.state.objCoordinator.RentalTypeID}
                      listoption={null}
                      datasourcemember="RentalTypeID"
                      placeholder="---Vui lòng chọn---"
                      isMultiSelect={false}
                      disabled={!this.props.IsCoordinator}
                    />
                  </div>
                }
              </div>
            )}
            {isShow == true ? (
              <div className="form-row">
                <div className="col-md-6">
                  <FormControl.FormControlComboBoxNoCached
                    key={this.state.objCoordinator.VehicleID}
                    name="VehicleID"
                    colspan="8"
                    labelcolspan="4"
                    label="Bảng Số Xe:"
                    isautoloaditemfromcache={false}
                    isselectedOp={true}
                    controltype="InputControl"
                    value={this.state.objCoordinator.VehicleID}
                    onValueChange={this.handleOnValueChangeselectedOp.bind(this)}
                    listoption={VehicleLst}
                    datasourcemember="VehicleID"
                    placeholder="---Vui lòng chọn---"
                    isMultiSelect={false}
                  />
                </div>
                <div className="col-md-6">
                  <MultiSelectComboBox
                    name="VehicleDriverUser"
                    colspan="8"
                    labelcolspan="4"
                    label="Tài xế:"
                    IsLabelDiv={true}
                    isautoloaditemfromcache={false}
                    controltype="InputControl"
                    value={this.state.objCoordinator.VehicleDriverUser}
                    listoption={[]}
                    onChange={this.handleOnValueChangeVehicleDriverUser.bind(this)}
                    isMultiSelect={false}
                    datasourcemember="VehicleDriverUser"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row lstProductSelect">
              <div className="col-12 group-shipingorder " style={{ height: '265px' }}>
                <div className="jsgrid">
                  <div className="jsgrid-grid-body" style={{ height: '265px', borderRadius: '5px', border: '1px solid #808080a3', overflow: 'auto' }}>
                    <table className="jsgrid-table">
                      <tbody>
                        {ShipmentOrder &&
                          ShipmentOrder.map((item, index) => {
                            let isPermission = false;
                            if (item.IsPermission == false) {
                              isPermission = true;
                            }

                            let listOption = [];
                            let listAllUser = [];
                            listAllUser = this.state.listAllUser;
                            // console.log("listAllUser", listAllUser);
                            let listOptionUser = [];

                            let objDeliverUser = [];

                            let FullNameDeliverUser = item.ShipmentOrder_DeliverUserList
                              ? item.ShipmentOrder_DeliverUserList.map((e) => (e.UserName != "" && e.FullName != "" ? e.UserName + "-" + e.FullName : "")).filter((x) => x != "")
                              : "";

                            if (item.CarrierPartnerID > 0) {
                              item.ShipmentOrder_DeliverUserList &&
                                item.ShipmentOrder_DeliverUserList.map((item1, index) => {
                                  objDeliverUser.push(item1.UserName);
                                  item1.UserName.split(",").map((valueName, i) => {
                                    if (listAllUser) {
                                      if (listAllUser.length > 0) {
                                        listOptionUser.push(listAllUser.find((x) => x.value == valueName));
                                      }
                                    }
                                  });
                                });
                              if (listOptionUser.length > 0) {
                                listOptionUser = listOptionUser.filter(function (el) {
                                  return el != null;
                                });
                                FullNameDeliverUser = listOptionUser ? listOptionUser.map((e) => (e != undefined ? e.label : "")).filter((x) => x != "") : "";
                              }
                            } else {
                              item.ShipmentOrder_DeliverUserList &&
                                item.ShipmentOrder_DeliverUserList.map((item2, index) => {
                                  listOption.push({ value: item2.UserName, label: item2.UserName + "-" + item2.FullName, FullName: item2.FullName });
                                });
                            }

                            let CarrierTypeCss = "badge badge-secondary mr-10";
                            let CarrierTypeTruncCss = "badge badge-secondary badge-active";

                            if (item.CarrierTypeID == 1 || item.CarrierTypeID == 0) {
                              CarrierTypeCss = "badge badge-secondary  mr-10 badge-active";
                              CarrierTypeTruncCss = "badge badge-secondary";
                            }

                            return (
                              <React.Fragment>
                                <tr key={index} className="jsgrid-row">
                                  <td className="jsgrid-cell high-priority" style={{ width: "1%" }} onClick={() => this.handleDescriptionSubmit(item)}></td>
                                  <td className="jsgrid-cell group-products" style={{ width: "30%" }}>
                                    <ul>
                                      <li className="item infoOder">
                                        <span className="nameOrder">
                                          <Link className="linktext blank" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                            {item.ShipmentOrderID}{" "}
                                          </Link>
                                        </span>

                                        {item.ActualDeliveryDate == null ? (
                                          <span className="badge badge-warning time">
                                            <i className="ti ti-timer"></i> {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                          </span>
                                        ) : (
                                          <span className="badge badge-warning time">
                                            <i className="ti ti-timer"></i> {item.ShipmentOrderStatusName}
                                          </span>
                                        )}
                                      </li>
                                      <li className="item infoProduict">
                                        <span data-tip data-for={item.ShipmentOrderID} data-id={item.ShipmentOrderID}>
                                          {item.PrimaryShipItemName}
                                        </span>
                                        <ReactTooltip id={item.ShipmentOrderID} type="warning">
                                          <span>{item.ShipItemNameList}</span>
                                        </ReactTooltip>
                                      </li>
                                      <li className="item delivery-status">
                                        <div className="item group-status">
                                          {isPermission == false ? (
                                            <span className={CarrierTypeCss} onClick={this.handleChangeCourse(1, index)}>
                                              <i className="fa fa-motorcycle"></i> Xe máy
                                            </span>
                                          ) : (
                                            <span className={CarrierTypeCss}>
                                              <i className="fa fa-motorcycle fffff"></i> Xe máy
                                            </span>
                                          )}
                                          {isPermission == false ? (
                                            <span className={CarrierTypeTruncCss} onClick={this.handleChangeCourse(2, index)}>
                                              <i className="fa fa-truck"></i> Xe tải
                                            </span>
                                          ) : (
                                            <span className={CarrierTypeTruncCss}>
                                              <i className="fa fa-truck fff"></i> Xe tải
                                            </span>
                                          )}

                                          <span className="badge badge-primary ml-10" onClick={() => this.handleDescriptionSubmit(item)}>
                                            <i className="fa fa-edit"></i> Ghi chú
                                          </span>
                                        </div>
                                        <div className="item group-cod">
                                          <span className="badge badge-secondary badge-active">
                                            <i className="fa fa-dollar"></i> {item.TotalCOD ? formatMoney(item.TotalCOD, 0) : "0"}đ
                                          </span>
                                        </div>
                                      </li>
                                    </ul>
                                  </td>
                                  <td className="jsgrid-cell group-products" style={{ width: "25%" }}>
                                    <ul>
                                      <li style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div className="ml-10" style={{ textAlign: "left" }}>
                                          {FullNameDeliverUser != ""
                                            ? FullNameDeliverUser.map((s) => (
                                              <React.Fragment>
                                                {s}
                                                <br />
                                              </React.Fragment>
                                            ))
                                            : ""}
                                        </div>
                                        <div className="ml-10" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                          {item.CarrierPartnerID > 0 ? (
                                            <span
                                              data-tip
                                              data-for="b-1"
                                              data-id="b-1"
                                              className="badge badge-primary ml-10"
                                              onClick={() => this.handleGetUserAll_1(listOptionUser, item.CarrierPartnerID)}
                                            >
                                              <i className="fa fa-users"></i>
                                            </span>
                                          ) : (
                                            <span
                                              data-tip
                                              data-for="b-1"
                                              data-id="b-1"
                                              className="badge badge-primary ml-10"
                                              onClick={() => this.handleGetUserAll_2(listOption, item.CarrierPartnerID)}
                                            >
                                              <i className="fa fa-users"></i>
                                            </span>
                                          )}

                                          <ReactTooltip id="b-1" type="">
                                            <span>Lấy lại nhân viên giao</span>
                                          </ReactTooltip>
                                        </div>
                                      </li>
                                    </ul>
                                  </td>
                                  <td className="jsgrid-cell " style={{ width: "3%" }}>
                                    <div className="group-action">
                                      {ShipmentOrder.length > 1 ? (
                                        <a onClick={this.handleChangeOder(index, -1)} className="table-action hover-danger item-action">
                                          <i className="ti-angle-up"></i>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {isPermission == false ? (
                                        <a titel="Bạn không có quyền thao tác" onClick={this.handleDeleteID(item.ShipmentOrderID)} className="table-action hover-danger item-action">
                                          <i className="ti-trash"></i>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                      {ShipmentOrder.length > 1 ? (
                                        <a onClick={this.handleChangeOder(index, 1)} className="table-action hover-danger item-action">
                                          <i className="ti-angle-down"></i>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </td>
                                </tr>
                                {this.state.objectDescription[item.ShipmentOrderID] && this.state.objectDescription[item.ShipmentOrderID]["isShow"] === true && (
                                  <tr className="jsgrid-row">
                                    <td style={{ width: "1%" }}></td>
                                    <td style={{ width: "50%" }} colspan={2}>
                                      <Input.TextArea
                                        name={item.ShipmentOrderID}
                                        rows={3}
                                        maxLength={1500}
                                        onChange={(event) => {
                                          this.handleDescriptionChange(item, event);
                                        }}
                                        value={this.state.objectDescription[item.ShipmentOrderID]["content"]}
                                      />
                                    </td>
                                    <td style={{ width: "3%", verticalAlign: "middle" }}></td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row  mt-10 lstProduct">
              <div className="col-12">
                <div className="pull-left group-info-Route">
                  <ul>
                    {ShipmentRouteID != "" ? (
                      <li>
                        <span>
                          Mã tuyến: <span className="fw-600">{ShipmentRouteID}</span>{" "}
                          <button onClick={this.handleDeleteRoute(ShipmentRouteID)} className="btn-close">
                            <i className="ti-close"></i>
                          </button>
                        </span>
                      </li>
                    ) : (
                      ""
                    )}

                    {Via_Distances != "" ? (
                      <React.Fragment>
                        <li className="kmestimates">
                          <span>
                            Km ước lượng:
                            <span data-tip data-for="Distances" data-id="Distances" className="numkm fw-600">
                              {Via_Distances}
                            </span>
                            <ReactTooltip id="Distances" type="warning" className="title-tooltip-estimates">
                              {Distances_RouteLst &&
                                Distances_RouteLst.map((item, index) => {
                                  return (
                                    <span>
                                      {item.Routeitem} : {item.Distances}
                                    </span>
                                  );
                                })}
                            </ReactTooltip>
                          </span>
                        </li>
                        <li>
                          <span>
                            di chuyển: <span className="fw-600">{Via_Durations}'</span>
                          </span>
                        </li>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
                <div className="nav-group-action" style={{ display: 'block', height: '0', position: 'absolute', top: '-14px', right: '10px' }}>
                  {ShipmentOrder.length > 1 ? (
                    <button className="btn btn-w-md btn-round btn-info" type="button" onClick={this.handleDistances.bind(this)}>
                      Tính khoảng cách
                    </button>
                  ) : (
                    ""
                  )}
                  <button style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} type="button" onClick={() => this.HandleChangeGird(1)}>
                    <i className="ti-menu-alt"></i>
                  </button>
                  <button style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} type="button" onClick={() => this.HandleChangeGird(2)}>
                    <i className="ti-menu"></i>
                  </button>
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
                              <div className="card card-secondary" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                <div className="card-body">
                                  <ul onClick={this.handleClickRoute(item.ShipmentRouteID)}>
                                    <li className="item infoOder">
                                      <span className="nameOrder">
                                        <a>{item.ShipmentRouteID}</a>
                                      </span>
                                      <span className="badge badge-warning time">
                                        <i className="ti ti-timer"></i> {item.ExpectedBeginDeliveryDate != null ? this._genCommentTime(item.ExpectedBeginDeliveryDate) : ""}
                                      </span>
                                    </li>
                                    <li className="item infoProduict">
                                      <span>{item.DeliverUserFullNameList}</span>
                                    </li>
                                    <li className="item address-customer">
                                      <span className="title" data-tip data-for={item.ShipmentRouteID} data-id={item.ShipmentRouteID}>
                                        {item.RouteNote.split(";")[0]}
                                      </span>
                                      <ReactTooltip id={item.ShipmentRouteID} type="warning" className="title-tooltip-estimates">
                                        <span>{item.RouteNote}</span>
                                      </ReactTooltip>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slide>
                    </div>
                  );
                } else if (resultShipmentRouteSame.length > 0 && girdSlide == false) {
                  return (
                    <div className="col-12">
                      <Slide easing="ease" slidesToShow={resultShipmentRouteSame.length >= 3 ? 2 : 2} slidesToScroll={1} autoplay={false} cssClass="slide-product">
                        {resultShipmentRouteSame.map((item, index) => {
                          return (
                            <div key={"Route" + index} className="col-md-6 col-lg-4 each-slide">
                              <div className="card card-secondary" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                <div className="card-body">
                                  <ul onClick={this.handleClickRoute(item.ShipmentRouteID)}>
                                    <li className="item infoOder">
                                      <span className="nameOrder">
                                        <a>{item.ShipmentRouteID}</a>
                                      </span>
                                      <span className="badge badge-warning time">
                                        <i className="ti ti-timer"></i> {item.ExpectedBeginDeliveryDate != null ? this._genCommentTime(item.ExpectedBeginDeliveryDate) : ""}
                                      </span>
                                    </li>
                                    <li className="item infoProduict">
                                      <span>{item.DeliverUserFullNameList}</span>
                                    </li>
                                    <li className="item address-customer">
                                      <span data-tip data-for={item.ShipmentRouteID} data-id={item.ShipmentRouteID}>
                                        {item.RouteNote.split(";")[0]}
                                      </span>
                                      <ReactTooltip id={item.ShipmentRouteID} type="warning" className="title-tooltip-estimates">
                                        <span>{item.RouteNote}</span>
                                      </ReactTooltip>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slide>
                    </div>
                  );
                } else {
                  return (
                    <div className="col-12">
                      <Slide easing="ease" slidesToShow={ShipmentOrderSameLst.length >= 3 ? 2 : 2} slidesToScroll={1} autoplay={false} cssClass="slide-product">
                        {ShipmentOrderSameLst.map((item, index) => {
                          let resultdd = ShipmentOrder.find((n) => n.ShipmentOrderID == item.ShipmentOrderID);
                          if (resultdd == undefined) {
                            return (
                              <div key={"Same" + index} className="col-md-6 col-lg-4 each-slide">
                                <div className="card card-secondary" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                  <div className="card-body">
                                    <ul onClick={this.handleClickShipmentOrderSame(item.ShipmentOrderID)}>
                                      <li className="item infoOder">
                                        <span className="nameOrder">
                                          <Link className="linktext blank" target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                            {item.ShipmentOrderID}{" "}
                                          </Link>
                                        </span>
                                        <span className="badge badge-warning time">
                                          <i className="ti ti-timer"></i> {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                        </span>
                                      </li>
                                      <li className="item infoProduict">
                                        <span data-tip data-for={item.ShipmentOrderID} data-id={item.ShipmentOrderID}>
                                          {item.PrimaryShipItemName}
                                        </span>
                                        <ReactTooltip id={item.ShipmentOrderID} type="warning" className="title-tooltip" place="right">
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
                            );
                          }
                        })}
                      </Slide>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-center border" style={{ backgroundColor: "aliceblue", padding: "0", border: "none !important" }}>
          <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose.bind(this)}>
            Làm mới
          </button>
          <button className="btn btn-w-md btn-round btn-info ml-10" type="button" onClick={() => this.handleConfirm()}>
            Cập nhật
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
    callGetUserCache: (cacheKeyID) => {
      return dispatch(callGetUserCache(cacheKeyID));
    },
    showModal: (type, props) => {
      dispatch(showModal(type, props));
    },
    hideModal: (type, props) => {
      dispatch(hideModal(type, props));
    },
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
  };
};
const ListShipCoordinatorRoute = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorRouteCom);
export default ListShipCoordinatorRoute;
