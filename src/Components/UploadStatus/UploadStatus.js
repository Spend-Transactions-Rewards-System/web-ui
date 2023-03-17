import { 
    Alert,
    AlertTitle,
    Button, 
    Card, 
    Typography 
} from "@mui/material";
import { CgClose } from "react-icons/cg";

const UploadStatus = ({ isSuccess, fileName, type, errorMessage, cancelFile, index }) => {
    return(
        <Card sx={{
            width: "450px", 
            borderRadius: 3, 
            backgroundColor: isSuccess ? "#EDF7ED" : "#FDEDED"
        }}>
             <Button 
                sx={{float:"right", color: "#1B2559", minWidth: 10, mt: 1, mr: 1}}
                onClick={() => cancelFile(index, "complete")}
            >
                <CgClose style={{pointerEvents: "none" }}/>
            </Button>
            <Alert 
                sx={{p: 2}} 
                severity={isSuccess ? "success" : "error"}
            >
                <AlertTitle sx={{fontWeight: "bold"}} data-testid="alertTitle">
                    { isSuccess ? "File uploaded successfully (" + type + ")"
                        : "Error - File failed to upload (" + type + ")"
                    }
                </AlertTitle>
                <Typography 
                    variant="subtitle2" 
                    color={isSuccess ? "#1E4620" : "#5F2120" }
                >
                    {fileName}
                </Typography>  
                <Typography variant="subtitle2" color="#A3AED0">
                    { isSuccess ? "The data is now being processed"
                        : errorMessage
                    }
                </Typography>  
            </Alert>
        </Card>
    )
}

export default UploadStatus;