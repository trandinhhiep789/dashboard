import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";
class ShipmentOrderAttachmentCom extends Component {
    constructor(props) {
        super(props);
        this._handleselectedFile = this._handleselectedFile.bind(this);
        this.state = {
            ShipmentOrderAttachment: this.props.ShipmentOrderAttachment.ShipmentOrder_AttachmentList
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderAttachment) !== JSON.stringify(nextProps.ShipmentOrderAttachment)) {
            this.setState({
                ShipmentOrderAttachment: nextProps.ShipmentOrderAttachment.ShipmentOrder_AttachmentList
            })
        }
    }

    _handleselectedFile(e) {
        var data = new FormData();
        data.append('file', e.target.files[0])
        data.append('ShipmentOrderID', this.props.ShipmentOrderAttachment.ShipmentOrderID);
        data.append('CreatedOrderTime', this.props.ShipmentOrderAttachment.CreatedOrderTime);
        data.append('CreatedUser', this.props.AppInfo.LoginInfo.Username);
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder_Attachment/UploadFileNew", data).then((apiResult) => {
            if (apiResult)
                if (apiResult.IsError == false) {
                    this.setState({
                        ShipmentOrderAttachment: apiResult.ResultObject
                    });

                }
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

    onDeletefile(e) {
        e.preventDefault();
        const postData = {
            ShipmentOrderID: this.props.ShipmentOrderAttachment.ShipmentOrderID,
            AttachmentID: e.target.dataset.id,
            DeletedUser: this.props.AppInfo.LoginInfo.Username

        }
        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_Attachment/Delete', postData).then((apiResult) => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                this.setState({
                    ShipmentOrderAttachment: apiResult.ResultObject
                })
            }
        });
    }


    render() {
        return (
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
                                    <i>+</i><h3 htmlFor="files">Thêm file</h3>
                                </div>)
                            }
                        </li>
                        {this.state.ShipmentOrderAttachment != [] && this.state.ShipmentOrderAttachment.map((item, index) => {
                            if (item.FileName.split(".")[1] == "docx" || item.FileName.split(".")[1] == "doc") {
                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={"http://wfimagecdn.tterpbeta.vn/" + item.FilePath} target="_blank" download >
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
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={"http://wfimagecdn.tterpbeta.vn/" + item.FilePath} target="_blank" download >
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
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={"http://wfimagecdn.tterpbeta.vn/" + item.FilePath} target="_blank" download >
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
                            else if (item.FileName.split(".")[1] == "pdf") {
                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={"http://wfimagecdn.tterpbeta.vn/" + item.FilePath} target="_blank" download >
                                            <div className="pull-left fileType"><span className="doctype pdf"></span></div>
                                            <div className="attachName">
                                                <div className="hideCont bold">{item.FileName}</div>
                                            </div>
                                        </a>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.onDeletefile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={"http://wfimagecdn.tterpbeta.vn/" + item.FilePath} target="_blank" download >
                                            <div className="pull-left fileType"><span className="doctype other"></span></div>
                                            <div className="attachName">
                                                <div className="hideCont bold">{item.FileName}</div>
                                            </div>
                                        </a>
                                    </li>
                                )
                            }

                        })}
                    </ul>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderAttachment = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderAttachmentCom);
export default ShipmentOrderAttachment;