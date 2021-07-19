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
import { ERPCOMMONCACHE_DOCUMENTFOLDER, ERPCOMMONCACHE_DOCUMENTTYPE, ERPCOMMONCACHE_SERVICEAGREEMENTTYPE, ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";
import { Base64 } from 'js-base64';
import { DOCUMENT_ADD, TMS_MTRETURNREQUEST_DELETE } from "../../../../constants/functionLists";
import FileAttachment from "../../../../common/components/Form/FileAttachment";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_IMAGE_SLIDE } from '../../../../constants/actionTypes';
import { el } from "date-fns/locale";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this)
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
            AttachmentListData: [],
            fileSize: 0,
            keyUploadFile: "",
            keyUploadVideo: "",
            keyUploadLink: "",

        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.getCacheKeyConfig();
    }

    getCacheKeyConfig() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                let keyUploadFile = apiResult.ResultObject.CacheData.filter(x => x.TMSConfigID == "DOCUMENT_UPLOAD_FILE");
                let keyUploadVideo = apiResult.ResultObject.CacheData.filter(x => x.TMSConfigID == "DOCUMENT_UPLOAD_VIDEO");
                let keyUploadLink = apiResult.ResultObject.CacheData.filter(x => x.TMSConfigID == "DOCUMENT_UPLOAD_LINK");
                this.setState({
                    keyUploadFile: keyUploadFile[0].TMSConfigValue,
                    keyUploadVideo: keyUploadVideo[0].TMSConfigValue,
                    keyUploadLink: keyUploadLink[0].TMSConfigValue,
                })
            }
        })
    }

    handleSubmit(formData, MLObject) {
        const { Files, AttachmentList, DocumentTypeID, fileSize } = this.state;

        MLObject.FileSize = fileSize;

        console.log("MLObject", AttachmentList, MLObject, fileSize);

        const strDecs =  MLObject.FileContent1;

        if (MLObject.FileContent1.length > 2900) {
            MLObject.FileContent1 = strDecs.substr(0, 2900);
            MLObject.FileContent2 = strDecs.substr(2900, 2900)
        }
        else{
            MLObject.FileContent1 = MLObject.FileContent1;
            MLObject.FileContent2 = ""
        }

        let data = new FormData();
        data.append("DocumentFileURL", AttachmentList.DocumentFileURL);
        data.append("DocumentImageURL", Files.DocumentImageURL);
        data.append("DocumentObj", JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
            console.log("data", apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });
    }

    handleSelectedFile(file, nameValue, isDeletetedFile) {
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
        const { keyUploadFile, keyUploadVideo, keyUploadLink } = this.state;
        this.setState({
            DocumentTypeID: formData.cbDocumentTypeID.value
        })
        switch (formData.cbDocumentTypeID.value) {
            case parseInt(keyUploadFile):
                formData.txtFileURL.value = "";
                // formData.txtEditorFileContent1.value = "";
                // formData.txtEditorFileContent2.value = "";
                break;
            case parseInt(keyUploadVideo):
                this.setState({
                    AttachmentList: [],
                    AttachmentListData: [],
                    fileSize: 0
                })
                break;
            case parseInt(keyUploadLink):
                this.setState({
                    AttachmentList: [],
                    AttachmentListData: [],
                    fileSize: 0
                })
                break;
            default:
                formData.txtFileURL.value = "";
                // formData.txtEditorFileContent1.value = "";
                // formData.txtEditorFileContent2.value = "";
                this.setState({
                    AttachmentList: [],
                    AttachmentListData: [],
                    fileSize: 0
                })
                break
        }
    }


    checkIsValidAcceptedFile(filename) {
        var _fileName = filename;
        var idxDot = _fileName.lastIndexOf(".") + 1;
        var extFile = _fileName.substr(idxDot, _fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            return true;
        } else {
            return false;
        }
    }

    handleSelectFile(file, nameValue) {
        // console.log("file", file[0], file, nameValue)
        const filelist = { [nameValue]: file[0] };
        this.setState({
            AttachmentList: filelist,
            AttachmentListData: file,
            fileSize: file[0].size

        })

    }

    handleDeletefile(id) {
        this.setState({
            AttachmentListData: [],
            AttachmentList: [],
            fileSize: 0
        })
    }

    handleShowImage(src) {
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

        const { DocumentTypeID, AttachmentListData, keyUploadFile, keyUploadVideo, keyUploadLink } = this.state;

        return (
            <FormContainer
                FormName={TitleFormAdd}
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                BackLink={BackLink}
                RequirePermission={DOCUMENT_ADD}
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
                            maxSize={190}
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
                        <FormControl.ComboBoxTreeSelect
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
                            rootID={-1}
                            rootKey="ParentID"
                            bordered={true}
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
                            maxSize={250}
                            classNameCustom="customcontrol"
                        />
                    </div>

                    <div className="col-md-6">

                        <FileAttachment
                            name="FileAttachmentData"
                            nameMember="DocumentFileURL"
                            labelcolspan={4}
                            colspan={8}
                            label="Upload file"
                            IsMultiple={false}
                            onSelectFile={this.handleSelectFile.bind(this)}
                            onDeletefile={this.handleDeletefile.bind(this)}
                            DataAttachment={AttachmentListData}
                            IsAttachment={DocumentTypeID == parseInt(keyUploadFile) ? true : false}
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtFileURL"
                            colspan="8"
                            labelcolspan="4"
                            label="Đường dẫn URL"
                            placeholder="Đường dẫn URL"
                            controltype="InputControl"
                            value=""
                            datasourcemember="FileURL"
                            readOnly={(DocumentTypeID == parseInt(keyUploadVideo) || DocumentTypeID == parseInt(keyUploadLink)) ? false : true}
                            disabled={(DocumentTypeID == parseInt(keyUploadVideo) || DocumentTypeID == parseInt(keyUploadLink)) ? false : true}
                        />
                    </div>

                    {/* <div className="col-md-6">
                        <VideoAttachment
                            name="VideoAttachmentData"
                            nameMember="DocumentVideoURL"
                            labelcolspan={4}
                            colspan={8}
                            label="Chọn tệp Video"
                            IsMultiple={false}
                            getVideo={getVideo}
                            videoAttribute={videoAttribute}
                            fileName={fileVideoName}
                            onSelectFile={this.handleSelectVideo.bind(this)}
                            onDeletefile={this.handleDeleteVideo.bind(this)}
                            DataAttachment={AttachmentVideoData}
                            IsVideoAttachment={DocumentTypeID == 2 ? true : false}
                        />
                    </div> */}

                    <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtEditorFileContent1"
                            label="Nội dung"
                            placeholder="Nội dung chỉ giới hạn 5500 ký tự"
                            datasourcemember="FileContent1"
                            controltype="InputControl"
                            rows={8}
                            maxSize={5800}
                            // readOnly={(DocumentTypeID == parseInt(keyUploadVideo)  || DocumentTypeID == parseInt(keyUploadLink) ) ? false : true}
                            // disabled={(DocumentTypeID == parseInt(keyUploadVideo)  || DocumentTypeID == parseInt(keyUploadLink) ) ? false : true}
                            classNameCustom="customcontrol"
                        />
                    </div>


                    {/* <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtEditorFileContent2"
                            label="Nội dung tiếp theo"
                            placeholder="Nội dung chỉ giới hạn 3900 ký tự"
                            datasourcemember="FileContent2"
                            controltype="InputControl"
                            rows={8}
                            maxSize={3900}
                            // readOnly={(DocumentTypeID == parseInt(keyUploadVideo)  || DocumentTypeID == parseInt(keyUploadLink) ) ? false : true}
                            // disabled={(DocumentTypeID == parseInt(keyUploadVideo)  || DocumentTypeID == parseInt(keyUploadLink) ) ? false : true}
                            classNameCustom="customcontrol"
                        />
                    </div> */}


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



                    {/* <div className="col-md-6">
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
                    </div> */}


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
                            value={false}
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
