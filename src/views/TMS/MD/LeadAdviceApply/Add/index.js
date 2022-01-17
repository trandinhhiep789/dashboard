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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import FormContainer from './../../../../../common/components/FormContainer/index';
import ProductComboBox from './../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox';
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP } from './../../../../../constants/keyCache';
import { MD_LEADADVICE_ADD } from "../../../../../constants/functionLists";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {
                MainGroupID: "",
                SubGroupID: "",
                IsActived: true,
                IsSystem: false,
                ProductID: "",
                CreatedUser: "",
                LoginLogID: ""
            },
            FilterObject: {
                GroupValue: [-1, -1],
                ArrayProduct: []
            }
        };
    }

    componentDidMount() {
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ProductID = MLObject.ProductID[0].ProductID;
        MLObject.LeadAdviceID = this.props.LeadAdviceID;

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
        if (!this.state.IsCallAPIError) {
            if (this.props.closePopup) {
                this.props.closePopup();
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
        return (
            // <SimpleForm
            //     MLObjectDefinition={MLObjectDefinition} ƒ
            //     listelement={AddElementList}
            //     onSubmit={this.handleSubmit}
            //     FormMessage={this.state.CallAPIMessage}
            //     IsErrorMessage={this.state.IsCallAPIError}
            //     dataSource={dataSource}
            //     // BackLink={`/LeadAdvice/Detail/${this.props.LeadAdviceID}`}
            //     // RequirePermission={PACKAGETYPE_ADD}
            //     ref={this.searchref}
            // />

            <FormContainer
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
                    colspan="5"
                    labelcolspan="3"
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
                    colspan="5"
                    labelcolspan="3"
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
                    // key={this.state.FilterObject.GroupValue[1]}
                    colspan="5"
                    labelcolspan="3"
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
                    colspan="5"
                    labelcolspan="3"
                    name="chkIsActived"
                    label="Kích hoạt:"
                    controltype="InputControl"
                    value={true}
                    listoption={null}
                    datasourcemember="IsActived"
                    placeholder="---Vui lòng chọn---"
                />
                <FormControl.CheckBox
                    colspan="5"
                    labelcolspan="3"
                    name="chkIsSystem"
                    label="Hệ thống:"
                    controltype="InputControl"
                    value={false}
                    listoption={null}
                    datasourcemember="IsSystem"
                    placeholder="---Vui lòng chọn---"
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
