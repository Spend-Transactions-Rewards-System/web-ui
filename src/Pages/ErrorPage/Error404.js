import { Box, Typography } from "@mui/material";

import { ReactComponent as ErrorImage } from "../../Assets/error404.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";
import "./ErrorPage.css";


const Error404 = () => {
    return (
        <Box className="background background-error">   
            <script>{document.title = "Page Not Found"}</script>
            <ErrorImage style={{height: "40%", margin: "40px"}}/>
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