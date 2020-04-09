import {REGISTER_CLIENT_REQUEST,  REGISTER_CLIENT_SUCCESS}  from "../constants/ActionTypes.js";

export function registerClientRequest(ClientID, ClientPublicKey, ClientPrivateKey)
{
    return {
        type: REGISTER_CLIENT_REQUEST,
        ClientID: ClientID,
        ClientPublicKey: ClientPublicKey,
        ClientPrivateKey: ClientPrivateKey
    };
}