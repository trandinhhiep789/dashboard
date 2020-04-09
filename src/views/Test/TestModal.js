import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import Row from "../../common/components/PageLayout/Row.js";
import Col from "../../common/components/PageLayout/Col.js";
import Card from "../../common/components/PageLayout/Card.js";
import FormContainer from "../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../common/components/Form/AdvanceForm/FormControl";
import ModelContainer from "../../common/components/Modal/ModelContainer";
import TestCallService from "./TestCallService";

class MyModal extends React.Component{
  render(){
     const { title, content, onRequestClose } = this.props;
     return (
      <Modal
      onRequestClose={onRequestClose}
      effect={Effect.ScaleUp}>
      <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{title}</h4>
                            <button type="button" className="close" onClick={ModalManager.close}>
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            {this.props.children}
                          </div>
                          <div className="modal-footer">
                          <button className="btn btn-bold btn-pure btn-primary" onClick={ModalManager.close}>Đóng</button>
                          </div>
                        </div>
      
   </Modal>
     );
  }
}


/*const mapStateToProps = state => {
  return {
      AppInfo: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
      callFetchAPI: (hostname,apiPath,postData) => {
       dispatch(callFetchAPI(hostname,apiPath,postData));
    }
  }
}
const MyModal = connect(mapStateToProps, mapDispatchToProps)(MyModalCom);
*/

export default class TestModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
       
    }

    handleClick(e)
    {
       console.log("Item Click!");
    }

    /*openModal(){
      const text = this.refs.input.value;
      ModalManager.open(
      <MyModal title="Thông báo" content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}>
       <TestCallService/>
      </MyModal>
    
    );
   }
   */
    openModal(){
      const text = this.refs.input.value;
      ModalManager.open(
      <ModelContainer title="Thông báo" content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}>
       <FormContainer FormName="Thêm danh mục"
            IsAutoLayout={false} 
            >
            <Row>
                <Col><FormControl.TextBox name="txtUserName" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
                <Col><FormControl.TextBox name="txtUserName2" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
                <Col><FormControl.TextBox name="txtUserName3" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
            </Row>    
            <Row>
               <Col><button type="button" onClick={this.handleClick}>Test </button></Col>
            </Row>    
                  
            </FormContainer>
      </ModelContainer>
    );
   }
  
    render()
    {
        return(
          <div>
          <div><input type="text" placeholder="input something" ref="input" /></div>
          <div><button type="button" onClick={this.openModal.bind(this)}>Open Modal </button> </div>
        </div>
        );
    }
}