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
    LoadAPIPath,
    lstDeliveryGoodsGroup,
    GridMLObjectDefinition,
    ApiSearchDeliveryGoods,
    UpdateAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPRELATECACHE_WEEKDAY, ERPRELATECACHE_DELIVERYTIMEFRAME, ERPCOMMONCACHE_CARRIERTYPE, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_STORE } from "../../../../constants/keyCache";
import { DELIVERYABILITY_UPDATE, DELIVERYABILITY_VIEW } from "../../../../constants/functionLists";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { fi } from "date-fns/locale";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this)
        this.callDataDeliveryGoodsGroup = this.callDataDeliveryGoodsGroup.bind(this)
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            dataSourceDeliveryGoodsGroup: [],
            dataSubmitDeliveryGoodsGroup: [],

        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);

        this.callDataDeliveryGoodsGroup();
    }

    callLoadData(id, dataSourceDeliveryGoodsGroup) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const arrAreaTmp = apiResult.ResultObject.WeekDayIdList.toString().split(",");
                apiResult.ResultObject.WeekDayID = arrAreaTmp;

                let tmpDataDetail = []
                let tmpDataDetail1 = []

                let { DeliveryAbilityDetailList, } = apiResult.ResultObject

                dataSourceDeliveryGoodsGroup && dataSourceDeliveryGoodsGroup.map((item, index) => {
                    const findElement = DeliveryAbilityDetailList.find(f => {
                        return f.DeliveryGoodsGroupID == item.DeliveryGoodsGroupID
                    })

                    if (!findElement) {
                        DeliveryAbilityDetailList.push(item)
                    }

                })

                this.setState({
                    DataSource: apiResult.ResultObject,
                    dataSourceDeliveryGoodsGroup: apiResult.ResultObject.DeliveryAbilityDetailList
                })
            }
        });
    }

    callDataDeliveryGoodsGroup() {
        const param = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, ApiSearchDeliveryGoods, param).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSourceDeliveryGoodsGroup: apiResult.ResultObject
                })
                this.callLoadData(this.props.match.params.id, apiResult.ResultObject);
            } else {
                this.setState({
                    IsCallAPIError: !apiResult.IsError,
                });
                this.showMessage(apiResult.Message);
            }
        })
    }


    handleSubmit(formData, MLObject) {



        const { dataSourceDeliveryGoodsGroup } = this.state

        const tmpDeliveryGoodsGroup = dataSourceDeliveryGoodsGroup.filter(item => {
            if (parseInt(item.TotalAbility) >= 0) {
                return item
            }
        })

        if (dataSourceDeliveryGoodsGroup.length <= 0) {
            this.showMessage("Danh sách chi tiết tải giao hàng không tồn tại.")
            return;
        }

        const dataDeliveryAbilityDetail = tmpDeliveryGoodsGroup.map(item => {
            return {
                ...item,
                TotalAbility: parseInt(item.TotalAbility)
            }
        })

        let tempMLObject = {
            DeliveryAbilityID: this.props.match.params.id,
            OutputStoreID: MLObject.StoreID,
            DeliveryTimeFrameID: MLObject.DeliveryTimeFrameID,
            CarrierTypeID: MLObject.CarrierTypeID,
            WeekDaysList: MLObject.WeekDayID.toString(),
            Description: MLObject.Description,
            IsActived: MLObject.IsActived,
            IsSystem: MLObject.IsSystem,
            DeliveryAbilityDetailList: dataDeliveryAbilityDetail
        }

        console.log("aaa", tempMLObject, MLObject)

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, tempMLObject).then(apiResult => {
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

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {

        const { dataSourceDeliveryGoodsGroup } = this.state
        console.log("dataSourceDeliveryGoodsGroup", dataSourceDeliveryGoodsGroup)

        const rowGridData = Object.assign({}, dataSourceDeliveryGoodsGroup[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], dataSourceDeliveryGoodsGroup, { [index]: rowGridData });
        this.setState({ dataSourceDeliveryGoodsGroup: dataSource , GridFormValidation: gridFormValidation });
    }



    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <FormContainer
                FormName={TitleFormEdit}
                MLObjectDefinition={MLObjectDefinition}
                dataSource={this.state.DataSource}
                listelement={[]}
                BackLink={BackLink}
                RequirePermission={DELIVERYABILITY_UPDATE}
                onSubmit={this.handleSubmit}
            >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbProvinceID"
                            colspan="8"
                            labelcolspan="4"
                            label="Khu vực"
                            // validatonList={[""]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Khu vực --"
                            loaditemcachekeyid={ERPCOMMONCACHE_PROVINCE}
                            valuemember="ProvinceID"
                            nameMember="ProvinceName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            disabled={true}
                            readOnly={true}
                            datasourcemember="ProvinceID" />

                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbOutputStoreID"
                            colspan="8"
                            labelcolspan="4"
                            label="kho"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPCOMMONCACHE_STORE}
                            valuemember="StoreID"
                            nameMember="StoreName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            isMultiSelect={false}
                            disabled={true}
                            readOnly={true}
                            datasourcemember="OutputStoreID" />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbDeliveryTimeFrameID"
                            colspan="8"
                            labelcolspan="4"
                            label="Khung giờ"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            placeholder="-- Vui lòng chọn --"
                            loaditemcachekeyid={ERPRELATECACHE_DELIVERYTIMEFRAME}
                            valuemember="DeliveryTimeFrameID"
                            nameMember="DeliveryTimeFrame"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            disabled={true}
                            readOnly={true}
                            datasourcemember="DeliveryTimeFrameID" />
                    </div>


                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbWeekDayID"
                            colspan="8"
                            labelcolspan="4"
                            label="Thứ áp dụng"
                            validatonList={["Comborequired"]}
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

                <InputGrid
                    name="lstDeliveryAbilityDetail"
                    controltype="GridControl"
                    headingTitle="Thêm chi tiết danh sách tải giao hàng"
                    colspan="12"
                    dataSource={this.state.dataSourceDeliveryGoodsGroup}
                    isHideHeaderToolbar={true}
                    listColumn={lstDeliveryGoodsGroup}
                    MLObjectDefinition={GridMLObjectDefinition}
                    // onChangeInputNumber={this.handleChangeDeliveryAbilityDetail.bind(this)}
                    onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                // onHandleSubmitGrid={}
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
