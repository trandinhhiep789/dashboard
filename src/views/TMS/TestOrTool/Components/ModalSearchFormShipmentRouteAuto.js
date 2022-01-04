import { Col, Drawer, Input, Row, Table, Select, Radio, Space, Card, Tag, Divider, Typography, AutoComplete, Button, Carousel, Tooltip } from "antd";
import { RightOutlined, LeftOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import React, { Component, PureComponent } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatMoney } from "../../../../utils/function";
import { Link } from "react-router-dom";
import { APIHostName } from "../constants/index";

class ModalSearchFormShipmentRouteAutoCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShipmentOrder: this.props.InfoCoordinator,
      objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1, IsRoute: true, VehicleID: -1, VehicleDriverUser: { value: -1, label: "" } },
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
      GirdSlide: false,
      ObjectDescription: this.props.ObjectDescription,
      ListAllUser: [],
      ObjectControlValue: {
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
        LoaiXe: {
          Value: -1,
        },
      },
      ObjectValue: {},
    };

    this.HandleChangeGird = this.HandleChangeGird.bind(this);
    this.handleLoadSelectDoiTac = this.handleLoadSelectDoiTac.bind(this);
    this.handleClickShipmentOrderSame = this.handleClickShipmentOrderSame.bind(this);
    this.handleSelectNhanVienGiaoValueChange_1 = this.handleSelectNhanVienGiaoValueChange_1.bind(this);
    this.handleSelectNhanVienGiaoValueChange_2 = this.handleSelectNhanVienGiaoValueChange_2.bind(this);
  }

  //#region Lifecycly

  componentDidMount() {
    let objInfoCoordinator = {};
    let lstOption = [];
    let lstValue = [];
    let lstOptionUser = [];
    let isXeTai = this.props.InfoCoordinator.every((item) => item.CarrierTypeID == 2);

    let changeState = this.state;

    if (isXeTai) {
      this.props.InfoCoordinator.sort(function (a, b) {
        return new Date(a.ExpectedDeliveryDate) - new Date(b.ExpectedDeliveryDate);
      });

      this.handleLoadBienSoXe();
    }

    this.props.callGetUserCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
      result.ResultObject.CacheData.map((cacheItem) => {
        lstOptionUser.push({ value: cacheItem.UserName, label: cacheItem.UserName + "-" + cacheItem.FullName, name: cacheItem.FullName });
      });

      changeState = { ...changeState, ListAllUser: lstOptionUser };
      // this.setState(changeState);
    });

    let objRoute = this.props.InfoCoordinator.find((n) => n.ShipmentRouteID == this.props.ShipmentRouteID);

    if (objRoute != undefined) {
      objInfoCoordinator = {
        CarrierPartnerID: objRoute.CarrierPartnerID,
        CarrierTypeID: objRoute.CarrierTypeID,
        IsRoute: true,
        VehicleID: objRoute.VehicleID == 0 ? -1 : objRoute.VehicleID,
      };

      if (objRoute.CarrierPartnerID > 0) {
        this.props.callGetUserCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
          if (!result.IsError && result.ResultObject.CacheData != null) {
            result.ResultObject.CacheData.map((cacheItem) => {
              lstOption.push({ value: cacheItem["UserName"], name: cacheItem["UserName"] + "-" + cacheItem["FullName"], FullName: cacheItem["FullName"] });
            });
          }
        });

        objRoute.ShipmentOrder_DeliverUserList.length > 0 &&
          objRoute.ShipmentOrder_DeliverUserList.map((item1, index) => {
            lstValue.push(item1.UserName);
          });
      } else {
        objRoute.ShipmentOrder_DeliverUserList.length > 0 &&
          objRoute.ShipmentOrder_DeliverUserList.map((item2, index) => {
            lstOption.push({ value: item2.UserName, name: item2.UserName + "-" + item2.FullName, FullName: item2.FullName });
            lstValue.push(item2.UserName);
          });
      }
    }

    let objControlValue = changeState.ObjectControlValue;
    let objNhanVienGiao = objControlValue.NhanVienGiao;
    let objDoiTac = objControlValue.DoiTac;

    objNhanVienGiao = { ...objNhanVienGiao, ListOption: lstOption, Value: lstValue };
    objDoiTac = { ...objDoiTac, Value: objRoute.CarrierPartnerID == 0 ? -1 : objRoute.CarrierPartnerID };
    objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao, DoiTac: objDoiTac, LoaiXe: { Value: isXeTai ? 2 : 1 } };

    changeState = {
      ...changeState,
      objCoordinator: objInfoCoordinator,
      ListAllUser: lstOptionUser,
      ObjectControlValue: objControlValue,
    };

    this.setState(changeState, () => {
      this.handleLoadSelectDoiTac();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.state.ShipmentOrder) !== JSON.stringify(nextProps.InfoCoordinator)) {
      let changeState = this.state;

      changeState = {
        ...changeState,
        ShipmentOrder: nextProps.InfoCoordinator,
        ShipmentOrderSameLst: nextProps.ShipmentOrderSame,
        ObjectDescription: nextProps.ObjectDescription,
        Via_Durations: 0,
        Via_Distances: "",
      };

      this.setState(changeState);
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
        let objSelectValue = changeState.ObjectControlValue;
        let objDoiTac = objSelectValue.DoiTac;

        objDoiTac = { ...objDoiTac, ListOption: listOption, value: -1 };
        objSelectValue = { ...objSelectValue, DoiTac: objDoiTac };
        changeState = { ...changeState, ObjectControlValue: objSelectValue };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        let objSelectValue = changeState.ObjectControlValue;
        let objDoiTac = objSelectValue.DoiTac;

        objDoiTac = { ...objDoiTac, ListOption: listOption, Value: -1 };
        objSelectValue = { ...objSelectValue, DoiTac: objDoiTac };
        changeState = { ...changeState, objSelectValue };

        this.setState(changeState);
      }
    });
  }

  handleLoadCacheSelectNhanVienGiao() {
    this.props.callGetCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
      let listOption = [];

      if (!result.IsError && result.ResultObject.CacheData != null) {
        result.ResultObject.CacheData.filter((n) => n["PartnerID"] == this.state.objCoordinator.CarrierPartnerID).map((cacheItem) => {
          listOption.push({ value: cacheItem["UserName"], label: cacheItem["UserName"] + "-" + cacheItem["FullName"], name: cacheItem["FullName"] });
        });

        let changeState = this.state;
        let objSelectValue = changeState.ObjectControlValue;
        let objNhanVienGiao = objSelectValue.NhanVienGiao;

        objNhanVienGiao = { ...objNhanVienGiao, ListOption: listOption, Value: [] };
        objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
        changeState = { ...changeState, ObjectControlValue: objSelectValue };

        this.setState(changeState);
      } else {
        let changeState = this.state;
        let objSelectValue = changeState.ObjectControlValue;
        let objNhanVienGiao = objSelectValue.NhanVienGiao;

        objNhanVienGiao = { ...objNhanVienGiao, ListOption: listOption, Value: [] };
        objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
        changeState = { ...changeState, ObjectControlValue: objSelectValue };

        this.setState(changeState);
      }
    });
  }

  handleSelectNhanVienGiaoInputValueChange(e) {
    let value = e.target.value;

    if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38 && value.substr(0, 3) != "004") {
      this.handleSearchDataNhanVienGiao("*" + value + "*");
    }
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
            let isExist = this.state.ObjectControlValue.NhanVienGiao.ListOption.some((item) => item.value == apiResult.ResultObject[i].UserName);
            if (!isExist) {
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
        } else {
          let isExist = this.state.ObjectControlValue.NhanVienGiao.ListOption.some((item) => item.value === apiResult.ResultObject[i].UserName);
          if (!isExist) {
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
      }

      let changeState = this.state;
      let objSelectValue = changeState.ObjectControlValue;
      let objNhanVienGiao = objSelectValue.NhanVienGiao;
      let lstNhanVienGiaoListOption = objNhanVienGiao.ListOption;
      let lstNhanVienGiaoValue = objNhanVienGiao.Value;

      lstNhanVienGiaoListOption = [...lstNhanVienGiaoListOption, ...listOptionNew1];
      objNhanVienGiao = { ...objNhanVienGiao, ListOption: lstNhanVienGiaoListOption, Value: lstNhanVienGiaoValue };
      objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
      changeState = { ...changeState, ObjectControlValue: objSelectValue };

      this.setState(changeState);
    });
  }

  handleSelectNhanVienGiaoValueChange_1(value, options) {
    let objDeliverUser = [];
    let listStaffDebtObject = [];

    options &&
      options.map((item, index) => {
        let objShip_DeliverUser = { UserName: item.user.value, FullName: item.user.FullName };

        objDeliverUser.push(objShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.value,
          StoreID: this.state.ShipmentOrder.length > 0 ? this.state.ShipmentOrder[0].CoordinatorStoreID : 0,
        });
      });

    if (options) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.ShipmentOrder.map((row, indexRow) => {
            if ((this.state.objCoordinator.IsRoute == true || !row.IsCoordinator) && row.IsPermission == true && row.CarrierPartnerID <= 0) {
              row["ShipmentOrder_DeliverUserList"] = objDeliverUser || [];
            }
          });

          let stateChange = this.state;
          let objControlValue = stateChange.ObjectControlValue;
          let objNhanVienGiao = objControlValue.NhanVienGiao;
          let lstNhanVienGiao = options.map((item) => item.user.value);

          objNhanVienGiao = { ...objNhanVienGiao, Value: lstNhanVienGiao };
          objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
          stateChange = { ...stateChange, objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject, ObjectControlValue: objControlValue };

          this.setState(stateChange);
        } else {
          this.props.onShowNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.state.ShipmentOrder.map((row, indexRow) => {
        if (row.IsPermission == true) {
          row["ShipmentOrder_DeliverUserList"] = objDeliverUser || [];
        }
      });

      let changeState = this.state;
      let objControlValue = stateChange.ObjectControlValue;
      let objNhanVienGiao = objControlValue.NhanVienGiao;
      let lstNhanVienGiao = options.map((item) => item.user.value);

      objNhanVienGiao = { ...objNhanVienGiao, Value: lstNhanVienGiao };
      objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
      changeState = { ...changeState, ObjectControlValue: objControlValue, ShipmentRouteLst: [] };

      this.setState(changeState);
    }
  }

  handleSelectNhanVienGiaoValueChange_2(value, options) {
    let objMultiDeliverUser = [];
    let listStaffDebtObject = [];

    options &&
      options.map((item, index) => {
        let objMultiShip_DeliverUser = { UserName: item.user.value, FullName: item.user.name };
        objMultiDeliverUser.push(objMultiShip_DeliverUser);
        listStaffDebtObject.push({
          UserName: item.user.value,
          StoreID: this.state.ShipmentOrder[0].CoordinatorStoreID,
        });
      });

    if (options) {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/UserIsLockDelivery", listStaffDebtObject).then((apiResult) => {
        if (!apiResult.IsError) {
          this.state.ShipmentOrder.map((row, indexRow) => {
            if (row.IsPermission == true && row.CarrierPartnerID > 0) {
              row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser || [];
            }
          });

          let stateChange = this.state;
          let objControlValue = stateChange.ObjectControlValue;
          let objNhanVienGiao = objControlValue.NhanVienGiao;
          let lstNhanVienGiao = options.map((item) => item.user.value);

          objNhanVienGiao = { ...objNhanVienGiao, Value: lstNhanVienGiao };
          objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
          stateChange = { ...stateChange, objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteLst: apiResult.ResultObject, ObjectControlValue: objControlValue };

          this.setState(stateChange);
        } else {
          this.props.onShowNotification(apiResult.Message, apiResult.IsError);
        }
      });
    } else {
      this.state.ShipmentOrder.map((row, indexRow) => {
        if (row.IsPermission == true && row.CarrierPartnerID > 0) {
          row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser || [];
        }
      });

      let changeState = this.state;
      changeState = { ...changeState, objDeliverUser: value, ShipmentRouteLst: [] };
      this.setState(changeState);
    }
  }

  handleSelectDoiTacValueChange(name, value) {
    let { objCoordinator, objDeliverUser, ShipmentOrder, ObjectControlValue } = this.state;
    let objDoiTac = ObjectControlValue.DoiTac;

    objDoiTac = { ...objDoiTac, Value: value };
    ObjectControlValue = { ...ObjectControlValue, DoiTac: objDoiTac };
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

    if (value == -1) {
      ObjectControlValue = { ...ObjectControlValue, NhanVienGiao: { ListOption: [], Value: [] } };
    }

    let stateChange = this.state;
    stateChange = { ...stateChange, objCoordinator: objCoordinator, objDeliverUser: objDeliverUser, ShipmentOrder: ShipmentOrder, ObjectControlValue: ObjectControlValue };

    this.setState(stateChange, () => {
      if (value !== -1) {
        this.handleLoadCacheSelectNhanVienGiao();
      }
    });
  }

  handleLoadBienSoXe() {
    let objRouteVehicleRequset = {
      VehicleID: 1,
      ExpectedDeliveryDate: this.props.InfoCoordinator[0].ExpectedDeliveryDate,
      CoordinatorStoreIDLst: this.props.InfoCoordinator.map((e) => e.CoordinatorStoreID).join(","),
      ShipmentOrderIDLst: this.props.InfoCoordinator.map((e) => e.ShipmentOrderID).join(","),
    };
    let lstVehicle = [];

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
            lstVehicle.push(objVehicle);
          }
        });

        if (this.props.InfoCoordinator[0].VehicleID) {
          let vehicleID = this.props.InfoCoordinator[0].VehicleID;
          if (vehicleID !== 0 && vehicleID !== -1) {
            let vehicle = lstVehicle.find((x) => x.value === vehicleID);
            if (vehicle && vehicle.TotalAbilityVolume >= vehicle.TotalShipmentVolume + vehicle.TotalVolume) {
              this.props.onShowNotification(
                "Tổng thể tích tối thiểu cần cho xe tải là " + vehicle.TotalAbilityVolume + " Hiện tại chỉ có " + (vehicle.TotalShipmentVolume + vehicle.TotalVolume),
                true,
                false,
                "rgb(255, 184, 24)",
                "rgb(186, 101, 8)"
              );
            }
          }
        }

        let changeState = this.state;
        let objRoute = this.props.InfoCoordinator.find((n) => n.ShipmentRouteID == this.props.ShipmentRouteID);
        const objVehicle = objRoute && lstVehicle.find((x) => x.value === objRoute.VehicleID);
        let objInfoCoordinator = changeState.objCoordinator;

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

        console.log("objInfoCoordinator", objInfoCoordinator);

        lstVehicle.sort(function (a, b) {
          return a.OrderM3 - b.OrderM3;
        });

        changeState = {
          ...changeState,
          VehicleLst: lstVehicle,
          objCoordinator: objInfoCoordinator,
        };
        this.setState(changeState);
      }
    });
  }

  handleChangeLoaiXeTatCa(value) {
    let changeState = this.state;
    let objControlValue = changeState.ObjectControlValue;

    objControlValue = { ...objControlValue, LoaiXe: { Value: value } };
    changeState = {
      ...changeState,
      ObjectControlValue: objControlValue,
    };

    if (value == 1) {
      changeState["ShipmentOrder"].map((item, index) => {
        changeState["ShipmentOrder"][index]["DriverUser"] = "";
        changeState["ShipmentOrder"][index]["DriverUserFull"] = "";
        changeState["ShipmentOrder"][index]["VehicleID"] = -1;
        changeState["ShipmentOrder"][index]["CarrierTypeID"] = value;
      });

      let objCoordinator = changeState.objCoordinator;

      objCoordinator = { ...objCoordinator, CarrierTypeID: value, IsRoute: true, VehicleID: -1, VehicleDriverUser: { value: -1, label: "" } };
      changeState = { ...changeState, VehicleLst: [], objCoordinator: objCoordinator };

      this.setState(changeState);
    } else {
      changeState["ShipmentOrder"].map((item, index) => {
        if (item.CarrierTypeID == 1) {
          changeState["ShipmentOrder"][index]["DriverUser"] = "";
          changeState["ShipmentOrder"][index]["DriverUserFull"] = "";
          changeState["ShipmentOrder"][index]["VehicleID"] = changeState["objCoordinator"]["VehicleID"];
          changeState["ShipmentOrder"][index]["CarrierTypeID"] = value;
        }
      });

      this.setState(changeState, () => {
        this.handleLoadBienSoXe();
      });
    }
  }

  handleSelectBienSoXeValueChange(value, options) {
    let { objCoordinator, ShipmentOrder } = this.state;

    if (options.vehicle.TotalAbilityVolume >= options.vehicle.TotalShipmentVolume + options.vehicle.TotalVolume) {
      this.props.onShowNotification(
        "Tổng thể tích tối thiểu cần cho xe tải là " + options.vehicle.TotalAbilityVolume + " Hiện tại chỉ có " + (options.vehicle.TotalShipmentVolume + options.vehicle.TotalVolume),
        true,
        false,
        "rgb(255, 184, 24)",
        "rgb(186, 101, 8)"
      );
    }

    objCoordinator["VehicleID"] = options.value;

    if (options.MainDriverUser != "") {
      objCoordinator["VehicleDriverUser"] = { value: options.vehicle.MainDriverUser, label: options.vehicle.MainDriverUser + "-" + options.vehicle.MainDriverUserFullName };
    } else {
      objCoordinator["VehicleDriverUser"] = "";
    }

    ShipmentOrder.map((row, indexRow) => {
      if (row.IsPermission == true) {
        row["VehicleDriverUser"] = options.vehicle.MainDriverUser;
        row["VehicleID"] = options.value;
      }
    });

    this.setState({
      objCoordinator: objCoordinator,
      ShipmentOrder: ShipmentOrder,
    });
  }

  // handleMapObjectDescription() {
  //   let objDescription = this.props.InfoCoordinator.reduce((a, v) => {
  //     return {
  //       ...a,
  //       [v.ShipmentOrderID]: {
  //         isShow: false,
  //         content: v.CoordinatorNote,
  //       },
  //     };
  //   }, {});

  //   let changeState = this.state;

  //   changeState = { ...changeState, ObjectDescription: objDescription };
  //   this.setState(changeState);
  // }

  handleCloseModal() {
    this.props.hideModal();
  }

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

  handleOnValueChange(rowname, rowvalue, rowIndex) {
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
            this.props.onShowNotification(apiResult.Message, apiResult.IsError);
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

  // Kiểm tra trùng nhân viên giao hàng
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
        const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn lại, bắt buộc cùng loại phương tiện trong một tuyến." };
        elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
        return;
      }

      if (this.state.objCoordinator.IsRoute == true) {
        if (this.checkDeliverUser(row.ShipmentOrder_DeliverUserList, this.state.ShipmentOrder[0].ShipmentOrder_DeliverUserList) == false) {
          //   this.props.onShowNotification("không cùng nhân viên giao hàng", true);
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

      if (this.state.objCoordinator.CarrierTypeID == 1) {
        this.state.ShipmentOrder[indexRow].VehicleID = -1;
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
      this.props.onShowNotification(this.checkInputName(elementobject), true);
      return;
    }

    if (this.state.ShipmentRouteID != "") {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddInfoCoordinatorLstNew_1", this.state.ShipmentOrder).then((apiResult) => {
        this.props.onShowNotification(apiResult.Message, apiResult.IsError);
        if (!apiResult.IsError) {
          this.props.onCloseModal({ IsShowModel: false });
        }
      });
    } else {
      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddInfoCoordinatorLstNew_1", this.state.ShipmentOrder).then((apiResult) => {
        this.props.onShowNotification(apiResult.Message, apiResult.IsError);

        if (!apiResult.IsError) {
          this.props.onCloseModal({ IsShowModel: false });
        }
      });
    }
  }

  // Chuyển đổi sang loại xe
  handleChangeCourse(CarrierTypeID, rowIndex) {
    let changeState = this.state;

    changeState["ShipmentOrder"][rowIndex]["DriverUser"] = "";
    changeState["ShipmentOrder"][rowIndex]["DriverUserFull"] = "";
    changeState["ShipmentOrder"][rowIndex].VehicleID = -1;
    changeState["ShipmentOrder"][rowIndex]["CarrierTypeID"] = CarrierTypeID;

    if (CarrierTypeID === 2) {
      changeState["ShipmentOrder"][rowIndex].VehicleID = this.state.objCoordinator.VehicleID;
    }

    let isXeTai = changeState["ShipmentOrder"].some((item) => item.CarrierTypeID == 2);

    if (isXeTai) {
      this.handleLoadBienSoXe();
      let objControlValue = changeState.ObjectControlValue;

      objControlValue = { ...objControlValue, LoaiXe: { Value: 2 } };
      changeState = { ...changeState, ObjectControlValue: objControlValue };

      this.setState(changeState);
    } else {
      let objCoordinator = changeState["objCoordinator"];
      let objControlValue = changeState.ObjectControlValue;

      objControlValue = { ...objControlValue, LoaiXe: { Value: 1 } };
      objCoordinator = { ...objCoordinator, CarrierTypeID: 1, IsRoute: true, VehicleID: -1, VehicleDriverUser: {} };
      changeState = { ...changeState, VehicleLst: [], objCoordinator: objCoordinator, ObjectControlValue: objControlValue };

      this.setState(changeState);
    }
  }

  // Xoá 1 đơn
  handleDeleteID(paramShipmentOrderID) {
    let resultRouteID = this.state.ShipmentOrder.find((n) => n.ShipmentOrderID == paramShipmentOrderID).ShipmentRouteID;

    this.state.ShipmentOrder.splice(
      this.state.ShipmentOrder.findIndex((n) => n.ShipmentOrderID == paramShipmentOrderID),
      1
    );

    let resultCheckRouteID = this.state.ShipmentOrder.find((n) => n.ShipmentRouteID == resultRouteID);

    if (resultRouteID == "" || resultCheckRouteID != null || this.props.ShipmentRouteID != "") {
      let isXeTai = this.state.ShipmentOrder.length === 0 ? false : this.state.ShipmentOrder.some((item) => item.CarrierTypeID == 2);

      if (isXeTai) {
        this.handleLoadBienSoXe();
      }

      let changeState2 = this.state;
      let objControlValue = changeState2.ObjectControlValue;
      let objectVehicleDriverUser = { ...changeState2.objCoordinator, CarrierPartnerID: -1, VehicleDriverUser: {} };

      objControlValue = { ...objControlValue, LoaiXe: { Value: isXeTai ? 2 : 1 } };
      changeState2 = {
        ...changeState2,
        ShipmentOrder: this.state.ShipmentOrder,
        Via_Durations: 0,
        Via_Distances: "",
        objCoordinator: { objectVehicleDriverUser },
        ObjectControlValue: objControlValue,
      };

      this.setState(changeState2);
    } else {
      let changeState = this.state;
      changeState = { ...changeState, ShipmentOrder: this.state.ShipmentOrder, ShipmentRouteID: "", Via_Durations: 0, Via_Distances: "" };

      this.setState(changeState);
    }

    this.props.onRemoveShip(paramShipmentOrderID);
  }

  // Thay đổi vị trí đơn
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
    let changeState = this.state;
    let lstShipmentOrder = changeState.ShipmentOrder;

    lstShipmentOrder = lstShipmentOrder.filter((n) => n.ShipmentRouteID == "");

    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentOrderRouteLst", RouteID).then((apiResult) => {
      if (!apiResult.IsError) {
        apiResult.ResultObject.map((item) => {
          let resultdd = lstShipmentOrder.find((n) => n.ShipmentOrderID == item.ShipmentOrderID);

          if (resultdd == undefined) {
            lstShipmentOrder.push(item);
          }
        });

        changeState = { ...changeState, ShipmentRouteID: RouteID, ShipmentOrder: lstShipmentOrder, Via_Durations: 0, Via_Distances: "" };
        this.setState(changeState);
      } else {
        this.props.onShowNotification(apiResult.Message, apiResult.IsError);
      }
    });
  };

  handleClickShipmentOrderSame(paramShipmentOrderID) {
    let { ShipmentOrder, ShipmentOrderSameLst } = this.state;

    let resultShipmentOrderSame = ShipmentOrderSameLst.find((n) => n.ShipmentOrderID == paramShipmentOrderID);
    let resultdd = ShipmentOrder.find((n) => n.ShipmentOrderID == paramShipmentOrderID);

    if (resultdd == undefined) {
      ShipmentOrder.push(resultShipmentOrderSame);

      let changeState = this.state;
      let objDescription = changeState.ObjectDescription;

      objDescription = { ...objDescription, [resultShipmentOrderSame.ShipmentOrderID]: { isShow: false, content: "" } };
      changeState = { ...changeState, ShipmentOrder: ShipmentOrder, ObjectDescription: objDescription };

      this.setState(changeState);
    }
  }

  handleDistances = () => {
    let { ShipmentOrder, ShipmentOrderSameLst } = this.state;
    let Points = [];
    let DistancesRouteLst = [];

    ShipmentOrder.map((item, index) => {
      let strDistances = "";
      const Receivervalues = item.ReceiverGeoLocation.split(",");

      if (Receivervalues == "") {
        this.props.onShowNotification("Không xác định được tạo độ nhà vận đơn " + item.ShipmentOrderID, true);
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

  HandleChangeGird(paramID) {
    if (paramID == 1) {
      let changeState = this.state;

      changeState = { ...changeState, GirdSlide: true };
      this.setState(changeState);
    } else {
      let changeState = this.state;
      let lstShipmentOrder = changeState.ShipmentOrder;

      let RowWardIDelement = [];

      lstShipmentOrder.map((row, indexRow) => {
        RowWardIDelement.push(row.ReceiverWardID);
      });

      let objRouteByWard = { CoordinatorStoreID: "73309", WardIDLst: RowWardIDelement.join() };

      this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentRouteByWardID", objRouteByWard).then((apiResult) => {
        if (!apiResult.IsError) {
          changeState = { ...changeState, GirdSlide: false, ShipmentRouteSameLst: apiResult.ResultObject };
          this.setState(changeState);
        } else {
          this.props.onShowNotification(apiResult.Message, apiResult.IsError);
        }
      });
    }
  }

  handleDeleteRoute(paramRouteID) {
    let lstMLObject = [];
    let MLObject = { ShipmentRouteID: paramRouteID };

    lstMLObject.push(MLObject);

    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/DeleteList", lstMLObject).then((apiResult) => {
      this.props.onShowNotification(apiResult.Message, apiResult.IsError);
      if (!apiResult.IsError) {
        this.props.onCloseModal({ IsShowModel: false, IsDataGridSmallSize: false });
      }
    });
  }

  handleDescriptionSubmit(item) {
    let changeState = this.state;
    let objDescription = changeState.ObjectDescription;
    let isShow = objDescription[item.ShipmentOrderID]["isShow"];

    objDescription = { ...objDescription, [item.ShipmentOrderID]: { isShow: !isShow, content: objDescription[item.ShipmentOrderID]["content"] } };

    changeState = { ...changeState, ObjectDescription: objDescription };
    this.setState(changeState);
  }

  handleDescriptionChange(item, event) {
    const { value } = event.target;
    let changeState = this.state;
    let objDescription = changeState.ObjectDescription;

    objDescription = { ...objDescription, [item.ShipmentOrderID]: { isShow: objDescription[item.ShipmentOrderID]["isShow"], content: value } };
    changeState = { ...changeState, ObjectDescription: objDescription };

    this.setState(changeState);
  }

  //#endregion

  //#region Render

  render() {
    let resultShipmentRoute = this.state.ShipmentRouteLst.filter((n) => n.ShipmentRouteID != this.state.ShipmentRouteID);
    let resultShipmentRouteSame = this.state.ShipmentRouteSameLst.filter((n) => n.ShipmentRouteID != this.state.ShipmentRouteID);
    let isXeTai = this.state.ShipmentOrder.every((item) => item.CarrierTypeID == 2);
    let arrayVehicleDriverUser = [{ ...this.state.objCoordinator.VehicleDriverUser }];

    return (
      <Fragment>
        <Drawer
          className="ant-modal-custom"
          title={<h4 style={{ margin: 0 }}>Phân tuyến điều phối vận đơn</h4>}
          headerStyle={{ height: "6vh", padding: "7px", backgroundColor: "gold" }}
          bodyStyle={{ height: "93vh", padding: "7px" }}
          style={{ backgroundColor: "#eeeeee70" }}
          placement="right"
          closable={true}
          visible={true}
          maskClosable={true}
          width="50vw"
          mask={false}
          onClose={(event) => {
            if (this.props.onCloseModal) {
              this.props.onCloseModal({ IsShowModel: false, IsDataGridSmallSize: false });
            }
          }}
        >
          <div style={{ height: isXeTai ? "18vh" : "13vh", overflowX: "hidden", overflowY: "auto" }}>
            <Row gutter={[8, 8]} style={{ marginBottom: "5px" }} className="f-13">
              <Col span={5} className="ant-col-ma">
                Đối tác :
              </Col>
              <Col sm={7} md={7} lg={8} xl={10}>
                <Select
                  value={this.state.ObjectControlValue.DoiTac.Value}
                  style={{ width: "100%" }}
                  dropdownMatchSelectWidth={500}
                  onChange={(value) => this.handleSelectDoiTacValueChange("CarrierPartnerID", value)}
                >
                  {this.state.ObjectControlValue.DoiTac.ListOption.map((item, index) => (
                    <Select.Option key={index} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              {/* ẩn tag xe máy, xe tải vì chỉ có nhân viên xe máy giao */}
              <Col sm={12} md={12} lg={11} xl={9} style={{ textAlign: "center" }}>
                {/* <Radio.Group
                  buttonStyle="solid"
                  value={this.state.ObjectControlValue.LoaiXe.Value}
                  onChange={(event) => {
                    this.handleChangeLoaiXeTatCa(event.target.value);
                  }}
                >
                  <Space>
                    <Radio.Button value={1}>
                      <Space>
                        <i className="fa fa-motorcycle"></i> Xe máy
                      </Space>
                    </Radio.Button>
                    <Radio.Button value={2}>
                      <Space>
                        <i className="fa fa-truck"></i> Xe tải
                      </Space>
                    </Radio.Button>
                  </Space>
                </Radio.Group> */}
              </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ marginBottom: "5px" }} className="f-13">
              <Col span={5} className="ant-col-ma">
                Nhân viên giao :
              </Col>
              <Col span={19}>
                {this.state.objCoordinator.CarrierPartnerID == -1 || this.state.objCoordinator.CarrierPartnerID == 0 ? (
                  <Select
                    value={this.state.ObjectControlValue.NhanVienGiao.Value}
                    style={{ width: "100%" }}
                    mode="multiple"
                    optionLabelProp="label"
                    dropdownAlign="center"
                    maxTagCount={3}
                    onInputKeyDown={(event) => this.handleSelectNhanVienGiaoInputValueChange(event)}
                    onChange={(value, options) => this.handleSelectNhanVienGiaoValueChange_1(value, options)}
                  >
                    {this.state.ObjectControlValue.NhanVienGiao.ListOption.map((item, index) => (
                      <Select.Option key={index} value={item.value} label={item.name} user={item}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    value={this.state.ObjectControlValue.NhanVienGiao.Value}
                    style={{ width: "100%" }}
                    mode="multiple"
                    maxTagCount={3}
                    onInputKeyDown={(event) => this.handleSelectNhanVienGiaoInputValueChange(event)}
                    onChange={(value, options) => this.handleSelectNhanVienGiaoValueChange_2(value, options)}
                    optionLabelProp="label"
                  >
                    {this.state.ObjectControlValue.NhanVienGiao.ListOption.map((item, index) => (
                      <Select.Option key={index} value={item.value} label={item.name} user={item}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ marginBottom: "5px" }} className="f-13">
              {/* {isXeTai && (
                <Fragment>
                  <Col span={5} className="ant-col-ma">
                    Bảng số xe :
                  </Col>
                  <Col span={19}>
                    <Input.Group key={this.state.VehicleLst} compact>
                      <Select
                        style={{ width: "60%" }}
                        value={this.state.objCoordinator.VehicleID === -1 ? "" : this.state.objCoordinator.VehicleID}
                        onChange={(value, options) => this.handleSelectBienSoXeValueChange(value, options)}
                      >
                        {this.state.VehicleLst.map((item, index) => (
                          <Select.Option value={item.value} vehicle={item}>
                            {item.label}
                          </Select.Option>
                        ))}
                      </Select>
                      {this.state.objCoordinator.VehicleDriverUser && (
                        <Select style={{ width: "40%" }} value={this.state.objCoordinator.VehicleDriverUser.value}>
                          {arrayVehicleDriverUser.map((item, index) => (
                            <Select.Option value={item.value} vehicle={item}>
                              {item.label}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </Input.Group>
                  </Col>
                </Fragment>
              )} */}
            </Row>
          </div>
          <div style={{ height: isXeTai ? "48vh" : "46vh", overflowX: "hidden", overflowY: "auto", scrollSnapType: "y mandatory" }} className="f-13 scroll-2">
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
                  <Row gutter={24} style={{ marginBottom: "10px", scrollSnapAlign: "center" }}>
                    <Col span={24}>
                      <Card
                        key={index}
                        size="small"
                        headStyle={{ border: "1px solid #74b9ff", borderBottom: "none", padding: "0 6px" }}
                        bodyStyle={{ border: "1px solid #74b9ff", padding: "6px" }}
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
                        style={{ width: "100%", backgroundColor: "azure" }}
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
                              {/* ẩn tag xe máy, xe tải vì chỉ có nhân viên xe máy giao */}
                              {/* {isPermission == false ? (
                                <Col span={8}>
                                  <Tag.CheckableTag
                                    checked={item.CarrierTypeID == 1 || item.CarrierTypeID == 0 ? true : false}
                                    style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}
                                    onClick={() => this.handleChangeCourse(1, index)}
                                  >
                                    <Space>
                                      <i className="fa fa-motorcycle"></i> Xe máy
                                    </Space>
                                  </Tag.CheckableTag>
                                </Col>
                              ) : (
                                <Col span={8}>
                                  <Tag.CheckableTag checked={item.CarrierTypeID == 1 || item.CarrierTypeID == 0 ? true : false} style={{ width: "100%", borderColor: "#1890ff", textAlign: "center" }}>
                                    <Space>
                                      <i className="fa fa-motorcycle"></i> Xe máy
                                    </Space>
                                  </Tag.CheckableTag>
                                </Col>
                              )}
                              {isPermission == false ? (
                                <Col span={8}>
                                  <Tag.CheckableTag
                                    checked={item.CarrierTypeID == 2 ? true : false}
                                    style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}
                                    onClick={() => this.handleChangeCourse(2, index)}
                                  >
                                    <Space>
                                      <i className="fa fa-truck"></i> Xe tải
                                    </Space>
                                  </Tag.CheckableTag>
                                </Col>
                              ) : (
                                <Col span={8}>
                                  <Tag.CheckableTag checked={item.CarrierTypeID == 2 ? true : false} style={{ width: "100%", borderColor: "#74b9ff", textAlign: "center" }}>
                                    <Space>
                                      <i clasclassNames="fa fa-truck"></i> Xe tải
                                    </Space>
                                  </Tag.CheckableTag>
                                </Col>
                              )} */}

                              <Col span={8}>
                                <Tag.CheckableTag
                                  checked
                                  style={{ width: "100%", backgroundColor: "#33cabb", borderColor: "#33cabb", textAlign: "center" }}
                                  onClick={() => this.handleDescriptionSubmit(item)}
                                >
                                  <Space>
                                    <i className="fa fa-edit"></i> Ghi chú
                                  </Space>
                                </Tag.CheckableTag>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={1}>
                            <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                          </Col>
                          <Col span={8}></Col>
                          <Col span={1}>
                            <Divider type="vertical" style={{ height: "100%", backgroundColor: " #74b9ff" }}></Divider>
                          </Col>
                          <Col span={2} style={{ display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "center" }}>
                            {this.state.ShipmentOrder.length > 1 && (
                              <Row gutter={24}>
                                <Col span={24}>
                                  <i className="ti-angle-up" onClick={(event) => this.handleChangeOder(index, -1)}></i>
                                </Col>
                              </Row>
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
                            {this.state.ShipmentOrder.length > 1 && (
                              <Row>
                                <Col>
                                  <i className="ti-angle-down" onClick={(event) => this.handleChangeOder(index, 1)}></i>
                                </Col>
                              </Row>
                            )}
                          </Col>
                        </Row>
                        {this.state.ObjectDescription[item.ShipmentOrderID] && this.state.ObjectDescription[item.ShipmentOrderID]["isShow"] === true && (
                          <Row gutter={24}>
                            <Col span={24}>
                              <Input.TextArea
                                rows={4}
                                style={{ width: "100%", marginTop: "12px" }}
                                defaultValue={this.state.ObjectDescription[item.ShipmentOrderID]["content"]}
                                onChange={(event) => this.handleDescriptionChange(item, event)}
                              />
                            </Col>
                          </Row>
                        )}
                      </Card>
                    </Col>
                  </Row>
                );
              })}
          </div>
          <div style={{ height: "25vh", overflowX: "hidden", overflowY: "auto", marginBottom: "5px" }} className="f-13">
            {/* <Row gutter={24} style={{ marginBottom: "5px" }}>
              <Col span={12}>
                {this.state.ShipmentRouteID != "" && (
                  <Tag color="cyan">
                    <Space>
                      Mã tuyến {this.state.ShipmentRouteID}
                      <CloseCircleTwoTone twoToneColor="#ff7675" onClick={(event) => this.handleDeleteRoute(this.state.ShipmentRouteID)} />
                    </Space>
                  </Tag>
                )}
              </Col>
              <Col span={12} style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Space>
                  <Button size="small" type="primary">
                    Tính khoảng cách
                  </Button>
                  <Button size="small" icon={<i className="ti-menu-alt"></i>} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                  <Button size="small" icon={<i className="ti-menu"></i>} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                </Space>
              </Col>
            </Row>
            <div style={{backgroundColor: "#91d2e7", padding: "10px 0 15px", borderRadius: "5px"}}>
              <Row gutter={24}>
                <Col span={24}>
                  {(() => {
                    if (resultShipmentRoute.length > 0) {
                      let arrObject = resultShipmentRoute.filter((item1) => {
                        return !this.state.ShipmentOrder.some((item2) => item2.ShipmentOrderID == item1.ShipmentOrderID);
                      });
                      return (
                        <Carousel
                          className="ant-carousel-custom"
                          autoplay
                          autoplaySpeed={2000}
                          slidesToShow={arrObject.length > 1 ? 2 : 1}
                          arrows={true}
                          nextArrow={
                            <Button type="primary" size="middle">
                              <RightOutlined style={{ color: "black" }} />
                            </Button>
                          }
                          prevArrow={
                            <Button type="primary" size="middle">
                              <LeftOutlined style={{ color: "black" }} />
                            </Button>
                          }
                        >
                          {resultShipmentRoute.length > 0 &&
                            resultShipmentRoute.map((item, index) => (
                              <Card
                                key={index}
                                size="small"
                                title={
                                  <Space>
                                    <Link target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                      <Tag color="cyan"> {item.ShipmentOrderID}</Tag>
                                    </Link>
                                    <Tag color="orange">
                                      <i className="ti ti-timer"></i>
                                      {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                    </Tag>
                                  </Space>
                                }
                                style={{ width: "100%", cursor: "pointer" }}
                                headStyle={{ padding: "0 6px" }}
                                bodyStyle={{ padding: "6px" }}
                              >
                                <Tooltip placement="top" color="blue" title={item.DeliverUserFullNameList}>
                                  <p className="text text-overflow">{item.DeliverUserFullNameList}</p>
                                </Tooltip>
                                <Tooltip placement="top" color="blue" title={item.RouteNote.split(";")[0]}>
                                  <p className="text text-overflow">{item.RouteNote.split(";")[0]}</p>
                                </Tooltip>
                              </Card>
                            ))}
                        </Carousel>
                      );
                    } else if (resultShipmentRouteSame.length > 0 && this.state.GirdSlide === false) {
                      let arrObject = this.state.resultShipmentRouteSame.filter((item1) => {
                        return !this.state.ShipmentOrder.some((item2) => item2.ShipmentOrderID == item1.ShipmentOrderID);
                      });

                      return (
                        <Carousel
                          className="ant-carousel-custom"
                          autoplay
                          autoplaySpeed={2000}
                          slidesToShow={arrObject.length > 1 ? 2 : 1}
                          arrows={true}
                          nextArrow={
                            <Button type="primary" size="middle">
                              <RightOutlined style={{ color: "black" }} />
                            </Button>
                          }
                          prevArrow={
                            <Button type="primary" size="middle">
                              <LeftOutlined style={{ color: "black" }} />
                            </Button>
                          }
                        >
                          {resultShipmentRouteSame.length > 0 &&
                            resultShipmentRouteSame.map((item, index) => (
                              <Card
                                key={index}
                                size="small"
                                title={
                                  <Space>
                                    <Link target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                      <Tag color="cyan"> {item.ShipmentOrderID}</Tag>
                                    </Link>
                                    <Tag color="orange">
                                      <i className="ti ti-timer"></i>
                                      {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                    </Tag>
                                  </Space>
                                }
                                style={{ width: "100%", cursor: "pointer" }}
                                headStyle={{ padding: "0 6px" }}
                                bodyStyle={{ padding: "6px" }}
                              >
                                <Tooltip placement="top" color="blue" title={item.DeliverUserFullNameList}>
                                  <p className="text text-overflow">{item.DeliverUserFullNameList}</p>
                                </Tooltip>
                                <Tooltip placement="top" color="blue" title={item.RouteNote.split(";")[0]}>
                                  <p className="text text-overflow">{item.RouteNote.split(";")[0]}</p>
                                </Tooltip>
                              </Card>
                            ))}
                        </Carousel>
                      );
                    } else {
                      let arrObject = this.state.ShipmentOrderSameLst.filter((item1) => {
                        return !this.state.ShipmentOrder.some((item2) => item2.ShipmentOrderID == item1.ShipmentOrderID);
                      });

                      return (
                        <Carousel
                          className="ant-carousel-custom"
                          autoplay
                          autoplaySpeed={2000}
                          slidesToShow={arrObject.length > 1 ? 2 : 1}
                          arrows={true}
                          nextArrow={
                            <Button type="primary" size="middle">
                              <RightOutlined style={{ color: "black" }} />
                            </Button>
                          }
                          prevArrow={
                            <Button type="primary" size="middle">
                              <LeftOutlined style={{ color: "black" }} />
                            </Button>
                          }
                        >
                          {this.state.ShipmentOrderSameLst.length > 0 &&
                            this.state.ShipmentOrderSameLst.map((item, index) => {
                              let resultdd = this.state.ShipmentOrder.find((n) => n.ShipmentOrderID == item.ShipmentOrderID);

                              if (resultdd === undefined) {
                                return (
                                  <div>
                                    <Card
                                      key={index}
                                      size="small"
                                      title={
                                        <Space>
                                          <Link target="_blank" to={{ pathname: "/ShipmentOrder/Detail/" + item.ShipmentOrderID }}>
                                            <Tag color="cyan"> {item.ShipmentOrderID}</Tag>
                                          </Link>
                                          <Tag color="orange">
                                            <i className="ti ti-timer"></i>
                                            {item.ExpectedDeliveryDate != null ? this._genCommentTime(item.ExpectedDeliveryDate) : ""}
                                          </Tag>
                                        </Space>
                                      }
                                      style={{ width: "100%", cursor: "pointer" }}
                                      headStyle={{ padding: "0 6px" }}
                                      bodyStyle={{ padding: "6px" }}
                                      onClick={(event) => this.handleClickShipmentOrderSame(item.ShipmentOrderID)}
                                    >
                                      <Tooltip placement="top" color="blue" title={item.ShipItemNameList}>
                                        <p className="text text-overflow">{item.ShipItemNameList}</p>
                                      </Tooltip>

                                      <Tooltip placement="top" color="blue" title={item.ReceiverFullAddress}>
                                        <p className="text bold text-overflow">{item.ReceiverFullAddress}</p>
                                      </Tooltip>
                                    </Card>
                                  </div>
                                );
                              }
                            })}
                        </Carousel>
                      );
                    }
                  })()}
                </Col>
              </Row>
            </div> */}
          </div>
          <div style={{ height: "6vh", overflowX: "hidden", overflowY: "auto" }}>
            <Row gutter={24} style={{ width: "100%" }}>
              <Col span={4} offset={11}>
                <Space>
                  <Button type="primary" onClick={(event) => this.handleConfirm()}>
                    Phân tuyến
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </Drawer>
      </Fragment>
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
