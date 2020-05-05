import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
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
                        <textarea className={selectclassName} rows="10" cols="50" name="Title" value={this.state.ShipmentOrder_WorkFlow.Note} placeholder="Nội dung" onChange={this.onChangetextarea.bind(this)} />
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

        return (
            <div className="card">
                <div className="card-title group-card-title">
                    <h4 className="title">Thông tin điều phối</h4>
                    <button className="btn btnEditCard">chỉnh sửa</button>
                </div>
                <div className="card-body">
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Nhân viên  giao:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <div className="listpersonnel">
                                <div className="content">
                                    <div className="list-item">
                                        {this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
                                            return (<div className="item" key={index}>
                                                <span className="full-name">{item.UserName} - {item.FullName} </span>
                                                <span className="icon-del">x</span>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ghi chú:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <label className="col-form-label" >Gán nhân viên giao</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Trạng thái:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <select className="form-control form-control-sm" value={this.state.ShipmentOrder.CurrentShipmentOrderStepID} onChange={this.onChangeInput.bind(this)} >
                                {this.state.ShipmentOrder.ShipmentOrderType_WF_NextList && this.state.ShipmentOrder.ShipmentOrderType_WF_NextList.map(item =>
                                    <option key={item.NextShipmentOrderStep} value={item.NextShipmentOrderStep}>{item.NextShipmentOrderStepName}</option>
                                )}
                            </select>
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