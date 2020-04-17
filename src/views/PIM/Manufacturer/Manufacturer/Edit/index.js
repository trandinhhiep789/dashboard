import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    InputLanguageColumnList,
    GridMLObjectDefinition,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { MANUFACTURER_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_MANUFACTURER } from "../../../../../constants/keyCache";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            DataSource: [],
            ResultLanguage: [],
            Files: {},
            IsDeletedFile: false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                if (apiResult.ResultObject) {
                    const ResultLanguage = Object.assign([], this.state.ResultLanguage, apiResult.ResultObject.ResultLanguage);
                    const DataSource = Object.assign([], this.state.DataSource, apiResult.ResultObject);
                    this.setState({ DataSource, ResultLanguage, IsLoadDataComplete: true });
                }
            }
        });
        this.props.updatePagePath(EditPagePath);
    }

    valueChangeInputGrid(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.ResultLanguage[index], { [elementdata.Name]: elementdata.Value }, { HasChanged: true });
        const dataSource = Object.assign([], this.state.ResultLanguage, { [index]: rowGridData });
        this.setState({ ResultLanguage: dataSource });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Cập nhật nhà sản xuất: ${MLObject.ManufacturerName}`;
        MLObject.ActivityDetail = `Cập nhật nhà sản xuất: ${MLObject.ManufacturerName} ${"\n"}Mô tả: ${MLObject.Description}`;
        MLObject.ObjectID = "PIM_MANUFACTURER";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
    }

    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.ManufacturerName !== null);
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        if (this.state.IsDeletedFile) {
            MLObject.LogoImageURL = "";
        }
        var data = new FormData();
        data.append("LogoImageURL", this.state.Files.LogoImageURL);
        data.append("ManufactureObj", JSON.stringify(MLObject));
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then(apiResult => {
            if (!apiResult) {
                apiResult = {
                    IsError: true,
                    Message: "Lỗi kết nối đến máy chủ, Vui lòng kiểm tra lại kết nối mạng"
                };
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(PIMCACHE_MANUFACTURER)
                this.handleSubmitInsertLog(MLObject);
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
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Cập nhật nhãn hiệu"
                    IsAutoLayout={true}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    onHandleSelectedFile={this.handleSelectedFile}
                    BackLink={BackLink}
                    ref={this.searchref}
                    RequirePermission={MANUFACTURER_UPDATE}
                >
                    <InputGrid
                        name="ResultLanguage"
                        controltype="InputControl"
                        isHideHeaderToolbar={true}
                        listColumn={InputLanguageColumnList}
                        dataSource={this.state.ResultLanguage}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="10"
                        isDisabled={this.state.DataSource.IsSystem}
                        onValueChangeInputGrid={this.valueChangeInputGrid}
                    />
                </FormContainer>
            );
        }

        return <label>Đang nạp dữ liệu...</label>;
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
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
