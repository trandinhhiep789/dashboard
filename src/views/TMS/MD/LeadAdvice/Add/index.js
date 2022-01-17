import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { ERPCOMMONCACHE_SHIPMENTORDERTYPE, ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP } from './../../../../../constants/keyCache';
import FormContainer from './../../../../../common/components/FormContainer/index';
import ProductComboBox from './../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox';
import { MD_LEADADVICE_ADD } from "../../../../../constants/functionLists";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {
                IsActived: true,
                MainGroupID: "",
                ProductID: "",
                ShipmentOrderTypeID: "",
                SubGroupID: ""
            },
            FilterObject: {
                GroupValue: [-1, -1],
                ArrayProduct: []
            }
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ProductID = MLObject.ProductID[0].ProductID;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {

            }
            this.showMessage(apiResult.Message);
        });
    }

    handleFormChange(formData, MLObject) {
        let dataSource = [];
        for (const [key, value] of Object.entries(formData)) {
            dataSource.push([value.datasourcemember, value.value]);
        }

        dataSource = Object.fromEntries(dataSource);

        let valueMainGroupID = formData.cbMainGroupID.value;
        let valueSubGroupID = formData.cbSubGroupID.value;
        let changeState = this.state;
        let filterObject = changeState.FilterObject;
        let arrProduct = filterObject.ArrayProduct;
        let groupValue = filterObject.GroupValue;

        groupValue[0] = valueMainGroupID;
        groupValue[1] = valueSubGroupID;
        arrProduct[0] = [valueMainGroupID];
        arrProduct[1] = [valueSubGroupID];
        filterObject = { ...filterObject, ArrayProduct: arrProduct, GroupValue: groupValue };

        if (valueMainGroupID !== this.state.DataSource["MainGroupID"]) {
            dataSource = { ...dataSource, SubGroupID: "", ProductID: "" };
            arrProduct[1] = [];
            groupValue[1] = -1;
        }

        if (valueSubGroupID !== this.state.DataSource["SubGroupID"]) {
            dataSource = { ...dataSource, ProductID: "" };
        }

        changeState = { ...changeState, FilterObject: filterObject, DataSource: dataSource };
        this.setState(changeState);

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
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            // <SimpleForm
            //     FormName="Thêm danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại)"
            //     MLObjectDefinition={MLObjectDefinition} ƒ
            //     listelement={AddElementList}
            //     onSubmit={this.handleSubmit}
            //     FormMessage={this.state.CallAPIMessage}
            //     IsErrorMessage={this.state.IsCallAPIError}
            //     dataSource={dataSource}
            //     BackLink={BackLink}
            //     // RequirePermission={PACKAGETYPE_ADD}
            //     ref={this.searchref}
            // />

            <FormContainer
                FormName="Thêm danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (cùng loại)"
                BackLink={BackLink}
                IsAutoLayout={true}
                listelement={[]}
                onchange={this.handleFormChange}
                MLObjectDefinition={MLObjectDefinition}
                onSubmit={this.handleSubmit}
                dataSource={this.state.DataSource}
                RequirePermission={MD_LEADADVICE_ADD}
            >
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
                />
                <FormControl.FormControlComboBox
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
                    value={""}
                    valuemember="SubGroupID"
                    validatonList={["Comborequired"]}
                    filterValue={this.state.FilterObject.GroupValue[0]}
                    filterobj="MainGroupID"
                    placeholder="Nhóm hàng"
                />
                <ProductComboBox
                    key={this.state.FilterObject.GroupValue[1]}
                    colspan="4"
                    labelcolspan="2"
                    label="sản phẩm"
                    placeholder="Tên sản phẩm"
                    controltype="InputControl"
                    datasourcemember="ProductID"
                    name="cbProductID"
                    IsLabelDiv={true}
                    isMulti={false}
                    value={""}
                    isFilter={true}
                    arrFieldFilter={['MainGroupID', 'SubGroupID']}
                    arrValueFilter={this.state.FilterObject.ArrayProduct}
                    validatonList={["Comborequired"]}
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
                    label="Kích hoạt:"
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
