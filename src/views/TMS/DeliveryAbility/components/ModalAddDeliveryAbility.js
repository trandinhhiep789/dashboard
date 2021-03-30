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

        this.getDataSubmit = this.getDataSubmit.bind(this)
        this.setStateTotalAbilityFromDataSource = this.setStateTotalAbilityFromDataSource.bind(this)
        this.insertValueChangeToDataSource = this.insertValueChangeToDataSource.bind(this)
    }

    componentDidMount() {
        this.setStateTotalAbilityFromDataSource()
    }

    setStateTotalAbilityFromDataSource() {
        const { dataSource } = this.state
        dataSource.forEach(item => {
            item.TotalAbility && this.setState({
                [item.DeliveryGoodsGroupID]: item.TotalAbility
            })
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

    getDataSubmit() {
        const { dataSource } = this.state
        let tempDataSubmit = []
        dataSource.forEach(item => {
            if (this.state[item.DeliveryGoodsGroupID]) {
                tempDataSubmit.push({
                    ...item,
                    TotalAbility: this.state[item.DeliveryGoodsGroupID]
                })
            }
        })

        this.setState({
            dataSumit: tempDataSubmit
        })

        return tempDataSubmit
    }

    onHandleSubmit(name) {
        const dtSubmit = this.getDataSubmit()
        this.props.onClickInsertItem(dtSubmit)
        this.props.hideModal()
    }

    insertValueChangeToDataSource(value, rowItem, rowIndex) {
        const { dataSource } = this.state

        const newDataSource = dataSource.map(item => {
            if (rowItem.DeliveryGoodsGroupID == item.DeliveryGoodsGroupID) {
                return {
                    ...item, TotalAbility: value
                }
            } else {
                return { ...item }
            }
        })

        this.setState({
            dataSource: newDataSource
        })
    }

    onHandleChange(value, rowItem, rowIndex) {
        this.setState({
            [rowItem.DeliveryGoodsGroupID]: value
        })

        this.insertValueChangeToDataSource(value, rowItem, rowIndex)
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
