import { useNavigate } from "react-router-dom";

import { Box, Link } from "@mui/material";
import { RiAccountCircleFill } from "react-icons/ri"

import "./AccountMenu.css";
import { logout } from "../../API/api";

const AccountMenu =  () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout().then(() => {
            navigate("/");
        })
    }

    return (
        <Box 
            className="flexbox-spaceBetween"
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "30px",
                width: "130px",
                px: 1
            }}
        >
            <Link
                underline="none"
                className="logout"
                sx={{color: "#2B3674"}}
                onClick={handleLogout}
            >
                Logout
            </Link>
            <RiAccountCircleFill 
                size={32}
                style={{color: "#2B3674"}}
            />            
        </Box>
    )
}

export default AccountMenu;