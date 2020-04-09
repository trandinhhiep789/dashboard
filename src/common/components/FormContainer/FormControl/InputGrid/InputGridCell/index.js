import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { formatDate } from "../../../../../library/CommonLib.js";
import { callGetCache } from "../../../../../../actions/cacheAction";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class InputGridCellCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Listoption: [],
      IsDisabled: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeALL = this.handleInputChangeALL.bind(this);
    this.handleonClickEdit = this.handleonClickEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    const validatonDisabled = this.props.isDisabled;
    if (this.props.AppInfo.LoginInfo.Username == "administrator") {
      this.setState({
        IsDisabled: false
      })
    }
    else {
      if (validatonDisabled) {
        this.setState({
          IsDisabled: true
        })
      }
      else {
        this.setState({
          IsDisabled: false
        })
      }
    }

    if (this.props.type == "combobox" || this.props.type == "comboboxCus") {
      let listOption = [];
      //  console.log("componentDidMount: ", this.props.IsAutoLoadItemFromCache)
      if (this.props.IsAutoLoadItemFromCache) {
        const cacheKeyID = this.props.LoadItemCacheKeyID;
        const valueMember = this.props.ValueMember;
        const nameMember = this.props.NameMember;
        // console.log("componentDidMount: ", cacheKeyID,valueMember,nameMember)
        const keyFilter = this.props.KeyFilter;
        const valueFilter = this.props.ValueFilter;
        const isCategory = this.props.isCategory;
        const CategoryTypeID = this.props.CategoryTypeID;
        this.props.callGetCache(cacheKeyID).then((result) => {

          if (!result.IsError && result.ResultObject.CacheData != null) {
            listOption = [{ value: -1, label: "--Vui lòng chọn--" }];

            if (!isCategory) {
              if (this.props.IsFilterData) {
                result.ResultObject.CacheData.map((cacheItem) => {
                  if (cacheItem[keyFilter] === valueFilter) {
                    listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
                  }
                }
                );
              }
              else {
                result.ResultObject.CacheData.map((cacheItem) => {
                  listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
                }
                );
              }
              this.setState({ Listoption: listOption });
            }
            else {

              const filterdata = result.ResultObject.CacheData.filter(a => a.CategoryTypeID == CategoryTypeID);
              //  console.log("filterdata", CategoryTypeID, filterdata);
              const categoryTree = this.createCategoryTree(filterdata, 0, 0);
              //  console.log("categoryTree", CategoryTypeID, filterdata, categoryTree);
              this.setState({ Listoption: categoryTree });
            }


          }
        }
        );
      }
      else {
        listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
        this.setState({ Listoption: listOption });
      }
      //console.log("FormElement listOption 2: ", listOption)
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


  handleonClickEdit(e) {
    if (this.props.isSystem) {
      return;
    }
    const id = e.currentTarget.dataset.id;
    this.props.onInsertClickEdit(id);
  }

  handleInputChange(e) {
    const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
    let inputvalue = e.target.value;
    if (e.target.type == 'checkbox') {
      inputvalue = ischecked;
    }
    if (e.target.type == 'combobox') {
      inputvalue = parseInt(e.target.value);
    }
    const inputname = e.target.name;
    const elementdata = { Name: inputname, Value: inputvalue, cation: this.props.cation, validatonList: this.props.validatonList };
    // console.log("handleInputChange",elementdata, this.props.index);
    this.props.onValueChange(elementdata, this.props.index);
  }

  handleInputChangeALL(e) {
    const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
    let inputvalue = e.target.value;
    if (e.target.type == 'checkbox') {
      inputvalue = ischecked;
    }
    this.props.onValueChangeALL(inputvalue, this.props.index);
  }

  handleEditClick() {
    if (this.props.onHandleEditClick != null)
      this.props.onHandleEditClick(this.props.index);

  }

  render() {
    const type = this.props.type;
    let text = ReactHtmlParser(this.props.text);
    const to = this.props.to + text;
    const linkText = this.props.linkText;
    if (text.length > 50) {
      const truncate = (
        value = '',
        at = '',
        num = 0,
        elipsis = '\u2026', /* ... */
      ) => ((val, k = val[0] === value) =>
        `${(k ? [...value] : val).splice(0, num)
          .join(k ? '' : at)}${k ? at : ''}${elipsis}`)
          (value.split(at));
      text = truncate(text, '', 50);
    }

    let control = "";
    if ((this.props.IsPermisionAdd === true || this.props.IsPermisionAdd === undefined) && this.props.Ispopup === false) {
      switch (type) {
        case "text":
          return <label>{text}</label>;
        case "date":
          {
            const datestring = formatDate(text);
            return <label>{datestring}</label>;
          }
        case "checkicon":
          {
            if (text) {
              return <span className="fa fa-check"></span>;
            }
            return null;
          }
        case "checkbox":
          {
            let className = "form-control form-control-sm";
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;
            if (this.props.IsPermisionDelete == true || this.props.IsPermisionDelete == undefined) {
              return <input type="checkbox" name={this.props.name} className={className}
                onChange={this.handleInputChange} value={text} checked={this.props.isChecked} />;
            } else {
              return <input type="checkbox" disabled={true} checked={this.props.isChecked} name={this.props.name} className={className}
                value={text} />;
            }
          }
        case "checkboxAll":
          {
            let className = "form-control form-control-sm";
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;

            if (this.props.IsPermisionDelete == true || this.props.IsPermisionDelete == undefined) {
              return <input type="checkbox" name={this.props.name} className={className}
                onChange={this.handleInputChangeALL} value={text} checked={this.props.isChecked} />;
            } else {
              return <input type="checkbox" disabled={true} name={this.props.name} className={className}
                value={text} />;
            }

          }
        case "textbox":
          {
            let className = "form-control form-control-sm";
            if (this.props.validationErrorMessage != "") {
              className = "form-control form-control-sm is-invalid";
            }
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;

            return <input type="text" name={this.props.name} title={this.props.validationErrorMessage} className={className}
              onChange={this.handleInputChange} defaultValue={text} />;
          }

        case "combobox":
          {
            let className = "form-control form-control-sm";
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;

            const listOption = this.state.Listoption;
            //  console.log(this.props.value==""?-1:this.props.value,this.props.value);
            // console.log(parseInt(this.props.value==""?-1:this.props.value));
            return (
              <select className={this.props.CSSClassName} name={this.props.name}
                onChange={this.handleInputChange} value={parseInt(this.props.value == "" ? -1 : this.props.value)}
                className={className} >
                {listOption && listOption.map((optionItem) =>
                  <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
                )}
              </select>
            );
          }
        case "link":
          return <Link to={to}>{linkText}</Link>;
        case "edit":
          return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>;
        case "editnew":
          return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Edit"><i className="ti-pencil"></i></a>;
        case "buttonEdit":
          return (
            <button type="button" className="btn" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleEditClick}>
              <span className="fa fa-plus ff"> Chỉnh sửa</span>
            </button>
          );
        default:
          return <label>{text}</label>;
      }
    }
    else {
      switch (type) {
        case "date":
          {
            const datestring = formatDate(text);
            return <label>{datestring}</label>;
          }

        case "checkboxAll":
          {
            let className = "form-control form-control-sm";
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;

            if (this.props.IsPermisionDelete == true || this.props.IsPermisionDelete == undefined) {
              return <input type="checkbox" name={this.props.name} className={className}
                onChange={this.handleInputChangeALL} value={text} checked={this.props.isChecked} />;
            } else {
              return <input type="checkbox" disabled={true} name={this.props.name} className={className}
                value={text} />;
            }
          }
        case "checkbox":
          {
            let className = "form-control form-control-sm";
            if (this.props.CSSClassName != null)
              className = this.props.CSSClassName;
            return <input type="checkbox" disabled={true} checked={this.props.isChecked} name={this.props.name} className={className}
              value={text} />;
          }
        case "link":
          return <Link to={to}>{linkText}</Link>;
        case "edit":
          return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>;
        case "editnew":
          if (this.props.IsPermisionEdit == true || this.props.IsPermisionEdit == undefined) {
            return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Edit"><i className="ti-pencil"></i></a>;
          } else {
            return <a title="" className="nav-link hover-primary" data-id={this.props.index} title="Edit"><i className="ti-pencil"></i></a>;
          }

        case "buttonEdit":
          return (
            <button type="button" className="btn" title="" data-provide="tooltip" data-original-title="Thêm" onClick={this.handleEditClick}>
              <span className="fa fa-plus ff"> Chỉnh sửa</span>
            </button>
          );
        default:
          return <label>{text}</label>;
      }
    }
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

const InputGridCell = connect(mapStateToProps, mapDispatchToProps)(InputGridCellCom);
export default InputGridCell;
