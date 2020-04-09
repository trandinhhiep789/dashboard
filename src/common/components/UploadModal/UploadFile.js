import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import '../../../css/upload.css'

class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.state = {
            accepted: [],
            rejected: []
        };
    }

    handleDrop(accepted, rejected) {
        // // Push all the axios request promise into a single array
        // const uploaders = files.map(file => {
        //   // Initial FormData
        //   const formData = new FormData();
        //   formData.append("file", file);
        //   formData.append("timestamp", (Date.now() / 1000) | 0);

        // console.log(formData);
        // });
        console.log("dropzone-accepted", accepted)
        console.log("dropzone-rejected", rejected)
        this.setState({ accepted, rejected });
    }

    render() {
        let ismultiple = this.props.multiple;
        let lstFile = this.state.accepted;
        //console.log(ismultiple);
        {
            {
                if (ismultiple) {
                    return (
                        <div className="upload multiple">
                            <div className="dropzone">
                                <Dropzone
                                    style={{ width: "100%", height: "100%" }}
                                    accept={this.props.accept}
                                    onDrop={(accepted, rejected) => { this.handleDrop(accepted, rejected) }}
                                    multiple={this.props.multiple}
                                    disabled={this.props.disabled}
                                    maxSize={this.props.maxSize}
                                    minSize={this.props.minSize}
                                >
                                    {/* <p>Try dropping some files here, or click to select files to upload.</p> */}
                                    <p className="frmupload">{this.props.accept}</p>
                                    {/* {this.props.maxSize !== 0 ? <p>File size Maximum: {this.props.maxSize}</p> : ''}
                                {this.props.minSize !== 0 ? <p>File size Minimum: {this.props.minSize}</p> : ''} */}

                                </Dropzone>
                            </div>

                            <div className="uploadfile">
                                {/* <h2 className="accepted-files-title">Accepted files</h2> */}
                                <div className="lstfilemutile">
                                {
                                    lstFile.map(f =>
                                        <div key={f.name} className="accepted-files">
                                            <img className="fileitem" src={f.preview} />
                                            <span className="filename">{f.name}</span>
                                        </div>
                                    )
                                }
                                </div>
                                

                                 {/* <h2 className="rejected-files-title">Rejected files</h2> */}
                                <ul className="lstfiles">
                                    {
                                        this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="upload onlyupload">
                        <div className="dropzone">
                            <Dropzone
                                style={{ width: "100%", height: "100%" }}
                                accept={this.props.accept}
                                onDrop={(accepted, rejected) => { this.handleDrop(accepted, rejected) }}
                                multiple={this.props.multiple}
                                disabled={this.props.disabled}
                                maxSize={this.props.maxSize}
                                minSize={this.props.minSize}
                            >
                                {/* <p>Try dropping some files here, or click to select files to upload.</p> */}
                                <p className="frmupload">{this.props.accept}</p>
                                <span className="txt"><i className="fa fa-upload"></i></span>
                                {/* {this.props.maxSize !== 0 ? <p>File size Maximum: {this.props.maxSize}</p> : ''}
                            {this.props.minSize !== 0 ? <p>File size Minimum: {this.props.minSize}</p> : ''} */}

                            </Dropzone>
                        </div>
                        <div className="uploadfile">
                            <h2 className="accepted-files-title">Accepted files</h2>
                            {
                                lstFile.length > 0 ? "" : <div className="filedefauld"></div>
                            }
                            {
                                lstFile.map(f => {
                                    return (
                                        <div key={f.name} className="accepted-files">
                                            <img className="fileitem" src={f.preview} />
                                            <span className="filename">{f.name}</span>
                                        </div>
                                    )
                                })
                            }
                            <h2 className="rejected-files-title">Rejected files</h2>
                            <ul className="lstfiles">
                                {
                                    this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                }
                            </ul>
                        </div>
                    </div>
                );
            }
        }

    }
}

export default UploadFile;
