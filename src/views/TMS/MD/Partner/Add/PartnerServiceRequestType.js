import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { listColumnPartnerServiceRequestTypeAdd } from "../constants";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import PartnerServiceRequestTypeModalAddCom from '../PartnerServiceRequestTypeModal/Add';
import PartnerServiceRequestTypeModalEditCom from '../PartnerServiceRequestTypeModal/Edit';

class PartnerServiceRequestTypeCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateDataGrid: []
        };

        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInsertClickEdit = this.handleInsertClickEdit.bind(this);
        this.handleStateDataGrid = this.handleStateDataGrid.bind(this);
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

    handleStateDataGrid(data) {
        this.setState({
            stateDataGrid: data
        })
        this.props.propsHandlePartnerServiceRequestType(data);
    }

    handleInsertClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm loại dịch vụ đối tác được yêu cầu',
            content: {
                text: <PartnerServiceRequestTypeModalAddCom
                    propsPartnerServiceRequestType={this.state.stateDataGrid}
                    propsHandleDataGrid={this.handleStateDataGrid}
                />
            },
            maxWidth: '800px'
        });
    }

    handleDeleteClick(listDeleteID, ListPKColumnName) {
        try {
            const { stateDataGrid } = this.state;

            const arrSelectRow = listDeleteID.map(item => {
                return item.pkColumnName[0].value;
            })

            const updateStateDataGrid = stateDataGrid.reduce((acc, val) => {
                if (arrSelectRow.find(item => item == val.ServiceRequestTypeID)) {
                    return acc;
                } else {
                    return [...acc, val];
                }
            }, []);

            this.setState({
                stateDataGrid: updateStateDataGrid
            })
            this.props.propsHandlePartnerServiceRequestType(updateStateDataGrid);
        } catch (error) {
            this.showMessage("Lỗi xóa");
        }
    }

    handleInsertClickEdit(id, pkColumnName) {
        try {
            const { stateDataGrid } = this.state;

            const indexFound = stateDataGrid.findIndex(item => item.ServiceRequestTypeID == id.pkColumnName[0].value);

            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: 'Chỉnh sửa loại dịch vụ đối tác được yêu cầu',
                content: {
                    text: <PartnerServiceRequestTypeModalEditCom
                        propsIndexFound={indexFound}
                        propsDataGrid={stateDataGrid}
                        propsHandleDataGrid={this.handleStateDataGrid}
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
                    headingTitle="Danh sách loại dịch vụ đối tác được yêu cầu"
                    listColumn={listColumnPartnerServiceRequestTypeAdd}
                    dataSource={stateDataGrid}
                    PKColumnName={"ServiceRequestTypeID"}

                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={true}
                    IsAdd={true}
                    IsCustomAddLink={true}
                    onInsertClick={this.handleInsertClick}

                    IsShowButtonDelete={true}
                    IsDelete={true}
                    IDSelectColumnName={"chkSelect"}
                    onDeleteClick={this.handleDeleteClick}

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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerServiceRequestTypeCom);