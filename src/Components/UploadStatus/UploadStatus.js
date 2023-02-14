import { 
    Alert,
    AlertTitle,
    Card, 
    Typography 
} from "@mui/material";

const UploadStatus = ({ isSuccess, fileName, type }) => {
    return(
        <Card sx={{width: "400px", borderRadius: 3}}>
            <Alert 
                sx={{p: 2}} 
                severity={isSuccess ? "success" : "error"}
            >
                <AlertTitle sx={{fontWeight: "bold"}}>
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
                        : "Please upload the file again"
                    }
                </Typography>  
            </Alert>
        </Card>
    )
}

export default UploadStatus;