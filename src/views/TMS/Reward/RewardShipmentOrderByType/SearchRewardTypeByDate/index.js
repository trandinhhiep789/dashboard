import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePathByUserName,
    GridColumnListByDate,
    APIHostName,
    SearchDetailAPIPath,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { Base64 } from 'js-base64';

class SearchByDateCom extends React.Component {
    constructor(props) {
        super(props);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            RewardType: '',
            Date: ''
        };
        this.gridref = React.createRef();
    }

    componentDidMount() {
        const param = Base64.decode(this.props.match.params.id);
        const myParam = JSON.parse(param);

        const params = {
            RewardTypeID: myParam.RewardTypeID,
            Date: myParam.value,
        }

        this.setState({
            Date: myParam.value
        })

        this.props.updatePagePath(PagePathByUserName);
        this.callLoadData(params);
    }


    callLoadData(postData) {

        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    RewardType: apiResult.ResultObject[0].RewardTypeID + " - " + apiResult.ResultObject[0].RewardTypeName
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
        return (
            <React.Fragment>
                <div className="col-md-12 ">
                    <div className="card mb-10">
                        <div className="card-body">
                            <div className="form-row frmInfo">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại thưởng:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{this.state.RewardType}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Ngày:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {formatDate(this.state.Date, true)}
                                    </label>
                                </div>

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

const SearchByDate = connect(mapStateToProps, mapDispatchToProps)(SearchByDateCom);
export default SearchByDate;
