import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { showModal } from '../../../../../actions/modal';
import { connect } from 'react-redux';
import { MessageModal } from "../../../Modal";
import InputGridCell from "./InputGridCell";
import { GetMLObjectData, GetMLObjectDataList } from "../../../../library/form/FormLib";
import { callGetCache } from "../../../../../actions/cacheAction";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../constants/systemVars.js";
import { ValidationField } from "../../../../library/validation.js";
import { MODAL_TYPE_CONFIRMATIONNEW, MODAL_TYPE_CONFICOMPONET } from '../../../../../constants/actionTypes';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'


class InputGridControlCom extends Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.renderInputGrid = this.renderInputGrid.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.handleInsertClickDelete = this.handleInsertClickDelete.bind(this);
        this.handleInsertClickDeleteNew = this.handleInsertClickDeleteNew.bind(this);

        //check isSystem
        let isSystem = false;
        if (this.props.isSystem) {
            isSystem = true;
        }

        //auto close popup
        let autoCloseModal = false;
        if (this.props.autoCloseModal) {
            autoCloseModal = true;
        }
        this.state = {
            GridData: {},
            IsCheckAll: false,
            lstobjDelete: [],

            PageNumber: 1,
            IsSystem: isSystem,
            AutoCloseModal: autoCloseModal
        };
    }

    componentDidMount() {
        //console.log('pkColumnName', this.props)
    }
    handleCloseMessage() {
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }



    //#region Delete

    handleClick = (event, id) => {
        let elementobject = { IsChecked: event };
        elementobject = Object.assign({}, this.state.lstobjDelete[id], elementobject);
        let lstobjdelete = this.state.lstobjDelete;
        lstobjdelete = Object.assign({}, lstobjdelete, { [id]: elementobject });
        const temp = this.checkInput(lstobjdelete);
        this.setState({ lstobjDelete: lstobjdelete, IsCheckAll: temp });
    };

    checkInput(formValidation) {
        for (const key in formValidation) {
            if (!formValidation[key].IsChecked) {
                return false;
            }
        }
        return true;
    }
    checkInput1(formValidation) {
        for (const key in formValidation) {
            if (formValidation[key].IsChecked) {
                return false;
            }
        }
        return true;
    }

    handleDeleteClick() {
        let lstobjdelete = this.state.lstobjDelete;
        const temp = this.checkInput1(lstobjdelete);
        if (temp == true) {
            this.showMessage("Vui lòng chọn ít nhất một dòng cần xóa!");
            return;
        }
        let confir = 1;
        if ((typeof this.props.isUseConfirmMessage === "undefined") ||
            (typeof this.props.isUseConfirmMessage !== "undefined" && this.props.isUseConfirmMessage == true)) {
            confir = confirm("Bạn có chắc rằng muốn xóa ?");
        }
        if (confir == 1) {

            let dataSource = this.props.dataSource;
            if (this.props.value != null) {
                dataSource = this.props.value;
            }
            let dataSourcenew = dataSource.filter((person, index) => {
                if (lstobjdelete[index].IsChecked == false) { return person; }
            });
            if (this.props.onValueChange != null) {

                const mLObjectDefinition = this.props.MLObjectDefinition;
                const MLObjectList = GetMLObjectDataList(mLObjectDefinition, dataSourcenew, dataSourcenew);
                this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype);
                const lstobjdelete = this.bindobjdelete1(false, dataSource);
                this.setState({ GridData: dataSourcenew, lstobjDelete: lstobjdelete, IsCheckAll: false });
            }
            if (this.props.onDeleteClick) {
                const aa = Object.assign([], lstobjdelete);
                this.props.onDeleteClick(aa.filter(n => n.IsChecked == true));
            }
        }

    }
    //#endregion Delete

    //#region onValueChange
    onValueChange(elementdata, index) {
        //	console.log("onValueChange  elementdata index", elementdata, index);
        const elementobject = Object.assign({}, this.state.GridData[elementdata.Name], { [index]: elementdata });
        //console.log("InputGridCom  elementobject ", elementobject);
        const gridData = Object.assign({}, this.state.GridData, { [elementdata.Name]: elementobject });
        //	console.log("InputGridCom  gridData ", gridData);
        let listvalidation = {};
        this.setState({
            GridData: gridData, IsCheckAll: false
        });

        if (typeof elementdata.validatonList != "undefined") {
            const validation = ValidationField(elementdata.validatonList, elementdata.Value, elementdata.cation)
            //console.log("validation ", validation);
            const validationObject = { IsValidatonError: validation.IsError, ValidationErrorMessage: validation.Message };
            let listvalidationrow = {};
            listvalidationrow = Object.assign({}, this.props.listvalidationError[index], { [elementdata.Name]: validationObject });
            listvalidation = Object.assign({}, this.props.listvalidationError, { [index]: listvalidationrow });
            //	console.log("validation ", listvalidation);
        }

        let dataSource = this.props.dataSource;
        if (this.props.value != null) {
            dataSource = this.props.value;
        }
        //	console.log("dataSource ", dataSource);
        if (this.props.onValueChange != null) {
            const mLObjectDefinition = this.props.MLObjectDefinition;
            const MLObjectList = GetMLObjectDataList(mLObjectDefinition, gridData, dataSource);
            //console.log("InputGridCom  onValueChange ", MLObjectList);
            //console.log("InputGridCom  mLObjectDefinition ", mLObjectDefinition);
            //	console.log("InputGridCom  onValueChange ", this.props.name, MLObjectList, this.props.controltype);
            this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, listvalidation);

        }
        //console.log("InputGrid onValueChange: ", gridData);

    }
    //#endregion onValueChange

    handleExportCSV() {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        if (this.props.DataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
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
                Message: "Xuất file thành công!"
            };
        }
        this.props.onExportFile(result);
    }

    handleInsertClick() {
        if (this.props.onInsertClick === undefined) {
            let listColumnNew = this.props.listColumn.filter((person, index) => {
                if (this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) { return person; }
            });

            this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
                title: 'Cập nhật ' + this.props.title,
                autoCloseModal: this.state.AutoCloseModal,
                onConfirm: (isConfirmed, formData) => {
                    let dataSource = this.props.value;
                    if (this.props.onValueChange != null) {
                        const result = dataSource.filter(n => n[this.props.IDSelectColumnName] == formData[this.props.IDSelectColumnName])
                        if (result.length == 0) {
                            dataSource.push(formData)
                        }
                        const mLObjectDefinition = this.props.MLObjectDefinition;
                        const MLObjectList = GetMLObjectDataList(mLObjectDefinition, dataSource, dataSource);
                        this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, undefined);
                    }
                },
                modalElementList: listColumnNew,
                modalElementOl: this.props.MLObjectDefinition
            });

        }
        else {
            this.props.onInsertClick();
        }
    }

    handleInsertClickEdit(index) {
        if (this.props.onInsertClick === undefined) {
            let listColumnNew = this.props.listColumn.filter((person, index) => {
                if ((this.props.listColumn[index].iputpop == true || this.props.listColumn[index].iputpop === undefined) && this.props.listColumn[index].forbiddenUpdate === undefined) { return person; }
            });

            let dataSourcenew = this.props.dataSource[index];
            if (this.props.value != null) {
                dataSourcenew = this.props.value[index];
            }
            this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
                title: 'Chỉnh sửa ' + this.props.title,
                autoCloseModal: this.state.AutoCloseModal,
                onConfirm: (isConfirmed, formData) => {
                    let dataSource = this.props.dataSource;
                    if (this.props.value != null) {
                        dataSource = this.props.value;
                    }
                    if (this.props.onValueChange != null) {
                        const formDatanew = Object.assign({}, dataSource, { [index]: formData });
                        const mLObjectDefinition = this.props.MLObjectDefinition;
                        const MLObjectList = GetMLObjectDataList(mLObjectDefinition, formDatanew, formDatanew);
                        this.props.onValueChange(this.props.name, MLObjectList, this.props.controltype, undefined);
                    }
                },
                modalElementList: listColumnNew,
                modalElementOl: this.props.MLObjectDefinition,
                dataSource: dataSourcenew
            });
        }
        else {
            this.props.onEditClick(index);
        }

    }

    handleInsertClickDeleteNew(index, item) {
        if (this.props.onClickDeleteNew === undefined) {
            let dataSource = this.props.dataSource;

            if (this.props.value != null) {
                dataSource = this.props.value;
            }
            let dataSourceValue = dataSource.filter(function (value, index1) { return index1 != index; });
            if (this.props.onValueChange != null) {
                this.props.onValueChange(this.props.name, dataSourceValue, this.props.controltype, undefined);
            }
        }
        else {
            this.props.onClickDeleteNew(index, item);
        }
    }

    handleInsertClickDelete(index) {
        if (this.props.onDeleteClick === undefined) {
            let dataSource = this.props.dataSource;

            if (this.props.value != null) {
                dataSource = this.props.value;
            }
            let dataSourceValue = dataSource.filter(function (value, index1) { return index1 != index; });
            if (this.props.onValueChange != null) {
                this.props.onValueChange(this.props.name, dataSourceValue, this.props.controltype, undefined);
            }
        }
        else {
            this.props.onDeleteClick(index)
        }

    }
    //#region get Page
    clearData() {
        this.setState({
            GridData: {}, IsCheckAll: false
        });
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

    handleImportFile() {
        const input = document.getElementById('buttonImportFileInputGrid');
        input.click();


        const schema = this.props.schemaData;

        input.addEventListener('change', () => {
            readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
                // errors.length === 0
                if (this.props.onImportFile != null)
                    this.props.onImportFile(rows, errors);
            }, function (error) {
                alert("File vừa chọn lỗi. Vui lòng chọn file khác.")
            })
        })
    }

    renderInputGrid() {
        const listColumn = this.props.listColumn;
        let listColumnNew = listColumn.filter((person, index) => {
            if (listColumn[index].hideInput == true || listColumn[index].hideInput === undefined) { return person; }
        });
        let dataSource = this.props.dataSource;
        if (this.props.value != null) {
            dataSource = this.props.value;
        }
        const idSelectColumnName = this.props.IDSelectColumnName;
        return (
            <table className="table table-sm table-striped table-bordered table-hover table-condensed" >
                <thead className="thead-light">
                    <tr className="jsgrid-header-row">
                        {
                            listColumnNew.map((elementItem, index) => {
                                let cellStyle = {
                                    width: elementItem.Width
                                };
                                let columHeader = elementItem.Caption;
                                return (
                                    <th key={elementItem.Name} className="jsgrid-header-cell" style={cellStyle}>{columHeader}</th>
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
                            return (<tr key={rowIndex}>
                                {
                                    listColumnNew.map((columnItem, index) => {
                                        const cellStyle = {
                                            width: columnItem.Width,
                                            verticalAlign: "middle"
                                        };
                                        let isChecked = false;

                                        if (columnItem.Type == "checkbox") {
                                            isChecked = rowItem[columnItem.DataSourceMember];
                                        }
                                        let validationErrorMessage = "";
                                        let ovjvalue = rowItem[columnItem.DataSourceMember];

                                        let objlink = rowItem[this.props.PKColumnName];
                                        let objID = rowItem[this.props.PKColumnName];
                                        const cellData = <InputGridCell type={columnItem.Type}
                                            idItem={objID}
                                            linkId={objlink}
                                            text={ovjvalue}
                                            value={ovjvalue}
                                            to={columnItem.Link}
                                            linkText={columnItem.LinkText}
                                            name={columnItem.Name}
                                            listoption={columnItem.listoption}
                                            IsAutoLoadItemFromCache={columnItem.IsAutoLoadItemFromCache}
                                            LoadItemCacheKeyID={columnItem.LoadItemCacheKeyID}
                                            ValueMember={columnItem.ValueMember}
                                            NameMember={columnItem.NameMember}
                                            onInsertClickEdit={this.handleInsertClickEdit}
                                            onValueChange={this.onValueChange}
                                            index={rowIndex}
                                            isChecked={isChecked}
                                            IsFilterData={columnItem.IsFilterData}
                                            KeyFilter={columnItem.KeyFilter}
                                            ValueFilter={rowItem[columnItem.KeyFilter]}
                                            onHandleEditClick={this.handleEditClick}
                                            onValueChangeALL={this.handleClick}
                                            onClickDelete={this.handleInsertClickDelete}
                                            onClickDeleteNew={this.handleInsertClickDeleteNew}
                                            validationErrorMessage={validationErrorMessage}
                                            label={columnItem.label}
                                            cation={columnItem.Caption}
                                            validatonList={columnItem.validatonList}
                                            isDisabled={this.props.isDisabled}
                                            isCategory={columnItem.isCategory}
                                            CategoryTypeID={rowItem[columnItem.rowCategoryType]}
                                            IsPermisionAdd={this.props.IsPermisionAdd}
                                            IsPermisionEdit={this.props.IsPermisionEdit}
                                            IsPermisionDelete={this.props.IsPermisionDelete}
                                            isSystem={this.state.IsSystem}
                                            Ispopup={this.props.Ispopup === undefined ? false : this.props.Ispopup}
                                            rowsItem={rowItem}
                                        />;
                                        return (
                                            <td key={columnItem.Name} style={cellStyle}  >{cellData}</td>
                                        );
                                    }
                                    )
                                }
                            </tr>);
                        }
                        )
                    }
                </tbody>
            </table >
        );
    }
    //#endregion get Page



    render() {
        const classNameTable = `table-responsive ${this.props.IsScrollBody !== undefined && this.props.IsScrollBody === true ? "tableScrollBody" : ""}`;

        let isShowButtonImport = false;
        if (this.props.isImportFile != undefined && this.props.isImportFile != false) {
            isShowButtonImport = true;
        }

        return (
            <div className="card">
                <div className="card-title">
                    <h4 className="title">{this.props.title}</h4>

                    <div className="btn-toolbar btn-toolbar-inputgirdcontroll">
                        <div className="btn-group btn-group-sm">

                            {(this.props.IsPermisionAdd == true || this.props.IsPermisionAdd == undefined) && this.state.IsSystem == false ?
                                (this.props.IsCustomAddLink == true || this.props.IsCustomAddLink != undefined ?
                                    (<Link
                                        to={{
                                            pathname: this.props.AddLink,
                                            state: {
                                                params: this.props.params
                                            }
                                        }}
                                    >
                                        <button type="button" className="btn btn-info btnEditCard1" title="" data-provide="tooltip" data-original-title="Thêm">
                                            <span className="fa fa-plus ff"> Thêm </span>
                                        </button>
                                    </Link>)
                                    : (
                                        <React.Fragment>
                                            {(this.props.isHiddenButtonAdd == undefined || this.props.isHiddenButtonAdd == false) &&
                                                <button type="button" className="btn btnEditCard btnEditCard2" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleInsertClick}>
                                                    <span className="fa fa-plus ff"> Thêm </span>
                                                </button>
                                            }


                                            {this.props.IsExportFile == true &&
                                                <button type="button" className="btn btn-export ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.handleExportCSV.bind(this)} >
                                                    <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                                </button>
                                            }
                                        </React.Fragment>
                                    )
                                )
                                : (
                                    <React.Fragment>
                                        <button type="button" className="btn btnEditCard btnEditCard3" disabled title="Bạn Không có quyền xử lý!" data-provide="tooltip" data-original-title="Thêm">
                                            <span className="fa fa-plus ff"> Thêm </span>
                                        </button>
                                        {
                                            this.props.IsExportFile == true &&
                                            <button type="button" className="btn btn-export ml-10" title="Bạn Không có quyền xử lý!" data-provide="tooltip" data-original-title="Xuất file excel" onClick={this.handleExportCSV.bind(this)} disabled>
                                                <span className="fa fa-file-excel-o"> Xuất file excel </span>
                                            </button>
                                        }


                                    </React.Fragment>

                                )

                            }

                            {
                                isShowButtonImport == true &&
                                <button type="button" className="btn btn-export  ml-10" onClick={this.handleImportFile.bind(this)} >
                                    <span className="fa fa-exchange"> Import File </span>
                                </button>
                            }

                        </div>
                    </div>

                </div>
                <div className="card-body">
                    <div className={classNameTable}>
                        {

                            this.renderInputGrid()
                        }
                    </div>
                </div>
                {
                    isShowButtonImport == true &&
                    < input type="file" id="buttonImportFileInputGrid" style={{ display: "none" }} ref={input => this.inputElement = input} />
                }
            </div>
        );
    }
}
//#region Map
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}
//#endregion End Map

const InputGridControl = connect(mapStateToProps, mapDispatchToProps)(InputGridControlCom);
export default InputGridControl;