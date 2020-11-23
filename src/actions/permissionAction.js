import { callGetCache,callGetUserCache } from './cacheAction';
import { GET_CACHE_USER_FUNCTION_LIST } from '../constants/functionLists';
export function checkPermission(permissionKey) {
    //console.log("checkPermission function",permissionKey)
    return (dispatch, getState) => {
        return dispatch(callGetUserCache(GET_CACHE_USER_FUNCTION_LIST)).then((result) => {
            let resultObject = {
                IsPermission: false,
                IsError: false,
                Message: ''
            }
            if (!result.IsError) {
                if (result.ResultObject.CacheData) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        // resultObject.IsPermission = result.ResultObject.CacheData.find(n => n.FunctionID ==permissionKey)
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resultObject.IsPermission = true;
                        }
                    }
                }
            } else {
                resultObject = result
            }
            return resultObject;
        }
        );
    }
}