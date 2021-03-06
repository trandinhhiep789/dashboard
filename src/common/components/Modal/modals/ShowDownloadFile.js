import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { hideModal } from '../../../../actions/modal';
import { formatDate, formatMonthDate } from "../../../../common/library/CommonLib.js";
import { Link } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .65);
`;
const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  text-align: center;
  overflow-scrolling: touch;
  padding: 4px;
  cursor: pointer;
  &:after {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    margin-left: -.05em;
    content: '';
    
  }
`;
const Dialog = styled.div`
  position: relative;
  width: 100%;
  background: white;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: ${props => props.customStyle.maxWidth};
  cursor: default;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px;
`;

const Body = styled.div`
  padding-bottom: 16px;
`;

const APIHostName = "TMSAPI";
const UploadAPIPath = "api/UploadFileToServer/Upload";


class ShowDownloadFileCom extends React.Component {
    constructor(props) {
        super(props);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onDialogClick = this.onDialogClick.bind(this);
        this.listenKeyboard = this.listenKeyboard.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            DataSource: [],
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
        };
    }

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    };
    componentDidMount() {

        this.GetDataFile()
        if (this.props.onClose) {
            window.addEventListener('keydown', this.listenKeyboard, true);
        }
    }

    componentWillUnmount() {
        if (this.props.onClose) {
            window.removeEventListener('keydown', this.listenKeyboard, true);
        }
    }

    get title() {
        const { title } = this.props;

        return <h4 className="modal-title" id="myModalLabel">{title}</h4>
    }
    get close() {
        const { onClose } = this.props;
        return onClose ?
            <button className='close' onClick={this.handleClose} ><span aria-hidden="true">??</span></button>
            : <button className='close' onClick={this.handleClose}><span aria-hidden="true">??</span></button>
    }

    onOverlayClick() {
        this.props.onClose();
    };

    onDialogClick(event) {
        event.stopPropagation();
    };


    handleClose() {
        this.props.hideModal();
    }



    handleLoadSubmit() {
        this.GetDataFile()
    }


    GetDataFile() {
        // let objAdvanceRequestLoad=
        // {RequestUser:98138,DataExportTemplateID:4}

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/GetByUserTemplateID", this.props.ParamRequest).then((apiResult) => {
            console.log("GetByUserTemplateID", this.props.ParamRequest, apiResult)
            if (!apiResult.IsError) {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    IsLoadData: true
                });
            }
            // else {
            //  //   this.addNotification(apiResult.Message, apiResult.IsError);
            // }
        });

    }


    render() {

        const dateNow = new Date();

        let maxWidth = '90%';
        return (
            <div className='modals mfp-zoom-out modalconfirmcus modalconfirmcus5 modal-list-down'>
                <Overlay />
                <Content>
                    <Dialog customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            {this.title}
                            {this.close}
                        </div>
                        <Body>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell" style={{ width: "9%" }}>Th???i gian xu???t</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "9%" }}>Ng??y h???t h???n</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "20%" }}>N???i dung</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "20%" }}>T??n file xu???t</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "5%" }}>T???p tin</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "5%" }}>D??? li???u</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "5%" }}>Pass</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>Th???i gian load</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>T???ng th???i gian</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "4%" }}>Dowload</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.DataSource && this.state.DataSource.map((item, index) => {
                                                        let ExpiredDateNew = new Date(item.ExpiredDate)
                                                        let showbuttonDownload = ExpiredDateNew > dateNow;

                                                        return <tr
                                                            key={"Product" + index}
                                                        >
                                                            <td>{formatDate(item.QueueDate)}</td>
                                                            <td>{formatDate(item.ExpiredDate)}</td>
                                                            <td>{item.ExportDataParamsDescription}</td>
                                                            <td>{item.ExportedFileName}</td>
                                                            <td>{item.ExportedCompressFileSizeStr}</td>
                                                            <td>{item.IsExportedError == true ? "c?? l???i" : "kh??ng l???i"}</td>
                                                            <td>{item.ExportedFilePassword}</td>
                                                            <td>{item.LoadDataIntervalStr}</td>
                                                            <td>{item.TotalExportDataIntervalStr}</td>
                                                            <td className="action-download">
                                                                {(item.IsExported == true && item.IsExportedError == false) ?
                                                                    <React.Fragment>
                                                                        {(showbuttonDownload == true) ?
                                                                            <a
                                                                                target="_blank"
                                                                                className="btn-download-file"
                                                                                href={item.ExportedFileURL}
                                                                                data-url={item.ExportedFileURL}
                                                                                download
                                                                            >
                                                                                <img className="item" src="/src/img/icon/icon-down.gif" alt="download file icon" />
                                                                            </a>
                                                                            : <label>H???t h???n</label>
                                                                        }
                                                                    </React.Fragment>
                                                                    :
                                                                    <button className="btnHistory" onClick={this.handleLoadSubmit.bind(this)} ><i className="fa fa-history"></i></button>

                                                                }
                                                            </td>
                                                        </tr>
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Body>
                    </Dialog>
                </Content>
            </div>
        );
    }
}


ShowDownloadFileCom.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func
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
        hideModal: () => {
            dispatch(hideModal());
        }

    }
}

const ShowDownloadFile = connect(mapStateToProps, mapDispatchToProps)(ShowDownloadFileCom);
export default ShowDownloadFile;


