import React from 'react';
import { connect } from 'react-redux';
import { APIHostName } from '../constants';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../../common/components/Modal";

import './PieRequest.css';
class PieRequestAttachment extends React.Component {
    constructor(props) {
        super(props);
        this._handleselectedFile = this._handleselectedFile.bind(this);
        this.state = {
            PieRequestNewFiles: [],
            PieRequestFiles: []
        }
    }
    _showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message}
        />);
    }
    _handleselectedFile(e) {
        let MLObject = {
            PieRequestID: this.props.PieRequestID,
            file: e.target.files[0],
        };
        var data = new FormData();
        data.append('file', e.target.files[0])
        data.append('PieRequestID', this.props.PieRequestID);
        data.append('CreatedUser', this.props.AppInfo.LoginInfo.Username);
        data.append('LoginLogID', JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID);

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.props.callFetchAPI(APIHostName, "api/PieRequest_Attachment/UploadFileNew", data).then((apiResult) => {
            if (apiResult)
                if (apiResult.IsError == false)
                    this._searchAttachment();
                else {
                    let message = '';
                    if (apiResult.MessageDetail === 'Maximum request length exceeded.')
                        message = 'File vượt quá dung lượng cho phép';
                    else message = apiResult.Message
                    this._showMessage(message);
                }
            else {
                this._showMessage("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại internet!");
            }
        });
    }
    _searchAttachment() {
        let objSearchData = [
            {
                SearchKey: 'v_PIEREQUESTID',
                SearchValue: this.props.PieRequestID
            }
        ]

        this.props.callFetchAPI(APIHostName, 'api/PieRequest_Attachment/Search', objSearchData).then((apiResult) => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                this.setState({
                    PieRequestFiles: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message
                })
            }
        });
    }
    componentDidMount() {
        this._searchAttachment();
    }

    onDeletefile(e) {
        e.preventDefault();
        const postData = [{
            SearchKey: "@PIEREQUESTID",
            SearchValue: this.props.PieRequestID
        },
        {
            SearchKey: "@ATTACHMENTID",
            SearchValue: parseInt(e.target.dataset.id)
        }
            ,
        {
            SearchKey: "@DELETEDUSER",
            SearchValue: this.props.AppInfo.LoginInfo.Username
        }
        ];
        console.log("onDeletefile", postData);
        this.props.callFetchAPI(APIHostName, 'api/PieRequest_Attachment/DeleteAttachment', postData).then((apiResult) => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                this.setState({
                    PieRequestFiles: apiResult.ResultObject
                })
            }
        });
    }
    render() {

        //console.log("strvalue", this.state.PieRequestFiles)
        return (
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-body'>
                        <b>Tập tin đính kèm:</b>
                        <ul className="attachedList">
                            <li>
                                {this.props.IsAttachment == true ?
                                    (<div className="addFile" >
                                        <input multiple={true} name='file' type='file' id="files" hidden className='attachmentitem' onChange={this._handleselectedFile}></input>
                                        <i>+</i><label htmlFor="files" className='attachmentitem'>Thêm file</label>
                                    </div>) :
                                    (<div className="addFile" title="Không có quyền thêm tập tin." >
                                        <i>+</i><h3  htmlFor="files">Thêm file</h3>
                                    </div>)
                                }
                            </li>

                            {this.state.PieRequestFiles != [] && this.state.PieRequestFiles.map((item, index) => {
                                if (item.FileName.split(".")[1] == "docx" || item.FileName.split(".")[1] == "doc") {
                                    return (
                                        <li>
                                            {this.props.IsAttachment == true ?
                                                (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                                (<div className="delIcon" >˟</div>)
                                            }
                                            <a>
                                                <div className="pull-left fileType"><span className="doctype docx"></span></div>
                                                <div className="attachName">
                                                    <div className="hideCont bold">{item.FileName}</div>
                                                    {/* <span className="attachSize">300 KB</span> */}
                                                </div>
                                            </a>
                                            {/* <a download target='_blank' className='attachmentitem' href={item.FilePath} key={index}>{item.FileName}</a> */}
                                        </li>
                                    )
                                }
                                else if (item.FileName.split(".")[1] == "xlsx") {
                                    return (
                                        <li>
                                            {this.props.IsAttachment == true ?
                                                (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                                (<div className="delIcon" >˟</div>)
                                            }
                                            <a >
                                                <div className="pull-left fileType"><span className="doctype xlsx"></span></div>
                                                <div className="attachName">
                                                    <div className="hideCont bold">{item.FileName}</div>
                                                    {/* <span className="attachSize">300 KB</span> */}
                                                </div>
                                            </a>
                                            {/* <a download target='_blank' className='attachmentitem' href={item.FilePath} key={index}>{item.FileName}</a> */}
                                        </li>
                                    )
                                }
                                else if (item.FileName.split(".")[1] == "zip") {
                                    return (
                                        <li>
                                            {this.props.IsAttachment == true ?
                                                (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                                (<div className="delIcon" >˟</div>)
                                            }
                                            <a >
                                                <div className="pull-left fileType"><span className="doctype zip"></span></div>
                                                <div className="attachName">
                                                    <div className="hideCont bold">{item.FileName}</div>
                                                    {/* <span className="attachSize">300 KB</span> */}
                                                </div>
                                            </a>
                                            {/* <a download target='_blank' className='attachmentitem' href={item.FilePath} key={index}>{item.FileName}</a> */}
                                        </li>
                                    )
                                }

                            })}


                        </ul>
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PieRequestAttachment);