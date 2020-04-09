import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import DataGrid from "../../../common/components/DataGrid";
import { APIHostName, SearchAPIPath, DataGridColumnList, PKColumnName } from './Constants';


class UserActivityCom extends Component {
    constructor(props) {
        super(props);
        this.getUserActivity = this.getUserActivity.bind(this);
        this.state = {
            gridDataSource: [],
        };
    }

    componentDidMount() {
        this.getUserActivity();
    }

    getUserActivity() {
        this.props.callFetchAPI(APIHostName, SearchAPIPath).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                })
            }

        });
    }

    render() {
        return (
            <div className="col-md-12 col-lg-6">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Thao tác gần đây</h5>
                    </div>
                    <DataGrid listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        isHideHeaderToolbar={true}
                        IsCustomAddLink={true}
                        PKColumnName={PKColumnName}
                        IsAutoPaging={false}
                        RowsPerPage={10}
                    />
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
        }
    }
}

const UserActivity = connect(mapStateToProps, mapDispatchToProps)(UserActivityCom);
export default UserActivity;