import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import {
    EditorState,
    ContentState,
    convertToRaw,
    convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
    APIHostName,
    BackLink,
    AddAPIPath,
    LoadAPIPath,
    DeleteAPIPath,
    UpdateAPIPath,
    SearchAPIPath,
    InputProductArticleColumnList,
    GridMLObjectArticleDefinition,
    AddElementList,
    MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class ArticleCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleAttrInsert = this.handleAttrInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.searchref = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            FormData: {},
            Product_Attribute: {},
            gridDataSource: [],
            LstPieRequest_Product_Article: [],
            PieRequest_Product_Article: {},
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
        const PieRequestListID = this.props.match.params.pierequestlistid;
        const searchData = [
            {
                SearchKey: "@PIEREQUESTLISTID",
                SearchValue: PieRequestListID
            }
        ];

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError,
                        gridDataSource: apiResult.ResultObject,
                        LstPieRequest_Product_Article: apiResult.ResultObject
                    });
                }
            });
    }
    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }
    handleInputGridEdit(id) {
        const Product_Article = {
            ArticleID: this.state.LstPieRequest_Product_Article[id].ArticleID,
            Content: this.state.LstPieRequest_Product_Article[id].Content,
            Description: this.state.LstPieRequest_Product_Article[id].Description,
            IsActived: this.state.LstPieRequest_Product_Article[id].IsActived,
            Title: this.state.LstPieRequest_Product_Article[id].Title
        };
        this.setState({ Isedit: true });
        this.setState(
            {
                PieRequest_Product_Article: Product_Article,
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(
                            this.state.LstPieRequest_Product_Article[id].Content
                        )
                    )
                )
            },
            () => {
                this.openAttrModal();
            }
        );
    }
    handleAttrInsert() {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        let IsOldValue = 0;
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString)
            .AuthenLogID;
        this.state.PieRequest_Product_Article.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequest_Product_Article.IsOldValue = IsOldValue;
        this.state.PieRequest_Product_Article.LoginLogID = LoginLogID;
        this.state.PieRequest_Product_Article.CreatedUser = CreatedUser;
        this.state.PieRequest_Product_Article.Content = draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
        );
        if (this.state.Isedit) {
            this.setState({
                IsOldValue: 1
            });
            this.state.PieRequest_Product_Article.UpDatedUser = CreatedUser;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequest_Product_Article).then(apiResult => {
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    ModalManager.close();
                }

            });
        } else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest_Product_Article).then(apiResult => {
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    ModalManager.close();
                }
            });
        }
    }
    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == "checkbox") {
            value = e.target.type == "checkbox" ? e.target.checked : false;
        }
        let { PieRequest_Product_Article } = this.state;
        PieRequest_Product_Article[name] = value;
        this.setState({
            PieRequest_Product_Article: PieRequest_Product_Article
        }, () => {
            this.openAttrModal();
        }
        );
    }

    openAttrModal() {
        ModalManager.open(
            <ModelContainer
                title={this.state.Isedit == true ? "Cập nhật thông tin bài viết" : "Thêm thông tin bài viết"}
                name="PieRequest_Product_Article"
                content={"Thêm thuộc tính sản phẩm thành công!"}
                onRequestClose={() => true}
                onChangeModal={this.handleAttrInsert}
            >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mã bài viết:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input
                            className="form-control form-control-sm"
                            readOnly="true"
                            name="ArticleID"
                            onChange={this.onChangeInput.bind(this)}
                            value={this.state.PieRequest_Product_Article.ArticleID}
                            placeholder="Mã bài viết"
                        />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled">
                                <li />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tiêu đề:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <input
                            className="form-control form-control-sm"
                            name="Title"
                            onChange={this.onChangeInput.bind(this)}
                            value={this.state.PieRequest_Product_Article.Title}
                            placeholder="Tiêu đề"
                        />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled">
                                <li />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Nội dung:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <div className="editor">
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
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <textarea
                            className="form-control form-control-sm"
                            name="Description"
                            onChange={this.onChangeInput.bind(this)}
                            value={this.state.PieRequest_Product_Article.Description}
                            placeholder="Mô tả"
                        />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled">
                                <li />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10 checkbox">
                        <label>
                            <input type="checkbox" className="" checked={this.state.PieRequest_Product_Article.IsActived} name="IsActived" onChange={this.onChangeInput.bind(this)} />
                            <span className="cr">
                                <i className="cr-icon fa fa-check"></i>
                            </span>
                        </label>
                        <div className="invalid-feedback">
                            <ul className="list-unstyled">
                                <li />
                            </ul>
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    onChange1 = editorState => {
        this.setState({ editorState });
        this.setState({ editorState }, () => {
            this.openAttrModal();
        });
    };
    //End Barcode
    handleInputGridInsert() {
        this.state.PieRequest_Product_Article = {};
        this.setState({ Isedit: false });
        this.setState(
            {
                PieRequest_Product_Article: this.state.PieRequest_Product_Article,
                editorState: EditorState.createEmpty()
            },
            () => {
                this.openAttrModal();
            }
        );
    }

    handleDelete(deleteList) {
        let listProductArticle = [];
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
                        listProductArticle.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductArticle).then(apiResult => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
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

    handleSubmit(formData, MLObject) { }

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
                                name="LstProduct_Article"
                                controltype="GridControl"
                                listColumn={InputProductArticleColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={"ArticleID"}
                                dataSource={this.state.gridDataSource}
                                value={this.state.LstPieRequest_Product_Article}
                                onInsertClick={this.handleInputGridInsert}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDelete}
                                MLObjectDefinition={GridMLObjectArticleDefinition}
                                colspan="12"
                                IsAdd={ this.CheckPermissionUser(17)}
                                IsDelete={ this.CheckPermissionUser(17) }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const Article = connect(mapStateToProps, mapDispatchToProps)(ArticleCom);
export default Article;
