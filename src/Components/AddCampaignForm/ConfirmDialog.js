import { 
    Box, 
    Button,
    Dialog, 
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

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
                <Typography sx={{textAlign:"center"}}>
                    {text}
                </Typography>
                <Box 
                    className="spaceBetween"
                    sx={{pt: 2, px: 2}}
                >
                    <Button
                        variant="outlined"
                        sx={{color: "#264653", borderColor:"#264653", textTransform:"none"}}
                        onClick={()=> setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        className="customButton-green"
                        onClick={handleConfirm}
                        value={true}
                        name={id}
                    >
                        Confirm
                    </Button>
                </Box>
            </DialogContent>                        
        </Dialog>
    )
}

export default ConfirmDialog; 