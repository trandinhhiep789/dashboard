import React from "react";
import ReactDOM from "react-dom";
import jscrypto from "../../common/library/jscrypto.js";
import WebCryptoAPILib from "../../common/library/WebCryptoAPILib.js";

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

export default class TestCSRSA extends React.Component 
{
  constructor(props)
    {
      super(props);
      this.handleImportKey = this.handleImportKey.bind(this);
      this.handleEncrypt = this.handleEncrypt.bind(this);
      this.handleDecrypt = this.handleDecrypt.bind(this);
      this.onTextChange = this.onTextChange.bind(this);
      const rsakey = jscrypto.GenRSAKey(1024, "010001");
      this.state = {
        txtPublicKey: "",
        txtPrivateKey: "",
        PublicKey: {},
        PrivateKey: {},
        PlainText: "Vo Minh Hieu",
        EncryptString: "",
        Base64EncryptString: "",
        DecryptString: ""
      };
    }

    componentWillMount() {
      const key =  window.GenRSAKey(1024);
      this.setState({txtPublicKey: key.PublicKey, txtPrivateKey: key.PrivateKey});
      console.log(key);
    }
   
      
  

    onTextChange(e)
    {
      const name = e.target.name;
      switch(name){
        case 'txtPublicKey': 
        this.setState({txtPublicKey: e.target.value});
        break;  
        case 'txtPrivateKey': 
        this.setState({txtPrivateKey: e.target.value});
        break;  
        case 'txtPlainText': 
        this.setState({PlainText: e.target.value});
        break;  
        case 'txtEncryptString': 
        this.setState({EncryptString: e.target.value});
        break; 
      }
    }

    handleImportKey()
    {
    
    //const rsakey  =  CSRSACryptography.GenRSAKey(1024)
    //console.log(rsakey);

    
    

   
  }
    handleEncrypt()
    {
      const plaintext = this.state.PlainText;
      const publicKey = this.state.txtPublicKey;
      
      const encryptedString =  window.encryptData(publicKey,plaintext);
      this.setState({EncryptString: encryptedString});

     
    }

    handleDecrypt()
    {
      const encryptedString = this.state.EncryptString;
      const privateKey = this.state.txtPrivateKey;
      console.log(encryptedString);
      const decryptedString =  window.decryptData(privateKey,encryptedString);
      this.setState({DecryptString: decryptedString});
    }

    render()
    {
    //const rsakey = jscrypto.GenRSAKey(1024, "010001");
    //const plaintext = "Vo Minh Hieu"; 
    //const encryptedString = jscrypto.RSAEncryptString(plaintext, rsakey);
    //const decryptedString = jscrypto.RSADecryptString(encryptedString, rsakey);

    
  return(
    <div>
      <div><input type="button" value="Import Key" onClick={this.handleImportKey}  /> </div>
  <div>Publickey: <br/>
  <textarea name="txtPublicKey"  rows="5" cols="150" value={this.state.txtPublicKey} onChange={this.onTextChange}  />
  </div>
  <div>Private Key:<br/>
    <textarea name="txtPrivateKey"  rows="10" cols="150" value={this.state.txtPrivateKey} onChange={this.onTextChange}  />
     </div>

  <div>plaintext:
  <br/>
    <textarea name="txtPlainText" defaultValue="Vo Minh Hieu" rows="3" cols="150" onChange={this.onTextChange} value={this.state.PlainText} />

     </div>
     <div><input type="button" value="Encrypt" onClick={this.handleEncrypt} /> </div>
  <div>encryptedString: <br/>
  <textarea name="txtEncryptString"  rows="5" cols="150" value={this.state.EncryptString}  onChange={this.onTextChange} /></div>
  <div>Base 64 encryptedString: <br/>
  <textarea name="txtBase64EncryptString"  rows="5" cols="150" value={this.state.Base64EncryptString} /></div>
  <div><input type="button" value="Decrypt" onClick={this.handleDecrypt} /> </div>
  <div>decryptedString: <br/>
  <textarea name="txtDecryptString" rows="5" cols="150" value={this.state.DecryptString} /> </div>
  </div>
  );
    }
}