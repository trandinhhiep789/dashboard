import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import { EditorState, ContentState, convertToRaw, createWithContent, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    APIHostName, BackLink, AddAPIPath, LoadAPIPath, DeleteAPIPath, UpdateAPIPath, SearchAPIPath,
    GridMLObjectContentDefinition, InputProductContentColumnList,
    AddElementList, MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class ContentCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleContentInsert = this.handleContentInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            FormData: {},
            Product_Attribute: {},
            LstPieRequest_Product_Content: [],
            gridDataSource: [],
            PieRequest_Product_Content: {},
            Isedit: false,
            editorState: EditorState.createEmpty(),
            DataSourcePieRequest:[]
        };
    }
    componentDidMount() {
        this.callSearchData();
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/Load", id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSourcePieRequest: apiResult.ResultObject });
            }
        });
    }

    CheckPermissionUser(id) {
        if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs && this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.length > 0) {
            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs[0].IsFinishStep == true) {
                return false;
            }

            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.some(a => a.PiePermissionID === id)) {
                return true;
            }
        }
        return false;
    }

    callSearchData() {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        const searchData = [{
            SearchKey: "@PIEREQUESTLISTID",
            SearchValue: PieRequestListID
        }];

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError,
                    gridDataSource: apiResult.ResultObject,
                    LstPieRequest_Product_Content: apiResult.ResultObject
                })
            }
        }
        );
    }
    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }
    handleInputGridEdit(id) {
        const Product_Content = {
            ContentTypeID: this.state.LstPieRequest_Product_Content[id].ContentTypeID,
            LanguageID: this.state.LstPieRequest_Product_Content[id].LanguageID,
            ContentDescription: this.state.LstPieRequest_Product_Content[id].ContentDescription,
            ProductContentID: this.state.LstPieRequest_Product_Content[id].ProductContentID,
        }
        this.setState({ Isedit: true });
        this.setState({
            PieRequest_Product_Content: Product_Content,
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.state.LstPieRequest_Product_Content[id].ContentDescription)))
        }, () => {
            this.openContentModal();
        });
    }

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        }
        else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleContentInsert() {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        let IsOldValue = 0;
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.state.PieRequest_Product_Content.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequest_Product_Content.IsOldValue = IsOldValue;
        this.state.PieRequest_Product_Content.LoginLogID = LoginLogID;
        this.state.PieRequest_Product_Content.CreatedUser = CreatedUser;
        this.state.PieRequest_Product_Content.ContentDescription = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        if (this.state.Isedit) {
            this.setState({
                IsOldValue: 1
            });
            this.state.PieRequest_Product_Content.UpDatedUser = CreatedUser;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequest_Product_Content).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    ModalManager.close();
                    this.callSearchData(this.state.SearchData);
                }
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest_Product_Content).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    ModalManager.close();
                    this.callSearchData(this.state.SearchData);
                }
            });
        }
    }
    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { PieRequest_Product_Content } = this.state;
        PieRequest_Product_Content[name] = value;
        this.setState({ PieRequest_Product_Content: PieRequest_Product_Content }, () => {
            this.openContentModal();
        });
    }
    openContentModal() {
        ModalManager.open(
            <ModelContainer
                title={(this.state.Isedit == true ? "Cập nhật thông tin nội dung" : "Thêm thông tin nội dung")} name="PieRequest_Product_Content"
                content={"Cập nhật đối tác!"}
                onRequestClose={() => true}
                onChangeModal={this.handleContentInsert} >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại nội dung:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" value={this.state.PieRequest_Product_Content.ContentTypeID} onChange={this.onChangeInput.bind(this)} name="ContentTypeID">
                            <option value="-1" label="--Vui lòng chọn--"></option>
                            <option value='1' label="Key selling point "></option>
                            <option value="2" label="Mô tả sản phẩm">  </option>
                            <option value="3" label="Cấu hình sản phẩm"></option>
                            <option value="4" label="Thông tin tùy chọn"></option>
                            <option value="5" label="Tính năng nổi bật"></option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Ngôn ngữ:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <select className="form-control form-control-sm" value={this.state.PieRequest_Product_Content.LanguageID} onChange={this.onChangeInput.bind(this)} name="LanguageID">
                            <option value="-1" label="--Vui lòng chọn--">
                            </option><option value="1" label="English">
                            </option><option value="2" label="Vietnamese"> </option>
                            <option value="3" label="Khmer"> </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Nội dung:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <div className='editor'>
                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                placeholder="Enter some text..."
                                onEditorStateChange={this.onChange1.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    onChange1 = (editorState) => {
        this.setState({ editorState });
        this.setState({ editorState }, () => {
            this.openContentModal();
        });
    }
    //End Barcode
    handleInputGridInsert() {
        this.state.PieRequest_Product_Content = {};
        this.setState({ Isedit: false });
        this.setState({ PieRequest_Product_Content: this.state.PieRequest_Product_Content, editorState: EditorState.createEmpty() }, () => {
            this.openContentModal();
        });
    }

    handleSubmit(formData, MLObject) {
    }
    handleDelete(deleteList) {
        let listProductContent = [];
        deleteList.map((selectItem) => {
            let isMath = false;
            this.state.gridDataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listProductContent.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductContent).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData(this.state.SearchData);
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Thông tin bài viết</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="LstPieRequest_Product_Content"
                                controltype="GridControl"
                                listColumn={InputProductContentColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"ProductContentID"}
                                dataSource={this.state.gridDataSource}
                                value={this.state.LstPieRequest_Product_Content}
                                onInsertClick={this.handleInputGridInsert}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDelete}
                                MLObjectDefinition={GridMLObjectContentDefinition}
                                colspan="12"
                                IsAdd={ this.CheckPermissionUser(21)}
                                IsDelete={ this.CheckPermissionUser(21) }
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Content = connect(mapStateToProps, mapDispatchToProps)(ContentCom);
export default Content;
