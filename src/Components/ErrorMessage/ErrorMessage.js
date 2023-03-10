import { Typography } from "@mui/material";
import { BiErrorCircle } from "react-icons/bi";

const ErrorMessage = () => {
    return(
        <Typography sx={{display:"flex", alignItems: "center"}}>
            <BiErrorCircle size={20} style={{marginRight: 10}}/>
            An error occurred, please try again later.
        </Typography>
    )

}

export default ErrorMessage