import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import {
  SearchElementList,
  SearchMLObjectDefinition,
  DataGridColumnList,
  AddLink,
  APIHostName,
  SearchAPIPath,
  DeleteAPIPath,
  IDSelectColumnName,
  PKColumnName,
  InitSearchParams,
  PagePath,
} from "../../ShipmentRoute/constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Collapsible from "react-collapsible";
import DataGridShipmentRouteAuto from "./../Components/DataGridShipmentRouteAuto";
import SearchFormShipmentRouteAuto from "../Components/SearchFormShipmentRouteAuto";
import "../../../../css/DataGridShipmentRouteAuto.scss";
import moment from "moment";
import { Button, Card, Col, Row, Space, Statistic, Tabs, Collapse, Popover, Tooltip, Input, Tag } from "antd";
import { EyeOutlined, PartitionOutlined } from "@ant-design/icons";
import { hideModal, showModal } from "../../../../actions/modal";
import ModalSearchFormShipmentRouteAuto from "../Components/ModalSearchFormShipmentRouteAuto";
import ModalVietBanDoShipmentRouteAuto from "../Components/ModalVietBanDoShipmentRouteAuto";
import { formatMonthDate } from "../../../../common/library/CommonLib";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

class SearchCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CallAPIMessage: "",
      GridDataSource: [],
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
      GridDataShipFormModalTemp: [],
      GridDataShipFormModal: [],
      GridDataShip: {
        diffTimeFrame: [],
        TimeFrame8to10: [],
        TimeFrame10to12: [],
        TimeFrame12to14: [],
        TimeFrame14to16: [],
        TimeFrame17to19: [],
        TimeFrame19to21: [],
        Dropped: [],
      },
      ShipmentRouteID: "",
      IsShowModel: false,
      IsShowModelMap: false,
      ShipmentOrderSame: [],
      ObjectIsDisabled: {
        diffTimeFrame: false,
        TimeFrame8to10: false,
        TimeFrame10to12: false,
        TimeFrame12to14: false,
        TimeFrame14to16: false,
        TimeFrame17to19: false,
        TimeFrame19to21: false,
      },
      ObjectTimeFrameDataSource: {
        diffTimeFrame: [],
        TimeFrame8to10: [],
        TimeFrame10to12: [],
        TimeFrame12to14: [],
        TimeFrame14to16: [],
        TimeFrame17to19: [],
        TimeFrame19to21: [],
      },
      diffTimeFrame: [],
      TimeFrame8to10: [],
      TimeFrame10to12: [],
      TimeFrame12to14: [],
      TimeFrame14to16: [],
      TimeFrame17to19: [],
      TimeFrame19to21: [],
      ObjectDescription: {},
      DataSourceMap: [],
      ActiveTimeFrame: {
        Name: "",
        TimeFrame: "",
      },
      ActiveTab: -1,
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
      },
    };

    this.searchref = React.createRef();
    this.notificationDOMRef = React.createRef();

    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOnChangePage = this.handleOnChangePage.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTimeDivision = this.handleTimeDivision.bind(this);
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
    window.addEventListener("resize", this.updateWindowDimensions);

    const activeTab = () => {
      const currentHour = moment().hour();
      if (currentHour >= 8 && currentHour < 10) return "1";
      else if (currentHour >= 10 && currentHour < 12) return "2";
      else if (currentHour >= 12 && currentHour < 14) return "3";
      else if (currentHour >= 14 && currentHour < 16) return "4";
      else if (currentHour >= 17 && currentHour < 19) return "5";
      else if (currentHour >= 19 && currentHour < 21) return "6";
      else return "7";
    };

    let resultActiveTab = activeTab();

    this.handleChangeActiveTab(resultActiveTab);

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
        {
          SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
          SearchValue: this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : "1,2,3",
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
        {
          SearchKey: "@SHIPMENTORDERTYPEID",
          SearchValue: ShipmentOrderInfo.ShipmentOrderTypeID,
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
        {
          SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
          SearchValue: ShipmentOrderInfo.ShipmentOrderStatusGroupID,
        },
        {
          SearchKey: "@IsCoordinator",
          SearchValue: ShipmentOrderInfo.IsCoordinator,
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
          SearchValue: ShipmentOrderInfo.CarrierTypeID,
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

    this.setState({ SearchData: InitSearchParams, SearchElementList: this.state.SearchElementList, ActiveTab: resultActiveTab });

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

  updateWindowDimensions = () => {
    const widthModal = (window.innerWidth * 55) / 100;
    const clientWidth = document.getElementById("SearchFormCustom").clientWidth;

    this.setState({
      widthPercent: widthModal,
      maxWidthGird: clientWidth,
    });
  };

  handleTimeDivision(dataResultObject) {
    let TimeFrame8to10 = [],
      TimeFrame10to12 = [],
      TimeFrame12to14 = [],
      TimeFrame14to16 = [],
      TimeFrame17to19 = [],
      TimeFrame19to21 = [],
      diffTimeFrame = [];

    dataResultObject.forEach((item) => {
      const uptExpectedDeliveryDate = new Date(item.ExpectedDeliveryDate);
      let hour = uptExpectedDeliveryDate.getHours();

      switch (true) {
        case hour >= 8 && hour < 10:
          TimeFrame8to10.push(item);
          break;
        case hour >= 10 && hour < 12:
          TimeFrame10to12.push(item);
          break;
        case hour >= 12 && hour < 14:
          TimeFrame12to14.push(item);
          break;
        case hour >= 14 && hour < 16:
          TimeFrame14to16.push(item);
          break;
        case hour >= 17 && hour < 19:
          TimeFrame17to19.push(item);
          break;
        case hour >= 19 && hour < 21:
          TimeFrame19to21.push(item);
          break;

        default:
          diffTimeFrame.push(item);
          break;
      }
    });

    this.setState({
      diffTimeFrame,
      TimeFrame8to10,
      TimeFrame10to12,
      TimeFrame12to14,
      TimeFrame14to16,
      TimeFrame17to19,
      TimeFrame19to21,
      ObjectTimeFrameDataSource: {
        diffTimeFrame,
        TimeFrame8to10,
        TimeFrame10to12,
        TimeFrame12to14,
        TimeFrame14to16,
        TimeFrame17to19,
        TimeFrame19to21,
      },
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
      {
        SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
        SearchValue: MLObject.ShipmentOrderStatusGroupID,
      },
      {
        SearchKey: "@IsCoordinator",
        SearchValue: MLObject.IsCoordinator,
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
        this.handleTimeDivision(apiResult.ResultObject);

        this.setState({
          GridDataSource: apiResult.ResultObject,
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
  handleCheckShip({ TimeFrame, GridDataShip, ShipmentOrderID, IsSinger }) {
    let changeState = this.state;
    let gridDataShip = changeState.GridDataShip;

    gridDataShip = { ...gridDataShip, [TimeFrame]: GridDataShip };
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

  // Tính khoảng thời gian
  calculateTimeFrame(paramShipmentOrderID) {
    let objShipmentOrder = this.state.GridDataSource.filter((item) => item.ShipmentOrderID === paramShipmentOrderID);
    const uptExpectedDeliveryDate = new Date(objShipmentOrder[0].ExpectedDeliveryDate);
    let hour = uptExpectedDeliveryDate.getHours();

    if (hour >= 8 && hour < 10) return "TimeFrame8to10";
    if (hour >= 10 && hour < 12) return "TimeFrame10to12";
    if (hour >= 12 && hour < 14) return "TimeFrame12to14";
    if (hour >= 14 && hour < 16) return "TimeFrame14to16";
    if (hour >= 17 && hour < 19) return "TimeFrame17to19";
    if (hour >= 19 && hour < 21) return "TimeFrame19to21";
    else return "diffTimeFrame";
  }

  // Xử lý bỏ checked khi nhấn xoá trong modal
  handleRemoveCheckShip(paramShipmentOrderID) {
    let isExistInGridDataShipModalTemp = this.state.GridDataShipFormModalTemp.some((item) => item.ShipmentOrderID == paramShipmentOrderID);

    if (isExistInGridDataShipModalTemp) {
      let timeFrame = this.calculateTimeFrame(paramShipmentOrderID);
      let changeState = this.state;
      let gridDataShip = changeState.GridDataShip;
      let arrTimeFrame = gridDataShip[timeFrame];

      arrTimeFrame.splice(
        arrTimeFrame.findIndex((item) => item.ShipmentOrderID === paramShipmentOrderID),
        1
      );

      changeState = { ...changeState, GridDataShip: gridDataShip };
      this.setState(changeState);
    }
  }

  // Kiểm tra GridDataShip có phần tử không
  handleCheckGirdDataShipIsEmpty() {
    const { diffTimeFrame, TimeFrame8to10, TimeFrame10to12, TimeFrame12to14, TimeFrame14to16, TimeFrame17to19, TimeFrame19to21, Dropped } = this.state.GridDataShip;

    return diffTimeFrame.length > 0
      ? "diffTimeFrame"
      : TimeFrame8to10.length > 0
      ? "TimeFrame8to10"
      : TimeFrame10to12.length > 0
      ? "TimeFrame10to12"
      : TimeFrame12to14.length > 0
      ? "TimeFrame12to14"
      : TimeFrame14to16.length > 0
      ? "TimeFrame14to16"
      : TimeFrame17to19.length > 0
      ? "TimeFrame17to19"
      : TimeFrame19to21.length > 0
      ? "TimeFrame19to21"
      : Dropped.length > 0
      ? "Dropped"
      : "";
  }

  // Xử lý phân tuyến bằng checked
  handleUserCoordinator() {
    let checkGridDataShipEmptyResult = this.handleCheckGirdDataShipIsEmpty();

    if (checkGridDataShipEmptyResult !== "") {
      let changeState = this.state;
      changeState = { ...changeState, IsDataGridSmallSize: true };

      let arrRequest = [];
      for (const [key, value] of Object.entries(this.state.GridDataShip)) {
        if (value.length > 0) {
          arrRequest = [...arrRequest, ...value];
        }
      }

      changeState = { ...changeState, GridDataShipFormModalTemp: arrRequest };
      this.setState(changeState);

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

      for (const [key, value] of Object.entries(gridDataShip)) {
        gridDataShip[key] = [];
      }

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

    // let changeState = this.state;

    // changeState = { ...changeState, ObjectDescription: objDescription };
    // this.setState(changeState);
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
    let arrRequest = [];
    for (const [key, value] of Object.entries(this.state.GridDataShip)) {
      if (value.length > 0) {
        arrRequest = value.reduce((curArray, curValue) => {
          return [...curArray, { ...curValue }];
        }, []);
      }
    }

    if (arrRequest.length > 0 && arrRequest.length < 2) {
      this.showMessage("Phải chọn ít nhất là 2 vận đơn");
      return;
    }

    let messageContent =
      arrRequest.length === 0
        ? `Muốn phân tuyến tự động tất cả các đơn trong khung thời gian ${this.state.ActiveTimeFrame.Name}`
        : `Muốn phân tuyến tự động ${arrRequest.length} đơn trong khung thời gian ${this.state.ActiveTimeFrame.Name}`;

    if (arrRequest.length == 0) {
      arrRequest = [...this.state[this.state.ActiveTimeFrame.TimeFrame]];
    }

    this.showMessage(messageContent, true, "Xác nhận", () => {
      let changeState = this.state;
      let objUIEffect = changeState.UIEffect;
      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;
      let objTabShipmentRouteAuto = objUIEffect.TabShipmentRouteAuto;

      objTabShipmentRouteAuto = { ...objTabShipmentRouteAuto, Content: this.state.ActiveTimeFrame.Name };
      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsLoading: true };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto, TabShipmentRouteAuto: objTabShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };

      this.setState(changeState);

      let objRequest = {
        ListShipmentOrder: arrRequest,
      };

      this.props.callFetchAPI(APIHostName, "api/test/VehicleRouting", objRequest).then((apiResult) => {
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

  // Xử lý render phân tuyến tự động
  renderShipmentRouteAuto() {
    const pickRandomColor = ["#1f5ff4", "#c55d53", "#cb68c5", "#65b411", "#f4b323", "#420e3e", "#e80024", "#585ccc", "#d44371", "#14915f", "#e79940", "#6be54"];
    let randomColor = "";

    let reactNodeTab = (title, length) => (
      <div style={{ position: "relative" }}>
        <span style={{ marginRight: "16px", lineHeight: "30px" }}>{title}</span>
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
      </div>
    );

    let length_motor = this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute.length;

    let length_truck = this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute.length;

    return (
      this.state.ShipmentRouteAutoDataSource != null && (
        <div style={{ width: "100%", border: "1px solid #8080804a"}}>
          <Tabs defaultActiveKey="key_1" style={{ padding: "15px", backgroundColor: "white" }} className="ant-tabs">
            {/* Tab xe máy */}

            <Tabs.TabPane tabKey="key_1_1" tab={reactNodeTab("Xe máy", length_motor)} key="1" className="ant-tabs-child-1">
              <div style={{ width: "100%", backgroundColor: "white", padding: "10px", maxheight: "57vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                <h5>Danh sách các tuyến đề xuất</h5>
                <h6>
                  Tổng cộng số km: <span style={{ fontWeight: "700" }}>{parseInt(this.state.ShipmentRouteAutoDataSource.Motor.TotalDistance / 1000)}</span> km
                </h6>
                <h6>
                  Tổng cộng số tải: <span style={{ fontWeight: "700" }}>{this.state.ShipmentRouteAutoDataSource.Motor.TotalLoad}</span> kg
                </h6>
                {this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute && (
                  // this.state.ShipmentRouteAutoDataSource.Motor.TotalDistance > 0 &&
                  // this.state.ShipmentRouteAutoDataSource.Motor.TotalLoad > 0 &&
                  <div style={{ width: "100%", backgroundColor: "white", padding: "20px", maxHeight: "60vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                    {this.state.ShipmentRouteAutoDataSource.Motor.ListShipmentOrderRoute.map((line, index) => (
                      <div key={index}>
                        <p style={{ display: "none" }}>{(randomColor = pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                        <div style={{ display: "flex" }}>
                          {/* <span style={{ fontWeight: "700", fontSize: "15px" }}>{index}</span>&ensp; */}
                          <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                            <div style={{ width: "90%", marginBottom: "30px" }}>
                              <div style={{ marginBottom: "10px" }}>
                                <Tag color="#108ee9">Tuyến: {index}</Tag>
                                <Tag color="#2db7f5">Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Motor.ListTotalDistance[index] / 1000)}</Tag>
                                <Tag color="#87d068">Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Motor.ListTotalLoad[index]}</Tag>

                                {/* <span>Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Motor.ListTotalDistance[index] / 1000)}</span>&ensp;
                                  <span>Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Motor.ListTotalLoad[index]}</span> */}
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
                                        title={objShipmentOrder.PartnerSaleOrderID}
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
                            <div style={{ width: "10%", textAlign: "right", paddingTop: "18px" }}>
                              <Tooltip title="Xem bản đồ">
                                <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapMotorRoute(index)} />
                              </Tooltip>
                              &nbsp;
                              <Tooltip title="Phân tuyến">
                                <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
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

            {/* Tab xe tải */}

            <Tabs.TabPane tabKey="key_1_2" tab={reactNodeTab("Xe tải", length_truck)} key="2" className="ant-tabs-child-2">
              <div style={{ width: "100%", backgroundColor: "white", padding: "10px", maxheight: "57vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                <h5>Danh sách các tuyến đề xuất</h5>
                <h6>
                  Tổng cộng số km: <span style={{ fontWeight: "700" }}>{parseInt(this.state.ShipmentRouteAutoDataSource.Truck.TotalDistance / 1000)}</span> km
                </h6>
                <h6>
                  Tổng cộng số tải: <span style={{ fontWeight: "700" }}>{this.state.ShipmentRouteAutoDataSource.Truck.TotalLoad}</span> kg
                </h6>
                {this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute && (
                  // this.state.ShipmentRouteAutoDataSource.Truck.TotalDistance > 0 &&
                  // this.state.ShipmentRouteAutoDataSource.Truck.TotalLoad > 0 &&
                  <div style={{ width: "100%", backgroundColor: "white", padding: "20px", maxHeight: "60vh", height: "auto", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                    {this.state.ShipmentRouteAutoDataSource.Truck.ListShipmentOrderRoute.map((line, index) => (
                      <div key={index}>
                        <p style={{ display: "none" }}>{(randomColor = pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                        <div style={{ display: "flex" }}>
                          {/* <span style={{ fontWeight: "700", fontSize: "15px" }}>{index}</span>&ensp; */}
                          <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                            <div style={{ width: "90%", marginBottom: "30px" }}>
                              {/* <div>
                                  <span>Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Truck.ListTotalDistance[index] / 1000)}</span>&ensp;
                                  <span>Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Truck.ListTotalLoad[index]}</span>
                                </div> */}
                              <div style={{ marginBottom: "10px" }}>
                                <Tag color="#108ee9">Tuyến: {index}</Tag>
                                <Tag color="#2db7f5">Số km: {parseInt(this.state.ShipmentRouteAutoDataSource.Truck.ListTotalDistance[index] / 1000)}</Tag>
                                <Tag color="#87d068">Tổng khối lượng: {this.state.ShipmentRouteAutoDataSource.Truck.ListTotalLoad[index]}</Tag>
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
                                        title={objShipmentOrder.PartnerSaleOrderID}
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
                            <div style={{ width: "10%", textAlign: "right", paddingTop: "18px" }}>
                              <Tooltip title="Xem bản đồ">
                                <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapTruckRoute(index)} />
                              </Tooltip>
                              &nbsp;
                              <Tooltip title="Phân tuyến">
                                <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
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

            <Tabs.TabPane tabKey="key_1_3" tab={reactNodeTab("Chưa điều phối", this.state.ShipmentRouteAutoDataSource.Dropped.length)} key="3" className="ant-tabs-child-3">
              <DataGridShipmentRouteAuto
                key={1}
                listColumn={DataGridColumnList}
                dataSource={this.state.ShipmentRouteAutoDataSource.Dropped}
                IsLoadData={this.state.IsLoadData}
                TimeFrame="Dropped"
                GridDataShip={this.state.GridDataShip.Dropped}
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
            </Tabs.TabPane>
          </Tabs>
        </div>
      )
    );
  }

  // Disable Collapse
  handleDisabled(keyCollapse, isCollapse) {
    let changeState = this.state;
    let objIsDisabled = changeState.ObjectIsDisabled;

    objIsDisabled = { ...objIsDisabled, [keyCollapse]: isCollapse };
    changeState = { ...changeState, ObjectIsDisabled: objIsDisabled };

    this.setState(changeState);
  }

  // Xử lý tìm kiếm
  handleInputChange(value, timeFrame) {
    let dispose = setTimeout(() => {
      if (value == "") {
        this.setState({ [timeFrame]: this.state.ObjectTimeFrameDataSource[timeFrame] });
      } else {
        let resultSearch = this.state.ObjectTimeFrameDataSource[timeFrame].filter(
          (n) =>
            n.ShipmentOrderID.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverFullName.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverPhoneNumber.toLowerCase().includes(value.toLowerCase()) ||
            n.PartnerSaleOrderID.toLowerCase().includes(value.toLowerCase()) ||
            n.PrimaryShipItemName.toLowerCase().includes(value.toLowerCase()) ||
            n.ReceiverFullAddress.toLowerCase().includes(value.toLowerCase()) ||
            n.ShipItemNameList.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ [timeFrame]: resultSearch });
      }
    }, 2000);
  }

  // Xử lý sự kiện thay đổi tab
  handleChangeActiveTab(paramActiveKey) {
    let objActiveTimeFrame = {
      Name: "",
      TimeFrame: "",
    };

    if (paramActiveKey == 1) {
      objActiveTimeFrame = {
        Name: "08h - 10h",
        TimeFrame: "TimeFrame8to10",
      };
    } else if (paramActiveKey == 2) {
      objActiveTimeFrame = {
        Name: "10h - 12h",
        TimeFrame: "TimeFrame10to12",
      };
    } else if (paramActiveKey == 3) {
      objActiveTimeFrame = {
        Name: "12h - 14h",
        TimeFrame: "TimeFrame12to14",
      };
    } else if (paramActiveKey == 4) {
      objActiveTimeFrame = {
        Name: "14h - 16h",
        TimeFrame: "TimeFrame14to16",
      };
    } else if (paramActiveKey == 5) {
      objActiveTimeFrame = {
        Name: "17h - 19h",
        TimeFrame: "TimeFrame17to19",
      };
    } else if (paramActiveKey == 6) {
      objActiveTimeFrame = {
        Name: "19h - 21h",
        TimeFrame: "TimeFrame19to21",
      };
    } else if (paramActiveKey == 7) {
      objActiveTimeFrame = {
        Name: "Thời gian khác",
        TimeFrame: "diffTimeFrame",
      };
    } else {
      objActiveTimeFrame = {
        Name: "",
        TimeFrame: "",
      };
    }

    let changeState = this.state;

    if (paramActiveKey == 9) {
      let objUIEffect = changeState.UIEffect;
      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsDisabled: true };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };
    } else {
      let objUIEffect = changeState.UIEffect;
      let objButtonShipmentRouteAuto = objUIEffect.ButtonShipmentRouteAuto;

      objButtonShipmentRouteAuto = { ...objButtonShipmentRouteAuto, IsDisabled: false };
      objUIEffect = { ...objUIEffect, ButtonShipmentRouteAuto: objButtonShipmentRouteAuto };
      changeState = { ...changeState, UIEffect: objUIEffect };
    }

    changeState = { ...changeState, ActiveTimeFrame: objActiveTimeFrame, ActiveTab: paramActiveKey };
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
      <div style={{padding: "0 14px 14px 14px", width: "100%"}}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="col-lg-12 SearchFormCustom" id="SearchFormCustom" style={{ padding: "0"}}>
          {/* <Collapse className="ant-collapse-search" style={{ backgroundColor: "white", marginBottom: "10px" }}>
            <Collapse.Panel header="Tim kiếm, lọc dữ liệu phân tuyến vận chuyển" key="1"> */}
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
            {/* </Collapse.Panel>
          </Collapse> */}

          {/* <SearchForm
                FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
                MLObjectDefinition={SearchMLObjectDefinition}
                listelement={this.state.SearchElementList}
                onSubmit={this.handleSearchSubmit}
                ref={this.searchref}
                btnGroup="btnSearch btncustom btnGroup"
                className="multiple multiple-custom multiple-custom-display"
             /> */}
        </div>

        {this.state.IsLoadDataComplete && (
          <div className="col-lg-12" style={{ backgroundColor: "aliceblue", border: "1px solid #03a9f4", padding: "0"}}>
            <Tabs className="ant-tabs-parent" key="tabs_1" defaultActiveKey={this.state.ActiveTab} activeKey={this.state.ActiveTab} size="large" onChange={(activeKey) => this.handleChangeActiveTab(activeKey)}>
              <Tabs.TabPane tab={reactNodeTab("08h - 10h", this.state.TimeFrame8to10.length)} key="1" tabKey="tabs_1_1">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame8to10}
                  trigger={
                    <Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="08h - 10h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame8to10.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame8to10.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame8to10.filter((item) => item.ShipmentOrderStatusID === 28).length}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame8to10", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame8to10", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame8to10")}
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
                  onClick={(_) => {
                    this.handleCollapse("TimeFrame8to10", false);
                  }}
                  // open={currentHour >= 8 && currentHour < 10 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={1}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame8to10}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame8to10"
                    GridDataShip={this.state.GridDataShip.TimeFrame8to10}
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
              <Tabs.TabPane tab={reactNodeTab("10h - 12h", this.state.TimeFrame10to12.length)} key="2" tabKey="tabs_1_2">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame10to12}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="10h - 12h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame10to12.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame10to12.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame10to12.filter((item) => item.ShipmentOrderStatusID === 28).length}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame10to12", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame10to12", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame10to12")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 10 && currentHour < 12 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={2}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame10to12}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame10to12"
                    GridDataShip={this.state.GridDataShip.TimeFrame10to12}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
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
              <Tabs.TabPane tab={reactNodeTab("12h - 14h", this.state.TimeFrame12to14.length)} key="3" tabKey="tabs_1_3">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame12to14}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="12h - 14h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame12to14.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame12to14.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame12to14.filter((item) => item.ShipmentOrderStatusID === 28).length}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame12to14", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame12to14", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame12to14")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 12 && currentHour < 14 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={3}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame12to14}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame12to14"
                    GridDataShip={this.state.GridDataShip.TimeFrame12to14}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
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
              <Tabs.TabPane tab={reactNodeTab("14h - 16h", this.state.TimeFrame14to16.length)} key="4" tabKey="tabs_1_4">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame14to16}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="14h - 16h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame14to16.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame14to16.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame14to16.filter((item) => item.ShipmentOrderStatusID === 28).length}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame14to16", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame14to16", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame14to16")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 14 && currentHour < 16 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={4}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame14to16}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame14to16"
                    GridDataShip={this.state.GridDataShip.TimeFrame14to16}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
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
              <Tabs.TabPane tab={reactNodeTab("17h - 19h", this.state.TimeFrame17to19.length)} key="5" tabKey="tabs_1_5">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame17to19}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="17h - 19h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame17to19.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame17to19.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame17to19.filter((item) => item.ShipmentOrderStatusID === 29).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame17to19", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame17to19", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame17to19")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 17 && currentHour < 19 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={5}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame17to19}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame17to19"
                    GridDataShip={this.state.GridDataShip.TimeFrame17to19}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
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
              <Tabs.TabPane tab={reactNodeTab("19h - 21h", this.state.TimeFrame19to21.length)} key="6" tabKey="tabs_1_6">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.TimeFrame19to21}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian" value="19h - 21h" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.TimeFrame19to21.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.TimeFrame19to21.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.TimeFrame19to21.filter((item) => item.ShipmentOrderStatusID === 28).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
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
                                    onMouseEnter={(_) => this.handleDisabled("TimeFrame19to21", true)}
                                    onMouseLeave={(_) => this.handleDisabled("TimeFrame19to21", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "TimeFrame19to21")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 19 && currentHour < 21 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={6}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.TimeFrame19to21}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="TimeFrame19to21"
                    GridDataShip={this.state.GridDataShip.TimeFrame19to21}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
                    onPrint={this.handlePrint.bind(this)}
                    IsDelete={false}
                    ShipmentOrderTypelst={this.state.SearchData[2].SearchValue}
                    IsDataGridSmallSize={this.state.IsDataGridSmallSize}
                    IsAdd={false}
                    PageNumber={this.state.PageNumber}
                    DeletePermission={"SHIPMENTORDER_DELETE"}
                    EditPermission={"SHIPMENTORDER_UPDATE"}
                    IsAutoPaging={true}
                    RowsPerPage={10000}
                  />
                </Collapsible>
              </Tabs.TabPane>
              <Tabs.TabPane tab={reactNodeTab("Thời gian khác", this.state.diffTimeFrame.length)} key="7" tabKey="tabs_1_7">
                <Collapsible
                  className="CollapsibleCustom"
                  triggerDisabled={this.state.ObjectIsDisabled.diffTimeFrame}
                  trigger={
                    <React.Fragment>
                      <Row gutter={24}>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Thời gian khác" value="" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic title="Tổng số đơn" value={this.state.diffTimeFrame.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Khởi tạo và chờ phân bổ"
                              value={this.state.diffTimeFrame.filter((item) => item.ShipmentOrderStatusID === 20).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                            />
                          </Card>
                        </Col>
                        <Col span={4}>
                          <Card size="small" bordered={false}>
                            <Statistic
                              title="Giao hàng thành công"
                              value={this.state.diffTimeFrame.filter((item) => item.ShipmentOrderStatusID === 28).length}
                              valueStyle={{ color: "#3f8600", fontSize: "20px" }}
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
                                    onMouseEnter={(_) => this.handleDisabled("diffTimeFrame", true)}
                                    onMouseLeave={(_) => this.handleDisabled("diffTimeFrame", false)}
                                    onChange={(event) => this.handleInputChange(event.target.value, "diffTimeFrame")}
                                    style={{ width: "100%" }}
                                  />
                                );
                              }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  }
                  triggerOpenedClassName="collapsible-open-custom"
                  triggerStyle={{ backgroundColor: "white" }}
                  easing="ease-in"
                  // open={currentHour >= 21 || currentHour >= 16 && currentHour < 17 ? true : false}
                  open={true}
                >
                  <DataGridShipmentRouteAuto
                    key={7}
                    listColumn={DataGridColumnList}
                    dataSource={this.state.diffTimeFrame}
                    IsLoadData={this.state.IsLoadData}
                    TimeFrame="diffTimeFrame"
                    GridDataShip={this.state.GridDataShip.diffTimeFrame}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleOnChangePage}
                    onChangeView={this.handleOnChangeView.bind(this)}
                    onSearchEvent={this.handleOnSearchEvent.bind(this)}
                    onChangePageLoad={this.onChangePageLoad.bind(this)}
                    onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                    onShowModel={this.handleShowModel}
                    onCheckShip={this.handleCheckShip}
                    onClickShip={this.handleClickShip}
                    onShipmentRoute={this.handleClickShipmentRoute}
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
              <Tabs.TabPane tab={reactNodeTab("Phân tuyến tự động", this.state.UIEffect.TabShipmentRouteAuto.Content)} key="9" tabKey="tabs_1_9">
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
