import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PageByDatePath,
    GridColumnListByDate,
    APIHostName,
    LoadByDateAPIPath,
    LoadUserNameByDateAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { formatMoney } from "../../../../../utils/function";

import { Base64 } from 'js-base64';

class SearchUserByDateCom extends React.Component {
    constructor(props) {
        super(props);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            fullName: '',
            FromDate: "",
            TotalReward: 0

        };
        this.gridref = React.createRef();
    }

    componentDidMount() {

        const param = Base64.decode(this.props.match.params.id);
        const myParam = JSON.parse(param);
        this.setState({
            FromDate: myParam.value,
            fullName: myParam.UserName,
        })
        this.props.updatePagePath(PageByDatePath);
        this.callLoadData(myParam);
    }


    callLoadData(myParam) {
        const objData = {
            Date: myParam.value,
            UserName: myParam.UserName
        }
        this.props.callFetchAPI(APIHostName, LoadUserNameByDateAPIPath, objData).then(apiResult => {
            if (!apiResult.IsError) {
                const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.TotalReward
                    return sum
                }, 0);

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    TotalReward: totalAmount
                    // fullName: apiResult.ResultObject[0].RewardUser + " - " + apiResult.ResultObject[0].FullName
                });
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        });
    }


    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCLoseButton}
            />
        );
    }


    render() {
        return (
            <React.Fragment>
                <div className="col-md-12 ">
                    <div className="card mb-10">
                        <div className="card-body">
                            <div className="form-row frmInfo">
                                <div className="form-group col-md-4">
                                    <div className="group-text">
                                        <label className="col-form-label bold">Nhân viên:</label>
                                        <label className="col-form-label ml-10">{this.state.fullName}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="group-text text-center">
                                        <label className="col-form-label bold">Ngày:</label>
                                        <label className="col-form-label ml-10">
                                        {formatDate(this.state.FromDate, true)}
                                    </label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="group-text text-right">
                                        <label className="col-form-label bold">Tổng:</label>
                                        <label className="col-form-label ml-10 text-danger">
                                        {formatMoney(this.state.TotalReward, 0)}
                                    </label>
                                    </div>
                                </div>
                                {/* <div className="form-group col-md-1">
                                    <label className="col-form-label bold">Nhân viên:</label>
                                </div>
                                <div className="form-group col-md-3">
                                    
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label bold">Ngày:</label>
                                </div>
                                <div className="form-group col-md-3">

                                    <label className="col-form-label">
                                        {formatDate(this.state.FromDate, true)}
                                    </label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label bold">Tổng:</label>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="col-form-label">
                                        {formatMoney(this.state.TotalReward, 0)}
                                    </label>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <DataGrid
                    listColumn={GridColumnListByDate}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'ShipmentOrderID'}
                    PKColumnName={'ShipmentOrderID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    //RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
                />
            </React.Fragment>
        );

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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const SearchUserByDate = connect(mapStateToProps, mapDispatchToProps)(SearchUserByDateCom);
export default SearchUserByDate;
