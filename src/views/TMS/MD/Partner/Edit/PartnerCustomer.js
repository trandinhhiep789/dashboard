import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { listColumnPartnerCustomerAdd } from "../constants";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import PartnerCustomerAddModalCom from '../PartnerCustomerModal/Add';
import PartnerCustomerEditModalCom from '../PartnerCustomerModal/Edit';

class PartnerCustomerCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateDataGrid: this.props.propsPartnerCustomer,
        };

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handlePartnerCustomer = this.handlePartnerCustomer.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
    }

    componentDidMount() {
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

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handlePartnerCustomer(data) {
        this.setState({
            stateDataGrid: data
        })
        this.props.propsHandlePartnerCustomer(data);
    }

    handleInsertClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm khách hàng thuộc đối tác',
            content: {
                text: <PartnerCustomerAddModalCom
                    propsPartnerCustomer={this.state.stateDataGrid}
                    propsHandlePartnerCustomer={this.handlePartnerCustomer}
                />
            },
            maxWidth: '800px'
        });
    }

    handleDelete(listDeleteID, ListPKColumnName) {
        try {
            const { stateDataGrid } = this.state;

            const arrDeletedPartnerCustomer = listDeleteID.map(item => {
                return { CustomerID: item.pkColumnName[0].value, IsDeleted: true };
            });

            const updateStateDataGrid = stateDataGrid.reduce((acc, val) => {
                if (arrDeletedPartnerCustomer.find(item => item.CustomerID == val.CustomerID)) {
                    return acc;
                } else {
                    return [...acc, val];
                }
            }, []);

            this.setState({
                stateDataGrid: updateStateDataGrid
            })
            this.props.propsHandlePartnerCustomer(updateStateDataGrid);
            this.props.propsHandleDeletedPartnerCustomer(arrDeletedPartnerCustomer);
        } catch (error) {
            this.showMessage("Lỗi xóa");
        }
    }

    handleInsertClickEdit(id, pkColumnName) {
        try {
            const { stateDataGrid } = this.state;
            const { value } = id.pkColumnName[0];

            const indexFound = stateDataGrid.findIndex(item => item.CustomerID == value);

            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: 'Chỉnh sửa khách hàng thuộc đối tác',
                content: {
                    text: <PartnerCustomerEditModalCom
                        propsIndexPartnerCustomer={indexFound}
                        propsArrPartnerCustomer={this.state.stateDataGrid}
                        propsHandlePartnerCustomer={this.handlePartnerCustomer}
                    />
                },
                maxWidth: '800px'
            });
        } catch (error) {
            this.showMessage("Lỗi chỉnh sửa");
        }
    }

    render() {
        const { stateDataGrid } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <DataGrid
                    headingTitle="Danh sách khách hàng thuộc đối tác"
                    listColumn={listColumnPartnerCustomerAdd}
                    dataSource={stateDataGrid}
                    PKColumnName={"CustomerID"}

                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={true}
                    IsAdd={true}
                    IsCustomAddLink={true}
                    onInsertClick={this.handleInsertClick}

                    IsShowButtonDelete={true}
                    IsDelete={true}
                    IDSelectColumnName={"chkSelect"}
                    onDeleteClick={this.handleDelete}

                    onInsertClickEdit={this.handleInsertClickEdit}

                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                />
            </React.Fragment>
        );

    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCustomerCom);
