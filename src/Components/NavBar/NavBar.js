import { memo } from "react";
import { useLocation } from "react-router";

import { Box, Typography, Link } from "@mui/material";
import { MdCloudUpload, MdCampaign } from "react-icons/md";
import _ from "lodash";

import "./NavBar.css";
import logo from "../../Assets/logo.png";

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

    const location = useLocation();
    let currLocation = "Data Files";
    if (location.pathname.includes("campaign") ) {
        currLocation = "Campaigns"
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
                <Link
                    href={"/datafiles"} 
                    underline="none"
                >
                <img 
                    src={logo}
                    className="navLogo"
                    width="120px"
                    alt="logo"
                />
                </Link>
            </Box>
            <hr 
                style={{
                    backgroundColor: "#F4F7FE", 
                    height: "1px", 
                    border:"none" 
                }}
            />
            {_.map(navMap, (item, aKey) => {
                return(
                    <Link 
                        key={aKey}    
                        href={item["link"]} 
                        className="navBarButton"
                        sx={{  
                            borderRight: currLocation === aKey ? "5px solid #4B2DCC" : "none", 
                            borderRadius: 0
                        }}
                        underline="none"
                    >
                        <Box 
                            className="navIcon"
                            sx={{color: currLocation === aKey ? "#4B2DCC" : "#A3AED0"}}
                        >
                            {item["icon"]}
                        </Box>
                        <Typography 
                            sx={{
                                pl: 2, 
                                color:  currLocation === aKey ? "#2B3674" : "#A3AED0"
                            }}
                        >
                            <b>{aKey}</b>
                        </Typography>
                    </Link>

                )
            })
            }
        </Box>
    )
}

export default NavBar;