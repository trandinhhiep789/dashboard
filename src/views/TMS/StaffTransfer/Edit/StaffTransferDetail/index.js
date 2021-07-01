import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import { MessageModal } from "../../../../../common/components/Modal";
import { listColumnNotReview, listColumnReviewed } from './constants';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { callGetCache } from "../../../../../actions/cacheAction";

import DataGrid from "../../../../../common/components/DataGrid";
import AddModalCom from './AddModal';
import MyContext from '../Context';


class StaffTransferDetail extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
    }

    componentDidMount() {

    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleDelete(deleteList, pkColumnName) {
        const { stateStaffTransferDetail, handleDelStateStaffTransferDetail } = this.context;
        try {
            const StaffTransferDetailDidDelete = stateStaffTransferDetail.filter(item => {
                const found = deleteList.findIndex(element => element.pkColumnName[0].value == item.UserName);

                if (found == -1) return item;
            })

            handleDelStateStaffTransferDetail(StaffTransferDetailDidDelete);
        } catch (error) {
            handleDelStateStaffTransferDetail([]);
        }
    }

    handleInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm danh sách nhân viên thuyên chuyển',
            content: {
                text: <MyContext.Provider value={this.context}>
                    <AddModalCom />
                </MyContext.Provider>
            },
            maxWidth: "80%"
        });
    }

    render() {
        const { stateStaffTransfer, stateStaffTransferDetail } = this.context;

        return (
            <DataGrid
                headingTitle="Danh sách nhân viên thuyên chuyển"
                listColumn={stateStaffTransfer.IsReviewed ? listColumnReviewed : listColumnNotReview}
                dataSource={stateStaffTransferDetail}
                IDSelectColumnName={"chkSelectUserName"}
                PKColumnName={"UserName"}
                onDeleteClick={this.handleDelete}
                IsShowButtonAdd={!stateStaffTransfer.IsReviewed}
                onInsertClick={this.handleInsert}
                IsShowButtonDelete={!stateStaffTransfer.IsReviewed}
                IsDelete={true}
                IsAutoPaging={false}
                IsCustomAddLink={true}
            />
        )

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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferDetail);