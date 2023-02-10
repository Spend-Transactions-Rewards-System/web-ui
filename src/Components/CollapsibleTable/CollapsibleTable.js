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
} from "@mui/material";
import _ from "lodash";

import UploadDataFilters from "../TableFilters/DataFilesFilters";
import Row from "./Row";
import PointsActivityFilters from "../TableFilters/PointsActivityFilters";

const CollapsibleTable = ({ 
    columnNames, 
    mainData, 
    details, 
    filter, 
    setFilter, 
    isDataFiles
}) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(mainData).length) : 0;

    return (
        <>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead sx={{".MuiTableCell-root": {p: 2, pt: 2.5}}}>
                    { isDataFiles 
                     ?  <UploadDataFilters 
                            filter={filter}
                            setFilter={setFilter}
                        />
                     : <PointsActivityFilters
                            filter={filter}
                            setFilter={setFilter}
                        />
                    }
                    
                </TableHead>
                <TableBody>
                <TableRow sx={{backgroundColor: "#A3AED0"}}>
                    {_.map(columnNames, (aName) => {
                        let name = aName;
                        if (!isDataFiles && aName === "Balance") {
                            if (filter["card"] === "SCIS Shopping") {
                                name = "Points"
                            } else if (filter["card"] === "SCIS Freedom") {
                                name = "Cashback"
                            } else if (filter["card"].includes("Miles")) {
                                name = "Miles"
                            }
                        }

                        return(
                            <TableCell 
                                key={aName} 
                                align="left" 
                                sx={{color:"#FFFFFF", py: 1.5}}
                            >
                                <b>{name}</b>
                            </TableCell>
                        )})
                    }
                    <TableCell></TableCell>
                </TableRow>
                {_.map(mainData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), (aRow) => {
                    return(
                        <Row
                            currRow={aRow}
                            isDataFiles={isDataFiles} 
                            details={details[aRow["id"]]}
                            colSpan={columnNames.length + 1}
                            key={aRow["id"]}
                        />
                    )
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 45 * emptyRows }}>
                        <TableCell colSpan={columnNames.length + 1} />
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