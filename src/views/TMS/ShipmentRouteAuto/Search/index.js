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
import SearchForm from "../Components/SearchFormShipmentRouteAutoOldUI";
import "../../../../css/DataGridShipmentRouteAuto.scss";
import moment from "moment";
import { Button, Card, Col, Row, Space, Statistic, Tabs, Collapse, Popover, Tooltip } from "antd";
import { EyeOutlined, PartitionOutlined } from "@ant-design/icons";
import { hideModal, showModal } from "../../../../actions/modal";
import ModalSearchFormShipmentRouteAuto from "../Components/ModalSearchFormShipmentRouteAuto";
import ModalVietBanDoShipmentRouteAuto from "../Components/ModalVietBanDoShipmentRouteAuto";

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
            },
            ShipmentRouteID: "",
            IsShowModel: false,
            IsShowModelMap: false,
            ShipmentOrderSame: [],

            diffTimeFrame: [],
            TimeFrame8to10: [],
            TimeFrame10to12: [],
            TimeFrame12to14: [],
            TimeFrame14to16: [],
            TimeFrame17to19: [],
            TimeFrame19to21: [],

            ObjectDescription: {},
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

    handleonSearchEvent(Keywordid) {
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

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo" message={message} onRequestClose={() => true} onCloseModal={this.handleCloseMessage} />);
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

    // handleShipmentOrder(apiResult) {
    //   this.addNotification(apiResult.Message, apiResult.IsError);
    //   if (!apiResult.IsError) {
    //     this.setState({ ShipmentRouteID: "", GridDataShip: [], ChangeGird: false });
    //     if (this.props.onChangePageLoad != null) this.props.onChangePageLoad();
    //   }
    // }

    //Xử lý thêm nút checked
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
        console.log("paramShipmentOrderID", paramShipmentOrderID);
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

    // handleUserCoordinator() {
    //   this.props.hideModal();

    //   if (this.state.GridDataShip.length > 0) {
    //     this.state.GridDataShip[0].ShipmentOrderTypelst = this.state.SearchData[2].SearchValue;

    //     this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderNewLst", this.state.GridDataShip).then((apiResult) => {
    //       if (!apiResult.IsError) {
    //         this.setState({ GridDataShip: apiResult.ResultObject.ShipmentOrderDeliverList, ChangeGird: true });
    //         this.props.showModal(MODAL_TYPE_VIEW, {
    //           title: "Phân tuyến điều phối vận đơn",
    //           isShowOverlay: false,
    //           onhideModal: this.handleClose,
    //           content: {
    //             text: (
    //               <ListShipCoordinatorRoute
    //                 ShipmentOrderID={0}
    //                 ShipmentRouteID={this.state.ShipmentRouteID}
    //                 InfoCoordinator={this.state.GridDataShip}
    //                 ShipmentOrderSame={apiResult.ResultObject.ShipmentOrderDeliverSameList}
    //                 IsUserCoordinator={true}
    //                 IsCoordinator={true}
    //                 IsCancelDelivery={true}
    //                 onChangeValue={this.handleShipmentOrder.bind(this)}
    //                 onChangeClose={this.handleCloseModal.bind(this)}
    //               />
    //             ),
    //           },
    //           maxWidth: this.state.widthPercent + "px",
    //         });
    //       } else {
    //         this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
    //       }
    //     });
    //   } else {
    //     this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!");
    //   }
    // }

    handleCheckGirdDataShipIsEmpty() {
        const { diffTimeFrame, TimeFrame8to10, TimeFrame10to12, TimeFrame12to14, TimeFrame14to16, TimeFrame17to19, TimeFrame19to21 } = this.state.GridDataShip;

        console.log({ diffTimeFrame, TimeFrame8to10, TimeFrame10to12, TimeFrame12to14, TimeFrame14to16, TimeFrame17to19, TimeFrame19to21 });

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

    //Xử lý hiện/ản modal
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

    shipmentRouteAuto() {
        const a = [
            {
                name: "haha",
                km: "12000",
                kg: "80",
                Ds: [
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "123" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "345" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "678" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "678s" }
                ],
            },
            {
                name: "hihi",
                km: "52000",
                kg: "80",
                Ds: [
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "111" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "222" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "333" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "112" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "221" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "331" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1df11" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "22f2" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "3a3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "11d2" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "22s1" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "33b1" },
                ],
            },
            {
                name: "hahasa",
                km: "142000",
                kg: "80",
                Ds: [{ diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1a23" }, { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "34as5" }, { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "67c8" }],
            },
            {
                name: "hahaa",
                km: "12000",
                kg: "80",
                Ds: [
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1a2q3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "3d4ass5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "67cc8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1a2qa3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "3qd4as5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "67ccd8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1a2aq3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "3d4as5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "67cc8z" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1a2qaa3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "3qd4acs5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "6a7ccd8" },
                ],
            },
            {
                name: "hashaa",
                km: "127000",
                kg: "80",
                Ds: [
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1ad2q3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "3da4ass5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "67ccc8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1a2qac3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "3qzd4as5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "67csxcd8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1a2xacq3" },
                ],
            },
            {
                name: "hasshaa",
                km: "120600",
                kg: "80",
                Ds: [
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "1ad2qa3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: true, ShipmentOrderID: "3da4adss5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "67cvcc8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1a2aqac3" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "3qzds4as5" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "67csxcdc8" },
                    { diaChi: "dia chi", tenKH: "tenKH", finish: false, ShipmentOrderID: "1a2xaacq3" },
                ],
            },
        ];
        var randomColor;
        const pickRandomColor = ["#1f5ff4", "#c55d53", "#cb68c5", "#65b411", "#f4b323", "#420e3e", "#e80024", "#585ccc", "#d44371", "#14915f", "#e79940", "#6be54"];
        return (
            <div>
                <h4>Danh sách các tuyến đề xuất</h4>
                <h5>Tổng cộng số km các tuyến: <i style={{ fontWeight: "700" }}>{a.reduce((t, v) => t + ((v.km * 1) / 1000), 0)}</i> km</h5>
                <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "57vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                    <div style={{}}>
                        {a &&
                            a.map((line, i) => (
                                <div key={line.name}>
                                    <p style={{ display: "none" }}>{(randomColor = pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                                    <div style={{ display: "flex" }}>
                                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                                            {i}
                                        </span>&ensp;
                                        <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                                            <div style={{ width: "90%", marginBottom: "30px" }}>
                                                <div>
                                                    <i>Số km: {((line.km) * 1) / 1000}</i>&ensp;
                                                    <i>Tổng khối lượng: {line.kg}</i>
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    {line.Ds.map((a, i, row) => (
                                                        <div key={a.ShipmentOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
                                                            {i != 0 && (a.finish ? <div style={{ width: "100%", height: "10px", borderBottom: `3px solid ${randomColor}` }}></div> : <div style={{ width: "100%", height: "10px", borderBottom: `3px solid #80808030` }}></div>)}
                                                            <Popover content={<div><p>{a.tenKH}</p><p>{a.diaChi}</p></div>} title={a.ShipmentOrderID}>
                                                                <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                    {a.finish ?
                                                                        <div
                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                        >
                                                                            <div style={{ position: "absolute", top: "10px", left: "-8px" }}>{a.ShipmentOrderID}</div>
                                                                        </div> :
                                                                        <div
                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: "white", borderRadius: "50%", cursor: "pointer" }}
                                                                        >
                                                                            <div style={{ position: "absolute", top: "10px", left: "-8px" }}>{a.ShipmentOrderID}</div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </Popover>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ width: "10%", textAlign: "right", paddingTop: "18px" }}>
                                                <Tooltip title="Xem bản đồ">
                                                    <Button type="primary" shape="circle" icon={<EyeOutlined />} />
                                                </Tooltip>&nbsp;
                                                <Tooltip title="Phân tuyến">
                                                    <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const currentHour = moment().hour();

        const phanTuyenTuDong = this.shipmentRouteAuto();

        const active_tab = (time) => {
            if (time >= 8 && time < 10) return "1";
            else if (time >= 10 && time < 12) return "2";
            else if (time >= 12 && time < 14) return "3";
            else if (time >= 14 && time < 16) return "4";
            else if (time >= 17 && time < 19) return "5";
            else if (time >= 19 && time < 21) return "6";
            else return "7";
        };

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-lg-12 SearchFormCustom" id="SearchFormCustom">
                    <Collapse style={{ backgroundColor: "white", marginBottom: "10px" }}>
                        <Collapse.Panel header="Tim kiếm, lọc dữ liệu phân tuyến vận chuyển" key="1">
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
                        </Collapse.Panel>
                    </Collapse>

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

                {/* <div className="menu-options" style={{marginTop: "10px"}}>
          <Space>
            <Button type="primary" onClick={() => this.handleUserCoordinator()}>
              Phân tuyến
            </Button>
            <Button type="primary" onClick={() => this.shipmentRouteAuto()}>Phân tuyến tự động</Button>
          </Space>
        </div> */}

                {this.state.IsLoadDataComplete && (
                    <div className="col-lg-12" style={{ backgroundColor: "aliceblue", border: "1px solid #03a9f4" }}>
                        <Tabs defaultActiveKey={active_tab(currentHour)} size="large">
                            <Tabs.TabPane tab="08h00 - 10h00" key="1">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="10h00 - 12h00" key="2">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="12h00 - 14h00" key="3">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="14h00 - 16h00" key="4">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="17h00 - 19h00" key="5">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="19h00 - 21h00" key="6">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane tab="Thời gian khác" key="7">
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
                                        onSearchEvent={this.handleonSearchEvent.bind(this)}
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
                            <Tabs.TabPane
                                tab="Phân tuyến tự động"
                                key="9"
                            >
                                {phanTuyenTuDong}
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                tab={
                                    <Space>
                                        <Button type="primary" onClick={() => this.handleUserCoordinator()}>
                                            Phân tuyến
                                        </Button>
                                        {/* <Button type="primary">
                      Phân tuyến tự động
                    </Button> */}
                                    </Space>
                                }
                                disabled
                                key="8"
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
