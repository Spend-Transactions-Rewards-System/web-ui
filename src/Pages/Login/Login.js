import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Link, TextField, Typography } from "@mui/material";
import _ from "lodash";
import jwt from "jwt-decode";
import { HmacSHA256, enc} from "crypto-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

import "./Login.css";
import CustomButton from "../../Components/CustomButton/CustomButton";

const AWS_REGION = process.env.REACT_APP_REGION;
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const cognito = new CognitoIdentityServiceProvider({
    region: AWS_REGION,
    userPoolId: USER_POOL_ID,
    clientId: CLIENT_ID,
});  

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState();

    const roleNavigation = (token) => {
        const role = jwt(token)['cognito:groups'][0];
        if (role === "tenant") {
            navigate("/datafiles");
        } else {
            navigate("/rewards");
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const params = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: CLIENT_ID, 
            AuthParameters: {
              USERNAME: formData["email"],
              PASSWORD: formData["password"],
              SECRET_HASH: HmacSHA256(formData["email"] + CLIENT_ID, CLIENT_SECRET).toString(enc.Base64)
            },
        };  

        cognito.initiateAuth(params, (err, data) => {
            if (err) {
                console.log("Login Failed: ", err.message);
                setError(true);
            } else {
                const token = data.AuthenticationResult.IdToken;
                localStorage.setItem("token", token);
                roleNavigation(token);
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            roleNavigation(token);
        }
    });

    return (
        <Box className="background">
            <script>{document.title = "Welcome"}</script>
            <Box 
                className="flexbox-columnFlex" 
                sx={{m: "auto", width: "300px", pt: "4%"}}
            >
                <img 
                    src={require("../../Assets/logo.png")}
                    width="200px"
                    style={{padding: "20px"}}
                    alt="logo"
                />
                <Typography sx={{color: "#2B3674"}}>
                    Start managing your loyalty points
                </Typography>
                {_.map(["email", "password"], (item) => {
                    return(
                        <TextField
                            key={item}
                            type={item}
                            size="small"
                            fullWidth
                            placeholder={item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                            error={error}
                            helperText={ error && item === "password" 
                                        && "Incorrect email or password. Please Try again"}
                            onChange={(event) => {
                                setFormData((state) => ({
                                    ...state, 
                                    [item]: event.target.value
                                }))
                                setError(false);
                            }}
                            sx={{
                                my: 1.5,
                                mb: item === "password" ? 0 : 1.5,
                            }}
                            InputProps={{
                                sx: {
                                    backgroundColor: "#2B3674",
                                    color: "#FFFFFF",
                                    py: 0.5
                                }
                            }}
                            FormHelperTextProps = {{
                                sx: { m: "auto", pt: 0.5}
                            }}
                        />
                    )})
                }
                <Box sx={{width: "300px"}}>
                    <Link
                        className="forget"
                        underline="none"
                        sx={{color: "#4B2DCC" }}
                    >
                        Forget password?
                    </Link>
                </Box>
                <CustomButton 
                    text="Login"
                    fullWidth={true}
                    handleOnClick={onSubmit}
                    nameOfClass="customButton"
                />    
            </Box>
        </Box>       
    )
}

export default Login; 