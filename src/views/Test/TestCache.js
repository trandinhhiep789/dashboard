import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import indexedDBLib from "../../common/library/indexedDBLib.js";
import {CACHE_OBJECT_STORENAME}  from "../../constants/systemVars.js";

import {callGetCache} from "../../actions/cacheAction";
import { callFetchAPI } from "../../actions/fetchAPIAction";

class TestCacheCom extends React.Component 
{
    constructor(props)
    {
      super(props);
      this.handleGetCache = this.handleGetCache.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClearLocalCache = this.handleClearLocalCache.bind(this);
      
      
      this.state = {
        CacheKeyID: ""
       
        
      };
    }

  

    handleChange(e)
    {
        this.setState({CacheKeyID: e.target.value});
    }

    handleGetCache()
    {
        
      
       this.props.callGetCache(this.state.CacheKeyID).then((result) =>
       {
           console.log("handleGetCache: ", result);
       }

       );
        
       
    }

    handleClearLocalCache()
    {
        //const cacheKeyID = "";
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME); 
        return db.delete(this.state.CacheKeyID).then((result) => 
            {
                const postData = {
                    CacheKeyID: this.state.CacheKeyID,
                    UserName: 'adminstartor',
                    AdditionParamList: []
                };
                this.props.callFetchAPI('CacheAPI', 'api/Cache/ClearCache', postData).then((apiResult) => {
                });
            }
        );   
    }

    render()
    {
       
        return(
            <div>
                <input type="text" name="txtCacheKeyID" value={this.state.CacheKeyID} onChange={this.handleChange} />
                <br/>
                <input type="button" value="getCache" onClick={this.handleGetCache}  /><br/>
                <input type="button" value="Clear Local Cache" onClick={this.handleClearLocalCache}  />
               
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
        }
    }
  }

  const TestCache = connect(mapStateToProps, mapDispatchToProps)(TestCacheCom);
export default TestCache;