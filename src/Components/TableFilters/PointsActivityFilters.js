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

const cardList =["SCIS Shopping", "SCIS PremiumMiles", "SCIS PlatinumMiles", "SCIS Freedom"];

const PointsActivityFilters = ({ filter, setFilter }) => {

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
                    <InputLabel id="card">Cards</InputLabel>
                    <Select
                        name="card"
                        label="cards"
                        value={filter["card"]}
                        sx={{width: "250px", mr: 1}}  
                        onChange={(event) => handleOnChange("card", event.target.value)}
                    >   
                        {_.map(cardList, (value) => {
                            return(
                            <MenuItem 
                                value={value} 
                                key={value}
                                sx={{
                                    color: value === "SCIS Shopping" ? "#9D1C00"
                                            : value === "SCIS Freedom" ? "#0E972C"
                                            : "#CB7A00"
                                }}
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
                            card:"" , 
                            search: ""
                        })
                    }}
                />
            </TableCell>
            <TableCell colSpan={2}>
                <SearchBar 
                    placeholder="Search by description"
                    handleOnChange={(event) => handleOnChange("search", event.target.value)}
                />
            </TableCell>
        </TableRow>
    )
}

export default PointsActivityFilters;