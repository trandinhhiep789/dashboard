import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import FormElement from '../../../common/components/Form/FormElement';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import ReactPlayer from 'react-player';

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

function bindDataToControl(listElement, formData) {
    let listElement1 = listElement;
    //console.log("formData:", formData);
    //console.log("listElement:", listElement)
    if (typeof formData != "undefined") {
        listElement1 = listElement.map((elementItem) => {
            const elementvalue = formData[elementItem.Name];
            if (typeof elementvalue != "undefined") {
                const newElementItem = Object.assign({}, elementItem, { value: elementvalue });
                return newElementItem;
            }
            return elementItem;
        });
    }
    return listElement1;
}

class ModalCom extends React.Component {
    constructor(props) {
        super(props);
        this.elementItemRefs = [];
        this.listenKeyboard = this.listenKeyboard.bind(this);
        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onDialogClick = this.onDialogClick.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.onHandleUpload = this.onHandleUpload.bind(this);
        let formData = {};
        if (this.props.modalElementList) {
            const modalElementList = bindDataToControl(this.props.modalElementList, this.props.formData);
            modalElementList.map((elementItem) => {
                const elementname = elementItem.Name;
                formData = Object.assign({}, formData, { [elementname]: elementItem.value });
            });
        }

        this.state = {
            FormData: formData,
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
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.formValidation) !== JSON.stringify(nextProps.formValidation)) {
            this.setState({ FormValidation: nextProps.formValidation });
        }
        //focus vào field không hợp lệ khi submit
        if (nextProps.isSubmit) {
            this.checkInput(nextProps.formValidation);
        }
    }

    get title() {
        const { title } = this.props;

        // return onClose ? (
        //   <div className='modal__close' onClick={onClose} ><span aria-hidden="true">×</span></div>
        // ) : null;

        return <h4 className="modal-title" id="myModalLabel">{title}</h4>
    }
    get close() {
        const { onClose } = this.props;
        return onClose ?
            <button className='close' onClick={onClose} ><span aria-hidden="true">×</span></button>
            : <button className='close'><span aria-hidden="true">×</span></button>
    }

    onOverlayClick() {
        //this.props.onClose();
    };

    onDialogClick(event) {
        event.stopPropagation();
    };

    checkInput(formValidation) {
        for (const key in formValidation) {
            if (formValidation[key].IsValidationError) {
                if (typeof this.elementItemRefs[key].focus !== "undefined") {
                    this.elementItemRefs[key].focus();
                }
                return false;
            }

        }
        return true;
    }

    valueChange(elementname, elementvalue, isValidatonError, validatonErrorMessage) {
        const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue });
        const validationObject = { IsValidatonError: isValidatonError, ValidatonErrorMessage: validatonErrorMessage }
        const formValidation = Object.assign({}, this.state.FormValidation, { [elementname]: validationObject });
        this.setState({
            FormData: formData,
            FormValidation: formValidation
        });
        this.props.onValueChange(formData, formValidation, elementname, elementvalue);
    }

    onHandleSelectedFile(file, name, nameValue) {
        const filelist = Object.assign({}, this.state.selectedFile, { [nameValue]: file });
        const formData = Object.assign({}, this.state.FormData, { [name]: file.name });
        this.setState({
            selectedFile: filelist,
            FormData: formData
        })
        this.props.onHandleSelectedFile(filelist);
    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        if (this.props.onHandleSelectedFile != null) {
            this.props.onHandleSelectedFile(file, nameValue, isDeletetedFile);
        }

    }

    onHandleUpload() {
        const data = new FormData()
        const fileList = this.state.selectedFile;
        Object.keys(fileList).forEach(function (key) {
            data.append(key, fileList[key])
        });
        this.props.callFetchAPI(APIHostName, "api/PieRequest_Attachment/Upload", data).then((apiResult) => {
            if (!apiResult.IsError) {
                // this.callSearchData(this.state.SearchData);
            }
            // this.setState({ IsCallAPIError: apiResult.IsError });
            // this.showMessage(apiResult.Message);
        });

    }
    renderModalFormElement() {
        const modalElementList = this.props.modalElementList;
        //console.log("modalElementList",modalElementList);
        return (
            <div className="card-body" style={{ textAlign: 'left' }}>
                {
                    modalElementList.map((elementItem, index) => {
                        let validationErrorMessage = "";
                        if (this.state.FormValidation[elementItem.Name] != null) {
                            validationErrorMessage = this.state.FormValidation[elementItem.Name].ValidationErrorMessage;
                        }
                        return (
                            <div className="form-row" key={"div" + elementItem.Name}>
                                <FormElement type={elementItem.type} name={elementItem.Name}
                                    CSSClassName="form-control form-control-sm"
                                    value={this.state.FormData[elementItem.Name]}
                                    selectedValue={elementItem.selectedValue}
                                    label={elementItem.label} placeholder={elementItem.placeholder}
                                    labelError={elementItem.labelError}
                                    colspan={elementItem.colspan}
                                    icon={elementItem.icon}
                                    rows={elementItem.rows}
                                    onValueChange={this.valueChange}
                                    onHandleSelectedFile={this.handleSelectedFile}
                                    onHandleUpload={this.onHandleUpload}
                                    cdn={elementItem.cdn}
                                    listoption={elementItem.listoption}
                                    key={elementItem.Name}
                                    readonly={elementItem.readonly}
                                    disabled={elementItem.disabled}
                                    isDisabled={elementItem.disabled}
                                    validatonList={elementItem.validatonList}
                                    validationErrorMessage={validationErrorMessage}
                                    IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
                                    LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
                                    ValueMember={elementItem.ValueMember}
                                    NameMember={elementItem.NameMember}
                                    acceptType={elementItem.AcceptType}
                                    IsModalForm={true}
                                    min={elementItem.Min}
                                    max={elementItem.Max}
                                    maxSize={elementItem.maxSize}
                                    elementItem={elementItem}
                                    inputRef={ref => this.elementItemRefs[elementItem.Name] = ref}
                                    isMulti={elementItem.isMulti}
                                />
                            </div>);
                    }
                    )
                }
            </div>
        );
    }

    renderModalPreviewMedia() {
        switch (this.props.typeMedia) {
            case "image":
                return (
                    <div className="card-body">
                        <img src={this.props.src} />
                    </div>
                );
            case "video":
                return (
                    // <div className="card-body">
                    //     <iframe width="420" height="345" src={this.props.src} />
                    // </div>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={this.props.src}
                            width='100%'
                            height='100%'
                            playing
                            controls
                        />
                    </div>
                );
        }

    }

    render() {
        let elmentRender = "";
        let maxWidth = '900px';
        if (this.props.modalElementList) elmentRender = this.renderModalFormElement();
        if (this.props.typeMedia) elmentRender = this.renderModalPreviewMedia();
        if (this.props.maxWidth) maxWidth = this.props.maxWidth;
        return (
            <div className='modals mfp-zoom-out modalconfirmcus modalconfirmcus4'>
                <Overlay />
                <Content onClick={this.onOverlayClick}>
                    <Dialog onClick={this.onDialogClick} customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            {this.title}
                            {this.close}
                        </div>
                        <Body>
                            {elmentRender}
                            {this.props.children}
                        </Body>
                    </Dialog>
                </Content>
            </div>
        );
    }
}
ModalCom.propTypes = {
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

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalCom);
export default Modal;