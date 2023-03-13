import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Link, TextField, Typography } from "@mui/material";
import _ from "lodash";
import jwt from "jwt-decode";

import "./Login.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { login } from "../../API/api";
import getToken from "../../Utils/getToken";

const Login = () => {

    const navigate = useNavigate();
    const { setUserId } = useAppContext();
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

    const onSubmit = (event) => {
        event.preventDefault();

        login(formData["email"], formData["password"])
        .then((data) => {
            const result = data.AuthenticationResult;
            const accessToken = result.AccessToken;
            const idToken = result.IdToken;

            let expirationDate = new Date(0);
            expirationDate = expirationDate.setUTCSeconds(jwt(accessToken).exp);           
            
            document.cookie = `accessToken=${accessToken}; expires= ${expirationDate}`;
            document.cookie = `idToken=${idToken}; expires= ${expirationDate}`;
            setUserId(jwt(idToken).name);
            roleNavigation(accessToken);
        })
        .catch((err) => {
            setError(true);
            console.log("Login failed: ", err.message)
        })
    }

    useEffect(() => {
        const result = getToken();
        console.log(result)
        if (result) {
            setUserId(jwt(result.IdToken).name);
            roleNavigation(result.accessToken);
        }
    }, []);

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