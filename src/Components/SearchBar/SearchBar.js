
import { Box, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, handleOnChange }) => {
    return(
        <TextField
            size="small"
            fullWidth
            label={
                <Box 
                    className="flexbox-flexStart"
                    sx={{color: "#888888"}}
                >
                  <FiSearch /> &nbsp; {placeholder}
                </Box>
              }
            onChange={handleOnChange}
        />
    )
}

export default SearchBar;