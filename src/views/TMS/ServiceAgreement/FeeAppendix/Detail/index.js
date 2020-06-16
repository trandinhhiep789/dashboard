import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import FormContainer from "../../../../../common/components/FormContainer";
import {
    APIHostName,
    AddAPIPath,
    BackLink,
    TitleFormDetail,
    LoadNewAPIPath,
    DataGridColumnItemListFeeAppendixDetail,
    TitleFromFeeAppendixDetail,
    MLObjectDefinition,
    DeleteFeeAppendixDetailPath


} from "../../../ServiceAgreement/FeeAppendix/contants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";

import FeeAppendixInfo from "../../../ServiceAgreement/FeeAppendix/Detail/FeeAppendixInfo";
import DataGrid from "../../../../../common/components/DataGrid/getdataserver.js";
import InputGridControl from "../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import FeeAppendixDetailElement from '../Component/FeeAppendixDetailElement';
import ReactNotification from "react-notifications-component";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleItemInsert = this.handleItemInsert.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            FeeAppendixDetailInfo: {},
            FeeAppendixDetailItemList: [],
            ServiceAgreementID: ''

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    ServiceAgreementID: apiResult.ResultObject.ServiceAgreementID,
                    FeeAppendixDetailInfo: apiResult.ResultObject,
                    FeeAppendixDetailItemList: apiResult.ResultObject.FeeAppendixDetail_ItemList,

                    IsLoadDataComplete: true
                });
                const id = apiResult.ResultObject.ServiceAgreementID;
                const PagePath = [
                    { Link: "/", Title: "Trang chủ" },
                    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "/ServiceAgreement/Detail/" + id, Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "", Title: "Danh sách chi tiết phụ lục biểu phí" },
                ];
                this.props.updatePagePath(PagePath);
            }
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {

            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });
    }


    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    handleItemDeleteFeeAppendixDetail(id) {
        let MLObject = {};
        MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.FeeAppendixDetailID = id;
        this.props.callFetchAPI(APIHostName, DeleteFeeAppendixDetailPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(this.props.match.params.id);
            }
        });
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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
        this.addNotification(apiResult.Message, apiResult.IsError);
        this.callLoadData(id);
        this.props.hideModal();

    }

    handleItemInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết biểu phí',
            content: {
                text: <FeeAppendixDetailElement
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEdit(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật chi tiết biểu phí',
            content: {
                text: <FeeAppendixDetailElement
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });

    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <FormContainer
                FormName={TitleFormDetail}
                MLObjectDefinition={MLObjectDefinition}
                dataSource={this.state.DataSource}
                listelement={[]}
                BackLink={BackLink}
                isSubmitForm={false}

            >
                <ReactNotification ref={this.notificationDOMRef} />
                <FeeAppendixInfo
                    FeeAppendixInfo={this.state.FeeAppendixDetailInfo}
                />

                <InputGridControl
                    name="FeeAppendixDetail_ItemList"
                    controltype="InputGridControl"
                    title={TitleFromFeeAppendixDetail}
                    IDSelectColumnName={"FeeAppendixDetailID"}
                    PKColumnName={"FeeAppendixDetailID"}
                    listColumn={DataGridColumnItemListFeeAppendixDetail}
                    dataSource={this.state.DataSource.FeeAppendixDetailItemList}
                    onInsertClick={this.handleItemInsert}
                    onEditClick={this.handleItemEdit}
                    onDeleteClick={this.handleItemDeleteFeeAppendixDetail.bind(this)}
                />
            </FormContainer>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
