import { FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE } from "../constants/actionTypes";
import { AUTHEN_HOSTNAME, AUTHEN_HOST_BASEURL, API_HOST_LIST, CLIENT_INFO_OBJECT_STORENAME } from "../constants/systemVars.js";
import WebRequest from "../common/library/net/WebRequest.js";
import MD5Digest from "../common/library/cryptography/MD5Digest.js";
import { GUID, CreateAuthenData, CheckIsRegisterClient } from "../common/library/AuthenLib.js";
import { callRegisterClient } from "./registerClient";
import indexedDBLib from "../common/library/indexedDBLib.js";

export function fetchAPIRequest(hostname, hostURL, postData) {
    //  console.log(FETCH_API_REQUEST);
    return {
        type: FETCH_API_REQUEST,
        Hostname: hostname,
        HostURL: hostURL,
        PostData: postData
    };
}

export function fetchAPISuccess(resultObject, resultMessage) {
    //  console.log(FETCH_API_SUCCESS, resultObject);
    //console.log(FETCH_API_SUCCESS);
    return {
        type: FETCH_API_SUCCESS,
        IsFetchAPISuccess: true,
        ResultMessage: resultMessage,
        ResultObject: resultObject
    };
}


export function fetchAPIFailure(errorStatus, resultMessage) {
    // console.log(FETCH_API_FAILURE,resultMessage);
    return {
        type: FETCH_API_FAILURE,
        ErrorStatus: errorStatus,
        ResultMessage: resultMessage
    };
}



export function callFetchAPI(hostname, apiPath, postData) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.FetchAPIInfo.IsFetchAPIRequest) {
            // return  {
            //     IsError: true,
            //     StatusID: 100,
            //     Message: "Đang gọi API"
            // };
        }
        if (!CheckIsRegisterClient(state.RegisterClientInfo[hostname])) {
            console.log("CheckIsRegisterClient state.LoginInfo",state.LoginInfo)
            const username = state.LoginInfo.Username;
            const password = state.LoginInfo.Password;
            return dispatch(callRegisterClient(hostname, username, password)).then((registerResult) => {
                if (!registerResult.IsError) {

                    return dispatch(callAPI(hostname, apiPath, postData));
                }
                else {
                    return {
                        IsError: true,
                        StatusID: 100,
                        Message: registerResult.Message
                    };
                }
            }

            );
        }
        else {
            return dispatch(callAPI(hostname, apiPath, postData)).then((apiResult) => {
                if (apiResult.StatusID == 7) {
                    const username = state.LoginInfo.Username;
                    const password = state.LoginInfo.Password;
                    const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME);
                    db.delete(hostname).catch((error) => {
                        console.log("Error Delete indexedDBLib key:", error);
                    }

                    );

                    return dispatch(callRegisterClient(hostname, username, password)).then((registerResult) => {
                        if (!registerResult.IsError) {

                            return dispatch(callAPI(hostname, apiPath, postData));
                        }
                        else {
                            return {
                                IsError: true,
                                StatusID: 100,
                                Message: registerResult.Message
                            };
                        }
                    });

                }
                else {
                    return apiResult;
                }
            });
        }
    }

}



export function callAPI(hostname, apiPath, postData) {
    return (dispatch, getState) => {
        const state = getState();
        // if(state.FetchAPIInfo.IsFetchAPIRequest)
        // {
        //     console.log("Đang gọi API")
        //     return  {
        //         IsError: true,
        //         StatusID: 100,
        //         Message: "Đang gọi API"
        //     };
        // }



        const clientID = state.RegisterClientInfo[hostname].ClientID;
        const clientPrivateKey = state.RegisterClientInfo[hostname].ClientPrivateKey;

        const hostURL = API_HOST_LIST[hostname].HostBaseURL + apiPath;
        //console.log("callfetchAPI:", state); 
        dispatch(fetchAPIRequest(hostname, hostURL, postData));
        const authenData = CreateAuthenData(hostname, state);
        //console.log("callfetchAPI authenData:", authenData); 
        const authenHeader = { ClientID: clientID, AuthenData: authenData };

        return WebRequest.postDataWithAuthenHeader(hostURL, postData, authenHeader).then((apiResult) => {
            if (apiResult.IsError === false) {

                dispatch(fetchAPISuccess(apiResult.ResultObject, apiResult.Message));
                return {
                    IsError: false,
                    StatusID: apiResult.StatusID,
                    Message: apiResult.Message,
                    ResultObject: apiResult.ResultObject,
                    MessageDetail: apiResult.MessageDetail
                };

            }
            else if (apiResult.IsError === undefined) {
                //  console.log(apiResult.Message);
                dispatch(fetchAPIFailure(apiResult.StatusID, apiResult.Message));

                //console.log("Call API Error Detail: ", apiResult);
                return {
                    IsError: true,
                    StatusID: apiResult.StatusID,
                    Message: "Lỗi hệ thống vui lòng liên hệ quản trị viên.",
                    MessageDetail: apiResult.MessageDetail ? apiResult.MessageDetail : apiResult.ExceptionMessage
                };
            }
            else {
                //  console.log(apiResult.Message);
                dispatch(fetchAPIFailure(apiResult.StatusID, apiResult.Message));

                return {
                    IsError: true,
                    StatusID: apiResult.StatusID,
                    Message: apiResult.Message,
                    MessageDetail: apiResult.MessageDetail ? apiResult.MessageDetail : apiResult.ExceptionMessage
                };
            }

        }

        ).catch((err) => {
            console.error(err);
            dispatch(fetchAPIFailure(1000, err));
            return {
                IsError: true,
                StatusID: 1000,
                Message: "Lỗi gọi API: không kết nối được với máy chủ"
            };
        });

    };
}
