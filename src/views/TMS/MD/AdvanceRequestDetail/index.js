import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { GetMLObjectData } from "../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import {
    AddAPIPath, UpdateAPIPath, DeleteAPIPath,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE } from "../../../../constants/keyCache";
import { store } from "react-notifications-component";

class AdvanceRequestDetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AdvanceRequestDetailDataSource: this.props.AdvanceRequestDetailDataSource ? this.props.AdvanceRequestDetailDataSource : [],
            AdvanceRequestID: this.props.AdvanceRequestID
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log("222", nextProps);
        if (nextProps.AdvanceRequestID !== this.state.AdvanceRequestID) {
            this.setState({ AdvanceRequestID: nextProps.AdvanceRequestID });
        }
    }

    componentDidMount() {

    }



    handleCloseMessage() {
        //if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }


    render() {


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }


        return (

            <React.Fragment>
                <div className="col-lg-12 page-detail">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="title">Chi tiết yêu cầu tạm ứng</h3>
                                </div>
                                <div className="col-md-12">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                {/* <th className="jsgrid-header-cell" style={{ width: "10%" }}>Chọn</th> */}
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Nhóm vật tư</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "25%" }}>Tên sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Số lượng tạm ứng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                                {/* <th className="jsgrid-header-cell" style={{ width: "10%" }}>Hệ thống</th> */}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.AdvanceRequestDetailDataSource && this.state.AdvanceRequestDetailDataSource.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        {/* <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.SkillID}
                                                                            name={`chkAdd-${index}`}
                                                                            checked={item.IsSelected} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td> */}
                                                        <td>{item.MaterialGroupName}</td>
                                                        <td>{item.ProductID}</td>
                                                        <td>{item.ProductName}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.QuantityUnit}</td>

                                                        {/* <td>
                                                                <div className="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" className="form-control form-control-sm"
                                                                            onChange={this.handleInputChange} value={item.IsSystem}
                                                                            name={`chkIsSystem-${index}`}
                                                                            checked={item.IsSystem} />
                                                                        <span className="cr">
                                                                            <i className="cr-icon fa fa-check"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>

                                                            </td> */}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const AdvanceRequestDetail = connect(mapStateToProps, mapDispatchToProps)(AdvanceRequestDetailCom);
export default AdvanceRequestDetail;
