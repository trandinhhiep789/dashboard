import React, { Component } from "react";
import { connect } from 'react-redux';
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    DataGridColumnItemList
} from "../constants";
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
                                    <div className="item">
                                        <span className="full-name">1125 - Võ Minh Hiếu </span>
                                        <span className="icon-del">x</span>
                                    </div>
                                    <div className="item">
                                        <span className="full-name">1125 - Võ Minh Hiếu </span>
                                        <span className="icon-del">x</span>
                                    </div>
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
                        <select className="form-control form-control-sm">
                            <option>Chờ giao</option>
                            <option>Bắt đầu đi giao hàng</option>
                            <option>Đến nhà khách</option>
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