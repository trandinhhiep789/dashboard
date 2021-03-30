import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    APIHostName, AddAPIPath, MLObjectDefinition,
    BackLink, AddPagePath, TitleFormAdd,
    lstDeliveryGoodsGroup, lstDeliveryAbilityDetail, widthModalAddDeliveryAbility,
    ApiSearchDeliveryGoods
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPRELATECACHE_WEEKDAY, ERPRELATECACHE_DELIVERYTIMEFRAME, ERPCOMMONCACHE_CARRIERTYPE, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_STORE } from "../../../../constants/keyCache";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { showModal, hideModal } from '../../../../actions/modal';
import ModalAddDeliveryAbility from '../components/ModalAddDeliveryAbility';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callDataDeliveryGoodsGroup = this.callDataDeliveryGoodsGroup.bind(this);
        // this.handleDataModalAddDelivery = this.handleDataModalAddDelivery.bind(this)
        this.handleDataSubmitDeliveryAbilityDetail = this.handleDataSubmitDeliveryAbilityDetail.bind(this)

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            // dataSourceDeliveryAbilityDetail: [],
            dataSourceDeliveryGoodsGroup: [],
            dataSubmitDeliveryGoodsGroup: [],
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.callDataDeliveryGoodsGroup();
    }

    handleDataSubmitDeliveryAbilityDetail() {
        const { dataSourceDeliveryGoodsGroup } = this.state
        let tempDataSubmit = []
        dataSourceDeliveryGoodsGroup.forEach(item => {
            if (this.state[item.DeliveryGoodsGroupID]) {
                tempDataSubmit.push({
                    ...item,
                    TotalAbility: this.state[item.DeliveryGoodsGroupID]
                })
            } else {
                tempDataSubmit.push({
                    ...item,
                    TotalAbility: 0
                })
            }
        })

        this.setState({
            dataSubmitDeliveryGoodsGroup: tempDataSubmit
        })

        return tempDataSubmit
    }

    handleSubmit(formData, MLObject) {
        const dtSubmitDeliveryGoodsGroup = this.handleDataSubmitDeliveryAbilityDetail()

        let tempMLObject = {
            OutputStoreID: MLObject.StoreID,
            DeliveryTimeFrameID: MLObject.DeliveryTimeFrameID,
            CarrierTypeID: MLObject.CarrierTypeID,
            WeekDaysList: MLObject.WeekDayID.toString(),
            Description: MLObject.Description,
            IsActived: MLObject.IsActived,
            IsSystem: MLObject.IsSystem,
            DeliveryAbilityDetailList: dtSubmitDeliveryGoodsGroup
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, tempMLObject).then(apiResult => {
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

    // handleModalItemInsert(data) {
    //     this.setState({
    //         dataSourceDeliveryAbilityDetail: data
    //     })
    // }

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
            } else {
                this.setState({
                    IsCallAPIError: !apiResult.IsError,
                });
                this.showMessage(apiResult.Message);
            }
        })
    }

    // handleDataModalAddDelivery() {
    //     const { dataSourceDeliveryAbilityDetail, dataSourceDeliveryGoodsGroup } = this.state
    //     const newDataGroup = dataSourceDeliveryGoodsGroup.map(item => {
    //         let flagDuplicate = false
    //         for (let index = 0; index < dataSourceDeliveryAbilityDetail.length; index++) {
    //             const element = dataSourceDeliveryAbilityDetail[index];

    //             if (item.DeliveryGoodsGroupID == element.DeliveryGoodsGroupID) {
    //                 item = { ...element }
    //                 flagDuplicate = true
    //             }
    //         }

    //         if (!flagDuplicate) {
    //             const { TotalAbility, ...child } = item
    //             item = { ...child }
    //         }

    //         return item
    //     })

    //     this.setState({
    //         dataSourceDeliveryGoodsGroup: newDataGroup
    //     })

    //     return newDataGroup
    // }

    // handleItemInsert() {
    //     const dataGoodsGroup = this.handleDataModalAddDelivery()

    //     this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
    //         title: 'Thêm chi tiết danh sách tải giao hàng',
    //         content: {
    //             text: <ModalAddDeliveryAbility
    //                 listColumn={lstDeliveryGoodsGroup}
    //                 dataSource={dataGoodsGroup}
    //                 multipleCheck={false}
    //                 IDSelectColumnName={"chkSelect"}
    //                 PKColumnName={"MaterialGroupID,ProductID"}
    //                 isHideHeaderToolbarGroupTextBox={true}
    //                 isHideHeaderToolbar={true}
    //                 // name={"ProductID"}
    //                 // value={"MaterialGroupID"}
    //                 onClickInsertItem={this.handleModalItemInsert.bind(this)}
    //             />
    //         },
    //         maxWidth: widthModalAddDeliveryAbility
    //     });
    // }

    handleItemDelete() {

    }

    handleItemEdit() {

    }

    handleChangeDeliveryAbilityDetail(value, rowItem, rowIndex) {
        this.setState({
            [rowItem.DeliveryGoodsGroupID]: value
        })
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <FormContainer
                FormName={TitleFormAdd}
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
                            value={false}
                        />
                    </div>

                </div>

                {/* <InputGridControl
                    name="lstDeliveryAbilityDetail"
                    title="Danh sách tải giao hàng"
                    // IDSelectColumnName={""}
                    // PKColumnName={""}
                    listColumn={lstDeliveryAbilityDetail}
                    dataSource={this.state.dataSourceDeliveryAbilityDetail}
                    onInsertClick={this.handleItemInsert.bind(this)}
                    onDeleteClick={this.handleItemDelete.bind(this)}
                    onEditClick={this.handleItemEdit.bind(this)}
                    ref={this.gridref}
                /> */}

                <InputGrid
                    name="lstDeliveryAbilityDetail"
                    controltype="GridControl"
                    headingTitle="Thêm chi tiết danh sách tải giao hàng"
                    colspan="12"
                    dataSource={this.state.dataSourceDeliveryGoodsGroup}
                    isHideHeaderToolbar={true}
                    isShowFooterToolbar={false}
                    listColumn={lstDeliveryGoodsGroup}
                    onChangeInputNumber={this.handleChangeDeliveryAbilityDetail.bind(this)}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
