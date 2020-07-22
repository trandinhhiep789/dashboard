import { GET_CACHE_REQUEST, GET_CACHE_SUCCESS, GET_CACHE_FAILURE, GET_CACHE_FROM_LOCAL } from "../constants/actionTypes";
import { CACHE_HOSTNAME, API_HOST_LIST, CACHE_OBJECT_STORENAME } from "../constants/systemVars.js";
import { callFetchAPI } from "./fetchAPIAction";
import indexedDBLib from "../common/library/indexedDBLib.js";
import { toast } from 'react-toastify';

export function getCacheRequest(cacheKeyID) {
    //  console.log(GET_CACHE_REQUEST);
    return {
        type: GET_CACHE_REQUEST,
        CacheKeyID: cacheKeyID
    };
}

export function getCacheSuccess(resultObject, resultMessage) {
    //  console.log(GET_CACHE_SUCCESS, resultObect);
    //console.log(FETCH_API_SUCCESS);
    return {
        type: GET_CACHE_SUCCESS,
        IsGetCacheError: false,
        ResultMessage: resultMessage,
        ResultObject: resultObject
    };
}

export function getCacheFromCache(resultObject) {
    // console.log(GET_CACHE_FROM_LOCAL, resultObject);
    //console.log(FETCH_API_SUCCESS);
    return {
        type: GET_CACHE_FROM_LOCAL,
        IsGetCacheError: false,
        ResultMessage: "Load cache from local OK",
        ResultObject: resultObject
    };
}


export function getCacheFailure(errorStatus, resultMessage) {
    // console.log(GET_CACHE_FAILURE,resultMessage);
    return {
        type: GET_CACHE_FAILURE,
        ErrorStatus: errorStatus,
        ResultMessage: resultMessage
    };
}



export function callGetCache(cacheKeyID) {
    return (dispatch, getState) => {
        const state = getState();
        const LoginInfo = localStorage.getItem('LoginInfo');
        let userName = ''
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            userName = LoginInfo1.LoginUserInfo.UserName;
        }
        // const userName = state.LoginInfo.LoginUserInfo.UserName;
        if (state.GetCacheInfo.IsGetCacheRequest) {
            return {
                IsError: true,
                StatusID: 100,
                Message: "Đang gọi cache"
            };
        }
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.get(cacheKeyID).then((result) => {
            if (result != null) {
                dispatch(getCacheFromCache(result));
                return {
                    IsError: false,
                    StatusID: 0,
                    Message: "Load register client from DB OK!",
                    ResultObject: result
                };
            }
            else {
                const apiPath = "api/Cache/Get";
                const postData = {
                    CacheKeyID: cacheKeyID,
                    UserName: userName,
                    AdditionParamList: []
                };
                return dispatch(callGetCacheFromServer(cacheKeyID));
            }
        }

        ).
            catch((error) => {
                //console.log("callGetCache: ", error);
                return dispatch(callGetCacheFromServer(cacheKeyID));
                //return dispatch(callRegisterClientFromServer(hostname,username,password));
            })

    }
}

export function callGetCacheFromLocal(cacheKeyID) {
    return (dispatch, getState) => {
        const state = getState();
        const LoginInfo = localStorage.getItem('LoginInfo');
        
        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.get(cacheKeyID).then((result) => {
            return result;
        }

        ).
            catch((error) => {
                return null;
            })

    }
}


export function callGetCacheFromServer(cacheKeyID) {
    return (dispatch, getState) => {
        const state = getState();
        // const userName = state.LoginInfo.LoginUserInfo.UserName;
        const LoginInfo = localStorage.getItem('LoginInfo');
        let userName = ''
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            userName = LoginInfo1.LoginUserInfo.UserName;
        }
        if (state.GetCacheInfo.IsGetCacheRequest) {
            return {
                IsError: true,
                StatusID: 100,
                Message: "Đang gọi cache"
            };
        }

        const apiPath = "api/Cache/Get";
        const postData = {
            CacheKeyID: cacheKeyID,
            UserName: userName,
            AdditionParamList: []
        };
        const toastId = toast.warn(`Loading cache in progress, please Wait...${cacheKeyID}`,
            {
                closeOnClick: false,
                autoClose: false,
                closeButton: false
            });
        return dispatch(callFetchAPI(CACHE_HOSTNAME, apiPath, postData)).then((apiResult) => {
            toast.update(toastId, {
                render: "Loading cache complete",
                type: toast.TYPE.SUCCESS,
                autoClose: 3000,
                closeButton: true,
                className: 'rotateY(360deg) transform 0.6s animated',

                // className: css({
                //     transform: "rotateY(360deg)",
                //     transition: "transform 0.6s"
                // })
            });
            if (!apiResult.IsError) {
                const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
                db.set(cacheKeyID, apiResult.ResultObject).then((result) => {

                }

                ).catch((error) => {
                    console.log("Lỗi lưu cache dưới local: ", error, CACHE_OBJECT_STORENAME);
                }

                );
            }
            return {
                IsError: apiResult.IsError,
                StatusID: apiResult.StatusID,
                Message: apiResult.Message,
                MessageDetail: apiResult.MessageDetail,
                ResultObject: apiResult.ResultObject
            };

        });
    }

}

export function callClearLocalCache(cacheKeyID) {
    return (dispatch, getState) => {
        const state = getState();
        

        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(cacheKeyID).then((result) => {
            return result;
        });
    }
}


export function callClearCache(cacheKeyID) {
    return (dispatch, getState) => {
        const state = getState();
        const LoginInfo = localStorage.getItem('LoginInfo');
        let userName = ''
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            userName = LoginInfo1.LoginUserInfo.UserName;
        }
        const toastId = toast.warn(`Clear cache in progress, please Wait...${cacheKeyID}`,
            {
                closeOnClick: false,
                autoClose: false,
                closeButton: false
            });

        const db = new indexedDBLib(CACHE_OBJECT_STORENAME);
        return db.delete(cacheKeyID).then((result) => {
            const apiPath = "api/Cache/ClearCache";
            const postData = {
                CacheKeyID: cacheKeyID,
                UserName: userName,
                AdditionParamList: []
            };
            return dispatch(callFetchAPI(CACHE_HOSTNAME, apiPath, postData)).then((apiResult) => {
                toast.update(toastId, {
                    render: "Clear cache complete",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                    closeButton: true,
                    className: 'rotateY(360deg) transform 0.6s animated',

                    // className: css({
                    //     transform: "rotateY(360deg)",
                    //     transition: "transform 0.6s"
                    // })
                });
                return dispatch(callGetCache(cacheKeyID));
            });
        });
    }
}



