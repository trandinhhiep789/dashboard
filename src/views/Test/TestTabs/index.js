import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {callGetCache} from "../../../actions/cacheAction";
import TabContainer from "../../../common/components/Tabs/TabContainer";
import TabPage from "../../../common/components/Tabs/TabPage";
import FormContainer from "../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../common/components/Form/AdvanceForm/FormControl";
import { APIHostName, LoadAPIPath, UpdateAPIPath, AddElementList, MLObjectDefinition,
    GridMLObjectDefinition, BackLink,InputLanguageColumnList } from "./constants"


class TestTabsCom extends React.Component 
    {
        constructor(props)
        {
          super(props);
          this.handleSubmit = this.handleSubmit.bind(this);
          
        }
    
        handleSubmit(formData, MLObject)
        {
            console.log("TestTabsCom handleSubmit:", MLObject);
        }
    
        
        render()
        {
            const Tab1MLObjectDefinition = [
                {
                    Name: "CategoryID",
                    DefaultValue: "",
                    BindControlName: "txtCategoryID",
                    DataSourceMember: "CategoryID"
                }
            
                
            ];

            const Tab2MLObjectDefinition = [
                {
                    Name: "UserName",
                    DefaultValue: "",
                    BindControlName: "txtUserName",
                    DataSourceMember: "UserName"
                },
                {
                    Name: "FullName",
                    DefaultValue: "",
                    BindControlName: "txtFullName",
                    DataSourceMember: "FullName"
                },
                {
                    Name: "Test",
                    DefaultValue: "",
                    BindControlName: "txtTest",
                    DataSourceMember: "Test"
                },
                {
                    Name: "Age",
                    DefaultValue: 1,
                    BindControlName: "cboAge",
                    DataSourceMember: "Age"
                },
                {
                    Name: "Description",
                    DefaultValue: "1",
                    BindControlName: "txtDescription",
                    DataSourceMember: "Description"
                },
                {
                    Name: "IsActive",
                    DefaultValue: "1",
                    BindControlName: "chkIsActive",
                    DataSourceMember: "IsActive"
                }
            
                
            ];

            const Tab3MLObjectDefinition = [
                {
                    Name: "CategoryName",
                    DefaultValue: "",
                    BindControlName: "txtCategoryName",
                    DataSourceMember: "CategoryName"
                },
                {
                    Name: "Description",
                    DefaultValue: "",
                    BindControlName: "txtDescription",
                    DataSourceMember: "Description"
                }
                ,
                {
                    Name: "Country",
                    DefaultValue: "",
                    BindControlName: "cboCountry",
                    DataSourceMember: "Country"
                }
            
                
            ];

            const Tab3DataSource = {
                CategoryName: "Điện thoại",
                Description: "Điện thoại"
            };

           
            const listOption = [{name:"Abc", value:1},{name:"XYZ", value:2}];
            const listOption1 = [
                { value: '1', name: 'Vietnam' },
                { value: '2', name: 'England' },
                { value: '3', name: 'Campuchia' },
                { value: '4', name: 'China' },
                { value: '5', name: 'Malaysia' }
              ];
            
              return(
                <FormContainer FormName="Thêm danh mục"
                MLObjectDefinition = {MLObjectDefinition} 
                listelement ={[]}
               IsAutoLayout={true} 
               onSubmit={this.handleSubmit}>
                <TabContainer defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" >
                    <TabPage title="Tab 1" name="tab1" >
                        <p>Test tab1</p>
                        <FormControl.TextBox name="txtUserName" label="Tên truy cập" controltype="InputControl" value="123" datasourcemember="UserName"/>
                    </TabPage>
                    <TabPage title="Tab 2" name="tab2" MLObjectDefinition  = {Tab2MLObjectDefinition}>
                    <FormControl.TextBox name="txtUserName" label="Tên truy cập" controltype="InputControl" value="123" datasourcemember="UserName"/>
              <FormControl.TextBox name="txtFullName" label="Họ và tên" controltype="InputControl" value="156" datasourcemember="FullName"/>
              <FormControl.TextBox name="txtTest" label="Test" controltype="InputControl" value="678" datasourcemember="TestData" />
              <FormControl.ComboBox name="cboAge" label="Tuổi"  controltype="InputControl" value={1}  listoption ={listOption} datasourcemember="Age" />
              <FormControl.TextArea name="txtDescription" label="Mô tả"  controltype="InputControl" value="Test"/>
              <FormControl.CheckBox name="chkIsActive" controltype="InputControl" value={true} />
              
                    </TabPage>
                    <TabPage title="Tab 3" name="tab3"
                     MLObjectDefinition = {Tab3MLObjectDefinition}
                    datasource = {Tab3DataSource}
                    >
                    <FormControl.TextBox name="txtCategoryName" label="Tên danh mục" controltype="InputControl" value="123" datasourcemember="CategoryName"/>
                    <FormControl.TextBox name="txtDescription" label="Mô tả" controltype="InputControl" value="123" datasourcemember="Description"/>
                    <FormControl.MultiSelectComboBox name="cboCountry" controltype="InputControl"  listoption ={listOption1} value={[1]}  />
                    </TabPage>
                </TabContainer>    
                </FormContainer>
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
    
      const TestTabs = connect(mapStateToProps, mapDispatchToProps)(TestTabsCom);
    export default TestTabs;