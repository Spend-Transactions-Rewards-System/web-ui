import { 
    Box, 
    Dialog, 
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import CustomButton from "../CustomButton/CustomButton";

const ConfirmDialog = ({ open, setOpen, text, header, handleConfirm }) => {
    return(
        <Dialog 
            open={open}
            PaperProps={{
                sx: {py: 1.5, px: 2.5,  borderRadius: 3}
            }}
        >
            <DialogTitle 
                sx={{
                    fontWeight:"bold", 
                    fontSize:"18px", 
                    color:"#2B3674", 
                    pb: 1, 
                }}
            >
                {header}
            </DialogTitle>
            <DialogContent>
                <Typography sx={{color: "#A3AED0"}}>
                    {text}
                </Typography>
                <Box sx={{pt: 3}}>
                    <CustomButton 
                        text="No" 
                        handleOnClick={()=>setOpen(false)} 
                        className="confirmNo"
                    />
                    <CustomButton 
                        text="Yes" 
                        className="confirmYes" 
                        handleOnClick={handleConfirm}
                    />
                </Box>
            </DialogContent>                        
        </Dialog>
    )
}

export default ConfirmDialog; 