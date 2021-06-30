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
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd,
    ElementServiceAgreementList,
    GridMLObjectServiceAgreement

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME, CDN_LOGO_IMAGE } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";
import moment from 'moment';
import { ExportStringToDate } from "../../../../common/library/ultils";
import { ERPCOMMONCACHE_DOCUMENTFOLDER, ERPCOMMONCACHE_DOCUMENTTYPE, ERPCOMMONCACHE_SERVICEAGREEMENTTYPE } from "../../../../constants/keyCache";
import { Base64 } from 'js-base64';
import { TMS_MTRETURNREQUEST_DELETE } from "../../../../constants/functionLists";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            Files: {},
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        console.log("MLObject", formData, MLObject)
        const { Files } = this.state;

        // MLObject.FileContent1 = MLObject.FileContent1.replaceAll("<", "&lt;");
        // MLObject.FileContent2 = "";
        let data = new FormData();
        data.append("DocumentImageURL", Files.DocumentImageURL);
        data.append("DocumentObj", JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            console.log("data",apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });
    }

    handleSelectedFile(file, nameValue, isDeletetedFile) {
        console.log("gfile", file, nameValue, isDeletetedFile)
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist });
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

        const { } = this.state;

        return (
            <FormContainer
                FormName={TitleFormAdd}
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                BackLink={BackLink}
                onSubmit={this.handleSubmit}
            >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtDocumentName"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="tên tài liệu"
                            placeholder="Tên tài liệu"
                            controltype="InputControl"
                            value=""
                            datasourcemember="DocumentName"
                            validatonList={['required']}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtSearchKeyword"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="Từ khóa tìm kiếm"
                            placeholder="Từ khóa tìm kiếm"
                            controltype="InputControl"
                            value=""
                            datasourcemember="SearchKeyword"
                        // validatonList={['required']}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbDocumentFolderID"
                            colspan="8"
                            labelcolspan="4"
                            label="thư mục"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_DOCUMENTFOLDER}
                            valuemember="DocumentFolderID"
                            nameMember="DocumentFolderName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="DocumentFolderID" />

                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBoxSelect
                            name="cbDocumentTypeID"
                            colspan="8"
                            labelcolspan="4"
                            label="Loại tài liệu"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_DOCUMENTTYPE}
                            valuemember="DocumentTypeID"
                            nameMember="DocumentTypeName"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="DocumentTypeID" />

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
                        <FormControl.TextEditor
                            labelcolspan={2}
                            colspan={10}
                            name="txtEditorFileContent1"
                            label="Nội dung"
                            placeholder="Nội dung"
                            datasourcemember="FileContent1"
                            controltype="InputControl"
                            rows={6}
                            maxSize={500}
                            classNameCustom="customcontrol"
                        />
                    </div>



                    <div className="col-md-12">
                        <FormControl.TextEditor
                            labelcolspan={2}
                            colspan={10}
                            name="txtEditorFileContent2"
                            label="Nội dung"
                            placeholder="Nội dung"
                            datasourcemember="FileContent2"
                            controltype="InputControl"
                            rows={6}
                            maxSize={500}
                            classNameCustom="customcontrol"
                        />
                    </div>


                    <div className="col-md-6">
                        <FormControl.UploadAvatar
                            name="txtDocumentImageURL"
                            nameMember="DocumentImageURL"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="Hình đại diện"
                            placeholder="Hình đại diện"
                            controltype="InputControl"
                            cdn={CDN_LOGO_IMAGE}
                            value=""
                            isReturnInline={true}
                            datasourcemember="DocumentImageURL"
                            onHandleSelectedFile={this.handleSelectedFile.bind(this)}
                        // validatonList={['required']}
                        />
                    </div>



                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtFileName"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="Tên file"
                            placeholder="Tên file"
                            controltype="InputControl"
                            value=""
                            datasourcemember="FileName"
                        // validatonList={['required']}
                        />
                    </div>


                    {/* <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtFileURL"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="Đường dẫn file"
                            placeholder="Đường dẫn file"
                            controltype="InputControl"
                            value=""
                            datasourcemember="FileURL"
                            // validatonList={['required']}
                        />
                    </div>
                    
                                        */}

                    <div className="col-md-12">
                        <FormControl.CheckBox
                            label="Khóa bình luận"
                            name="chkIsLockComment"
                            datasourcemember="IsLockComment"
                            controltype="InputControl"
                            colspan={10}
                            labelcolspan={2}
                            classNameCustom="customCheckbox"
                            value={true}
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
