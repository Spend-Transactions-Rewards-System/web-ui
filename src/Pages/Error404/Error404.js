import { Box, Typography } from "@mui/material";

import { ReactComponent as ErrorImage } from "../../Assets/error404.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";


const Error404 = () => {
    return (
        <Box 
            sx={{
                backgroundColor: "#E0E5F2", 
                height: "100vh",
                display: "flex", 
                alignItems: "center",
                flexDirection: "column"
            }}
        >   
            <script>{document.title = "Page Not Found"}</script>
            <ErrorImage style={{height: "50%", margin: "40px"}}/>
            <Typography 
                sx={{
                    fontSize: "38px",
                    color: "#3f3d56",
                    mb: 3
                }}
            >
                <b>PAGE NOT FOUND</b>
            </Typography>
            <CustomButton 
                text={`Return to Home Page `}
                link="/"
            />
        </Box>
    )
}

export default Error404;