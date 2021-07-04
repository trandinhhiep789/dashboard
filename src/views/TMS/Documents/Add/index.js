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
import FileAttachment from "../../../../common/components/Form/FileAttachment/inde";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_IMAGE_SLIDE } from '../../../../constants/actionTypes';
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.getCacheDocumentType = this.getCacheDocumentType.bind(this)
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            Files: {},
            DocumentTypeID: "",
            AttachmentList: [],
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.getCacheDocumentType();
    }

    getCacheDocumentType() {
        this.props.callGetCache(ERPCOMMONCACHE_DOCUMENTTYPE).then(apiResult => {
            console.log("data", apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.setState({
                    DocumentTypeID: apiResult.ResultObject.CacheData[0].DocumentTypeID
                })
            }
        })
    }

    handleSubmit(formData, MLObject) {
        console.log("MLObject", formData, MLObject)
        const { Files } = this.state;

        // MLObject.FileContent1 = MLObject.FileContent1.replaceAll("<", "&lt;");
        // MLObject.FileContent2 = "";
        MLObject.FileContent1 = "";
        MLObject.FileContent2 = "";
        let data = new FormData();
        data.append("DocumentImageURL", Files.DocumentImageURL);
        data.append("DocumentObj", JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            console.log("data", apiResult)
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

    handleChangeForm(formData, MLObject) {
        console.log("change", formData, MLObject)
        this.setState({
            DocumentTypeID: formData.cbDocumentTypeID.value
        })
    }
    handleSelectFile(e) {
        console.log("handleSelectFile", e, e.target.files)
        // data.append('file', e.target.files[0])
        // data.append("ObjMTReturnRequest_Attachment", JSON.stringify(MLObject));
        this.setState({
            AttachmentList: e.target.files
        })

    }
    handleDeletefile(id) {
        console.log("handleDeletefile", id)
        this.setState({
            AttachmentList: []
        })
    }

    handleShowImage(src) {
        console.log("src", src)
       
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Hình ảnh đại diện',
            content: {
                text: <div className="bg-avatar" style={{ backgroundImage: `url(${src})` }}></div>

            },
            maxWidth: 800 + 'px'
        });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        const { DocumentTypeID, AttachmentList } = this.state;

        return (
            <FormContainer
                FormName={TitleFormAdd}
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                BackLink={BackLink}
                onSubmit={this.handleSubmit}
                onchange={this.handleChangeForm.bind(this)}
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

                    <div className="col-md-6">

                        <FileAttachment
                            name="FileAttachmentData"
                            labelcolspan={4}
                            colspan={8}
                            label="Chọn file"
                            IsAttachment={true}
                            onSelectFile={this.handleSelectFile.bind(this)}
                            onDeletefile={this.handleDeletefile.bind(this)}
                            DataAttachment={AttachmentList}
                            IsAttachment={DocumentTypeID == 1 ? true : false}
                        />

                    </div>

                    <div className="col-md-6">
                        <p>Video</p>
                    </div>

                    {/* <div className="col-md-12">
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
                    </div> */}


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
                            isButtonDelete={true}
                            datasourcemember="DocumentImageURL"
                            onHandleSelectedFile={this.handleSelectedFile.bind(this)}
                            showImage={this.handleShowImage.bind(this)}
                            classNameCustom="uploadAvatar"
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

            </FormContainer >
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
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
