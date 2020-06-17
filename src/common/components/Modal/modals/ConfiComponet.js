import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { hideModal } from '../../../../actions/modal';
import FormElement from '../../../../common/components/FormContainer/FormElement';
import { ValidationField } from "../../../library/validation.js"


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
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
`;

class ConfiComponet extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        const formData = this.bindData();
  
        this.state = {
            FormData: formData,
            Title: this.props.title ? this.props.title : ""
        };
    }

    bindData() {
        console.log("bindData",this.props);
    }

    handleClose() {
        this.props.hideModal();
    }


 
    render() {
        const { Title } = this.state;
        let maxWidth = '900px';
        if (this.props.maxWidth) maxWidth = this.props.maxWidth;
        return (
            <div className='modals mfp-zoom-out modalconfirmcus modalconfirmcus3'>
                <Overlay />
                <Content onClick={this.onOverlayClick}>
                    <Dialog onClick={this.onDialogClick} customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            {Title}

                            <button type="button" className="close" onClick={this.handleClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <Body>
                        {this.props.content.text}   
                            <div className="modal-footer">
                                <button className="btn btn-w-md btn-round btn-info" type="button" >Cập nhật</button>
                                <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose}>Bỏ qua</button>
                            </div>
                        </Body>
                    </Dialog>
                </Content>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};
export default connect(null, mapDispatchToProps)(ConfiComponet);
