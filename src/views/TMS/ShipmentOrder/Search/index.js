import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGridShipmentOder from "../Component/DataGridShipmentOrder";

import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
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
    AddLogAPIPath
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
        const ShipOrdStatusGroupID = { SearchKey: "@SHIPMENTORDERSTATUSGROUPID", SearchValue: this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : -1 };
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
            this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchByKeyword", Keywordid).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        gridDataSource: apiResult.ResultObject
                    });
                }
            });
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
        // console.log("aaa",formData, MLObject)
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
                SearchKey: "@IsOrderBy",
                SearchValue: MLObject.IsOrderBy
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

        this.props.callFetchAPI("TMSAPI", "api/ShipmentOrder/LoadInfoForMobile", id).then(apiResult => {
            //this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // debugger;
                // console.log("apiResult.ResultObject", apiResult.ResultObject);
                // let itemList = apiResult.ResultObject.ShipmentOrder_ItemList;
                // let itemListOutside = [];
                // let itemListResult = [];
                // let temp = [];
                // let tempItemList = [];
                // if (itemList) {
                //     tempItemList = itemList.map((item, index) => {
                //         temp = itemList.filter(item2 => {
                //            return item2.ProductID == item.ProductID;
                //         });
                //         if (temp.length > 1) {
                //             item.Quantity = temp.length;
                //             itemListOutside.push(temp);
                //             temp = [];
                //             return null;
                //         } else {
                //             temp = [];
                //             return item;
                //         }


                //     });
                //     itemListResult = tempItemList.concat(itemListOutside);
                // }
                // if (itemListOutside) {
                //     apiResult.ResultObject.ShipmentOrder_ItemList = itemListResult;
                // }
                // console.log("itemListResult", itemListResult);

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
        this.state.SearchElementList.find(n => n.name == 'cbShipmentOrderStatusGroupID').value = this.props.location.state != undefined ? this.props.location.state.ShipmentOrderStatusGroupID : -1
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={this.state.SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                    />
                    <DataGridShipmentOder
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        IsLoadData={this.state.IsLoadData}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        onChangePage={this.handleonChangePage}
                        onChangeView={this.handleonChangeView.bind(this)}
                        onSearchEvent={this.handleonSearchEvent.bind(this)}
                        onChangePageLoad={this.onChangePageLoad.bind(this)}
                        onPrint={this.handlePrint.bind(this)}
                        IsDelete={false}
                        IsAdd={false}
                        PageNumber={this.state.PageNumber}
                        DeletePermission={"SHIPMENTORDER_DELETE"}
                        EditPermission={"SHIPMENTORDER_UPDATE"}
                        IsAutoPaging={true}
                        RowsPerPage={100}
                    />
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
