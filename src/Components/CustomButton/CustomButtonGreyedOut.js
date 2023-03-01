import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import "./CustomButtonGreyedOut.css";

const CustomButtonGreyedOut = ({ text, handleOnClick, link, disabled, fullWidth }) => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(link)
    }

    return(
        <Button
            variant="contained"
            onClick={handleOnClick ? handleOnClick : handleNavigate}
            disabled={disabled}
            fullWidth={fullWidth}
            className="customButtonGreyedOut"
        >   
            {text}
        </Button>
    )
}

export default CustomButtonGreyedOut;