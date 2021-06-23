import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";

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
        this.state = {
            FormData: [],
            FormValidation: this.props.formValidation ? this.props.formValidation : {},
            selectedFile: {}
        };
    }

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    };
    componentDidMount() {
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
            <button className='close' onClick={onClose} ><span aria-hidden="true">×</span></button>
            : <button className='close'><span aria-hidden="true">×</span></button>
    }

    onOverlayClick() {
        this.props.onClose();
    };

    onDialogClick(event) {
        event.stopPropagation();
    };



 
    // onHandleUpload() {
    //     const data = new FormData()
    //     const fileList = this.state.selectedFile;
    //     Object.keys(fileList).forEach(function (key) {
    //         data.append(key, fileList[key])
    //     });
    //     this.props.callFetchAPI(APIHostName, "api/PieRequest_Attachment/Upload", data).then((apiResult) => {
    //         if (!apiResult.IsError) {
    //             // this.callSearchData(this.state.SearchData);
    //         }
    //         // this.setState({ IsCallAPIError: apiResult.IsError });
    //         // this.showMessage(apiResult.Message);
    //     });

    // }
  
   

    render() {
       
        let maxWidth = '900px';
        return (
            <div className='modals mfp-zoom-out modalconfirmcus modalconfirmcus5'>
                <Overlay />
                <Content onClick={this.onOverlayClick}>
                    <Dialog onClick={this.onDialogClick} customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            {this.title}
                            {this.close}
                        </div>
                        <Body>
                            hoclenho
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
        }

    }
}

const ShowDownloadFile = connect(mapStateToProps, mapDispatchToProps)(ShowDownloadFileCom);
export default ShowDownloadFile;


