import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "../../../library/CommonLib.js";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
export default class GridCell extends Component {
    constructor(props) {
        super(props);
        //this.state = {value:this.props.value};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleonClickEdit = this.handleonClickEdit.bind(this);
        this.handleonClickDelete = this.handleonClickDelete.bind(this);
        
    }

    handleInputChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const inputvalue = e.target.value;

        const inputname = e.target.name;
        //this.setState({value:inputvalue});
        let elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked };
        if (e.target.type == 'checkbox') {
            elementdata = { Name: inputname, pkColumnName: this.props.value, IsChecked: ischecked }
        }
        this.props.onValueChange(elementdata, this.props.index);
    }
    handleRadioChange(e) {
        const ischecked = e.target.type == 'radio' ? e.target.checked : false;
        const inputvalue = e.target.value;

        const inputname = e.target.name;
        //    const elementdata = { Name: inputname, Value: inputvalue, IsChecked: ischecked };
        const elementdata = { Name: inputname, pkColumnName: this.props.value, IsChecked: ischecked }
        this.props.onValueChange(elementdata, this.props.index);
    }
    handleonClickEdit(e) {
        const inputname = e.target.name;
        const elementdata = { Name: this.props.name, pkColumnName: this.props.value }
        //console.log("cellhandleonClickEdit inputname",id)
        this.props.onInsertClickEdit(elementdata, this.props.pkColumnName);

    }
    handleonClickDelete()
    {

    }

    onShowPopup(title, content) {
        ModalManager.open(<MessageModal title={title}
            message={content} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    render() {
        let link = this.props.link;
        const type = this.props.type;
        const text = this.props.text;
        const listValue = this.props.value;
        const linkText = this.props.linkText;
        const name = this.props.caption;
        const popupContent = this.props.popupContent;
        let linkTo;

        if (link) {
            linkTo = listValue.reduce((link, item, index, listValue) => {
                return link + item.value.toString().trim() + "/"
            }, link)

        }

        //console.log("type:", type);
        //console.log("text:", text);

        let control = "";
        switch (type) {
            case "text":
                control = <label>{text}</label>;
                break;
            case "texttolink":
                control = <Link to={linkTo}>{text}</Link>;
                break;
            case "popuplink":
                control = <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => { this.onShowPopup(name, popupContent) }}>{text}</a>
                break;

            case "date":
                {
                    const datestring = formatDate(text);
                    control = <label>{datestring}</label>;
                    break;
                }
            case "checkicon":
                {
                    if (text) {
                        control = <span className="fa fa-check"></span>;
                    }
                    break;
                }

            case "checkbox":
                {
                    const name = this.props.name;
                    const isChecked = this.props.isChecked;
                    // control = <input type="checkbox" name={name} onChange={this.handleInputChange} value={text} checked={isChecked} className="form-control form-control-sm" />;
                    control = <div className="checkbox">
                        <label>
                            <input type="checkbox" name={name} onChange={this.handleInputChange} value={text} checked={isChecked} className="form-control form-control-sm" />
                            <span className="cr">
                                <i className="cr-icon fa fa-check"></i>
                            </span>
                        </label>
                    </div>
                    break;
                }
            case "checkBoxRadio":
                {
                    const name = this.props.name;
                    const isChecked = this.props.isChecked;
                    control = <input type="radio" name={name} onChange={this.handleRadioChange} value={text} checked={isChecked} className="form-control form-control-sm" />;
                    break;
                }

            case "text":
                {
                    const name = this.props.name;
                    const isChecked = this.props.isChecked;
                    control = <input type="text" name={name} onChange={this.handleInputChange} value={text} />;
                    break;
                }

            case "progress":
                {
                    const divStyle = {
                        width: text + '%',
                        height: '16px'
                    };
                    control = <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={divStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <strong>{text}%</strong>
                        </div>
                    </div>;
                    break;

                }

            case "link":
                control = <Link to={linkTo}>{linkText}</Link>;
                break;
            case "edit":
                return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>;

            case "editnew":
                return (
                    <div>
                        <Link to={linkTo}><i className="ti-pencil"></i></Link>
                      <a title="" className="table-action hover-danger" onClick={this.handleonClickDelete} data-id={this.props.index}  title="Xóa"><i className="ti-trash"></i></a></div>
                  );
            default:
                control = <label>{text}</label>;
                break;

        }

        return control;
    }
}
