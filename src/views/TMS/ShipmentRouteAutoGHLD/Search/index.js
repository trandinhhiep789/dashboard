import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import "react-notifications-component/dist/theme.css";
import { Button, Card, Col, Row, Space, Statistic, Tabs, Popover, Tooltip, Input, Tag, Select } from "antd";
import { EyeOutlined, PartitionOutlined } from "@ant-design/icons";
import { ModalManager } from "react-dynamic-modal";
import Collapsible from "react-collapsible";
import moment from "moment";
import ReactNotification from "react-notifications-component";

import {
  AddLink,
  APIHostName,
  DataGridColumnList,
  DeleteAPIPath,
  IDSelectColumnName,
  InitSearchParams,
  PagePath,
  PKColumnName,
  SearchAPIPath,
  SearchElementList,
  SearchMLObjectDefinition,
} from "../../ShipmentRoute/constants";

import "../../../../css/DataGridShipmentRouteAuto.scss";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { hideModal, showModal } from "../../../../actions/modal";
import { MessageModal } from "../../../../common/components/Modal";
import { updatePagePath } from "../../../../actions/pageAction";
import DataGridShipmentRouteAuto from "../Components/DataGridShipmentRouteAuto";
import ModalSearchFormShipmentRouteAuto from "../Components/ModalSearchFormShipmentRouteAuto";
import ModalVietBanDoShipmentRouteAuto from "../Components/ModalVietBanDoShipmentRouteAuto";
import SearchFormShipmentRouteAuto from "../Components/SearchFormShipmentRouteAuto";

class SearchCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CallAPIMessage: "",
      GridDataSource: [],
      GridDataSourceOrigin: [],
      IsCallAPIError: false,
      SearchData: InitSearchParams,
      SearchElementList: SearchElementList,
      cssNotification: "",
      iconNotification: "",
      PageNumber: 1,
      IsLoadDataComplete: false,
      IsLoadData: false,
      PrintID: "",
      DataPrint: {},
      IsDataGridSmallSize: false,
      GridDataShip: [],
      GridDataShipFormModalTemp: [],
      GridDataShipFormModal: [],
      ShipmentRouteID: "",
      IsShowModel: false,
      IsShowModelMap: false,
      ShipmentOrderSame: [],
      DataSourceMap: [],
      ShipmentRouteAutoDataSource: {
        Motor: {
          ListShipmentOrderRoute: [],
          ListTotalDistance: [],
          ListTotalLoad: [],
          TotalDistance: 0,
          TotalLoad: 0,
        },
        Truck: {
          ListShipmentOrderRoute: [],
          ListTotalDistance: [],
          ListTotalLoad: [],
          TotalDistance: 0,
          TotalLoad: 0,
        },
        Dropped: [],
      },
      UIEffect: {
        ButtonShipmentRouteAuto: {
          IsLoading: false,
          IsDisabled: false,
        },
        TabShipmentRouteAuto: {
          Content: "",
        },
        ButtonMotorApply: {
          IsDisabled: false,
        },
        ButtonTruckApply: {
          IsDisabled: false,
        },
        Collapse: {
          IsDisabled: false,
        },
        Tabs: {
          ActiveTab: "1"
        }
      },

      ObjectControlValue: {
        NhanVienGiao: {
          XeMay: {
            Values: {},
            Options: {},
          },
          XeTai: {
            Values: {},
            Options: {},
          },
          ButtonMotorApply: {
            IsDisabled: false,
          },
          ButtonTruckApply: {
            IsDisabled: false,
          },
        },
      },
    };

    this.searchref = React.createRef();
    this.notificationDOMRef = React.createRef();
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOnChangePage = this.handleOnChangePage.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleUserCoordinator = this.handleUserCoordinator.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleCheckShip = this.handleCheckShip.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModel = this.handleShowModel.bind(this);
    this.handleRemoveCheckShip = this.handleRemoveCheckShip.bind(this);
    this.handleClickShipmentRoute = this.handleClickShipmentRoute.bind(this);
    this.handleClickShip = this.handleClickShip.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.handleShowModalMapMotorRoute = this.handleShowModalMapMotorRoute.bind(this);
    this.handleShowModalMapTruckRoute = this.handleShowModalMapTruckRoute.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();

    const localShipmentOrderInfo = localStorage.getItem("SearchShipmentOrderInfo");
    let InitSearchParams = [];

    if (localShipmentOrderInfo == null) {
      InitSearchParams = [
        {
          SearchKey: "@Keyword",
          SearchValue: "",
        },
        {
          SearchKey: "@RECEIVERPHONENUMBER",
          SearchValue: "",
        },
        {
          SearchKey: "@SHIPMENTORDERTYPEID",
          SearchValue: "",
        },
        {
          SearchKey: "@FromDate",
          SearchValue: new Date(),
        },
        {
          SearchKey: "@ToDate",
          SearchValue: new Date(),
        },
        {
          SearchKey: "@RECEIVERPROVINCEID",
          SearchValue: -1,
        },
        {
          SearchKey: "@RECEIVERDISTRICTID",
          SearchValue: -1,
        },
        {
          SearchKey: "@RECEIVERWARDID",
          SearchValue: -1,
        },
        {
          SearchKey: "@SENDERSTOREID",
          SearchValue: -1,
        },
        {
          SearchKey: "@COORDINATORSTOREID",
          SearchValue: -1,
        },
        // {
        //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        //     SearchValue: this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : "1,2,3",
        // },
        {
          SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
          SearchValue: "1",
        },
        {
          SearchKey: "@IsCoordinator",
          SearchValue: 2,
        },
        {
          SearchKey: "@Typename",
          SearchValue: -1,
        },
        {
          SearchKey: "@RequestStoreID",
          SearchValue: -1,
        },
        {
          SearchKey: "@CarrierTypeID",
          SearchValue: -1,
        },
        {
          SearchKey: "@PAGESIZE",
          SearchValue: 1000,
        },
        {
          SearchKey: "@PAGEINDEX",
          SearchValue: 0,
        },
      ];
    } else {
      const ShipmentOrderInfo = JSON.parse(localShipmentOrderInfo);
      this.state.SearchElementList.find((n) => n.name == "cbShipmentOrderTypeID").value = ShipmentOrderInfo.ShipmentOrderTypeID;
      // this.state.SearchElementList.find(n => n.name == 'dtCreatedOrderTimeFo').value=ShipmentOrderInfo.CreatedOrderTimeFo;
      // this.state.SearchElementList.find(n => n.name == 'dtCreatedOrderTimeTo').value=ShipmentOrderInfo.CreatedOrderTimeTo;
      this.state.SearchElementList.find((n) => n.name == "cbReceiverProvinceID").value = ShipmentOrderInfo.ReceiverProvinceID;
      this.state.SearchElementList.find((n) => n.name == "cbReceiverDistrictID").value = ShipmentOrderInfo.ReceiverDistrictID;
      this.state.SearchElementList.find((n) => n.name == "cbReceiverWardID").value = ShipmentOrderInfo.ReceiverWardID;
      this.state.SearchElementList.find((n) => n.name == "cbSenderStoreID").value = ShipmentOrderInfo.SenderStoreID;
      this.state.SearchElementList.find((n) => n.name == "cbCoordinatorStoreID").value = ShipmentOrderInfo.CoordinatorStoreID;
      this.state.SearchElementList.find((n) => n.name == "cbShipmentOrderStatusGroupID").value = ShipmentOrderInfo.ShipmentOrderStatusGroupID;
      this.state.SearchElementList.find((n) => n.name == "cbIsCoordinator").value = ShipmentOrderInfo.IsCoordinator;
      this.state.SearchElementList.find((n) => n.name == "cbCarrierTypeID").value = ShipmentOrderInfo.CarrierTypeID;

      InitSearchParams = [
        {
          SearchKey: "@Keyword",
          SearchValue: "",
        },
        {
          SearchKey: "@RECEIVERPHONENUMBER",
          SearchValue: "",
        },
        // {
        //     SearchKey: "@SHIPMENTORDERTYPEID",
        //     SearchValue: ShipmentOrderInfo.ShipmentOrderTypeID,
        // },
        {
          SearchKey: "@SHIPMENTORDERTYPEID",
          SearchValue: "", // Dịch vụ giao hàng công nghệ BHX online
        },
        {
          SearchKey: "@FromDate",
          SearchValue: new Date(),
        },
        {
          SearchKey: "@ToDate",
          SearchValue: new Date(),
        },
        {
          SearchKey: "@RECEIVERPROVINCEID",
          SearchValue: ShipmentOrderInfo.ReceiverProvinceID,
        },
        {
          SearchKey: "@RECEIVERDISTRICTID",
          SearchValue: ShipmentOrderInfo.ReceiverDistrictID,
        },
        {
          SearchKey: "@RECEIVERWARDID",
          SearchValue: ShipmentOrderInfo.ReceiverWardID,
        },
        {
          SearchKey: "@SENDERSTOREID",
          SearchValue: ShipmentOrderInfo.SenderStoreID,
        },
        {
          SearchKey: "@COORDINATORSTOREID",
          SearchValue: ShipmentOrderInfo.CoordinatorStoreID,
        },
        // {
        //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        //     SearchValue: ShipmentOrderInfo.ShipmentOrderStatusGroupID,
        // },
        {
          SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
          SearchValue: "1",
        },
        {
          SearchKey: "@IsCoordinator",
          SearchValue: 2,
        },
        {
          SearchKey: "@Typename",
          SearchValue: -1,
        },
        {
          SearchKey: "@RequestStoreID",
          SearchValue: -1,
        },
        {
          SearchKey: "@CarrierTypeID",
          SearchValue: -1,
        },
        {
          SearchKey: "@PAGESIZE",
          SearchValue: 1000,
        },
        {
          SearchKey: "@PAGEINDEX",
          SearchValue: 0,
        },
      ];
    }

    this.setState({ SearchData: InitSearchParams, SearchElementList: this.state.SearchElementList });

    this.callSearchData(InitSearchParams);

    this.props.updatePagePath(PagePath);

    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 332) {
        $(".menu-options").addClass("menu-options-fixed");
      } else {
        $(".menu-options").removeClass("menu-options-fixed");
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const widthModal = (window.innerWidth * 55) / 100;
    const clientWidth = document.getElementById("SearchFormCustom").clientWidth;

    this.setState({
      widthPercent: widthModal,
      maxWidthGird: clientWidth,
    });
  }

  handleDelete(id) {
    const ShipmentOrder = { ShipmentOrderID: id, DeletedUser: this.props.AppInfo.LoginInfo.Username };
    this.props.callFetchAPI(APIHostName, DeleteAPIPath, ShipmentOrder).then((apiResult) => {
      this.setState({ IsCallAPIError: apiResult.IsError });
      this.addNotification(apiResult.Message, apiResult.IsError);
      if (!apiResult.IsError) {
        this.callSearchData(this.state.SearchData);
      }
    });
  }

  handleOnChangeView() {
    this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchSelected", []).then((apiResult) => {
      if (!apiResult.IsError) {
        this.setState({
          GridDataSource: apiResult.ResultObject,
        });
      }
    });
  }

  handleDataGridSmallSize(isSmall) {
    let changeState = this.state;
    changeState = { ...changeState, IsDataGridSmallSize: isSmall };
    this.setState(changeState);
  }

  handleOnSearchEvent(Keywordid) {
    if (Keywordid != "") {
      if (Keywordid.trim().length == 15) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByKeyword", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              GridDataSource: apiResult.ResultObject,
            });
          }
        });
      } else if (Keywordid.trim().length == 10) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPhoneNember", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              GridDataSource: apiResult.ResultObject,
            });
          }
        });
      } else {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPartnerSaleOrderID", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              GridDataSource: apiResult.ResultObject,
            });
          }
        });
      }
    }
  }

  onChangePageLoad() {
    this.callSearchData(this.state.SearchData);
  }

  handleOnChangePage(pageNum) {
    let listMLObject = [];
    const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum - 1 };
    listMLObject = Object.assign([], this.state.SearchData, { [14]: aa });
    this.callSearchData(listMLObject);
    this.setState({
      PageNumber: pageNum,
    });
  }

  handleSearchSubmit(MLObject) {
    const postData = [
      {
        SearchKey: "@Keyword",
        SearchValue: MLObject.Keyword,
      },
      {
        SearchKey: "@RECEIVERPHONENUMBER",
        SearchValue: "",
      },
      {
        SearchKey: "@SHIPMENTORDERTYPEID",
        SearchValue: MLObject.ShipmentOrderTypeID,
      },
      {
        SearchKey: "@FromDate",
        SearchValue: MLObject.CreatedOrderTimeFo,
      },

      {
        SearchKey: "@ToDate",
        SearchValue: MLObject.CreatedOrderTimeTo,
      },

      {
        SearchKey: "@RECEIVERPROVINCEID",
        SearchValue: MLObject.ReceiverProvinceID,
      },
      {
        SearchKey: "@RECEIVERDISTRICTID",
        SearchValue: MLObject.ReceiverDistrictID,
      },
      {
        SearchKey: "@RECEIVERWARDID",
        SearchValue: MLObject.ReceiverWardID,
      },
      {
        SearchKey: "@SENDERSTOREID",
        SearchValue: MLObject.SenderStoreID,
      },
      {
        SearchKey: "@COORDINATORSTOREID",
        SearchValue: MLObject.CoordinatorStoreID,
      },
      // {
      //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
      //     SearchValue: MLObject.ShipmentOrderStatusGroupID,
      // },
      {
        SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        SearchValue: "1",
      },
      // {
      //     SearchKey: "@IsCoordinator",
      //     SearchValue: MLObject.IsCoordinator,
      // },
      {
        SearchKey: "@IsCoordinator",
        SearchValue: 2,
      },
      {
        SearchKey: "@CARRIERTYPEID",
        SearchValue: MLObject.CarrierTypeID,
      },
      {
        SearchKey: "@Typename",
        SearchValue: MLObject.Typename,
      },
      {
        SearchKey: "@RequestStoreID",
        SearchValue: -1,
      },
      {
        SearchKey: "@PAGESIZE",
        SearchValue: 1000,
      },
      {
        SearchKey: "@PAGEINDEX",
        SearchValue: 0,
      },
    ];

    this.setState({ SearchData: postData });
    this.callSearchData(postData);
  }

  callSearchData(searchData) {
    this.setState({
      IsLoadData: false,
    });

    this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
      if (!apiResult.IsError) {
        this.setState({
          GridDataSource: apiResult.ResultObject,
          GridDataSourceOrigin: apiResult.ResultObject,
          IsCallAPIError: apiResult.IsError,
          IsLoadDataComplete: true,
          IsLoadData: true,
        });
      } else {
        this.addNotification(apiResult.Message, apiResult.IsError);
      }
    });
  }

  handleCloseMessage() {
    // if (!this.state.IsCallAPIError) {
    //     this.callSearchData(this.state.SearchData);
    // }
  }

  showMessage(message, isConfirm = false, textOk = "", handleConfirm = undefined) {
    ModalManager.open(
      <MessageModal title="Thông báo" message={message} onRequestClose={() => true} isConfirm={isConfirm} textOk={textOk} onOkModal={handleConfirm} onCloseModal={this.handleCloseMessage} />
    );
  }

  addNotification(message, isError) {
    if (!isError) {
      this.setState({
        cssNotification: "notification-custom-success",
        iconNotification: "fa fa-check",
      });
    } else {
      this.setState({
        cssNotification: "notification-danger",
        iconNotification: "fa fa-exclamation",
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
            <p className="notification-message">{message}</p>
          </div>
        </div>
      ),
      dismiss: { duration: 3000 },
      dismissable: { click: true },
    });
  }

  handlePrint(id) {
    this.setState({
      PrintID: id,
    });

    this.props.callFetchAPI("TMSAPI", "api/ShipmentOrder/LoadPrintData", id).then((apiResult) => {
      if (!apiResult.IsError) {
        let itemList = apiResult.ResultObject.ShipmentOrder_ItemList;
        let itemListOutside = [];
        let itemListResult = [];
        if (itemList) {
          let tempItemList = itemList.filter((item) => {
            if (!item.ProductSerial) {
              let temp = itemList.filter((item2) => {
                return item2.ProductID == item.ProductID;
              });
              let existItemListOutside = itemListOutside.filter((existItem) => {
                return existItem.ProductID == item.ProductID;
              });
              if (temp.length > 1 && existItemListOutside.length == 0) {
                item.Quantity = temp.length;
                itemListOutside.push(temp[0]);
                return false;
              } else if (temp.length > 1 && existItemListOutside.length > 0) {
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          });
          itemListResult = tempItemList.concat(itemListOutside);
          //itemListResult = tempItemList;
        }

        // console.log("itemListOutside", itemListOutside);
        // console.log("itemListResult", itemListResult);

        if (itemListOutside.length > 0) {
          apiResult.ResultObject.ShipmentOrder_ItemList = itemListResult;
        }

        this.setState({ DataPrint: apiResult.ResultObject });
        setTimeout(() => {
          this.handlePrintClick();
        }, 300);
      }
    });
  }

  handlePrintClick() {
    var mywindow = window.open("", "", "right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0");
    mywindow.document.write("<html><head>");
    mywindow.document.write("<title>Đơn vận chuyển</title>");
    mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow.document.write("</head><body >");
    mywindow.document.write(document.getElementById("printSO").innerHTML);
    mywindow.document.write("</body></html>");
    // mywindow.document.getElementsByName('body').css( "-webkit-print-color-adjust", "exact !important");
    mywindow.print();

    mywindow.close();
    return true;
  }

  handleClose = () => {
    this.props.hideModal();
  };

  // Xử lý thêm nút checked
  handleCheckShip({ GridDataShip, ShipmentOrderID, IsSinger }) {
    let changeState = this.state;
    let gridDataShip = changeState.GridDataShip;

    gridDataShip = GridDataShip;
    changeState = { ...changeState, GridDataShip: gridDataShip };

    this.setState(changeState, () => {
      if (this.state.IsShowModel && IsSinger == false) {
        this.handleUserCoordinator();
      }
      if (IsSinger) {
        this.handleClickShip(ShipmentOrderID);
      }
    });
  }

  // Xử lý bỏ checked khi nhấn xoá trong modal
  handleRemoveCheckShip(paramShipmentOrderID) {
    let isExistInGridDataShipModalTemp = this.state.GridDataShipFormModalTemp.some((item) => item.ShipmentOrderID == paramShipmentOrderID);

    if (isExistInGridDataShipModalTemp) {
      let changeState = this.state;
      let gridDataShip = changeState.GridDataShip;

      gridDataShip.splice(
        gridDataShip.findIndex((item) => item.ShipmentOrderID === paramShipmentOrderID),
        1
      );

      changeState = { ...changeState, GridDataShip: gridDataShip };
      this.setState(changeState);
    }
  }

  // Xử lý phân tuyến bằng checked
  handleUserCoordinator() {
    if (this.state.GridDataShip.length > 0) {
      let changeState = this.state;
      changeState = { ...changeState, IsDataGridSmallSize: true };

      changeState = { ...changeState, GridDataShipFormModalTemp: this.state.GridDataShip };
      this.setState(changeState);

      let arrRequest = this.state.GridDataShip;
      arrRequest[0].ShipmentOrderTypelst = this.state.SearchData[2].SearchValue;

      this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", arrRequest).then((apiResult) => {
        if (!apiResult.IsError) {
          let changeState = this.state;
          let objDescription = this.handleMapObjectDescription(apiResult.ResultObject.ShipmentOrderDeliverList);

          changeState = {
            ...changeState,
            ShipmentOrderSame: apiResult.ResultObject.ShipmentOrderDeliverSameList,
            GridDataShipFormModal: apiResult.ResultObject.ShipmentOrderDeliverList,
            ChangeGird: true,
            ObjectDescription: objDescription,
            IsShowModel: true,
          };
          this.setState(changeState);
        } else {
          this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
        }
      });
    } else {
      this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
    }
  }

  // Xử lý đã phân tuyến
  handleClickShipmentRoute(paramRouteID) {
    this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/GetShipmentOrderRouteLst", paramRouteID).then((apiResult) => {
      if (!apiResult.IsError) {
        let changeState = this.state;
        let objDescription = this.handleMapObjectDescription(apiResult.ResultObject);

        changeState = {
          ...changeState,
          ShipmentRouteID: paramRouteID,
          GridDataShipFormModal: apiResult.ResultObject,
          ShipmentOrderSame: [],
          ChangeGird: true,
          IsShowModel: true,
          IsDataGridSmallSize: true,
          ObjectDescription: objDescription,
        };

        this.setState(changeState);
      } else {
        this.showMessage(apiResult.message);
      }
    });
  }

  // Xử lý phân tuyến từng cái
  handleClickShip(paramShipmentOrderID) {
    this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderDeliver", paramShipmentOrderID).then((apiResult) => {
      if (!apiResult.IsError) {
        let resultdd = this.state.GridDataShipFormModal.find((n) => n.ShipmentOrderID == paramShipmentOrderID);

        if (resultdd == undefined) {
          if (
            this.state.GridDataShipFormModal.length > 0 &&
            apiResult.ResultObject.ShipmentOrderDeliver.IsPermission == true &&
            apiResult.ResultObject.ShipmentOrderDeliver.ShipmentOrder_DeliverUserList.length == 0
          ) {
            apiResult.ResultObject.ShipmentOrderDeliver["ShipmentOrder_DeliverUserList"] = this.state.GridDataShipFormModal[0].ShipmentOrder_DeliverUserList;
          }

          if (this.state.GridDataShipFormModal.length > 0 && apiResult.ResultObject.ShipmentOrderDeliver.IsPermission == true) {
            apiResult.ResultObject.ShipmentOrderDeliver["VehicleID"] = this.state.GridDataShipFormModal[0].VehicleID;
            apiResult.ResultObject.ShipmentOrderDeliver["DriverUser"] = this.state.GridDataShipFormModal[0].DriverUser;
          }

          this.state.GridDataShipFormModal.push(apiResult.ResultObject.ShipmentOrderDeliver);
          this.state.GridDataShipFormModalTemp.push(apiResult.ResultObject.ShipmentOrderDeliver);
        }

        let objDescription = this.handleMapObjectDescription(this.state.GridDataShipFormModal);
        let changeState = this.state;

        changeState = {
          ...changeState,
          ShipmentOrderSame: apiResult.ResultObject.ShipmentOrderDeliverList,
          GridDataShipFormModal: this.state.GridDataShipFormModal,
          ChangeGird: true,
          ObjectDescription: objDescription,
          IsDataGridSmallSize: true,
          IsShowModel: true,
        };

        this.setState(changeState);
      } else {
        this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
      }
    });
  }

  // Xử lý hiện/ản modal
  handleShowModel(paramObjectChangeState) {
    let changeState = this.state;

    changeState = { ...changeState, ...paramObjectChangeState };

    if (paramObjectChangeState.IsShowModel == false) {
      let gridDataShip = changeState.GridDataShip;

      gridDataShip = [];
      changeState = { ...changeState, IsDataGridSmallSize: false, GridDataShip: gridDataShip, GridDataShipFormModal: [], GridDataShipFormModalTemp: [], ShipmentRouteID: "", ChangeGird: false };
    }

    this.setState(changeState, () => {
      if (paramObjectChangeState.IsShowModel == false) {
        this.onChangePageLoad();
      }
    });
  }

  // Xử lý ghi chú
  handleMapObjectDescription(paramDataSource) {
    return paramDataSource.reduce((a, v) => {
      return {
        ...a,
        [v.ShipmentOrderID]: {
          isShow: false,
          content: v.CoordinatorNote,
        },
      };
    }, {});
  }

  _CheckTime(dates) {
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
  }

  _genCommentCarrierPartner(CarrierTypeID, CarrierTypeName) {
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
  }

  _genCommentTime(dates) {
    const date = new Date(Date.parse(dates));
    //let currentDate = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let timeDisplay = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
    let month = date.getMonth() + 1;
    return date.getDate() + "/" + (month < 10 ? "0" + month : month) + "/" + date.getFullYear() + " " + timeDisplay;
  }

  copyToClipboard(e) {
    const PartnerSaleOrderID = e.target.attributes["data-id"].value;
    let temponaryInput = $("<input>").val(PartnerSaleOrderID).appendTo("body").select();
    document.execCommand("copy");
    temponaryInput.remove();
  }

  copyToClipboardShipmentOrder(e) {
    const ShipmentOrderID = e.target.attributes["data-id"].value;
    let temponaryInput = $("<input>").val(ShipmentOrderID).appendTo("body").select();
    document.execCommand("copy");
    temponaryInput.remove();
  }

  // Xử lý phân tuyến tự động
  handleShipmentRouteAuto() {
    let arrRequest = this.state.GridDataShip;
    if (arrRequest.length > 0 && arrRequest.length < 2) {
      this.showMessage("Phải chọn ít nhất là 2 vận đơn");
      return;
    }

    this.showMessage("Phân tuyến tự động tất cả vận đơn", true, "Xác nhận", () => {
      let changeState = this.state;
      let objUIEffect = changeState.UIEffect;
      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsLoading: true };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };

      this.setState(changeState);

      let objRequest = {
        ListShipmentOrder: arrRequest,
      };

      this.props.callFetchAPI(APIHostName, "api/Routing/CapacityConstraints", objRequest).then((apiResult) => {
        if (!apiResult.IsError) {
          const { MotorRoute, TruckRoute, ListDroppedShipmentOrder } = apiResult.ResultObject;

          let changeState = this.state;
          let objShipmentRouteAutoDataSource = changeState.ShipmentRouteAutoDataSource;
          let objUIEffect = changeState.UIEffect;
          let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

          objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsLoading: false, IsDisabled: true };
          objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
          changeState = { ...changeState, UIEffect: objUIEffect };
          objShipmentRouteAutoDataSource = { Motor: MotorRoute, Truck: TruckRoute, Dropped: ListDroppedShipmentOrder };
          changeState = { ...changeState, ActiveTab: "9", ShipmentRouteAutoDataSource: objShipmentRouteAutoDataSource };

          this.setState(changeState);
        } else {
          let changeState = this.state;
          let objUIEffect = changeState.UIEffect;
          let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

          objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsLoading: false };
          objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
          changeState = { ...changeState, UIEffect: objUIEffect };

          this.setState(changeState);
          this.addNotification(apiResult.Message, apiResult.IsError);
        }
      });
    });
  }

  // Xử lý gán data source xe máy cho vietbando
  handleShowModalMapMotorRoute(index) {
    this.setState({ DataSourceMap: this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute[index], IsShowModelMap: true });
  }

  // Xử lý gán data source xe tải cho vietbando
  handleShowModalMapTruckRoute(index) {
    this.setState({ DataSourceMap: this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute[index], IsShowModelMap: true });
  }

  // Xử lý nhập tìm kiếm nhân viên giao
  handleSelectNhanVienGiaoInputValueChange(event, index, verhicleType) {
    let value = event.target.value;

    if (value.length > 3 && event.keyCode != 40 && event.keyCode != 38 && value.substr(0, 3) != "004") {
      this.handleSearchDataNhanVienGiao("*" + value + "*", index, verhicleType);
    }
  }

  // Xử lý tìm kiếm nhân viên giao
  handleSearchDataNhanVienGiao(keyword, index, vehicleType) {
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
              QueryValue: keyword,
              QueryType: 2,
              IsNotQuery: false,
            },

            {
              QueryKey: "fULLNAME",
              QueryValue: keyword,
              QueryType: 2,
              IsNotQuery: false,
            },
          ],
        },
      ],
    };

    this.props.callFetchAPI("ERPAPI", "api/UserSearch/Search", listMLObject).then((apiResult) => {
      for (let i = 0; i < apiResult.ResultObject.length; i++) {
        if (vehicleType == 1) {
          let listOptionNew1 = [];
          let isExist =
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options &&
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options[index] &&
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options[index].some((item) => item.value === apiResult.ResultObject[i].UserName);
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

          let changeState = this.state;
          let objSelectValue = changeState.ObjectControlValue;
          let objNhanVienGiao = objSelectValue.NhanVienGiao;
          let objXeMay = objNhanVienGiao.XeMay;
          let objOptions = objXeMay.Options;

          objOptions[index] = [...objOptions[index], ...listOptionNew1];
          objXeMay = { ...objXeMay, Options: objOptions };
          objNhanVienGiao = { ...objNhanVienGiao, XeMay: objXeMay };
          objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
          changeState = { ...changeState, ObjectControlValue: objSelectValue };

          this.setState(changeState);
        }

        if (vehicleType == 2) {
          let listOptionNew1 = [];
          let isExist =
            this.state.ObjectControlValue.NhanVienGiao.XeTai.Options &&
            this.state.ObjectControlValue.NhanVienGiao.XeTai.Options[index] &&
            this.state.ObjectControlValue.NhanVienGiao.XeTai.Options[index].some((item) => item.value === apiResult.ResultObject[i].UserName);
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

          let changeState = this.state;
          let objSelectValue = changeState.ObjectControlValue;
          let objNhanVienGiao = objSelectValue.NhanVienGiao;
          let objXeTai = objNhanVienGiao.XeTai;
          let objOptions = objXeTai.Options;

          objOptions[index] = [...objOptions[index], ...listOptionNew1];
          objXeTai = { ...objXeTai, Options: objOptions };
          objNhanVienGiao = { ...objNhanVienGiao, XeTai: objXeTai };
          objSelectValue = { ...objSelectValue, NhanVienGiao: objNhanVienGiao };
          changeState = { ...changeState, ObjectControlValue: objSelectValue };

          this.setState(changeState);
        }
        // }
      }
    });
  }

  // Xử lý chọn nhân viên giao
  handleSelectNhanVienGiaoValueChange_1(value, options, index, vehicleType) {
    if (vehicleType == 1) {
      let changeState = this.state;
      let objControlValue = changeState.ObjectControlValue;
      let objNhanVienGiao = objControlValue.NhanVienGiao;
      let objXeMay = objNhanVienGiao.XeMay;
      let objValues = objXeMay.Values;

      objValues[index] = [...value];
      objXeMay = { ...objXeMay, Values: objValues };
      objNhanVienGiao = { ...objNhanVienGiao, XeMay: objXeMay };
      objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
      changeState = { ...changeState, ObjectControlValue: objControlValue };

      this.setState(changeState);
    }

    if (vehicleType == 2) {
      let changeState = this.state;
      let objControlValue = changeState.ObjectControlValue;
      let objNhanVienGiao = objControlValue.NhanVienGiao;
      let objXeTai = objNhanVienGiao.XeTai;
      let objValues = objXeTai.Values;

      objValues[index] = [...value];
      objXeTai = { ...objXeTai, Values: objValues };
      objNhanVienGiao = { ...objNhanVienGiao, XeTai: objXeTai };
      objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
      changeState = { ...changeState, ObjectControlValue: objControlValue };

      this.setState(changeState);
    }
  }

  // Xử lý render phân tuyến tự động
  handleConfirm(pVerticalType) {
    if (pVerticalType == 1) {
      let objRequest = [];
      let element = [];
      let lstShipmentOrderRoute = this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute;
      let ShipmentOrderTypelst = "1026";

      for (let indexParent = 0; indexParent < lstShipmentOrderRoute.length; indexParent++) {
        for (let indexChild = 1; indexChild < lstShipmentOrderRoute[indexParent].length; indexChild++) {
          let item = lstShipmentOrderRoute[indexParent][indexChild];
          objRequest.push({
            CarrierTypeID: item.CarrierTypeID,
            CurrentShipmentOrderStepID: item.CurrentShipmentOrderStepID,
            PrimaryShipItemName: item.PrimaryShipItemName,
            ShipItemNameList: item.ShipItemNameList,
            ShipmentOrderID: item.ShipmentOrderID,
            ShipmentOrderTypeID: item.ShipmentOrderTypeID,
            DeliverUserList: [],
            ShipmentRouteIndex: indexParent, // Thứ tự tuyến trong phân tuyến tự động
          });
        }
      }

      objRequest[0].ShipmentOrderTypelst = ShipmentOrderTypelst;

      this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", objRequest).then((apiResult) => {
        if (!apiResult.IsError) {
          let lstShipmentOrderDeliver = apiResult.ResultObject.ShipmentOrderDeliverList;
          lstShipmentOrderDeliver = lstShipmentOrderDeliver.map((item) => {
            let arrUserRoute = this.state.ObjectControlValue.NhanVienGiao.XeMay.Values[item.ShipmentRouteIndex];
            let arrUser = this.state.ObjectControlValue.NhanVienGiao.XeMay.Options[item.ShipmentRouteIndex].filter((x) => arrUserRoute.includes(x.value));
            // Kiểu dữ liệu trả về của arrUser
            //   {
            //     "value": "0041005",
            //     "name": "0041005-Nguyễn Văn A",
            //     "FullName": "Nguyễn Văn A",
            //     "DepartmentName": "",
            //     "PositionName": "",
            //     "Address": ""
            //  }
            let arrUserFullName = arrUser.map((x) => x.name);
            let arrDeliverUser = arrUser.map((item) => ({ UserName: item.value, FullName: item.FullName }));

            return {
              ...item,
              DeliverUserLst: arrUserRoute ? arrUserRoute.join() : "",
              DeliverUserFullNameList: arrUserFullName ? arrUserFullName.join() : "",
              ShipmentOrder_DeliverUserList: arrDeliverUser,
              IsRoute: false,
              VehicleID: -1,
            };
          });

          const groupByNew = (data, fields, sumBy = "TotalCOD") => {
            let r = [],
              cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
            data.forEach((x) => {
              let y = r.find((z) => cmp(x, z));
              let w = [...fields, sumBy].reduce((a, b) => ((a[b] = x[b]), a), {});
              y ? (y[sumBy] = +y[sumBy] + +x[sumBy]) : r.push(w);
            });
            return r;
          };

          lstShipmentOrderDeliver.map((row) => {
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
          });

          if (lstShipmentOrderDeliver.length > 0) {
            lstShipmentOrderDeliver[0].DeliverUserTotalCODList = groupByNew(element, ["UserName", "CarrierTypeID"]);
            lstShipmentOrderDeliver[0].ShipmentRouteID = "";
          }

          let countRoute = this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute.length;
          let arrRequest = [];
          for (let index = 0; index < countRoute; index++) {
            let arrFilter = lstShipmentOrderDeliver.filter((x) => x.ShipmentRouteIndex == index);
            arrRequest.push(arrFilter);
          }

          if (this.state.ShipmentRouteID != "") {
            this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddInfoCoordinatorLstNewAuto", arrRequest).then((apiResult) => {
              this.addNotification(apiResult.Message, apiResult.IsError);
              let changeState = this.state;
              let objUIEffect = changeState.UIEffect;
              let objButtonMotorApply = objUIEffect.ButtonMotorApply;
              let objButtonTruckApply = objUIEffect.ButtonTruckApply;

              if (!apiResult.IsError) {
                objButtonMotorApply = { ...objButtonMotorApply, IsDisabled: true };
                objButtonTruckApply = { ...objButtonTruckApply, IsDisabled: true };
                objUIEffect = { ...objUIEffect, ButtonMotorApply: objButtonMotorApply, ButtonTruckApply: objButtonTruckApply };
                changeState = { ...changeState, UIEffect: objUIEffect };
              } else {
                objButtonMotorApply = { ...objButtonMotorApply, IsDisabled: false };
                objButtonTruckApply = { ...objButtonTruckApply, IsDisabled: false };
                objUIEffect = { ...objUIEffect, ButtonMotorApply: objButtonMotorApply, ButtonTruckApply: objButtonTruckApply };
                changeState = { ...changeState, UIEffect: objUIEffect };
              }

              this.setState(changeState);
            });
          } else {
            this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/AddInfoCoordinatorLstNewAuto", arrRequest).then((apiResult) => {
              this.addNotification(apiResult.Message, apiResult.IsError);

              let changeState = this.state;
              let objUIEffect = changeState.UIEffect;
              let objButtonMotorApply = objUIEffect.ButtonMotorApply;
              let objButtonTruckApply = objUIEffect.ButtonTruckApply;

              if (!apiResult.IsError) {
                objButtonMotorApply = { ...objButtonMotorApply, IsDisabled: true };
                objButtonTruckApply = { ...objButtonTruckApply, IsDisabled: true };
                objUIEffect = { ...objUIEffect, ButtonMotorApply: objButtonMotorApply, ButtonTruckApply: objButtonTruckApply };
                changeState = { ...changeState, UIEffect: objUIEffect };
              } else {
                objButtonMotorApply = { ...objButtonMotorApply, IsDisabled: false };
                objButtonTruckApply = { ...objButtonTruckApply, IsDisabled: false };
                objUIEffect = { ...objUIEffect, ButtonMotorApply: objButtonMotorApply, ButtonTruckApply: objButtonTruckApply };
                changeState = { ...changeState, UIEffect: objUIEffect };
              }

              this.setState(changeState);
            });
          }
        } else {
          showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
        }
      });
    }
  }

  // Render phân tuyến tự động
  renderShipmentRouteAuto() {
    const pickRandomColor = ["#1f5ff4", "#c55d53", "#cb68c5", "#65b411", "#f4b323", "#420e3e", "#e80024", "#585ccc", "#d44371", "#14915f", "#e79940", "#6be54"];
    let randomColor = "";
    let reactNodeTab = (title, length) => (
      <div style={{ position: "relative" }}>
        <span style={{ marginRight: "16px", lineHeight: "30px" }}>{title}</span>
        {(length > 0 || length.length > 0) && (
          <span
            style={{
              height: "15px",
              width: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "7.5px",
              backgroundColor: "#eb4d4b",
              position: "absolute",
              top: "0",
              right: "0",
              color: "white",
              fontSize: "11px",
            }}
          >
            {length}
          </span>
        )}
      </div>
    );

    const renderDeliverUserSelect = (index, vehicleType) => {
      if (vehicleType == 1) {
        let deliverUserFullNameList =
          this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute &&
          this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute[index] &&
          this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute[index][1] &&
          this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute[index][1]["DeliverUserFullNameList"];
        if (!!deliverUserFullNameList) {
          let [userName, fullName] = deliverUserFullNameList.split("-");
          let changeState = this.state;
          let objControlValue = changeState.ObjectControlValue;
          let objNhanVienGiao = objControlValue.NhanVienGiao;
          let objXeMay = objNhanVienGiao.XeMay;
          let objOptions = objXeMay.Options;
          let objValue = objXeMay.Values;

          userName = userName.trim();
          fullName = fullName.trim();

          let isExist = objOptions && objOptions[index] && objOptions[index].find((item) => item.value == userName);

          if (!isExist) {
            let arrOptions = (objOptions && objOptions[index]) || [];
            let arrValues = (objValue && objValue[index]) || [];

            arrOptions.push({
              value: userName,
              name: userName + "-" + fullName,
              FullName: fullName,
              DepartmentName: "",
              PositionName: "",
              Address: "",
            });
            arrValues.push(userName);
            objOptions[index] = arrOptions;
            objValue[index] = arrValues;
            objXeMay = { Options: objOptions, Values: objValue };
            objNhanVienGiao = { ...objNhanVienGiao, XeMay: objXeMay };
            objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
            changeState = { ...changeState, ObjectControlValue: objControlValue };
            this.setState(changeState);
          }
        }
      }

      if (vehicleType == 2) {
        let deliverUserFullNameList =
          this.state.ShipmentRouteAutoDataSource.XeTai.ListShipmentOrderRoute &&
          this.state.ShipmentRouteAutoDataSource.XeTai.ListShipmentOrderRoute[index] &&
          this.state.ShipmentRouteAutoDataSource.XeTai.ListShipmentOrderRoute[index][1] &&
          this.state.ShipmentRouteAutoDataSource.XeTai.ListShipmentOrderRoute[index][1]["DeliverUserFullNameList"];
        if (!!deliverUserFullNameList) {
          let [userName, fullName] = deliverUserFullNameList.split("-");
          let changeState = this.state;
          let objControlValue = changeState.ObjectControlValue;
          let objNhanVienGiao = objControlValue.NhanVienGiao;
          let objXeTai = objNhanVienGiao.XeTai;
          let objOptions = objXeTai.Options;
          let objValue = objXeTai.Values;

          userName = userName.trim();
          fullName = fullName.trim();

          let isExist = objOptions && objOptions[index] && objOptions[index].find((item) => item.value == userName);

          if (!isExist) {
            let arrOptions = (objOptions && objOptions[index]) || [];
            let arrValues = (objValue && objValue[index]) || [];

            arrOptions.push({
              value: userName,
              name: userName + "-" + fullName,
              FullName: fullName,
              DepartmentName: "",
              PositionName: "",
              Address: "",
            });
            arrValues.push(userName);
            objOptions[index] = arrOptions;
            objValue[index] = arrValues;
            objXeTai = { Options: objOptions, Values: objValue };
            objNhanVienGiao = { ...objNhanVienGiao, XeTai: objXeTai };
            objControlValue = { ...objControlValue, NhanVienGiao: objNhanVienGiao };
            changeState = { ...changeState, ObjectControlValue: objControlValue };
            this.setState(changeState);
          }
        }
      }

      return (
        <Select
          style={{ width: "40%" }}
          value={
            (vehicleType == 1 && this.state.ObjectControlValue.NhanVienGiao.XeMay.Values && this.state.ObjectControlValue.NhanVienGiao.XeMay.Values[index]) ||
            [] ||
            (vehicleType == 2 && this.state.ObjectControlValue.NhanVienGiao.XeTai.Values && this.state.ObjectControlValue.NhanVienGiao.XeTai.Values[index]) ||
            []
          }
          mode="multiple"
          disabled={(vehicleType == 1 ? this.state.UIEffect.ButtonMotorApply.IsDisabled : false) || (vehicleType == 2 ? this.state.UIEffect.ButtonTruckApply.IsDisabled : false)}
          optionLabelProp="label"
          dropdownAlign="center"
          maxTagCount={3}
          placeholder="Nhân viên giao"
          onInputKeyDown={(event) => this.handleSelectNhanVienGiaoInputValueChange(event, index, vehicleType)}
          onChange={(value, options) => this.handleSelectNhanVienGiaoValueChange_1(value, options, index, vehicleType)}
        >
          {(vehicleType == 1 &&
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options &&
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options[index] &&
            this.state.ObjectControlValue.NhanVienGiao.XeMay.Options[index].map((item, index) => (
              <Select.Option key={index} value={item.value} label={item.name} user={item}>
                {item.name}
              </Select.Option>
            ))) ||
            (vehicleType == 2 &&
              this.state.ObjectControlValue.NhanVienGiao.XeTai.Options &&
              this.state.ObjectControlValue.NhanVienGiao.XeTai.Options[index] &&
              this.state.ObjectControlValue.NhanVienGiao.XeTai.Options[index].map((item, index) => (
                <Select.Option key={index} value={item.value} label={item.name} user={item}>
                  {item.name}
                </Select.Option>
              )))}
        </Select>
      );
    };

    const renderVehicleID = (index) => {
      return <Select style={{ width: "40%" }} mode="multiple" optionLabelProp="label" dropdownAlign="center" maxTagCount={3} placeholder="Biển số xe"></Select>;
    };

    let length_motor = this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute.length;
    let length_truck = this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute.length;

    let isMotorDisable = length_motor == 0 ? true : this.state.UIEffect.ButtonMotorApply.IsDisabled;

    return (
      this.state.ShipmentRouteAutoDataSource != null && (
        <div style={{ width: "100%", border: "1px solid #8080804a" }}>
          <Tabs defaultActiveKey="key_1" style={{ padding: "15px", backgroundColor: "white" }} className="ant-tabs">
            {/* Tab xe máy */}

            <Tabs.TabPane tabKey="key_1_1" tab={reactNodeTab("Xe máy", length_motor)} key="1" className="ant-tabs-child-1">
              <div style={{ width: "100%", backgroundColor: "white", padding: "10px", maxheight: "57vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "80%" }}>
                    <h5>Danh sách các tuyến đề xuất</h5>
                    <h6>
                      Tổng cộng số km: <span style={{ fontWeight: "700" }}>{parseInt(this.state.ShipmentRouteAutoDataSource.Motor.TotalDistance / 1000)}</span> km
                    </h6>
                    <h6>
                      Tổng cộng số tải: <span style={{ fontWeight: "700" }}>{this.state.ShipmentRouteAutoDataSource.Motor.TotalLoad}</span> kg
                    </h6>
                  </div>
                  <div style={{ width: "20%", display: "flex", justifyContent: "flex-end" }}>
                    <Button type="primary" disabled={isMotorDisable} onClick={(_) => this.handleConfirm(1)}>
                      Áp dụng
                    </Button>
                  </div>
                </div>
                {this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute && length_motor > 0 && (
                  <div style={{ width: "100%", backgroundColor: "white", padding: "10px 0px", maxHeight: "60vh", height: "auto", overflow: "auto" }}>
                    {this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute.map((line, index) => (
                      <div key={index}>
                        <p style={{ display: "none" }}>{(randomColor = pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                        <div style={{ display: "flex" }}>
                          {/* <span style={{ fontWeight: "700", fontSize: "15px" }}>{index}</span>&ensp; */}
                          <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                            <div style={{ width: "90%", marginBottom: "30px" }}>
                              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <Tag color="#108ee9">Tuyến: {index + 1}</Tag>
                                <Tag color="#2db7f5">Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Motor.ListTotalDistance[index] / 1000)}</Tag>
                                <Tag color="#87d068">Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Motor.ListTotalLoad[index]}</Tag>
                                {renderDeliverUserSelect(index, 1)}
                              </div>
                              <div style={{ display: "flex" }}>
                                {this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute[index].map((objShipmentOrder, i) => (
                                  <div key={objShipmentOrder.PartnerSaleOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
                                    {i != 0 &&
                                      (objShipmentOrder.IsCompleteDeliverIed ? (
                                        <div style={{ width: "100%", height: "10px", borderBottom: `3px solid ${randomColor}` }}></div>
                                      ) : (
                                        <div style={{ width: "100%", height: "10px", borderBottom: `3px solid #80808030` }}></div>
                                      ))}
                                    {i != 0 ? (
                                      <Popover
                                        content={
                                          <div>
                                            <p>{objShipmentOrder.ReceiverFullName}</p>
                                            <p>{objShipmentOrder.ReceiverFullAddress}</p>
                                            <p>{objShipmentOrder.Weight}</p>
                                          </div>
                                        }
                                        title={objShipmentOrder.ShipmentOrderID}
                                      >
                                        <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                          {objShipmentOrder.IsCompleteDeliverIed ? (
                                            <div
                                              style={{
                                                position: "relative",
                                                width: "12px",
                                                height: "12px",
                                                border: `3px solid ${randomColor}`,
                                                backgroundColor: `${randomColor}`,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                            </div>
                                          ) : (
                                            <div
                                              style={{
                                                position: "relative",
                                                width: "12px",
                                                height: "12px",
                                                border: `3px solid ${randomColor}`,
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                            </div>
                                          )}
                                        </div>
                                      </Popover>
                                    ) : (
                                      <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                        {
                                          <div
                                            style={{
                                              position: "relative",
                                              width: "12px",
                                              height: "12px",
                                              border: `3px solid ${randomColor}`,
                                              backgroundColor: `${randomColor}`,
                                              borderRadius: "50%",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>0</div>
                                          </div>
                                        }
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "right", paddingTop: "18px" }}>
                              <Tooltip title="Xem bản đồ">
                                <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapMotorRoute(index)} />
                              </Tooltip>
                              &nbsp;
                              {/* <Tooltip title="Phân tuyến">
                                <Button type="primary" shape="circle" icon={<PartitionOutlined />} onClick={(_) => this.handleConfirm(index, 1)} />
                              </Tooltip> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tabs.TabPane>

            {/* Tab xe tải */}

            <Tabs.TabPane tabKey="key_1_2" tab={reactNodeTab("Xe tải", length_truck)} key="2" className="ant-tabs-child-2">
              <div style={{ width: "100%", backgroundColor: "white", padding: "10px", maxheight: "57vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "80%" }}>
                    <h5>Danh sách các tuyến đề xuất</h5>
                    <h6>
                      Tổng cộng số km: <span style={{ fontWeight: "700" }}>{parseInt(this.state.ShipmentRouteAutoDataSource.Truck.TotalDistance / 1000)}</span> km
                    </h6>
                    <h6>
                      Tổng cộng số tải: <span style={{ fontWeight: "700" }}>{this.state.ShipmentRouteAutoDataSource.Truck.TotalLoad}</span> kg
                    </h6>
                  </div>
                  <div style={{ width: "20%", display: "flex", justifyContent: "flex-end" }}>
                    <Button type="primary" disabled={length_truck == 0} onClick={(_) => this.handleConfirm(2)}>
                      Áp dụng
                    </Button>
                  </div>
                </div>
                {this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute && length_truck > 0 && (
                  <div style={{ width: "100%", backgroundColor: "white", padding: "20px", maxHeight: "60vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                    {this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute.map((line, index) => (
                      <div key={index}>
                        <p style={{ display: "none" }}>{(randomColor = pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                        <div style={{ display: "flex" }}>
                          <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                            <div style={{ width: "90%", marginBottom: "30px" }}>
                              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <Tag color="#108ee9">Tuyến: {index + 1}</Tag>
                                <Tag color="#2db7f5">Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Truck.ListTotalDistance[index] / 1000)}</Tag>
                                <Tag color="#87d068">Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Truck.ListTotalLoad[index]}</Tag>
                                {renderDeliverUserSelect(index, 2)}
                              </div>
                              <div style={{ display: "flex" }}>
                                {this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute[index].map((objShipmentOrder, i) => (
                                  <div key={objShipmentOrder.PartnerSaleOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
                                    {i != 0 &&
                                      (objShipmentOrder.IsCompleteDeliverIed ? (
                                        <div style={{ width: "100%", height: "10px", borderBottom: `3px solid ${randomColor}` }}></div>
                                      ) : (
                                        <div style={{ width: "100%", height: "10px", borderBottom: `3px solid #80808030` }}></div>
                                      ))}
                                    {i != 0 ? (
                                      <Popover
                                        content={
                                          <div>
                                            <p>{objShipmentOrder.ReceiverFullName}</p>
                                            <p>{objShipmentOrder.ReceiverFullAddress}</p>
                                            <p>{objShipmentOrder.Weight}</p>
                                          </div>
                                        }
                                        title={objShipmentOrder.ShipmentOrderID}
                                      >
                                        <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                          {objShipmentOrder.IsCompleteDeliverIed ? (
                                            <div
                                              style={{
                                                position: "relative",
                                                width: "12px",
                                                height: "12px",
                                                border: `3px solid ${randomColor}`,
                                                backgroundColor: `${randomColor}`,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                            </div>
                                          ) : (
                                            <div
                                              style={{
                                                position: "relative",
                                                width: "12px",
                                                height: "12px",
                                                border: `3px solid ${randomColor}`,
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                            </div>
                                          )}
                                        </div>
                                      </Popover>
                                    ) : (
                                      <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                        {
                                          <div
                                            style={{
                                              position: "relative",
                                              width: "12px",
                                              height: "12px",
                                              border: `3px solid ${randomColor}`,
                                              backgroundColor: `${randomColor}`,
                                              borderRadius: "50%",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>0</div>
                                          </div>
                                        }
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ width: "10%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "right", paddingTop: "18px" }}>
                              <Tooltip title="Xem bản đồ">
                                <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapTruckRoute(index)} />
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tabs.TabPane>

            {/* Tab chưa điều phối */}

            <Tabs.TabPane tabKey="key_1_3" tab={reactNodeTab("Chưa phân tuyến", this.state.ShipmentRouteAutoDataSource.Dropped.length)} key="3" className="ant-tabs-child-3">
              <DataGridShipmentRouteAuto
                key={1}
                listColumn={DataGridColumnList}
                dataSource={this.state.ShipmentRouteAutoDataSource.Dropped}
                IsLoadData={this.state.IsLoadData}
                TimeFrame="Dropped"
                GridDataShip={null}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleOnSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
                onClickShip={this.handleClickShip}
                onShipmentRoute={this.handleClickShipmentRoute}
                onShowModel={this.handleShowModel}
                onPrint={this.handlePrint.bind(this)}
                IsDelete={false}
                ShipmentOrderTypelst={this.state.SearchData[2].SearchValue}
                IsAdd={false}
                IsDataGridSmallSize={this.state.IsDataGridSmallSize}
                PageNumber={this.state.PageNumber}
                DeletePermission={"SHIPMENTORDER_DELETE"}
                EditPermission={"SHIPMENTORDER_UPDATE"}
                IsAutoPaging={true}
                RowsPerPage={10000}
                IsColumnChecked={true}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )
    );
  }

  // Disable Collapse
  handleDisabled(isCollapse) {
    let changeState = this.state;
    let objUIEffect = changeState.UIEffect;
    let objCollapse = objUIEffect.Collapse;

    objCollapse = { ...objCollapse, IsDisabled: isCollapse };
    objUIEffect = { ...objUIEffect, Collapse: objCollapse };
    changeState = { ...changeState, UIEffect: objUIEffect };

    this.setState(changeState);
  }

  // Xử lý tìm kiếm
  handleInputChange(value) {
    let dispose = setTimeout(() => {
      if (value == "") {
        let changeState = this.state;
        let objGirdDataSource = changeState.GridDataSource;

        objGirdDataSource = changeState.GridDataSourceOrigin;
        changeState = { ...changeState, GridDataSource: objGirdDataSource }

        this.setState(changeState);
      } else {
        let resultSearch = this.state.GridDataSourceOrigin.filter(
          (n) =>
            n.ShipmentOrderID.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverFullName.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverPhoneNumber.toLowerCase().includes(value.toLowerCase()) ||
            n.PartnerSaleOrderID.toLowerCase().includes(value.toLowerCase()) ||
            n.PrimaryShipItemName.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverFullAddress.toLowerCase().includes(value.toLowerCase()) ||
            n.ShipItemNameList.toLowerCase().includes(value.toLowerCase())
        );
        let changeState = this.state;
        let objGirdDataSource = changeState.GridDataSource;

        objGirdDataSource = resultSearch
        changeState = { ...changeState, GridDataSource: objGirdDataSource }

        this.setState(changeState);
      }
    }, 2000);
  }

  // Xử lý sự kiện thay đổi tab
  handleChangeActiveTab(paramActiveKey) {
    let changeState = this.state;
    let objUIEffect = changeState.UIEffect;
    if (paramActiveKey == 2) {
      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsDisabled: true };
      objTabs = { ...objTabs, ActiveTab: paramActiveKey };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };
    } else {

      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsDisabled: false };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };
    }
    let objTabs = objUIEffect.Tabs;

    objTabs = { ...objTabs, ActiveTab: paramActiveKey };
    objUIEffect = { ...objUIEffect, Tabs: objTabs };
    changeState = { ...changeState, UIEffect: objUIEffect };

    this.setState(changeState);
  }

  render() {
    const renderShipmentRouteAuto = this.renderShipmentRouteAuto();

    let reactNodeTab = (title, length) => (
      <div style={{ position: "relative" }}>
        <span style={{ marginRight: "16px", lineHeight: "30px" }}>{title}</span>
        {(length > 0 || length.length > 0) && (
          <span
            style={{
              height: "15px",
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "7.5px",
              backgroundColor: "#eb4d4b",
              position: "absolute",
              top: "-10px",
              right: "0",
              color: "white",
              padding: "0 5px",
              fontSize: "11px",
            }}
          >
            {length}
          </span>
        )}
      </div>
    );

    return (
      <div style={{ padding: "0 14px 14px 14px", width: "100%" }}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="col-lg-12 SearchFormCustom" id="SearchFormCustom" style={{ padding: "0" }}>
          <SearchFormShipmentRouteAuto
            FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
            MLObjectDefinition={SearchMLObjectDefinition}
            listelement={this.state.SearchElementList}
            onSubmit={(object) => this.handleSearchSubmit(object)}
            ref={this.searchref}
            btnGroup="btnSearch btncustom btnGroup"
            IsSetting={true}
            className="multiple multiple-custom multiple-custom-display"
          />
        </div>

        {this.state.IsLoadDataComplete && (
          <div className="col-lg-12" style={{ backgroundColor: "aliceblue", border: "1px solid #03a9f4", padding: "0" }}>
            <Tabs
              className="ant-tabs-parent"
              key="tabs_1"
              defaultActiveKey="1"
              activeKey={this.state.UIEffect.Tabs.ActiveTab}
              size="large"
              onChange={(activeKey) => this.handleChangeActiveTab(activeKey)}
            >
              <Tabs.TabPane tab={reactNodeTab("Danh sách vận đơn", this.state.GridDataSource.length)} key="1" tabKey="tabs_1_1">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.UIEffect.Collapse.IsDisabled}
                  trigger={
                    <Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.GridDataSource.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.GridDataSource.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.GridDataSource.filter((item) => item.ShipmentOrderStatusID === 28).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Tìm kiếm"
                              valueRender={(node) => {
                                return (
                                  <Input
                                    placeholder="Tìm kiếm"
                                    onMouseEnter={(_) => this.handleDisabled(true)}
                                    onMouseLeave={(_) => this.handleDisabled(false)}
                                    onChange={(event) => this.handleInputChange(event.target.value)}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </Fragment>
                  }
                  triggerStyle={{ backgroundColor: "white" }}
                  triggerOpenedClassName="collapsible-open-custom"
                  easing="ease-in"
                  // onClick={(_) => {
                  //   this.handleDisabled( false);
                  // }}
                  // open={currentHour >= 8 && currentHour < 10 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={1}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.GridDataSource}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame=""
                    GridDataShip={null}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
                    onShowModel={this.handleShowModel}
                    onPrint={this.handlePrint.bind(this)}
                    IsDelete={false}
                    ShipmentOrderTypelst={this.state.SearchData[2].SearchValue}
                    IsAdd={false}
                    IsDataGridSmallSize={this.state.IsDataGridSmallSize}
                    PageNumber={this.state.PageNumber}
                    DeletePermission={"SHIPMENTORDER_DELETE"}
                    EditPermission={"SHIPMENTORDER_UPDATE"}
                    IsAutoPaging={true}
                    RowsPerPage={10000}
                  />
                </Collapsible>
              </Tabs.TabPane>
              <Tabs.TabPane tab={reactNodeTab("Phân tuyến tự động", this.state.UIEffect.TabShipmentRouteAuto.Content)} key="2" tabKey="tabs_1_2">
                {renderShipmentRouteAuto}
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Space>
                    {/* <Button type="primary" onClick={() => this.handleUserCoordinator()}>
                      Phân tuyến
                    </Button> */}
                    <Button
                      loading={this.state.UIEffect.ButtonShipmentRouteAuto.IsLoading}
                      disabled={this.state.UIEffect.ButtonShipmentRouteAuto.IsDisabled}
                      type="primary"
                      onClick={(_) => this.handleShipmentRouteAuto()}
                    >
                      Phân tuyến tự động
                    </Button>
                  </Space>
                }
                disabled
                key="8"
                tabKey="tabs_1_8"
              ></Tabs.TabPane>
            </Tabs>
          </div>
        )}

        {this.state.IsShowModel && (
          <ModalSearchFormShipmentRouteAuto
            // ShipmentOrderID={0}
            ShipmentRouteID={this.state.ShipmentRouteID}
            InfoCoordinator={this.state.GridDataShipFormModal}
            ShipmentOrderSame={this.state.ShipmentOrderSame}
            IsUserCoordinator={true}
            IsCoordinator={true}
            IsCancelDelivery={true}
            ObjectDescription={this.state.ObjectDescription}
            // onChangeValue={this.handleShipmentOrder.bind(this)}
            onCloseModal={this.handleShowModel}
            onRemoveShip={this.handleRemoveCheckShip}
            onShowNotification={this.addNotification}
          />
        )}

        {this.state.IsShowModelMap && <ModalVietBanDoShipmentRouteAuto ListShipmentOrder={this.state.DataSourceMap} onClose={() => this.setState({ IsShowModelMap: false })} />}
      </div>
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
    showModal: (type, props) => {
      dispatch(showModal(type, props));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
    updatePagePath: (pagePath) => {
      dispatch(updatePagePath(pagePath));
    },
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
  };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
