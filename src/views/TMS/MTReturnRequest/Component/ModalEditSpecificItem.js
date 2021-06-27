import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";

class ModalEditSpecificItemCom extends Component {
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
            const { IsCheckMinMaxQuantity, MinQuantity, MaxQuantity,
                TotalQuantity, QuantityUnit } = item;
            if (IsCheckMinMaxQuantity) {
                return {
                    ...item,
                    minInputNumber: MinQuantity,
                    maxInputNumber: MaxQuantity,
                    disabled: MaxQuantity == 0 ? true : false,
                    stepDecimalInputNumber: QuantityUnit.trim() == "Mét" ? "0.01" : 1
                }
            } else {
                return {
                    ...item,
                    minInputNumber: 0,
                    maxInputNumber: TotalQuantity,
                    disabled: TotalQuantity == 0 ? true : false,
                    stepDecimalInputNumber: QuantityUnit.trim() == "Mét" ? "0.01" : 1
                }
            }
        })

        this.setState({
            MTReturnRequestDetailNew: cloneMTReturnRequestDetailNew
        })
    }

    onHandleSubmitGridNew() {
        const { MTReturnRequestDetailNew } = this.state;
        const { dataSource } = this.props;
        let dateEdit = [], errorValidate = false;

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
                    dateEdit.push({
                        ...dataSource[index],
                        Quantity: item.Quantity
                    })
                }
            })
            this.props.hideModal();
        }

        if (this.props.onClickInsertItem) this.props.onClickInsertItem(dateEdit)

        // set MTReturnRequestDetailNew state ve trang thai ban dau
        this.setState({
            MTReturnRequestDetailNew: this.props.dataSource
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

    onChangeInputNumber(e, rowItem, rowIndex) {
        this.validateInputNumber(e, rowItem, rowIndex);
    }

    validateInputNumber(e, rowItem, rowIndex) {
        const { MTReturnRequestDetailNew } = this.state;
        const { maxInputNumber } = MTReturnRequestDetailNew[rowIndex];

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
            errMsgInputNumber = null;
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
        const { MTReturnRequestDetailNew } = this.state;
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
                    onHandleSubmitGridNew={this.onHandleSubmitGridNew.bind(this)}
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


const ModalEditSpecificItem = connect(mapStateToProps, mapDispatchToProps)(ModalEditSpecificItemCom);
export default ModalEditSpecificItem;