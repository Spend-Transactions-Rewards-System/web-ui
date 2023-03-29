import { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import { 
    Box, 
    Button, 
    Card, 
    CardContent,
    FormControlLabel, 
    Grid, 
    Radio,
    RadioGroup, 
    Typography 
} from "@mui/material";
import _ from "lodash";
import { MdUpload } from "react-icons/md";

import OrderTable from "../../Components/OrderTable/OrderTable";
import "./UploadData.css";
import UploadInProgress from "../../Components/UploadStatus/UploadInProgress";
import UploadStatus from "../../Components/UploadStatus/UploadStatus";
import { uploadFile } from "../../API/api";

const guides = [
    "Only .csv files are accepted", 
    "Upload ONE file at a time",
    "Ensure all columns are present in the file (Refer to table)"
]

const UploadData = () => {

    const [formData, setFormData] = useState([]);
    const [type, setType] = useState(null);

    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(uploadFile);

    const updateFormData = (id, formData, status, errorMessage) => {

        const copy = [...formData]; 

        for (let i = copy.length-1; i >= 0; i--) {
            if (copy[i]["id"] === id) {
                copy[i] = { 
                        ...copy[i], 
                        status: status, 
                    }
                }
                if (errorMessage) {
                    copy[i]["errorMessage"] = errorMessage;
                }
                setFormData(copy);
                break
            }
    }

    const handleAddFile = (event) => {

        const timestamp = new Date().getTime();

        const file = event.target.files[0];
        if (file !== undefined) {
            setFormData((state) => ([
                ...state,
                {
                    id: timestamp + file.name, 
                    filename: file.name, 
                    type: type, 
                    status: "in progress", 
                    file: file,
                    abort: new AbortController()
                }
            ]))
        }
        setType(null);
        fileInputRef.current.value = null;
    }

    useEffect(() => {
        if (formData.length > 0) {
            const currFile = formData[formData.length - 1];

            const query = {
                file: currFile["file"], 
                type: currFile["type"], 
                tenant: "scis_bank", 
                controller: currFile["abort"]
            }

            mutate(query, {
                onSuccess: () => {
                    updateFormData(currFile["id"], formData, "success")
                    return queryClient.invalidateQueries(query)
                }, 
                onError: (err) => {

                    if (err.name === "CanceledError") {
                        updateFormData(currFile["id"], formData, "error", "File cancelled successfully");
                    } else {
                        const errorMessage = err.response ? err.response.data.data : "Please try again";
                        updateFormData(currFile["id"], formData, "error", errorMessage);
                    }
                }, 
                mutationKey: currFile["id"]
            })   
        }
    }, [formData.length])

    const cancelFile = (index, status) => {

        const newFormData = [...formData];
        const currFile = newFormData[index];

        if (status === "in-progress") {
            currFile["abort"].abort();
        }

        if (index === 0) {
            newFormData.shift();
        } else {
            newFormData.splice(index, 1);
        }

        return setFormData(newFormData);
    }

    useEffect(() => {
    
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue="";
        } 

        for (let i = 0; i < formData.length; i++) {
            if (formData[i]["status"] === "in progress") {
                window.addEventListener('beforeunload', handleBeforeUnload);
                return() => {
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                }
            };
        };
        
      }, [formData])

    return (
        <div>
        <script>{document.title = "Upload Data"}</script>
        <Card>
            <CardContent className="guides-container">
                <Grid container gap={1}>
                <Grid item xs={12} md={6} >
                    <Box>
                        <Typography className="upload-header">Guides</Typography>
                        <ul>
                        {_.map(guides, aGuide => {
                            return(
                                <li 
                                    className="upload-text" 
                                    style={{padding: 0}} 
                                    key={aGuide}
                                >
                                    {aGuide}
                                </li>
                            )})
                        }
                        </ul>
                    </Box>
                    <Box sx={{mt: 4}}>
                        <Typography className="upload-header">Is this file for spend or user?</Typography>
                        <RadioGroup row className="flexbox-flexStart" value={type}>
                            {_.map(["spend", "user"], (option) => {
                                return (
                                <FormControlLabel
                                    key={option}
                                    name="isEnd"
                                    value={option}
                                    control={<Radio size="small" />}
                                    label={option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                                    labelPlacement="start"
                                    sx={{ 
                                        mx: 2,
                                        mt: 1,
                                        ".MuiFormControlLabel-label": { fontSize: "14px", color: "#888888" } 
                                    }}
                                    onChange={(event) => setType(event.target.value)}
                                />
                                );
                            })}
                        </RadioGroup>
                    </Box>
                    <Box sx={{mt: 4}}>
                        <Typography className="upload-header">Upload file (.csv)</Typography>
                        <Box sx={{mt: 2, ml: 2}}>
                            <Button
                                variant="contained"
                                className="customButton"
                                component="label"
                                disabled={type === null}
                                role="button"
                            >
                                <MdUpload size={20} style={{marginRight: 10}}/>
                                Choose file to upload
                                <input 
                                    type="file" 
                                    hidden 
                                    accept=".csv" 
                                    onChange={handleAddFile}
                                    ref={fileInputRef}
                                />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5.8}>
                    <OrderTable />
                </Grid>
                { formData.length > 0 && 
                    <Grid item xs={12}>
                        <Typography className="upload-header">Status of file upload</Typography>
                    </Grid>
                }   
                {_.map(formData, (item, index) => {
                    const name = item.filename;
                    const status = item.status;
                    const id = item.id;
                    let type = item.type;
                    type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

                    return(
                        <Grid item xs={12} sx={{pb: 1}} key={index}>
                            { status === "in progress" 
                                ?   <UploadInProgress 
                                        fileName={name} 
                                        index={index}
                                        cancelFile={cancelFile} 
                                        type={type}
                                        id={id}
                                    />
                                :   <UploadStatus 
                                        isSuccess={status === "success"} 
                                        fileName={name}  
                                        type={type}
                                        errorMessage={item.errorMessage}
                                        cancelFile={cancelFile}
                                        index={index}
                                        id={id}
                                    />
                            }
                        </Grid>
                    )
                })
                }
                </Grid>
            </CardContent>
        </Card>
        </div>
    )
}

export default UploadData;
