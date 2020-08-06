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
import { PARTNER_UPDATE } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_COUNTRY, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD, ERPCOMMONCACHE_STORE } from "../../../../../constants/keyCache";
import PartnerCoordinatorStore from "../../PartnerCoordinatorStore";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.initCombobox = this.initCombobox.bind(this);
        this.setValueCombobox = this.setValueCombobox.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.getFullAddress = this.getFullAddress.bind(this);
        this.onPartnerCoordinatorStoreChange = this.onPartnerCoordinatorStoreChange.bind(this);
        //this.getDataCombobox = this.getDataCombobox.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            Files: {},
            IsDeletedFile: false,
            Country: [],
            Province: [],
            District: [],
            Ward: [],
            EditElementList: EditElementList,
            PartnerCoordinatorStore: [],
            Store: [],
            FullAddress: ""

        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.initCombobox();
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                apiResult.ResultObject.IncorporationDate = apiResult.ResultObject.IncorporationDateString;
                this.setState({ DataSource: apiResult.ResultObject, PartnerCoordinatorStore: apiResult.ResultObject.PartnerCoordinatorStore ? apiResult.ResultObject.PartnerCoordinatorStore : [] });
                this.setValueCombobox(apiResult.ResultObject.CountryID, apiResult.ResultObject.ProvinceID, apiResult.ResultObject.DistrictID, apiResult.ResultObject.WardID);
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });

    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
    }

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
        //var country, province, district, ward = [];

        // quốc gia
        this.props.callGetCache(ERPCOMMONCACHE_COUNTRY).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Country: result.ResultObject.CacheData
                });
            }
        });

        // tỉnh thành phố
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });

        this.props.callGetCache(ERPCOMMONCACHE_STORE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Store: result.ResultObject.CacheData
                });   
            }
        });
    }

    setValueCombobox(c, p, d, w) {
        let country = [{ value: -1, label: "--Vui lòng chọn--" }];
        let province = [{ value: -1, label: "--Vui lòng chọn--" }];
        let district = [{ value: -1, label: "--Vui lòng chọn--" }];
        let ward = [{ value: -1, label: "--Vui lòng chọn--" }];

        let _EditElementList = this.state.EditElementList;
        _EditElementList.forEach(function (objElement) {
            if (objElement.name == "txtCountryID") {
                country = this.getDataCombobox(this.state.Country, "CountryID", "CountryName");
                objElement.listoption = country;
                if (c) {
                    objElement.value = c;
                }
            } else if (objElement.name == "txtProvinceID") {
                province = this.getDataCombobox(this.state.Province, "ProvinceID", "ProvinceName", "CountryID", c);
                objElement.listoption = province;
                if (p) {
                    objElement.value = p;
                }
            } else if (objElement.name == "txtDistrictID") {
                district = this.getDataCombobox(this.state.District, "DistrictID", "DistrictName", "ProvinceID", p);
                objElement.listoption = district;
                if (d) {
                    objElement.value = d;
                }
            } else if (objElement.name == "txtWardID") {
                ward = this.getDataCombobox(this.state.Ward, "WardID", "WardName", "DistrictID", d);
                objElement.listoption = ward;
                if (w) {
                    objElement.value = w;
                }
            }

        }.bind(this));
        this.setState({
            EditElementList: _EditElementList
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
        //console.log("formData", formData);
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
        //console.log("ward state", this.state.Ward);
        let country = [{ value: -1, label: "--Vui lòng chọn--" }];
        let province = [{ value: -1, label: "--Vui lòng chọn--" }];
        let district = [{ value: -1, label: "--Vui lòng chọn--" }];
        let ward = [{ value: -1, label: "--Vui lòng chọn--" }];

        let _EditElementList = this.state.EditElementList;
        _EditElementList.forEach(function (objElement) {
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
            EditElementList: _EditElementList,
            FullAddress: fullAddress
        });

        //console.log("onValueChange.Province", country, province, district, ward);
    }

    onPartnerCoordinatorStoreChange(list) {
        this.setState({ PartnerCoordinatorStore: list });
        //console.log("onPartnerCoordinatorStoreChange", list);
    }



    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        if (this.state.IsDeletedFile) {
            MLObject.PictureURL = "";
        }

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
        MLObject.PartnerCoordinatorStore_DeleteList = this.state.PartnerCoordinatorStore_DeleteList;

        var data = new FormData();
        data.append("LogoImageURL", this.state.Files.PictureURL);
        data.append("PartnerObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNER);
            }
        });
        //console.log("MLObject",MLObject);
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
                <React.Fragment>
                    <SimpleForm
                        FormName="Cập nhật đối tác"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={this.state.EditElementList}
                        onSubmit={this.handleSubmit}
                        onHandleSelectedFile={this.handleSelectedFile}
                        onValueChange={this.onValueChange}
                        FormMessage={this.state.CallAPIMessage}
                        IsErrorMessage={this.state.IsCallAPIError}
                        dataSource={this.state.DataSource}
                        BackLink={BackLink}
                        RequirePermission={PARTNER_UPDATE}
                        ref={this.searchref}>

                        {/* <br />
                        <PartnerCoordinatorStore
                            PartnerID={this.props.match.params.id}
                            partnerCoordinatorStore={this.state.PartnerCoordinatorStore}
                            Store={this.state.Store}
                            onPartnerCoordinatorStoreChange={this.onPartnerCoordinatorStoreChange}
                        /> */}
                    </SimpleForm>



                </React.Fragment>
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
