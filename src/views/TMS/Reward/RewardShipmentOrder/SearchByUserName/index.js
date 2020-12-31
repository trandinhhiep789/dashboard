import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePathByUserName,
    GridColumnListByUserName,
    APIHostName,
    LoadByUserNameAPIPath,
    LoadByUserNameNewAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { Base64 } from 'js-base64';

class SearchByUserNameCom extends React.Component {
    constructor(props) {
        super(props);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            totalAmount: '',
            fullName: '',
            FromDate: '',
            ToDate: '',
            userName: ''
        };
        this.gridref = React.createRef();
    }

    componentDidMount() {
        
        const param = Base64.decode(this.props.match.params.id);
        const myParam = JSON.parse(param);

        const params = {
            FromDate: myParam.FromDate,
            ToDate: myParam.ToDate,
            UserName: myParam.value
        }
        this.setState({
            FromDate: myParam.FromDate,
            ToDate: myParam.ToDate,
            userName: myParam.value
        })
        
        this.props.updatePagePath(PagePathByUserName);
        this.callLoadData(params);

        const paramsMobi = {
            FromDate: myParam.FromDate,
            ToDate: myParam.ToDate,
            UserName: '0041018'
        }
         this.callSearchDataMobi(paramsMobi)
    }

    
    callSearchDataMobi(params) {
        const {FromDate,ToDate , userName}= this.state;
        // const params = {
        //     FromDate: FromDate,
        //     ToDate: ToDate,
        //     userName: userName
        // }
        this.props.callFetchAPI(APIHostName, "api/TMSReward/LoadByUserNameMobi", params).then(apiResult => {
            console.log("callSearchDataMobi", apiResult)
        });
    }

    callLoadData(params) {

        this.props.callFetchAPI(APIHostName, LoadByUserNameNewAPIPath, params).then(apiResult => {
            if (!apiResult.IsError) {
                const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.TotalReward
                    return sum
                }, 0);

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    totalAmount: totalAmount,
                    fullName: apiResult.ResultObject[0].RewardUser + " - " + apiResult.ResultObject[0].FullName
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
                onCloseModal={true}
            />
        );
    }


    render() {
        const { FromDate, ToDate } = this.state;
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
                                    <label className="col-form-label">{this.state.fullName}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DataGrid
                    listColumn={GridColumnListByUserName}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'RewardDate'}
                    PKColumnName={'RewardDate'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={31}
                    totalCurrency={true}
                    totalCurrencyColSpan={1}
                    totalCurrencyNumber={this.state.totalAmount}
                    //RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
                    params={this.state.userName}
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

const SearchByUserName = connect(mapStateToProps, mapDispatchToProps)(SearchByUserNameCom);
export default SearchByUserName;
