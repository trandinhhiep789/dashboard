import React, { Component } from "react";
import { connect } from 'react-redux';
import { CDN_UPLOAD_FILE } from '../../../../constants/systemVars.js'
import ReactTooltip from 'react-tooltip';

class FileAttachmentCom extends Component {
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

        let formRowClassName = "form-row ";
        if (this.props.classNameCustom != null) {
            formRowClassName += this.props.classNameCustom;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }

        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let arrTemp = [];
        if (Attachments.length > 0) {

            arrTemp = Object.assign([], Attachments)
            console.log("arrTemp", arrTemp)

        }

        return (
            <div className={formRowClassName}>
                {this.props.label.length > 0 ?
                    <div className={labelDivClassName}>
                        <label className="col-form-label">
                            {this.props.label}
                        </label>
                    </div>
                    : ""
                }
                <div className={formGroupClassName}>


                    <ul className="attachedList">
                        {
                            (!!arrTemp && arrTemp.length == 0) && <li>
                                {this.props.IsAttachment == true ?
                                    (<div className="addFile" >
                                        <input multiple={true} name='file' type='file' id="files" hidden className='attachmentitem' onChange={this.handleSelectedFile.bind(this)}></input>
                                        <i>+</i><label htmlFor="files" className='attachmentitem'>Thêm file</label>
                                    </div>) :
                                    (
                                        <React.Fragment>
                                            <div className="addFile" data-tip data-for="btnAttachmentID">
                                                <i>+</i>
                                                <h3 htmlFor="files">Thêm file</h3>
                                            </div>
                                            <ReactTooltip id="btnAttachmentID" type='warning'>
                                                <span>Bạn không file được.</span>
                                            </ReactTooltip>
                                        </React.Fragment>

                                    )
                                }
                            </li>
                        }

                        {
                            (!!arrTemp && arrTemp.length > 0) && arrTemp.map((item, index) => {
                                const listTypeFile = ["docx", "doc", "zip", "xlsx", "pdf", "png", "jpg"]
                                let typeFile = listTypeFile.find(i => i == item.name.split(".")[1].trim())
                                if (typeFile == undefined) {
                                    typeFile = "default"
                                }
                                console.log("typeFile", typeFile)

                                return (
                                    <li key={index}>
                                        {this.props.IsAttachment == true ?
                                            (<div className="delIcon" data-id={index} onClick={this.handleDeleteFile.bind(this)} >˟</div>) :
                                            (<div className="delIcon" >˟</div>)
                                        }
                                        <a href="#" target="_blank" download >
                                            <div className="pull-left fileType"><span className={`doctype ${typeFile}`}></span></div>
                                            <div className="attachName">
                                                <div className="hideCont bold">{item.name}</div>
                                            </div>
                                        </a>
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


const FileAttachment = connect(mapStateToProps, mapDispatchToProps)(FileAttachmentCom);
export default FileAttachment;