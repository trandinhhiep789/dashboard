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

export default class TestRSA2 extends React.Component 
{
  constructor(props)
    {
      super(props);
      this.handleGenRSA = this.handleGenRSA.bind(this);
      this.handleEncrypt = this.handleEncrypt.bind(this);
      this.handleDecrypt = this.handleDecrypt.bind(this);
      this.onTextChange = this.onTextChange.bind(this);
      const rsakey = jscrypto.GenRSAKey(1024, "010001");
      this.state = {
        txtPublicKey: "",
        txtPrivateKey: "",
        rsakey: rsakey,
        key: {},
        PlainText: "Vo Minh Hieu",
        EncryptString: "",
        Base64EncryptString: "",
        DecryptString: ""
      };
    }

    
   
      
  

    onTextChange(e)
    {
      const name = e.target.name;
      switch(name){
        case 'txtPlainText': 
        this.setState({PlainText: e.target.value});
        break;  
        case 'txtEncryptString': 
        this.setState({EncryptString: e.target.value});
        break; 
      }
    }

    handleGenRSA()
    {
      WebCryptoAPILib.GenRSAKey2(1024).then((key) =>
    {
      console.log(key);
      WebCryptoAPILib.ExportRSAKeyToPkcs8(key.privateKey).then((keyData) =>
      {
        console.log(linebrk(keyData,64));
      }
    );   
    WebCryptoAPILib.ExportRawRSAPublicKey(key.publicKey).then((keyData) =>
      {
        console.log(linebrk(keyData));
      }
    );   

    
      this.setState({key: key });
    });
    //const rsakey = jscrypto.GenRSAKey(1024, "010001");
     /* WebCryptoAPILib.GenRSAKey(1024).then((rsakey) =>
    {
      //console.log(rsakey);
      this.setState({txtPublicKey: rsakey.PublicKey, txtPrivateKey: rsakey.PrivateKey, rsakey: rsakey });
    });*/
    

   
  }
    handleEncrypt()
    {
      const plaintext = this.state.PlainText;
      const publicKey = this.state.key.publicKey;
      WebCryptoAPILib.RSAEncryptString2(plaintext, publicKey).then((encryptedString) =>
      {
        ///const base64EncryptedString =jscrypto.Hex2Base64Convert(encryptedString);
        this.setState({EncryptString: encryptedString});
      });

      //const encryptedString = WebCryptoAPILib.RSAEncryptString(plaintext, rsakey);
      /*WebCryptoAPILib.RSAEncryptString2(plaintext, rsakey).then((encryptedString) =>
      {
        const base64EncryptedString =jscrypto.Hex2Base64Convert(encryptedString);
        this.setState({EncryptString: encryptedString, Base64EncryptString: base64EncryptedString });
      });*/

      
      //const decryptedString = jscrypto.RSADecryptString(encryptedString, rsakey);
    }

    handleDecrypt()
    {
      const encryptString = this.state.EncryptString;
      const privateKey = this.state.key.privateKey;
      console.log(encryptString);
      
      WebCryptoAPILib.RSADecryptString2(encryptString, privateKey).then((decryptedString) =>
      {
        //const base64EncryptedString =jscrypto.Hex2Base64Convert(encryptedString);
        this.setState({DecryptString: decryptedString});
      });

      /*const encryptString = this.state.EncryptString;
      const rsakey = this.state.rsakey;
      console.log(encryptString);
      const decryptedString = jscrypto.RSADecryptString(encryptString, rsakey);
      WebCryptoAPILib.RSADecryptString(encryptString, rsakey).then((decryptedString) =>
      {
        //const base64EncryptedString =jscrypto.Hex2Base64Convert(encryptedString);
        this.setState({DecryptString: decryptedString});
      });*/

     
      //this.setState({DecryptString: decryptedString});
    }

    render()
    {
    //const rsakey = jscrypto.GenRSAKey(1024, "010001");
    //const plaintext = "Vo Minh Hieu"; 
    //const encryptedString = jscrypto.RSAEncryptString(plaintext, rsakey);
    //const decryptedString = jscrypto.RSADecryptString(encryptedString, rsakey);

    
  return(
    <div>
      <div><input type="button" value="Gen RSA Key" onClick={this.handleGenRSA} /> </div>
  <div>Publickey: <br/>
  <textarea name="txtPublicKey" defaultValue="" rows="5" cols="150" value={this.state.txtPublicKey} />
  </div>
  <div>Private Key:<br/>
    <textarea name="txtPrivateKey" defaultValue="" rows="10" cols="150" value={this.state.txtPrivateKey} />
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