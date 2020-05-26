import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../../library/validation.js";
import { callGetCache } from "../../../../actions/cacheAction";
import { UploadModal } from "../../UploadModal/index";
import { ModalManager } from 'react-dynamic-modal';
import Datetime from 'react-datetime';
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import JoditEditor from "jodit-react";
class FormElementCom extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showUploadModal = this.showUploadModal.bind(this);
    this.state = {
      value: this.props.value,
      content: "",
      ValidationError: "",
      Listoption: []
    };
  }

  componentDidMount() {
    if (this.props.type == "Editor") {
      this.setState({
        content: this.props.value
      })
    }
    if (this.props.type == "select" || this.props.type == "combobox") {
      let listOption = this.props.listoption;
      if (this.props.IsAutoLoadItemFromCache) {
        const cacheKeyID = this.props.LoadItemCacheKeyID;
        const valueMember = this.props.ValueMember;
        const nameMember = this.props.NameMember;
        const isCategory = this.props.isCategory;
        this.props.callGetCache(cacheKeyID).then((result) => {
          listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
          if (!result.IsError && result.ResultObject.CacheData != null) {
            if (!isCategory) {

              result.ResultObject.CacheData.map((cacheItem) => {
                listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
              }
              );
              this.setState({ Listoption: listOption });
            }
            else {
              const categoryTree = this.createCategoryTree(result.ResultObject.CacheData, 0, 0);
              this.setState({ Listoption: categoryTree });
            }
          }
          else {
            this.setState({ Listoption: listOption });
          }
          //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
        });
      }
      else {
        //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
        this.setState({ Listoption: listOption });
      }
    }
  }

  categoryNamePrefix(categoryLevel) {
    let resultStr = "";
    for (let i = 0; i < categoryLevel; i++) {
      resultStr += "---";
    }
    return resultStr;
  }
  createCategoryTree(originListItem) {
    let childListItem = originListItem.filter(item => item.ParentID == 0);
    //  console.log("createCategoryTree childListItem:", childListItem);
    let itemListResult = [{ value: -1, label: "--Vui lòng chọn--" }];
    for (let i = 0; i < childListItem.length; i++) {
      itemListResult.push({ value: childListItem[i].CategoryID, label: childListItem[i].CategoryName });
      let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].CategoryID, 1);
      // console.log("createCategoryTree childItemTree:", childItemTree);
      for (let j = 0; j < childItemTree.length; j++) {
        //itemListResult.push(childItemTree[j]);
        itemListResult.push({ value: childItemTree[j].CategoryID, label: childItemTree[j].CategoryName });
      }
    }
    return itemListResult;
  }
  createChildCategoryTree(originListItem, parentID, categoryLevel) {
    let childListItem = originListItem.filter(item => item.ParentID == parentID);
    // console.log("createChildCategoryTree childListItem:", childListItem);
    let itemListResult = []
    for (let i = 0; i < childListItem.length; i++) {
      let item = childListItem[i];
      item.CategoryName = this.categoryNamePrefix(categoryLevel) + item.CategoryName;
      //   console.log("createChildCategoryTree childListItem:",item);
      itemListResult.push(item);
      //itemListResult.push({ value: item.CategoryID, label: item.CategoryName });
      const newCategoryLevel = categoryLevel + 1;
      let childListItem2 = originListItem.filter(item => item.ParentID == item.CategoryID);
      //  console.log("createChildCategoryTree childListItem2:",childListItem2);
      if (childListItem2.length > 0) {
        const childItemTree2 = this.createChildCategoryTree(originListItem, item.CategoryID, newCategoryLevel);
        for (j = 0; j < childItemTree2.length; j++) {
          itemListResult.push(childItemTree2[j]);
          itemListResult.push({ value: childItemTree2[j].CategoryID, label: childItemTree2[j].CategoryName });
        }
      }
    }
    return itemListResult;

  }
  componentWillReceiveProps() {
  }

  handleInputChange(e) {
    let ischecked = e.target.type == 'checkbox' ? e.target.checked : e.target.value;
    const inputname = e.target.name;
    let inputvalue = e.target.value;
    if (e.target.type == 'checkbox') {
      inputvalue = ischecked;
    }
    if (e.target.type == 'select-one') {
      inputvalue = parseInt(e.target.value);
    }


    let id = e.target.id;
    if (id != "") {
      let elementdata = { [inputname]: inputvalue, [id]: e.target.options[e.target.selectedIndex].label };
      this.props.onValueChange(inputname, inputvalue, this.props.label, undefined, this.props.validatonList, elementdata);
    }
    else {
      this.props.onValueChange(inputname, inputvalue, this.props.label, undefined, this.props.validatonList, undefined);

    }
  }
  handleDateTimeChange(inputname, moment) {
    this.validateInput(inputname, moment ? moment._d : null);
  }

  config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    }
  }
  onChangeEditor() {
    //console.log("FormElement componentWillReceiveProps:", this.props);
    //this.setState({value: this.props.value});
  }
  onChangeEditor = editorState => {
    this.props.onValueChange(this.props.name, editorState, this.props.label, undefined, this.props.validatonList, undefined);

  };

  showUploadModal() {
    ModalManager.open(<UploadModal title="Upload File"
      onRequestClose={() => true}
      accept={this.props.accept}
      multiple={this.props.multiple}
      disabled={this.props.disabled}
      maxSize={this.props.maxSize}
      minSize={this.props.minSize}
    />);
  }

  render() {
    const type = this.props.type;
    // console.log("type",type);
    const icon = this.props.icon;
    var checked = false;
    if (this.props.checked)
      checked = true;

    let formGroupclassName = "form-group col-md-8";
    if (this.props.IsThreeColumnForm) {
      let formGroupclassName = "form-group col-md-2";
    }
    let controlCSSClassName = this.props.CSSClassName;
    if (this.props.validationErrorMessage != null) {
      if (this.props.validationErrorMessage.length > 0) {
        formGroupclassName += " has-error has-danger";
        controlCSSClassName += " is-invalid";
      }
    }

    if (type == "Editor") {
      formGroupclassName = "form-group col-md-8 editEditor";
    }

    const listOption = this.state.Listoption;

    let control;
    switch (type) {
      case "textarea":
        control = <textarea className={this.props.CSSClassName} name={this.props.name} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
        break;
      case "select":
        control = (
          <select className={this.props.CSSClassName}  ref={this.props.inputRef} name={this.props.name} onChange={this.handleInputChange} value={this.props.value}>
            {listOption.map((optionItem) =>
              <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
            )}
          </select>
        );
        break;
      case "combobox":
        control = (
          <select className={this.props.CSSClassName}  ref={this.props.inputRef} type={this.props.type} id={this.props.id} name={this.props.name}
            onChange={this.handleInputChange} value={parseInt(this.props.value == "" ? -1 : this.props.value)} >
            {listOption.map((optionItem) =>
              <option key={optionItem.value} value={optionItem.value}>{optionItem.label}</option>
            )}
          </select>
        );
        break;
      case "radiogroup":
        const listValue = this.props.listoption;
        control = (<div>
          {listValue.map((valueItem) =>
            <div>
              <input className={this.props.CSSClassName} name={this.props.name} type="radio" value={valueItem.value} key={valueItem.value} onChange={this.handleInputChange} />
              {valueItem.name}
            </div>
          )}
        </div>
        );
        break;
      case "checkbox":
        control = <input name={this.props.name} type={this.props.type} defaultChecked={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
        break;
      case "radio":
        control = <input className={this.props.CSSClassName} name={this.props.name} type={this.props.type} defaultValue={this.props.value} checked={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
        break;
      case "text":
        control = <input className={controlCSSClassName}  ref={this.props.inputRef} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
        break;
      case "file":
        const CSSClassName = this.props.CSSClassName + "btn btn-bold btn-pure btn-primary"
        control = <button className={CSSClassName} type="button" onClick={this.showUploadModal}>{this.props.label}</button>
        break;
      case "Editor":
        control = (
          <JoditEditor
            ref={null}
            value={this.state.content}
            config={this.config}
            tabIndex={1} // tabIndex of textarea
            onBlur={this.onChangeEditor.bind(this)}
            onChange={this.onChangeEditor.bind(this)}
          />
        );
        break;
      case "img":
        control = <img name="DefaultImageURL" src="/src/img/avatar/1.jpg" data-original-src="../assets/img/gallery/1.jpg" />
        break;
      case 'datetime':
        control = <Datetime dateFormat="DD/MM/YYYY" value={this.props.value} readOnly={this.props.readonly} name={this.props.name} type={this.props.type} className={CSSClassName} onChange={(moment) => this.handleDateTimeChange(this.props.name, moment)}></Datetime>
        break;
      default:
        control = <input className={controlCSSClassName} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
        break;
    }
    let divControl = (
      <React.Fragment>
        <div className="form-group col-md-4">
          <label className="col-form-label modal-label-left">{this.props.label}</label>
        </div>
        <div className={formGroupclassName}>
          {control}
          <div className="invalid-feedback">
            <ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul>
          </div>
        </div>

      </React.Fragment>
    );
    if (this.props.IsSearchForm) {
      divControl = (
        <div className="input-group">
          <label className="col-form-label">{this.props.label}</label>
          {control}
        </div>
      );
    }

    return divControl;
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
const FormElement = connect(mapStateToProps, mapDispatchToProps)(FormElementCom);
export default FormElement;