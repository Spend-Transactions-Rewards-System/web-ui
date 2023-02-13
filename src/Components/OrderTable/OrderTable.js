import { 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow
} from "@mui/material";
import _ from "lodash";

const orderDict = {
    "Order": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Spend Column Names": ["id", "transaction_id", "merchant", "mcc", "currency", "amount", 
                            "transaction_date", "card_id", "card_pan", "card_type"],
    "User Column Names": ["id", "first_name", "last_name", "phone", "email", "created_at", 
                            "updated_at", "card_id", "card_pan", "card_type"],                     
}


const OrderTable = () => {
    return(
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead sx={{backgroundColor: "#A3AED0"}}>
                    <TableRow>
                    {_.map(Object.keys(orderDict), key => {
                        return(
                            <TableCell key={key} sx={{color:"#FFFFFF"}}>
                                <b>{key}</b>
                            </TableCell>
                        )})
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                {_.map(orderDict["Order"], num => {
                    return(
                        <TableRow key={num}>
                            {_.map(Object.keys(orderDict), key => {
                                return(
                                    <TableCell key={key}>
                                        {orderDict[key][num-1]}
                                    </TableCell>
                                )})
                            }
                        </TableRow>
                    )})
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderTable;

