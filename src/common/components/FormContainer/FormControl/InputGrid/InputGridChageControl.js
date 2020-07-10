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


class InputGridControlCom extends Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.renderInputGrid = this.renderInputGrid.bind(this);
        this.handleInsertClickDelete = this.handleInsertClickDelete.bind(this);

        //check isSystem
        let isSystem = false;
        if (this.props.isSystem) {
            isSystem = true;
        }

        //auto close popup
   
        this.state = {
            GridData: {},
            IsSystem: isSystem,
          
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
   
    renderInputGrid() {
        const listColumn = this.props.listColumn;
        let listColumnNew = listColumn.filter((person, index) => {
            if (listColumn[index].hideInput == true || listColumn[index].hideInput === undefined) { return person; }
        });
        let dataSource = this.props.dataSource;
        if (this.props.value != null) {
            dataSource = this.props.value;
        }
 
        return (
            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
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
            </table>
        );
    }
    //#endregion get Page

    render() {
        return (
            <div className="card">
                <div className="card-title">
                    <h4 className="title">{this.props.title}</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            this.renderInputGrid()
                        }
                    </div>
                </div>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}
//#endregion End Map

const InputGridControl = connect(mapStateToProps, mapDispatchToProps)(InputGridControlCom);
export default InputGridControl;