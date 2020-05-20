import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    APIHostName,
} from "../constants";
class InfoCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            validationErrorMessage: null,
            ShipmentOrder_WorkFlow: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoCoordinator) !== JSON.stringify(nextProps.InfoCoordinator)) {
            this.setState({
                ShipmentOrder: nextProps.InfoCoordinator
            })
        }
    }

    onChangeInput(e) {
        let label = e.target.options[e.target.selectedIndex].label
        let value = e.target.value;
        let { ShipmentOrder_WorkFlow } = this.state;
        ShipmentOrder_WorkFlow.ShipmentOrderID = this.state.ShipmentOrder.ShipmentOrderID
        ShipmentOrder_WorkFlow.ShipmentOrderStepID = value
        ShipmentOrder_WorkFlow.ShipmentOrderStepName = label
        ShipmentOrder_WorkFlow.Note = ""
        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
            this.openViewStepModal();
        });
    }

    onChangetextarea(e) {
        let value = e.target.value;
        let { ShipmentOrder_WorkFlow, validationErrorMessage } = this.state;
        if (value == undefined || value.length == 0 || String(value).trim() == "") {
            validationErrorMessage = "Vui lòng nhập nội dung"
        }
        else {
            validationErrorMessage = null
        }

        ShipmentOrder_WorkFlow.Note = value
        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: validationErrorMessage }, () => {
            this.openViewStepModal();
        });
    }


    openViewStepModal() {
        let formGroupclassName = "form-group col-md-10";
        let selectclassName = "form-control form-control-sm";
        if (this.state.validationErrorMessage != null) {
            if (this.state.validationErrorMessage.length > 0) {
                formGroupclassName += " has-error has-danger";
                selectclassName += " is-invalid";
            }
        }
        ModalManager.open(
            <ModelContainer
                title="Chuyển bước xử lý"
                name=""
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
                onChangeModal={this.handleShipWorkFlowInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Chuyển bước kế tiếp</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label class="col-form-label">{this.state.ShipmentOrder_WorkFlow.ShipmentOrderStepName}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Nội dung <span className="text-danger"> *</span></label>
                    </div>
                    <div className={formGroupclassName}>
                        <textarea className={selectclassName} maxLength={1950} rows="10" cols="50" name="Title" value={this.state.ShipmentOrder_WorkFlow.Note} placeholder="Nội dung" onChange={this.onChangetextarea.bind(this)} />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </ModelContainer>
        );
    }
    handleShipWorkFlowInsert() {
        let { ShipmentOrder_WorkFlow, validationErrorMessage } = this.state;

        if (ShipmentOrder_WorkFlow.Note == undefined || ShipmentOrder_WorkFlow.Note.length == 0 || String(ShipmentOrder_WorkFlow.Note).trim() == "") {
            validationErrorMessage = "Vui lòng nhập nội dung"
            this.setState({ validationErrorMessage: validationErrorMessage }, () => {
                this.openViewStepModal();
            });
        }
        else {
            ShipmentOrder_WorkFlow.IsProcess = true;
            ShipmentOrder_WorkFlow.ProcessUser = this.props.AppInfo.LoginInfo.Username;
            ShipmentOrder_WorkFlow.CreatedOrderTime = this.state.ShipmentOrder.CreatedOrderTime;
            ShipmentOrder_WorkFlow.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/InsertWorkFlow', ShipmentOrder_WorkFlow).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({
                        ShipmentOrder: apiResult.ResultObject
                    });
                    if (this.props.onhandleChange != null)
                        this.props.onhandleChange(apiResult.ResultObject)

                    ModalManager.close();
                }
            });
        }
    }



    render() {
        let listOption = [];

        this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
            listOption.push({ value: item.UserName, label: item.UserName + "-" + item.FullName });
        })

        return (
            <div className="card">
                <div className="card-title group-card-title">
                    <h4 className="title">Thông tin điều phối</h4>
                </div>
                <div className="card-body">

                    <MultiSelectComboBox
                        name="ArryProduct_ShippingMethod"
                        colspan="10"
                        labelcolspan="2"
                        label="Nhân viên  giao"
                        IsLabelDiv={true}
                        isautoloaditemfromcache={false}
                        loaditemcachekeyid={"PIMCACHE_PIM_SHIPPINGMETHOD"}
                        valuemember="ShippingMethodID"
                        nameMember="ShippingMethodName"
                        controltype="InputControl"
                        value={listOption}
                        ShipmentOrder={this.state.ShipmentOrder}
                        listoption={[]}
                        datasourcemember="ArryProduct_ShippingMethod"
                    />
                    <FormControl.ComboBox1
                        name="txtCarrierPartnerID"
                        colspan="10"
                        labelcolspan="2"
                        label="Đối tác vận chuyển:"
                        validatonList={["Comborequired"]}
                        isautoloaditemfromcache={true}
                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                        valuemember="PartnerID"
                        nameMember="PartnerName"
                        controltype="InputControl"
                        value={1}
                        listoption={null}
                        datasourcemember="CarrierPartnerID"
                        placeholder="---Vui lòng chọn---"
                        isMultiSelect={false}
                    />
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ghi chú:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <input type="text" name=""
                                value={""}
                                className="form-control form-control-sm"
                                placeholder={"ghi chú"}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-11"></div>
                        <div className="form-group col-md-1">
                            <button className="btn btnEditCard" type="submit"> Cập nhật</button>
                        </div>

                    </div>
                </div>
            </div>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const InfoCoordinator = connect(mapStateToProps, mapDispatchToProps)(InfoCoordinatorCom);
export default InfoCoordinator;