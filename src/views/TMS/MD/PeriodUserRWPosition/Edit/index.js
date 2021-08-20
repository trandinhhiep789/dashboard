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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PERIODUSERRWPOSITION_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import { ERPCOMMONCACHE_TMSREWARDPOSITION } from "../../../../../constants/keyCache";
import { toIsoStringCus } from "../../../../../utils/function";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            cssNotification: "notification-danger",
            iconNotification: "fa fa-exclamation"
        };
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        window.addEventListener('keydown', function (e) { if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) { if (e.target.nodeName == 'INPUT' && e.target.type == 'text') { e.preventDefault(); return false; } } }, true);
        this.callLoadData();

    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    Username: apiResult.ResultObject.UserName
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    handleChange(formData, MLObject) {

    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    onChangeUser(name, objUser) {
        if (name == "StoreUser") {
            let validationStoreUser = ""
            if (objUser.value == "") {
                validationStoreUser = "vui lòng chọn nhân viên";
            }

            let objStoreUser = {
                UserName: objUser.value,
                FullName: objUser.FullName
            }
            this.setState({
                objStoreUser: objStoreUser,
                validationStoreUser: validationStoreUser
            });
        }
        else {
            this.setState({
                Username: objUser.value,
                DepartmentName: objUser.DepartmentName,
                PositionName: objUser.PositionName,
                Address: objUser.Address,
                FullName: objUser.label
            });
            //console.log("objUser", objUser);
            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                //this.callLoadData(postData);

            }
        }
    }

    // Convert 'D/M/YY' to Date()
    mdyToDate(mdy) {
        var d;
        try {
            d = mdy.split(/[\/\-\.]/, 3);
        }
        catch (err) {
            return mdy;
        }

        if (d.length != 3) return null;

        // Check if date is valid
        var mon = parseInt(d[1]),
            day = parseInt(d[0]),
            year = parseInt(d[2]);
        if (d[2].length == 2) year += 2000;
        if (day <= 31 && mon <= 12 && year >= 2015)
            return new Date(year, mon - 1, day);

        return null;
    }

    handleSubmit(formData, MLObject) {
        MLObject.PeriodUserRWPositionID = this.props.match.params.id;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.UserName = this.state.Username;

        //console.log("estimate ---", MLObject);
        var dates = {
            convert: function (d) {
                // Converts the date in d to a date-object. The input can be:
                //   a date object: returned without modification
                //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
                //   a number     : Interpreted as number of milliseconds
                //                  since 1 Jan 1970 (a timestamp) 
                //   a string     : Any format supported by the javascript engine, like
                //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
                //  an object     : Interpreted as an object with year, month and date
                //                  attributes.  **NOTE** month is 0-11.
                return (
                    d.constructor === Date ? d :
                        d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                            d.constructor === Number ? new Date(d) :
                                d.constructor === String ? new Date(d) :
                                    typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                        NaN
                );
            },
            compare: function (a, b) {
                // Compare two dates (could be of any type supported by the convert
                // function above) and returns:
                //  -1 : if a < b
                //   0 : if a = b
                //   1 : if a > b
                // NaN : if a or b is an illegal date
                // NOTE: The code inside isFinite does an assignment (=).
                return (
                    isFinite(a = this.convert(a).valueOf()) &&
                        isFinite(b = this.convert(b).valueOf()) ?
                        (a > b) - (a < b) :
                        NaN
                );
            },
            inRange: function (d, start, end) {
                // Checks if date in d is between dates in start and end.
                // Returns a boolean or NaN:
                //    true  : if d is between start and end (inclusive)
                //    false : if d is before start or after end
                //    NaN   : if one or more of the dates is illegal.
                // NOTE: The code inside isFinite does an assignment (=).
                return (
                    isFinite(d = this.convert(d).valueOf()) &&
                        isFinite(start = this.convert(start).valueOf()) &&
                        isFinite(end = this.convert(end).valueOf()) ?
                        start <= d && d <= end :
                        NaN
                );
            }
        }
        MLObject.ApplyFromDate = this.mdyToDate(MLObject.ApplyFromDate);
        MLObject.ApplyToDate = this.mdyToDate(MLObject.ApplyToDate);

        // let a = this.mdyToDate(MLObject.ApplyFromDate);
        // console.log("MLObject.ApplyFromDate", a)

        //kiểm tra khoản thời gian phải cùng tháng, năm
        if (MLObject.ApplyFromDate.getFullYear() != MLObject.ApplyToDate.getFullYear()) {
            this.addNotification("Vui lòng chọn cùng năm.", true);
            return;
        } else if (MLObject.ApplyFromDate.getMonth() != MLObject.ApplyToDate.getMonth()) {
            this.addNotification("Vui lòng chọn cùng tháng.", true);
            return;
        }
        
        let validDate = dates.compare(MLObject.ApplyFromDate, MLObject.ApplyToDate);
        if (validDate == 1) {
            this.addNotification("Ngày khai báo vị trí thưởng theo khoảng thời gian không hợp lệ. Vui lòng kiểm tra lại.", true);
        } else if (!MLObject.UserName) {
            this.addNotification("Vui lòng chọn người dùng.", true);
        }
        else {

            MLObject.ApplyFromDate = toIsoStringCus(new Date(MLObject.ApplyFromDate).toISOString());
            MLObject.ApplyToDate = toIsoStringCus(new Date(MLObject.ApplyToDate).toISOString());

            // if (MLObject.ApplyFromDate.getMonth) {
            //     MLObject.ApplyFromDate.setDate(MLObject.ApplyFromDate.getDate() + 1);
            // } else {
            //     MLObject.ApplyFromDate = this.state.DataSource.ApplyFromDate;
            // }

            // if (MLObject.ApplyToDate.getMonth) {
            //     MLObject.ApplyToDate.setDate(MLObject.ApplyToDate.getDate() + 1);
            // } else {
            //     MLObject.ApplyToDate = this.state.DataSource.ApplyToDate;
            // }

            this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if (!apiResult.IsError) {
                    //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
                }
                this.showMessage(apiResult.Message);
            });
        }

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

            let listOption = [];
            if (this.state.DataSource.UserName) {
                listOption.push({ value: this.state.DataSource.UserName, name: this.state.DataSource.FullName, label: this.state.DataSource.FullName });
            }


            return (
                // <SimpleForm
                //     FormName="Cập nhật vị trí thưởng theo khoảng thời gian"
                //     MLObjectDefinition={MLObjectDefinition}
                //     listelement={EditElementList}
                //     onSubmit={this.handleSubmit}
                //     FormMessage={this.state.CallAPIMessage}
                //     IsErrorMessage={this.state.IsCallAPIError}
                //     dataSource={this.state.DataSource}
                //     BackLink={BackLink}
                //     RequirePermission={REWARDCOMPUTESCHEDULE_UPDATE}
                //     ref={this.searchref}
                // />

                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName="Cập nhật vị trí thưởng theo khoảng thời gian"
                        MLObjectDefinition={MLObjectDefinition}
                        IsAutoLayout={true}
                        listelement={[]}
                        onSubmit={this.handleSubmit}
                        FormMessage={this.state.CallAPIMessage}
                        IsErrorMessage={this.state.IsCallAPIError}
                        dataSource={this.state.DataSource}
                        BackLink={BackLink}
                        onchange={this.handleChange.bind(this)}
                        RequirePermission={PERIODUSERRWPOSITION_UPDATE}
                    >

                        <MultiSelectComboBox
                            name="UserName"
                            labelcolspan={3} colspan={6} rowspan={8}
                            label="mã người dùng"
                            disabled={false}
                            IsLabelDiv={true}
                            isautoloaditemfromcache={false}
                            onChange={this.onChangeUser.bind(this)}
                            //controltype="InputControl"
                            value={listOption}
                            listoption={listOption}
                            isMultiSelect={false}
                            datasourcemember="UserName"
                            validationErrorMessage={''}
                            validatonList={["Comborequired"]}
                            isRequired={true}
                        />


                        <FormControl.FormControlComboBox
                            name="RewardPositionID"
                            label="mã vị trí thưởng"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_TMSREWARDPOSITION}
                            valuemember="RewardPositionID"
                            nameMember="RewardPositionName"
                            // filterobj={"CompanyID"}
                            // filterValue={"10"}
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="RewardPositionID"
                            labelcolspan={3} colspan={6} rowspan={8}
                            validatonList={["Comborequired"]}
                        />

                        <FormControl.ElementDatetime
                            name="ApplyFromDate"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="áp dụng từ ngày"
                            placeholder="áp dụng từ ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ApplyFromDateString"
                            labelcolspan={3} colspan={6} rowspan={8}
                            validatonList={["required"]}
                        />

                        <FormControl.ElementDatetime
                            name="ApplyToDate"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="áp dụng đến ngày"
                            placeholder="Áp dụng đến ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ApplyToDateString"
                            labelcolspan={3} colspan={6} rowspan={8}
                            validatonList={["required"]}
                        />

                        <FormControl.CheckBox
                            name="chkIsActived"
                            // disabled={this.state.IsSystem}
                            // readOnly={this.state.IsSystem}
                            label="kích hoạt"
                            controltype="InputControl"
                            value={true}
                            datasourcemember="IsActived"
                            classNameCustom="customCheckbox"
                            labelcolspan={3} colspan={6} rowspan={8}
                        />

                        <FormControl.CheckBox
                            name="chkIsSystem"
                            readOnly={false}
                            label="Hệ thống"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsSystem"
                            classNameCustom="customCheckbox"
                            labelcolspan={3} colspan={6} rowspan={8}
                        />
                    </FormContainer>
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
