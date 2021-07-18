import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGridShipmentOder from "../Component/DataGridShipmentOrder";

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
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import SOPrintTemplate from "../../../../common/components/PrintTemplate/SOPrintTemplate";
import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleonChangePage = this.handleonChangePage.bind(this);
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
            PrintID: '',
            dataPrint: {}
        };
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const ShipOrdStatusGroupID = { SearchKey: "@SHIPMENTORDERSTATUSGROUPID", SearchValue: this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : "1,2,3" };
        let listSearchDataObject = Object.assign([], this.state.SearchData, { [9]: ShipOrdStatusGroupID });
        this.callSearchData(listSearchDataObject);
        this.props.updatePagePath(PagePath);


        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 300) {
                $("#btnUserCoordinator").addClass("tofixedButton")
                $("#fixtable").addClass("tofixtable")
            } else {
                $("#btnUserCoordinator").removeClass("tofixedButton")
                $("#fixtable").removeClass("tofixtable")
            }
        });

    }

    handleDelete(id) {
        const ShipmentOrder = { ShipmentOrderID: id, DeletedUser: this.props.AppInfo.LoginInfo.Username };
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, ShipmentOrder).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }
    handleonChangeView() {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchSelected", []).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                });
            }
        });
    }

    handleonSearchEvent(Keywordid) {
        if (Keywordid != "") {
            if (Keywordid.trim().length==15) {
                this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByKeyword", String(Keywordid).trim()).then(apiResult => {
                    if (!apiResult.IsError) {
                        this.setState({
                            gridDataSource: apiResult.ResultObject
                        });
                    }
                });
            }
             else if(Keywordid.trim().length==10) {
                this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPhoneNember", String(Keywordid).trim()).then(apiResult => {
                    if (!apiResult.IsError) {
                        this.setState({
                            gridDataSource: apiResult.ResultObject
                        });
                    }
                });
            }
            else {
                this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByPartnerSaleOrderID", String(Keywordid).trim()).then(apiResult => {
                    if (!apiResult.IsError) {
                        this.setState({
                            gridDataSource: apiResult.ResultObject
                        });
                    }
                });
            }
        }
    }

    onChangePageLoad() {
        this.callSearchData(this.state.SearchData);
    }
    handleonChangePage(pageNum) {
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum - 1 };
        listMLObject = Object.assign([], this.state.SearchData, { [14]: aa });
        // console.log(this.state.SearchData,listMLObject)
        this.callSearchData(listMLObject)
        this.setState({
            PageNumber: pageNum
        });
    }

    handleSearchSubmit(formData, MLObject) {
        // let result="";
        // if ( MLObject.ShipmentOrderTypeID != -1 &&  MLObject.ShipmentOrderTypeID != null &&  MLObject.ShipmentOrderTypeID != "") {
        //     result =  MLObject.ShipmentOrderTypeID.reduce((data, item, index) => {
        //         const comma = data.length ? "," : "";
        //         return data + comma + item;
        //     }, '');
        // }


        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@RECEIVERPHONENUMBER",
                SearchValue: ''
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.CreatedOrderTimeFo
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.CreatedOrderTimeTo
            },
            {
                SearchKey: "@RECEIVERPROVINCEID",
                SearchValue: MLObject.ReceiverProvinceID
            },
            {
                SearchKey: "@RECEIVERDISTRICTID",
                SearchValue: MLObject.ReceiverDistrictID
            },
            {
                SearchKey: "@SENDERSTOREID",
                SearchValue: MLObject.SenderStoreID
            },
            {
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStoreID
            },
            {
                SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
                SearchValue: MLObject.ShipmentOrderStatusGroupID
            },
            {
                SearchKey: "@IsCoordinator",
                SearchValue: MLObject.IsCoordinator
            },
            {
                SearchKey: "@Typename",
                SearchValue: MLObject.Typename
            },
            {
                SearchKey: "@RequestStoreID",
                SearchValue: MLObject.RequestStoreID
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 100
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 0
            }
        ];
        this.setState({ SearchData: postData });
         this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.setState({
            IsLoadData: false
        });
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    IsLoadData: true
                });
            }
            else {
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
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
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
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }


    handlePrint(id) {
        this.setState({
            PrintID: id
        })

        this.props.callFetchAPI("TMSAPI", "api/ShipmentOrder/LoadPrintData", id).then(apiResult => {
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
                            let temp = itemList.filter(item2 => {
                                return item2.ProductID == item.ProductID;
                            });
                            let existItemListOutside = itemListOutside.filter(existItem => { return existItem.ProductID == item.ProductID });
                            if (temp.length > 1 && existItemListOutside.length == 0) {
                                item.Quantity = temp.length;
                                itemListOutside.push(temp[0]);
                                return false;
                            } else if (temp.length > 1 && existItemListOutside.length > 0) {
                                return false;
                            }
                            else {
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
                    this.handlePrintClick()
                }, 300);

            }

        });


    }

    handlePrintClick() {

        // window.print();
        // return;

        var mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<title>Đơn vận chuyển</title>');
        mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('printSO').innerHTML);
        mywindow.document.write('</body></html>');
        // mywindow.document.getElementsByName('body').css( "-webkit-print-color-adjust", "exact !important");
        mywindow.print();
        mywindow.close();

        return true;

    }


    render() {
        this.state.SearchElementList.find(n => n.name == 'cbShipmentOrderStatusGroupID').value = this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : "1,2,3"
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-lg-12 SearchFormCustom">
                    <SearchForm
                        FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={this.state.SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                    />
                      </div>
                      <div className="col-lg-12">
                    <div className="cardShipmentOrder-page">
                        <div className="card-title">
                            <div className="flexbox">
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <div className="group-left">
                                            <div className="input-group">
                                                <button id="btnUserCoordinator" type="button"  className="btn btn-info mr-10" title="" data-provide="tooltip" data-original-title="Thêm">
                                                    <i className="fa fa-plus"></i> Gán NV giao hàng
                                                </button>
                                                <div className="groupActionRemember mr-10">
                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Ghi nhớ">
                                                        <i className="fa fa-save"></i>
                                                    </button>

                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <i className="fa fa-history"></i>
                                                    </button>
                                                </div>

                                                <input type="text" className="form-control" placeholder="" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="ti-search"></i></span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="group-count">
                                            <ul>
                                                <li>
                                                    <span className="count-name">Tổng đơn:</span>
                                                    <span className="count-number">123</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="jsgrid">
                                <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                    <table className="jsgrid-table">
                                        <thead className="jsgrid-header-row">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: '2%' }}></th>
                                                <th className="jsgrid-header-cell" style={{ width: '15%' }}>Thời gian giao</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Địa chỉ</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Mã/Loại yêu cầu vận chuyển</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Tên sản phẩm/Ghi chú</th>
                                                <th className="jsgrid-header-cell" style={{ width: '8%' }}>Thanh toán</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="jsgrid-grid-body">
                                    <table className="jsgrid-table">
                                        <tbody>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action undelivery" style={{ width: '2%' }}>
                                                    <ul>
                                                        <li className="item ">
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="item ">
                                                            <button className="btn">
                                                                <i className="fa fa-user-plus"></i>
                                                            </button>
                                                        </li>
                                                        <li className="item printing">
                                                            <button className="btn" onClick={this.handlePrintClick}>
                                                                <i className="ti ti-printer"></i>
                                                            </button>
                                                        </li>
                                                    </ul>

                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                {/* <span>8/12/2020 08:00</span>
                                                                 */}
                                                                {/* <DatePicker
                                                                    showTime={{ format: 'HH:mm' }}
                                                                    format="YYYY-MM-DD HH:mm"
                                                                    className="frmDateTime"
                                                                    dropdownClassName="tree-select-custom"
                                                                    placeholder="Thời gian giao dự kiến"
                                                                /> */}
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item statusShipmentOder">
                                                                <span className="badge badge-danger noactive">Chưa xuất</span>
                                                                <span className="badge badge-info active">Đã xuất</span>
                                                                <span className="badge badge-success noactive">Đã nhận</span>
                                                            </li>
                                                            {/* <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li> */}
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">-129.000.000</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action waitingDelivery" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action Uncoordinated" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                    <div className="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i className="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i className="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i className="fa fa-user"></i>
                                                            <div className="person-info">
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span className="group-times">
                                                                <span className="time-item">
                                                                    <span className="txtCreatedOrderTime">
                                                                        <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span className="time-item">
                                                                    <span className="intervale">
                                                                        <i className="fa fa-paper-plane-o"></i>
                                                                        <span className="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span className="intervale">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span className="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item">
                                                            <a target="_blank" href="#">201207000069785</a>
                                                        </li>
                                                        <li className="item">
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className="jsgrid-grid-footer">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" data-pagenum="1" data-linktext="previous">
                                                    <span className="fa fa-step-backward" data-pagenum="1"></span>
                                                </a>
                                            </li>
                                            <li className="page-item disabled">
                                                <a className="page-link" data-pagenum="1" data-linktext="previous">
                                                    <span className="ti-arrow-left" data-pagenum="1"></span>
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" data-pagenum="1">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" data-pagenum="2">2</a>
                                            </li>
                                            <li className="page-item disabled">
                                                <a className="page-link" data-pagenum="1" data-linktext="next">
                                                    <span className="ti-arrow-right" data-pagenum="1"></span>
                                                </a>
                                            </li>
                                            <li className="page-item disabled">
                                                <a className="page-link" data-pagenum="1" data-linktext="next">
                                                    <span className="fa fa-step-forward" data-pagenum="1"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                    <div style={{ display: 'none' }}>
                        <SOPrintTemplate ref={el => (this.componentRef = el)} data={this.state.dataPrint} DataID={this.state.PrintID} />
                    </div>

                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                        classNamebtnSearch="btn-custom-right"
                    />
                    <label>Đang nạp dữ liệu...</label>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
