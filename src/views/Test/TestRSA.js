import React from "react";
import ReactDOM from "react-dom";
import jscrypto from "../../common/library/jscrypto.js";
import WebCryptoAPILib from "../../common/library/WebCryptoAPILib.js"
export default class TestRSA extends React.Component 
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
        const keyData = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJNvoO83rI85TBA7rTbrIwPioGgfRrKvbKAGOmYOvgnnMBRxuwdg4opNr7hxnNR8Vl7jrvW2j9OQJINtXd77FeZbx6H9ewaZz9Ui2qyPdBEtsZOu1B8SI0TMgaTSRtDvVvktra/OtF2ugabBpRiccOuO/ofn1lCWjU+Kvjn/ONC1AgMBAAECgYARUWFj9/Qq9p36oifcdY4tXKde052oS3bE7TZa2oxz+VXqcNl5KmYxvKJRVfcH9nrmtnPMpN8MCLhhP61xDakqshctMge0KoaiTsgV3J0aI4pJ4YLLSj0C4vvUXIFsAnEtr2AA288GiZ+lelTrjUGJ1P5pWXFsHFjf0wq8mIQ+wQJBAMwII2QcZy0VWAGB61FyA4iwGfg5iq6aRE1bHKZXfVV6KzFDPEpYHXT24vlx1EcVKHBIwcWH5b3943+2B/weRokCQQC4/Sx8EzFogv23DKUmw4IVZQ+zp6fXliI3wriUkEP5u0dqkWs1nY2OIzzEEDg4/RTHCm5HMbMVlZoSQ1Xi4m3NAkAwqbQ/OWMGZrPR0Dne+BGNtWrMQHUqRdMKnDOOHQngrD3HByFHHhMQhZ4HHrYhqhM2DLRit5H9KaPsHu9ym4n5AkEApJKXwMpSamgez3qwcov8bow6K9o7t9AZIQJas9CkqMe0AVrdxhUkmg8/QC4t1oVQtsLQ2QWeDNXK+/RrtC09AQJBAKloTNqgTslP0kmDXmBnVwR7pnjRm1NgTZZfhUv+9kGdAPLrrkmn5BTb0TkBc2hbZXRn53pjz7YR9Ncwbv9hEEw=";
        WebCryptoAPILib.ImportRSAPkcs8Key(keyData).then((key) =>
    {
      //console.log(key);
      //this.setState({txtPublicKey: rsakey.PublicKey, txtPrivateKey: rsakey.PrivateKey, rsakey: rsakey });
    });


    /*
      WebCryptoAPILib.GenRSAKey(1024).then((rsakey) =>
    {
      console.log(rsakey);
      this.setState({txtPublicKey: rsakey.PublicKey, txtPrivateKey: rsakey.PrivateKey, rsakey: rsakey });
    });*/
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
      const rsakey = this.state.rsakey;
      WebCryptoAPILib.RSAEncryptString(plaintext, rsakey).then((encryptedString) =>
      {
        this.setState({EncryptString: encryptedString});
      });

      //const encryptedString = WebCryptoAPILib.RSAEncryptString(plaintext, rsakey);
      /*WebCryptoAPILib.RSAEncryptString2(plaintext, rsakey).then((encryptedString) =>
      {
        const base64EncryptedString =jscrypto.Hex2Base64Convert(encryptedString);
        this.setState({EncryptString: encryptedString, Base64EncryptString: base64EncryptedString });
      });*/

      
     
    }

    handleDecrypt()
    {
      const encryptString = this.state.EncryptString;
      const rsakey = this.state.rsakey;
      console.log(encryptString);
      
      WebCryptoAPILib.RSADecryptString(encryptString, rsakey).then((decryptedString) =>
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