import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { PagePath, APIHostName, APIUpdate, MLObjectDefinition, LoadInfoEdit } from './constants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { ERPCOMMONCACHE_USER_COOSTORE_BYUSER, ERPCOMMONCACHE_STAFFTRANSFERTYPE } from '../../../../constants/keyCache';

import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import MyContext from './Context';
import StaffTransferDetailCom from './StaffTransferDetail';
import StaffTransfer_ReviewListCom from './StaffTransfer_ReviewList';

class EditCom extends React.Component {
    static controltype = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            stateStaffTransferDetail: [],
            stateStaffTransfer_ReviewList: []
        };

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.fetchStaffTransferDetail = this.fetchStaffTransferDetail.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddStateStaffTransferDetail = this.handleAddStateStaffTransferDetail.bind(this);
        this.handleDelStateStaffTransferDetail = this.handleDelStateStaffTransferDetail.bind(this);
        this.handelStateStaffTransfer_ReviewList = this.handelStateStaffTransfer_ReviewList.bind(this);
        this.handleInitStateStaffTransferDetail = this.handleInitStateStaffTransferDetail.bind(this);
        this.handleSetStaffTransferDetailSubmit = this.handleSetStaffTransferDetailSubmit.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.fetchStaffTransferDetail();
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

    fetchStaffTransferDetail() {
        let { id } = this.props.match.params;

        this.props.callFetchAPI(APIHostName, LoadInfoEdit, id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    dataSource: apiResult.ResultObject,
                    stateStaffTransferDetail: this.handleInitStateStaffTransferDetail(apiResult.ResultObject),
                    stateStaffTransfer_ReviewList: apiResult.ResultObject.ListStaffTransfer_ReviewList
                })
            }
        })
    }

    handleInitStateStaffTransferDetail(ResultObject) {
        const { ListStaffTransferDetail } = ResultObject;
        try {
            const arrResult = ListStaffTransferDetail.map(item => {
                return {
                    ...item,
                    FromCoordinatorGroupID_Name: `${item.FromCoordinatorGroupID} - ${item.FromCoordinatorGroupName}`,
                    ToCoordinatorGroupID_Name: `${item.ToCoordinatorGroupID} - ${item.ToCoordinatorGroupName}`
                }
            })
            return arrResult;
        } catch (error) {
            return ListStaffTransferDetail;
        }
    }

    handleAddStateStaffTransferDetail(data) {
        this.setState({
            stateStaffTransferDetail: [
                ...this.state.stateStaffTransferDetail,
                ...data
            ]
        })
    }

    handleDelStateStaffTransferDetail(data) {
        this.setState({
            stateStaffTransferDetail: data
        })
    }

    handelStateStaffTransfer_ReviewList(data) {
        this.setState({
            stateStaffTransfer_ReviewList: data
        })
    }

    handleSetStaffTransferDetailSubmit() {
        const { dataSource, stateStaffTransferDetail } = this.state;

        try {
            const arrDelStaffTransferDetail = dataSource.ListStaffTransferDetail.reduce((acc, val) => {
                const found = stateStaffTransferDetail.find(item => item.UserName == val.UserName);

                if (found == undefined) {
                    return [
                        ...acc,
                        {
                            ...val,
                            IsDeleted: true,
                            DeletedDate: new Date(),
                            DeletedUser: this.props.AppInfo.LoginInfo.Username
                        }
                    ]
                } else {
                    return acc;
                }
            }, []);

            const arrExistStaffTransferDetail = stateStaffTransferDetail.reduce((acc, val) => {
                const found = dataSource.ListStaffTransferDetail.find(item => item.UserName == val.UserName);

                if (found == undefined) {
                    return [...acc, val];
                } else {
                    return [...acc, found];
                }
            }, []);

            return [...arrDelStaffTransferDetail, ...arrExistStaffTransferDetail];
        } catch (error) {
            this.showMessage("Lỗi xử lý nhân viên thuyên chuyển, vui lòng liên hệ quản trị viên");
        }
    }

    handleSubmit(formData, MLObject) {
        const { dataSource, stateStaffTransferDetail, stateStaffTransfer_ReviewList } = this.state;

        if (dataSource.IsReviewed) {
            this.showMessage("Yêu cầu thuyên chuyển đã được duyệt, không thể chỉnh sửa");
            return;
        }
        if (stateStaffTransferDetail.length == 0) {
            this.showMessage("Danh sách nhân viên thuyên chuyển không được để trống");
            return;
        }


        const postData = {
            ...dataSource,
            StaffTransferTitle: MLObject.StaffTransferTitle,
            Description: MLObject.Description,
            UpdatedUser: this.props.AppInfo.LoginInfo.Username,
            ListStaffTransferDetail: this.handleSetStaffTransferDetailSubmit(),
            ListStaffTransfer_ReviewList: stateStaffTransfer_ReviewList
        }

        this.props.callFetchAPI(APIHostName, APIUpdate, postData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.MessageDetail);
            } else {
                this.showMessage(apiResult.MessageDetail);
                this.props.history.push("/StaffTransfer");
            }
        });
    }

    render() {
        const { dataSource, stateStaffTransferDetail, stateStaffTransfer_ReviewList } = this.state;

        if (dataSource == null) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName={"Cập nhật yêu cầu thuyên chuyển"}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={dataSource}
                        listelement={[]}
                        BackLink={"/StaffTransfer"}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="row mb-4">
                            <div className="col-md-6 mb-2">
                                <FormControl.TextBox
                                    name="txtStaffTransferID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="mã yêu cầu thuyên Chuyển"
                                    placeholder="Mã yêu cầu thuyên Chuyển"
                                    controltype="InputControl"
                                    value={""}
                                    datasourcemember="StaffTransferID"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-6 mb-2">
                                <FormControl.FormControlComboBox
                                    name="cboStaffTransferTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại yêu cầu thuyên chuyển"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_STAFFTRANSFERTYPE}
                                    valuemember="StaffTransferTypeID"
                                    nameMember="StaffTransferTypeName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="StaffTransferTypeID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Tự động duyệt"
                                    name="cbIsAutoReview"
                                    value={dataSource.IsAutoReview}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Tự động thuyên chuyển"
                                    name="cbIsAutoTransfer"
                                    value={dataSource.IsAutoTransfer}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtStaffTransferTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    readOnly={dataSource.IsReviewed}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="StaffTransferTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_USER_COOSTORE_BYUSER}
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="RequestStoreID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlDatetimeNew
                                    name="dtRequestDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    disabled={true}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="Ngày yêu cầu"
                                    controltype="InputControl"
                                    value=""
                                    validatonList={["required"]}
                                    datasourcemember="RequestDate"
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
                                    disabled={dataSource.IsReviewed}
                                    classNameCustom="customcontrol"
                                />
                            </div>
                        </div>

                        <MyContext.Provider
                            value={{
                                stateStaffTransfer: dataSource,
                                stateStaffTransferDetail,
                                stateStaffTransfer_ReviewList,
                                handleAddStateStaffTransferDetail: this.handleAddStateStaffTransferDetail,
                                handleDelStateStaffTransferDetail: this.handleDelStateStaffTransferDetail,
                                handelStateStaffTransfer_ReviewList: this.handelStateStaffTransfer_ReviewList
                            }}
                        >
                            <div className="mb-4">
                                <StaffTransferDetailCom />
                            </div>

                            <div className="mb-4">
                                {
                                    !dataSource.IsAutoReview && <StaffTransfer_ReviewListCom />
                                }
                            </div>
                        </MyContext.Provider>
                    </FormContainer>
                </React.Fragment>
            );
        }
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
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);