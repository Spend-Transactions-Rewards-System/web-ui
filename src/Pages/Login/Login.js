import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Link, TextField, Typography } from "@mui/material";
import _ from "lodash";

import "./Login.css";
import CustomButton from "../../Components/CustomButton/CustomButton";

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({
        email: false, password: false
    })

    const handleLogin = () => {
        console.log(formData)
        // const role = "customer";
        const role = "tenant";

        navigate(role === "tenant" ? "/datafiles" : "/pointsactivity")
    }


    return (
        <Box className="background">
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
                            error={error[item]}
                            helperText={
                                error[item] && item ==="email" ? "Email does not exist" 
                                : error[item] && item === "password" ? "Password Incorrect. Please Try Again"
                                : ""
                            }
                            onChange={(event) => {
                                setFormData((state) => ({
                                    ...state, 
                                    [item]: event.target.value
                                }))
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
                    <Link className="forget">Forget password?</Link>
                </Box>
                <CustomButton 
                    text="Login"
                    fullWidth={true}
                    handleOnClick={handleLogin}
                />    
            </Box>
        </Box>

       
    )
}

export default Login; 