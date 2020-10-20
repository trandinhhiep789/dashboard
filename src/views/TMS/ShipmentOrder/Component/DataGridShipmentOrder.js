import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";
import GridCell from "../../../../common/components/DataGrid/GridCell";
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { connect } from 'react-redux';
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { formatMoney } from '../../../../utils/function';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import ListShipCoordinator from '../Component/ListShipCoordinator.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName
} from "../constants";

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

        this.checkAll = this.checkAll.bind(this);
        this.getCheckList = this.getCheckList.bind(this);
        const pkColumnName = this.props.PKColumnName.split(',');
        const listPKColumnName = pkColumnName.map(item => { return { key: item } });
        this.state = {
            GridData: {},
            DataSource: this.props.dataSource,
            IsCheckAll: false, PageNumber: this.props.PageNumber, ListPKColumnName: listPKColumnName,
            GridDataShip: []
        };
    }

    componentDidMount() {
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

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const gridData = this.getCheckList(nextProps.dataSource);
            this.setState({
                GridData: gridData,
                DataSource: nextProps.dataSource,
                PageNumber: nextProps.PageNumber
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
        if (e.key == "Enter") {
            const searchText = e.target.value;
            if (this.props.onSearchEvent != null) {
                this.props.onSearchEvent(searchText)
            }
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
        if (this.state.GridDataShip.length > 0) {

            //api/ShipmentOrder/GetShipmentOrderLst
            this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetShipmentOrderLst", this.state.GridDataShip).then(apiResult => {

                if (!apiResult.IsError) {
                    this.setState({ GridDataShip: apiResult.ResultObject });
                    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                        title: 'Điều phối nhân viên ',
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
                        maxWidth: '1000px'
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

    handleShipmentOrder() {
        if (this.props.onChangePageLoad != null)
            this.props.onChangePageLoad();

        this.setState({ GridDataShip: [] });
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
        // var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        // var diffDays = currentDate.getDate() - date.getDate();
        // var diffMinutes = parseInt((timeDiff / (3600 * 24)));

        // if (diffDays < 1 && diffDays > -1) {
        //     if (diffMinutes < 120) {
        //         return 'Cần giao gấp (' + timeDisplay + ')';
        //     }
        //     else {
        //         return 'Hôm nay ' + timeDisplay;
        //     }
        // } else if (diffDays == 1) {
        //     return 'Hôm qua ' + timeDisplay;
        // } else {
        //     let month = date.getMonth() + 1;
        //     return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
        // }
    }
    _genCommentCarrierPartner(CarrierTypeID, CarrierTypeName) {
        if (CarrierTypeID < 1) {

            return (<label className="item vehicle"><span>Chưa chọn phương tiện</span></label>)

        } else if (CarrierTypeID == 1) {
            return (<label className="item vehicle">
                <i className="fa fa-motorcycle"></i>
                <span>{CarrierTypeName}</span>
            </label>
            );
        }
        else {
            return (<label className="item vehicle">
                <i className="fa fa-truck"></i>
                <span>{CarrierTypeName}</span>
            </label>
            );
        }

    }
    renderDataGrid() {
        const dataSource = this.state.DataSource;
        return (
            <div className=" table-responsive">
                <table className="table table-sm table-striped table-bordered table-hover table-condensed datagirdshippingorder" cellSpacing="0" >
                    <thead className="thead-light">
                        <tr>
                            <th className="jsgrid-header-cell" style={{ width: 51 }} >Tác vụ</th>
                            <th className="jsgrid-header-cell" style={{ width: 180, minWidth: 180 }} >Thời gian giao</th>
                            <th className="jsgrid-header-cell" style={{ width: 250, minWidth: 250 }}>Địa chỉ</th>
                            <th className="jsgrid-header-cell" style={{ width: 250, minWidth: 250 }}>Mã/Loại yêu cầu vận chuyển</th>
                            <th className="jsgrid-header-cell" style={{ width: 180, minWidth: 180 }} >Tên sản phẩm/Ghi chú</th>
                            <th className="jsgrid-header-cell" style={{ width: 131, minWidth: 131 }} >COD/Vật tư/Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource != null &&
                            dataSource.map((rowItem, rowIndex) => {
                                let rowClass = "jsgrid-row";
                                if (index % 2 != 0) {
                                    rowClass = "jsgrid-alt-row";
                                }
                                let rowtrClass = "unReadingItem";
                                if (rowItem.IsView == true) {
                                    rowtrClass = "noReadingItem readingItem";
                                }
                                // console.log("check",rowItem.ShipmentOrderID,this.state.GridDataShip,this.state.GridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID))
                                return (<tr key={rowIndex} className={rowtrClass}>
                                    <td className="btngroupleft">
                                        <div className="group-action">
                                            <div className="checkbox item-action">
                                                <label>
                                                    <input type="checkbox" readOnly className="form-control form-control-sm" name={"ShipmentOrderID"} onChange={this.handleCheckShip.bind(this)} value={rowItem.ShipmentOrderID} checked={this.state.GridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID)} />
                                                    <span className="cr">
                                                        <i className="cr-icon fa fa-check"></i>
                                                    </span>
                                                </label>
                                            </div>
                                            {/* <a title="" className="nav-link hover-primary  item-action" title="Edit">
                                                <i className="ti-pencil"></i>
                                            </a>
                                            <a title="" className="table-action hover-danger item-action" title="Xóa">
                                                <i className="ti-trash"></i>
                                            </a> */}
                                        </div>

                                    </td>
                                    {/* <td>{rowItem.ExpectedDeliveryDate}</td> */}
                                    <td className="groupInfoAction">
                                        <div className="group-info-row">
                                            <label className="item time">
                                                <i className="ti ti-timer"></i>
                                                <span>{rowItem.ExpectedDeliveryDate != null ? this._genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                            </label>
                                            <label className="item status">
                                                <i className="fa fa-location-arrow"></i>
                                                <span>{rowItem.ShipmentOrderStatusName}</span>
                                            </label>
                                            <label className="item vehicle">
                                                {
                                                    this._genCommentCarrierPartner(rowItem.CarrierTypeID, rowItem.CarrierTypeName)
                                                }
                                            </label>
                                            <label className="item printing">
                                                <i className="ti ti-printer"></i>
                                                <span>In</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="group-address">
                                        <div className="group-info-row">
                                            <label className="item person">
                                                <i className="fa fa-user"></i>
                                                <span className="person-info">
                                                    <span className="name">
                                                        {rowItem.ReceiverFullName}
                                                    </span>
                                                    <span className="line">-</span>
                                                    <span className="phone">({rowItem.ReceiverPhoneNumber.substr(0, 4)}****)</span>
                                                    {rowItem.PartnerSaleOrderID != "" ? <span className="line">-</span> : ""}
                                                    <span className="phone">{rowItem.PartnerSaleOrderID}</span>
                                                </span>
                                            </label>
                                            <label className="item address-receiver">
                                                <span>{rowItem.ReceiverFullAddress}</span>
                                            </label>
                                            <label className="item address-repository-created">
                                                <span>
                                                    {rowItem.SenderFullName}
                                                </span>
                                            </label>
                                            <label className="item creacte-time">
                                                <span className="times group-times">

                                                    <span className="time-item">
                                                        <span className="txtCreatedOrderTime"><i className="ti ti-dashboard"></i> {formatDate(rowItem.CreatedOrderTime)}</span>
                                                    </span>
                                                    <span className="time-item">
                                                        <span className="intervale">
                                                            <i className="fa fa-paper-plane-o"></i>
                                                            <span className="txtintervale">{rowItem.EstimateDeliveryDistance + "Km"}</span>
                                                        </span>
                                                        <span className="intervale">
                                                            <i className="ti ti-timer"></i>
                                                            <span className="txtintervale">{rowItem.EstimateDeliveryLong + "'"}</span>
                                                        </span>
                                                    </span>

                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="group-infoShipmentOrder">
                                        <div className="group-info-row">
                                            <label className="item person">
                                                <span className="person-info" style={{ fontSize: 15 }}>
                                                    <Link target="_blank" to={"/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID}>{rowItem.ShipmentOrderID}</Link>
                                                </span>
                                            </label>
                                            <label className="item address-receiver">
                                                <span>{rowItem.ShipmentOrderTypeName}</span>
                                            </label>
                                            <label className="item address-receiver">
                                                <span>ĐP: <span className="coordinatorUser">{rowItem.CoordinatorUser != "" ? rowItem.CoordinatorUser + "-" + rowItem.CoordinatorUserName : ""}</span></span>
                                            </label>
                                            <label className="item address-receiver">
                                                <span>NV:{ReactHtmlParser(rowItem.DeliverUserFullNameList)}</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="group-address">
                                        <div className="group-info-row">
                                            <label className="item address-repository-created">
                                                <span className="coordinatorUser">{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(';', '<br/>'))}</span>
                                            </label>
                                            <label className="item address-receiver">
                                                <span>{rowItem.OrderNote != "" ? "Ghi chú: " + rowItem.OrderNote : ""}</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="group-price">
                                        <div className="group-row">
                                            <span className="item price3">
                                                {rowItem.IsCancelDelivery == true ? <span className="badge badge-danger">Đã hủy</span> : ""}
                                            </span>
                                            <span className="item pricecod"> {formatMoney(rowItem.TotalCOD, 0)}</span>
                                            <span className="item price-supplies">{formatMoney(rowItem.TotalSaleMaterialMoney, 0)}</span>
                                            {rowItem.IsCollectedMoney == true ?
                                                (
                                                    <span className="item price3 price-success">
                                                        <span className="price-title ">Đã thu: </span>
                                                        <span className="price-debt">{formatMoney(rowItem.CollectedTotalMoney, 0)}</span>
                                                    </span>
                                                ) :
                                                (
                                                    <span className="item price3">
                                                        <span className="price-title">Nợ: </span>
                                                        <span className="price-debt">-{formatMoney(rowItem.TotalSaleMaterialMoney + rowItem.TotalCOD, 0)}</span>
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {

        let searchTextbox = <div></div>;
        if (this.props.hasSearch) {
            searchTextbox = <div className="lookup">
                <input className="w-200px" type="text" name="txtKeyword" placeholder="Search" onKeyPress={this.handleKeyPress} />
            </div>;
        }
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
        console.log(this.props.dataSource)
        if (this.props.dataSource) {
            IsCompleteDeliverIed = this.props.dataSource.filter(n => n.IsCompleteDeliverIed == true);
        }

        return (
            <div className={classCustom}>
                <div className="card cardShipmentOrder">
                    <div className="card-title">
                        {(this.props.title != undefined || this.props.title != '') && <h4 className="title">{this.props.title}</h4>}

                        {hasHeaderToolbar &&
                            <div className="flexbox mb-10 ">
                                {searchTextbox}
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <button type="button" onClick={this.handleUserCoordinator.bind(this)} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                            <i className="fa fa-plus ff"></i> Gán nhân viên giao hàng
                                        </button>

                                        <label>Tổng đơn:{this.state.DataSource[0].TotaLRows}</label>
                                     
                                        {(this.props.IsAdd == true || this.props.IsAdd == undefined) ?
                                            (!this.props.IsCustomAddLink == true ?
                                                (<Link
                                                    to={{
                                                        pathname: this.props.AddLink,
                                                        state: {
                                                            params: this.props.params
                                                        }
                                                    }}
                                                >
                                                    <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff"> Thêm </span>
                                                    </button>
                                                </Link>)
                                                : (
                                                    <button type="button" onClick={this.handleInsertClick} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                        <span className="fa fa-plus ff"> Thêm </span>
                                                    </button>
                                                )
                                            )
                                            : ""
                                        }
                                        {
                                            (this.props.IsDelete == true || this.props.IsDelete == undefined) ?
                                                (<button type="button" className="btn btn-danger btn-delete ml-10" title="" data-provide="tooltip" data-original-title="Xóa" onClick={this.handleDeleteClick}>
                                                    <span className="fa fa-remove"> Xóa </span>
                                                </button>)
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="card-body">

                        {datagrid}

                        {this.props.IsAutoPaging &&
                            <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
                        }

                        {/* {this.props.RowFooter ? this.props.RowFooter(this.props.dataSource) : ""}
                        <Media query={{ minWidth: 768 }}>
                            {matches =>
                                matches
                                    ? (this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} maxPageShow={10} onChangePage={this.onChangePageHandle} />)
                                    : (this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} maxPageShow={5} onChangePage={this.onChangePageHandle} />)
                            }
                        </Media> */}

                        {HideHeaderToolbarGroupTextBox &&
                            <div className="flexbox mb-20 ">
                                <div></div>
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <button className="btn btn-w-md btn-round btn-info" onClick={this.handleOneInsertClick}>Chọn</button>
                                        {MultipleCheck &&
                                            <button className="btn btn-w-md btn-round btn-info ml-20" onClick={this.handleMultipleInsertClick}>Chọn & Tiếp tục</button>
                                        }
                                        <button className="btn btn-w-md btn-round btn-secondary  ml-20" onClick={this.handleCloseModel} >Bỏ qua</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
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