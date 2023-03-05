import { 
    FormControl, 
    InputLabel, 
    MenuItem,
    Select, 
    TableCell, 
    TableRow,
    TextField, 
} from "@mui/material";
import { 
    LocalizationProvider, 
    DatePicker 
} from '@mui/x-date-pickers';
import _ from "lodash";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import CustomButton from "../CustomButton/CustomButton";
import "./TableFilters.css";

const statusList ={
        "Completed": "completed", 
        "Completed (with rejected rows)": "completedReject",
        "Error": "error", 
        "Processing": "processing"
    };
const typeList = ["Spendings", "Users"]

const DataFilesFilters = ({ filter, setFilter }) => {

    const handleOnChange = (name, value) => {
        setFilter((state) => ({
            ...state, 
            [name]: value
        }));
    }

    return(
        <TableRow >
            <TableCell colSpan={5} >
            <FormControl size="small">
                <InputLabel id="status">Status</InputLabel>
                <Select
                    name="status"
                    label="Status"
                    value={filter["status"]}
                    sx={{width: "150px", mr: 1}}  
                    onChange={(event) => handleOnChange("status", event.target.value)}
                >   
                    {_.map(statusList, (value, key) => {
                        return(
                        <MenuItem value={value} key={value}>{key}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl size="small">
                <InputLabel id="type">Type</InputLabel>
                <Select
                    name="type"
                    label="Type"
                    value={filter["type"]}
                    sx={{width: "150px", mr: 1}}  
                    onChange={(event) => handleOnChange("type", event.target.value)}
                >   
                    {_.map(typeList, (value) => {
                        return(
                        <MenuItem value={value.toLowerCase()} key={value}>{value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    id="startDate"
                    label="Start Date"
                    value={filter["startDate"]}
                    inputFormat="DD/MM/YYYY"
                    onChange={(event) => handleOnChange("startDate", event._d)}
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            size="small" 
                            sx={{width: "180px", mr: 1}}
                        />
                    }
                />
                <DatePicker
                    id="endDate"
                    label="End Date"
                    value={filter["endDate"]}
                    inputFormat="DD/MM/YYYY"
                    onChange={(event) => handleOnChange("endDate", event._d)}
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            size="small" 
                            sx={{width: "180px", mr: 1}}
                        />
                    }
                />
            </LocalizationProvider>
            <CustomButton 
                text="Reset Filter"
                nameOfClass="customButton"
                handleOnClick={() => {
                    setFilter({
                        status: "", 
                        type: "", 
                        startDate: null, 
                        endDate: null 
                    })
                }}
            />
            </TableCell>
        </TableRow>
    )
}

export default DataFilesFilters;