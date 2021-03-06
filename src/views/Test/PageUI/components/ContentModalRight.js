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
        this.props.hideModal();
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
                                    label="?????i t??c:"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                    valuemember="PartnerID"
                                    nameMember="PartnerName"
                                    controltype="InputControl"
                                    value="-1"
                                    listoption={null}
                                    datasourcemember="CarrierPartnerID"
                                    placeholder="---Vui l??ng ch???n---"
                                    isMultiSelect={false}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    name="CarrierTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="C??ng tuy???n"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                    valuemember="CarrierTypeID"
                                    nameMember="CarrierTypeName"
                                    controltype="InputControl"
                                    value="-1"
                                    listoption={null}
                                    datasourcemember="CarrierTypeID"
                                    placeholder="---Vui l??ng ch???n---"
                                    isMultiSelect={false}
                                />
                            </div>
                        </div>
                        <FormControl.FormControlComboBoxUser
                            name="ShipmentOrder_DeliverUserList"
                            colspan="10"
                            labelcolspan="2"
                            label="Nh??n vi??n giao"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                            valuemember="UserName"
                            nameMember="FullName"
                            controltype="InputControl"
                            value="-1"
                            listoption={null}
                            datasourcemember="PartnerID"
                            placeholder="---Vui l??ng ch???n---"
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
                                                                <span data-tip data-for="producname2" data-id="producname2">T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item address-customer">
                                                                <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                            </li>
                                                            {/* <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe m??y</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe t???i</span>
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                                                <span data-tip data-for="producname2" data-id="producname2">T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe m??y</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe t???i</span>
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                                                <span data-tip data-for="producname2" data-id="producname2">T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                <ReactTooltip id="producname2" type='warning'>
                                                                    <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                                </ReactTooltip>
                                                            </li>
                                                            <li className="item delivery-status">

                                                                <span class="badge badge-secondary badge-active mr-10"><i className="fa fa-motorcycle"></i> Xe m??y</span>
                                                                <span class="badge badge-secondary"><i className="fa fa-truck"></i> Xe t???i</span>
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                                            placeholder="---Vui l??ng ch???n---"
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
                                            <span>M??: <span className="fw-600">A123123123</span></span>
                                        </li>
                                        <li className="kmestimates">
                                            <span>Km ?????c l?????ng: <span data-tip data-for="produc1" data-id="produc1" className="numkm fw-600 ">30km</span>
                                                <ReactTooltip id="produc1" type='warning' className="title-tooltip-estimates">
                                                    <span>kho-210714000000199: 499m</span>
                                                    <span>210714000000199-210714000000839: 4099m</span>
                                                    <span>210714000000839-Kho: 409m</span>
                                                </ReactTooltip>
                                            </span>
                                        </li>
                                        <li>
                                            <span>di chuy???n: <span className="fw-600">50'</span></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="nav-group-action">
                                    <button className="btn btn-w-md btn-round btn-info" type="button">T??nh kho???ng c??ch</button>
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
                                                            <span className="title" data-tip data-for="producnamenew1" data-id="producnamenew1" >Tivi LED Sony KD-49X8000H</span>
                                                            <ReactTooltip id="producnamenew1" type='warning' className="title-tooltip" place="right" className="title-tooltip-estimates" >
                                                                <span>Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H </span>
                                                            </ReactTooltip>
                                                        
                                                        </li>
                                                        <li className="item infoProduict">
                                                           
                                                            <span className="title" data-tip data-for="producnamenew2" data-id="producnamenew2">T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                            <ReactTooltip id="producnamenew2" type='warning' className="title-tooltip" place="right">
                                                                <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                            </ReactTooltip>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span className="title" data-tip data-for="address1" data-id="address1">Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
                                                            <ReactTooltip id="address1" type='warning' className="title-tooltip" place="right" className="title-tooltip-estimates">
                                                                <span>Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H </span>
                                                            </ReactTooltip>
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
                                                                    21071400000091 </Link>
                                                            </span>
                                                            <span className="badge badge-warning time"><i class="ti ti-timer"></i> 08:00</span>
                                                        </li>
                                                        <li className="item infoProduict">
                                                            <span className="title" data-tip data-for="producname3" data-id="producname3" >Tivi LED Sony KD-49X8000H</span>
                                                            <ReactTooltip id="producname3" type='warning' className="title-tooltip" place="right">
                                                                <span>Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H Tivi LED Sony KD-49X8000H</span>
                                                            </ReactTooltip>
                                                        
                                                        </li>
                                                        <li className="item infoProduict">
                                                            <span className="title" data-tip data-for="producname4" data-id="producname4">T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                            <ReactTooltip id="producname4" type='warning' className="title-tooltip" place="right">
                                                                <span>T??? l???nh Samsung RT20HAR8DBU/SV</span>
                                                            </ReactTooltip>
                                                        </li>
                                                        <li className="item address-customer">
                                                            <span>Cc himlam Ph?? An,, Ph?????ng Ph?????c Long A, Qu???n 9, H??? Ch?? Minh</span>
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
                    <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose.bind(this)}>B??? qua</button>
                    <button className="btn btn-w-md btn-round btn-info ml-50" type="button" onClick={this.handleConfirm.bind(this)}>C???p nh???t</button>
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