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
import moment from "moment";

import CustomButton from "../CustomButton/CustomButton";
import SearchBar from "../SearchBar/SearchBar";

const statusList ={
        "Active": "active", 
        "Expired": "expired",
        "Inactive": "inactive"
    };

const CampaignFilters = ({ filter, setFilter }) => {

    const handleOnChange = (name, value) => {
        let currValue = value; 
        if (name.includes("date")) {
            currValue = moment(value).format("DD/MM/YYYY")
        }
        setFilter((state) => ({
            ...state, 
            [name]: currValue
        }));
    }

    return(
        <>
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
            
            
            
            <CustomButton 
                text="Reset Filter"
                handleOnClick={() => {
                    setFilter({
                        status: "",
                        search: ""
                    })
                }}
            />
            
            {/* insert search box here */}
            </TableCell>
            <TableCell colSpan={2}>
                <SearchBar 
                    placeholder="Search by Campaign Title"
                    handleOnChange={(event) => handleOnChange("search", event.target.value)}
                />
            </TableCell>
        </TableRow>
        
        </>
        
    )
}

export default CampaignFilters;