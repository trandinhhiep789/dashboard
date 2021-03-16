import React, { Component } from "react";
import { connect } from 'react-redux';
import DataGrid from "../../../../common/components/DataGrid";
import { ModalManager } from "react-dynamic-modal";
import {
    APIHostName,
    MLObjectMTReturnRequestDetailItem,
    InputMTReturnRequestDetailColumnList,
    GridMLObjectDefinition,
    GirdMTReturnRequestDetailColumnList
} from "../constants/index.js";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
class ModalAddReturnRequestDetailCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsSystem: false,
            MTReturnRequestDetailNew: this.props.dataSource
        }
        this.updateDataSourceCompatibleWithInutGridCom = this.updateDataSourceCompatibleWithInutGridCom.bind(this);
        this.validateInputNumber = this.validateInputNumber.bind(this);
    }

    componentDidMount() {
        this.updateDataSourceCompatibleWithInutGridCom();
    }

    updateDataSourceCompatibleWithInutGridCom() {
        const { MTReturnRequestDetailNew } = this.state;

        const cloneMTReturnRequestDetailNew = MTReturnRequestDetailNew.map((item, index) => {
            const { IsCheckMinMaxQuantity, MinQuantity, MaxQuantity, TotalQuantity, IsAllowdUpliCatiOnProduct, QuantityUnit } = item;
            if (IsCheckMinMaxQuantity) {
                return {
                    ...item,
                    minInputNumber: MinQuantity,
                    maxInputNumber: MaxQuantity,
                    disabled: MaxQuantity == 0 ? true : false,
                    isDisabled: IsAllowdUpliCatiOnProduct ? true : false,
                    isDecimalInputNumber: true,
                    stepDecimalInputNumber: QuantityUnit.trim() == "Mét" ? "0.00001" : 1
                }
            } else {
                return {
                    ...item,
                    minInputNumber: 0,
                    maxInputNumber: TotalQuantity,
                    disabled: TotalQuantity == 0 ? true : false,
                    isDisabled: IsAllowdUpliCatiOnProduct ? true : false,
                    isDecimalInputNumber: true,
                    stepDecimalInputNumber: QuantityUnit.trim() == "Mét" ? "0.00001" : 1
                }
            }
        })

        this.setState({
            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
        })
    }

    handleInsertItem() {
        const { MTReturnRequestDetailNew } = this.state;
        const { dataSource, dataCompare } = this.props;
        let dataSelect = [], errorValidate = false;

        for (const key in MTReturnRequestDetailNew) {
            if (MTReturnRequestDetailNew[key].errorInputNumber == true) {
                errorValidate = true;
                break;
            }
        }

        if (errorValidate) {
            this.showMessage("Dữ liệu nhập vào không hợp lệ. Vui lòng nhập lại.")
        } else {
            MTReturnRequestDetailNew.forEach((item, index) => {
                if (item.Quantity) {
                    dataSelect.push({
                        ...dataSource[index],
                        Quantity: item.Quantity
                    })
                }
            })
            this.props.hideModal();
        }

        if (MTReturnRequestDetailNew[0].IsAllowdUpliCatiOnProduct) {
            if (this.props.onClickInsertItem)
                this.props.onClickInsertItem(dataSelect)
        } else {
            let flagCheck = false;

            dataSelect.forEach(item => {
                dataCompare.forEach(element => {
                    if (item.MaterialGroupID == element.MaterialGroupID && item.ProductID == element.ProductID) {
                        flagCheck = true;
                        return;
                    }
                });
            });

            if (flagCheck) {
                this.showMessage("Dữ liệu đã tồn tại.")
            } else {
                if (this.props.onClickInsertItem)
                    this.props.onClickInsertItem(dataSelect)
            }
        }

        // set MTReturnRequestDetailNew state ve trang thai ban dau
        const cloneMTReturnRequestDetailNew = MTReturnRequestDetailNew.map(item => {
            if (item.Quantity) item.Quantity = "";
            return item;
        })

        this.setState({
            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
        })
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        const { MTReturnRequestDetailNew } = this.state;
        const isAllowDecimal = MTReturnRequestDetailNew[index].IsAllowDecimal;
        const isCheckMinMaxQuantity = MTReturnRequestDetailNew[index].IsCheckMinMaxQuantity;
        let item = elementdata.Name + '_' + index;
        let cloneMTReturnRequestDetailNew = MTReturnRequestDetailNew;

        if (!isAllowDecimal) {
            if (!isCheckMinMaxQuantity) {
                if (elementdata.Value.toString().length > 1) {
                    if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                        if (elementdata.Name == 'Quantity') {
                            let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                            if (!gridFormValidation[item].IsValidationError) {
                                if (elementdata.Value > Quantity) {
                                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                    gridFormValidation[item].IsValidationError = true;
                                    gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                    this.setState({
                                        isError: true,
                                        IsCallAPIError: true,
                                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                        cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                                            cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                            gridFormValidation[item].IsValidationError = true;
                                            gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                            this.setState({
                                                isError: true,
                                                IsCallAPIError: true,
                                                MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                                cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                    MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                                })
                            }
                        }
                        else {
                            cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                                MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                            })
                        }
                    }
                    else {
                        cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                        gridFormValidation[item].IsValidationError = false;
                        gridFormValidation[item].ValidationErrorMessage = "";
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                        })
                    }
                }
            } else {
                if (parseInt(elementdata.Value) > parseInt(MTReturnRequestDetailNew[index].MinQuantity)
                    && parseInt(elementdata.Value) < parseInt(MTReturnRequestDetailNew[index].MaxQuantity)) {
                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                    })
                } else {
                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Số lượng nhập trả không nằm trong hạn mức khai báo.";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                    })
                }
            }
        }
        else {
            if (!isCheckMinMaxQuantity) {
                if (elementdata.Value.toString().length > 1) {
                    if (/^\d*\.?\d+$/.test(elementdata.Value)) {
                        if (elementdata.Name == 'Quantity') {
                            let Quantity = MTReturnRequestDetailNew[index].TotalQuantity;

                            if (!gridFormValidation[item].IsValidationError) {
                                if (elementdata.Value > Quantity) {
                                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                    gridFormValidation[item].IsValidationError = true;
                                    gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                    this.setState({
                                        isError: true,
                                        IsCallAPIError: true,
                                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                        cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                                            cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                            gridFormValidation[item].IsValidationError = true;
                                            gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                            this.setState({
                                                isError: true,
                                                IsCallAPIError: true,
                                                MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
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
                                cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                    MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                                })
                            }
                        }
                        else {
                            cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                                MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                            })
                        }
                    }
                    else {
                        cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                        gridFormValidation[item].IsValidationError = false;
                        gridFormValidation[item].ValidationErrorMessage = "";
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                        })
                    }

                }

            }
            else {
                if (parseInt(elementdata.Value) >= parseInt(MTReturnRequestDetailNew[index].MinQuantity)
                    && parseInt(elementdata.Value) <= parseInt(MTReturnRequestDetailNew[index].MaxQuantity)) {
                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                    })
                } else {
                    cloneMTReturnRequestDetailNew[index] = { ...cloneMTReturnRequestDetailNew[index], Quantity: elementdata.Value };
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Số lượng nhập trả không nằm trong hạn mức khai báo.";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                        MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
                    })
                }
            }

        }
    }

    onChangeInputNumber(e, rowItem, rowIndex) {
        this.validateInputNumber(e, rowItem, rowIndex);
    }

    validateInputNumber(e, rowItem, rowIndex) {
        console.log(e)
        const { MTReturnRequestDetailNew } = this.state;
        const { IsCheckMinMaxQuantity, MaxQuantity, maxInputNumber, TotalQuantity, QuantityUnit } = MTReturnRequestDetailNew[rowIndex];

        let cloneMTReturnRequestDetailNew = [...MTReturnRequestDetailNew];
        let itemRowIndex = { ...MTReturnRequestDetailNew[rowIndex] };

        let errMsgInputNumber = "", errorInputNumber = false;

        if (e == 0) {
            errMsgInputNumber = "Vui lòng nhập số khác 0";
            errorInputNumber = true;
        } else if (e == null) {
            errMsgInputNumber = null;
            errorInputNumber = false;
        } else if (e == maxInputNumber) {
            errMsgInputNumber = IsCheckMinMaxQuantity ? `Số lượng tạm ứng nhỏ hơn hoặc bằng ${MaxQuantity}` : `Số lượng tạm ứng nhỏ hơn hoặc bằng ${TotalQuantity}`;
            errorInputNumber = false;
        }

        itemRowIndex = {
            ...MTReturnRequestDetailNew[rowIndex],
            errorInputNumber,
            errMsgInputNumber,
            Quantity: e
        };

        cloneMTReturnRequestDetailNew[rowIndex] = itemRowIndex;

        this.setState({
            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
        })
    }

    render() {
        const { IsSystem, MTReturnRequestDetailNew } = this.state;
        return (
            <React.Fragment>
                <InputGrid
                    name="lstMTReturnRequestDetail"
                    controltype="GridControl"
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    PKColumnName={this.props.PKColumnName}
                    isMultipleCheck={this.props.multipleCheck}
                    listColumn={this.props.listColumn}
                    dataSource={MTReturnRequestDetailNew}
                    MLObjectDefinition={this.props.MLObjectDefinition}
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    colspan="12"
                    isHideHeaderToolbar={true}
                    isShowFooterToolbar={true}
                    // onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                    onHandleSubmitGridNew={this.handleInsertItem.bind(this)}
                    onChangeInputNumber={this.onChangeInputNumber.bind(this)}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const ModalAddReturnRequestDetail = connect(mapStateToProps, mapDispatchToProps)(ModalAddReturnRequestDetailCom);
export default ModalAddReturnRequestDetail;