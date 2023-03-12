import axios from "axios";
import { HmacSHA256, enc} from "crypto-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const AWS_REGION = process.env.REACT_APP_REGION;
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const AWS_DOMAIN = process.env.REACT_APP_DOMAIN;

const CARD_URL = process.env.REACT_APP_CARD_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

const HEADER = { "Content-Type": "application/json" }

const login = async (email, password) => {

    return await new Promise((resolve, reject) => {
        
        const cognito = new CognitoIdentityServiceProvider({
            region: AWS_REGION,
            userPoolId: USER_POOL_ID,
            clientId: CLIENT_ID,
        });  

        const params = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: CLIENT_ID, 
            AuthParameters: {
              USERNAME: email,
              PASSWORD: password,
              SECRET_HASH: HmacSHA256(email + CLIENT_ID, CLIENT_SECRET).toString(enc.Base64)
            },
        };  
        cognito.initiateAuth(params, (err, data) => {
            if (err) {
                console.log("Login Failed: ", err.message);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const logout = async () => {

    const token = localStorage.getItem("token");

    const cognito = new CognitoIdentityServiceProvider({
        region: AWS_REGION,
        userPoolId: USER_POOL_ID,
        clientId: CLIENT_ID,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    });  

    if (token) {
        return await new Promise((resolve, reject) => {
            const params = {
                AccessToken: token
            }
    
            cognito.globalSignOut(params, (err) => {
                if (err) {
                  console.log("Logout Failed: ", err.message);
                  reject(err);
                } else {
                  localStorage.removeItem("token"); 
                  resolve();
                }
            })
        });
    }   
}

const getDataFiles = async (req) => {

  const requestBody = JSON.stringify({ 
    "tenant": req.queryKey[1]
  })

  return await axios
    .post(`${UPLOAD_URL}/download/list`, requestBody, { headers: HEADER })
    .then((res) => res.data)
}

const downloadErrorFile = async (url, filename) => {
    
    return await axios 
        .get(`${UPLOAD_URL}/download/error?url=`+url, {
            responseType: 'blob'
        })
        .then((res) => {
            const data = res.data;
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
}

const uploadFile = async (req) => {
    
    const formData = new FormData();
    formData.append("file", req["file"]);
    formData.append("type", req["type"]);
    formData.append("tenant", req["tenant"]);

    return await axios
        .post(`${UPLOAD_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, 
            signal: req["controller"].signal
        })
        .then((res) => res.data)
}


export {
    login, 
    logout,
    getDataFiles, 
    downloadErrorFile,
    uploadFile
}
