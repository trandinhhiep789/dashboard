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
import { MD_LEADADVICE_UPDATE } from './../../../../../constants/functionLists';


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

        if(MLObject.ProductID!==this.state.DataSource.ProductID){
            MLObject.ProductID=MLObject.ProductID[0].ProductID
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
        let dataSource = this.state.DataSource;
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
            dataSource = { ...dataSource, MainGroupID: valueMainGroupID, SubGroupID: "", ProductID: "" };
            arrProduct[1] = [];
            groupValue[1] = -1;
        }

        if (valueSubGroupID !== this.state.DataSource["SubGroupID"]) {
            dataSource = { ...dataSource, SubGroupID: valueSubGroupID, ProductID: "" };
        }

        changeState = { ...changeState, FilterObject: filterObject, DataSource: dataSource };

        console.log(changeState);
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
                    onchange={this.handleFormChange}
                    MLObjectDefinition={MLObjectDefinition}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    IsDisabledSubmitForm={this.state.DataSource.IsSystem}
                    RequirePermission={MD_LEADADVICE_UPDATE}
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
                        // disabled={this.state.DataSource.IsSystem}
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
                        // disabled={this.state.DataSource.IsSystem}
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
                        valuemember="SubGroupID"
                        validatonList={["Comborequired"]}
                        // value={this.state.DataSource.SubGroupID}
                        filterobj="MainGroupID"
                        filterValue={this.state.FilterObject.GroupValue[0]}
                        placeholder="Nhóm hàng"
                        disabled={this.state.DataSource.IsSystem}
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
                        isFilter={true}
                        value={this.state.DataSource.ProductID}
                        arrFieldFilter={['MainGroupID', 'SubGroupID']}
                        arrValueFilter={this.state.FilterObject.ArrayProduct}
                        validatonList={["Comborequired"]}
                        disabled={this.state.DataSource.IsSystem}
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
                        disabled={this.state.DataSource.IsSystem}
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
                        disabled={this.state.DataSource.IsSystem}
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
                        disabled={this.state.DataSource.IsSystem}
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
