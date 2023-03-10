import axios from "axios";
import { useQuery} from "react-query";
import { HmacSHA256, enc} from "crypto-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const AWS_REGION = process.env.REACT_APP_REGION;
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const AWS_DOMAIN = process.env.REACT_APP_DOMAIN;

const CARD_URL = process.env.REACT_APP_CARD_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

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
                console.log(data)
                resolve(data);
            }
        })
    })
}

// const logout = async () => {
    
//     return await axios
//         .get(`${AWS_DOMAIN}/logout`, {
//         param: {
//             client_id: CLIENT_ID,
//             redirect_uri: "http://localhost:3000/"
//         }
//         })
//         .then((resp) => resp.data.data)
//         .catch((err) => console.log(err))




//     // const cognito = new CognitoIdentityServiceProvider({
//     //     region: AWS_REGION,
//     //     userPoolId: USER_POOL_ID,
//     //     clientId: CLIENT_ID,
//     //     accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
//     //     secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
//     // });  

//     // if (token) {
//     //     return await new Promise((resolve, reject) => {
//     //         const params = {
//     //             AccessToken: token
//     //         }
    
//     //         cognito.globalSignOut(params, (err, data) => {
//     //             if (err) {
//     //                 console.log("Logout Failed: ", err.message);
//     //                 reject(err);
//     //             } else {
//     //                 resolve();
//     //             }
//     //         })
//     //     });
//     // }   
// }

const getDataFiles = async () => {

    try {
        const response = await axios.get("http://localhost:8080/api/v1/download/list", {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            "tenant": "scis_bank"
          }),
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
    }

    // const formData = new FormData();
    // formData.append("tenant", tenant);  

    // try {
    //     const response = await axios.get(`${UPLOAD_URL}/download/list`, 
    //    { data : {
    //         "tenant": tenant
    //     },
    //     });
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

    // return await axios
    //     .get(`${UPLOAD_URL}/download/list`, formData, {
    //         headers: {
    //          'Content-Type': 'multipart/form-data',
    //         },
    //     })
    //     .then((res) => res.data)
    //     .catch((err) => console.log(err));
    
    // return await axios({
    //     method: "get", 
    //     url: `${UPLOAD_URL}/download/list`, 
    //     data: formData,
    //     headers: {"Content-Type": "multipart/form-data"}
    // })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err))
}



export {
    login, 
    getDataFiles, 
}