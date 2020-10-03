import React, { Component } from "react";
import { connect } from 'react-redux';
import ElementInputModal from '../../../../common/components/FormContainer/FormElement/ElementInputModal';

class DestroyRequestDetailListCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DestroyRequestDetail: this.props.dataSource

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                DestroyRequestDetail: nextProps.dataSource
            })
        }
    }

    handleInputChange(name, inputvalue, index) {
        console.log("rowItem", name, inputvalue, index)

        let { DestroyRequestDetail } = this.state;

        if (/^[0-9][0-9]*$/.test(inputvalue)) {
            DestroyRequestDetail[index].ErrorMessage = ""

        }
        else {
            DestroyRequestDetail[index].ErrorMessage = "Vui lòng nhập số"
        }
        

        if (!DestroyRequestDetail[index].IsAllowDecimal) {
           
        }
        else {

        }

        DestroyRequestDetail[index].Quantity = inputvalue

        console.log("DestroyRequestDetail", DestroyRequestDetail[index])
        let formData = []
        formData = Object.assign([], DestroyRequestDetail, { [index]: DestroyRequestDetail[index] });
        // 


        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(formData);
    }
    render() {
        const { DestroyRequestDetail } = this.state;
        const { disabledQuantity } = this.props;
        return (
            <div className="card">
                <div className="card-title group-card-title">
                    <h4 className="title">Danh sách vật tư</h4>
                </div>
                <div className="card-body">

                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell">Nhóm vật tư</th>
                                <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                <th className="jsgrid-header-cell">	Số dư tạm ứng</th>
                                <th className="jsgrid-header-cell">Số lượng hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DestroyRequestDetail != null &&
                                DestroyRequestDetail.map((rowItem, rowIndex) => {
                                    return (

                                        <tr key={rowIndex}>
                                            <td>{rowItem.MaterialGroupID}</td>
                                            <td>{rowItem.ProductID}</td>
                                            <td>{rowItem.ProductName}</td>
                                            <td>{rowItem.UsableQuantity}</td>
                                            <td>{

                                                <ElementInputModal.ElementModalTextBox
                                                    validationErrorMessage={rowIndex.ErrorMessage}
                                                    name="Quantity"
                                                    type="text" //{rowItem.IsAllowDecimal == true ? 'text' : "number"}
                                                    caption="Số lượng hủy"
                                                    dataSourcemember="Quantity"
                                                    value={rowIndex.Quantity}
                                                    indexRow={rowIndex}
                                                    disabled={disabledQuantity}
                                                    onValueChange={this.handleInputChange.bind(this)}
                                                />
                                            }</td>
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
const DestroyRequestDetailList = connect(mapStateToProps, mapDispatchToProps)(DestroyRequestDetailListCom);
export default DestroyRequestDetailList;