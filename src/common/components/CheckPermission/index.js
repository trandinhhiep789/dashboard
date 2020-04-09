import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { checkPermission } from '../../../actions/permissionAction';
class CheckPermissionCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Permission: {
                IsLoading: true
            }
        };
    }
    componentDidMount() {
        this.checkPermission();
    }
    checkPermission() {
        this.props.checkPermission(this.props.PermissionKey).then((result) => {
            result.IsLoading = false;
            this.setState({ Permission: result });
        })
    }
    render() {
        if (this.state.Permission.IsLoading) return <p className='col-md-12'>Đang kiểm tra quyền...</p>
        if (!this.state.Permission.IsPermission) return <p className='col-md-12'>Bạn không có quyền sử dụng chức năng này</p>
        return (
            <div style={{ width: '100%' }}>
                {this.props.children}
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
        checkPermission: (permissionKey) => {
            return dispatch(checkPermission(permissionKey));
        }

    }
}
const CheckPermission = connect(mapStateToProps, mapDispatchToProps)(CheckPermissionCom);
export default CheckPermission;
