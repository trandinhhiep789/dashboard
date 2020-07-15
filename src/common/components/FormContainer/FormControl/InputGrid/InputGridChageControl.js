import React, { Component, PropTypes } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { connect } from 'react-redux';
import { MessageModal } from "../../../Modal";
import { GetMLObjectDataList } from "../../../../library/form/FormLib";
import { callGetCache } from "../../../../../actions/cacheAction";
import ElementInputModal from '../../FormElement/ElementInputModal';

class InputGridChageControlCom extends Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.renderInputGrid = this.renderInputGrid.bind(this);
        this.handleInsertClickDelete = this.handleInsertClickDelete.bind(this);
        const gridData = this.bindData();
        //check isSystem
        let isSystem = false;
        if (this.props.isSystem) {
            isSystem = true;
        }

        //auto close popup

        this.state = {
            GridData: gridData,
            FormValidation: this.props.FormValidation,
            IsSystem: isSystem,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.FormValidation) !== JSON.stringify(nextProps.FormValidation)) {
            this.setState({
                FormValidation: nextProps.FormValidation
            })
        }
    }

    bindData() {
        const listColumn = this.props.listColumn;
        //const dataSource = this.props.dataSource;
        let dataSource = this.props.dataSource;
        if (this.props.value != null)
            dataSource = this.props.value;

        let gridData = {};
        if (dataSource == null)
            return gridData;
        dataSource.map((rowItem, rowIndex) => {
            let elementobject = {};
            listColumn.map((columnItem, index) => {
                const name = columnItem.name;
                const value = rowItem[columnItem.dataSourcemember];
                const elementdata = { Name: name, Value: value, IsChecked: false };
                elementobject = Object.assign({}, elementobject, { [columnItem.name + '-' + rowIndex]: elementdata });
            }
            );
            gridData = Object.assign({}, gridData, { [rowIndex]: elementobject });
        });
        //	 console.log("bindData gridData: ", gridData);
        return gridData;
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
    onValueChange(rowname, rowvalue, rowIndex) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(rowname, rowvalue, rowIndex);
        }
    }
    onValueChangeComboUser(rowname, rowvalue, rowIndex, a, ab, filterrest) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(rowname, rowvalue == -1 ? [] : rowvalue, rowIndex);
        }
    }
    //#endregion onValueChange
    handleInsertClickDelete(e) {
        const value = e.currentTarget.dataset.id
        if (this.props.onDeleteClick != null) {
            this.props.onDeleteClick(this.props.name, value);
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
                                    width: elementItem.width
                                };
                                let columHeader = elementItem.caption;
                                return (
                                    <th key={elementItem.name + '-' + index} className="jsgrid-header-cell" style={cellStyle}>{columHeader}</th>
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
                                            width: columnItem.width
                                        };
                                        let isChecked = false;
                                        if (columnItem.type == "checkbox") {
                                            isChecked = rowItem[columnItem.dataSourcemember];
                                        }

                                        let cellData = "";
                                        switch (columnItem.type) {
                                            case "text":
                                                cellData = rowItem[columnItem.dataSourcemember];
                                                break;
                                            case "textBox":
                                                cellData = <ElementInputModal.ElementModalText
                                                    validationErrorMessage={""}
                                                    {...columnItem}
                                                />
                                                break;
                                            case "ComboBox":
                                                cellData = <ElementInputModal.ElementModalComboBox
                                                    validationErrorMessage={(this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex] != undefined ? this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex].ValidationErrorMessage : "")}
                                                    onValueChange={this.onValueChange}
                                                    {...columnItem}
                                                    rowIndex={rowIndex}
                                                    value={rowItem[columnItem.dataSourcemember]}
                                                />
                                                break;
                                            case "ComboUserBox":
                                                //   console.log("MultiUserComboBox",rowItem[columnItem.dataSourcemember])
                                                if (rowItem[columnItem.filterrest] != -1 && rowItem[columnItem.filterrest] != 0) {
                                                    cellData = <ElementInputModal.ElementModalComboBox
                                                        validationErrorMessage={(this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex] != undefined ? this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex].ValidationErrorMessage : "")}
                                                        onValueChange={this.onValueChangeComboUser.bind(this)}
                                                        {...columnItem}
                                                        rowIndex={rowIndex}
                                                        value={rowItem[columnItem.dataSourcemember]}
                                                        filterValue={rowItem[columnItem.filterrest]}
                                                    />
                                                }
                                                else {
                                                    // console.log("MultiUserComboBox",rowItem[columnItem.dataSourcemember])
                                                    cellData = <ElementInputModal.MultiUserComboBox
                                                        validationErrorMessage={(this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex] != undefined ? this.state.FormValidation[columnItem.dataSourcemember + "-" + rowIndex].ValidationErrorMessage : "")}
                                                        onValueChange={this.onValueChangeComboUser.bind(this)}
                                                        {...columnItem}
                                                        rowIndex={rowIndex}
                                                        listoption={rowItem[columnItem.dataSourcemember]}
                                                        value={rowItem[columnItem.dataSourcemember]}
                                                    />
                                                }

                                                break;
                                            case "edit":
                                                //console.log("GridData",this.state.GridData[rowIndex][columnItem.name + "-" + rowIndex].Value,columnItem.name + "-" + rowIndex );

                                                cellData = <a name="ShipmentOrderID" data-id={rowItem[columnItem.dataSourcemember]} onClick={this.handleInsertClickDelete.bind(this)} className="table-action hover-danger item-action" title="Xóa">
                                                    <i className="ti-trash"></i>
                                                </a>;
                                                break;
                                            default:
                                                break;
                                        }
                                        return (
                                            <td key={columnItem.name + "-" + rowIndex + '-' + index} style={cellStyle}  >{cellData}</td>
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

const InputGridChageControl = connect(mapStateToProps, mapDispatchToProps)(InputGridChageControlCom);
export default InputGridChageControl;