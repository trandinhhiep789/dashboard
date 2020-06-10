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
    }

    handleonClickDelete() {
        if (this.props.isSystem) {
            return;
        }
        this.props.onClickDelete(this.props.index);
    }
    handleonClickEdit(e) {
        if (this.props.isSystem) {
            return;
        }
        const id = e.currentTarget.dataset.id;
        this.props.onInsertClickEdit(id);
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
        const listValue = this.props.value;
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
        const link = this.props.to;
        let linkTo;

        if (this.props.linkId) {
            linkTo = link+ this.props.linkId.toString().trim() + "/"

        }
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
                            //return <input type="checkbox" name={this.props.name} className={className} onChange={this.handleInputChange} value={text} checked={this.props.isChecked} />;
                            return <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name={this.props.name}
                                        className={className}
                                        onChange={this.handleInputChange}
                                        value={text}
                                        checked={this.props.isChecked}
                                    />
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                </label>
                            </div>;
                        } else {
                            //return <input type="checkbox" disabled={true} checked={this.props.isChecked} name={this.props.name} className={className} value={text} />;
                            return <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        disabled={true}
                                        checked={this.props.isChecked}
                                        name={this.props.name}
                                        className={className}
                                        value={text}
                                    />
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                </label>
                            </div>;
                        }
                    }
            
                case "texttolink":
                    return <Link
                        className="linktext"
                        to={{
                            pathname: linkTo,
                            state: {
                                params: this.props.params
                            }
                        }}>{text}</Link>;
                case "link":
                    return <Link to={to}>{linkText}</Link>;
                case "edit":
                    return <a title="" className="nav-link hover-primary" onClick={this.handleonClickEdit} data-id={this.props.value} title="Edit"><i className="ti-pencil"></i></a>;
                case "editnew":
                    return (
                        <div className="group-action">
                            <a title="" onClick={this.handleonClickEdit} data-id={this.props.index} title="Edit" className="btn-edit">
                                <i className="ti-pencil"></i>
                            </a>
                            <a title="" className="table-action hover-danger" onClick={this.handleonClickDelete} data-id={this.props.index} title="Edit">
                                <i className="ti-trash"></i>
                            </a>
                        </div>
                    )
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
