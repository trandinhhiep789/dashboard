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
import { ATTRIBUTE_CATEGORY_TYPE_ADD } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache } from "../../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.initCombobox = this.initCombobox.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        // this.handleGetCache = this.handleGetCache.bind(this);
        // this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            Files: {},
            Country: [],
            Province: [],
            District: [],
            Ward: [],
            AddElementList: AddElementList
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.initCombobox();
    }


    // handleClearLocalCache() {
    //     const cacheKeyID = "PIMCACHE.PIMATTRIBUTECATEGORYTYPE";
    //     const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
    //     return db.delete(cacheKeyID).then((result) => {
    //         const postData = {
    //             CacheKeyID: cacheKeyID,
    //             UserName: this.props.AppInfo.LoginInfo.Username,
    //             AdditionParamList: []
    //         };
    //         this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
    //             this.handleGetCache();
    //             //console.log("apiResult", apiResult)
    //         });
    //     }
    //     );
    // }


    // handleGetCache() {
    //     this.props.callGetCache("PIMCACHE.PIMATTRIBUTECATEGORYTYPE").then((result) => {
    //         console.log("handleGetCache: ", result);
    //     });
    // }

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
                    debugger;
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
        this.props.callGetCache("ERPCOMMONCACHE.COUNTRY").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Country: result.ResultObject.CacheData
                });
            }
        });

        // tỉnh thành phố
        this.props.callGetCache("ERPCOMMONCACHE.PROVINCE").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache("ERPCOMMONCACHE.DISTRICT").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache("ERPCOMMONCACHE.WARD").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });

       
    }

    onValueChange(elementname, elementvalue) {
        debugger;
        //console.log("this.state.Province", this.state.Province);
        var country, province, district, ward = [];

        let _AddElementList = this.state.AddElementList;
        _AddElementList.forEach(function (objElement) {
            if (elementname == "txtCountryID") {
                if (objElement.name == "txtCountryID") {
                    country = this.getDataCombobox(this.state.Country, "CountryID", "CountryName");
                    objElement.listoption = country;
                    objElement.value = elementvalue;
                } else if (objElement.name == "txtProvinceID") {
                    province = this.getDataCombobox(this.state.Province, "ProvinceID", "ProvinceName", "CountryID", elementvalue);
                    objElement.listoption = province;
                } else if (objElement.name == "txtDistrictID") {
                    objElement.listoption = district;
                } else if (objElement.name == "txtWardID") {
                    objElement.listoption = ward;
                }
            } else if (elementname == "txtProvinceID") {
                if (objElement.name == "txtProvinceID") {
                    province = this.getDataCombobox(this.state.Province, "ProvinceID", "ProvinceName");
                    objElement.listoption = province;
                    objElement.value = elementvalue;
                } else if (objElement.name == "txtDistrictID") {
                    district = this.getDataCombobox(this.state.District, "DistrictID", "DistrictName", "ProvinceID", elementvalue);
                    objElement.listoption = district;
                } else if (objElement.name == "txtWardID") {
                    objElement.listoption = ward;
                }

            } else if (elementname == "txtDistrictID") {
                if (objElement.name == "txtDistrictID") {
                    district = this.getDataCombobox(this.state.District, "DistrictID", "DistrictName");
                    objElement.listoption = district;
                    objElement.value = elementvalue;
                } else if (objElement.name == "txtWardID") {
                    ward = this.getDataCombobox(this.state.Ward, "WardID", "WardName", "DistrictID", elementvalue);
                    objElement.listoption = ward;
                }

            }

        }.bind(this));
        this.setState({
            AddElementList: _AddElementList
        });
    }


    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        var myDate = new Date(MLObject.IncorporationDate);
        myDate.setDate(myDate.getDate() + 1);
        MLObject.IncorporationDate = myDate;

        var data = new FormData();
        data.append("LogoImageURL", this.state.Files.PictureURL);
        data.append("PartnerObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
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
                //RequirePermission={ATTRIBUTE_CATEGORY_TYPE_ADD}
                ref={this.searchref}
            />
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
