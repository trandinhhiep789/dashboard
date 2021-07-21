import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Media from "react-media";
import { MessageModal } from "../../../../common/components/Modal";
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";
import GridCell from "../../../../common/components/DataGrid/GridCell";
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { connect } from 'react-redux';
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";
import { formatDate, formatMonthDate } from "../../../../common/library/CommonLib.js";
import { formatMoney, formatNumber } from '../../../../utils/function';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_VIEW } from '../../../../constants/actionTypes';
import ListShipCoordinator from '../Component/ListShipCoordinator.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName
} from "../constants";

import SOPrintTemplate from "../../../../common/components/PrintTemplate/SOPrintTemplate";
import { fn } from 'moment';

class DataGridShipmentOderCom extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onChangePageHandle = this.onChangePageHandle.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleCloseModel = this.handleCloseModel.bind(this);
        this.handleMultipleInsertClick = this.handleMultipleInsertClick.bind(this);
        this.handleOneInsertClick = this.handleOneInsertClick.bind(this);
        this.handleonClickDelete = this.handleonClickDelete.bind(this);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.getCheckList = this.getCheckList.bind(this);
        const pkColumnName = this.props.PKColumnName.split(',');
        const listPKColumnName = pkColumnName.map(item => { return { key: item } });
        this.state = {
            GridData: {},
            DataSource: this.props.dataSource,
            IsCheckAll: false, PageNumber: this.props.PageNumber, ListPKColumnName: listPKColumnName,
            GridDataShip: [],
            KeywordId: '',
            printDataID: '',
            widthPercent: "",

        };
        this.notificationDOMRef = React.createRef();
        this.renderDataGridSmallSize = this.renderDataGridSmallSize.bind(this);
    }



    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        if (this.props.dataSource) {
            const gridData = this.getCheckList(this.props.dataSource);
            this.setState({ GridData: gridData });
        }
        let permissionKey = this.props.RequirePermission;
        if (!permissionKey) {
            this.setState({ IsPermision: true }); return;
        }
        this.checkPermission(permissionKey).then((result) => {
            this.setState({ IsPermision: result });
        })



    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 60) / 100
        })
    };


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const gridData = this.getCheckList(nextProps.dataSource);
            this.setState({
                GridData: gridData,
                GridDataShip: [],
                DataSource: nextProps.dataSource,
                PageNumber: nextProps.PageNumber
            });
        }

        if (JSON.stringify(this.props.IsLoadData) !== JSON.stringify(nextProps.IsLoadData)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({
                GridDataShip: []
            });
        }

    }



    handleCloseMessage() {

    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleInsertClickEdit(id, pkColumnName) {
        if (this.props.onInsertClickEdit != null)
            this.props.onInsertClickEdit(id, pkColumnName);
    }

    handleInsertClick() {
        if (this.props.onInsertClick != null)
            this.props.onInsertClick(this.props.MLObjectDefinition, this.props.modalElementList, this.props.dataSource);
    }

    checkAll(e) {
        const isCheck = e.target.checked;
        const dataSource = this.props.dataSource;
        const pkColumnName = this.state.ListPKColumnName;
        const idSelectColumnName = this.props.IDSelectColumnName;
        const dataSourceFilter = this.getDisplayData(this.props.dataSource);
        let checkList = this.state.GridData[idSelectColumnName];
        let elementobject;
        dataSource.map((rowItem, rowIndex) => {
            let isMath = false;
            for (var i = 0; i < dataSourceFilter.length; i++) {
                for (var j = 0; j < pkColumnName.length; j++) {
                    if (rowItem[pkColumnName[j].key] != dataSourceFilter[i][pkColumnName[j].key]) {
                        isMath = false;
                        break;
                    }
                    else {
                        isMath = true;
                    }
                }
                if (isMath) {
                    break;
                }
            }
            const value = pkColumnName.map((obj, index) => {
                return { key: obj.key, value: rowItem[obj.key] };
            })
            if (isMath) {
                elementobject = { pkColumnName: value, IsChecked: isCheck };
            }
            else {
                elementobject = { pkColumnName: value, IsChecked: false };
            }
            checkList = Object.assign([], checkList, { [rowIndex]: elementobject });
        });
        this.setState({ GridData: { [idSelectColumnName]: checkList }, IsCheckAll: isCheck });
    }

    onChangePageHandle(pageNum) {
        this.setState({ PageNumber: pageNum });
        if (this.props.onChangePage != null)
            this.props.onChangePage(pageNum);

    }

    checkInputisAll(dataSource, gridData) {
        //const dataSource = this.getDisplayData(this.props.dataSource);
        //  console.log("checkInputisAll", gridData, dataSource)
        const pkColumnName = this.state.ListPKColumnName;
        let aaa = true;
        if (dataSource != null) {
            dataSource.map((rowItem, rowIndex) => {
                for (var j = 0; j < pkColumnName.length; j++) {
                    // console.log("rowItem", pkColumnName[j], rowItem[pkColumnName[j].key])

                    var marvelHeroes = gridData.filter(function (hero) {
                        //console.log("hero", hero, hero.pkColumnName, hero.pkColumnName[0].value)
                        return hero.pkColumnName[j].value == rowItem[pkColumnName[j].key];
                    });
                    //console.log("marvelHeroes", marvelHeroes)
                    if (marvelHeroes && marvelHeroes.length > 0 && marvelHeroes[0].IsChecked == false) {
                        aaa = false
                        break;
                    }
                }
            });
        }
        return aaa;
    }

    onValueChange(elementdata, index) {
        let elementobject;
        let gridData;
        const multipleCheck = this.props.isMultipleCheck;
        const pkColumnName = this.state.ListPKColumnName;
        if (multipleCheck || multipleCheck == undefined) {
            if (elementdata.Name == "chkSelect") {
                let checkList = this.state.GridData[elementdata.Name];
                let ListElement = this.state.GridData[elementdata.Name];
                let isMath = false;
                for (var i = 0; i < checkList.length; i++) {
                    for (var j = 0; j < pkColumnName.length; j++) {
                        if (elementdata.pkColumnName[j].value != checkList[i].pkColumnName[j].value) {
                            isMath = false;
                            break;
                        }
                        else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        elementobject = { pkColumnName: elementdata.pkColumnName, IsChecked: elementdata.IsChecked };
                        ListElement = Object.assign([], this.state.GridData[elementdata.Name], { [i]: elementobject });
                        break;
                    }
                }
                gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: ListElement });

            }
            else {
                elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata });
                gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject });
            }
            const temp = this.checkInputisAll(this.getDisplayData(this.props.dataSource), gridData["chkSelect"]);
            // console.log("temp", temp);
            // console.log("checkList1", gridData, elementobject);
            this.setState({ GridData: gridData, IsCheckAll: temp });
        }
        else {
            let checkList = this.state.GridData[elementdata.Name];
            let ListElement = this.state.GridData[elementdata.Name];
            let isMath = false;
            for (var i = 0; i < checkList.length; i++) {
                for (var j = 0; j < pkColumnName.length; j++) {
                    if (elementdata.pkColumnName[j].value != checkList[i].pkColumnName[j].value) {
                        isMath = false;
                        break;
                    }
                    else {
                        isMath = true;
                    }
                }
                if (isMath) {
                    elementobject = { pkColumnName: elementdata.pkColumnName, IsChecked: elementdata.IsChecked };
                    ListElement = Object.assign([], this.state.GridData[elementdata.Name], { [i]: elementobject });
                    break;
                }
            }
            gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: ListElement });
            // console.log("checkList", gridData);
            this.setState({ GridData: gridData });
        }
    }

    handleKeyPress(e) {
        this.setState({ KeywordId: e.target.value });
        if (e.key == "Enter") {
            const searchText = e.target.value;
            if (this.props.onSearchEvent != null) {
                this.props.onSearchEvent(searchText)
            }
        }
    }

    handleonChange(e) {
        this.setState({ KeywordId: e.target.value });
    }
    handleSearchShip() {
        if (this.props.onSearchEvent != null) {
            this.props.onSearchEvent(this.state.KeywordId)
        }
    }

    handleonClickDelete(id) {
        var doDelete = () => {

            const confir = confirm("Bạn có chắc rằng muốn xóa ?");
            if (confir == 1) {
                this.props.onDeleteClick(id);
            }
        }
        if (this.props.DeletePermission) {
            this.checkPermission(this.props.DeletePermission).then(result => {
                if (result == true) {
                    doDelete();
                }
                else if (result == 'error') {
                    this.showMessage("Lỗi khi kiểm tra quyền")
                } else {
                    this.showMessage("Bạn không có quyền xóa!")
                }
            })
        } else {
            doDelete();
        }

    }


    handleDeleteClick() {
        var doDelete = () => {
            const idSelectColumnName = this.props.IDSelectColumnName;
            let listDeleteID = [];
            const idDeleteListObject = this.state.GridData[idSelectColumnName];
            idDeleteListObject.map((item, index) => {
                if (item.IsChecked) {
                    listDeleteID.push(item);
                }
            });
            if (listDeleteID.length == 0) {
                this.showMessage("Vui lòng chọn ít nhất một dòng cần xóa!");
                return;
            }
            const confir = confirm("Bạn có chắc rằng muốn xóa ?");
            if (confir == 1) {
                this.props.onDeleteClick(listDeleteID, this.state.ListPKColumnName);
                // this.setState({
                //     GridData: {},
                //     IsCheckAll: false
                // });
            }
        }
        if (this.props.DeletePermission) {
            this.checkPermission(this.props.DeletePermission).then(result => {
                if (result == true) {
                    doDelete();
                }
                else if (result == 'error') {
                    this.showMessage("Lỗi khi kiểm tra quyền")
                } else {
                    this.showMessage("Bạn không có quyền xóa!")
                }
            })
        } else {
            doDelete();
        }
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        let MLObject = {};
        const mLObjectDefinition = this.props.MLObjectDefinition;
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;
            if (controlName.length > 0) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName] });
            }
        });
        this.setState({
            GridData: {}
        });
        this.props.onSubmit(this.state.FormData, MLObject);
    }

    clearData() {
        this.setState({ GridData: {}, IsCheckAll: false });
    }

    getPageCount(dataRows) {
        if (dataRows == null)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataRows.TotaLRows / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    getDisplayData(dataSource) {
        if (!this.props.IsAutoPaging)
            return dataSource;
        let resultData = [];
        if (dataSource == null)
            return resultData;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage;
        let endRowIndex = startRowIndex + rowsPerPage;
        if (endRowIndex > dataSource.length)
            endRowIndex = dataSource.length;
        for (let i = startRowIndex; i < endRowIndex; i++) {
            resultData.push(dataSource[i]);
        }
        return resultData;
    }

    getDisplayDataPageNumber(dataSource, intPageNumber) {
        if (!this.props.IsAutoPaging)
            return dataSource;
        let resultData = [];
        if (dataSource == null)
            return resultData;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let startRowIndex = (intPageNumber - 1) * rowsPerPage;
        let endRowIndex = startRowIndex + rowsPerPage;
        if (endRowIndex > dataSource.length)
            endRowIndex = dataSource.length;
        for (let i = startRowIndex; i < endRowIndex; i++) {
            resultData.push(dataSource[i]);
        }
        return resultData;
    }

    getCheckList(dataSource) {
        const idSelectColumnName = this.props.IDSelectColumnName;
        const pkColumnName = this.state.ListPKColumnName;
        let checkList = [];
        dataSource.map((rowItem, rowIndex) => {
            const value = pkColumnName.map((obj, index) => {
                return { key: obj.key, value: rowItem[obj.key] };
            })
            const elementobject = { pkColumnName: value, IsChecked: false };
            checkList = Object.assign([], checkList, { [rowIndex]: elementobject });
        });
        return { [idSelectColumnName]: checkList };
    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
        });
    }

    handleCloseModel() {
        this.props.hideModal();
    }

    handleOneInsertClick() {
        const idSelectColumnName = this.props.IDSelectColumnName;
        let listSelectID = [];
        let listMLObject = [];
        const idSelectListObject = this.state.GridData[idSelectColumnName];
        idSelectListObject.map((item, index) => {
            if (item.IsChecked) {
                listSelectID.push(item);
            }
        });
        const lstPKColumnName = this.state.ListPKColumnName;
        listSelectID.map((row, index) => {
            let MLObject = {};
            lstPKColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            listMLObject.push(MLObject);
        });
        this.props.onSubmitItem(listMLObject);
        this.handleCloseModel();
    }

    handleMultipleInsertClick() {
        const idSelectColumnName = this.props.IDSelectColumnName;
        let listSelectID = [];
        let listMLObject = [];
        const idSelectListObject = this.state.GridData[idSelectColumnName];
        idSelectListObject.map((item, index) => {
            if (item.IsChecked) {
                listSelectID.push(item);
            }
        });
        const lstPKColumnName = this.state.ListPKColumnName;
        listSelectID.map((row, index) => {
            let MLObject = {};
            lstPKColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            listMLObject.push(MLObject);
        });
        this.props.onSubmitItem(listMLObject);
    }
    handleUserCoordinator() {
        const { widthPercent } = this.state;
        if (this.state.GridDataShip.length > 0) {
            this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderLst", this.state.GridDataShip).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({ GridDataShip: apiResult.ResultObject });
                    this.props.showModal(MODAL_TYPE_VIEW, {
                        title: 'Điều phối nhân viên ',
                        isShowOverlay: false,
                        content: {
                            text: <ListShipCoordinator
                                ShipmentOrderID={0}
                                InfoCoordinator={this.state.GridDataShip}
                                IsUserCoordinator={true}
                                IsCoordinator={true}
                                IsCancelDelivery={true}
                                onChangeValue={this.handleShipmentOrder.bind(this)}
                            />
                        },
                        maxWidth: 850 + 'px'
                    });
                }
                else {
                    this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!")
                }
            });
        }
        else {
            this.showMessage("Vui lòng chọn vận đơn để gán nhân viên giao!")
        }
    }

    handleSelected() {
        if (this.state.GridDataShip.length > 0) {
            this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/UpdateSelected", this.state.GridDataShip).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.setState({ GridDataShip: [] });
                }

            });
        }
        else {
            this.showMessage("Vui lòng chọn vận đơn để ghi nhớ!")
        }
    }

    handleSelectedView() {

        if (this.props.onChangeView != null)
            this.props.onChangeView();
    }

    handleShipmentOrder(apiResult) {
        this.addNotification(apiResult.Message, apiResult.IsError);
        if (!apiResult.IsError) {
            this.props.hideModal();
            this.setState({ GridDataShip: [] });
            if (this.props.onChangePageLoad != null)
                this.props.onChangePageLoad();
        }
    }

    handleCheckShip(e) {
        const strShipmentOrdervalue = e.target.value;
        const name = e.target.name;
        const objShipmentOrder = this.state.DataSource.find(n => n[name] == strShipmentOrdervalue)
        let objShip = {
            ShipmentOrderID: objShipmentOrder.ShipmentOrderID,
            ShipmentOrderTypeID: objShipmentOrder.ShipmentOrderTypeID,
            CarrierPartnerID: objShipmentOrder.CarrierPartnerID,
            CarrierTypeID: objShipmentOrder.CarrierTypeID,
            DeliverUserList: [],
            CurrentShipmentOrderStepID: objShipmentOrder.CurrentShipmentOrderStepID
        };
        if (e.target.checked) {
            this.state.GridDataShip.push(objShip);
        }
        else {
            this.state.GridDataShip.splice(this.state.GridDataShip.findIndex(n => n[name] == strShipmentOrdervalue), 1);
        }
        this.setState({ GridDataShip: this.state.GridDataShip });

    }
    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        //let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
    }

    _CheckTime(dates) {
        const date = new Date(Date.parse(dates));
        let currentDate = new Date();
        // var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        var timeDiff = date.getTime() - currentDate.getTime();
        var diffMinutes = parseInt(timeDiff / (3600 * 24));
        if (diffMinutes < 60) {
            return true;
        }
        else {
            return false
        }
    }

    _genCommentCarrierPartner(CarrierTypeID, CarrierTypeName) {

        if (CarrierTypeID < 1) {

            return (<li className="item vehicle"><span>Chưa chọn phương tiện</span></li>)

        } else if (CarrierTypeID == 1) {
            return (<li className="item vehicle">
                <i className="fa fa-motorcycle"></i>
                <span>{CarrierTypeName}</span>
            </li>
            );
        }
        else {
            return (<li className="item vehicle">
                <i className="fa fa-truck"></i>
                <span>{CarrierTypeName}</span>
            </li>
            );
        }

    }

    _genCommentCarrierPartnerOnMobileView(CarrierTypeID) {
        if (CarrierTypeID < 1) {
            return (<div className="vehicle"><span>Chưa chọn phương tiện</span></div>)
        } else if (CarrierTypeID == 1) {
            return (<div className="vehicle">
                <i className="fa fa-motorcycle"></i>
            </div>
            );
        }
        else {
            return (<div className="vehicle">
                <i className="fa fa-truck"></i>
            </div>
            );
        }

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
            dismiss: { duration: 4000 },
            dismissable: { click: true }
        });
    }

    handlePrintClickNew(e) {
        const ShipmentOrderID = e.target.attributes['data-id'].value;
        this.setState({
            printDataID: ShipmentOrderID
        });

        this.props.onPrint(ShipmentOrderID)
    }

    handlePrintClick() {

        // window.print();
        // return;

        var mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<title>Đơn vận chuyển</title>');
        mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('printNew').innerHTML);
        mywindow.document.write('</body></html>');
        // mywindow.document.getElementsByName('body').css( "-webkit-print-color-adjust", "exact !important");
        mywindow.print();
        mywindow.close();

        return true;

    }

    copyToClipboard(e) {
        const PartnerSaleOrderID = e.target.attributes['data-id'].value;
        let temponaryInput = $('<input>').val(PartnerSaleOrderID).appendTo('body').select();
        document.execCommand("copy");
        temponaryInput.remove();
    }

    copyToClipboardShipmentOrder(e) {
        const ShipmentOrderID = e.target.attributes['data-id'].value;
        let temponaryInput = $('<input>').val(ShipmentOrderID).appendTo('body').select();
        document.execCommand("copy");
        temponaryInput.remove();
    }

    renderDataGrid() {
        const dataSource = this.state.DataSource;
        return (
            <React.Fragment>
                <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                    <table id="fixtable" className="jsgrid-table"  >
                        <thead className="jsgrid-header-row" >
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
                            {dataSource != null &&
                                dataSource.map((rowItem, rowIndex) => {

                                    let rowtrClass = "jsgrid-row unread";
                                    if (rowItem.SelectedUser != "" || rowItem.IsView == true) {
                                        rowtrClass = "jsgrid-row unread";
                                    }

                                    let rowUndelivery = "jsgrid-cell";
                                    if (this._CheckTime(rowItem.ExpectedDeliveryDate) == true && rowItem.CurrentShipmentOrderStepID < 105) {
                                        rowUndelivery = "jsgrid-cell action undelivery";
                                    }
                                    else {
                                        if (rowItem.CoordinatorUser == "") {
                                            rowUndelivery = "jsgrid-cell action Uncoordinated";
                                        }
                                        else {
                                            rowUndelivery = "jsgrid-cell action waitingDelivery";
                                        }
                                    }
                                    // console.log("check",rowItem.ShipmentOrderID,this.state.GridDataShip,this.state.GridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID))
                                    return (<tr key={rowIndex} className={rowtrClass}>
                                        <td className={rowUndelivery} style={{ width: '2%' }}>
                                            <ul>
                                                <li className="item ">
                                                    <div className="group-action">
                                                        <div className="checkbox item-action">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" name={"ShipmentOrderID"} onChange={this.handleCheckShip.bind(this)} value={rowItem.ShipmentOrderID} checked={this.state.GridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID)} />
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
                                                    <button className="btn" onClick={this.handlePrintClickNew.bind(this)}>
                                                        <i className="ti ti-printer" data-id={rowItem.ShipmentOrderID}></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </td>
                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                            <div className="group-info">
                                                <ul>
                                                    <li className="item times">
                                                        <i className="ti ti-timer"></i>
                                                        <span className="fw-600">{rowItem.ExpectedDeliveryDate != null ? this._genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                    </li>
                                                    <li className="item status">
                                                        <i className="fa fa-location-arrow"></i>
                                                        <span>{rowItem.ShipmentOrderStatusName}</span>
                                                    </li>
                                                    {
                                                        this._genCommentCarrierPartner(rowItem.CarrierTypeID, rowItem.CarrierTypeName)
                                                    }
                                                    <li className="item statusShipmentOder">
                                                        {(rowItem.IsOutputGoods == false && rowItem.IsHandoverGoods == false) ? <span className="badge badge-danger active">Chưa xuất </span> : <span className="badge badge-danger noactive">Chưa xuất </span>}
                                                        {(rowItem.IsOutputGoods == true && rowItem.IsHandoverGoods == false) ? <span className="badge badge-info active">Đã xuất </span> : <span className="badge badge-info noactive">Đã xuất </span>}
                                                        {rowItem.IsHandoverGoods == true ? <span className="badge badge-success active">NV đã nhận </span> : <span className="badge badge-success noactive">Đã nhận </span>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                            <ul>
                                                <li className="item info-customer">
                                                    <i className="fa fa-user"></i>
                                                    <div className="person-info">
                                                        <span className="name">{rowItem.ReceiverFullName}</span>
                                                        <span className="line">-</span>
                                                        <span className={rowItem.PhoneCount > 1 ? "phone  phonered" : "phone"}>({rowItem.ReceiverPhoneNumber})</span>
                                                        <span className="line">-</span>
                                                        <span className="partner-sale-Order">{rowItem.PartnerSaleOrderID}</span>
                                                        <button className="btn-copy-clipboard" data-id={rowItem.PartnerSaleOrderID} onClick={this.copyToClipboard.bind(this)}>
                                                        <i className="fa fa-copy" data-id={rowItem.PartnerSaleOrderID}></i>
                                                    </button>
                                                    </div>
                                                </li>
                                                <li className="item address-customer">
                                                    <span>{rowItem.ReceiverFullAddress}</span>
                                                </li>
                                                <li className="item store">
                                                    <span>  {rowItem.SenderFullName}</span>
                                                </li>
                                                <li className="item times">
                                                    <span className="group-times">
                                                        <span className="time-item">
                                                            <span className="txtCreatedOrderTime">Tạo: {formatMonthDate(rowItem.CreatedOrderTime)}</span>
                                                            <span className="txtCreatedOrderTime">Xuất: {formatMonthDate(rowItem.OutputGoodsDate)}</span>
                                                        </span>
                                                        <span className="time-item">
                                                            <span className="intervale">
                                                                <i className="fa fa-paper-plane-o"></i>
                                                                <span className="txtintervale">{rowItem.EstimateDeliveryDistance + "Km/" + rowItem.ActualDeliveryDistance.toFixed(2) + "Km"}</span>
                                                            </span>
                                                            <span className="intervale">
                                                                <i className="ti ti-timer"></i>
                                                                <span className="txtintervale">{rowItem.EstimateDeliveryLong + "'"}</span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </td>
                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                            <ul>
                                                <li className="item">
                                                    <Link
                                                        className="linktext blank"
                                                        target="_blank"
                                                        to={{ pathname: "/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID }}>
                                                        {rowItem.ShipmentOrderID}</Link>
                                                    <button className="btn-copy-clipboard" data-id={rowItem.ShipmentOrderID} onClick={this.copyToClipboardShipmentOrder.bind(this)}>
                                                        <i className="fa fa-copy" data-id={rowItem.ShipmentOrderID}></i>
                                                    </button>
                                                </li>
                                                <li className="item">
                                                    <span>{rowItem.ShipmentOrderTypeName}</span>
                                                </li>
                                                {rowItem.CoordinatorUser != "" ?
                                                    (
                                                        <React.Fragment>
                                                            <li className="item user-coordinator">
                                                                <span className="coordinatorUser">ĐP: {rowItem.CoordinatorUser + "-" + rowItem.CoordinatorUserName}</span>
                                                            </li>
                                                            {rowItem.DeliverUserFullNameList != "" ?
                                                                (<li className="item user-delivery">
                                                                    <span>NV: {ReactHtmlParser(rowItem.DeliverUserFullNameList)}</span>
                                                                </li>) : ""
                                                            }

                                                            <li className="item address-receiver">
                                                                <span className="receiverred">{rowItem.CoordinatorNote != "" ? "Ghi chú: " + rowItem.CoordinatorNote : ""}</span>
                                                            </li>
                                                        </React.Fragment>
                                                    ) : (<li className="item note">
                                                        <span >{rowItem.CoordinatorNote != "" ? "Ghi chú: " + rowItem.CoordinatorNote : ""}</span>
                                                    </li>)
                                                }
                                            </ul>
                                        </td>
                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                            <ul>
                                                <li className={rowItem.IsInputReturn == true ? "item lstProducts lblReturns" : "item lstProducts"}>
                                                    <span >{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(/;/g, '<br/>'))}</span>
                                                </li>
                                                <li className="item note">
                                                    <span>{rowItem.OrderNote != "" ? "Ghi chú: " + rowItem.OrderNote : ""}</span>
                                                </li>
                                            </ul>
                                        </td>
                                        <td className="jsgrid-cell group-price ssss" style={{ width: '8%' }}>
                                            <ul>
                                                <li className="item">
                                                    {rowItem.IsCancelDelivery == true ? <span className="badge badge-danger">Đã hủy</span> : ""}
                                                </li>
                                                <li className="item">
                                                    {rowItem.TotalCOD > 0 ? <span className="item pricecod">COD:{formatMoney(rowItem.TotalCOD, 0)}</span> : ""}
                                                </li>
                                                {rowItem.TotalSaleMaterialMoney > 0 ? <li className="item"> <span className="price-supplies">Vật tư:{formatMoney(rowItem.TotalSaleMaterialMoney, 0)}</span> </li> : ""}
                                                {rowItem.IsInputReturn == true ? <li className="item"> <span className="price-supplies">Nhập trả:{formatMoney(rowItem.TotalReturnPrice, 0)}</span> </li> : ""}
                                                {(rowItem.IsPaidIn == true || (rowItem.TotalSaleMaterialMoney + rowItem.TotalCOD - rowItem.TotalReturnPrice) == 0) ?
                                                    rowItem.CollectedTotalMoney == rowItem.TotalPaidInMoney ?
                                                        (
                                                            <li className="item">
                                                                <span className="total price-success">
                                                                    <span className="price-title ">Nợ: </span>
                                                                    <span className="price-debt">0đ</span>
                                                                </span>
                                                            </li>
                                                        ) :
                                                        (
                                                            <li className="item">
                                                                <span className="total">
                                                                    <span className="price-title">Nợ: </span>
                                                                    <span className="price-debt">-{rowItem.TotalUnPaidInMoney >= 0 ? formatMoney(rowItem.TotalUnPaidInMoney, 0) : 0}đ</span>
                                                                </span>
                                                            </li>
                                                        )
                                                    :
                                                    (
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
                                                                <span className="price-debt">-{(rowItem.TotalCOD - rowItem.TotalReturnPrice) <= 0 ? formatMoney(rowItem.TotalSaleMaterialMoney) : formatMoney(rowItem.TotalSaleMaterialMoney + rowItem.TotalCOD - rowItem.TotalReturnPrice, 0)}</span>
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment >
        );
    }

    renderDataGridSmallSize() {
        const { DataSource } = this.state;
        const pageCount = this.getPageCount(this.props.dataSource[0]);

        return (
            <div className="card card-shipment-order-mobile-view">
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="card-title">
                    <div className="total-orders">
                        Tổng đơn: {this.state.DataSource.length > 0 ? formatNumber(this.state.DataSource[0].TotaLRows) : ''}
                    </div>

                    <div className="input-group input-group-select">
                        <input type="text" onChange={this.handleonChange.bind(this)} onKeyPress={this.handleKeyPress} className="form-control" aria-label="Text input with dropdown button" placeholder="Từ khóa" />
                        <div className="input-group-append" onClick={this.handleSearchShip.bind(this)}>
                            <span className="input-group-text"><i className="ti-search"></i></span>
                        </div>
                    </div>
                </div>

                <table className="card-body">
                    <tbody>
                        {
                            DataSource != null && DataSource.map((rowItem, rowIndex) => {
                                const { ShipmentOrderID, PartnerSaleOrderID, ReceiverFullAddress, ShipItemNameList, OrderNote, TotalCOD, IsCancelDelivery, TotalSaleMaterialMoney, TotalReturnPrice, IsPaidIn, ReceiverFullName,
                                    ReceiverPhoneNumber, SelectedUser, IsInputReturn, PrimaryShipItemName, PhoneCount, IsOutputGoods, IsHandoverGoods, ExpectedDeliveryDate, CurrentShipmentOrderStepID, CoordinatorUser,
                                    ShipmentOrderStatusName, ShipmentOrderTypeName, CoordinatorUserName, DeliverUserFullNameList, CoordinatorNote, CollectedTotalMoney, TotalPaidInMoney, TotalUnPaidInMoney } = rowItem;

                                let rowtrClass = "un-reading-item";
                                if (SelectedUser != "") {
                                    rowtrClass = "un-reading-item reading-item";
                                }

                                let rowUndelivery = "btngroupleft";
                                if (this._CheckTime(ExpectedDeliveryDate) == true && CurrentShipmentOrderStepID < 105) {
                                    rowUndelivery = "btngroupleft undelivery";
                                }
                                else {
                                    if (CoordinatorUser == "") {
                                        rowUndelivery = "btngroupleft uncoordinated";
                                    }
                                    else {
                                        rowUndelivery = "btngroupleft waitingDelivery";
                                    }
                                }

                                return (<tr key={rowIndex} className={rowtrClass}>
                                    <td className={rowUndelivery}></td>
                                    <td className="data-row">
                                        <div className="group-shipment-order-status-name">
                                            <div>
                                                {rowItem.ShipmentOrderStatusName}
                                            </div>
                                            <div className="data-time">
                                                <span className="fw-600">{ExpectedDeliveryDate != null ? this._genCommentTime(ExpectedDeliveryDate) : ""}</span>
                                            </div>
                                        </div>

                                        <div className="group-shipment-order-and-vehicle">
                                            <div className="group-shipment-order">
                                                <Link className="shipment-order fw-600" target="_blank"
                                                    to={{ pathname: "/ShipmentOrder/Detail/" + ShipmentOrderID }}>
                                                    {ShipmentOrderID}
                                                </Link>
                                                <button className="btn-copy-clipboard" data-id={ShipmentOrderID} onClick={this.copyToClipboardShipmentOrder.bind(this)}>
                                                    <i className="fa fa-copy" data-id={ShipmentOrderID}></i>
                                                </button>
                                            </div>

                                            {
                                                this._genCommentCarrierPartnerOnMobileView(rowItem.CarrierTypeID)
                                            }
                                        </div>

                                        <div className="group-address">
                                            {/* <i className="fa fa-user"></i> */}
                                            <div className="person-info">
                                                <span className="name">
                                                    {ReceiverFullName}
                                                </span>
                                                <span className="line">-</span>
                                                <span className={PhoneCount > 1 ? "phone  phonered" : "phone"}>({ReceiverPhoneNumber.substr(0, 4)}****)</span>
                                                {PartnerSaleOrderID != "" ? <span className="line">-</span> : ""}
                                                <span className="phone partner-sale-Order fw-600">{PartnerSaleOrderID}</span>
                                                <button className="btn-copy-clipboard" data-id={PartnerSaleOrderID} onClick={this.copyToClipboard.bind(this)}>
                                                    <i className="fa fa-copy" data-id={PartnerSaleOrderID}></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="group-address">
                                            <div className={IsInputReturn == true ? "item address-repository-created lblReturns" : "item address-repository-created"}>
                                                <span>{ShipItemNameList == "" ? PrimaryShipItemName : ReactHtmlParser(ShipItemNameList.replace(/;/g, '<br/>'))}</span>
                                            </div>
                                        </div>

                                        <div className="address-receiver">
                                            <p className="receiver-full-address">{ReceiverFullAddress}</p>
                                            <p className="shipment-order-type-name">{ShipmentOrderTypeName}</p>
                                            {
                                                CoordinatorUser != "" ? <div className="receiverred">{CoordinatorNote != "" ? "Ghi chú: " + CoordinatorNote : ""}</div>
                                                    : <div className="receiverred">{CoordinatorNote != "" ? "Ghi chú: " + CoordinatorNote : ""}</div>
                                            }
                                        </div>

                                        <div className="price-debt">{OrderNote != "" && "Ghi chú: " + OrderNote}</div>

                                        <div className="group-price">
                                            <div>
                                                {IsCancelDelivery && <div className="badge badge-danger">Đã hủy</div>}
                                                {TotalCOD > 0 && <div className="pricecod">COD:{formatMoney(TotalCOD, 0)}</div>}
                                                {TotalSaleMaterialMoney > 0 && <div className="price-supplies">Vật tư:{formatMoney(TotalSaleMaterialMoney, 0)}</div>}
                                                {IsInputReturn && <div className="price-supplies">Nhập trả:{formatMoney(TotalReturnPrice, 0)}</div>}
                                                {(IsPaidIn == true || (TotalSaleMaterialMoney + TotalCOD - TotalReturnPrice) == 0) ?
                                                    CollectedTotalMoney == TotalPaidInMoney ?
                                                        (
                                                            <div className="price-success">
                                                                <span className="price-title ">Nợ: </span>
                                                                <span className="price-debt">0đ</span>
                                                            </div>
                                                        ) :
                                                        (
                                                            <div className="price-error">
                                                                <span className="price-title ">Nợ: </span>
                                                                <span className="price-debt">-{TotalUnPaidInMoney >= 0 ? formatMoney(TotalUnPaidInMoney, 0) : 0}đ</span>
                                                            </div>
                                                        )
                                                    :
                                                    (
                                                        <div className="price-error">
                                                            <span className="price-title">Nợ: </span>
                                                            <span className="price-debt">-{(TotalCOD - TotalReturnPrice) <= 0 ? formatMoney(TotalSaleMaterialMoney) : formatMoney(TotalSaleMaterialMoney + TotalCOD - TotalReturnPrice, 0)}</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                {(IsOutputGoods == false && IsHandoverGoods == false) ? <span className="badge badge-danger">Chưa xuất </span> : ""}
                                                {(IsOutputGoods == true && IsHandoverGoods == false) ? <span className="badge badge-info">Đã xuất </span> : ""}
                                                {IsHandoverGoods == true ? <span className="badge badge-success">NV đã nhận </span> : ""}
                                            </div>
                                        </div>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>

                <div>
                    {
                        this.props.IsAutoPaging &&
                        <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
                    }
                </div>
            </div >
        )
    }

    render() {


        const pageCount = this.getPageCount(this.props.dataSource[0]);
        const datagrid = this.renderDataGrid();
        let hasHeaderToolbar = true;
        if (this.props.isHideHeaderToolbar)
            hasHeaderToolbar = false;
        let HideHeaderToolbarGroupTextBox = false;
        if (this.props.isHideHeaderToolbarGroupTextBox)
            HideHeaderToolbarGroupTextBox = true;
        let MultipleCheck = false;
        if (this.props.isMultipleCheck)
            MultipleCheck = true;
        if (this.state.IsPermision == undefined) {
            return <p className="col-md-12">Đang kiểm tra quyền...</p>
        }
        if (this.state.IsPermision == false) {
            return <p className="col-md-12">Bạn không có quyền!</p>
        }
        if (this.state.IsPermision === 'error') {
            return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
        }
        let classCustom;
        if (this.props.classCustom != "") {
            classCustom = "col-lg-12 SearchForm"
        }
        else {
            classCustom = ""
        }

        let IsCompleteDeliverIed = []
        if (this.props.dataSource) {
            IsCompleteDeliverIed = this.props.dataSource.filter(n => n.IsCompleteDeliverIed == true);
        }

        return (
            <React.Fragment>
                <Media queries={{
                    small: "(max-width: 576px)",
                    large: "(min-width: 577px)"
                }}>
                    {
                        matches => (
                            <React.Fragment>
                                {matches.small && this.renderDataGridSmallSize()}
                                {matches.large && <div className={classCustom}>
                                    <div className="cardShipmentOrder-page">
                                        <ReactNotification ref={this.notificationDOMRef} />
                                        <div className="card-title">

                                            {hasHeaderToolbar &&
                                                <div className="flexbox">
                                                    <div className="btn-toolbar">
                                                        <div className="btn-group btn-group-sm">
                                                            <div className="group-left">
                                                                <button id="btnUserCoordinator" type="button" onClick={this.handleUserCoordinator.bind(this)} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                                    <i className="fa fa-plus"> Gán nhân viên giao hàng</i>
                                                                </button>
                                                                <div className="groupActionRemember ml-10">
                                                                    <button type="button" onClick={this.handleSelected.bind(this)} className="btn " title="" data-provide="tooltip" data-original-title="Ghi nhớ">
                                                                        <i className="fa fa-save"></i>
                                                                    </button>

                                                                    <button type="button" onClick={this.handleSelectedView.bind(this)} className="btn " title="" data-provide="tooltip" data-original-title="Thêm">
                                                                        <i className="fa fa-history"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="input-group input-group-select">
                                                                    <input type="text" onChange={this.handleonChange.bind(this)} onKeyPress={this.handleKeyPress} className="form-control" aria-label="Text input with dropdown button" placeholder="Từ khóa" />
                                                                    <div className="input-group-append" onClick={this.handleSearchShip.bind(this)}>
                                                                        <span className="input-group-text"><i className="ti-search"></i></span>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="group-count">
                                                                <ul>
                                                                    <li>
                                                                        <span className="count-name">Tổng đơn:</span>
                                                                        <span className="count-number">{this.state.DataSource.length > 0 ? formatNumber(this.state.DataSource[0].TotaLRows) : ''}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="card-body">
                                            <div className="jsgrid">
                                                {datagrid}

                                                {this.props.IsAutoPaging &&
                                                    <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </React.Fragment>
                        )
                    }
                </Media>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }


    }
}

const DataGridShipmentOder = connect(mapStateToProps, mapDispatchToProps)(DataGridShipmentOderCom);
export default DataGridShipmentOder;