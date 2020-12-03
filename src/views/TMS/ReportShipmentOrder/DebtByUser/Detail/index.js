import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    APIHostName,
    GridColumnListDetail,
    LoadByProductIDAPIPath

} from "../constants";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";

import { Base64 } from 'js-base64';

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.callSearchData = this.callSearchData.bind(this)
        this.state = {
            gridDataSource: [],
            FullName: '',
            FromDate: '',
            ToDate: '',
            userName: ''
        }
        this.gridref = React.createRef();
    }

    componentDidMount() {
        const param = {
            ProductID: this.props.match.params.id,
            FromDate: this.props.location.state.params.FromDate,
            ToDate: this.props.location.state.params.ToDate,
            UserName: this.props.location.state.params.UserName,
        }
        this.setState({
            FullName: this.props.location.state.params.FullName,
            FromDate: this.props.location.state.params.FromDate,
            ToDate: this.props.location.state.params.ToDate
        })

        this.callSearchData(param)
    }

    callSearchData(searchData){
        this.props.callFetchAPI(APIHostName, LoadByProductIDAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.TotalAmount = item.Price * item.Quantity;
                    item.OutputVoucherType = "Xuất tạm ứng vật tư";
                    return item;
                })
                this.setState({
                    gridDataSource: tempData
                })
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        })
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
        const {FullName,FromDate, ToDate}= this.state;
        return (
            <React.Fragment>
                <div className="col-md-12 ">
                    <div className="card mb-10">
                        <div className="card-body">
                            <div className="form-row frmInfo">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Từ ngày:</label>
                                </div>
                                <div className="form-group col-md-4">

                                    <label className="col-form-label">
                                        {formatDate(FromDate, true)}
                                    </label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Đến ngày:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {formatDate(ToDate, true)}
                                    </label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Nhân viên:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{FullName}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DataGrid
                    listColumn={GridColumnListDetail}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    //RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
                />
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
