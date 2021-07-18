import React, { Component } from "react";
import { connect } from 'react-redux';
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { showModal, hideModal } from '../../../../actions/modal';
class ContentModalRightCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

                        <div className="form-row mt-20">
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

                        <div className="row  mt-20">
                            <div className="col-12 group-shipingorder">

                                <div className="jsgrid">
                                    <div className="jsgrid-grid-body">
                                        <table className="jsgrid-table">
                                            <tbody>
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                        <ul>
                                                            <li className="item lstProducts">
                                                                <span>210714000000199</span> <span> 08:00</span>
                                                            </li>
                                                            <li className="item lstProducts">
                                                                <span>Tivi LED Sony KD-49X8000H</span>
                                                                <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            </li>
                                                            <li className="item status">
                                                                <i className="fa fa-location-arrow"></i>
                                                                <span>Xe máy &amp; Xe tải</span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '31%' }}>
                                                     
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
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                        <ul>
                                                            <li className="item lstProducts">
                                                                <span>210714000000199</span>
                                                            </li>
                                                            <li className="item lstProducts">
                                                                <span>Tivi LED Sony KD-49X8000H</span>
                                                                <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            </li>
                                                            <li className="item note">
                                                                <span> 08:00</span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '31%' }}>
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
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                             
                                                <tr className="jsgrid-row">
                                                    <td className="jsgrid-cell high-priority" style={{ width: '1%' }}>
                                                    </td>

                                                    <td className="jsgrid-cell group-products" style={{ width: '25%' }}>
                                                        <ul>
                                                            <li className="item lstProducts">
                                                                <span>210714000000199</span>
                                                            </li>
                                                            <li className="item lstProducts">
                                                                <span>Tivi LED Sony KD-49X8000H</span>
                                                                <span>Tủ lạnh Samsung RT20HAR8DBU/SV</span>
                                                            </li>
                                                            <li className="item note">
                                                                <span> 08:00</span>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td className="jsgrid-cell " style={{ width: '31%' }}>
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
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                        <a class="table-action hover-danger item-action">
                                                            <i class="ti-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                             
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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