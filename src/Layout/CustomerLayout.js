import { Outlet } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import "./Layout.css";
import AccountMenu from "../Components/AccountMenu/AccountMenu";


const CustomerLayout = () => {
    return(
        <Box
            sx={{
                backgroundColor: "#E0E5F2",
                p: "50px 32px 40px 32px",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    p: "8px 32px",
                    boxShadow: "0px 4px 20px 0px #0000001A"
                }}
            >
                <Box className="format-spaceBetween">
                    <Typography className="logo">
                        <b>SCIS</b> BANK
                    </Typography>
                    <AccountMenu />                    
                </Box> 
            </Box>
            <Typography className="pageHeader">
                Points Activity
            </Typography>
            <Outlet />
        </Box>
    )
}

export default CustomerLayout;