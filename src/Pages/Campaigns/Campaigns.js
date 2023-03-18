import React, { useState, useEffect } from "react";
import { useQuery} from "react-query";
import { useLocation } from 'react-router-dom';

import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import moment from "moment/moment";
import { CgClose } from "react-icons/cg";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { getCampaigns } from "../../API/api";

const columnNames = ["Card Program", "Campaign Title", "Start Date", "End Date", "Status"]

const Campaigns = () => {

      const cardIdDict = {
        0: "SCIS Freedom Card",
        1: "SCIS PlatinumMiles Card",
        2: "SCIS PremiumMiles Card",
        3: "SCIS Shopping Card",
      }

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


    const { isError } = useQuery(["0", "scis_bank"], getCampaigns, {
        onSuccess: (data) => {
            formatData(data);
        },
    });

    const formatData = (data) => {
        const currDate = new Date((new Date()).setHours(0, 0, 0, 0));
        let formatMain = [];
        let formatDetails = {};
        _.map(data, (aRow) => {
            formatMain.push({
                id: aRow["notifications_list"][0]["campaign_id"],
                cardProgram: cardIdDict[aRow["card_program_id"]],
                title: aRow["title"],
                startDate: moment(aRow["start_date"]).format("DD/MM/YYYY"),
                endDate: moment(aRow["end_date"]).format("DD/MM/YYYY"),
                status: currDate < moment(aRow["start_date"]).toDate() ? 'inactive' : currDate > moment(aRow["end_date"]).toDate() ? 'expired' : 'active',
            })
            formatDetails[aRow["notifications_list"][0]["campaign_id"]] = {
                points: aRow["points_per_dollar"],
                minSpend: aRow["min_dollar_spent"],
                merchant: aRow["mcc"],
                message: aRow["notifications_list"][0]["notification_message"]
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

