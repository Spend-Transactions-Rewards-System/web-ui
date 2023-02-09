import { useState } from "react";

import {
    Paper, 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
    TablePagination,
    Button
} from "@mui/material";
import _ from "lodash";
import { IoIosArrowDown } from "react-icons/io";
import UploadDataFilters from "./DataFilesFilters";


const CollapsibleTable = ({ 
    columnNames, 
    mainData, 
    details, 
    filter, 
    setFilter, 
}) => {
    const [open, setOpen] = useState();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(mainData).length) : 0;

    return (
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <UploadDataFilters 
                        filter={filter}
                        setFilter={setFilter}
                    />
                </TableHead>
                <TableBody>
                <TableRow sx={{backgroundColor: "#A3AED0"}}>
                    {_.map(columnNames, (aName) => {
                        return(
                            <TableCell 
                                key={aName} 
                                align="left" 
                                sx={{color:"#FFFFFF"}}
                            >
                                <b>{aName}</b>
                            </TableCell>
                        )})
                    }
                    <TableCell></TableCell>
                </TableRow>
                {_.map(mainData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), (aRow) => {
                    return(
                        <TableRow key={aRow["id"]}>
                            {_.map(aRow, (value, key) => {
                                if (key !== "id" && key !== "rejected") {
                                    return (
                                    <TableCell key={key}>{value}</TableCell>)
                                }
                            })}
                            <TableCell align="right">
                                <Button
                                    disableRipple
                                    sx={{
                                        textTransform: "none",
                                        color: "#4B2DCC"
                                    }}
                                    onClick={() => setOpen((state) => ({
                                        ...state, [aRow["id"]]: true
                                    }))}
                                >
                                    View Details
                                    <IoIosArrowDown style={{color:"#A3AED0", marginLeft:"8px"}}/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 45 * emptyRows }}>
                        <TableCell colSpan={5} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Object.keys(mainData).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
                setRowsPerPage(event.target.value);
                setPage(0);
            }}
       />
       </>
    )
}

export default CollapsibleTable;