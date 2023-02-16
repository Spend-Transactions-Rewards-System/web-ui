import { useState } from "react";

import {
    Box,
    TableRow, 
    TableCell, 
    Button, 
    Chip,
    Collapse,
    Typography
} from "@mui/material";
import _ from "lodash";
import { IoIosArrowDown } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";

const detailDict = {
    "completeDateTime": "Complete Date Time",
    "processed": "Processed", 
    "rejected": "Rejected",
    "remarks": "Remarks",
    "amountSpent": "Amount Spent"
}

const Row = ({ currRow, isDataFiles, details, colSpan }) => {

    const [open, setOpen] = useState(false);

    return(
        <>
        <TableRow>
            {_.map(Object.keys(currRow), (aKey) => {
                const value = currRow[aKey];
                if (aKey !== "id" && aKey !== "rejected") {
                    return (
                    <TableCell key={aKey}>
                        { isDataFiles && aKey === "status" 
                            ? <Chip 
                                label={value}
                                sx={{
                                        backgroundColor: value.toLowerCase() === "active" ? "#00873E"
                                            : value.toLowerCase() === "inactive" ? "#FF9922" 
                                            : "#D32F2F", 
                                        color: "#FFFFFF",
                                        width: "100px"
                                    }}
                                />
                            : !isDataFiles && aKey === "balance"  ?
                                <Typography 
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "0.875rem",
                                        lineHeight: 1.43,
                                        letterSpacing: "0.01071em",
                                        color: currRow["card"] === "SCIS Shopping" ? "#9D1C00"
                                                : currRow["card"]  === "SCIS Freedom" ? "#0E972C"
                                                : "#CB7A00"
                                    }}
                                >
                                    {value}
                                </Typography>
                            : value
                        }
                        { currRow["rejected"] > 0 &&  aKey === "status"
                            && currRow["status"].toLowerCase() === "completed"
                            && <BsExclamationLg size={20} style={{color: "#D32F2F"}}/>                                          
                        }
                    </TableCell>)
                }
            })}
            {/* <TableCell align="right">
                <Button
                    disableRipple
                    sx={{
                        textTransform: "none",
                        color: "#4B2DCC"
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {open ? "Hide Details" : "View Details"}
                    <IoIosArrowDown 
                        style={{
                            color:"#A3AED0",
                            marginLeft:"8px", 
                            rotate: open ? "180deg" : "0deg"}
                        }
                    />
                </Button>
            </TableCell> */}
        </TableRow>
        <TableRow>
            <TableCell sx={{py: 0}} colSpan={colSpan}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ml: 10, my: 2}}>
                    {_.map(details, (value, key) => {
                        if (key !== "rejectedFile") {
                            return(
                                <Box key={key} sx={{display: "flex", my: 1}}>
                                    <Typography 
                                        sx={{
                                            width: "200px", 
                                            color: "rgba(0, 0, 0, 0.87)",
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        {detailDict[key]} 
                                    </Typography>
                                    <Box sx={{display:"flex"}}>
                                    <Typography
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.87)",
                                            fontSize: "0.875rem"
                                        }}
                                    >
                                        {typeof value === "number" ? value.toLocaleString() : value} 
                                        {(key === "rejected" || key === "processed")  
                                            && value !== "null" 
                                            && " row(s)"
                                        }
                                    </Typography>
                                    { key === "rejected" && value > 0 &&
                                        <Button
                                            sx={{
                                                textTransform:"none", 
                                                fontSize: "0.875rem",
                                                py: 0, px: 1,
                                                ml: 2,
                                                color: "#4B2DCC"
                                            }}
                                        >
                                            <u>Download report</u>
                                        </Button>
                                    }
                                   
                                    </Box>
                                </Box>
                            )
                        }})
                    }
                </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

export default Row;