import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { RiAccountCircleFill } from "react-icons/ri"

const AccountMenu = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/")
    }

    return (
        <Box 
            className="format-spaceBetween"
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
                width: "110px"
            }}
        >
            <Button
                sx={{
                    textTransform: "none",
                    color: "#2B3674"
                }}
                onClick={handleLogout}
            >
                Logout
            </Button>
            <RiAccountCircleFill 
                size={32}
                style={{color: "#2B3674"}}
            />            
        </Box>
    )
}

export default AccountMenu;