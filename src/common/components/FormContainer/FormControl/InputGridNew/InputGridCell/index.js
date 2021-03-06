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
    this.handleonClickEdit = this.handleonClickEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleonClickDelete = this.handleonClickDelete.bind(this);
    
  }

  componentDidMount() {

  }


  handleonClickEdit(e) {
    const id = e.currentTarget.dataset.id;
    this.props.onInsertClickEdit(id);
  }

  handleonClickDelete(e) {
    if (this.props.onhandleonClickDelete != null)
      {
        this.props.onhandleonClickDelete(this.props.lstdelete);
      }
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
          return (
            <div>
              <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Edit"><i className="ti-pencil"></i></a>
              <a title="" className="nav-link hover-primary" title="Edit"><i className="ti-pencil"></i></a></div>
          );
        case "buttonEdit":
          return (
            <button type="button" className="btn" title="" data-provide="tooltip" data-original-title="Th??m" onClick={this.handleEditClick}>
              <span className="fa fa-plus ff"> Ch???nh s???a</span>
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
            return (
              <div>
                <a title="" className="table-action hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Ch???nh s???a"><i className="ti-pencil"></i></a>
                <a title="" className="table-action hover-danger" onClick={this.handleonClickDelete} data-id={this.props.index}  title="X??a"><i className="ti-trash"></i></a></div>
            );
          } else {
            return  (
              <div>
                <a title="" className="table-action hover-primary" onClick={this.handleonClickEdit} data-id={this.props.index} title="Ch???nh s???a"><i className="ti-pencil"></i></a>
                <a title="" className="table-action hover-danger" onClick={this.handleonClickDelete} data-id={this.props.index}  title="X??a"><i className="ti-trash"></i></a></div>
            );
          }

        case "buttonEdit":
          return (
            <button type="button" className="btn" title="" data-provide="tooltip" data-original-title="Th??m" onClick={this.handleEditClick}>
              <span className="fa fa-plus ff"> Ch???nh s???a</span>
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
