import React, { Component } from "react";
import { connect } from 'react-redux';
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { showModal, hideModal } from '../../../../actions/modal';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
class ContentModalRightCom extends Component {
    constructor(props) {
        super(props);
        this.HandleChangeGird = this.HandleChangeGird.bind(this)
        this.state = {
            girdSlide: false
        }
    }

    componentWillReceiveProps(nextProps) {



    }
    handleClose() {
        this.props.onHideModa()
    }

    handleConfirm() {
        console.log("submit")
    }

    HandleChangeGird(id) {
        console.log("id", id)
        if (id == 1) {
            this.setState({
                girdSlide: true
            })
        }
        else {
            this.setState({
                girdSlide: false
            })
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        {/* <div className="stepper mb-10">
                            <div className="stepper-item step-completed">
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="ti-check" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                </span>
                            </div>

                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                </span>
                            </div>
                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                </span>
                            </div>
                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                </span>
                            </div>
                        </div> */}

                        <div className="form-row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxPartner
                                    name="CarrierPartnerID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Đối tác:"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                    valuemember="PartnerID"
                                    nameMember="PartnerName"
                                    controltype="InputControl"
                                    value="-1"
                                    listoption={null}
                                    datasourcemember="CarrierPartnerID"
                                    placeholder="---Vui lòng chọn---"
                                    isMultiSelect={false}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    name="CarrierTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Cùng tuyến"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                    valuemember="CarrierTypeID"
                                    nameMember="CarrierTypeName"
                                    controltype="InputControl"
                                    value="-1"
                                    listoption={null}
                                    datasourcemember="CarrierTypeID"
                                    placeholder="---Vui lòng chọn---"
                                    isMultiSelect={false}
                                />
                            </div>
                        </div>
                        <FormControl.FormControlComboBoxUser
                            name="ShipmentOrder_DeliverUserList"
                            colspan="10"
                            labelcolspan="2"
                            label="Nhân viên giao"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                            valuemember="UserName"
                            nameMember="FullName"
                            controltype="InputControl"
                            value="-1"
                            listoption={null}
                            datasourcemember="PartnerID"
                            placeholder="---Vui lòng chọn---"
                            isMultiSelect={true}
                        />

                        <div className="row  mt-10 lstProductSelect">
                            <div className="col-12 group-shipingorder">

                                <div className="jsgrid">
                                    <div className="jsgrid-grid-body">
                                        <table className="jsgrid-table">
                                            <tbody>
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '50%' }}>
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>
                                                            <li className="item infoProduict">
                                                                <span data-tip data-for="producname1" data-id="producname1" >Tivi LED Sony KD-49X8000H</span>
                                                                <ReactTooltip id="producname1" type='warning'>
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                </ReactTooltip>
                                                                <span data-tip data-for="producname2" data-id="producname2">Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item address-customer">
                                                                <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                            </li>
                                                            {/* <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe máy</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe tải</span>
                                                            </li> */}
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '44%' }}>

                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="2"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="4"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '5%' }}>
                                                        <div className="group-action">
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-trash"></i>
                                                            </a>
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-trash"></i>
                                                            </a>
                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '50%' }}>
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>
                                                            <li className="item infoProduict">
                                                                <span data-tip data-for="producname1" data-id="producname1" >Tivi LED Sony KD-49X8000H</span>
                                                                <ReactTooltip id="producname1" type='warning'>
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                </ReactTooltip>
                                                                <span data-tip data-for="producname2" data-id="producname2">Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe máy</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe tải</span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '44%' }}>

                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="2"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="4"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '5%' }}>
                                                        <div className="group-action">
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-angle-up"></i>
                                                            </a>
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-angle-down"></i>
                                                            </a>
                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '50%' }}>
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>
                                                            <li className="item infoProduict">
                                                                <span data-tip data-for="producname1" data-id="producname1" >Tivi LED Sony KD-49X8000H</span>
                                                                <ReactTooltip id="producname1" type='warning'>
                                                                    <span>Tivi LED Sony KD-49X8000H</span>
                                                                </ReactTooltip>
                                                                <span data-tip data-for="producname2" data-id="producname2">Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe máy</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe tải</span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '44%' }}>

                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="2"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                        <FormControl.FormControlComboBox
                                                            name="CarrierTypeID"
                                                            colspan="12"
                                                            labelcolspan="4"
                                                            label=""
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                            valuemember="CarrierTypeID"
                                                            nameMember="CarrierTypeName"
                                                            controltype="InputControl"
                                                            value="-1"
                                                            listoption={null}
                                                            datasourcemember="CarrierTypeID"
                                                            placeholder="---Vui lòng chọn---"
                                                            isMultiSelect={false}
                                                            isShowLable={true}
                                                        />
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '5%' }}>
                                                        <div className="group-action">
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-trash"></i>
                                                            </a>
                                                            <a class="table-action hover-danger item-action">
                                                                <i class="ti-trash"></i>
                                                            </a>
                                                        </div>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row  mt-10 lstProduct">
                            <div className="col-12 ">
                                <div className="pull-left group-info-Route">
                                    <ul>
                                        <li>
                                            <span>Mã: <span className="fw-600">A123123123</span></span>
                                        </li>
                                        <li>
                                            <span>Km ước lượng: <span className="fw-600">30km</span></span>
                                        </li>
                                        <li>
                                            <span>di chuyển: <span className="fw-600">50'</span></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nav-group-action">
                                    <button className="btn btn-w-md btn-round btn-info" type="button">Tính khoảng cách</button>
                                    <button type="button" onClick={() => this.HandleChangeGird(1)}><i className="ti-menu-alt"></i></button>
                                    <button type="button" onClick={() => this.HandleChangeGird(2)}><i className="ti-menu"></i></button>
                                </div>

                            </div>
                            {
                                this.state.girdSlide == false ? <div className="col-12 ">
                                    <Slide easing="ease" slidesToShow={3} slidesToScroll={1} autoplay={false} slidesToShow={3} cssClass="slide-product">

                                        <div className="col-md-6 col-lg-4 each-slide">
                                            <div className="card card-secondary">
                                                <div className="card-body">
                                                    <ul>
                                                        <li className="item infoOder">
                                                            <span className="nameOrder">
                                                                <Link
                                                                    className="linktext blank"
                                                                    target="_blank"
                                                                    to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                    210714000000199 </Link>
                                                            </span>
                                                            <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                        </li>
                                                        <li className="item infoProduict">
                                                            <span data-tip data-for="producname1" data-id="producname1" >Tivi LED Sony KD-49X8000H</span>
                                                            <ReactTooltip id="producname1" type='warning'>
                                                                <span>Tivi LED Sony KD-49X8000H</span>
                                                            </ReactTooltip>
                                                            <span data-tip data-for="producname2" data-id="producname2">Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            <ReactTooltip id="producname2" type='warning'>
                                                                <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            </ReactTooltip>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-4 each-slide">
                                            <div className="card card-secondary">
                                                <div className="card-body">
                                                    <ul>
                                                        <li className="item infoOder">
                                                            <span className="nameOrder">
                                                                <Link
                                                                    className="linktext blank"
                                                                    target="_blank"
                                                                    to={{ pathname: "/ShipmentOrder/Detail/" + 2107140000009 }}>
                                                                    2107140000009 </Link>
                                                            </span>
                                                            <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                        </li>
                                                        <li className="item infoProduict">
                                                            <span data-tip data-for="producname1" data-id="producname1" >Tivi LED Sony KD-49X8000H</span>
                                                            <ReactTooltip id="producname1" type='warning'>
                                                                <span>Tivi LED Sony KD-49X8000H</span>
                                                            </ReactTooltip>
                                                            <span data-tip data-for="producname2" data-id="producname2">Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            <ReactTooltip id="producname2" type='warning'>
                                                                <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            </ReactTooltip>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Phú An,, Phường Phước Long A, Quận 9, Hồ Chí Minh</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>



                                    </Slide>
                                </div>
                                    :
                                    <div className="col-12 ">
                                        <Slide easing="ease" slidesToShow={3} slidesToScroll={1} autoplay={false} slidesToShow={3} cssClass="slide-product">

                                            <div className="col-md-6 col-lg-4 each-slide">
                                                <div className="card card-secondary">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>


                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 each-slide">
                                                <div className="card card-secondary">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-4 each-slide">
                                                <div className="card card-secondary">
                                                    <div className="card-body">
                                                        <ul>
                                                            <li className="item infoOder">
                                                                <span className="nameOrder">
                                                                    <Link
                                                                        className="linktext blank"
                                                                        target="_blank"
                                                                        to={{ pathname: "/ShipmentOrder/Detail/" + 210714000000199 }}>
                                                                        210714000000199 </Link>
                                                                </span>
                                                                <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </Slide>
                                    </div>
                            }





                        </div>

                    </div>
                </div>
                <div className="modal-footer modal-footer-center">
                    <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose.bind(this)}>Bỏ qua</button>
                    <button className="btn btn-w-md btn-round btn-info ml-50" type="button" onClick={this.handleConfirm.bind(this)}>Cập nhật</button>
                </div>

            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },

    }
}


const ContentModalRight = connect(mapStateToProps, mapDispatchToProps)(ContentModalRightCom);
export default ContentModalRight;