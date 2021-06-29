import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import { MessageModal } from "../../../../../common/components/Modal";
import { listColumn } from './constants';
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
        const { StaffTransferDetail, handleDelStaffTransferDetailData } = this.context;
        try {
            const StaffTransferDetailDidDelete = StaffTransferDetail.filter(item => {
                const found = deleteList.findIndex(element => element.pkColumnName[0].value == item.UserName);

                if (found == -1) return item;
            })

            handleDelStaffTransferDetailData(StaffTransferDetailDidDelete);
        } catch (error) {
            handleDelStaffTransferDetailData([]);
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
        return (
            <DataGrid
                headingTitle="Danh sách nhân viên thuyên chuyển"
                listColumn={listColumn}
                dataSource={this.context.StaffTransferDetail}
                IDSelectColumnName={"chkSelectUserName"}
                PKColumnName={"UserName"}
                onDeleteClick={this.handleDelete}
                IsShowButtonAdd={true}
                onInsertClick={this.handleInsert}
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