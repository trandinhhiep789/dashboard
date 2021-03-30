import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    APIHostName,
    AddAPIPath,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    TitleFormEdit,
    LoadAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPRELATECACHE_WEEKDAY, ERPRELATECACHE_DELIVERYTIMEFRAME, ERPCOMMONCACHE_CARRIERTYPE, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_STORE } from "../../../../constants/keyCache";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this)
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("222", apiResult, id);
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const arrAreaTmp = apiResult.ResultObject.WeekDayIdList.toString().split(",");
                apiResult.ResultObject.WeekDaysList = arrAreaTmp;
            }
        });
    }


    handleSubmit(formData, MLObject) {

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

    handleChange(formData, MLObject) {

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <FormContainer
                FormName={TitleFormEdit}
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                BackLink={BackLink}
                onSubmit={this.handleSubmit}
            // onchange={this.handleChange.bind(this)}
            >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbProvinceID"
                            colspan="8"
                            labelcolspan="4"
                            label="Tỉnh /thành phố"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPCOMMONCACHE_PROVINCE}
                            valuemember="ProvinceID"
                            nameMember="ProvinceName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            filterrest="cbStoreID"
                            datasourcemember="ProvinceID" />

                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbStoreID"
                            colspan="8"
                            labelcolspan="4"
                            label="kho"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPCOMMONCACHE_STORE}
                            valuemember="StoreID"
                            nameMember="StoreName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            isMultiSelect={false}
                            filterobj="ProvinceID"
                            filterName="cbProvinceID"
                            filterValue=''
                            datasourcemember="StoreID" />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbDeliveryTimeFrameID"
                            colspan="8"
                            labelcolspan="4"
                            label="Khung giờ"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPRELATECACHE_DELIVERYTIMEFRAME}
                            valuemember="DeliveryTimeFrameID"
                            nameMember="DeliveryTimeFrame"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="DeliveryTimeFrameID" />
                    </div>


                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbCarrierTypeID"
                            colspan="8"
                            labelcolspan="4"
                            label="loại phương tiện"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPCOMMONCACHE_CARRIERTYPE}
                            valuemember="CarrierTypeID"
                            nameMember="CarrierTypeName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="CarrierTypeID" />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbWeekDayID"
                            colspan="8"
                            labelcolspan="4"
                            label="Thứ áp dụng"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            isMultiSelect={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPRELATECACHE_WEEKDAY}
                            valuemember="WeekDayID"
                            nameMember="WeekDayName"
                            controltype="InputControl"
                            value={-1}
                            // isselectedOp={true}
                            listoption={null}
                            datasourcemember="WeekDayID" />
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

                    <div className="col-md-12">
                        <FormControl.CheckBox
                            label="kích hoạt"
                            name="chkIsActived"
                            datasourcemember="IsActived"
                            controltype="InputControl"
                            colspan={10}
                            labelcolspan={2}
                            classNameCustom="customCheckbox"
                            value={true}
                        />
                    </div>

                    <div className="col-md-12">
                        <FormControl.CheckBox
                            label="hệ thống"
                            name="chkIsSystem"
                            datasourcemember="IsSystem"
                            controltype="InputControl"
                            colspan={10}
                            labelcolspan={2}
                            classNameCustom="customCheckbox"
                        />
                    </div>

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
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
