import React, { Component } from "react";
import { connect } from 'react-redux';
import DataGrid from "../../../../common/components/DataGrid";

import {
    APIHostName,
    MLObjectMTReturnRequestDetailItem,
    InputMTReturnRequestDetailColumnList,
    GridMLObjectDefinition,
    GirdMTReturnRequestDetailColumnList
} from "../constants/index.js";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

class MTReturnRequestDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsSystem: false,
            MTReturnRequestDetailNew: this.props.dataSource
        }
    }

    componentDidMount() {
    }


    handleInsertItem(listMLObject) {
        if (this.props.onClickInsertItem)
            this.props.onClickInsertItem(listMLObject)
    }

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        const { MTReturnRequestDetailNew } = this.state;
        const isAllowDecimal = MTReturnRequestDetailNew[index].IsAllowDecimal;
        let item = elementdata.Name + '_' + index;

        console.log("1", elementdata, "2", index, "3", name, "4", gridFormValidation)

        // return;

        if (!isAllowDecimal) {
            if (elementdata.Value.toString().length > 1) {
                if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                    if (elementdata.Name == 'Quantity') {
                        let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                        if (!gridFormValidation[item].IsValidationError) {
                            if (elementdata.Value > Quantity) {
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                })
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                    }
                    else {
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                    })
                }
            }
            else {
                if (elementdata.Value.length > 0) {
                    if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                        if (parseInt(elementdata.Value) > 0) {
                            if (elementdata.Name == 'Quantity') {
                                let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                                if (!gridFormValidation[item].IsValidationError) {
                                    if (elementdata.Value > Quantity) {
                                        gridFormValidation[item].IsValidationError = true;
                                        gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                        this.setState({
                                            isError: true,
                                            IsCallAPIError: true,
                                        })
                                    }
                                    else {
                                        this.setState({
                                            isError: false,
                                            IsCallAPIError: false,
                                        })
                                    }
                                }
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                        else {
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                            })
                        }
                    }
                    else {
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                    })
                }
            }
        }
        else {
            if (elementdata.Value.toString().length > 1) {

                if (/^\d*\.?\d+$/.test(elementdata.Value)) {
                    if (elementdata.Name == 'Quantity') {
                        let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                        if (!gridFormValidation[item].IsValidationError) {
                            if (elementdata.Value > Quantity) {
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                })
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                    }
                    else {
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                    })
                }
            }
            else {
                if (elementdata.Value.length > 0) {
                    if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                        if (parseInt(elementdata.Value) > 0) {
                            if (elementdata.Name == 'Quantity') {
                                let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                                if (!gridFormValidation[item].IsValidationError) {
                                    if (elementdata.Value > Quantity) {
                                        gridFormValidation[item].IsValidationError = true;
                                        gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                        this.setState({
                                            isError: true,
                                            IsCallAPIError: true,
                                        })
                                    }
                                    else {
                                        this.setState({
                                            isError: false,
                                            IsCallAPIError: false,
                                        })
                                    }
                                }
                            }
                        }
                        else {
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                            })
                        }
                    }
                    else {
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                    })
                }

            }
        }
    }

    handleItemInsert(data) {

    }

    render() {
        const { IsSystem } = this.state;
        return (
            <React.Fragment>
                <InputGrid
                    name="lstMTReturnRequestDetail"
                    controltype="GridControl"
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    PKColumnName={this.props.PKColumnName}
                    isMultipleCheck={this.props.multipleCheck}
                    listColumn={InputMTReturnRequestDetailColumnList}
                    dataSource={this.state.MTReturnRequestDetailNew}
                    MLObjectDefinition={GridMLObjectDefinition}
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    colspan="12"
                    isHideHeaderToolbar={true}
                    isShowFooterToolbar={true}
                    onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                    onHandleSubmitGridNew={this.handleInsertItem.bind(this)}
                />
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const MTReturnRequestDetailElement = connect(mapStateToProps, mapDispatchToProps)(MTReturnRequestDetailElementCom);
export default MTReturnRequestDetailElement;