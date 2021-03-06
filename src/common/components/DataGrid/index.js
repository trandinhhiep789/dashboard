import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import readXlsxFile from 'read-excel-file'
import Media from "react-media";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactTooltip from 'react-tooltip';

import { MessageModal } from "../Modal";
import { DEFAULT_ROW_PER_PAGE } from "../../../constants/systemVars.js";
import GridCell from "./GridCell";
import GridPage from "./GridPage";
import GridPageServer from "./getdataserver";
import { callGetCache, callGetUserCache } from "../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { hideModal } from '../../../actions/modal';
import { formatMoney } from '../../../utils/function';
import PartnerPayaleTemplate from '../PrintTemplate/PartnerPayaleTemplate';

class DataGridCom extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handlePrintClick = this.handlePrintClick.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onChangePageHandle = this.onChangePageHandle.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.handleDetailClick = this.handleDetailClick.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleCloseModel = this.handleCloseModel.bind(this);
        this.handleMultipleInsertClick = this.handleMultipleInsertClick.bind(this);
        this.handleOneInsertClick = this.handleOneInsertClick.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.mediaRenderDataGrid = this.mediaRenderDataGrid.bind(this);
        this.onChangePageToServerHandle = this.onChangePageToServerHandle.bind(this)

        this.checkAll = this.checkAll.bind(this);
        this.getCheckList = this.getCheckList.bind(this);
        const pkColumnName = this.props.PKColumnName.split(',');
        const listPKColumnName = pkColumnName.map(item => { return { key: item } });
        this.state = {
            GridData: {},
            IsCheckAll: false,
            PageNumber: 1,
            ListPKColumnName: listPKColumnName,
            IsExportFile: true
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
        if (this.props.IsFixheaderTable) {
            jQuery(window).scroll(function () {
                if (jQuery(this).scrollTop() > 300) {
                    $("#fixtable").addClass("tofixtable")
                } else {
                    $("#fixtable").removeClass("tofixtable")
                }
            });
        }
        if (this.props.ExportPermission) {
            this.checkPermission(this.props.ExportPermission).then((result) => {
                this.setState({ IsExportFile: result });
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const gridData = this.getCheckList(nextProps.dataSource);
            // this.setState({ GridData: gridData, PageNumber: 1 });
            this.setState({
                GridData: gridData,
                PageNumber: this.props.isPaginationServer ? this.props.PageNumber : 1
            })
        }
    }

    handleCloseMessage() {

    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Th??ng b??o"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleInsertClickEdit(id, pkColumnName) {
        if (this.props.onInsertClickEdit != null)
            this.props.onInsertClickEdit(id, pkColumnName);
    }

    handleUpdateFirstClick(id, pkColumnName) {
        if (this.props.onUpdateFirstClick != null)
            this.props.onUpdateFirstClick(id, pkColumnName);
    }
    handleUpdateTwoClick(id, pkColumnName) {
        if (this.props.onUpdateTwoClick != null)
            this.props.onUpdateTwoClick(id, pkColumnName);
    }

    handleUpdateItemClick(id) {
        if (this.props.onUpdateItem != null)
            this.props.onUpdateItem(id)
    }

    handleHistoryItemClick(id) {
        if (this.props.onHistoryItem != null)
            this.props.onHistoryItem(id)
    }

    handleShowImageClick(id) {
        if (this.props.onShowImage != null)
            this.props.onShowImage(id)
    }

    handleDetailClick(id) {
        if (this.props.onDetailClick != null)
            this.props.onDetailClick(id);
    }
    handleDetailModalClick(item) {
        if (this.props.onDetailModalClick != null)
            this.props.onDetailModalClick(item);
    }

    handleShowModalClick(objdata, name, { ...lstProps }) {
        if (this.props.onShowModal != null)
            this.props.onShowModal(objdata, name, { ...lstProps });
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
        const temp = this.checkInputisAll(this.getDisplayDataPageNumber(this.props.dataSource, pageNum), this.state.GridData[this.props.IDSelectColumnName]);
        this.setState({ IsCheckAll: temp });
    }

    onChangePageToServerHandle(pageNum) {
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
            if (elementdata.Name.toString().includes("chkSelect")) {
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
            const temp = this.checkInputisAll(this.getDisplayData(this.props.dataSource), gridData[this.props.IDSelectColumnName]);
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

        if (this.props.checkedData) {
            this.props.checkedData(gridData);
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

    handlePrintClick() {
        // window.print();
        // return;
        var mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<title>' + this.props.TitlePrint + '</title>');
        mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('print').innerHTML);
        mywindow.document.write('</body></html>');
        // mywindow.document.getElementsByName('body').css( "-webkit-print-color-adjust", "exact !important");
        mywindow.print();
        mywindow.close();

        return true;

    }

    handleSelectItem() {
        const idSelectColumnName = this.props.IDSelectColumnName;
        let listID = [];
        const idDeleteListObject = this.state.GridData[idSelectColumnName];
        idDeleteListObject.map((item, index) => {
            if (item.IsChecked) {
                listID.push(item);
            }
        });
        if (listID.length == 0) {
            this.showMessage("Vui l??ng ch???n d??? li???u c???n c???p nh???t!");
            return;
        }
        this.props.onSeleteItem(listID, this.state.ListPKColumnName);
        this.setState({
            IsCheckAll: false
        });
    }

    handleUpdateListItem() {

        const idSelectColumnName = this.props.IDSelectColumnName;
        let listID = [];
        const idDeleteListObject = this.state.GridData[idSelectColumnName];
        idDeleteListObject.map((item, index) => {
            if (item.IsChecked) {
                listID.push(item);
            }
        });
        if (listID.length == 0) {
            this.showMessage("Vui l??ng ch???n ??t nh???t m???t d??ng c???n c???p nh???t!");
            return;
        }
        const confir = confirm("B???n c?? ch???c r???ng mu???n c???p nh???t?");
        if (confir == 1) {
            this.props.onUpdateListItem(listID, this.state.ListPKColumnName);
            this.setState({
                IsCheckAll: false
            });
        }

    }

    handleUpdateList() {

        const idSelectColumnName = this.props.IDSelectColumnName;
        let listID = [];
        const idDeleteListObject = this.state.GridData[idSelectColumnName];
        idDeleteListObject.map((item, index) => {
            if (item.IsChecked) {
                listID.push(item);
            }
        });
        if (listID.length == 0) {
            this.showMessage("Vui l??ng ch???n ??t nh???t m???t d??ng c???n c???p nh???t!");
            return;
        }
        const confir = confirm("B???n c?? ch???c r???ng mu???n c???p nh???t?");
        if (confir == 1) {
            this.props.onUpdateList(listID, this.state.ListPKColumnName);
            this.setState({
                IsCheckAll: false
            });
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
                this.showMessage("Vui l??ng ch???n ??t nh???t m???t d??ng c???n x??a!");
                return;
            }
            const confir = confirm("B???n c?? ch???c r???ng mu???n x??a ?");
            if (confir == 1) {
                this.props.onDeleteClick(listDeleteID, this.state.ListPKColumnName);
                this.setState({
                    //GridData: {},
                    IsCheckAll: false
                });
            }
        }
        if (this.props.DeletePermission) {
            this.checkPermission(this.props.DeletePermission).then(result => {
                if (result == true) {
                    doDelete();
                }
                else if (result == 'error') {
                    this.showMessage("L???i khi ki???m tra quy???n")
                } else {
                    this.showMessage("B???n kh??ng c?? quy???n x??a!")
                }
            })
        } else {
            doDelete();
        }
    }

    handleExportCSV() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;

        if (this.props.isCustomExportFile) {
            this.props.onExportFile()
        } else {
            if (this.props.DataExport.length == 0) {
                result = {
                    IsError: true,
                    Message: "D??? li???u trong b???ng kh??ng t???n t???i. Kh??ng th??? xu???t file!"
                };
            }
            else {

                const ws = XLSX.utils.json_to_sheet(this.props.DataExport);
                const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: fileType });


                FileSaver.saveAs(data, this.props.fileName + fileExtension);

                result = {
                    IsError: false,
                    Message: "Xu???t file th??nh c??ng!"
                };
            }
            this.props.onExportFile(result);
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

    getPageCountToServer(dataRows) {
        if (dataRows == null || dataRows.length == 0)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null && dataRows.length > 0)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataRows[0].TotaLRows / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    getPageCount(dataSource) {
        if (dataSource == null)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    getDisplayData(dataSource) {
        if (this.props.isPaginationServer) {
            return dataSource
        } else {
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

    renderDataGrid(listColumn) {
        // const { onMobileView, listColumnOnMobileView, listColumn } = this.props;
        const dataSource = this.getDisplayData(this.props.dataSource);
        const pkColumnName = this.state.ListPKColumnName;
        const idSelectColumnName = this.props.IDSelectColumnName;
        const checkList = this.state.GridData[idSelectColumnName];
        let isFixed;
        let widthTable;
        if (this.props.IsFixheaderTable == false || this.props.IsFixheaderTable == undefined) {
            isFixed = false
        }
        else {
            isFixed = true
            widthTable = $('#fixtable tbody').width();
        }

        return (
            <div className=" table-responsive">
                <table id={isFixed == true ? "fixtable" : ""} className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0">
                    <thead className="thead-light" style={isFixed == true ? { maxWidth: widthTable } : {}}>
                        <tr>
                            {
                                listColumn.map((elementItem, index) => {
                                    const cellStyle = {
                                        width: elementItem.Width
                                    };
                                    let columHeader = elementItem.Caption;
                                    if (elementItem.Type == "checkbox") {
                                        // columHeader = <input type="checkbox" className="form-control form-control-sm" onChange={this.checkAll} checked={this.state.IsCheckAll} />

                                        columHeader = <div className="checkbox">
                                            <label>
                                                <input type="checkbox" className="form-control form-control-sm" onChange={this.checkAll} checked={this.state.IsCheckAll} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    }
                                    return (
                                        <th key={elementItem.Name} className="jsgrid-header-cell " style={cellStyle}>{columHeader}</th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource != null &&
                            dataSource.map((rowItem, rowIndex) => {
                                let rowClass = "jsgrid-row";
                                if (index % 2 != 0) {
                                    rowClass = "jsgrid-alt-row";
                                }
                                let isChecked = false;
                                if (checkList != null) {
                                    let isMath = false;
                                    for (var i = 0; i < checkList.length; i++) {
                                        for (var j = 0; j < pkColumnName.length; j++) {
                                            if (rowItem[pkColumnName[j].key] != checkList[i].pkColumnName[j].value) {
                                                isMath = false;
                                                break;
                                            }
                                            else {
                                                isMath = true;
                                            }
                                        }
                                        if (isMath) {
                                            isChecked = checkList[i].IsChecked
                                            break;
                                        }
                                    }
                                }
                                return (
                                    <tr key={rowIndex}>
                                        {
                                            listColumn.map((columnItem, index) => {
                                                const cellStyle = {
                                                    width: columnItem.Width
                                                };
                                                const value = pkColumnName.map((obj, index) => {
                                                    return { key: obj.key, value: rowItem[obj.key] };
                                                })

                                                const { RelatedVoucherID } = rowItem;

                                                const cellData = <GridCell
                                                    buttonTitleFirst={columnItem.ButtonTitleFirst} // case "groupTwoAction, buttonStyle"
                                                    buttonTitleTwo={columnItem.ButtonTitleTwo} // case "groupTwoAction"
                                                    caption={columnItem.Caption}
                                                    disabledBtnFirst={rowItem[columnItem.keyDisabledBtnFirst] || columnItem.disabledBtnFirst} //case "groupTwoAction, buttonStyle"
                                                    disabledBtnTwo={rowItem[columnItem.keyDisabledBtnTwo] || columnItem.disabledBtnTwo} // case "groupTwoAction"
                                                    hyperLink={columnItem.Hyperlinks}
                                                    iconFirst={columnItem.IconFirst} // case "groupTwoAction, buttonStyle"
                                                    iconTwo={columnItem.IconTwo} // case "groupTwoAction"
                                                    index={rowIndex}
                                                    isChecked={isChecked}
                                                    link={columnItem.Link}
                                                    linkText={columnItem.LinkText}
                                                    linkTo={this.state.ListPKColumnName + index}
                                                    name={columnItem.Name}
                                                    onDetailtClick={this.handleDetailClick}
                                                    onDetailtModalClick={this.handleDetailModalClick.bind(this)}
                                                    onHistoryClick={this.handleHistoryItemClick.bind(this)}
                                                    onInsertClickEdit={this.handleInsertClickEdit}
                                                    onModalClick={this.handleShowModalClick.bind(this)}
                                                    onShowImageClick={this.handleShowImageClick.bind(this)}
                                                    onUpdateClick={this.handleUpdateItemClick.bind(this)}
                                                    onUpdateFirstClick={this.handleUpdateFirstClick.bind(this)}
                                                    onUpdateTwoClick={this.handleUpdateTwoClick.bind(this)}
                                                    onValueChange={this.onValueChange}
                                                    params={this.props.params}
                                                    pkColumnName={this.state.ListPKColumnName}
                                                    popupContent={rowItem[columnItem.PopupContent]}
                                                    rowItem={rowItem}
                                                    text={rowItem[columnItem.DataSourceMember]}
                                                    textHyperLink={RelatedVoucherID}
                                                    type={columnItem.Type}
                                                    value={value}
                                                />;
                                                return (
                                                    <td key={columnItem.Name} style={cellStyle}>{cellData}</td>
                                                );
                                            })
                                        }
                                    </tr>
                                );

                            })

                        }
                        {
                            this.props.totalCurrency == true &&

                            <tr className="totalCurrency">
                                <td colSpan={this.props.totalCurrencyColSpan - 1}>
                                    <div className="groupTotalCurrency">
                                        <span className="item txtTotal">T???ng</span>
                                    </div>
                                </td>
                                <td colSpan="1">
                                    <div className="groupTotalCurrency">
                                        <span className="item txttotalCurrency">{formatMoney(this.props.totalCurrencyNumber, 0)}</span>
                                    </div>
                                </td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        );
    }

    mediaRenderDataGrid() {
        const { isMobileView, listColumnOnMobileView, listColumn } = this.props;

        if (isMobileView) {
            return (
                <Media queries={{
                    small: "(max-width: 576px)",
                    medium: "(min-width: 577px)"
                }}>
                    {matches => (
                        <Fragment>
                            {matches.small && this.renderDataGrid(listColumnOnMobileView)}
                            {matches.medium && this.renderDataGrid(listColumn)}
                        </Fragment>
                    )}
                </Media>
            )
        } else {
            return this.renderDataGrid(listColumn);
        }
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

    handleExportFileTemplate() {
        if (this.props.isCustomExportFileTemplate) {
            this.props.onExportFileTemplate();
            return;
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;

        try {
            const ws = XLSX.utils.json_to_sheet(this.props.DataTemplateExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, this.props.fileNameTemplate + fileExtension);
            result = {
                IsError: false,
                Message: "Xu???t file th??nh c??ng!"
            };
        } catch (error) {
            result = {
                IsError: true,
                Message: "L???i xu???t file!"
            }
        } finally {
            this.props.onExportFileTemplate(result);
        }
    }

    handleImportFile() {
        if (this.props.isCustomImportFile) {
            this.props.onImportFile();
            return;
        }

        const input = document.getElementById('buttonImportFile');
        input.click();

        let count = 0;
        const schema = this.props.SchemaData;

        input.addEventListener('change', () => {
            readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
                // errors.length === 0
                if (count > 0) {
                    return;
                }
                if (this.props.onImportFile != null)
                    this.props.onImportFile(rows, errors);
                count++;
            }, function (error) {
                alert("File v???a ch???n l???i. Vui l??ng ch???n file kh??c.")
            });

            setTimeout(() => {
                input.value = '';
            }, 1000);

        })
    }

    render() {

        let searchTextbox = <div></div>;
        if (this.props.hasSearch) {
            searchTextbox = <div className="lookup">
                <input className="w-200px" type="text" name="txtKeyword" placeholder="Search" onKeyPress={this.handleKeyPress} />
            </div>;
        }
        let pageCount;
        if (this.props.isPaginationServer) {
            pageCount = this.getPageCountToServer(this.props.dataSource);
        }
        else {
            pageCount = this.getPageCount(this.props.dataSource);
        }

        const datagrid = this.mediaRenderDataGrid();
        let hasHeaderToolbar = true;
        if (this.props.isHideHeaderToolbar)
            hasHeaderToolbar = false;
        let HideHeaderToolbarGroupTextBox = false;
        if (this.props.isHideHeaderToolbarGroupTextBox)
            HideHeaderToolbarGroupTextBox = true;
        let MultipleCheck = false;
        if (this.props.isMultipleCheck)
            MultipleCheck = true;

        let isShowButtonAdd = true;
        if (this.props.IsShowButtonAdd != undefined && this.props.IsShowButtonAdd == false) {
            isShowButtonAdd = false;
        }
        let isShowButtonPrint = false;
        if (this.props.IsShowButtonPrint != undefined && this.props.IsShowButtonPrint != false) {
            isShowButtonPrint = true;
        }

        let isShowButtonImport = false;
        if (this.props.IsImportFile != undefined && this.props.IsImportFile != false) {
            isShowButtonImport = true;
        }

        let isShowButtonDelete = true;
        if (this.props.IsShowButtonDelete != undefined && this.props.IsShowButtonDelete == false) {
            isShowButtonDelete = false;
        }

        let isShowButtonExport = false;
        if (this.props.IsExportFile != undefined && this.props.IsExportFile == true) {
            isShowButtonExport = true;
        }

        if (this.state.IsPermision == undefined) {
            return <p className="col-md-12">??ang ki???m tra quy???n...</p>
        }
        if (this.state.IsPermision == false) {
            return <p className="col-md-12">B???n kh??ng c?? quy???n!</p>
        }
        if (this.state.IsPermision === 'error') {
            return <p className="col-md-12">L???i khi ki???m tra quy???n, vui l??ng th??? l???i</p>
        }


        return (

            <div className="col-lg-12 SearchForm">
                <div className="card">
                    {this.props.headingTitle ?
                        <div className="card-title">
                            <span className="title"><b>{this.props.headingTitle}</b></span>
                        </div>
                        : ""
                    }

                    <div className="card-body">
                        {hasHeaderToolbar &&
                            <div className="flexbox mb-10 ">
                                {searchTextbox}
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        {
                                            this.props.IsSelectItem == true ?
                                                <button type="button" className="btn btn-info mr-10" title="Ch???n" data-provide="tooltip" data-original-title="Ch???n" onClick={this.handleSelectItem.bind(this)}>
                                                    <span className={(this.props.IconSelectItem != "" && this.props.IconSelectItem != undefined) ? this.props.IconSelectItem : "ti-plus"} > {(this.props.TitleSelectItem != "" && this.props.TitleSelectItem != undefined) ? this.props.TitleSelectItem : "Ch???n"}  </span>
                                                </button>
                                                : ""
                                        }

                                        {
                                            //hi???n th??? n??t th??m
                                            isShowButtonAdd ?
                                                (
                                                    (this.props.IsAdd == true || this.props.IsAdd == undefined) ?
                                                        (!this.props.IsCustomAddLink == true ?
                                                            (<Link to={this.props.AddLink}>
                                                                <button type="button" className="btn btn-info" title="" data-provide="tooltip" data-original-title="Th??m">
                                                                    <span className="fa fa-plus ff"> {this.props.TitleButtonAdd != undefined ? this.props.TitleButtonAdd : "Th??m"} </span>
                                                                </button>
                                                            </Link>)
                                                            : (
                                                                <button type="button" onClick={this.handleInsertClick} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Th??m">
                                                                    <span className="fa fa-plus ff"> {this.props.TitleButtonAdd != undefined ? this.props.TitleButtonAdd : "Th??m"} </span>
                                                                </button>
                                                            )
                                                        )
                                                        : (
                                                            <button type="button" className="btn btn-info" disabled title="B???n Kh??ng c?? quy???n x??? l??!" data-provide="tooltip" data-original-title="Th??m">
                                                                <span className="fa fa-plus ff"> {this.props.TitleButtonAdd != undefined ? this.props.TitleButtonAdd : "Th??m"} </span>
                                                            </button>
                                                        )
                                                )
                                                : ""
                                        }
                                        {
                                            //hi???n th??? n??t x??a
                                            isShowButtonDelete ?
                                                (
                                                    (this.props.IsDelete == true || this.props.IsDelete == undefined) ?
                                                        (<button type="button" className="btn btn-danger btn-delete ml-10" title="" data-provide="tooltip" data-original-title="X??a" onClick={this.handleDeleteClick}>
                                                            <span className="fa fa-remove"> {this.props.TitleButtonDelete != undefined ? this.props.TitleButtonDelete : "X??a"} </span>
                                                        </button>)
                                                        : (<button type="button" className="btn btn-danger btn-delete ml-10" disabled title="B???n Kh??ng c?? quy???n x??? l??!" data-provide="tooltip" data-original-title="X??a" >
                                                            <span className="fa fa-remove"> {this.props.TitleButtonDelete != undefined ? this.props.TitleButtonDelete : "X??a"} </span>
                                                        </button>)
                                                )
                                                : ""
                                        }
                                        {

                                            isShowButtonExport &&
                                            (
                                                this.state.IsExportFile == true ?
                                                    <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xu???t file" onClick={this.handleExportCSV.bind(this)}>
                                                        <span className="fa fa-file-excel-o"> Xu???t file excel </span>
                                                    </button>
                                                    : <React.Fragment>
                                                        <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xu???t file" data-tip="B???n kh??ng c?? quy???n!">
                                                            <span className="fa fa-file-excel-o"> Xu???t file excel </span>
                                                        </button>
                                                        <ReactTooltip type="warning" />
                                                    </React.Fragment>
                                            )
                                        }
                                        {
                                            //hi???n th??? n??t in 
                                            isShowButtonPrint ?
                                                (
                                                    (this.props.IsPrint == true) ?
                                                        (
                                                            <button type="button" className="btn btn-Print ml-10" title="" data-provide="tooltip" data-original-title="In" onClick={this.handlePrintClick}>
                                                                <span className="ti ti-printer"> In </span>
                                                            </button>

                                                        )
                                                        : (<button type="button" className="btn btn-Print ml-10" disabled title="B???n Kh??ng c?? quy???n x??? l??!" data-provide="tooltip" data-original-title="In" >
                                                            <span className="ti ti-printer"> In </span>
                                                        </button>)
                                                )
                                                : ""
                                        }
                                        {/* nut import file  */}
                                        {
                                            this.props.isExportFileTemplate && <button type="button" className="btn btn-export ml-10" onClick={this.handleExportFileTemplate.bind(this)}>
                                                <span className="fa fa-exchange">Xu???t file m???u</span>
                                            </button>
                                        }
                                        {
                                            isShowButtonImport == true &&
                                            <button type="button" className="btn btn-export  ml-10" onClick={this.handleImportFile} >
                                                <span className="fa fa-exchange"> Import File </span>
                                            </button>
                                        }

                                        {

                                            this.props.IsUpdateListItem == true ?
                                                <button type="button" className="btn btn-info ml-10" title="C???p nh???t" data-provide="tooltip" data-original-title="C???p nh???t" onClick={this.handleUpdateListItem.bind(this)}>
                                                    <span className={(this.props.IconUpdateListItem != "" && this.props.IconUpdateListItem != undefined) ? this.props.IconUpdateListItem : "ti-lock"} > {(this.props.TitleUpdateListItem != "" && this.props.TitleUpdateListItem != undefined) ? this.props.TitleUpdateListItem : "C???p nh???t"}  </span>
                                                </button>
                                                : ""
                                        }

                                        {

                                            this.props.IsUpdateList == true ?
                                                <button type="button" className="btn btn-info ml-10" title="C???p nh???t" data-provide="tooltip" data-original-title="C???p nh???t" onClick={this.handleUpdateList.bind(this)}>
                                                    <span className={(this.props.IconUpdateList != "" && this.props.IconUpdateList != undefined) ? this.props.IconUpdateList : "ti-plus"} > {(this.props.TitleUpdateList != "" && this.props.TitleUpdateList != undefined) ? this.props.TitleUpdateList : "C???p nh???t"}  </span>
                                                </button>
                                                : ""
                                        }

                                    </div>
                                </div>
                            </div>
                        }
                        {datagrid}


                        {/* {this.props.IsAutoPaging &&
                            <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} />
                        } */}

                        {this.props.RowFooter ? this.props.RowFooter(this.props.dataSource) : ""}

                        {
                            this.props.isPaginationServer == true ?
                                (this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageToServerHandle} />)
                                :
                                <Media query={{ minWidth: 768 }}>
                                    {matches =>
                                        matches
                                            ? (this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} maxPageShow={10} onChangePage={this.onChangePageHandle} />)
                                            : (this.props.IsAutoPaging && <GridPage numPage={pageCount} currentPage={this.state.PageNumber} maxPageShow={5} onChangePage={this.onChangePageHandle} />)
                                    }
                                </Media>
                        }



                        {HideHeaderToolbarGroupTextBox &&
                            <div className="flexbox mb-20 ">
                                <div></div>
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <button className="btn btn-w-md btn-round btn-info" onClick={this.handleOneInsertClick}>Ch???n</button>
                                        {/* {MultipleCheck &&
                                            <button className="btn btn-w-md btn-round btn-info ml-20" onClick={this.handleMultipleInsertClick}>Ch???n & Ti???p t???c</button>
                                        } */}
                                        <button className="btn btn-w-md btn-round btn-secondary  ml-20" onClick={this.handleCloseModel} >B??? qua</button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                {
                    this.props.IsPrint == true &&
                    <div style={{ display: 'none' }}>
                        <PartnerPayaleTemplate ref={el => (this.componentRef = el)} data={this.props.dataPrint} />
                    </div>
                }
                {
                    isShowButtonImport == true &&
                    < input type="file" id="buttonImportFile" style={{ display: "none" }} ref={input => this.inputElement = input} />
                }

            </div>
        );
    }
}

DataGridCom.defaultProps = {
    isCustomExportFile: false,
    isCustomExportFileTemplate: false,
    isCustomImportFile: false,
    isPaginationServer: false
};

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
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

const DataGrid = connect(mapStateToProps, mapDispatchToProps)(DataGridCom);
export default withRouter(DataGrid);