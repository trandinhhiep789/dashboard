import React, { Component } from "react";
import { connect } from 'react-redux';
import FormControl from "../../../../common/components/FormContainer/FormControl";

class ContentModalRightCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {



    }
    render() {

        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <div className="stepper">
                            <div className="stepper-item step-completed">
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="fa fa-gift" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                    <span className="step-label">Khởi tạo</span>
                                    <span className="step-time">14/07/2021 12:10</span>
                                </span>
                            </div>

                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="fa fa-gift" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                    <span className="step-label">Tiếp nhận vận đơn</span>
                                </span>
                            </div>
                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="fa fa-gift" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                    <span className="step-label">Khởi tạo</span>
                                </span>
                            </div>
                            <div className="stepper-item">
                                <div className="step-line">
                                    <span className="stepConnector-line"></span>
                                </div>
                                <span className="stepLabel">
                                    <span className="step-icon">
                                        <div className="icon">
                                            <i className="fa fa-gift" aria-hidden='true'></i>
                                        </div>
                                    </span>
                                    <span className="step-label">Khởi tạo</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card modalForm">
                    <div className="card-body">
                        <div className="form-row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxPartner
                                    name="CarrierPartnerID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Đối tác vận chuyển:"
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
                                <FormControl.FormControlComboBox
                                    name="CarrierTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="phương tiện"
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
                        {/* <InputGridChageControl
                            name="ShipmentOrder_ItemList"
                            controltype="InputGridControl"
                            title="Danh sách vận đơn"
                            listColumn={DataGridColumnItemList}
                            dataSource={this.state.ShipmentOrder}
                            FormValidation={this.state.FormValidation}
                            onDeleteClick={this.handleDeleteID.bind(this)}
                            onValueChange={this.handleonValueChange.bind(this)}
                        /> */}
                        <div className="card">
                            <div className="card-body">
                                tesdt
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
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ContentModalRight = connect(mapStateToProps, mapDispatchToProps)(ContentModalRightCom);
export default ContentModalRight;