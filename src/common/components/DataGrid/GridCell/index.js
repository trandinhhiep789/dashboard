import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { formatDate } from "../../../library/CommonLib.js";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import { formatMoney, formatNumber } from '../../../../utils/function';
import { Base64 } from 'js-base64';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class GridCell extends Component {
    constructor(props) {
        super(props);
        //this.state = {value:this.props.value};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleonClickEdit = this.handleonClickEdit.bind(this);
        this.handleOnClickDetailtNew = this.handleOnClickDetailtNew.bind(this);
        this.handleonClickDetailt = this.handleonClickDetailt.bind(this);
        this.handleonClickDelete = this.handleonClickDelete.bind(this);

    }

    componentDidMount() {
        console.log("this.props", this.props)
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

    handleonClickDetailt() {
        this.props.onDetailtClick(this.props.index)
    }

    handleOnClickDetailtNew() {
        this.props.onDetailtModalClick(this.props.rowItem)
    }

    handleonClickDelete(e) {
        const id = e.currentTarget.dataset.id;
        if (this.props.onhandleonClickDelete != null) {
            this.props.onhandleonClickDelete(id);
        }

    }

    onShowPopup(title, content) {
        ModalManager.open(<MessageModal
            title={title}
            message={content}
            onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    onShowPopupNew(objValue) {
        this.props.onModalClick(objValue, this.props.name)
    }

    componentDidMount() {
    }

    onClickAction(objValue) {
        this.props.onUpdateClick(objValue)
    }

    render() {
        let link = this.props.link;
        const type = this.props.type;
        const text = this.props.text;
        const listValue = this.props.value;
        const linkText = this.props.linkText;
        const name = this.props.caption;
        const popupContent = this.props.popupContent;
        const { rowItem, hyperLink } = this.props

        let linkTo;
        if (link) {
            linkTo = listValue.reduce((link, item, index, listValue) => {
                return link + item.value.toString().trim() + "/"
            }, link)

        }


        // console.log("this.props.paramsn1111", this.props.params);

        let control = "";
        switch (type) {
            case "textCustom":
                control = <div className="textCustom" onClick={() => { this.onClickAction(listValue) }} >{text}</div>;
                break;
            case "textList":
                control = <label>{text == "" ? text : ReactHtmlParser(text.replace(/;/g, '<br/>'))}</label>;
                break;
            case "text":
                control = <label>{text}</label>;
                break;
            case "textBoldRed":
                control = <label className="txt-boold-red">{text}</label>;
                break;
            case "textNumberBoldRed":
                control = <label className="txt-boold-red">{formatNumber(text)}</label>;
                break;

            case "textCurrency":
                return <label>{formatMoney(text, 0)}</label>;
            case "texttolinkdate":
                control = <Link
                    className="linktext "
                    to={{
                        pathname: linkTo,
                        state: {
                            params: this.props.params
                        }
                    }}>{formatDate(text, true)}</Link>;
                break;

            case "texttolinkdateNew":
                control = <Link
                    className="linktext "
                    to={{
                        pathname: linkTo,
                        state: {
                            params: this.props.params
                        }
                    }}>{formatDate(text, true)}</Link>;
                break;


            case "texttolinkNew":

                control = <Link
                    className="linktext texttolinkNew"
                    to={{
                        pathname: linkTo,
                        state: {
                            params: this.props.params
                        }
                    }}>{Base64.decode(text)}</Link>;
                break;

            case "Detailt":
                return <a className="nav-link hover-primary btn-Detailt" onClick={this.handleonClickDetailt} title="Detailt">
                    {text}
                </a>;

            case "DetailtNew":
                return <a className="nav-link hover-primary btn-Detailt" onClick={this.handleOnClickDetailtNew} title="Detailt">
                    {text}
                </a>;

            case "texttolink":

                control = <Link
                    className="linktext"
                    to={{
                        pathname: linkTo,
                        state: {
                            params: this.props.params
                        }
                    }}>{text}</Link>;
                break;
            case "texttolinkNewBlank":

                control = <Link
                    className="linktext"
                    target="_blank"
                    to={{
                        pathname: linkTo,
                        state: {
                            params: this.props.params
                        }
                    }}>{text}</Link>;
                break;

            case "texttolinkblank":
                const param = this.props.params;
                param.value = listValue[0].value;
                const myJSON = JSON.stringify(param);
                control = <Link
                    className="linktext blank"
                    target="_blank"
                    to={{
                        pathname: link + Base64.encode(myJSON) + "/",
                        state: {
                            params: this.props.params
                        }
                    }}>{text}</Link>;
                break;

            case "texttolinkdateblank":
                const param1 = this.props.params;
                param1.value = listValue[0].value;
                const myJSON1 = JSON.stringify(param1);
                control = <Link
                    className="linktext blank"
                    target="_blank"
                    to={{
                        pathname: link + Base64.encode(myJSON1) + "/",
                        state: {
                            params: this.props.params
                        }
                    }}>{formatDate(text, true)}</Link>

                break;
            case "popuplink":
                control = <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => { this.onShowPopup(name, popupContent) }}>{text}</a>
                break;

            case "popupNew":
                control = <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => { this.onShowPopupNew(listValue) }}>{text}</a>
                break;

            case "popupTextNumber":
                control = <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => { this.onShowPopupNew(listValue) }}>{formatNumber(text)}</a>
                break;


            case "date":
                {
                    const datestring = formatDate(text, true);
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
                return <a
                    title=""
                    className="nav-link hover-primary"
                    onClick={this.handleonClickEdit}
                    data-id={this.props.value}
                    title="Edit">
                    <i className="ti-pencil"></i>
                </a>;


            case "editnew":
                return (
                    <div className="group-action">
                        <Link
                            to={{
                                pathname: linkTo,
                                state: {
                                    params: this.props.params
                                }
                            }}
                        >
                            <i className="ti-pencil"></i>
                        </Link>
                        <a
                            title=""
                            className="table-action hover-danger"
                            onClick={this.handleonClickDelete}
                            data-id={this.props.text}
                            title="Xóa">
                            <i className="ti-trash"></i>
                        </a>
                    </div>
                );
            case "hyperlink":
                const { RelatedVoucherID } = rowItem;
                const destinationHyperlink = RelatedVoucherID.includes("AR") ? hyperLink.AREdit : hyperLink.SODetail;
                const partsText = text.split(RelatedVoucherID);
                control = <p>{partsText[0]}<Link to={`${destinationHyperlink}/${RelatedVoucherID}`} target="_blank">{RelatedVoucherID}</Link>{partsText[1]}</p>
                break;
            default:
                control = <label>{text}</label>;
                break;

        }

        return control;
    }
}


export default withRouter(GridCell)