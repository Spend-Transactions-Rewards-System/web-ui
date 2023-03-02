import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { Box } from "@mui/material";
import moment from "moment/moment";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { Snackbar, Alert, Button } from "@mui/material";


const columnNames = ["Card Program", "Campaign Title", "Start Date", "End Date", "Status"]

const Campaigns = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        status: "", search: ""
    });

    const formatData = () => {
        let formatMain = [];
        let formatDetails = {};
        _.map(data, (aRow) => {
            formatMain.push({
                id: aRow["id"],
                cardProgram: aRow["cardProgram"],
                title: aRow["title"],
                startDate: moment(aRow["startDate"]).format("DD/MM/YYYY"),
                endDate: moment(aRow["endDate"]).format("DD/MM/YYYY"),
                status: aRow["status"].charAt(0).toUpperCase() + aRow["status"].slice(1).toLowerCase(),
            })
            formatDetails[aRow["id"]] = {
                points: aRow["points"],
                minSpend: aRow["minSpend"],
                merchant: aRow["merchant"],
                message: aRow["message"]
            }
        });

        setMainData(formatMain);
        setOrigData(formatMain);
        setDetails(formatDetails);
    }

    const filterData = () => {
        let data = origData;
        if (filter["status"] !== "") {
            data = data.filter((item) => item.status.toLowerCase() === filter["status"].toLowerCase());
        }
        if (filter["search"] !== "") {
            data = data.filter((item) => item.title.toLowerCase().includes(filter["search"].toLowerCase()));
        }
        setMainData(data);
    }

    useEffect(() => {
        formatData(data);
    }, [])

    useEffect(() => {
        if (mainData != null) {
            filterData();
        }
    }, [filter])

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false);
    }

    const action = (
        <Button color="secondary" size="small" onClick={() => {
            // Implement your action here
        }}>
            UNDO
        </Button>
    );

    const showSnackbar = new URLSearchParams(useLocation().search).get('showSnackBar');

    return (
        <div>
            <script>{document.title = "Campaigns"}</script>
            {mainData === null || details === null ? <LoadingAnimation /> :
                <>
                    <Box
                        className="flexbox-flexEnd"
                        sx={{ mb: 2 }}
                    >
                        <CustomButton
                            text="Add Campaign"
                            link="/campaigns/addcampaigns"
                            nameOfClass="customButton"
                        />
                    </Box>
                    <CollapsibleTable
                        columnNames={columnNames}
                        mainData={mainData}
                        details={details}
                        filter={filter}
                        setFilter={setFilter}
                        type="campaigns"
                    />
                </>
            }
            {showSnackbar && <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Campaign added successfully
                </Alert>
            </Snackbar>}         
        </div>
    )
}

export default Campaigns;

const data = [
    {
        id: 1,
        cardProgram: "SCIS Shopping Card",
        title: "6 points per dollar with Shopee, min spend 150 SGD",
        startDate: new Date(),
        endDate: new Date(),
        status: "active",
        points: 6,
        minSpend: 150,
        merchant: "Shopee",
        message: "Earn 6 points for every dollar spent on Shopee with a minimum spend of $150. Terms and conditions apply."
    },
    {
        id: 2,
        cardProgram: "SCIS Shopping Card",
        title: "4 points per dollar with Grab, min spend 100 SGD",
        startDate: new Date(),
        endDate: new Date(),
        status: "inactive",
        points: 4,
        minSpend: 100,
        merchant: "Grab",
        message: "Earn 4 points for every dollar spent on Grab with a minimum spend of $100. Terms and conditions apply."
    },
    {
        id: 3,
        cardProgram: "SCIS Shopping Card",
        title: "5 points per dollar with Taobao, min spend 100 SGD",
        startDate: new Date(),
        endDate: new Date(),
        status: "expired",
        points: 5,
        minSpend: 100,
        merchant: "Taobao",
        message: "Earn 5 points for every dollar spent on Taobao with a minimum spend of $100. Terms and conditions apply."
    }
]