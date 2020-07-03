import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal } from '../../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../../constants/actionTypes';
import SearchModal from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import MD5Digest from "../../../../../common/library/cryptography/MD5Digest.js";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    GridMLCoordinatorStoreWardDefinition,
    InputCoordinatorStoreWardColumnList,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_ADD } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsShowCustomerAddress: false,
            DataSource: {}
        };
        this.searchref = React.createRef();
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
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }

    handleChange(formData, MLObject) {
        console.log('handleChange', formData, MLObject)
        if (formData.chkIsCheckCustomerAddress.value) {
            this.setState({
                IsShowCustomerAddress: true
            })
        }
    }

    render() {
        const { IsShowCustomerAddress } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <FormContainer
                FormName="Thêm định nghĩa kho điều phối giao hàng"
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                onSubmit={this.handleSubmit}
                BackLink={BackLink}
                onchange={this.handleChange.bind(this)}
            //RequirePermission={COORDINATORSTORE_ADD}
            >
                <div className="row">
                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect

                            name="cbShipmentOrderTypeID"
                            colspan="8"
                            labelcolspan="4"
                            label="loại yêu cầu xuất"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                            valuemember="ShipmentOrderTypeID"
                            nameMember="ShipmentOrderTypeName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />
                    </div>
                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect

                            name="cbPartnerID"
                            colspan="8"
                            labelcolspan="4"
                            label="đối tác"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                            valuemember="PartnerID"
                            nameMember="PartnerName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="PartnerID" />

                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect

                            name="cbStoreID"
                            colspan="8"
                            labelcolspan="4"
                            label="kho điều phối"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                            valuemember="StoreID"
                            nameMember="StoreName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="StoreID"
                            filterValue={10}
                            filterobj="CompanyID"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbSenderStoreID"
                            colspan="8"
                            labelcolspan="4"
                            label="kho gửi"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                            valuemember="StoreID"
                            nameMember="StoreName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="SenderStoreID"
                            filterValue={1}
                            filterobj="CompanyID"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            label="kiểm tra địa chỉ khách hàng"
                            name="chkIsCheckCustomerAddress"
                            datasourcemember="IsCheckCustomerAddress"
                            controltype="InputControl"
                            colspan="8"
                            labelcolspan="4"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                    <div className="col-md-6"></div>
                </div>

                <div className="row">
                    <CoordinatorStoreWard />


                </div>


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
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
