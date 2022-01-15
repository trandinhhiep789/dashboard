import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import FormContainer from './../../../../../common/components/FormContainer/index';
import ProductComboBox from './../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox';
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { ERPCOMMONCACHE_SHIPMENTORDERTYPE, ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP } from './../../../../../constants/keyCache';


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            DataSource: {},
            FilterObject: {
                GroupValue: [-1, -1],
                // MainGroupValue: -1,
                // SubGroupValue: -1,
                ArrayProduct: []
            },
            ValueObject: [-1, -1]
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {

                let changeState = this.state;
                let filterObject = changeState.FilterObject;
                let arrValueFilter = [[apiResult.ResultObject.MainGroupID], [apiResult.ResultObject.SubGroupID]];
                let groupValue = filterObject.GroupValue;
                let valueObject = changeState.ValueObject;

                valueObject = { ...valueObject, SubGroupID: apiResult.ResultObject.SubGroupID, ProductID: apiResult.ResultObject.ProductID };
                groupValue[0] = apiResult.ResultObject.MainGroupID;
                groupValue[1] = apiResult.ResultObject.SubGroupID;


                filterObject = { ...filterObject, GroupValue: groupValue, ArrayProduct: arrValueFilter };
                changeState = { ...changeState, DataSource: apiResult.ResultObject, FilterObject: filterObject, ValueObject: valueObject };
                this.setState(changeState);
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        // MLObject.ShipmentOrderTypeID=MLObject.ShipmentOrderTypeID[0];
        // MLObject.MainGroupID=MLObject.MainGroupID[0];
        // MLObject.SubGroupID=MLObject.SubGroupID[0];
        // MLObject.ProductID=MLObject.ProductID[0].ProductID;

        if (MLObject.ShipmentOrderTypeID != this.state.DataSource.ShipmentOrderTypeID) {
            MLObject.ShipmentOrderTypeID = MLObject.ShipmentOrderTypeID[0];
        } else {
            MLObject.ShipmentOrderTypeID = this.state.DataSource.ShipmentOrderTypeID;
        }

        if (MLObject.MainGroupID != this.state.DataSource.MainGroupID) {
            MLObject.MainGroupID = MLObject.MainGroupID[0];
        } else {
            MLObject.SubGroupID = this.state.DataSource.SubGroupID;
        }

        if (MLObject.SubGroupID != this.state.DataSource.SubGroupID) {
            MLObject.SubGroupID = MLObject.SubGroupID[0];
        } else {
            MLObject.SubGroupID = this.state.DataSource.SubGroupID;
        }

        if (MLObject.ProductID != this.state.DataSource.ProductID) {
            MLObject.ProductID = MLObject.ProductID[0].ProductID;
        } else {
            MLObject.ProductID = this.state.DataSource.ProductID;
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        });
    }

    handleFormChange(formData, MLObject) {
        if (!!formData.cbMainGroupID.value) {
            let value = formData.cbMainGroupID.value;

            let changeState = this.state;
            let filterObject = changeState.FilterObject;
            let arrProduct = filterObject.ArrayProduct;
            let groupValue = filterObject.GroupValue;
            let valueObject = changeState.ValueObject;

            valueObject = { ...valueObject, SubGroupID: -1, ProductID: -1 };
            arrProduct[0] = [value];
            groupValue[0] = value;
            filterObject = { ...filterObject, GroupValue: groupValue, ArrayProduct: arrProduct };
            changeState = { ...changeState, FilterObject: filterObject };

            this.setState(changeState);

            // formData.cbSubGroupID.value = "";
        }

        if (!!formData.cbSubGroupID.value) {
            let value = formData.cbSubGroupID.value;
            let changeState = this.state;
            let filterObject = changeState.FilterObject;
            let arrProduct = filterObject.ArrayProduct;
            let groupValue = filterObject.GroupValue;
            let valueObject = changeState.ValueObject;

            valueObject = { ...valueObject, SubGroupID: value, ProductID: -1 };
            groupValue[1] = value;
            arrProduct[1] = [value];
            filterObject = { ...filterObject, GroupValue: groupValue, ArrayProduct: arrProduct };
            changeState = { ...changeState, FilterObject: filterObject };

            this.setState(changeState);
        }


    }

    handleChangeField(name, value, label) {
        if (name == "cbMainGroupID") {
            // let changeState = this.state;
            // let valueObject = changeState.ValueObject;
            // valueObject[0] = value;
            // changeState = { ...changeState, ValueObject: valueObject };
            this.setState((state, props) => (state.ValueObject[0] = value));
        }
        else if (name == "cbSubGroupID") {
            // let changeState = this.state;
            // let valueObject = changeState.ValueObject;
            // valueObject[1] = value;
            // changeState = { ...changeState, ValueObject: valueObject };
            // this.setState(changeState);

            this.setState((state, props) => (state.ValueObject[1] = value));
        }
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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                // <SimpleForm
                //     FormName="Cập nhật danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại)"
                //     MLObjectDefinition={MLObjectDefinition}
                //     listelement={EditElementList}
                //     onSubmit={this.handleSubmit}
                //     FormMessage={this.state.CallAPIMessage}
                //     IsErrorMessage={this.state.IsCallAPIError}
                //     dataSource={this.state.DataSource}
                //     BackLink={BackLink}
                //     // RequirePermission={PACKAGETYPE_UPDATE}
                //     ref={this.searchref}
                // />


                <FormContainer
                    FormName="Cập nhật danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại)"
                    BackLink={BackLink}
                    IsAutoLayout={true}
                    listelement={[]}
                    onchange={this.handleFormChange.bind(this)}
                    MLObjectDefinition={MLObjectDefinition}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    IsSystem={this.state.DataSource.IsSystem}
                >
                    <FormControl.TextBox
                        controltype="InputControl"
                        datasourcemember="LeadAdviceID"
                        label="Mã tư vấn bán hàng"
                        name="txtLeadAdviceID"
                        readonly={true}
                        maxSize={150}
                        value=""
                        validatonList={["required"]}
                        readOnly={true}
                    />

                    <FormControl.FormControlComboBox
                        colspan="4"
                        labelcolspan="2"
                        controltype="InputControl"
                        datasourcemember="ShipmentOrderTypeID"
                        isautoloaditemfromcache={true}
                        IsLabelDiv={true}
                        isMulti={false}
                        label="Loại yêu cầu vận chuyển"
                        listoption={[]}
                        loaditemcachekeyid={ERPCOMMONCACHE_SHIPMENTORDERTYPE}
                        name="cbShipmentOrderTypeID"
                        nameMember="ShipmentOrderTypeName"
                        value={""}
                        valuemember="ShipmentOrderTypeID"
                        validatonList={["Comborequired"]}
                        placeholder="Loại yêu cầu vận chuyển"
                    // IsSystem={this.state.DataSource.IsSystem}
                    />
                    <FormControl.FormControlComboBox
                        colspan="4"
                        labelcolspan="2"
                        controltype="InputControl"
                        datasourcemember="MainGroupID"
                        isautoloaditemfromcache={true}
                        IsLabelDiv={true}
                        isMulti={false}
                        label="Ngành hàng"
                        listoption={[]}
                        loaditemcachekeyid={ERPCOMMONCACHE_MAINGROUP}
                        name="cbMainGroupID"
                        nameMember="MainGroupName"
                        value={""}
                        valuemember="MainGroupID"
                        validatonList={["Comborequired"]}
                        placeholder="Ngành hàng"
                        onValueChangeCustom={(name, value, label) => this.handleChangeField(name, value, label)}
                    // IsSystem={this.state.DataSource.IsSystem}
                    />
                    <FormControl.FormControlComboBox
                        key={this.state.ValueObject[0]}
                        colspan="4"
                        labelcolspan="2"
                        controltype="InputControl"
                        datasourcemember="SubGroupID"
                        isautoloaditemfromcache={true}
                        IsLabelDiv={true}
                        isMulti={false}
                        label="Nhóm hàng"
                        listoption={[]}
                        loaditemcachekeyid={ERPCOMMONCACHE_SUBGROUP}
                        name="cbSubGroupID"
                        nameMember="SubGroupName"
                        value={this.state.ValueObject[0]}
                        valuemember="SubGroupID"
                        validatonList={["Comborequired"]}
                        filterobj="MainGroupID"
                        filterValue={this.state.FilterObject.GroupValue[0]}
                        placeholder="Nhóm hàng"
                        onValueChangeCustom={(name, value, label) => this.handleChangeField(name, value, label)}
                    // IsSystem={this.state.DataSource.IsSystem}
                    />
                    <ProductComboBox
                        key={this.state.ValueObject[1]}
                        colspan="4"
                        labelcolspan="2"
                        label="sản phẩm"
                        placeholder="Tên sản phẩm"
                        controltype="InputControl"
                        datasourcemember="ProductID"
                        name="cbProductID"
                        validatonList={["Comborequired"]}
                        IsLabelDiv={true}
                        isMulti={false}
                        value={this.state.ValueObject[1]}
                        // disabled={IsUpdate}
                        isFilter={true}
                        arrFieldFilter={['MainGroupID', 'SubGroupID']}
                        arrValueFilter={this.state.FilterObject.ArrayProduct}
                    />
                    <FormControl.CheckBox
                        name="chkIsAdviceOtherProduct"
                        colspan="4"
                        labelcolspan="2"
                        label="Tư vấn sản phẩm khác:"
                        isautoloaditemfromcache={false}
                        controltype="InputControl"
                        value={false}
                        listoption={null}
                        datasourcemember="IsAdviceOtherProduct"
                        placeholder="---Vui lòng chọn---"
                        isMultiSelect={false}
                    />
                    <FormControl.CheckBox
                        name="chkIsActived"
                        colspan="4"
                        labelcolspan="2"
                        label="Hoạt động:"
                        isautoloaditemfromcache={false}
                        controltype="InputControl"
                        value={true}
                        listoption={null}
                        datasourcemember="IsActived"
                        placeholder="---Vui lòng chọn---"
                        isMultiSelect={false}
                    />
                    <FormControl.CheckBox
                        name="chkIsSystem"
                        colspan="4"
                        labelcolspan="2"
                        label="Hệ thống:"
                        isautoloaditemfromcache={false}
                        controltype="InputControl"
                        value={false}
                        listoption={null}
                        datasourcemember="IsSystem"
                        placeholder="---Vui lòng chọn---"
                        isMultiSelect={false}
                    />
                </FormContainer>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
