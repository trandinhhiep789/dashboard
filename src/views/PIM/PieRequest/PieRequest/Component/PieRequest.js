import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import Datetime from 'react-datetime';
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../common/components/Modal";
import { Redirect } from "react-router-dom";
import "../../../../../../node_modules/react-datetime/css/react-datetime.css";
import InputGridCell from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { APIHostName, AddAPIPath, UpdateAPIPath, BackLink } from "../constants";
import { Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
    EditorState,
    ContentState,
    convertToRaw,
    convertFromHTML
} from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class PieRequest extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            PieRequestID: -1,
            PieRequest: {},
            DataSource: {},
            editorState: EditorState.createEmpty(),
            IsRedirectEditPage: false,
            IsRedirectDelete: false
        }
        this.MObjectDefine = {};
    }
    componentDidMount() {
        if (this.props.PieRequestID != -1)
            this.loadPieRequest(this.props.PieRequestID);
        else {
            let initDataSource = {
                RequestDate: new Date()
            };
            this.setState({
                DataSource: initDataSource
            });
            this.MObjectDefine = initDataSource;
        }
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    handleCloseMessage() {
    }
    loadPieRequest(PieRequestID) {
        this.setState({ IsLoading: true });
        this.props.callFetchAPI(APIHostName, 'api/PieRequest/Load', PieRequestID).then((apiResult) => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                apiResult.ResultObject.RequestDate = new Date(apiResult.ResultObject.RequestDate);
                const { contentBlocks, entityMap } = convertFromHTML(apiResult.ResultObject.Description);
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message,
                    editorState: contentBlocks == null ? "" : EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(apiResult.ResultObject.Description)
                        )
                    )
                })
                this.MObjectDefine = apiResult.ResultObject;
            }
            this.setState({ IsLoading: false });
        });
    }
    handleInputChange(e) {
        let inputvalue = e.target ? e.target.value : e.Value;
        let inputname = e.target ? e.target.name : e.Name;
        let newMOject = Object.assign({}, this.MObjectDefine);
        newMOject[inputname] = inputvalue;
        this.MObjectDefine = newMOject;
        this.setState({
            DataSource: newMOject
        });
    }
    handleDateTimeChange(moment) {
        let dateSelected = moment ? moment._d : null;
        let newMOject = Object.assign({}, this.MObjectDefine);
        newMOject.RequestDate = dateSelected;
        this.MObjectDefine = newMOject;
        this.setState({
            DataSource: newMOject
        });
    }
    handleSubmit() {
        if (this._validatePieRequest()) {
            let MLObject = this.MObjectDefine;
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
            MLObject.Description = this.state.editorState == "" ? "" : draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
            this.props.callFetchAPI(APIHostName, this.props.PieRequestID == -1 ? AddAPIPath : UpdateAPIPath, MLObject).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);
                if (this.props.PieRequestID == -1) {
                    this.PieRequestID = apiResult.MessageDetail;
                    this.setState({ IsRedirectEditPage: true });
                }
            });
        }

    }

    handleSubmitInsertLog(desc) {
        let MLObject = {};
        MLObject.ActivityTitle = desc;
        MLObject.ActivityDetail = desc;
        MLObject.ObjectID = "PIM_PIEREQUEST";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        this.props.callFetchAPI(APIHostName, 'api/UserActivity/Add', MLObject);
    }

    handleDelete() {
        let listMLObject = [{ PieRequestID: this.props.PieRequestID, DeletedUser: this.props.AppInfo.LoginInfo.Username }];
        // console.log('handleDelete listMLObject',listMLObject);
        this.props.callFetchAPI(APIHostName, 'api/PieRequest/Delete', listMLObject).then((apiResult) => {
            //  console.log('handleDelete listMLObject',apiResult.Message,apiResult);
            if (apiResult && !apiResult.IsError) {
                this.showMessage("Xóa yêu cầu chỉnh sủa thông tin sản phẩm Thành công!");
                this.setState({ IsRedirectDelete: true });
                this.handleSubmitInsertLog("Xóa yêu cầu chỉnh sủa thông tin sản phẩm");
            }
            else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    _validatePieRequest() {
        let MLObject = this.MObjectDefine;
        if (!MLObject) { this.showMessage('Vui lòng nhập thông tin yêu cầu!'); return false }
        if (!MLObject.PieRequestName) { this.showMessage('Vui lòng nhập tiêu đề!'); return false }
        if (!MLObject.RequestDate) { this.showMessage('Vui lòng chọn ngày yêu cầu!'); return false }
        if (!MLObject.PieRequestTypeID) { this.showMessage('Vui lòng chọn loại yêu cầu!'); return false }
        return true;
    }

    onChange1 = editorState => {
        this.setState({ editorState });
    };

    render() {
        if (this.state.IsLoading) return <p>Đang lấy dữ liệu...</p>;
        if (this.state.IsCallAPIError) return <p>{this.state.ErrorMessage}</p>
        if (this.state.IsRedirectEditPage) {
            return <Redirect to={'/PieRequest/Edit/' + this.PieRequestID} />;
        }
        if (this.state.IsRedirectDelete) {
            return <Redirect to={'/PieRequest'} />;
        }
        return (
            <div className='col-lg-12'>
                <div className="card">
                    <div className="card-body">
                        <div className='form-row'>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Mã Yêu cầu:</label>
                            </div>
                            <div className='form-group col-md-4'>
                                <label defaultValue={this.state.DataSource.PieRequestID} placeholder='Tự động' style={{ opacity: 0.6 }} type='text' readOnly={true} name='PieRequestID'>{this.state.DataSource.PieRequestID ? this.state.DataSource.PieRequestID : 'Tự động'}</label>
                            </div>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Loại yêu cầu:</label>
                            </div>
                            <div className='form-group col-md-4'>
                                {this.props.PieRequestID == -1
                                    ? <InputGridCell type='combobox'
                                        readOnly={this.state.DataSource.IsFinishStep}
                                        index={1}
                                        text=''
                                        value={this.state.DataSource.PieRequestTypeID}
                                        name='PieRequestTypeID'
                                        IsAutoLoadItemFromCache={true}
                                        LoadItemCacheKeyID='PIMCACHE.PIEREQUESTTYPE'
                                        ValueMember='PieRequestTypeID'
                                        NameMember='PieRequestTypeName'
                                        onValueChange={this.handleInputChange}
                                    />
                                    : <label>{this.state.DataSource.PieRequestTypeName}</label>
                                }
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Ngày yêu cầu:</label>
                            </div>
                            <div className='form-group col-md-4'>
                                <label>{formatDate(this.state.DataSource.RequestDate, true)}</label>
                            </div>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Người yêu cầu:</label>
                            </div>
                            <div className='form-group col-md-4'>
                                <label>{this.state.DataSource.CreatedUser}</label>

                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Tiêu đề:</label>
                            </div>
                            <div className='form-group col-md-10'>
                                {
                                    this.props.IsEdit == true ? (<InputGridCell type='textbox'
                                        text={this.state.DataSource.PieRequestName}
                                        name='PieRequestName'
                                        onValueChange={this.handleInputChange}
                                    />) : <label>{this.state.DataSource.PieRequestName}</label>
                                }
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-2'>
                                <label className='col-form-label'>Mô tả:</label>
                            </div>
                            <div className='form-group col-md-10'>
                                <div className="editor">
                                    {
                                        this.props.IsEdit == true ? (<Editor
                                            editorState={this.state.editorState}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            placeholder="Enter some text..."
                                            onEditorStateChange={this.onChange1.bind(this)}
                                        />) : <label>{ReactHtmlParser(this.state.DataSource.Description)}</label>
                                    }

                                </div>
                                {/* {
                                    this.props.IsEdit == true ? (<InputGridCell type='textarea'
                                        text={this.state.DataSource.Description}
                                        name='Description'
                                        onValueChange={this.handleInputChange}
                                    />) : <label>{ReactHtmlParser(this.state.DataSource.Description)}</label>
                                } */}
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer text-right">
                        {
                            this.props.IsEdit == true ? <button className="btn btn-primary" type="submit" onClick={this.handleSubmit} ><span className="fa fa-edit"> Cập nhật</span></button> : <button className="btn btn-primary" disabled title="Bạn Không có quyền xử lý!" type="submit"  ><span className="fa fa-edit"> Cập nhật</span></button>
                        }
                        {
                            this.props.IsDelete == true ? <button className="btn btn-danger ml-10" onClick={this.handleDelete.bind(this)} type="submit"  ><span className="fa fa-remove"> Xóa </span></button> : <button className="btn btn-danger ml-10" disabled title="Bạn Không có quyền xử lý!" type="submit"><span className="fa fa-remove"> Xóa </span></button>
                        }

                    </footer>
                </div>
            </div >
        )
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieRequest);