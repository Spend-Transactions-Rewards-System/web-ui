    import { 
        Box, 
        Button,
        Dialog, 
        DialogContent,
        DialogTitle,
        Typography
    } from "@mui/material";

    import CustomButton from "../../Components/CustomButton/CustomButton";

    const ConfirmDialog = ({ open, setOpen, handleConfirm, id, text, header }) => {
        return(
            <Dialog open={open}>
                <DialogTitle 
                    className="center"
                    sx={{fontWeight:"bold", fontSize:"16px", color:"#264653"}}
                >
                    {header}
                </DialogTitle>
                <DialogContent
                    sx={{width: "350px"}}
                >
                    <Typography sx={{textAlign:"center", borderRadius:"30px"}}>
                        {text}
                    </Typography>
                    <Box 
                        className="spaceBetween"
                        sx={{pt: 2, px: 2}}
                    >
                        <CustomButton text="No" handleOnClick={()=>setOpen(false)} nameOfClass="confirmNo"/>
                        <CustomButton text="Yes" nameOfClass="confirmYes" link="/campaigns"/>

                    </Box>
                </DialogContent>                        
            </Dialog>
        )
    }

    export default ConfirmDialog; 