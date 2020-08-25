import React, { Component } from "react";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementInputModal from '../../../../../common/components/FormContainer/FormElement/ElementInputModal';
import {
    APIHostName,
} from "../constants";
class AdvanceRequestDetailNewCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AdvanceRequestDetail: this.props.AdvanceRequestDetail,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.AdvanceRequestDetail) !== JSON.stringify(nextProps.AdvanceRequestDetail)) {
            this.setState({
                AdvanceRequestDetail: nextProps.AdvanceRequestDetail
            })
        }
    }

    handleInputChange(name, inputvalue, index) {
        let { AdvanceRequestDetail } = this.state
        AdvanceRequestDetail[index].Quantity = inputvalue
        this.setState({ AdvanceRequestDetail: AdvanceRequestDetail });
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);

    }
    handleInputChangeBox(name, inputvalue, index) {
        let { AdvanceRequestDetail } = this.state
        AdvanceRequestDetail[index].QuantityUnitID = inputvalue
        this.setState({ AdvanceRequestDetail: AdvanceRequestDetail });
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);


    }

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-12 page-detail">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Nhóm vật tư</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "25%" }}>Tên sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Số lượng tạm ứng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.AdvanceRequestDetail && this.state.AdvanceRequestDetail.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.MaterialGroupName}</td>
                                                        <td>{item.ProductID}</td>
                                                        <td>{item.ProductName}</td>
                                                        <td><ElementInputModal.ElementModalNumber
                                                            validationErrorMessage={""}
                                                            name="Quantity"
                                                            type="text"
                                                            caption="số lượng"
                                                            label=''
                                                            dataSourcemember="Quantity"
                                                            Colmd='12'
                                                            min={0}
                                                            max={50}
                                                            value={item.Quantity}
                                                            indexRow={index}
                                                            onValueChange={this.handleInputChange.bind(this)}

                                                        /></td>
                                                        <td><ElementInputModal.ElementModalComboBox
                                                            validationErrorMessage={""}
                                                            caption="Đơn vị tính"
                                                            label=''
                                                            placeholder="--Chọn đơn vị tính"
                                                            isautoloaditemfromcache={true}
                                                            loaditemcachekeyid="ERPCOMMONCACHE.QUANTITYUNIT"
                                                            valuemember="QuantityUnitID"
                                                            nameMember="QuantityUnit"
                                                            value={item.QuantityUnitID}
                                                            rowIndex={index}
                                                            onValueChange={this.handleInputChangeBox.bind(this)}

                                                        /></td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
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
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const AdvanceRequestDetailNew = connect(mapStateToProps, mapDispatchToProps)(AdvanceRequestDetailNewCom);
export default AdvanceRequestDetailNew;