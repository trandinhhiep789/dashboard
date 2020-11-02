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

class SearchByDateCom extends React.Component {
    constructor(props) {
        super(props);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
        };
        this.gridref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePathByUserName);
        const postData = [
            {
                SearchKey: "@REWARDDATE",
                SearchValue: this.props.match.params.id
            },
            {
                SearchKey: "@REWARDUSER",
                SearchValue: this.props.location.state.params
            },
        ];
        this.callLoadData(postData);
    }

  
    callLoadData(postData) {

        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
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
                onCloseModal={this.handleCloseMessage}
            />
        );
    }


    render() {
        return (
            <React.Fragment>
                
                <DataGrid
                    listColumn={GridColumnListByDate}
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
