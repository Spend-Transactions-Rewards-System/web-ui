import { 
    FormControl, 
    InputLabel, 
    MenuItem,
    Select, 
    TableCell, 
    TableRow,
} from "@mui/material";
import _ from "lodash";

import CustomButton from "../CustomButton/CustomButton";
import SearchBar from "../SearchBar/SearchBar";

const cardList =["Active", "Expired", "Inactive"];

const CampaignsFilters = ({ filter, setFilter }) => {

    const handleOnChange = (name, value) => {
        setFilter((state) => ({
            ...state, 
            [name]: value
        }));
    }

    return(
        <TableRow >
            <TableCell colSpan={3} >
                <FormControl size="small">
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        name="status"
                        label="status"
                        value={filter["status"]}
                        sx={{width: "250px", mr: 1}}  
                        onChange={(event) => handleOnChange("status", event.target.value)}
                    >   
                        {_.map(cardList, (value) => {
                            return(
                            <MenuItem 
                                value={value} 
                                key={value}
                            >
                                {value}
                            </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <CustomButton 
                    text="Reset Filter"
                    handleOnClick={() => {
                        setFilter({
                            status:"" , 
                            search: ""
                        })
                    }}
                />
            </TableCell>
            <TableCell colSpan={3}>
                <SearchBar 
                    placeholder="Search by Campaign Title"
                    handleOnChange={(event) => handleOnChange("search", event.target.value)}
                />
            </TableCell>
        </TableRow>
    )
}

export default CampaignsFilters;