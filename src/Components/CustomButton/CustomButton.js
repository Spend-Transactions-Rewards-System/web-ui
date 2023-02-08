import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const CustomButton = ({ text, handleOnClick, link, disabled }) => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(link)
    }

    return(
        <Button
            variant="contained"
            onClick={handleOnClick ? handleOnClick : handleNavigate}
            disabled={disabled}
            sx={{
                textTransform: "none", 
                backgroundColor: "#4B2DCC", 
                "&:hover": {
                    backgroundColor: "#aea1e6"
                }
            }}
            
        >   
            {text}
        </Button>
    )
}

export default CustomButton;