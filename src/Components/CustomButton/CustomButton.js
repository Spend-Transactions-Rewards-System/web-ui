import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import "./CustomButton.css";

const CustomButton = ({ text, handleOnClick, link, disabled, fullWidth, nameOfClass }) => {

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
            className={nameOfClass}
        >   
            {text}
        </Button>
    )
}

export default CustomButton;