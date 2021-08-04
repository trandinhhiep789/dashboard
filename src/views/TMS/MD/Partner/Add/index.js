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
import { PARTNER_ADD } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_COUNTRY, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../../constants/keyCache";
import PartnerCoordinatorStore from "../../PartnerCoordinatorStore";
import PartnerCustomerCom from './PartnerCustomer';
import PartnerServiceRequestTypeCom from './PartnerServiceRequestType';

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.initCombobox = this.initCombobox.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.setValueCombobox = this.setValueCombobox.bind(this);
        this.onPartnerCoordinatorStoreChange = this.onPartnerCoordinatorStoreChange.bind(this);
        this.getFullAddress = this.getFullAddress.bind(this);
        // this.handleGetCache = this.handleGetCache.bind(this);
        // this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.handlePartnerCustomer = this.handlePartnerCustomer.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            Files: {},
            Country: [],
            Province: [],
            District: [],
            Ward: [],
            AddElementList: AddElementList,
            PartnerID: "",
            PartnerCoordinatorStore: [],
            FullAddress: "",
            statePartnerCustomer: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.setValueCombobox();
        this.initCombobox();
        //window.location.reload(true);
    }

    // handleSubmitInsertLog(MLObject) {
    //     MLObject.ActivityTitle = `Thêm mới danh sách lý do hủy giao hàng: ${MLObject.CancelDeliveryReasonName}`;
    //     MLObject.ActivityDetail = `Thêm mới danh sách lý do hủy giao hàng: ${MLObject.CancelDeliveryReasonName} ${"\n"}Mô tả: ${MLObject.Description}`;
    //     MLObject.ObjectID = "MD_CANCELDELIVERYREASON";
    //     MLObject.ActivityUser = MLObject.CreatedUser;
    //     this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    // }

    // getCacheDataCombobox(cacheKeyID) {
    //     let listOption = [];
    //     this.props.callGetCache(cacheKeyID).then((result) => {
    //         //console.log("FormElement callGetCache: ", result)     
    //         if (!result.IsError && result.ResultObject.CacheData != null) {
    //             //console.log("FormElement listOption: ", listOption)
    //             listOption = result.ResultObject.CacheData;
    //         }
    //         else {
    //             console.log("ghi log cache lỗi", cacheKeyID);
    //         }
    //     });
    //     return listOption;
    // }

    getDataCombobox(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
        data.map((cacheItem) => {
            if (conditionName) {
                if (cacheItem[conditionName] == conditionValue) {
                    listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                }
            }
            else {
                listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
            }
        });
        return listOption;
    }

    initCombobox() {
        var country, province, district, ward = [];

        // quốc gia
        this.props.callGetCache(ERPCOMMONCACHE_COUNTRY).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Country: result.ResultObject.CacheData
                });
            }
        });

        // tỉnh thành phố
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });
        this.setState({
            IsLoadDataComplete: true
        });

    }

    setValueCombobox() {
        let country = [{ value: -1, label: "--Vui lòng chọn--" }];
        let province = [{ value: -1, label: "--Vui lòng chọn--" }];
        let district = [{ value: -1, label: "--Vui lòng chọn--" }];
        let ward = [{ value: -1, label: "--Vui lòng chọn--" }];

        let _AddElementList = this.state.AddElementList;
        _AddElementList.forEach(function (objElement) {
            if (objElement.name == "txtCountryID") {
                objElement.listoption = this.state.Country ? this.state.Country : country;
                objElement.value = -1;
            } else if (objElement.name == "txtProvinceID") {
                objElement.listoption = province;
                objElement.value = -1;
            } else if (objElement.name == "txtDistrictID") {
                objElement.listoption = district;
                objElement.value = -1;
            } else if (objElement.name == "txtWardID") {
                objElement.listoption = ward;
                objElement.value = -1;
            }


        }.bind(this));
        this.setState({
            AddElementList: _AddElementList
        });
    }


    getFullAddress(formData) {
        let fullAddress = "";

        if (formData.txtWardID && formData.txtWardID != "-1") {
            let ward = this.state.Ward.filter(x => x.WardID == formData.txtWardID);
            fullAddress += ward[0].WardName + ", ";
        }
        if (formData.txtDistrictID && formData.txtDistrictID != "-1") {
            let district = this.state.District.filter(x => x.DistrictID == formData.txtDistrictID);
            fullAddress += district[0].DistrictName + ", ";
        }
        if (formData.txtProvinceID && formData.txtProvinceID != "-1") {
            let province = this.state.Province.filter(x => x.ProvinceID == formData.txtProvinceID);
            fullAddress += province[0].ProvinceName;
        }

        if (fullAddress) {
            if (formData.txtAddress && formData.txtWardID && formData.txtWardID != "-1") {
                fullAddress = formData.txtAddress + ", " + fullAddress;
            } else {
                fullAddress = "";
            }
        }

        //console.log("full address", fullAddress);
        return fullAddress;

    }


    onValueChange(elementname, elementvalue, formData) {
        if (elementname == "txtPartnerID") {
            this.setState({ PartnerID: elementvalue });
        }

        let fullAddress = "";
        if (elementname == "txtCountryID") {
            fullAddress = "";
            formData.txtProvinceID = -1;
            formData.txtDistrictID = -1;
            formData.txtWardID = -1;
        } else if (elementname == "txtProvinceID") {
            fullAddress = "";
            formData.txtDistrictID = -1;
            formData.txtWardID = -1;
        } else if (elementname == "txtDistrictID") {
            fullAddress = "";
            formData.txtWardID = -1;
        } else if (elementname == "txtWardID" && formData.txtAddress) {
            fullAddress = this.getFullAddress(formData);
        } else if (elementname == "txtAddress") {
            fullAddress = this.getFullAddress(formData);
        }

        //console.log("this.state.Province", this.state.Province);
        let country = [{ value: -1, label: "--Vui lòng chọn--" }];
        let province = [{ value: -1, label: "--Vui lòng chọn--" }];
        let district = [{ value: -1, label: "--Vui lòng chọn--" }];
        let ward = [{ value: -1, label: "--Vui lòng chọn--" }];

        let _AddElementList = this.state.AddElementList;
        _AddElementList.forEach(function (objElement) {
            if (elementname == "txtCountryID") {
                if (objElement.name == "txtProvinceID") {
                    province = this.getDataCombobox(this.state.Province, "ProvinceID", "ProvinceName", "CountryID", elementvalue);
                    objElement.listoption = province;
                } else if (objElement.name == "txtDistrictID") {
                    objElement.listoption = district;
                } else if (objElement.name == "txtWardID") {
                    objElement.listoption = ward;
                }
            } else if (elementname == "txtProvinceID") {
                if (objElement.name == "txtDistrictID") {
                    district = this.getDataCombobox(this.state.District, "DistrictID", "DistrictName", "ProvinceID", elementvalue);
                    objElement.listoption = district;
                } else if (objElement.name == "txtWardID") {
                    objElement.listoption = ward;
                }

            } else if (elementname == "txtDistrictID") {
                if (objElement.name == "txtWardID") {
                    ward = this.getDataCombobox(this.state.Ward, "WardID", "WardName", "DistrictID", elementvalue);
                    objElement.listoption = ward;
                }

            }

            if (objElement.name == "txtFullAddress") {
                objElement.value = fullAddress;
                document.getElementsByName("txtFullAddress")[0].value = fullAddress;
            }

        }.bind(this));
        this.setState({
            AddElementList: _AddElementList,
            FullAddress: fullAddress
        });
    }


    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
    }

    onPartnerCoordinatorStoreChange(list, deleteList) {
        this.setState({ PartnerCoordinatorStore: list });
        //onsole.log("onPartnerCoordinatorStoreChange", list);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        if (MLObject.IncorporationDate) {
            let temp = MLObject.IncorporationDate.trim().split('/');
            let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
            myDate.setDate(myDate.getDate() + 1);
            MLObject.IncorporationDate = myDate;
        }

        if (MLObject.CountryID == -1) {
            MLObject.ProvinceID = -1;
            MLObject.DistrictID = -1;
            MLObject.WardID = -1;
        } else if (MLObject.ProvinceID == -1) {
            MLObject.DistrictID = -1;
            MLObject.WardID = -1;
        } else if (MLObject.DistrictID == -1) {
            MLObject.WardID = -1;
        }

        MLObject.FullAddress = this.state.FullAddress;
        MLObject.PartnerCoordinatorStore = this.state.PartnerCoordinatorStore;
        MLObject.lstPartner_Customer = this.state.statePartnerCustomer;

        var data = new FormData();
        data.append("LogoImageURL", this.state.Files.PictureURL);
        data.append("PartnerObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNER);
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog(MLObject);
            }
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

    handlePartnerCustomer(data) {
        this.setState({ statePartnerCustomer: data });
    }

    render() {
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <SimpleForm
                FormName="Thêm đối tác"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.AddElementList}
                onSubmit={this.handleSubmit}
                onHandleSelectedFile={this.handleSelectedFile}
                onValueChange={this.onValueChange}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={PARTNER_ADD}
                ref={this.searchref}>


                {/* <PartnerCoordinatorStore
                    PartnerID={this.state.PartnerID}
                    onPartnerCoordinatorStoreChange={this.onPartnerCoordinatorStoreChange}
                /> */}

                <PartnerCustomerCom
                    propsHandlePartnerCustomer={this.handlePartnerCustomer}
                />

                <PartnerServiceRequestTypeCom
                />
            </SimpleForm>

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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
