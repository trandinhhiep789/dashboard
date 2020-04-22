import React from "react";
import { connect } from 'react-redux';
import { callGetCache, callClearLocalCache } from "../../actions/cacheAction";
import { callFetchAPI } from "../../actions/fetchAPIAction";

class CacheManagerCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetCache = this.handleGetCache.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            CacheKeyID: ""
        };
    }

    handleChange(e) {
        this.setState({ CacheKeyID: e.target.value });
    }

    handleGetCache() {
        this.props.callGetCache(this.state.CacheKeyID).then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    render() {
        return (
            <div>
                <input type="text" name="txtCacheKeyID" value={this.state.CacheKeyID} onChange={this.handleChange} />
                <br />
                <input type="button" value="getCache" onClick={this.handleGetCache} /><br />
                <input type="button" value="Clear Local Cache" onClick={this.props.callClearLocalCache(this.state.CacheKeyID)} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    }
}

const CacheManager = connect(mapStateToProps, mapDispatchToProps)(CacheManagerCom);
export default CacheManager;