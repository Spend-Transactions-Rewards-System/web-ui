import { 
    Box, 
    Button, 
    Card, 
    CardContent,
    LinearProgress,
    Typography 
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import { BsFillFileEarmarkTextFill }  from "react-icons/bs";

const UploadInProgress = ({ fileName, cancelFile, index }) => {
    return(
        <Card sx={{width: "400px", borderRadius: 3}}>
           <CardContent sx={{backgroundColor: "#EFF4FB"}}>
            <Button 
                sx={{float:"right", color: "#1B2559", minWidth: 10}}
                name={index}
                onClick={cancelFile}
            >
                <CgClose style={{pointerEvents: "none" }}/>
            </Button>
            <Box sx={{display:"flex", my: 2}}>
                <BsFillFileEarmarkTextFill 
                    size={50}
                    style={{
                        color: "#4B2DCC",
                        marginRight: 20
                    }}
                />
                <Box >
                    <Typography sx={{color: "#1B2559"}}>
                        <b>Uploading</b>
                    </Typography>    
                    <Typography variant="subtitle2" color="#A3AED0">
                        {fileName}
                    </Typography>  
                </Box>
            </Box>
            <LinearProgress 
                sx={{
                    borderRadius: 10, 
                    backgroundColor: "#4B2DCC",
                    height: "6px",
                    ".MuiLinearProgress-bar": {background: "#CDD2E4"}
                }}
            />
            </CardContent> 
        </Card>
    )
}

export default UploadInProgress;