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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";

class SearchByUserNameCom extends React.Component {
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
        
        this.callLoadData(this.props.match.params.id);
    }

  
    callLoadData(username) {

        this.props.callFetchAPI(APIHostName, LoadByUserNameAPIPath, username).then(apiResult => {
            
            if (!apiResult.IsError) {
                let data = [];
                if (apiResult.ResultObject.length > 0) {
                    apiResult.ResultObject.map((item, index) => {
                        data.push(item[0])
                    })
                }

                this.setState({
                    gridDataSource: data,
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
                    listColumn={GridColumnListByUserName}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={''}
                    PKColumnName={'RewardDate'}
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
                    params= {this.props.match.params.id}
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
