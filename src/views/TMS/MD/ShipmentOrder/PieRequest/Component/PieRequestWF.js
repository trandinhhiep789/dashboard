import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import DataGrid from "../../../../../../common/components/DataGrid";
import { APIHostName, PieRequestWFColumnList } from '../constants';

class PieRequestWF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PieRequestWFDataSource: [],
            PieRequestTypeID: -1,
            PieRequestID: -1
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.PieRequestTypeID > 0 && nextProps.PieRequestTypeID !== this.state.PieRequestTypeID) {
            this.setState({ PieRequestTypeID: nextProps.PieRequestTypeID });
            this.loadPieRequestTypeWF(nextProps.PieRequestTypeID, nextProps.PieRequestID);
        }
        if (nextProps.CurrentPieRequestStepID > 0 && nextProps.CurrentPieRequestStepID !== this.state.CurrentPieRequestStepID) {
            this.setState({ CurrentPieRequestStepID: nextProps.CurrentPieRequestStepID });
            this.loadPieRequestTypeWF(nextProps.PieRequestTypeID, nextProps.PieRequestID);
        }
    }
    loadPieRequestTypeWF(PieRequestTypeID, PieRequestID) {
        let searchData = {
            PieRequestTypeID: PieRequestTypeID,
            PieRequestID: PieRequestID
        }
        this.setState({ IsLoading: true });
        this.props.callFetchAPI(APIHostName, 'api/PieRequestType_WorkFlow/GetWorkFlow', searchData).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                this.setState({ PieRequestWFDataSource: apiResult.ResultObject, IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message })
            }
            this.setState({ IsLoading: false });
        });
    }
    render() {
        if (this.state.IsLoading) return 'Đang tải dữ liệu';
        return (
            <div className="col-md-12">
                <h4>Quy trình:</h4>
                <center>
                </center>
                {this.state.IsCallAPIError ? <p>{this.state.ErrorMessage}</p> :
                    <DataGrid isHideHeaderToolbar={true}
                        listColumn={PieRequestWFColumnList}
                        dataSource={this.state.PieRequestWFDataSource}
                        AddLink={''}
                        hasSearch={false}
                        RequirePermission=""
                        DeletePermission=""
                        IsAutoPaging={true}
                        RowsPerPage={20}
                    />}
            </div>
        )
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
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieRequestWF);