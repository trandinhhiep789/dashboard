import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/FormContainer";
import FormControl from "../../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../../actions/modal';
import {
    APIHostName,
    AddAPIPath,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { TMS_PNSERVICEPRICETABLE_ADD } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import { ERPCOMMONCACHE_SERVICESEASONTYPE, ERPCOMMONCACHE_AREATT, ERPCOMMONCACHE_PNSERVICEPRICETABLE } from "../../../../../../constants/keyCache";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: [],
            DataWard: [],
            cssNotification: "",
            iconNotification: "",
        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(AddPagePath);

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


    handleSubmit(formData, MLObject) {
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            console.log("aaa", apiResult)
           
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_PNSERVICEPRICETABLE);
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


    render() {
        const { DataSource } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Thêm đơn giá thưởng giao hàng và lắp đặt"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    // onchange={this.handleChange.bind(this)}
                    RequirePermission={TMS_PNSERVICEPRICETABLE_ADD}
                >

                    <div className="row">

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtpnServicePriceTableName"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="tên đơn giá thưởng"
                                placeholder="Tên đơn giá thưởng"
                                controltype="InputControl"
                                value=""
                                datasourcemember="pnServicePriceTableName"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cbServiceSeasonTypeID"
                                colspan="9"
                                labelcolspan="3"
                                label="loại mùa vụ"
                                //disabled={IsSystem}
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_SERVICESEASONTYPE} //"ERPCOMMONCACHE.SERVICESEASONTYPE"
                                valuemember="ServiceSeasonTypeID"
                                nameMember="ServiceSeasonTypeName"
                                controltype="InputControl"
                                value={-1}
                                listoption={[]}
                                datasourcemember="ServiceSeasonTypeID"
                            />
                        </div>

                        {/* <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                name="cbServiceAreaID"
                                colspan="8"
                                labelcolspan="4"
                                label="khu vực"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                placeholder="-- Vui lòng chọn --"
                                loaditemcachekeyid={ERPCOMMONCACHE_AREATT} //"ERPCOMMONCACHE.AREATT"
                                valuemember="AreaID"
                                nameMember="AreaName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="ServiceAreaID" />
                        </div> */}

                        <div className="col-md-12">
                            <FormControl.TextArea
                                labelcolspan={2}
                                colspan={10}
                                name="txtDescription"
                                label="Mô tả"
                                placeholder="Mô tả"
                                datasourcemember="Description"
                                controltype="InputControl"
                                rows={6}
                                maxSize={500}
                                classNameCustom="customcontrol"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsActived"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="kích hoạt"
                                controltype="InputControl"
                                value={true}
                                datasourcemember="IsActived"
                                classNameCustom="customCheckbox"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsSystem"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="hệ thống"
                                controltype="InputControl"
                                value=""
                                datasourcemember="IsSystem"
                                classNameCustom="customCheckbox"
                            />
                        </div>

                    </div>


                </FormContainer>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
