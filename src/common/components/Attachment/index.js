import React, { Component } from "react";
import { connect } from 'react-redux';
import { CDN_UPLOAD_FILE } from '../../../constants/systemVars.js'

class AttachmentCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Attachments: this.props.DataAttachment
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.DataAttachment) !== JSON.stringify(nextProps.DataAttachment)) {
            this.setState({
                Attachments: nextProps.DataAttachment
            })
        }
    }

    handleSelectedFile(e) {
        this.props.onSelectFile(e)
    }

    handleDeleteFile(e) {
        e.preventDefault();
        const id = e.target.dataset.id;
        this.props.onDeletefile(id)
    }


    render() {
        const { Attachments } = this.state;

        return (
            <div className='card'>
                <div className="card-title group-card-title">
                    <h4 className="title">Tập tin đính kèm</h4>
                </div>
                <div className='card-body'>

                    <ul className="attachedList">
                        <li>
                            {this.props.IsAttachment == true ?
                                (<div className="addFile" >
                                    <input multiple={true} name='file' type='file' id="files" hidden className='attachmentitem' onChange={this.handleSelectedFile.bind(this)}></input>
                                    <i>+</i><label htmlFor="files" className='attachmentitem'>Thêm file</label>
                                </div>) :
                                (<div className="addFile" title="Không có quyền thêm tập tin." >
                                    <i>+</i><h3 htmlFor="files">Thêm file</h3>
                                </div>)
                            }
                        </li>
                        {
                            this.state.Attachments != [] && this.state.Attachments.map((item, index) => {
                                const listTypeFile = ["docx", "doc", "zip", "xlsx", "pdf", "png", "jpg"]
                                let typeFile = listTypeFile.find(i => i == item.FileName.split(".")[1].trim())
                                if (typeFile == undefined) {
                                    typeFile = "default"
                                }

                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={item.AttachmentID} onClick={this.handleDeleteFile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href={CDN_UPLOAD_FILE + item.FilePath} target="_blank" download >
                                            <div className="pull-left fileType"><span className={`doctype ${typeFile}`}></span></div>
                                            <div className="attachName">
                                                <div className="hideCont bold">{item.FileName}</div>
                                                {/* <span className="attachSize">300 KB</span> */}
                                            </div>
                                        </a>
                                        {/* <a download target='_blank' className='attachmentitem' href={item.FilePath} key={index}>{item.FileName}</a> */}
                                    </li>
                                )
                            })
                        }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const Attachment = connect(mapStateToProps, mapDispatchToProps)(AttachmentCom);
export default Attachment;