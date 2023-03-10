import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import moment from "moment/moment";
import { CgClose } from "react-icons/cg";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";

const columnNames = ["Card Program", "Campaign Title", "Start Date", "End Date", "Status"]

const Campaigns = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        status: "", search: ""
    });
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [addSuccess, setAddSuccess] = useState(null);
    useEffect(() => {
        if (location.state !== null) {
            setOpen(true);
            setAddSuccess(location.state.addSuccess);
        }  
    }, [])

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
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => {
                    setOpen(false);
                    window.history.replaceState({}, null)
                }}
            >
                <Alert 
                    severity={addSuccess ? "success" : "error"} 
                    sx={{ width: '100%' }}
                >
                    { addSuccess 
                        ? "Campaign added successfully" 
                        :  <><b>Error</b> - Campaign failed to add </>
                    }
                    <IconButton 
                        onClick={() => {
                            setOpen(false);
                            window.history.replaceState({}, null)
                        }}
                        sx={{
                            color: addSuccess ? "#1E4620" : "#5F2120", 
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