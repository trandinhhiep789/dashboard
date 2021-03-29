import React, { Component } from 'react'
import { connect } from 'react-redux'

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

export class ModalAddDeliveryAbility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsSystem: false,
            dataSource: this.props.dataSource,
            dataSumit: []
        }
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

    onHandleSubmit(name) {
        this.props.onClickInsertItem(this.state.dataSumit)
        this.props.hideModal()
    }

    onHandleChange(value, rowItem, rowIndex) {
        const { DeliveryGoodsGroupID } = rowItem

        if (this.state.dataSumit.length == 0) {
            this.setState({
                dataSumit: [{
                    ...rowItem,
                    TotalAbility: value
                }]
            })
        } else {
            let newDataSubmit = [], flagExistItem = false

            this.state.dataSumit.forEach(data => {
                if (data.DeliveryGoodsGroupID == DeliveryGoodsGroupID) {
                    flagExistItem = true;
                    newDataSubmit.push({
                        ...data,
                        TotalAbility: value
                    })
                } else {
                    newDataSubmit.push({ ...data })
                }
            });

            !flagExistItem && newDataSubmit.push({
                ...rowItem,
                TotalAbility: value
            })

            this.setState({
                dataSumit: newDataSubmit
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <InputGrid
                    name="lstDeliveryAbilityDetail"
                    controltype="GridControl"
                    colspan="12"
                    dataSource={this.state.dataSource}
                    isHideHeaderToolbar={true}
                    isShowFooterToolbar={true}
                    listColumn={this.props.listColumn}
                    onChangeInputNumber={this.onHandleChange.bind(this)}
                    onHandleSubmitGrid={this.onHandleSubmit.bind(this)}
                />
            </React.Fragment>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDeliveryAbility)
