import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddMaterialGroupInstallCondByFileAPIPath,
    APIHostName,
    lstColMaterialGroupInstallCondImportExcelModal,
} from '../constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";
import { MDMCOMMONCACHE_DELIVERYGOODSGROUP } from '../../../../../constants/keyCache';
import DataGrid from "../../../../../common/components/DataGrid";

class ImpMaterialGroupInstallCondCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: [],
            dataSubmit: [],
            countValid: 0,
            countInValid: 0,
            disableBtnSubmit: false
        };

        this.addNotification = this.addNotification.bind(this);
        this.handleCheckImportData = this.handleCheckImportData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.handleCheckImportData();
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessageModal}
            />
        );
    }

    handleCheckImportData() {
        let countValid = 0, countInValid = 0, dataSubmit = [];
        const uptDataGrid = this.props.importData.rows.map(item => {
            countValid++;
            dataSubmit.push(item);
            return item;

            // if ((item.MustReturnNumHour != "" || item.MustReturnNumHour != undefined) && isNaN(item.MustReturnNumHour)) {
            //     countInValid++;
            //     return {
            //         ...item,
            //         errorContent: `vui lòng nhập số`
            //     }
            // } else {
            //     countValid++;
            //     return item;
            // }
            

        });

        

        this.setState({
            dataGrid: uptDataGrid,
            dataSubmit,
            countValid,
            countInValid,
            disableBtnSubmit: countValid == 0 ? true : false
        })


    }

    returnHeadingTitle() {
        return (
            <React.Fragment>
                <h5 className="d-flex mb-2">Danh sách điều kiện lắp đặt của nhóm vật tư<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Không hợp lệ: {this.state.countInValid}</p>
                    <p className="mb-0">Hợp lệ: {this.state.countValid}</p>
                    <p className="mb-0">Tổng cộng: {this.state.dataSubmit.length}</p>

                    <button type="button" className="btn btn-info mr-2" disabled={this.state.disableBtnSubmit} onClick={this.handleSubmit}>Đồng ý</button>
                </div>
            </React.Fragment>
        )
    }

    handleSubmit() {
        
        const uptDataSubmit = this.state.dataSubmit.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
            }
        })


        this.props.callFetchAPI(APIHostName, AddMaterialGroupInstallCondByFileAPIPath, uptDataSubmit).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.showMessage(apiResult.Message);
                this.props.hideModal();
            }
        });
    }

    render() {
        return <React.Fragment>
            <ReactNotification ref={this.notificationDOMRef} />

            <DataGrid
                dataSource={this.state.dataGrid}
                headingTitle={this.returnHeadingTitle("Danh sách sản phẩm của nhóm vật tư")}
                IsAutoPaging={true}
                isHideHeaderToolbar={true}
                listColumn={lstColMaterialGroupInstallCondImportExcelModal}
                PKColumnName={""}
                RowsPerPage={10}
            />
        </React.Fragment>
    }
}

ImpMaterialGroupInstallCondCom.defaultProps = {
    importData: {
        rows: [],
        errors: []
    }
};

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
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImpMaterialGroupInstallCondCom);