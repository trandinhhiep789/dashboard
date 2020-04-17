import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import DataGrid from "../../../common/components/DataGrid";
import { DataGridColumnList, SearchAPINotFinishPath, APIHostName, AddAPIPath, PKColumnName } from './Constants';
import { EditorState, ContentState, convertToRaw, createWithContent, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ModelContainer from "../../../common/components/Modal/ModelContainer";
import { checkPermission } from '../../../actions/permissionAction';
import { showModal, hideModal } from '../../../actions/modal';
import { PIEREQUEST_ADD, PIEREQUEST_VIEW, PIEREQUEST_DELETE } from "../../../constants/functionLists";
import { callGetCache } from "../../../actions/cacheAction";
import { formatDate } from "../../../common/library/CommonLib.js";
import { showToastAlert } from '../../../common/library/ultils'

class ListPieRequestCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridDataSource: [],
            LstCachePieRequestType: [],
            PieRequest: {},
            editorState: EditorState.createEmpty(),
        };
    }

    getCachePieRequestType() {
        this.props.callGetCache("PIMCACHE.PIEREQUESTTYPE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCachePieRequestType: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    componentDidMount() {
        this.getCachePieRequestType();
        this.getData();
    }

    getData() {
        this.props.callFetchAPI(APIHostName, SearchAPINotFinishPath).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                });
            }
        });
    }

    //Mode
    openPieRequestAddModal() {
        ModalManager.open(
            <ModelContainer
                title="Thêm yêu cầu chỉnh sủa thông tin sản phẩm"
                name="PieRequest_Product_Article"
                content={"Thêm thuộc tính sản phẩm thành công!"}
                onRequestClose={() => false}
                onChangeModal={this.handleInsert.bind(this)}>
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
                        <select className="form-control form-control-sm" value={this.state.PieRequest.PieRequestTypeID} onChange={this.onChangeInput.bind(this)} name="PieRequestTypeID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCachePieRequestType.map((optionItem) => {
                                return (
                                    <option key={optionItem.PieRequestTypeID} value={optionItem.PieRequestTypeID} label={optionItem.PieRequestTypeName} />
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
                                onEditorStateChange={this.onChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    // Insert and Update in data
    handleInsert() {

        this.state.PieRequest.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.state.PieRequest.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        this.state.PieRequest.Description = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest).then((apiResult) => {
            console.log("handleInsert", apiResult);
            if (!apiResult.IsError) {
                ModalManager.close();
                this.getData();
            }
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
        });
    }

    //Add and edit pieRquest
    openAddPieRequestPopup() {
        this.props.checkPermission(PIEREQUEST_ADD).then((apiResult) => {
            if (apiResult.IsPermission) {
                this.state.PieRequest = {};
                this.state.PieRequest.RequestDate = new Date();
                this.state.PieRequest.CreatedUser = this.props.AppInfo.LoginInfo.Username
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

    //On change
    onChange = (editorState) => {
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

    render() {
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Danh sách yêu cầu chưa hoàn thành</h5>
                        <button className="btn btn-info" onClick={this.openAddPieRequestPopup.bind(this)}>Thêm yêu cầu</button>
                    </div>
                    <DataGrid listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        isHideHeaderToolbar={true}
                        IsCustomAddLink={true}
                        PKColumnName={PKColumnName}
                        IsAutoPaging={false}
                        RowsPerPage={10}
                        RequirePermission={PIEREQUEST_VIEW}
                        DeletePermission={PIEREQUEST_DELETE}
                    />
                </div>
            </div>
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

const ListPieRequest = connect(mapStateToProps, mapDispatchToProps)(ListPieRequestCom);
export default ListPieRequest;