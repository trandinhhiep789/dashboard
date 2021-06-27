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
import { LIMITTYPE_ADD } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import { ERPCOMMONCACHE_LIMITTYPE } from "../../../../../../constants/keyCache";
import el from "date-fns/esm/locale/el/index.js";

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
            MainDriverUser: "",
            MainCoordinatorStoreID: "",
            IsCheckRangeLimit: true,
            IsAllowdecimalLimit: false
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
        console.log("clg", formData, MLObject)
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        if (!MLObject.IsAllowdecimalLimitValue) {
            if (parseInt(MLObject.MinLimitValue.trim()) > parseInt(MLObject.MaxLimitValue.trim())) {
                this.addNotification("GTGH nhỏ nhất không được lơn hơn GTGH lớn nhất.", true);
                return;
            }
        }
        else {
            if (parseFloat(MLObject.MinLimitValue.trim()) > parseFloat(MLObject.MaxLimitValue.trim())) {
                this.addNotification("GTGH nhỏ nhất không được lơn hơn GTGH lớn nhất.", true);
                return;
            }
        }


        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_LIMITTYPE);
            }
        });


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

    handleChange(formData, MLObject) {
        if (formData.chkIsCheckRangeLimitValue.value) {
            this.setState({
                IsCheckRangeLimit: true
            })
        }
        else {
            this.setState({
                IsCheckRangeLimit: false
            })

        }

        if (formData.chkIsAllowdecimalLimitValue.value) {
            this.setState({
                IsAllowdecimalLimit: true
            })
            if (!formData.chkIsCheckRangeLimitValue.value) {
                formData.txtMinLimitValue.ErrorLst.IsValidatonError = false;
                formData.txtMinLimitValue.ErrorLst.ValidatonErrorMessage = "";
                formData.txtMaxLimitValue.ErrorLst.IsValidatonError = false;
                formData.txtMaxLimitValue.ErrorLst.ValidatonErrorMessage = "";
                formData.txtMaxLimitValue.validatonList = [];
                formData.txtMinLimitValue.validatonList = [];
                
            }
            else {
                formData.txtMinLimitValue.validatonList = ['required','numberDecimal'];
                formData.txtMaxLimitValue.validatonList = ['required', 'numberDecimal'];
            }
        }
        else {
            this.setState({
                IsAllowdecimalLimit: false
            })
            if (!formData.chkIsCheckRangeLimitValue.value) {
                formData.txtMinLimitValue.ErrorLst.IsValidatonError = false;
                formData.txtMinLimitValue.ErrorLst.ValidatonErrorMessage = "";
                formData.txtMaxLimitValue.ErrorLst.IsValidatonError = false;
                formData.txtMaxLimitValue.ErrorLst.ValidatonErrorMessage = "";

                formData.txtMaxLimitValue.validatonList = [];
                formData.txtMinLimitValue.validatonList = [];
            }
            else {
                formData.txtMaxLimitValue.validatonList = ['required', 'number'];
                formData.txtMinLimitValue.validatonList = ['required', 'number'];
            }
        }

    }

    render() {
        const { DataSource, IsCheckRangeLimit, IsAllowdecimalLimit } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Thêm loại giới hạn"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    RequirePermission={LIMITTYPE_ADD}
                    onchange={this.handleChange.bind(this)}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtLimitTypeID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="mã loại giới hạn"
                                placeholder="Mã loại giới hạn"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="LimitTypeID"
                                validatonList={['required', 'number']}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtLimitTypeName"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="tên loại giới hạn"
                                placeholder="Tên loại giới hạn"
                                controltype="InputControl"
                                value=""
                                datasourcemember="LimitTypeName"
                                validatonList={['required']}
                            />
                        </div>

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
                                name="chkIsAllowdecimalLimitValue"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="Cho phép nhập số lẻ"
                                controltype="InputControl"
                                value={false}
                                datasourcemember="IsAllowdecimalLimitValue"
                                classNameCustom="customCheckbox"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsCheckRangeLimitValue"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="có kiểm tra GTGH"
                                controltype="InputControl"
                                value={true}
                                datasourcemember="IsCheckRangeLimitValue"
                                classNameCustom="customCheckbox"
                            />
                        </div>


                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtMinLimitValue"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={IsCheckRangeLimit == true ? false : true}
                                label="GTGH nhỏ nhất"
                                placeholder="Giá trị giới hạn nhỏ nhất"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="MinLimitValue"
                                validatonList={(IsAllowdecimalLimit == false && IsCheckRangeLimit == true) ? ['required', 'number'] : ['required', 'numberDecimal'] }
                            />
                        </div>


                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtMaxLimitValue"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={IsCheckRangeLimit == true ? false : true}
                                label="GTGH lớn nhất"
                                placeholder="Giá trị giới hạn lớn nhất"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="MaxLimitValue"
                                validatonList={(IsAllowdecimalLimit == false && IsCheckRangeLimit == true) ? ['required', 'number'] : ['required', 'numberDecimal'] }
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
