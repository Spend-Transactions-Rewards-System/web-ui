import axios from "axios";
import { HmacSHA256, enc} from "crypto-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

import { getToken } from "../Utils/getUserInfo";

const AWS_REGION = process.env.REACT_APP_REGION;
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const BASE_URL = process.env.REACT_APP_BASE_URL; 

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

    const token = getToken().accessToken;
    let d = new Date();

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
                    d.setDate(d.getDate() - 1);
                    document.cookie=`access= ; expires= ${d}`;
                    document.cookie=`id= ; expires= ${d}`;
                  reject(err);
                } else {
                    d.setDate(d.getDate() - 1);
                    document.cookie=`access= ; expires= ${d}`;
                    document.cookie=`id= ; expires= ${d}`;
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

    const token = getToken().accessToken;

    return await axios
        .post(`${BASE_URL}/upload/download/list`, requestBody, { 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Basic ${token}`,
            }
        })
        .then((res) => res.data)
}

const getRewards = async (req) => {

    const token = getToken().accessToken;

    return await axios
        .get(`${BASE_URL}/card/rewards/${req.queryKey[1]}/${req.queryKey[0]}`, {
            headers: {
                "Authorization" : `Basic ${token}`,
            }
        })
      .then((res) => res.data)
}

const getCampaigns = async (req) => {

    const token = getToken().accessToken;

    return await axios
        .get(`${BASE_URL}/campaign/campaigns`, {
            headers: {
                "Authorization" : `Basic ${token}`,
            }
        })
        .then((res) => res.data)
}

const downloadErrorFile = async (url, filename) => {

    const token = getToken().accessToken;
    
    return await axios 
        .get(`${BASE_URL}/upload/download/error?url=`+url, {
            responseType: 'blob',
            headers: {
                "Authorization" : `Basic ${token}`,
            }
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
    
    const token = getToken().accessToken;

    const formData = new FormData();
    formData.append("file", req["file"]);
    formData.append("type", req["type"]);
    formData.append("tenant", req["tenant"]);

    return await axios
        .post(`${BASE_URL}/upload/upload/file`, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                "Authorization" : `Basic ${token}`,
            }, 
            signal: req["controller"].signal
        })
        .then((res) => res.data)
}

const addCampaign = async (req) => {
    
    const data = JSON.stringify({
        "title": req["title"],
        "start_date":  req["startDate"],
        "end_date": req["endDate"],
        "mcc": req["mcc"],
        "min_dollar_spent": req["minSpend"],
        "points_per_dollar": req["pointsPerDollar"],
        "card_program_id": req["card_program_id"],
        "notifications_list": [
            {
                "notification_title": req["notification_title"],
                "notification_message": req["notification_message"]
            }
        ]
    })

    const token = getToken().accessToken;

    return await axios
        .post(`${BASE_URL}/campaign/campaigns`, data, { 
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Basic ${token}`,
            }
        })
        .then((res) => res.data)
}


export {
    login, 
    logout,
    getDataFiles, 
    downloadErrorFile,
    getRewards,
    uploadFile,
    addCampaign,
    getCampaigns,
}
