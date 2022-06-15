import {
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_LOAD_FROM_LOCAL
} from '../constants/actionTypes'
import {
  AUTHEN_HOSTNAME,
  AUTHEN_HOST_BASEURL,
  API_HOST_LIST,
  CLIENT_INFO_OBJECT_STORENAME
} from '../constants/systemVars.js'
//import {setData,getData,getAllKeys,getAllData} from "../common/library/localDB.js";
import indexedDBLib from '../common/library/indexedDBLib.js'

import WebRequest from '../common/library/net/WebRequest.js'
import MD5Digest from '../common/library/cryptography/MD5Digest.js'
import { GUID, CreateLoginData } from '../common/library/AuthenLib.js'

export function registerClientLoadFromLocal(hostname, clientInfo) {
  //  console.log(REGISTER_CLIENT_LOAD_FROM_LOCAL, clientInfo);
  return {
    type: REGISTER_CLIENT_LOAD_FROM_LOCAL,
    Hostname: hostname,
    ClientInfo: clientInfo
  }
}

export function registerClientRequest(hostname, ClientID, ClientPublicKey, ClientPrivateKey) {
  // console.log(REGISTER_CLIENT_REQUEST);
  return {
    type: REGISTER_CLIENT_REQUEST,
    Hostname: hostname,
    ClientID: ClientID,
    ClientPublicKey: ClientPublicKey,
    ClientPrivateKey: ClientPrivateKey
  }
}

export function registerClientSuccess(hostname, serverPublicKey) {
  //console.log(REGISTER_CLIENT_SUCCESS);
  return {
    type: REGISTER_CLIENT_SUCCESS,
    Hostname: hostname,
    ServerPublicKey: serverPublicKey
  }
}

export function registerClientFailure(hostname, errorMessage) {
  //console.log(REGISTER_CLIENT_FAILURE);
  return {
    type: REGISTER_CLIENT_FAILURE,
    Hostname: hostname,
    ErrorMessage: errorMessage
  }
}

export function callRegisterClient(hostname, username, password) {
  return (dispatch, getState) => {
    const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
    return db
      .get(hostname)
      .then(result => {
        if (result != null) {
          dispatch(registerClientLoadFromLocal(hostname, result))
          return {
            IsError: false,
            Message: 'Load register client from DB OK!'
          }
        } else {
          return dispatch(callRegisterClientFromServer(hostname, username, password))
        }
      })
      .catch(error => {
        console.log('callRegisterClient: ', error)
        return dispatch(callRegisterClientFromServer(hostname, username, password))
      })
  }
}

export function callRegisterClientFromServer(hostname, username, password) {
  return (dispatch, getState) => {
    /* getData(hostname).then((result) => 
                {
                    if(result !=null)
                    {
                        dispatch(registerClientLoadFromLocal(hostname,result));
                        return {
                            IsError: false,
                            Message: "Load register client from DB OK!"
                        };
                    }    
                }

            );*/

    const key = window.GenRSAKey(1024)
    const clientID = GUID()
    dispatch(registerClientRequest(hostname, clientID, key.PublicKey, key.PrivateKey))
    const sendData = {
      ClientID: clientID,
      UserName: username,
      Password: password,
      ClientPublicKey: key.PublicKey
    }
    //   console.log(sendData);

    //const receiveData = WebRequest.postData("http://localhost:62152/api/RegisterClient/", sendData);

    const url = API_HOST_LIST[hostname].HostBaseURL + 'api/RegisterClient/Register'
    //  console.log("url:", url);
    return WebRequest.postData(url, sendData)
      .then(apiResult => {
        if (apiResult.StatusID == 0) {
          //console.log(apiResult);
          const encryptedServerPublicKey = apiResult.ResultObject.ServerPublicKey
          console.log('encryptedServerPublicKey:', encryptedServerPublicKey)
          const plainServerPublicKey = window.decryptData2(key.PrivateKey, 1024, encryptedServerPublicKey)
          console.log('plainServerPublicKey:', plainServerPublicKey)

          const saveRegisterClientData = {
            IsRegisterClientRequest: false,
            IsRegisterClientCompleted: true,
            IsRegisterClientSuccess: true,
            IsRegisterClientError: false,
            ClientID: clientID,
            ClientPublicKey: key.PublicKey,
            ClientPrivateKey: key.PrivateKey,
            ServerPublicKey: plainServerPublicKey
          }
          const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
          db.set(hostname, saveRegisterClientData).catch(error => {
            console.log('callRegisterClientFromServer:', error)
          })
          dispatch(registerClientSuccess(hostname, plainServerPublicKey))

          //   console.log("after dispatch(registerClientSuccess)");
          //this.callLogin(username,password);
          return {
            IsError: false,
            Message: apiResult.Message
          }
        } else {
          //  console.log(apiResult.Message);
          dispatch(registerClientFailure(hostname, apiResult.Message))
          return {
            IsError: true,
            Message: apiResult.Message
          }
        }
      })
      .catch(err => {
        console.error(err)
        dispatch(registerClientFailure(hostname, 'Lỗi đăng ký client: không kết nối được với máy chủ'))
        return {
          IsError: true,
          Message: 'Lỗi đăng ký client: không kết nối được với máy chủ'
        }
      })
  }
}
