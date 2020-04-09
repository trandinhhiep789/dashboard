import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import {fetchAPIRequest,fetchAPISuccess,fetchAPIFailure, callFetchAPI} from "../../actions/fetchAPIAction";

class TestCallServiceCom extends React.Component 
{
    constructor(props)
    {
      super(props);
      this.handleCallService = this.handleCallService.bind(this);
      
      
      this.state = {
        txtResultObject: {}
       
        
      };
    }

  

    

    handleCallService()
    {
        
       const  hostname = "AuthenAPI";
       const apiPath = "api/TestCallService/Action1";
       const postData = {};
       this.props.callFetchAPI(hostname,apiPath,postData);
        
       
    }

    render()
    {
        let resultData = "";
        //if(this.props.AuthenticationInfo.)
        if(this.props.AppInfo.FetchAPIInfo.IsFetchAPISuccess)
        {
            resultData = this.props.AppInfo.FetchAPIInfo.ResultObject;
        }
        else if(this.props.AppInfo.FetchAPIInfo.IsFetchAPIError)
        {
            resultData = this.props.AppInfo.FetchAPIInfo.ErrorMessage;
        }
        console.log(this.props.AppInfo);
        return(
            <div>
                <input type="button" value="CallService" onClick={this.handleCallService}  />
                <textarea cols="100" rows="10" name="txtResultObject" />
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
        callFetchAPI: (hostname,apiPath,postData) => {
         dispatch(callFetchAPI(hostname,apiPath,postData));
      }
    }
  }

  const TestCallService = connect(mapStateToProps, mapDispatchToProps)(TestCallServiceCom);
export default TestCallService;