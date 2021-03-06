import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import SearchForm from "../../../common/components/FormContainer/SearchForm";
import Select from 'react-select';
import Datetime from 'react-datetime';
import {
    SearchElementList,
    SearchMLObjectDefinition,
} from "./constants";
import { MODAL_TYPE_VIEW } from "../../../constants/actionTypes";
import { showModal, hideModal } from '../../../actions/modal';
import { TreeSelect, DatePicker } from 'antd';
import SOPrintTemplate from "../../../common/components/PrintTemplate/SOPrintTemplate";
import ContentModalRight from "./components/ContentModalRight";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ReactTooltip from 'react-tooltip';
const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
class PageUICom extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handlePrintClick = this.handlePrintClick.bind(this);
        this.handleChangeGird = this.handleChangeGird.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            widthPercent: "",
            changeGird: false,
            maxWidthGird: 0
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        const clientWidth = document.getElementById('changeMaxWidth').clientWidth;
        console.log("clientWidth", clientWidth)

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        const widthModal = (window.innerWidth * 60) / 100;
        const clientWidth = document.getElementById('changeMaxWidth').clientWidth;
        console.log("clientWidth", clientWidth, clientWidth - widthModal)
        this.setState({
            widthPercent: widthModal,
            maxWidthGird: clientWidth - widthModal
        })
    };

    handleSearchSubmit() {

    }

    handleUserCoordinator() {
        this.setState({
            changeGird: true
        })
        this.handleShowModal()
    }

     handleChangeGird() {
        this.setState({
            changeGird: false
        })
        this.props.hideModal()
    }

    handleClose =()=>{
        this.setState({
            changeGird: false
        })
        this.props.hideModal()
    }

    handleShowModal() {
        const { widthPercent } = this.state;
        console.log("widthPercent", widthPercent)
        this.props.showModal(MODAL_TYPE_VIEW, {
            title: "Ph??n tuy???n ??i???u ph???i v???n ????n",
            isShowOverlay: false,
            onhideModal: this.handleClose,
            content: {
                text: <ContentModalRight
                    onHideModa={this.handleChangeGird}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    handlePrintClick() {

        // window.print();
        // return;
        var mywindow = window.open('', '', 'right=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        mywindow.document.write('<html><head>');
        mywindow.document.write('<title>????n v???n chuy???n</title>');
        mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('print').innerHTML);
        mywindow.document.write('</body></html>');
        // mywindow.document.getElementsByName('body').css( "-webkit-print-color-adjust", "exact !important");
        mywindow.print();
        mywindow.close();

        return true;

    }


    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: '--Vui l??ng ch???n--',
            style: {
                width: '100%',
            },
        };
        return (
            <React.Fragment>
                <div className="col-lg-12 SearchFormCustom">
                    <form className="frm" action="">
                        <div className="lstFormControl">
                            <div className="item group-form-control">
                                <div className="group-text-select">
                                    <input type="text"
                                        className="form-control form-control-sm txtKeyword"
                                        name="txtKeyword"
                                        placeholder="T??? kh??a" />
                                    <div className="input-group-append">
                                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">--Vui l??ng ch???n--</button>
                                        <div className="dropdown dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item active" data-option="-1">--Vui l??ng ch???n--</a>
                                            <a className="dropdown-item" data-option="1">S??T kh??ch h??ng</a>
                                            <a className="dropdown-item" data-option="2">M?? NV giao h??ng</a>
                                            <a className="dropdown-item" data-option="3">M?? ????n h??ng </a>
                                            <a className="dropdown-item" data-option="4">M?? NV ??i???u ph???i</a></div>
                                    </div>
                                </div>

                            </div>

                            <div className="item">
                                {/* <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Lo???i y??u c???u v???n chuy???n--"
                                        className="select"
                                    />
                                </div> */}
                                <div className="form-group-input-treeSelect">
                                    <TreeSelect {...tProps} />
                                </div>
                            </div>

                            <div className="item datepicker">
                                <div className="form-group-input-date">
                                    <Datetime
                                        className="picker"
                                        name=""
                                        value=""
                                        defaultValue="05/12/2020">
                                    </Datetime>
                                </div>
                            </div>

                            <div className="item datepicker">
                                <div className="form-group-input-date">
                                    <Datetime
                                        className="picker"
                                        name=""
                                        value=""
                                        defaultValue="05/12/2020">
                                    </Datetime>
                                </div>
                            </div>

                            <div className="item">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--T???nh /th??nh ph???--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Qu???n/huy???n--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-controll-select">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Kho g???i--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-controll-select">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Kho ??i???u ph???i--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item  group-controll-select">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Tr???ng th??i--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-controll-select">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Tr???ng th??i ??i???u ph???i--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-controll-select">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--S???p x???p--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-action">
                                <div className="group-custom-search btnSearch">
                                    <div className="btn-history">
                                        <i className="ti-settings"></i>
                                    </div>
                                    <button className="btn" type="submit"><span className="fa fa-search"></span>T??m Ki???m</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="col-lg-12">
                    <div id="changeMaxWidth" className="cardShipmentOrder-page">
                        <div className="card-title">
                            <div className="flexbox">
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <div className="group-left">
                                            <div className="input-group">
                                                <button id="btnUserCoordinator" type="button" onClick={this.handleUserCoordinator.bind(this)} className="btn btn-info mr-10" title="" data-provide="tooltip" data-original-title="Th??m">
                                                    <i className="fa fa-plus"></i> G??n NV giao h??ng
                                                </button>
                                                <div className="groupActionRemember mr-10">
                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Ghi nh???">
                                                        <i className="fa fa-save"></i>
                                                    </button>

                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Th??m">
                                                        <i className="fa fa-history"></i>
                                                    </button>
                                                </div>

                                                <input type="text" className="form-control" placeholder="" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="ti-search"></i></span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="group-count">
                                            <ul>
                                                <li>
                                                    <span className="count-name">T???ng ????n:</span>
                                                    <span className="count-number">123</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.changeGird == true ?
                                <div className="card-body" style={{ maxWidth: this.state.maxWidthGird }}>
                                    <div className="jsgrid">
                                        <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                            <table className="jsgrid-table">
                                                <thead className="jsgrid-header-row">
                                                    <tr>
                                                        <th className="jsgrid-header-cell" style={{ width: '5%' }}></th>
                                                        <th className="jsgrid-header-cell" style={{ width: '45%' }}>Th???i gian giao</th>
                                                        <th className="jsgrid-header-cell" style={{ width: '50%' }}>?????a ch???</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="jsgrid-grid-body">
                                            <table className="jsgrid-table">
                                                <tbody>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action undelivery" style={{ width: '5%' }}>
                                                            <ul>
                                                                <li className="item ">
                                                                    <div className="group-action">
                                                                        <div className="checkbox item-action">
                                                                            <label>
                                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                                <span className="cr">
                                                                                    <i className="cr-icon fa fa-check"></i>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <button className="btn btn-user-plus">
                                                                        <i className="fa fa-user-plus"></i>
                                                                    </button>
                                                                </li>
                                                                <li className="item printing">
                                                                    <button className="btn" onClick={this.handlePrintClick}>
                                                                        <i className="ti ti-printer"></i>
                                                                    </button>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '45%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        {/* <span>8/12/2020 08:00</span>
                                                                     */}
                                                                        <DatePicker
                                                                            showTime={{ format: 'HH:mm' }}
                                                                            format="YYYY-MM-DD HH:mm"
                                                                            className="frmDateTime"
                                                                            dropdownClassName="tree-select-custom"
                                                                            placeholder="Th???i gian giao d??? ki???n"
                                                                        />
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item statusShipmentOder">
                                                                        <span className="badge badge-danger noactive">Ch??a xu???t</span>
                                                                        <span className="badge badge-info active">???? xu???t</span>
                                                                        <span className="badge badge-success noactive">???? nh???n</span>
                                                                    </li>
                                                                    {/* <li className="item printing">
                                                                    <i className="ti ti-printer"></i>
                                                                    <span>In</span>
                                                                </li> */}
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '50%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                                :
                                <div className="card-body">
                                    <div className="jsgrid">
                                        <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                            <table className="jsgrid-table">
                                                <thead className="jsgrid-header-row">
                                                    <tr>
                                                        <th className="jsgrid-header-cell" style={{ width: '2%' }}></th>
                                                        <th className="jsgrid-header-cell" style={{ width: '15%' }}>Th???i gian giao</th>
                                                        <th className="jsgrid-header-cell" style={{ width: '25%' }}>?????a ch???</th>
                                                        <th className="jsgrid-header-cell" style={{ width: '25%' }}>M??/Lo???i y??u c???u v???n chuy???n</th>
                                                        <th className="jsgrid-header-cell" style={{ width: '25%' }}>T??n s???n ph???m/Ghi ch??</th>
                                                        <th className="jsgrid-header-cell" style={{ width: '8%' }}>Thanh to??n</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="jsgrid-grid-body">
                                            <table className="jsgrid-table">
                                                <tbody>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action undelivery" style={{ width: '2%' }}>
                                                            <ul>
                                                                <li className="item ">
                                                                    <div className="group-action">
                                                                        <div className="checkbox item-action">
                                                                            <label>
                                                                                <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                                <span className="cr">
                                                                                    <i className="cr-icon fa fa-check"></i>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="item">
                                                                    <button className="btn btn-user-plus">
                                                                        <i className="fa fa-user-plus"></i>
                                                                    </button>
                                                                </li>
                                                                <li className="item printing">
                                                                    <button className="btn" onClick={this.handlePrintClick}>
                                                                        <i className="ti ti-printer"></i>
                                                                    </button>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        {/* <span>8/12/2020 08:00</span>
                                                                     */}
                                                                        <DatePicker
                                                                            showTime={{ format: 'HH:mm' }}
                                                                            format="YYYY-MM-DD HH:mm"
                                                                            className="frmDateTime"
                                                                            dropdownClassName="tree-select-custom"
                                                                            placeholder="Th???i gian giao d??? ki???n"
                                                                        />
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item statusShipmentOder">
                                                                        <span className="badge badge-danger noactive">Ch??a xu???t</span>
                                                                        <span className="badge badge-info active">???? xu???t</span>
                                                                        <span className="badge badge-success noactive">???? nh???n</span>
                                                                    </li>
                                                                    {/* <li className="item printing">
                                                                    <i className="ti ti-printer"></i>
                                                                    <span>In</span>
                                                                </li> */}
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">-129.000.000</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row">
                                                        <td className="jsgrid-cell action waitingDelivery" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action Uncoordinated" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                    <tr className="jsgrid-row unread">
                                                        <td className="jsgrid-cell action" style={{ width: '2%' }}>
                                                            <div className="group-action">
                                                                <div className="checkbox item-action">
                                                                    <label>
                                                                        <input type="checkbox" readOnly className="form-control form-control-sm" value="" />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell groupTimeDelivery" style={{ width: '15%' }}>
                                                            <div className="group-info">
                                                                <ul>
                                                                    <li className="item times">
                                                                        <i className="ti ti-timer"></i>
                                                                        <span>8/12/2020 08:00</span>
                                                                    </li>
                                                                    <li className="item status">
                                                                        <i className="fa fa-location-arrow"></i>
                                                                        <span>???? xu???t kho &amp; ch??? ??i???u ph???i</span>
                                                                    </li>
                                                                    <li className="item vehicle">
                                                                        <i className="fa fa-motorcycle"></i>
                                                                        <span>Xe g???n m??y</span>
                                                                    </li>
                                                                    <li className="item printing">
                                                                        <i className="ti ti-printer"></i>
                                                                        <span>In</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item info-customer">
                                                                    <i className="fa fa-user"></i>
                                                                    <div className="person-info">
                                                                        <span className="name">Ng?? Th??? Y???n</span>
                                                                        <span className="line">-</span>
                                                                        <span className="phone">(0889****)</span>
                                                                        <span className="line">-</span>
                                                                        <span className="partner-sale-Order">00001SO2012444635</span>
                                                                    </div>
                                                                </li>
                                                                <li className="item address-customer">
                                                                    <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                                </li>
                                                                <li className="item store">
                                                                    <span>M??_BDU - Kho CN ??MX Th??? ?????c</span>
                                                                </li>
                                                                <li className="item times">
                                                                    <span className="group-times">
                                                                        <span className="time-item">
                                                                            <span className="txtCreatedOrderTime">
                                                                                <i className="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                        </span>
                                                                        <span className="time-item">
                                                                            <span className="intervale">
                                                                                <i className="fa fa-paper-plane-o"></i>
                                                                                <span className="txtintervale">0Km</span>
                                                                            </span>
                                                                            <span className="intervale">
                                                                                <i className="ti ti-timer"></i>
                                                                                <span className="txtintervale">0'</span>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item">
                                                                    <a target="_blank" href="#">201207000069785</a>
                                                                </li>
                                                                <li className="item">
                                                                    <span>TMS - Giao h??ng c?? l???p ?????t</span>
                                                                </li>
                                                                <li className="item user-coordinator">
                                                                    <span>??P: 37592 - Phan Thanh Tha</span>
                                                                </li>
                                                                <li className="item user-delivery">
                                                                    <span>NV: 43876 - Nguy???n ?????c Th??nh</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                            <ul>
                                                                <li className="item lstProducts">
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </li>
                                                                <li className="item note">
                                                                    <span>Ghi ch??: thu t???i nh?? 6.537.000 ??/0979382025 ch??? vinh</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                            <ul>
                                                                <li className="item">
                                                                    <span className="badge badge-danger">???? h???y</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="pricecod"> 0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="price-supplies">0</span>
                                                                </li>
                                                                <li className="item">
                                                                    <span className="total">
                                                                        <span className="price-title">N???: </span>
                                                                        <span className="price-debt">0</span>
                                                                    </span>
                                                                </li>
                                                            </ul>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="jsgrid-grid-footer">
                                            <nav>
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" data-pagenum="1" data-linktext="previous">
                                                            <span className="fa fa-step-backward" data-pagenum="1"></span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item disabled">
                                                        <a className="page-link" data-pagenum="1" data-linktext="previous">
                                                            <span className="ti-arrow-left" data-pagenum="1"></span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a className="page-link" data-pagenum="1">1</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" data-pagenum="2">2</a>
                                                    </li>
                                                    <li className="page-item disabled">
                                                        <a className="page-link" data-pagenum="1" data-linktext="next">
                                                            <span className="ti-arrow-right" data-pagenum="1"></span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item disabled">
                                                        <a className="page-link" data-pagenum="1" data-linktext="next">
                                                            <span className="fa fa-step-forward" data-pagenum="1"></span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>

                                    </div>
                                </div>
                        }

                    </div>
                </div>

                <div style={{ display: 'none' }}>
                    <SOPrintTemplate ref={el => (this.componentRef = el)} data={this.state.printData} />
                </div>
            </React.Fragment>
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }

    }
}

const PageUI = connect(mapStateToProps, mapDispatchToProps)(PageUICom);
export default PageUI;