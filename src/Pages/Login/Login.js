import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Link, TextField, Typography } from "@mui/material";
import _ from "lodash";
import jwt from "jwt-decode";

import "./Login.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { login } from "../../API/api";

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

    const onSubmit = (event) => {
        event.preventDefault();

        login(formData["email"], formData["password"])
        .then((data) => {
            const token = data.AuthenticationResult.AccessToken;
            localStorage.setItem("token", token);
            roleNavigation(token);
        })
        .catch((err) => {
            setError(true);
            console.log("Login failed: ", err.message)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            roleNavigation(token);
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