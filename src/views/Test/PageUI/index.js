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
        this.handleShowModal = this.handleShowModal.bind(this)
        this.state = {
            widthPercent: "",
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 35) / 100
        })
    };

    handleSearchSubmit() {

    }

    handleUserCoordinator() {
        this.handleShowModal()
    }

    handleShowModal() {
        const { widthPercent } = this.state;
        console.log("widthPercent", widthPercent)
        this.props.showModal(MODAL_TYPE_VIEW, {
            title: "aaa",
            content: {
                text: <div>aaa aaa aaa</div>

            },
            maxWidth: '500px'
        });
    }


    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: '--Vui lòng chọn--',
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
                                        placeholder="Từ khóa" />
                                    <div className="input-group-append">
                                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">--Vui lòng chọn--</button>
                                        <div className="dropdown dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item active" data-option="-1">--Vui lòng chọn--</a>
                                            <a className="dropdown-item" data-option="1">SĐT khách hàng</a>
                                            <a className="dropdown-item" data-option="2">Mã NV giao hàng</a>
                                            <a className="dropdown-item" data-option="3">Mã đơn hàng </a>
                                            <a className="dropdown-item" data-option="4">Mã NV điều phối</a></div>
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
                                        placeholder="--Loại yêu cầu vận chuyển--"
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
                                        placeholder="--Tỉnh /thành phố--"
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
                                        placeholder="--Quận/huyện--"
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
                                        placeholder="--Kho gửi--"
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
                                        placeholder="--Kho điều phối--"
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
                                        placeholder="--Trạng thái--"
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
                                        placeholder="--Trạng thái điều phối--"
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
                                        placeholder="--Sắp xếp--"
                                        className="select"
                                    />
                                </div>
                            </div>

                            <div className="item group-action">
                                <div className="group-custom-search btnSearch">
                                    <div className="btn-history">
                                        <i className="ti-settings"></i>
                                    </div>
                                    <button className="btn" type="submit"><span className="fa fa-search"></span>Tìm Kiếm</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="col-lg-12">
                    <div className="cardShipmentOrder-page">
                        <div className="card-title">
                            <div className="flexbox">
                                <div className="btn-toolbar">
                                    <div className="btn-group btn-group-sm">
                                        <div className="group-left">
                                            <div className="input-group">
                                                <button id="btnUserCoordinator" type="button" onClick={this.handleUserCoordinator.bind(this)} className="btn btn-info mr-10" title="" data-provide="tooltip" data-original-title="Thêm">
                                                    <i className="fa fa-plus"></i> Gán NV giao hàng
                                            </button>
                                                <div className="groupActionRemember mr-10">
                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Ghi nhớ">
                                                        <i className="fa fa-save"></i>
                                                    </button>

                                                    <button type="button" className="btn " title="" data-provide="tooltip" data-original-title="Thêm">
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
                                                    <span className="count-name">Tổng đơn:</span>
                                                    <span className="count-number">123</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="jsgrid">
                                <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                    <table className="jsgrid-table">
                                        <thead className="jsgrid-header-row">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: '2%' }}></th>
                                                <th className="jsgrid-header-cell" style={{ width: '15%' }}>Thời gian giao</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Địa chỉ</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Mã/Loại yêu cầu vận chuyển</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Tên sản phẩm/Ghi chú</th>
                                                <th className="jsgrid-header-cell" style={{ width: '8%' }}>Thanh toán</th>
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
                                                        <li className="item ">
                                                            <button className="btn">
                                                                <i className="fa fa-user-plus"></i>
                                                            </button>
                                                        </li>
                                                        <li className="item printing">
                                                        <button className="btn">
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
                                                                    placeholder="Thời gian giao dự kiến"
                                                                />
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item statusShipmentOder">
                                                            <span class="badge badge-danger noactive">Chưa xuất</span>
                                                            <span class="badge badge-info active">Đã xuất</span>
                                                            <span class="badge badge-success noactive">Đã nhận</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i className="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
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
                                                                <span className="name">Ngô Thị Yến</span>
                                                                <span className="line">-</span>
                                                                <span className="phone">(0889****)</span>
                                                                <span className="line">-</span>
                                                                <span className="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
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
                                                            <span>TMS - Giao hàng có lắp đặt</span>
                                                        </li>
                                                        <li className="item user-coordinator">
                                                            <span>ĐP: 37592 - Phan Thanh Tha</span>
                                                        </li>
                                                        <li className="item user-delivery">
                                                            <span>NV: 43876 - Nguyễn Đức Thành</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item lstProducts">
                                                            <span>Tivi LED Sony KD-49X8000H</span>
                                                            <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                        </li>
                                                        <li className="item note">
                                                            <span>Ghi chú: thu tại nhà 6.537.000 đ/0979382025 chị vinh</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-price" style={{ width: '8%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="total">
                                                                <span className="price-title">Nợ: </span>
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
                    </div>
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