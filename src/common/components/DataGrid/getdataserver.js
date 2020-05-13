import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../Modal";
import { DEFAULT_ROW_PER_PAGE } from "../../../constants/systemVars.js";
import GridCell from "./GridCell";
import GridPage from "./GridPage";
import { connect } from 'react-redux';
import { callGetCache } from "../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { hideModal } from '../../../actions/modal';
import Media from "react-media";

class DataGridCom extends Component {
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
        this.checkAll = this.checkAll.bind(this);
        this.getCheckList = this.getCheckList.bind(this);
        const pkColumnName = this.props.PKColumnName.split(',');
        const listPKColumnName = pkColumnName.map(item => { return { key: item } });
        this.state = {
            GridData: {},
            DataSource: this.props.dataSource,
            IsCheckAll: false, PageNumber: this.props.PageNumber, ListPKColumnName: listPKColumnName
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
        this.setState({PageNumber: pageNum});
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

    renderDataGrid() {
        const listColumn = this.props.listColumn;
        const dataSource = this.state.DataSource;
        const pkColumnName = this.state.ListPKColumnName;
        const idSelectColumnName = this.props.IDSelectColumnName;
        const checkList = this.state.GridData[idSelectColumnName];
        return (
            <div className=" table-responsive">
                <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0" >
                    <thead className="thead-light">
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
                                        <th key={elementItem.Name} className="jsgrid-header-cell" style={cellStyle} >{columHeader}</th>
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
                                return (<tr key={rowIndex}>
                                    {
                                        listColumn.map((columnItem, index) => {
                                            const cellStyle = {
                                                width: columnItem.Width
                                            };
                                            const value = pkColumnName.map((obj, index) => {
                                                return { key: obj.key, value: rowItem[obj.key] };
                                            })
                                            const cellData = <GridCell type={columnItem.Type}
                                                text={rowItem[columnItem.DataSourceMember]}
                                                value={value}
                                                popupContent={rowItem[columnItem.PopupContent]}
                                                link={columnItem.Link}
                                                linkText={columnItem.LinkText}
                                                name={columnItem.Name}
                                                caption={columnItem.Caption}
                                                onValueChange={this.onValueChange}
                                                index={rowIndex}
                                                isChecked={isChecked}
                                                onInsertClickEdit={this.handleInsertClickEdit}
                                                pkColumnName={this.state.ListPKColumnName}
                                            />;
                                            return (
                                                <td key={columnItem.Name} style={cellStyle}  >{cellData}</td>
                                            );
                                        })
                                    }
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
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

        return (
            <div className="col-lg-12 SearchForm">
                <div className="card">
                    <div className="card-body">
                        {hasHeaderToolbar &&
                            <div className="flexbox mb-10 ">
                                {searchTextbox}
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        {(this.props.IsAdd == true || this.props.IsAdd == undefined) ?
                                            (!this.props.IsCustomAddLink == true ?
                                                (<Link to={this.props.AddLink}>
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
                                            : (
                                                <button type="button" className="btn btn-info" disabled title="Bạn Không có quyền xử lý!" data-provide="tooltip" data-original-title="Thêm">
                                                    <span className="fa fa-plus ff"> Thêm </span>
                                                </button>
                                            )
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
        }
    }
}

const DataGrid = connect(mapStateToProps, mapDispatchToProps)(DataGridCom);
export default DataGrid;