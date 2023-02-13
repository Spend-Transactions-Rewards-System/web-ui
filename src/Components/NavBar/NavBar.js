import { useNavigate } from "react-router";
import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { MdCloudUpload, MdCampaign } from "react-icons/md";
import _ from "lodash";

import "./NavBar.css";

const navMap = {
    "Data Files" : 
        {
            icon: <MdCloudUpload />, 
            link: "/datafiles"
        }, 
    "Campaigns" : 
        {
            icon: <MdCampaign />, 
            link: "/campaigns"
        }
}

const NavBar = () => {

    const navigate = useNavigate();
    const [currTab, setCurrTab] = useState("Data Files");

    const handleOnClick = (tab) => {
        navigate(navMap[tab]["link"]);
        setCurrTab(tab);
    }

    return (
        <Box 
            sx={{
                backgroundColor: "#FFFFFF", 
                width: "250px", 
                minHeight: "100vh", 
                position: "fixed", 
                top: 0, 
                left: 0
            }}
        >
            <Box className="flexbox-center">
                <img 
                    src={require("../../Assets/logo.png")}
                    width="120px"
                    style={{padding: "8px 5px"}}
                    alt="logo"
                />
            </Box>
            <hr 
                style={{
                    backgroundColor: "#F4F7FE", 
                    height: "1px", 
                    border:"none" 
                }}
            />
            {_.map(Object.keys(navMap), (aKey) => {
                return(
                    <Button
                        key={aKey}
                        className="navBarButton"
                        sx={{  
                            borderRight: currTab === aKey ? "5px solid #4B2DCC" : "none", 
                            borderRadius: 0
                        }}
                        onClick={() => handleOnClick(aKey)}
                    >   
                        <Box 
                            className="navIcon"
                            sx={{color: currTab === aKey ? "#4B2DCC" : "#A3AED0"}}
                        >
                            {navMap[aKey]["icon"]}
                        </Box>
                        <Typography 
                            sx={{
                                pl: 2, 
                                color:  currTab === aKey ? "#2B3674" : "#A3AED0"
                            }}
                        >
                            <b>{aKey}</b>
                        </Typography>
                    </Button>
                )
            })
            }
        </Box>
    )
}

export default NavBar;