import React, { Component } from "react";
import { connect } from 'react-redux';
import ElementInputModal from '../../../../common/components/FormContainer/FormElement/ElementInputModal';

class InventoryRequestDetailListCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InventoryRequestDetail: this.props.dataSource

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                InventoryRequestDetail: nextProps.dataSource
            })
        }
    }

    handleInputChange(name, inputvalue, index) {
        let { InventoryRequestDetail } = this.state
        InventoryRequestDetail[index].UneventQuantity = InventoryRequestDetail[index].RecordQuantity - inputvalue
        InventoryRequestDetail[index].ActualQuantity = inputvalue

        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(InventoryRequestDetail);
    }
    render() {
        const { InventoryRequestDetail } = this.state;
        const { disabledActualQuantity } = this.props;
        return (
            <div className="card">
                <div className="card-title group-card-title">
                    <h4 className="title">Danh sách sản phẩm</h4>
                </div>
                <div className="card-body">

                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell">Nhóm vật tư</th>
                                <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                <th className="jsgrid-header-cell">Số lượng sổ sách</th>
                                <th className="jsgrid-header-cell">Số lượng thực tế</th>
                                <th className="jsgrid-header-cell">Chênh lệch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {InventoryRequestDetail != null &&
                                InventoryRequestDetail.map((rowItem, rowIndex) => {
                                    return (

                                        <tr key={rowIndex}>
                                            <td>{rowItem.MaterialGroupID}</td>
                                            <td>{rowItem.ProductID}</td>
                                            <td>{rowItem.ProductName}</td>
                                            <td>{rowItem.RecordQuantity}</td>
                                            <td> <ElementInputModal.ElementModalNumber
                                                validationErrorMessage={""}
                                                name="ActualQuantity"
                                                type="text"
                                                caption="số lượng"
                                                label=''
                                                dataSourcemember="ActualQuantity"
                                                Colmd='12'
                                                colspan='12'
                                                min={0}
                                                max={rowItem.RecordQuantity}
                                                value={rowItem.ActualQuantity > 0 ? rowItem.ActualQuantity : ''}
                                                indexRow={rowIndex}
                                                disabled={disabledActualQuantity}
                                                onValueChange={this.handleInputChange.bind(this)}
                                            /></td>
                                            <td>{rowItem.UneventQuantity}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

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
    }
}
const InventoryRequestDetailList = connect(mapStateToProps, mapDispatchToProps)(InventoryRequestDetailListCom);
export default InventoryRequestDetailList;