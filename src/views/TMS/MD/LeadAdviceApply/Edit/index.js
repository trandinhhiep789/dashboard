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
import { ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP } from './../../../../../constants/keyCache';
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
            FilterObject: {
                GroupValue: [-1, -1],
                ArrayProduct: []
            },
            ValueObject: [-1, -1],
            DataSource: {
                MainGroupID: "",
                SubGroupID: "",
                IsActived: true,
                IsSystem: false,
                ValueProduct: [],
                ProductID: "",
                CreatedUser: "",
                LoginLogID: ""
            },
        };
    }

    componentDidMount() {
        const id = this.props.LeadAdviceApplyID;

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

                let dataSource = changeState.DataSource;
                dataSource = { ...dataSource, ...apiResult.ResultObject, ValueProductID: apiResult.ResultObject.ProductID };

                changeState = { ...changeState, DataSource: dataSource, FilterObject: filterObject, ValueObject: valueObject };
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
        MLObject.LeadAdviceID = this.props.LeadAdviceID;
        MLObject.LeadAdviceApplyID = this.props.LeadAdviceApplyID;

        // if (MLObject.ProductID != this.state.DataSource.ProductID) {
        //     MLObject.ProductID = MLObject.ProductID[0].ProductID;
        // } else {
        //     MLObject.ProductID = this.state.DataSource.ProductID;
        // }

        if (this.state.DataSource.ValueProductID.length == 0) {
            MLObject.ProductID = -1;
        }
        else {
            if (!!this.state.DataSource.ValueProductID[0].ProductID) {
                MLObject.ProductID = this.state.DataSource.ValueProductID[0].ProductID;
            }
            else {
                MLObject.ProductID = -1;
            }
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
        let valueMainGroupID = formData.cbMainGroupID.value;
        let valueSubGroupID = formData.cbSubGroupID.value;
        let dataSource = [];

        for (const [key, values] of Object.entries(formData)) {
            dataSource.push([values.datasourcemember, values.value]);
        }

        dataSource = Object.fromEntries(dataSource);

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
            dataSource = { ...dataSource, MainGroupID: valueMainGroupID, SubGroupID: "", ValueProductID: [] };
            arrProduct[1] = [];
            groupValue[1] = -1;
        }

        if (valueSubGroupID !== this.state.DataSource["SubGroupID"]) {
            dataSource = { ...dataSource, SubGroupID: valueSubGroupID, ValueProductID: [] };
        }

        changeState = { ...changeState, FilterObject: filterObject, DataSource: dataSource };
        this.setState(changeState);

    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            if (!this.state.IsCallAPIError) {
                if (this.props.closePopup) {
                    this.props.closePopup();
                }
            }
        }
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

        if (this.state.IsLoadDataComplete) {
            return (
                // <SimpleForm
                //     MLObjectDefinition={MLObjectDefinition}
                //     listelement={EditElementList}
                //     onSubmit={this.handleSubmit}
                //     FormMessage={this.state.CallAPIMessage}
                //     IsErrorMessage={this.state.IsCallAPIError}
                //     dataSource={this.state.DataSource}
                //     // BackLink={`/LeadAdvice/Detail/${this.props.LeadAdviceID}`}
                //     // RequirePermission={PACKAGETYPE_UPDATE}
                //     ref={this.searchref}
                // />

                <FormContainer
                    // BackLink={BackLink}
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
                        datasourcemember="LeadAdviceApplyID"
                        label="Mã"
                        name="txtLeadAdviceApplyID"
                        maxSize={150}
                        value=""
                        validatonList={["required"]}
                        readOnly={true}

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
                        disabled={this.state.DataSource.IsSystem}
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
                        filterobj="MainGroupID"
                        filterValue={this.state.FilterObject.GroupValue[0]}
                        placeholder="Nhóm hàng"
                        value={""}
                        disabled={this.state.DataSource.IsSystem}
                    />
                    <ProductComboBox
                        // key={this.state.FilterObject.GroupValue[1]}
                        colspan="4"
                        labelcolspan="2"
                        label="sản phẩm"
                        placeholder="Tên sản phẩm"
                        controltype="InputControl"
                        datasourcemember="ValueProductID"
                        name="cbValueProductID"
                        IsLabelDiv={true}
                        isMulti={false}
                        isFilter={true}
                        value={this.state.DataSource.ValueProductID}
                        arrFieldFilter={['MainGroupID', 'SubGroupID']}
                        arrValueFilter={this.state.FilterObject.ArrayProduct}
                        // validatonList={["Comborequired"]}
                        disabled={this.state.DataSource.IsSystem}
                    />
                    <FormControl.CheckBox
                        name="chkIsActived"
                        colspan="4"
                        labelcolspan="2"
                        label="Kích hoạt:"
                        controltype="InputControl"
                        value={true}
                        datasourcemember="IsActived"
                        placeholder="---Vui lòng chọn---"
                        disabled={this.state.DataSource.IsSystem}
                    />
                    <FormControl.CheckBox
                        name="chkIsSystem"
                        colspan="4"
                        labelcolspan="2"
                        label="Hệ thống:"
                        controltype="InputControl"
                        value={false}
                        datasourcemember="IsSystem"
                        placeholder="---Vui lòng chọn---"
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
