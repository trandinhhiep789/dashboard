import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import {
    PKColumnNameAbiliti,
    TitleFrom,
    DataGridColumnItemList
} from "../constants";

class AbilitiCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Abiliti: this.props.Abiliti
        }
    }



    handleItemDelete(index) {

    }
    handleItemEdit() {

    }
    handleItemInsert() {

    }

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Năng lực</strong></h4>
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Loại mùa dịch vụ</th>
                                            <th className="jsgrid-header-cell">Từ ngày</th>
                                            <th className="jsgrid-header-cell">Đến ngày</th>
                                            <th className="jsgrid-header-cell">Theo tháng</th>
                                            <th className="jsgrid-header-cell">Theo ngày</th>
                                            <th className="jsgrid-header-cell">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Abiliti && this.state.Abiliti.map((item, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" readOnly className="form-control form-control-sm" checked={item.AbilityID} />
                                                            <span className="cr">
                                                                <i className="cr-icon fa fa-check"></i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>AAA</td>
                                                <td>{item.ToDate}</td>
                                                <td>{item.FromDate}</td>
                                                <td>AA</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
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


const Abiliti = connect(mapStateToProps, mapDispatchToProps)(AbilitiCom);
export default Abiliti;