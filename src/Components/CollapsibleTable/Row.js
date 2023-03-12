import { useState, memo } from "react";

import {
    Alert, 
    Box,
    TableRow, 
    TableCell, 
    Button, 
    Chip,
    Collapse,
    Typography, 
    IconButton, 
    Snackbar
} from "@mui/material";
import _ from "lodash";
import { IoIosArrowDown } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

import { downloadErrorFile } from "../../API/api";

const detailDict = {
    "completeDateTime": "Complete Date Time",
    "processed": "Processed", 
    "rejected": "Rejected",
    "remarks": "Remarks",
    "amountSpent": "Amount Spent",
    "points": "Number of points per dollar",
    "minSpend": "Minimum spend (SGD)",
    "merchant": "Merchant", 
    "message": "Notification Message" 
}

const areEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

const Row = ({ currRow, type, details, colSpan }) => {

    const [open, setOpen] = useState(false);
    const [errorDownload, setErrorDownload] = useState(false);

    const downloadFile = (url, filename) => {
        downloadErrorFile(url, filename)
        .catch((err) => {
            console.log(err.message);
            setErrorDownload(true);
        })
    }

    return(
        <>
        <TableRow>
            {_.map(Object.keys(currRow), (aKey) => {
                const value = currRow[aKey];
                if (aKey !== "id" && aKey !== "rejected") {
                    return (
                    <TableCell key={aKey} >
                        { type === "dataFiles" && aKey === "status" 
                            ? <Chip 
                                label={value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                                sx={{
                                        backgroundColor: value.toLowerCase() === "completed" ? "#00873E" : "#FF9922", 
                                        color: "#FFFFFF",
                                        width: "100px"
                                    }}
                                />
                            : type === "rewards" && aKey === "balance"  ?
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
                            : type === "campaigns" && aKey === "status"  ?
                                <Chip 
                                label={value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                                sx={{
                                        backgroundColor: value.toLowerCase() === "active" ? "#00873E"
                                            : value.toLowerCase() === "inactive" ? "#FF9922" 
                                            : "#BDBDBD", 
                                        color: "#FFFFFF",
                                        width: "100px"
                                    }}
                                />
                            : value
                        }
                        { currRow["rejected"] > 0 &&  aKey === "status"
                            && currRow["status"].toLowerCase() === "completed"
                            && <BsExclamationLg size={20} style={{color: "#D32F2F"}}/>                                          
                        }
                    </TableCell>)
                }
            })}
            <TableCell align="right">
                <Button
                    disableRipple
                    sx={{
                        textTransform: "none",
                        color: "#4B2DCC",
                        width: "120px"
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {open ? "Hide Details" : "View Details"}
                    <IoIosArrowDown 
                        style={{
                            color:"#A3AED0",
                            marginLeft:"8px", 
                            rotate: open ? "180deg" : "0deg"
                        }}
                    />
                </Button>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell sx={{py: 0}} colSpan={colSpan}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ml: 10, mr: 2, my: 2}}>
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
                                                width: "500px",
                                                color: "rgba(0, 0, 0, 0.87)",
                                                fontSize: "0.875rem",
                                                whiteSpace: "pre-line"
                                            }}
                                        >
                                            {typeof value === "number" ? value.toLocaleString() : value} 
                                            {(key === "rejected" || key === "processed")  
                                                && value !== "null" 
                                                && " row(s)"
                                            }
                                            { key === "rejected" && value > 0 &&
                                            <Button
                                                sx={{
                                                    textTransform:"none", 
                                                    fontSize: "0.875rem",
                                                    py: 0, px: 1,
                                                    ml: 2,
                                                    color: "#4B2DCC",
                                                }}
                                                onClick={() => downloadFile(details["rejectedFile"], currRow["id"])}
                                            >
                                                <u>Download Erroneous Transaction(s)</u>
                                            </Button>
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }})
                    }
                </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        <Snackbar
            open={errorDownload}
            autoHideDuration={6000}
            onClose={() => setErrorDownload(false)}
        >
            <Alert 
                severity="error"
                sx={{ width: '100%' }}
            >
                <b>Error</b> - Download file failed. Please try again later.
                <IconButton 
                    onClick={() => setErrorDownload(false)}
                    sx={{
                        color: "#5F2120", 
                        p: 0.5, 
                        ml: 8
                    }}
                >
                    <CgClose 
                        style={{PointerEvent: "none"}} 
                        size="15px"
                    />
                </IconButton>
            </Alert>
        </Snackbar>
        </>
    )
}

export default memo(Row, areEqual);
