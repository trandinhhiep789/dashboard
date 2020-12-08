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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
class PageUICom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
    }

    handleSearchSubmit() {

    }

    handleUserCoordinator() {

    }


    render() {

        return (
            <React.Fragment>
                {/* <SearchForm
                    FormName="Tìm kiếm danh sách loại phương tiện vận chuyển"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple multiple-custom multiple-custom-display multiple-custom-display-custom"
                /> */}

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
                                        <div class="dropdown dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item active" data-option="-1">--Vui lòng chọn--</a>
                                            <a class="dropdown-item" data-option="1">SĐT khách hàng</a>
                                            <a class="dropdown-item" data-option="2">Mã NV giao hàng</a>
                                            <a class="dropdown-item" data-option="3">Mã đơn hàng </a>
                                            <a class="dropdown-item" data-option="4">Mã NV điều phối</a></div>
                                    </div>
                                </div>

                            </div>

                            <div className="item">
                                <div className="form-group-input-select">
                                    <Select
                                        value=""
                                        name=""
                                        options={options}
                                        isMulti=""
                                        placeholder="--Loại yêu cầu vận chuyển--"
                                        className="select"
                                    />
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
                                <div className="btnSearch">
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
                                            <button id="btnUserCoordinator" type="button" onClick={this.handleUserCoordinator.bind(this)} className="btn btn-info" title="" data-provide="tooltip" data-original-title="Thêm">
                                                <i className="fa fa-plus"></i> Gán NV giao hàng
                                            </button>
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
                                                <th className="jsgrid-header-cell" style={{ width: '5%' }}>Tác vụ</th>
                                                <th className="jsgrid-header-cell" style={{ width: '15%' }}>Thời gian giao</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Địa chỉ</th>
                                                <th className="jsgrid-header-cell" style={{ width: '20%' }}>Mã/Loại yêu cầu vận chuyển</th>
                                                <th className="jsgrid-header-cell" style={{ width: '25%' }}>Tên sản phẩm/Ghi chú</th>
                                                <th className="jsgrid-header-cell" style={{ width: '10%' }}>Thanh toán</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="jsgrid-grid-body">
                                    <table className="jsgrid-table">
                                        <tbody>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action undelivery" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action waitingDelivery" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action Uncoordinated" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </td>
                                            </tr>
                                            <tr className="jsgrid-row unread">
                                                <td className="jsgrid-cell action" style={{ width: '5%' }}>
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
                                                    <div class="group-info">
                                                        <ul>
                                                            <li className="item times">
                                                                <i class="ti ti-timer"></i>
                                                                <span>8/12/2020 08:00</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i class="fa fa-location-arrow"></i>
                                                                <span>Đã xuất kho &amp; chờ điều phối</span>
                                                            </li>
                                                            <li className="item vehicle">
                                                                <i class="fa fa-motorcycle"></i>
                                                                <span>Xe gắn máy</span>
                                                            </li>
                                                            <li className="item printing">
                                                                <i class="ti ti-printer"></i>
                                                                <span>In</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="jsgrid-cell group-address" style={{ width: '25%' }}>
                                                    <ul>
                                                        <li className="item info-customer">
                                                            <i class="fa fa-user"></i>
                                                            <div class="person-info">
                                                                <span class="name">Ngô Thị Yến</span>
                                                                <span class="line">-</span>
                                                                <span class="phone">(0889****)</span>
                                                                <span class="line">-</span>
                                                                <span class="partner-sale-Order">00001SO2012444635</span>
                                                            </div>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                        <li className="item store">
                                                            <span>MĐ_BDU - Kho CN ĐMX Thủ Đức</span>
                                                        </li>
                                                        <li className="item times">
                                                            <span class="group-times">
                                                                <span class="time-item">
                                                                    <span class="txtCreatedOrderTime">
                                                                        <i class="ti ti-dashboard"></i> 07/12/2020 13:20</span>
                                                                </span>
                                                                <span class="time-item">
                                                                    <span class="intervale">
                                                                        <i class="fa fa-paper-plane-o"></i>
                                                                        <span class="txtintervale">0Km</span>
                                                                    </span>
                                                                    <span class="intervale">
                                                                        <i class="ti ti-timer"></i>
                                                                        <span class="txtintervale">0'</span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="jsgrid-cell group-infoShipmentOrder" style={{ width: '20%' }}>
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
                                                <td className="jsgrid-cell group-price" style={{ width: '10%' }}>

                                                    <ul>
                                                        <li className="item">
                                                            <span className="badge badge-danger">Đã hủy</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="pricecod"> 0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="price-supplies">0</span>
                                                        </li>
                                                        <li className="item">
                                                            <span class="total">
                                                                <span class="price-title">Nợ: </span>
                                                                <span class="price-debt">0</span>
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

    }
}

const PageUI = connect(mapStateToProps, mapDispatchToProps)(PageUICom);
export default PageUI;