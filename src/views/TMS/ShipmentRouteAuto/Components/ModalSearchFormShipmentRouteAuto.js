import { Col, Drawer, Input, Row, Table, Select, Radio, Space, Card, Tag, Divider, Typography, AutoComplete } from "antd";
import React, { Component } from "react";
import { Fragment } from "react";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { MessageModal } from "./../../../../common/components/Modal/index";
import { formatMoney } from "./../../../../utils/function";
import { Link } from "react-router-dom";

class ModalSearchFormShipmentRouteAutoCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShipmentOrder: this.props.InfoCoordinator,
      objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1, IsRoute: true, VehicleID: -1, VehicleDriverUser: {} },
      VehicleLst: [],
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
      ObjectDescription: {},
      ObjectSelectValue: {
        DoiTac: {
          ListOption: [],
          Value: -1,
        },
        NhanVienGiao: {
          ListOption: [],
          Value: [],
        },
        BangSoXe: {
          ListOption: [],
          Value: -1,
        },
        TaiXe: {
          ListOption: [],
          Value: -1,
        },
      },
    };

    this.notificationDOMRef = React.createRef();

    this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.HandleChangeGird = this.HandleChangeGird.bind(this);
    this.handleLoadSelectDoiTac = this.handleLoadSelectDoiTac.bind(this);
  }

  //#region Lifecycly

  componentDidMount() {
    this.handleMapObjectDescription();
    this.handleLoadSelectDoiTac();

    // const isBelowThreshold = (currentValue) => currentValue.CarrierTypeID == 2;
    // let isShow = this.props.InfoCoordinator.every(isBelowThreshold);

    let objVehicleLst = [];
    let objInfoCoordinator = {};
    let listOption = [];
    let listOptionUser = [];
    let objDeliverUser = [];

    // if (isShow == true) {
    //   this.props.InfoCoordinator.sort(function (a, b) {
    //     return new Date(a.ExpectedDeliveryDate) - new Date(b.ExpectedDeliveryDate);
    //   });

    //   let objRouteVehicleRequset = {
    //     VehicleID: 1,
    //     ExpectedDeliveryDate: this.props.InfoCoordinator[0].ExpectedDeliveryDate,
    //     CoordinatorStoreIDLst: this.props.InfoCoordinator.map((e) => e.CoordinatorStoreID).join(","),
    //     ShipmentOrderIDLst: this.props.InfoCoordinator.map((e) => e.ShipmentOrderID).join(","),
    //   };

    //   objVehicleLst = this.getinitVehicellst(objRouteVehicleRequset);
    // } else {
    // }

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
        };
      } else {
        objInfoCoordinator = {
          CarrierPartnerID: objRoute.CarrierPartnerID,
          CarrierTypeID: objRoute.CarrierTypeID,
          IsRoute: true,
          VehicleID: objRoute.VehicleID == 0 ? -1 : objRoute.VehicleID,
          VehicleDriverUser: {},
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

  //#endregion

  //#region Function

  handleLoadSelectDoiTac() {
    this.props.callGetCache("ERPCOMMONCACHE.PARTNER").then((result) => {
      let listOption = [{ value: -1, label: "Chọn đối tác" }];

      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.map((cacheItem) => {
          listOption.push({ value: cacheItem["PartnerID"], label: cacheItem["PartnerID"] + " - " + cacheItem["PartnerName"], name: cacheItem["PartnerName"] });
        });

        let changeState = this.state;
        let objSelectValue = changeState.ObjectSelectValue;
        let objDoiTac = objSelectValue.DoiTac;

        objDoiTac = { ...objDoiTac, ListOption: listOption, value: -1 };
        objSelectValue = { ...objSelectValue, DoiTac: objDoiTac };
        changeState = { ...changeState, ObjectSelectValue: objSelectValue };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        let objSelectValue = changeState.ObjectSelectValue;
        let objDoiTac = objSelectValue.DoiTac;

        objDoiTac = { ...objDoiTac, ListOption: listOption, Value: "-1" };
        objSelectValue = { ...objSelectValue, DoiTac: objDoiTac };
        changeState = { ...changeState, objSelectValue };

        this.setState(changeState);
      }
    });
  }

  handleLoadDatCacheNhanVienGiao() {
    this.props.callGetCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
      let listOption = [];

      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.filter((n) => n["PartnerID"] == this.state.objCoordinator.CarrierPartnerID).map((cacheItem) => {
          listOption.push({ value: cacheItem["UserName"], label: cacheItem["UserName"] + "-" + cacheItem["FullName"], name: cacheItem["FullName"] });
        });

        let changeState = this.state;
        let objSelectValue = changeState.ObjectSelectValue;
        let objNhanVienGiao = objSelectValue.NhanVienGiao;

        objNhanVienGiao = { ...objNhanVienGiao, ListOption: listOption, Value: [] };
        objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
        changeState = { ...changeState, ObjectSelectValue: objSelectValue };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        let objSelectValue = changeState.ObjectSelectValue;
        let objNhanVienGiao = objSelectValue.NhanVienGiao;

        objNhanVienGiao = { ...objNhanVienGiao, ListOption: listOption, Value: [] };
        objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
        changeState = { ...changeState, ObjectSelectValue: objSelectValue };

        this.setState(changeState);
      }
    });
  }

  handleSearchDataNhanVienGiao(KeyWord) {
    let listMLObject = {
      IndexName: "user",
      TypeName: "user",
      Top: 10,
      IsCompressResultData: false,
      QueryParamList: [
        {
          QueryKey: "",
          QueryValue: "",
          QueryType: 18,
          IsNotQuery: false,
          SubQueryParamList: [
            {
              QueryKey: "uSERNAME",
              QueryValue: KeyWord,
              QueryType: 2,
              IsNotQuery: false,
            },

            {
              QueryKey: "fULLNAME",
              QueryValue: KeyWord,
              QueryType: 2,
              IsNotQuery: false,
            },
          ],
        },
      ],
    };

    this.props.callFetchAPI("ERPAPI", "api/UserSearch/Search", listMLObject).then((apiResult) => {
      let listOptionNew1 = [];
      for (let i = 0; i < apiResult.ResultObject.length; i++) {
        if (this.props.isCheckPartner == undefined) {
          if (apiResult.ResultObject[i].UserName.substr(0, 3) != "004") {
            listOptionNew1.push({
              value: apiResult.ResultObject[i].UserName,
              name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName,
              FullName: apiResult.ResultObject[i].FullName,
              DepartmentName: apiResult.ResultObject[i].DepartmentName,
              PositionName: apiResult.ResultObject[i].PositionName,
              Address: apiResult.ResultObject[i].Address,
            });
          }
        } else {
          listOptionNew1.push({
            value: apiResult.ResultObject[i].UserName,
            name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName,
            FullName: apiResult.ResultObject[i].FullName,
            DepartmentName: apiResult.ResultObject[i].DepartmentName,
            PositionName: apiResult.ResultObject[i].PositionName,
            Address: apiResult.ResultObject[i].Address,
          });
        }
      }

      let changeState = this.state;
      let objSelectValue = changeState.ObjectSelectValue;
      let objNhanVienGiao = objSelectValue.NhanVienGiao;

      objNhanVienGiao = { ...objNhanVienGiao, ListOption: listOptionNew1, Value: [] };
      objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
      changeState = { ...changeState, ObjectSelectValue: objSelectValue };

      this.setState(changeState);
    });
  }

  handleSelectNhanVienGiaoInputValueChange(e) {
    let value = e.target.value;

    if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38 && value.substr(0, 3) != "004") {
      this.handleSearchDataNhanVienGiao("*" + value + "*");
    }
  }

  handleSelectNhanVienGiaoValueChange(value, options) {
    console.log({ value, options });
  }

  handleSelectDoiTacValueChange(name, value) {
    let { objCoordinator, objDeliverUser, ShipmentOrder } = this.state;

    objCoordinator[name] = value;

    if (name == "CarrierPartnerID") {
      objDeliverUser = [];

      ShipmentOrder.map((row, indexRow) => {
        if ((objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true) {
          row[name] = value;
          row["ShipmentOrder_DeliverUserList"] = [];
        }
      });
    } else {
      ShipmentOrder.map((row, indexRow) => {
        if (!row.IsCoordinator && row.IsPermission == true) {
          row[name] = value;
        }
      });
    }

    this.setState({
      objCoordinator: objCoordinator,
      objDeliverUser: objDeliverUser,
      ShipmentOrder: ShipmentOrder,
    });

    this.handleLoadDatCacheNhanVienGiao();
  }

  getinitVehicellst(objRouteVehicleRequset) {
    let objVehicleLst = [];
    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetVehicleWorkingPlan", objRouteVehicleRequset).then((apiResult) => {
      if (!apiResult.IsError) {
        apiResult.ResultObject.map((item) => {
          if ((item.Volume > item.TotalVolume + item.TotalShipmentVolume && item.Weight > item.TotalWeight + item.TotalShipmentWeight) || item.VehicleID == this.state.objCoordinator.VehicleID) {
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
        this.setState({
          objCoordinator: objInfoCoordinator,
          VehicleLst: objVehicleLst,
        });
      }
    });
    return objVehicleLst;
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
    this.setState({ ObjectDescription: objectDescription });
  };

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

    // console.log({ name });
    // console.log({ objCoordinator });
    // console.log(this.state.VehicleLst);

    this.setState({
      objCoordinator: objCoordinator,
      ShipmentOrder: ShipmentOrder,
    });
  }

  handleOnValueChangeDeliverUser(name, value, selectedOption, CarrierPartnerID) {
    let objMultiDeliverUser = [];
    let listStaffDebtObject = [];
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
    console.log("onValueChangeComboUser", rowname, rowvalue, rowIndex);
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
      if (this.state.objCoordinator.VehicleDriverUservalue) {
        this.state.ShipmentOrder[indexRow].DriverUser = this.state.objCoordinator.VehicleDriverUser.value;
      }
      this.state.ShipmentOrder[indexRow].VehicleID = this.state.objCoordinator.VehicleID;
      this.state.ShipmentOrder[indexRow].CoordinatorNote = this.state.ObjectDescription[row.ShipmentOrderID]["content"];
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

  handleDeleteID(id) {
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
  }

  handleChangeOder(rowIndex, OrderID) {
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
    this.setState({ ShipmentOrder: ShipmentOrder });
  }

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
    let varObjectDescription = this.state.ObjectDescription;
    let isShow = varObjectDescription[item.ShipmentOrderID]["isShow"];

    let varObjectChange = { ...varObjectDescription, [item.ShipmentOrderID]: { isShow: !isShow, content: varObjectDescription[item.ShipmentOrderID]["content"] } };

    this.setState({ ObjectDescription: varObjectChange });
  };

  handleDescriptionChange = (item, event) => {
    const { value } = event.target;
    let varObjectDescription = this.state.ObjectDescription;
    let varObjectChange = { ...varObjectDescription, [item.ShipmentOrderID]: { isShow: varObjectDescription[item.ShipmentOrderID]["isShow"], content: value } };
    this.setState({ ObjectDescription: varObjectChange });
  };

  //#endregion

  //#region Render

  render() {
    return (
      <Drawer
        title={<h3>Phân tuyến điều phối vận đơn</h3>}
        placement="right"
        closable={true}
        visible={true}
        maskClosable={true}
        width="50vw"
        mask={false}
        onClose={(event) => {
          this.props.onCloseModal(false);
        }}
      >
        <Row gutter={[8, 16]} style={{ marginBottom: "10px" }} className="f-13">
          <Col span={5} className="ant-col-ma">
            Đối tác :
          </Col>
          <Col sm={7} md={7} lg={8} xl={10}>
            <Select
              defaultValue={this.state.ObjectSelectValue.DoiTac.Value}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={400}
              onChange={(value) => this.handleSelectDoiTacValueChange("CarrierPartnerID", value)}
            >
              {this.state.ObjectSelectValue.DoiTac.ListOption.map((item, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col sm={12} md={12} lg={11} xl={9} style={{ textAlign: "center" }}>
            <Radio.Group buttonStyle="solid">
              <Space>
                <Radio.Button value={1}>
                  <Space>
                    <i class="fa fa-motorcycle"></i> Xe máy
                  </Space>
                </Radio.Button>
                <Radio.Button value={2}>
                  <Space>
                    <i class="fa fa-truck"></i> Xe tải
                  </Space>
                </Radio.Button>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[8, 16]} style={{ marginBottom: "10px" }} className="f-13">
          <Col span={5} className="ant-col-ma">
            Nhân viên giao :
          </Col>
          <Col span={19}>
            {this.state.objCoordinator.CarrierPartnerID == -1 || this.state.objCoordinator.CarrierPartnerID == 0 ? (
              <Select
                defaultValue={this.state.ObjectSelectValue.NhanVienGiao.Value}
                style={{ width: "100%" }}
                mode="multiple"
                onInputKeyDown={(event) => this.handleSelectNhanVienGiaoInputValueChange(event)}
                onChange={(value, options) => this.handleSelectNhanVienGiaoValueChange(value, options)}
                optionLabelProp="label"
              >
                {this.state.ObjectSelectValue.NhanVienGiao.ListOption.map((item, index) => (
                  <Select.Option key={index} value={item.value} label={item.name} user={item}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Select
                defaultValue={this.state.ObjectSelectValue.NhanVienGiao.Value}
                style={{ width: "100%" }}
                mode="multiple"
                onInputKeyDown={(event) => this.handleSelectNhanVienGiaoInputValueChange(event)}
                onChange={(value, options) => this.handleSelectNhanVienGiaoValueChange(value, options)}
                optionLabelProp="label"
              >
                {this.state.ObjectSelectValue.NhanVienGiao.ListOption.map((item, index) => (
                  <Select.Option key={index} value={item.value} label={item.name} user={item}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Col>
        </Row>
        <Row gutter={[8, 16]} style={{ marginBottom: "10px" }} className="f-13">
          <Col span={5} className="ant-col-ma">
            Bảng số xe :
          </Col>
          <Col span={19}>
            <Input.Group compact>
              <Select defaultValue="" style={{ width: "60%" }}>
                {/* <Option value="Sign Up">Sign Up</Option> */}
              </Select>
              <AutoComplete style={{ width: "40%" }} placeholder="Tài xế" options={[]} />
            </Input.Group>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: "black" }}></Divider>
        <div style={{ height: "300px", overflowX: "hidden", overflowY: "auto" }} className="f-13">
          {this.state.ShipmentOrder &&
            this.state.ShipmentOrder.map((item, index) => {
              let isPermission = false;

              if (item.IsPermission == false) {
                isPermission = true;
              }

              let listOption = [];
              let listAllUser = [];
              let listOptionUser = [];
              let objDeliverUser = [];

              listAllUser = this.state.listAllUser;

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

              return (
                <Row gutter={24} style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <Card
                      size="small"
                      headStyle={{ border: "1px solid #74b9ff", borderBottom: "none" }}
                      bodyStyle={{ border: "1px solid #74b9ff" }}
                      title={
                        <Space>
                          <Link target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                            <Tag color="cyan"> {item.ShipmentOrderID}</Tag>
                          </Link>
                          <Tag color="orange">
                            <Space>
                              {item.ActualDeliveryDate == null ? (
                                <Fragment>
                                  <i className="ti ti-timer"></i>
                                  {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <i className="ti ti-timer"></i> {item.ShipmentOrderStatusName}
                                </Fragment>
                              )}
                            </Space>
                          </Tag>
                          <Tag color="green">
                            <Space>
                              <i className="fa fa-dollar"></i> {item.TotalCOD ? formatMoney(item.TotalCOD, 0) : "0"}đ
                            </Space>
                          </Tag>
                        </Space>
                      }
                      style={{ width: "100%" }}
                    >
                      <Row gutter={24}>
                        <Col span={12}>
                          <Row gutter={24}>
                            <Col span={24}>
                              <Typography>
                                <Typography.Paragraph style={{ color: "#4d5259", fontSize: "13px", lineHeight: "24px" }}>{item.PrimaryShipItemName}</Typography.Paragraph>
                              </Typography>
                            </Col>
                          </Row>
                          <Row gutter={[8, 16]}>
                            {isPermission == false ? (
                              <Col span={8}>
                                <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }} onClick={this.handleChangeCourse(1, index)}>
                                  <Space>
                                    <i class="fa fa-motorcycle"></i> Xe máy
                                  </Space>
                                </Tag.CheckableTag>
                              </Col>
                            ) : (
                              <Col span={8}>
                                <Tag.CheckableTag checked style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                                  <Space>
                                    <i class="fa fa-motorcycle"></i> Xe máy
                                  </Space>
                                </Tag.CheckableTag>
                              </Col>
                            )}
                            {isPermission == false ? (
                              <Col span={8}>
                                <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }} onClick={this.handleChangeCourse(2, index)}>
                                  <Space>
                                    <i class="fa fa-truck"></i> Xe tải
                                  </Space>
                                </Tag.CheckableTag>
                              </Col>
                            ) : (
                              <Col span={8}>
                                <Tag.CheckableTag style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                                  <Space>
                                    <i class="fa fa-truck"></i> Xe tải
                                  </Space>
                                </Tag.CheckableTag>
                              </Col>
                            )}

                            <Col span={8}>
                              <Tag.CheckableTag
                                checked
                                style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}
                                onClick={() => this.handleDescriptionSubmit(item)}
                              >
                                <Space>
                                  <i class="fa fa-edit"></i> Ghi chú
                                </Space>
                              </Tag.CheckableTag>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                        </Col>
                        <Col span={8}></Col>
                        <Col>
                          <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                        </Col>
                        <Col span={1} style={{ display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "center" }}>
                          {this.state.ShipmentOrder.length > 1 ? (
                            <Row>
                              <Col>
                                <i className="ti-angle-up" onClick={(event) => this.handleChangeOder(index, -1)}></i>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                          {isPermission == false ? (
                            <Row>
                              <Col>
                                <i className="ti-trash" onClick={(event) => this.handleDeleteID(item.ShipmentOrderID)}></i>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                          {this.state.ShipmentOrder.length > 1 ? (
                            <Row>
                              <Col>
                                <i className="ti-angle-down" onClick={(event) => this.handleChangeOder(index, 1)}></i>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      {this.state.ObjectDescription[item.ShipmentOrderID] && this.state.ObjectDescription[item.ShipmentOrderID]["isShow"] === true && (
                        <Row gutter={24}>
                          <Col span={24}>
                            <Input.TextArea rows={4} style={{ width: "100%", marginTop: "12px" }} />
                          </Col>
                        </Row>
                      )}
                    </Card>
                  </Col>
                </Row>
              );
            })}
        </div>
      </Drawer>
    );
  }

  //#endregion
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
    callGetCache: (cacheKeyID) => {
      return dispatch(callGetCache(cacheKeyID));
    },
  };
};
const ModalSearchFormShipmentRouteAuto = connect(mapStateToProps, mapDispatchToProps)(ModalSearchFormShipmentRouteAutoCom);
export default ModalSearchFormShipmentRouteAuto;
