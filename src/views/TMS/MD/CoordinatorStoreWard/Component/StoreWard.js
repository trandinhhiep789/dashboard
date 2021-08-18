import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import {
    MLObjectStoreWardItem,
    ElementSenderQHPXList,
    GridMLSenderQTQHPX
} from '../constants'

class StoreWardCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGetCacheWard = this.handleGetCacheWard.bind(this);
        this.state = {
            IsSystem: false,
            DataWard: [],
            DataDistrict: [],
            // DataProvince: [],
        }
    }

    handleGetCacheWard() {
        const { DataSource } = this.state;
        this.props.callGetCache('ERPCOMMONCACHE.WARD').then(apiResult => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    DataWard: apiResult.ResultObject.CacheData
                })
            }
        });
    }

    handleGetCacheDistrict() {
        const { DataSource } = this.state;
        this.props.callGetCache('ERPCOMMONCACHE.DISTRICT').then(apiResult => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    DataDistrict: apiResult.ResultObject.CacheData
                })
                this.handleGetCacheWard()
            }
        });
    }

    componentDidMount() {
        this.handleGetCacheDistrict()
    }

    handleSubmit(formData, MLObject) {
        let CoordinatorStoreWard_ItemList = this.props.DataSource;
        console.log(formData, MLObject, this.props.dataSource);
        let formDatanew = [];

        let dataDistrictItem = this.state.DataDistrict.filter((item, index) => {
            return item.DistrictID == MLObject.DistrictID
        })



        if (this.props.index != undefined) {


            let dataWardItem = this.state.DataWard.filter((item, index) => {
                return item.WardID == MLObject.WardID
            })

            MLObject.ProvinceName = dataDistrictItem[0].ProvinceName;
            MLObject.DistrictName = dataDistrictItem[0].DistrictName;
            MLObject.WardName = dataWardItem[0].WardName;


            const isExitItem = CoordinatorStoreWard_ItemList.filter(x => x.WardID === MLObject.WardID).length;

            if (isExitItem == 0 || this.props.PageInfo == "Edit") {
                formDatanew = Object.assign([], CoordinatorStoreWard_ItemList, { [this.props.index]: MLObject });

            } else {
                formData.cbWardID.ErrorLst.IsValidatonError = true;
                formData.cbWardID.ErrorLst.ValidatonErrorMessage = "Vui lòng chọn phường/xã khác.";
                return
            }



            const result = {
                IsError: false,
                Message: 'Thêm mới phường/xã địa bàn thành công'
            }
            if (this.props.onInputChangeObj != null) {
                this.props.onInputChangeObj(formDatanew, result);
            }
        }
        else {

            if (MLObject.WardID.length > 0) {

                MLObject.WardID.map((item, index) => {
                    // let objItem = {};
                    let objItem = { ...MLObject };
                    let dataWardItem = this.state.DataWard.filter((item1, index1) => {
                        return item1.WardID == item
                    })

                    objItem.ProvinceID = MLObject.ProvinceID;
                    objItem.ProvinceName = dataDistrictItem[0].ProvinceName;

                    objItem.DistrictID = MLObject.DistrictID;
                    objItem.DistrictName = dataDistrictItem[0].DistrictName;

                    objItem.WardID = item;
                    objItem.WardName = dataWardItem[0].WardName;

                    if (CoordinatorStoreWard_ItemList.length > 0) {

                        const isExitItem = CoordinatorStoreWard_ItemList.filter(x => x.WardID === objItem.WardID).length;
                        if (isExitItem == 0) {
                            CoordinatorStoreWard_ItemList.push(objItem)
                        }
                    }
                    else {
                        CoordinatorStoreWard_ItemList.push(objItem)
                    }

                    return objItem;
                })
            }
            const result = {
                IsError: false,
                Message: 'Thêm mới phường/xã địa bàn thành công'
            }
            if (this.props.onInputChangeObj != null) {
                this.props.onInputChangeObj(CoordinatorStoreWard_ItemList, result);
            }
        }



    }

    handleChange(formData, MLObject) {

    }

    render() {
        const AddElementListStoreWard = []
        const { IsSystem } = this.state;
        return (
            <FormContainer
                MLObjectDefinition={MLObjectStoreWardItem}
                listelement={[]}
                dataSource={this.props.index != undefined ? this.props.DataSource[this.props.index] : null}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
                onchange={this.handleChange.bind(this)}
            >
                <div className="row">
                    <div className="col-md-12">
                        <FormControl.FormControlComboBox
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="ProvinceID"
                            disabled={IsSystem}
                            filterobj="CountryID"
                            filterrest="cbDistrictID,cbWardID"
                            filterValue={2}
                            isautoloaditemfromcache={true}
                            label="Tỉnh/thành phố"
                            labelcolspan="3"
                            listoption={[]}
                            loaditemcachekeyid="ERPCOMMONCACHE.PROVINCE"
                            name="cbProvinceID"
                            nameMember="ProvinceName"
                            validatonList={["Comborequired"]}
                            value={-1}
                            valuemember="ProvinceID"
                        />
                    </div>
                    <div className="col-md-12">
                        <FormControl.FormControlComboBox
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="DistrictID"
                            disabled={IsSystem}
                            filterName="cbProvinceID"
                            filterobj="ProvinceID"
                            filterrest="cbWardID"
                            isautoloaditemfromcache={true}
                            label="Quận/huyện"
                            labelcolspan="3"
                            listoption={[]}
                            loaditemcachekeyid="ERPCOMMONCACHE.DISTRICT"
                            name="cbDistrictID"
                            nameMember="DistrictName"
                            validatonList={["Comborequired"]}
                            value={-1}
                            valuemember="DistrictID"
                        />
                    </div>
                    <div className="col-md-12">
                        <FormControl.FormControlComboBox
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="WardID"
                            disabled={IsSystem}
                            filterName="cbDistrictID"
                            filterobj="DistrictID"
                            filterValue=""
                            isautoloaditemfromcache={true}
                            isMultiSelect={this.props.isMultiSelectWard}
                            label="Phường/Xã"
                            labelcolspan="3"
                            listoption={[]}
                            loaditemcachekeyid="ERPCOMMONCACHE.WARD"
                            name="cbWardID"
                            nameMember="WardName"
                            validatonList={["Comborequired"]}
                            value={-1}
                            valuemember="WardID"
                        />
                    </div>

                    <div className="col-md-12">
                        <FormControl.CheckBox
                            name="chkIsSystem"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="hệ thống"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsSystem"
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
    }
}

const mapDispatchToProps = dispatch => {
    return {

        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    }
}

StoreWardCom.defaultProps = {
    PageInfo: ""
};

const StoreWard = connect(mapStateToProps, mapDispatchToProps)(StoreWardCom);
export default StoreWard;