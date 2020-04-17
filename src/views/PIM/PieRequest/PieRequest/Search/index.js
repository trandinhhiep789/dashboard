import React from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import ModelContainer from "../../../../../common/components/Modal/ModelContainer";
import { checkPermission } from '../../../../../actions/permissionAction';
import {
    SearchElementList, SearchMLObjectDefinition, DataGridColumnList, AddLink, APIHostName, AddAPIPath, UpdateAPIPath,
    SearchAPIPath, DeleteAPIPath, IDSelectColumnName, PKColumnName, InitSearchParams, PagePath, AddLogAPIPath
} from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PIEREQUEST_ADD, PIEREQUEST_VIEW, PIEREQUEST_DELETE } from "../../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import PieRequestAdd from '../Add';
import { EditorState, ContentState, convertToRaw, createWithContent, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { callGetCache } from "../../../../../actions/cacheAction";
import { Redirect, Router } from "react-router-dom";
import { showToastAlert } from '../../../../../common/library/ultils'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
        this.openAddPieRequestPopup = this.openAddPieRequestPopup.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.state = {
            CallAPIMessage: "", gridDataSource: [], IsCallAPIError: false, SearchData: InitSearchParams, LstCachePieRequestType: [],
            SearchElementList: SearchElementList, PieRequest: {}, PieRequestID: -1, Isedit: false, IsNextPage: false, editorState: EditorState.createEmpty(),
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this._getCachePieRequestType();
        this.props.updatePagePath(PagePath);
        this.callSearchData(InitSearchParams);
    }
    _getCachePieRequestType() {
        this.props.callGetCache("PIMCACHE.PIEREQUESTTYPE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCachePieRequestType: apiResult.ResultObject.CacheData,
                });
            }
        });
    }
    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                this.setState({ gridDataSource: apiResult.ResultObject, IsCallAPIError: apiResult.IsError })
            }
        });
    }
    componentWillMount() {
    }

    // Search
    handleSearchEvent(searchText) {
    }
    handleSearchSubmit(formData, MLObject) {
        // console.log("MLObject", MLObject, MLObject.SearchType)
        let postData = [];
        if (MLObject) {
            postData = [];
            Object.keys(MLObject).map((item) => {
                postData.push({
                    SearchKey: "@" + item,
                    SearchValue: MLObject[item],
                })
            })
        }


        this.setState({ SearchData: postData });
        // console.log("postData", postData)
        this.callSearchData(postData);
    }

    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            this.handleSubmitInsertLog("Xóa yêu cầu chỉnh sủa thông tin sản phẩm");
        });
    }
    // End Search

    //modoe showMessage
    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    //Add and edit pieRquest
    openAddPieRequestPopup() {
        this.props.checkPermission(PIEREQUEST_ADD).then((apiResult) => {
            if (apiResult.IsPermission) {
                this.state.PieRequest = {};
                this.state.PieRequest.RequestDate = new Date();
                this.state.PieRequest.CreatedUser = this.props.AppInfo.LoginInfo.Username
                this.setState({ Isedit: false });
                this.setState({ PieRequest: this.state.PieRequest, editorState: EditorState.createEmpty() }, () => {
                    this.openPieRequestAddModal();
                });
            }
            else {
                ModalManager.open(
                    <ModelContainer
                        title={"Yêu cầu chỉnh sủa thông tin sản phẩm"}
                        name=""
                        content={""}
                        onRequestClose={() => true}>
                        <label className="col-form-label">Tiêu đề không có quyền thêm</label>
                    </ModelContainer>
                );
            }
        });
    }
    //edit

    handleInputGridEdit(value, pkColumnName) {
        let PieRequest;
        this.state.gridDataSource.map((item, index) => {
            let isMath = false;
            for (var j = 0; j < pkColumnName.length; j++) {
                if (item[pkColumnName[j].key] != value.pkColumnName[j].value) {
                    isMath = false;
                    break;
                }
                else {
                    isMath = true;
                }
            }
            if (isMath) {
                PieRequest = item;
            }
        });
        this.setState({ Isedit: true });
        const { contentBlocks, entityMap } = convertFromHTML(PieRequest.Description);
        this.setState({ PieRequest: PieRequest, editorState: contentBlocks == null ? "" : EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(PieRequest.Description))) }, () => {
            this.openPieRequestAddModal();
        });
    }
    //Mode
    openPieRequestAddModal() {
        ModalManager.open(
            <ModelContainer
                title={(this.state.Isedit == true ? "Cập nhật yêu cầu chỉnh sủa thông tin sản phẩm" : "Thêm yêu cầu chỉnh sủa thông tin sản phẩm")}
                name="PieRequest_Product_Article"
                content={"Thêm thuộc tính sản phẩm thành công!"}
                onRequestClose={() => false}
                onChangeModal={this.handleAttrInsert.bind(this)}>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Tiêu đề:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <input className="form-control form-control-sm" name="PieRequestName" onChange={this.onChangeInput.bind(this)} value={this.state.PieRequest.PieRequestName} placeholder="Tiêu đề" />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li></li></ul>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <select className="form-control form-control-sm " disabled value={this.state.PieRequest.PieRequestTypeID} onChange={this.onChangeInput.bind(this)} name="PieRequestTypeID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCachePieRequestType.map((optionItem, item) => {
                                return (
                                    <option key={item} value={optionItem.PieRequestTypeID} label={optionItem.PieRequestTypeName} />
                                )
                            }
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Ngày yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>{formatDate(this.state.PieRequest.RequestDate, true)}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Người yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>{this.state.PieRequest.CreatedUser}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Mô tả:</label>
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
    //On change
    onChange1 = (editorState) => {
        this.setState({ editorState });
        this.setState({ editorState }, () => {
            this.openPieRequestAddModal();
        });
    }
    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { PieRequest } = this.state;
        PieRequest[name] = value;
        this.setState({ PieRequest: PieRequest }, () => {
            this.openPieRequestAddModal();
        });
    }
    // Insert and Update in data
    handleAttrInsert() {
        this.state.PieRequest.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.state.PieRequest.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        this.state.PieRequest.Description = this.state.editorState == "" ? "" : draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        if (this.state.Isedit) {
            this.state.PieRequest.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequest).then((apiResult) => {

                if (!apiResult.IsError) {
                    ModalManager.close();
                    this.setState({ IsNextPage: true, PieRequestID: this.state.PieRequest.PieRequestID.Trim() });
                    this.handleSubmitInsertLog("Cập nhật yêu cầu chỉnh sủa thông tin sản phẩm");
                }
                else {
                    showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                }
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest).then((apiResult) => {

                if (!apiResult.IsError) {
                    ModalManager.close();
                    this.setState({ IsNextPage: true, PieRequestID: apiResult.MessageDetail });
                    this.handleSubmitInsertLog("Thêm yêu cầu chỉnh sủa thông tin sản phẩm");
                }
                else {
                    showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                }
            });
        }
    }

    handleSubmitInsertLog(desc) {
        MLObject.ActivityTitle = desc;
        MLObject.ActivityDetail = desc;
        MLObject.ObjectID = "PIM_PIEREQUEST";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    //ENd add and edit pieRquest

    render() {
        if (this.state.IsNextPage) {
            return <Redirect to={'/PieRequest/Edit/' + this.state.PieRequestID} />;
        }
        return (<React.Fragment>
            <SearchForm FormName="Yêu cầu chỉnh sửa thông tin sản phẩm"
                MLObjectDefinition={SearchMLObjectDefinition}
                listelement={this.state.SearchElementList}
                onSubmit={this.handleSearchSubmit}
                ref={this.searchref} />
            <div className='col-md-12'>
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    hasHeaderToolbar={true}
                    IsCustomAddLink={true}
                    onInsertClick={this.openAddPieRequestPopup}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    ref={this.gridref}
                    onSearchEvent={this.handleSearchEvent}
                    RequirePermission={PIEREQUEST_VIEW}
                    DeletePermission={PIEREQUEST_DELETE}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    onInsertClickEdit={this.handleInputGridEdit}
                />
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        checkPermission: (permissionKey) => {
            return dispatch(checkPermission(permissionKey));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;