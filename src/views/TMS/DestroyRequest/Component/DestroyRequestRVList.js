import React, { Component } from "react";
import { connect } from 'react-redux';
import ElementInputModal from '../../../../common/components/FormContainer/FormElement/ElementInputModal';

class DestroyRequestRVListCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DestroyRequestRVList: this.props.dataSource,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                DestroyRequestRVList: nextProps.dataSource
            })
        }
    }
    handleInputChangeComboBox(name, inputvalue, index) {
        let { DestroyRequestRVList } = this.state
        DestroyRequestRVList[index].UserName = inputvalue

        if (this.props.onValueChangeGridRV != null)
            this.props.onValueChangeGridRV(DestroyRequestRVList);
    }

    render() {
        const { DestroyRequestRVList } = this.state;
        const { disabledControll } = this.props;

        return (
            <div className="card">
                <div className="card-title group-card-title">
                    <h4 className="title">Danh sách sản phẩm</h4>
                </div>
                <div className="card-body">

                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell">Mức duyệt</th>
                                <th className="jsgrid-header-cell">Người duyệt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DestroyRequestRVList != null &&
                                DestroyRequestRVList.map((rowItem, rowIndex) => {

                                    let listOption = [];
                                    // rowItem.UserName=rowItem.InventoryRequestType_ReviewLevelList[0].UserName
                                    {
                                        rowItem.DestroyRequest_ReviewLevelList && rowItem.DestroyRequest_ReviewLevelList.map((item, index) => {
                                            listOption.push({ value: item.UserName, label: item.UserName + "-" + item.FullName, FullName: item.FullName });
                                        })
                                    }

                                    return (

                                        <tr key={rowIndex}>
                                            <td>{rowItem.ReviewLevelName}</td>

                                            <td>
                                                <ElementInputModal.ElementModalComboBox
                                                    rowIndex={rowIndex}
                                                    placeholder
                                                    listoption={listOption}
                                                    value={rowItem.UserName}
                                                    disabled={disabledControll}
                                                    onValueChange={this.handleInputChangeComboBox.bind(this)}
                                                />
                                            </td>
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
const DestroyRequestRVList = connect(mapStateToProps, mapDispatchToProps)(DestroyRequestRVListCom);
export default DestroyRequestRVList;