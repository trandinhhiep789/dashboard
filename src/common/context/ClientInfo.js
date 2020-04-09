import React from "react";
const ClientInfo = {
    PublicKey: {},
    PrivateKey: {},
    UserName: "administrator",
    Password: "123456",
    ClientID:"",
    ServerPublicKey: "",
    TokenString: "",
    IsLogin: false
};

export  const ClientInfoContext = React.createContext(
    ClientInfo // default value
  );
export default ClientInfoContext;