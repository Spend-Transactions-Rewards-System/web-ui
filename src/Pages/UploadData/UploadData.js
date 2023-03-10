import { useState, useEffect } from "react";

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

const guides = [
    "Only .csv files are accepted", 
    "Upload ONE file at a time",
    "Ensure the column anmes are in the same format and order as the table on the right"
]

const UploadData = () => {

    const [formData, setFormData] = useState([]);
    const [type, setType] = useState(null);

    const handleAddFile = (event) => {
        const file = event.target.files[0];
        if (file !== undefined) {
            setFormData((state) => ([
                ...state,
                { [file.name] : {
                   type: type, 
                   status: "in progress"
                }}
            ]))
        }
        setType(null);
    }

    const cancelFile = (event) => {
        const newFormData = [...formData];
        const index = event.target.name;

        if (index === 0) {
            newFormData.shift();
        } else {
            newFormData.splice(index, 1);
        }

        return setFormData(newFormData);
    }

    return (
        <div>
        <script>{document.title = "Upload Data"}</script>
        <Card>
            <CardContent className="guides-container">
                <Grid container gap={1}>
                <Grid item xs={6} >
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
                        <Typography className="upload-header">Is this file for spends or users?</Typography>
                        <RadioGroup row className="flexbox-flexStart" value={type}>
                            {_.map(["spends", "users"], (option) => {
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
                        <Typography className="upload-header">Upload file(.csv)</Typography>
                        <Box sx={{mt: 2, ml: 2}}>
                            <Button
                                variant="contained"
                                className="customButton"
                                component="label"
                                disabled={type === null}
                            >
                                <form 
                                    method="post" 
                                    encType="multipart/form-data" 
                                    className="flexbox-center"
                                >
                                    <MdUpload size={20} style={{marginRight: 10}}/>
                                    Choose file to upload
                                    <input 
                                        type="file" 
                                        hidden 
                                        accept=".csv" 
                                        onChange={handleAddFile}
                                    />
                                </form>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5.8}>
                    <OrderTable />
                </Grid>
                { formData.length > 0 && 
                    <Grid item xs={12}>
                        <Typography className="upload-header">Status of file upload</Typography>
                    </Grid>
                }   
                {_.map(formData, (item, index) => {
                    const name = Object.keys(item)[0];
                    const status = item[name]["status"];
                    let type = item[name]["type"];
                    type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

                    return(
                        <Grid item xs={12} sx={{pb: 1}} key={index}>
                            { status === "in progress" 
                                ?   <UploadInProgress 
                                        fileName={name} 
                                        index={index}
                                        cancelFile={cancelFile} 
                                        type={type}
                                    />
                                :   <UploadStatus 
                                        isSuccess={status === "success"} 
                                        fileName={name}  
                                        type={type}
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
