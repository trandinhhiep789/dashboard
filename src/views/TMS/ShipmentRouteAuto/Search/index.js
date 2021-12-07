import React, { Fragment } from "react";
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
import SearchForm from "../Components/SearchFormShipmentRouteAutoOldUI";
import "../../../../css/DataGridShipmentRouteAuto.scss";
import moment from "moment";
import { Button, Card, Col, Row, Space, Statistic } from "antd";
import { hideModal, showModal } from "../../../../actions/modal";
import ModalSearchFormShipmentRouteAuto from "../Components/ModalSearchFormShipmentRouteAuto";
import { MODAL_TYPE_VIEW } from "./../../../../constants/actionTypes";
import ListShipCoordinatorRoute from "../../ShipmentRoute/Component/ListShipCoordinatorRoute";

class SearchCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CallAPIMessage: "",
      gridDataSource: [],
      IsCallAPIError: false,
      SearchData: InitSearchParams,
      SearchElementList: SearchElementList,
      cssNotification: "",
      iconNotification: "",
      PageNumber: 1,
      IsLoadDataComplete: false,
      IsLoadData: false,
      PrintID: "",
      dataPrint: {},
      IsDataGridSmallSize: false,
      GridDataShip: [],
      ShipmentRouteID: 0,
      IsShowModel: false,
      ShipmentOrderSame: [],

      diffTimeFrame: [],
      TimeFrame8to10: [],
      TimeFrame10to12: [],
      TimeFrame12to14: [],
      TimeFrame14to16: [],
      TimeFrame17to19: [],
      TimeFrame19to21: [],
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
    this.handleShipmentOrder = this.handleShipmentOrder.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCheckShip = this.handleCheckShip.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModel = this.handleShowModel.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

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

    this.setState({ SearchData: InitSearchParams, SearchElementList: this.state.SearchElementList });
    this.callSearchData(InitSearchParams);
    this.props.updatePagePath(PagePath);

    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 200) {
        $("#menu-options").addClass("menu-options-fixed");
      } else {
        $("#menu-options").removeClass("menu-options-fixed");
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
          gridDataSource: apiResult.ResultObject,
        });
      }
    });
  }

  handleDataGridSmallSize(isSmall) {
    let changeState = this.state;
    changeState = { ...changeState, IsDataGridSmallSize: isSmall };
    this.setState(changeState);
  }

  handleonSearchEvent(Keywordid) {
    if (Keywordid != "") {
      if (Keywordid.trim().length == 15) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByKeyword", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              gridDataSource: apiResult.ResultObject,
            });
          }
        });
      } else if (Keywordid.trim().length == 10) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPhoneNember", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              gridDataSource: apiResult.ResultObject,
            });
          }
        });
      } else {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPartnerSaleOrderID", String(Keywordid).trim()).then((apiResult) => {
          if (!apiResult.IsError) {
            this.setState({
              gridDataSource: apiResult.ResultObject,
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
          gridDataSource: apiResult.ResultObject,
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

  showMessage(message) {
    ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
  }

  addNotification(message1, IsError) {
    if (!IsError) {
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
            <p className="notification-message">{message1}</p>
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
      //this.setState({ IsCallAPIError: apiResult.IsError });
      if (!apiResult.IsError) {
        // debugger;
        // console.log("apiResult.ResultObject", apiResult.ResultObject);
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

        this.setState({ dataPrint: apiResult.ResultObject });
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

  handleShipmentOrder(apiResult) {
    this.addNotification(apiResult.Message, apiResult.IsError);
    if (!apiResult.IsError) {
      this.props.hideModal();
      this.setState({ ShipmentRouteID: "", GridDataShip: [], changeGird: false });
      if (this.props.onChangePageLoad != null) this.props.onChangePageLoad();
    }
  }

  handleCloseModal = () => {
    this.setState({
      GridDataShip: [],
      ShipmentRouteID: "",
    });

    this.props.onDataGridSmallSize(false);
    this.props.hideModal();
  };

  handleCheckShip(paramGridDataShip) {
    let changeState = this.state;
    let gridDataShip = changeState.GridDataShip;

    gridDataShip = [...paramGridDataShip];
    changeState = { ...changeState, GridDataShip: gridDataShip };

    this.setState(changeState);
  }

  handleUserCoordinator() {
    this.props.hideModal();

    if (this.state.GridDataShip.length > 0) {
      this.state.GridDataShip[0].ShipmentOrderTypelst = this.state.SearchData[2].SearchValue;

      this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", this.state.GridDataShip).then((apiResult) => {
        if (!apiResult.IsError) {
          this.setState({ GridDataShip: apiResult.ResultObject.ShipmentOrderDeliverList, changeGird: true });
          this.props.showModal(MODAL_TYPE_VIEW, {
            title: "Phân tuyến điều phối vận đơn",
            isShowOverlay: false,
            onhideModal: this.handleClose,
            content: {
              text: (
                <ListShipCoordinatorRoute
                  ShipmentOrderID={0}
                  ShipmentRouteID={this.state.ShipmentRouteID}
                  InfoCoordinator={this.state.GridDataShip}
                  ShipmentOrderSame={apiResult.ResultObject.ShipmentOrderDeliverSameList}
                  IsUserCoordinator={true}
                  IsCoordinator={true}
                  IsCancelDelivery={true}
                  onChangeValue={this.handleShipmentOrder.bind(this)}
                  onChangeClose={this.handleCloseModal.bind(this)}
                />
              ),
            },
            maxWidth: this.state.widthPercent + "px",
          });
        } else {
          this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
        }
      });
    } else {
      this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
    }
  }

  // handleUserCoordinator() {
  //   if (this.state.GridDataShip.length > 0) {
  //     this.state.GridDataShip[0].ShipmentOrderTypelst = this.state.SearchData[2].SearchValue;

  //     this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", this.state.GridDataShip).then((apiResult) => {
  //       if (!apiResult.IsError) {
  //         this.setState({ ShipmentOrderSame: apiResult.ResultObject.ShipmentOrderDeliverSameList, GridDataShip: apiResult.ResultObject.ShipmentOrderDeliverList, changeGird: true, IsShowModel: true });
  //       } else {
  //         this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
  //       }
  //     });
  //   } else {
  //     this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
  //   }
  // }

  handleShowModel(isShow) {
    this.setState({ IsShowModel: isShow });
  }

  render() {
    const currentHour = moment().hour();

    return (
      <React.Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="col-lg-12 SearchFormCustom" id="SearchFormCustom">
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

        <div id="menu-options">
          <Space>
            <Button type="primary" onClick={() => this.handleUserCoordinator()}>
              Phân tuyến
            </Button>
            <Button type="primary">Phân tuyến tự động</Button>
          </Space>
        </div>

        {this.state.IsLoadDataComplete && (
          <div className="col-lg-12">
            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="08h00 - 10h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame8to10.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame8to10.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame8to10.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Fragment>
              }
              triggerStyle={{ backgroundColor: "white" }}
              triggerOpenedClassName="collapsible-open-custom"
              easing="ease-in"
              open={currentHour >= 8 && currentHour < 10 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame8to10}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="10h00 - 12h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame10to12.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame10to12.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame10to12.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 10 && currentHour < 12 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame10to12}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="12h00 - 14h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame12to14.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame12to14.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame12to14.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 12 && currentHour < 14 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame12to14}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="14h00 - 16h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame14to16.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame14to16.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame14to16.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 14 && currentHour < 16 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame14to16}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="17h00 - 19h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame17to19.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame17to19.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame17to19.filter((item) => item.ShipmentOrderStatusID === 29).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 17 && currentHour < 19 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame17to19}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian" value="19h00 - 21h00" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.TimeFrame19to21.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.TimeFrame19to21.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.TimeFrame19to21.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 19 && currentHour < 21 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.TimeFrame19to21}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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

            <Collapsible
              className="CollapsibleCustom"
              trigger={
                <React.Fragment>
                  <Row gutter={24}>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Thời gian khác" value="" valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic title="Tổng số đơn" value={this.state.diffTimeFrame.length} valueStyle={{ color: "#3f8600", fontSize: "20px" }} />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Khởi tạo và chờ phân bổ"
                          value={this.state.diffTimeFrame.filter((item) => item.ShipmentOrderStatusID === 20).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                    <Col span={5}>
                      <Card size="small" bordered={false}>
                        <Statistic
                          title="Giao hàng thành công"
                          value={this.state.diffTimeFrame.filter((item) => item.ShipmentOrderStatusID === 28).length}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                          valueStyle={{ color: "#3f8600", fontSize: "20px" }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              }
              triggerOpenedClassName="collapsible-open-custom"
              triggerStyle={{ backgroundColor: "white" }}
              easing="ease-in"
              open={currentHour >= 21 ? true : false}
            >
              <DataGridShipmentRouteAuto
                listColumn={DataGridColumnList}
                dataSource={this.state.diffTimeFrame}
                IsLoadData={this.state.IsLoadData}
                GridDataShip={this.state.GridDataShip}
                AddLink={AddLink}
                IDSelectColumnName={IDSelectColumnName}
                PKColumnName={PKColumnName}
                onDeleteClick={this.handleDelete}
                onChangePage={this.handleOnChangePage}
                onChangeView={this.handleOnChangeView.bind(this)}
                onSearchEvent={this.handleonSearchEvent.bind(this)}
                onChangePageLoad={this.onChangePageLoad.bind(this)}
                onDataGridSmallSize={this.handleDataGridSmallSize.bind(this)}
                onCheckShip={this.handleCheckShip}
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
          </div>
        )}

        {this.state.IsShowModel && (
          <ModalSearchFormShipmentRouteAuto
            ShipmentOrderID={0}
            ShipmentRouteID={this.state.ShipmentRouteID}
            InfoCoordinator={this.state.GridDataShip}
            ShipmentOrderSame={this.state.ShipmentOrderSame}
            IsUserCoordinator={true}
            IsCoordinator={true}
            IsCancelDelivery={true}
            onChangeValue={this.handleShipmentOrder.bind(this)}
            onChangeClose={this.handleCloseModal.bind(this)}
            onCloseModal={this.handleShowModel.bind(this)}
          />
        )}
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
