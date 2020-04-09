import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Row from "../../common/components/PageLayout/Row.js";
import Col from "../../common/components/PageLayout/Col.js";
import Card from "../../common/components/PageLayout/Card.js";
import FormContainer from "../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../common/components/Form/AdvanceForm/FormControl";




class TestPageLayoutCom extends React.Component 
    {
        constructor(props)
        {
          super(props);
          
          
        }
    
        
        
        render()
        {
            
              return(
                <Col   lg="12">
                <Row>
                     <Col lg="12" md="12" sm="12" xs="12">
                      <Card CardTitle="Test Layout">
                      <Row>
                          <Col lg="3">1</Col>
                          <Col lg="3">2</Col>
                          <Col lg="3">3</Col>
                          <Col lg="3">4</Col>
                       </Row>   
                       <Row>
                          <Col>1</Col>
                          <Col>2</Col>
                         
                       </Row>
                      </Card>
                     </Col>
                     
                </Row>   
                <Row>
                     <Col lg="12" md="12" sm="12" xs="12">
                     <FormContainer FormName="Thêm danh mục"
            IsAutoLayout={false} 
            >
            <Row>
                <Col><FormControl.TextBox name="txtUserName" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
                <Col><FormControl.TextBox name="txtUserName2" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
                <Col><FormControl.TextBox name="txtUserName3" label="Tên truy cập" controltype="InputControl" value="123"/></Col>
            </Row>    
              
                  
            </FormContainer>
                     </Col>
                </Row>
                </Col> 
              );
        }
    
    }
    
    const mapStateToProps = state => {
        return {
            AppInfo: state
        }
      }
    
      const mapDispatchToProps = dispatch => {
        return {
            callGetCache: (cacheKeyID) => {
             return dispatch(callGetCache(cacheKeyID));
          }
        }
      }
    
      const TestPageLayout = connect(mapStateToProps, mapDispatchToProps)(TestPageLayoutCom);
    export default TestPageLayout;