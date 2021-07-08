import React from "react";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import DataGrid from "../../../../common/components/DataGrid";
import { listColumnDocument_LikeList } from '../constants';

class Document_LikeListCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.notificationDOMRef = React.createRef();
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


    addNotification(message1, IsError) {
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
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        const { propsDocument_LikeList } = this.props;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <DataGrid
                    headingTitle="Danh sách người thích"
                    listColumn={listColumnDocument_LikeList}
                    dataSource={propsDocument_LikeList}
                    PKColumnName={"LikeID"}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Document_LikeListCom);
