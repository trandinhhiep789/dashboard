import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MLObjectDefinitionPartnerServiceRequestTypeModal } from '../constants';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callGetCache } from "../../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statePartnerServiceRequestType: this.props.propsPartnerServiceRequestType,
            statePartnerServiceRequestTypeCache: [],
            stateOptionServiceRequestType: []
        };

        this.gridref = React.createRef();
        this.handleOptionServiceRequestType = this.handleOptionServiceRequestType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.handleOptionServiceRequestType();
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

    handleOptionServiceRequestType() {
        const { statePartnerServiceRequestType } = this.state;

        this.props.callGetCache("ERPCOMMONCACHE.SERVICEREQUESTTYPE").then(result => {
            const optionServiceRequestType = result.ResultObject.CacheData.reduce((acc, val) => {
                if (statePartnerServiceRequestType.find(item => item.ServiceRequestTypeID == val.ServiceRequestTypeID)) {
                    return acc;
                } else {
                    return [...acc, {
                        label: `${val.ServiceRequestTypeID} - ${val.ServiceRequestTypeName}`,
                        value: val.ServiceRequestTypeID
                    }]
                }
            }, []);

            this.setState({
                stateOptionServiceRequestType: optionServiceRequestType,
                statePartnerServiceRequestTypeCache: result.ResultObject.CacheData
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    handleSubmit(FormData, MLObject) {
        try {
            const PartnerServiceRequestType = this.state.statePartnerServiceRequestTypeCache.find(item => item.ServiceRequestTypeID == MLObject.ServiceRequestTypeID);

            this.setState({
                statePartnerServiceRequestType: [...this.state.statePartnerServiceRequestType, { ...PartnerServiceRequestType, ...MLObject }]
            })

            this.props.propsHandleDataGrid([...this.state.statePartnerServiceRequestType, { ...PartnerServiceRequestType, ...MLObject }]);
            this.props.hideModal();
        } catch (error) {
            this.showMessage("Lỗi thêm");
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    MLObjectDefinition={MLObjectDefinitionPartnerServiceRequestTypeModal}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    IsCloseModal={true}
                >
                    <div className="row">
                        <div className="col-12 mb-2">
                            <FormControl.FormControlComboBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="ServiceRequestTypeID"
                                isMultiSelect={false}
                                isShowLable={false}
                                isautoloaditemfromcache={false}
                                label="Loại dịch vụ đối tác được yêu cầu"
                                labelcolspan="4"
                                listoption={this.state.stateOptionServiceRequestType}
                                loaditemcachekeyid="ERPCOMMONCACHE.SERVICEREQUESTTYPE"
                                name="cbServiceRequestTypeID"
                                nameMember="ServiceRequestTypeName"
                                placeholder="---Vui lòng chọn---"
                                validatonList={["Comborequired"]}
                                value="-1"
                                valuemember="ServiceRequestTypeID"
                            />
                        </div>

                        <div className="col-12">
                            <FormControl.CheckBox
                                label="Kích hoạt"
                                name="chkIsActived"
                                datasourcemember="IsActived"
                                controltype="InputControl"
                                colspan="8"
                                labelcolspan="4"
                                classNameCustom=""
                                value={true}
                            />
                        </div>


                        <div className="col-12">
                            <FormControl.CheckBox
                                label="Hệ thống"
                                name="chkIsSystem"
                                datasourcemember="IsSystem"
                                controltype="InputControl"
                                colspan="8"
                                labelcolspan="4"
                                classNameCustom=""
                                value={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);
