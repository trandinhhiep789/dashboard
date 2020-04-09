import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {callGetCache} from "../../../actions/cacheAction";
import FormContainer from "../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from "../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from "../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { APIHostName, LoadAPIPath, UpdateAPIPath, AddElementList, MLObjectDefinition,
    GridMLObjectDefinition, BackLink,InputLanguageColumnList } from "./constants"



class TestFormContainerCom extends React.Component 
{
    constructor(props)
    {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputGridDelete = this.handleInputGridDelete.bind(this);
      this.onInsertClick = this.onInsertClick.bind(this);
      this.handleDropDownItemClick  = this.handleDropDownItemClick.bind(this);
      
    }

    onInsertClick()
    {

    }

    handleSubmit(fomrData, MLObjectData)
    {
        console.log("MLObjectData:", MLObjectData);
    }
    handleInputGridDelete()
    {}
    handleDropDownItemClick(itemValue)
    {
        console.log("TestFormContainerCom.handleDropDownItemClick:", itemValue);
    }
    
    render()
    {
       
        
        const InputLanguageDataSource = [
                {
                    LanguageID: 1,
                    LanguageName: "English",
                    CategoryName: "Phone",
                    Description: ""
                },
                {
                    LanguageID: 2,
                    LanguageName: "Vietnamese",
                    CategoryName: "Điện thoại",
                    Description: ""
                }
        ];
        
        const datasource = {
            UserName: "1125",
            FullName: "Võ Minh Hiếu",
            TestData: "Test",
            Age:2
          };
          const listOption = [{name:"Abc", value:1},{name:"XYZ", value:2}];
          const listOption2 = [{name:"Khởi tạo", value:1},{name:"Phê duyệt", value:2},{name:"Kết thúc", value:3}];

          return(
            <FormContainer FormName="Thêm danh mục"
             MLObjectDefinition = {MLObjectDefinition} 
            listelement={AddElementList} IsAutoLayout={true} 
            BackLink={BackLink}
            onSubmit={this.handleSubmit}>
               <div className="row">
                            <div className="col-lg-6">
            <FormControl.TextBox name="txtProductID" colspan="8" labelcolspan="4" label="Mã sản phẩm:" 
            placeholder="Mã sản phẩm" controltype="InputControl" value="ssdđ" datasourcemember="ProductID" />
            </div>
            </div>
            <div>
              <FormControl.TextBox name="txtFullName" label="Họ và tên" controltype="InputControl" 
              value="156qq" datasourcemember="FullName"/>
              </div>
              <FormControl.TextBox name="txtTest" label="Test" controltype="InputControl" value="678" datasourcemember="TestData" />
              <FormControl.ComboBox name="cboAge" label="Tuổi" value='2' controltype="InputControl"  listoption ={listOption} datasourcemember="Age" />
              <FormControl.TextArea name="txtDescription" label="Mô tả"  controltype="InputControl" value="Test"/>
              <FormControl.CheckBox name="chkIsActive" label="Active" controltype="InputControl" value={true} />
              <FormControl.DropdownButton value="Xử lý quy trình" ListOption={listOption2} onItemClick={this.handleDropDownItemClick} />
              <InputGrid name="inputGridCategoryLang" controltype="InputControl" 
              listColumn={InputLanguageColumnList}
              dataSource={InputLanguageDataSource}
              MLObjectDefinition = {GridMLObjectDefinition}
              colspan = "10"
              onDeleteClick = {this.handleInputGridDelete}
              onInsertClick = {this.handleInputGridInsert}
             

              />
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

  const TestFormContainer = connect(mapStateToProps, mapDispatchToProps)(TestFormContainerCom);
export default TestFormContainer;