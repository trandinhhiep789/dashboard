import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
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
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_UPDATE } from "../../../../constants/functionLists";
import { callGetCache } from "../../../../actions/cacheAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            DataSource: [],
            ResultLanguage: [],
            Files: {},
            IsDeletedFile: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }
    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
        });
    }



    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.BrandName !== null);
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                // this.handleClearLocalCache();
            }
        });
    }


    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
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
                    FormName="Cập nhật yêu cầu vận chuyển"
                    IsAutoLayout={false}
                    BackLink={BackLink}
                >
                    <div className="card">
                        <div class="card-title">
                            <h4 class="title">Địa chỉ</h4>
                        </div>
                        <div className="card-body">
                            <FormControl.TextBox
                                name="txtProductID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                label="mã sản phẩm"
                                placeholder="Mã sản phẩm"
                                controltype="InputControl"
                                value={"a"}
                                datasourcemember="ProductID"
                            />

                            <FormControl.TextBox
                                name="txtProductID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                label="mã sản phẩm"
                                placeholder="Mã sản phẩm"
                                controltype="InputControl"
                                value={"a"}
                                datasourcemember="ProductID"
                            />
                        </div>
                        
                    </div>

                    <div className="card">
                        <div class="card-title">
                            <h4 class="title">Địa chỉ</h4>
                        </div>
                        <div className="card-body">
                            <FormControl.TextBox
                                name="txtProductID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                label="mã sản phẩm"
                                placeholder="Mã sản phẩm"
                                controltype="InputControl"
                                value={"a"}
                                datasourcemember="ProductID"
                            />

                            <FormControl.TextBox
                                name="txtProductID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                label="mã sản phẩm"
                                placeholder="Mã sản phẩm"
                                controltype="InputControl"
                                value={"a"}
                                datasourcemember="ProductID"
                            />
                        </div>
                        
                    </div>
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
        callGetCache: cacheKeyID => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
