import { Box, Typography } from "@mui/material";

import { ReactComponent as ErrorImage } from "../../Assets/accessDenied.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";
import "./ErrorPage.css";

const Unauthorised = () => {

    return (
        <Box className="background background-error">   
            <script>{document.title = "Unauthorised"}</script>
            <ErrorImage style={{height: "40%", margin: "40px"}}/>
            <Typography 
                sx={{
                    fontSize: "30px",
                    color: "#3f3d56",
                }}
            >
                <b>UNAUTHORISED</b>
            </Typography>
            <Typography 
                sx={{
                    color: "#707EAE",
                    mb: 3,
                    mx: 2
                }}
            >
                <i>You do not have permission to access the requested page</i>
            </Typography>
            <CustomButton 
                text={`Return to Home Page `}
                link="/"
            />
        </Box>
    )
}

export default Unauthorised;