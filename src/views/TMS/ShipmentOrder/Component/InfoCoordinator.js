import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
class InfoCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.InfoCoordinator
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
        const name = e.target.name;
        let value = e.target.value;
     this.openViewStepModal()
    }

    openViewStepModal() {
        // console.log("handleSubmitViewStep", this.state.lstPieRequest_WorkFlow);
        ModalManager.open(
            <ModelContainer
                title="Chuyển bước xử lý"
                name=""
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
                onChangeModal={this.handleAttributeInsert}  >
               
              
           

            </ModelContainer>
        );
    }
    handleAttributeInsert() {

        ModalManager.close();
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
                                          return(  <div className="item" key={index}>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const InfoCoordinator = connect(mapStateToProps, mapDispatchToProps)(InfoCoordinatorCom);
export default InfoCoordinator;