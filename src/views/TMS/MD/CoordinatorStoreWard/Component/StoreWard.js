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
            DataWard: []
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

    componentDidMount() {
        this.handleGetCacheWard()
        console.log("item",this.props.DataWard[this.props.index])
    }

    handleSubmit(From, MLObject) {
        let CoordinatorStoreWard_ItemList = this.props.DataWard;
        
        let dataWardItem = this.state.DataWard.filter((item, index) => {
            return item.WardID == MLObject.WardID
        })
        MLObject.WardName = dataWardItem[0].WardName

        CoordinatorStoreWard_ItemList.push(MLObject)
        if (this.props.onInputChangeObj != null) {
            this.props.onInputChangeObj(CoordinatorStoreWard_ItemList);
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
                dataSource={this.props.index != undefined ? this.props.DataWard[this.props.index] : null}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
                onchange={this.handleChange.bind(this)}
            >
                <div className="row">
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbProvinceID"
                            colspan="9"
                            labelcolspan="3"
                            disabled={IsSystem}
                            label="Tỉnh /thành phố"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.PROVINCE"
                            valuemember="ProvinceID"
                            nameMember="ProvinceName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="ProvinceID"
                            filterValue={2}
                            filterobj="CountryID"
                            filterrest="cbDistrictID,cbWardID"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbDistrictID"
                            colspan="9"
                            labelcolspan="3"
                            disabled={IsSystem}
                            label="Quận/huyện"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.DISTRICT"
                            valuemember="DistrictID"
                            nameMember="DistrictName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="DistrictID"
                            filterName="cbProvinceID"
                            filterobj="ProvinceID"
                            filterrest="cbWardID"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbWardID"
                            colspan="9"
                            labelcolspan="3"
                            disabled={IsSystem}
                            label="Phường/Xã"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.WARD"
                            valuemember="WardID"
                            nameMember="WardName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="WardID"
                            filterName="cbDistrictID"
                            filterValue=""
                            filterobj="DistrictID"
                        />
                    </div>

                    <div className="col-md-6">
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


const StoreWard = connect(mapStateToProps, mapDispatchToProps)(StoreWardCom);
export default StoreWard;