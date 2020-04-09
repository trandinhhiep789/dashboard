import React from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName, LoadAPIPath, UpdateAPIPath, AddProductLink, EditElementList, PKColumnProductName, IDSelectColumnProductName,
    DataGridColumnProductList, MLObjectDefinition, BackLink, EditPagePath, SearchElementListPro, SearchMLObjectDefinitionPro
} from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import InputGridCell from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import GridPage from "../../../../../common/components/DataGrid/GridPage";

class PieRequestProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this._getPieRequestProductList = this._getPieRequestProductList.bind(this);
        this.onAddLinkClick = this.onAddLinkClick.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoading: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            ReloadNumber: -1
        };
        if (this.props.PieRequestID)
            DataGridColumnProductList[DataGridColumnProductList.length - 1].Link = "/PierequestProduct/Generalinfo/" + (this.props.PieRequestID + '').trim() + "/";
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this._getPieRequestProductList();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ReloadNumber !== this.state.ReloadNumber) {
            this.setState({
                ReloadNumber: nextProps.ReloadNumber,
            });
            this._getPieRequestProductList();
        }
    }
    _getPieRequestProductList() {
        const id = this.props.PieRequestID;
        if (id == -1) return;

        let searchParam = [
            {
                SearchKey: 'v_PIEREQUESTID',
                SearchValue: id
            },
            {
                SearchKey: 'v_Keyword',
                SearchValue: ''
            }
        ]
        this.setState({
            IsLoading: true
        })
        this.props.callFetchAPI(APIHostName, "api/PieRequest_List/Search", searchParam).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSource: apiResult.ResultObject ? apiResult.ResultObject : [] });
            }
            this.setState({
                IsLoading: false
            })
        });
    }
    onAddLinkClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm thông tin sản phẩm',
            content: { text: <SearchProduct PieTypeID={this.props.PieTypeID} onAddProduct={this.onAddProduct.bind(this)}></SearchProduct> }
        });
    }
    onAddProduct(listDeleteID, Typeid, dataSource) {
        let postData = [];
        if (this.props.PieTypeID == 1) {
            postData.push({
                PieRequestID: this.props.PieRequestID.trim(),
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
                ProductshortName: dataSource.ProductshortName,
                ProductName: dataSource.ProductName,
                BrandID: parseInt(dataSource.BrandID),
                DefaultCategoryID: parseInt(dataSource.DefaultCategoryID),
                ProductTypeID: parseInt(dataSource.ProductTypeID)
            })
        }
        else {
            listDeleteID.map((item) => {
                if (this.state.DataSource.filter(a => a.ProductID.trim() === item.trim()).length == 0) {
                    postData.push({
                        PieRequestID: this.props.PieRequestID.trim(),
                        CreatedUser: this.props.AppInfo.LoginInfo.Username,
                        LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
                        ProductID: item.trim()
                    })
                }
            })
        }
        if (postData.length > 0) {
            this.props.callFetchAPI(APIHostName, 'api/PieRequest_List/InsertPieRequestList', postData).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if (apiResult.IsError == false) {
                    if (Typeid == 0) {
                        this.props.hideModal();
                    }
                    this._getPieRequestProductList();
                }
                else {
                    this.showMessage(apiResult.Message);
                }

            });
        }
        else {
            this.props.hideModal();
        }
    }
    onDeleteClick(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, "api/PieRequest_Product/Delete", listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this._getPieRequestProductList();
            this.showMessage(apiResult.Message);
        });
    }
    handleSubmit() {
        let MLObject = this.MObjectDefine;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        if (!this.state.IsLoading) {
            return (
                <div className='col-md-12'>
                    <DataGrid listColumn={DataGridColumnProductList}
                        dataSource={this.state.DataSource}
                        IsCustomAddLink={true}
                        onInsertClick={this.onAddLinkClick}
                        AddLink={AddProductLink + '/' + this.props.PieRequestID + '/-1'}
                        IDSelectColumnName={IDSelectColumnProductName}
                        PKColumnName={"PieRequestListID"}
                        onDeleteClick={this.onDeleteClick}
                        hasSearch={false}
                        onSearchEvent={this.handleSearchEvent}
                        RequirePermission=""
                        DeletePermission=""
                        IsAutoPaging={true}
                        IsAdd={this.props.IsAddProduct}
                        IsDelete={this.props.IsDeleteProduct}
                    />
                </div>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieRequestProduct);

class PieRequestAddProduct extends React.Component {
    constructor(props) {
        super(props);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleCloseModel = this._handleCloseModel.bind(this);
        this._handleAddProduct = this._handleAddProduct.bind(this);
        this.state = {

            DataSource: {}
        }
    }
    _handleInputChange(data, index) {
        let _data = {}
        _data[data.Name] = data.Value
        let newDataSource = Object.assign(this.state.DataSource, _data)
        this.setState({ DataSource: newDataSource });
    }
    _handleCloseModel() {
        this.props.hideModal();
    }
    _handleAddProduct() {
        this.props.onAddProduct(this.state.DataSource);
        this.props.hideModal();
    }
    render() {
        return (
            <div className="modal-body">
                <div className='form-group'>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <label className="col-form-label">Tên sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <label className="col-form-label">Tên rút gọn sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <label className="col-form-label">Loại sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <label className="col-form-label">Danh mục mặc định</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-4'>
                            <label className="col-form-label">Nhãn hiệu</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <footer className='card-footer text-right'>
                    <button onClick={this._handleAddProduct} className='btn btn-w-md btn-round btn-info'>Cập nhật</button>&nbsp;
                    <button onClick={this._handleCloseModel} className='btn btn-w-md btn-round btn-secondary'>Bỏ qua</button>
                </footer>
            </div>
        )
    }
}
PieRequestAddProduct = connect(mapStateToProps, mapDispatchToProps)(PieRequestAddProduct);

class SearchProduct extends React.Component {
    constructor(props) {
        super(props);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleCloseModel = this._handleCloseModel.bind(this);
        this._handleAddProduct = this._handleAddProduct.bind(this);
        this.onChangePageHandle = this.onChangePageHandle.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.checkAll = this.checkAll.bind(this);
        const gridData = {};
        this.state = {
            GridData: gridData,
            IsCheckAll: false,
            PageNumber: 1,
            DataSource: {},
            gridDataSource: [],
            Keyword: null
        }
        if (this.props.PieTypeID != 1) {
            this.callSearchData();
        }

    }

    componentDidMount() {
        if (this.props.PieTypeID != 1)
            this.callSearchData(this.state.Keyword);
    }
    onChangeInput(e) {
        let value = e.target.value;

        let { Keyword } = this.state;
        Keyword = value;
        this.setState({ Keyword: Keyword });
    }
    _handleInputChange(data, index) {
        console.log("_handleInputChange", this.state.DataSource, data, data.Name, data.Value, index);
        let _data = {}
        _data[data.Name] = data.Value
        let newDataSource = Object.assign(this.state.DataSource, _data)
        console.log("_handleInputChange", newDataSource);
        this.setState({ DataSource: newDataSource });
        console.log("_handleInputChange ProductTypeID", this.state.DataSource.ProductTypeID);
    }
    _handleCloseModel() {
        this.props.hideModal();
    }
    _handleAddProduct() {
        this.props.onAddProduct(this.state.DataSource);
        this.props.hideModal();
    }
    onChangePageHandle(pageNum) {
        this.setState({ PageNumber: pageNum });
    }
    getPageCount(dataSource) {

        if (dataSource == null)
            return 1;
        let rowsPerPage = 5;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    getDisplayData(dataSource) {
        let resultData = [];
        if (dataSource == null)
            return resultData;
        let rowsPerPage = 5;
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
    callSearchData(Keyword) {
        this.clearData();
        const searchData = [{ SearchKey: "@Keyword", SearchValue: Keyword }];
        this.props.callFetchAPI(APIHostName, "api/Product/Search", searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({ gridDataSource: apiResult.ResultObject })
            }
        }
        );
    }

    checkAll(e) {
        const isCheck = e.target.type == 'checkbox' ? e.target.checked : false;
        //const isCheck = e.target.checked;
        const dataSource = this.getDisplayData(this.state.gridDataSource);
        const idSelectColumnName = "chkSelect";
        const pkColumnName = "ProductID";
        let checkList = {};
        dataSource.map((rowItem, rowIndex) => {
            const elementobject = { Name: idSelectColumnName, Value: rowItem[pkColumnName], IsChecked: isCheck };
            checkList = Object.assign({}, checkList, { [rowIndex]: elementobject });
        }
        );
        this.setState({
            GridData: { [idSelectColumnName]: checkList }, IsCheckAll: isCheck
        });
        console.log("checkAll:", this.state.gridDataSource, dataSource, this.state.GridData, checkList, isCheck, this.state.IsCheckAll);
    }
    onChangeInputcheck(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;
        const inputname = e.target.name;
        const elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked };
        const index = e.target.id;
        console.log("onValueChange:", this.state.GridData, elementdata, index);
        const elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata });
        const gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject });
        this.setState({
            GridData: gridData, IsCheckAll: false
        });
        console.log("onValueChange:", this.state.GridData);
    }

    clearData() {
        this.setState({
            GridData: {}, IsCheckAll: false
        });
    }
    handleSearchSubmit() {
        this.callSearchData(this.state.Keyword);
    }
    handleProductSubmit(Typeid) {
        if (this.props.PieTypeID == 1) {
            this.props.onAddProduct([], Typeid, this.state.DataSource);
        }
        else {
            const idSelectColumnName = "chkSelect";
            let listDeleteID = [];
            const idDeleteListObject = this.state.GridData[idSelectColumnName];
            for (let item in idDeleteListObject) {
                const elementobject = idDeleteListObject[item];
                if (elementobject.IsChecked)
                    listDeleteID.push(elementobject.Value);
            }
            if (listDeleteID.length == 0) {
                this.showMessage("Vui lòng chọn ít nhất một dòng cần thêm!");
                return;
            }
            this.props.onAddProduct(listDeleteID, Typeid);
            if (Typeid != 0) {
                this.clearData();
            }
        }
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    render() {
        if (this.props.PieTypeID == 1) {
            return (
                <div className="modal-body">
                    <div className='form-row'>
                        <div className='form-group col-md-3' style={{ 'textAlign': 'left' }}>
                            <label className="col-form-label">Tên sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductName'
                                value={this.state.DataSource.ProductName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-3' style={{ 'textAlign': 'left' }}>
                            <label className="col-form-label">Tên rút gọn sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='textbox'
                                text=''
                                name='ProductshortName'
                                value={this.state.DataSource.ProductshortName}
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-3' style={{ 'textAlign': 'left' }}>
                            <label className="col-form-label">Loại sản phẩm</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='combobox'
                                text={this.state.DataSource.ProductTypeID}
                                value={this.state.DataSource.ProductTypeID}
                                name='ProductTypeID'
                                IsAutoLoadItemFromCache={true}
                                LoadItemCacheKeyID='PIMCACHE.PRODUCTTYPE'
                                ValueMember='ProductTypeID'
                                NameMember='ProductTypeName'
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-3' style={{ 'textAlign': 'left' }}>
                            <label className="col-form-label">Danh mục mặc định</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='combobox'
                                text={this.state.DataSource.DefaultCategoryID}
                                value={this.state.DataSource.DefaultCategoryID}
                                name='DefaultCategoryID'
                                IsAutoLoadItemFromCache={true}
                                LoadItemCacheKeyID='PIMCACHE.CATEGORY'
                                ValueMember='CategoryID'
                                NameMember='CategoryName'
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group col-md-3' style={{ 'textAlign': 'left' }}>
                            <label className="col-form-label">Nhãn hiệu</label>
                        </div>
                        <div className='form-group col-md-8'>
                            <InputGridCell type='combobox'
                                text={this.state.DataSource.BrandID}
                                value={this.state.DataSource.BrandID}
                                name='BrandID'
                                IsAutoLoadItemFromCache={true}
                                LoadItemCacheKeyID='PIMCACHE.BRAND'
                                ValueMember='BrandID'
                                NameMember='BrandName'
                                onValueChange={this._handleInputChange}
                            />
                        </div>
                    </div>
                    <footer className='card-footer text-right'>
                        <button className='btn btn-w-md btn-round btn-info' onClick={this.handleProductSubmit.bind(this, 0)} >Thêm</button>&nbsp;
                        <button className='btn btn-w-md btn-round btn-secondary' onClick={this._handleCloseModel}>Bỏ qua</button>
                    </footer>
                </div>
            )
        }
        else {
            const pageCount = this.getPageCount(this.state.gridDataSource);
            const dataSource = this.getDisplayData(this.state.gridDataSource);
            const idSelectColumnName = "chkSelect";
            return (
                <div className="modal-body">
                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="input-group">
                                    <input class="form-control form-control-sm" onChange={this.onChangeInput.bind(this)} type="text" placeholder="Từ khóa" value={this.state.Keyword} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="btnSearch">
                                    <button class="btn btn-primary" type="submit" onClick={this.handleSearchSubmit}> Tìm Kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellspacing="0">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell" style={{ width: '5%' }} >
                                        <input type="checkbox" className="form-control form-control-sm" onChange={this.checkAll.bind(this)} checked={this.state.IsCheckAll} />
                                    </th>
                                    <th className="jsgrid-header-cell" style={{ width: '20%' }} >Mã sản phẩm</th>
                                    <th className="jsgrid-header-cell" style={{ width: '65%' }} >Tên sản phẩm</th>
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
                                        const checkList = this.state.GridData[idSelectColumnName];
                                        //console.log("checkList :", checkList);
                                        if (checkList != null) {
                                            if (checkList[rowIndex] != null) {
                                                isChecked = checkList[rowIndex].IsChecked;
                                            }
                                        }
                                        return (<tr key={rowIndex}>
                                            <td><input type="checkbox" name={idSelectColumnName} id={rowIndex} value={rowItem.ProductID} checked={isChecked} onChange={this.onChangeInputcheck.bind(this)} className="form-control form-control-sm" /></td>
                                            <td style={{ 'textAlign': 'left' }}>{rowItem.ProductID}</td>
                                            <td style={{ 'textAlign': 'left' }}>{rowItem.ProductName}</td>
                                        </tr>);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='form-group'>
                        {dataSource.length > 0 ? <GridPage numPage={pageCount} currentPage={this.state.PageNumber} onChangePage={this.onChangePageHandle} /> : ""}
                    </div>
                    <footer className='card-footer text-right'>
                        <button className='btn btn-w-md btn-round btn-info' onClick={this.handleProductSubmit.bind(this, 0)} >Chọn</button>&nbsp;
                        <button className='btn btn-w-md btn-round btn-info' style={{ 'width': '20%' }} onClick={this.handleProductSubmit.bind(this, 1)} >Chọn & Tiếp tục</button>&nbsp;
                        <button className='btn btn-w-md btn-round btn-secondary' onClick={this._handleCloseModel}>Bỏ qua</button>
                    </footer>
                </div>
            )
        }
    }
}
SearchProduct = connect(mapStateToProps, mapDispatchToProps)(SearchProduct);