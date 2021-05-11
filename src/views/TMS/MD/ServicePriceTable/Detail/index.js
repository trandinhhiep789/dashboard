import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import InputGridControl from "../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import {
    APIHostName,
    DetailPagePath,
    LoadAPIPath,
    TitleFormDetail,
    DataGridColumnSPTDetailItemList,
    TitleFromSPTDetail,
    TitleFromSPTArea,
    DataGridColumnSPTAreatemList,
    DeleteAPISPTAreaPath


} from "../constants";
import { MessageModal } from "../../../../../common/components/Modal";
import ServicePriceTableInfo from "./ServicePriceTableInfo";

import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import ReactNotification from "react-notifications-component";
import ServicePriceTableDetail from "../ServicePriceTableDetail";
import ServicePriceTableArea from "../ServicePriceTableArea";



class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChangeAraeObjItem = this.handleInputChangeAraeObjItem.bind(this)
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this)
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsSystem: false,
            ServicePriceTableID: '',
            ServicePriceTableDetail: [],
            ServicePriceTableArea: []

        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        console.log('apiResult', this,this.props)
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData(this.props.match.params.id);
        this.setState({
            ServicePriceTableID: this.props.match.params.id
        })
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log('apiResult', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError,

                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    DataSource: apiResult.ResultObject,
                    ServicePriceTableArea: apiResult.ResultObject.ServicePriceTable_AreaList,
                    ServicePriceTableDetail: apiResult.ResultObject.ServicePriceTableDetailList,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem
                });
            }
        });
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


    handleInputChangeObjItem(id, apiResult) {
        console.log('handleInputChangeObjItem', id, apiResult)
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }

    }


    handleItemInsertSPTDetail() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết bảng giá dịch vụ',
            content: {
                text: <ServicePriceTableDetail
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditSPTDetail() {

    }

    handleItemDeleteSPTDetail() {

    }

    handleInputChangeAraeObjItem(id, apiResult) {
        console.log('handleInputChangeAraeObjItem', id, apiResult)
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.props.hideModal();
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);

        }

    }

    handleItemInsertSPTArea() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm khu vực áp dụng bảng giá dịch vụ',
            content: {
                text: <ServicePriceTableArea
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeAraeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditSPTArea(index) {
        console.log("index", index)
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm khu vực áp dụng bảng giá dịch vụ',
            content: {
                text: <ServicePriceTableArea
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeAraeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteSPTArea(index) {
        const { ServicePriceTableID, DataSource } = this.state;
        let MLObject = {};
        MLObject.AreaID = index;
        MLObject.ServicePriceTableID = ServicePriceTableID;

        this.props.callFetchAPI(APIHostName, DeleteAPISPTAreaPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(ServicePriceTableID);
            }
        });
    }



    render() {
        const { IsSystem } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">

                            <ServicePriceTableInfo
                                ServicePriceTableInfo={this.state.DataSource}
                            />

                            <InputGridControl
                                name="ServicePriceTableDetail"
                                controltype="InputGridControl"
                                title={TitleFromSPTDetail}
                                IDSelectColumnName={"ServicePriceTableDetailID"}
                                PKColumnName={"ServicePriceTableDetailID"}
                                listColumn={DataGridColumnSPTDetailItemList}
                                dataSource={this.state.ServicePriceTableDetail}
                                onInsertClick={this.handleItemInsertSPTDetail.bind(this)}
                                onEditClick={this.handleItemEditSPTDetail.bind(this)}
                                onDeleteClick={this.handleItemDeleteSPTDetail.bind(this)}
                                ref={this.gridref}
                                isSystem={IsSystem}
                                IsExportFile={false}
                            />


                            <InputGridControl
                                name="ServicePriceTableArea"
                                controltype="InputGridControl"
                                title={TitleFromSPTArea}
                                IDSelectColumnName={"AreaID"}
                                PKColumnName={"AreaID"}
                                listColumn={DataGridColumnSPTAreatemList}
                                dataSource={this.state.ServicePriceTableArea}
                                onInsertClick={this.handleItemInsertSPTArea.bind(this)}
                                onEditClick={this.handleItemEditSPTArea.bind(this)}
                                onDeleteClick={this.handleItemDeleteSPTArea.bind(this)}
                                ref={this.gridref}
                                isSystem={IsSystem}
                                IsExportFile={false}
                            />

                        </div>
                        <footer className="card-footer text-right">
                            <Link to="/RewardPriceTable">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
