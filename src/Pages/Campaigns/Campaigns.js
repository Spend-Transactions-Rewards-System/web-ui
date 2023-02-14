import { useState,useEffect } from "react";

import { Box } from "@mui/material";
import moment from "moment/moment";
import _ from "lodash";

import NonCollapsibleTable from "../../Components/CollapsibleTable/NonCollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";

const columnNames = ["Card Program", "Campaign Title", "Start Date", "End Date", "Status"]

const Campaigns = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({ 
        status: ""
    });

    const formatData = () => {
        let formatMain = []
        let formatDetails = {}
        _.map(data, (aRow) => {
            formatMain.push({ 
                    id: aRow["id"],
                    cardProgram: aRow["cardProgram"], 
                    campaignTitle: aRow["campaignTitle"].charAt(0).toUpperCase() + aRow["campaignTitle"].slice(1),
                    startDate: aRow["startDate"],
                    endDate: aRow["endDate"],
                    status: aRow["status"]
                });
            
            });
        setMainData(formatMain);
        setOrigData(formatMain);
        setDetails(formatDetails);
    }

    const filterData = () => {
        let data = origData;
        if (filter["status"] === "completedReject") {
            data = data.filter((item) => item.status.toLowerCase() === "completed" && item.rejected > 0);
        } else if (filter["status"] === "completed") {
            data = data.filter((item) => item.status.toLowerCase() === "completed" && item.rejected === 0);
        } else if (filter["status"] !== "") {
            data = data.filter((item) => item.status.toLowerCase() === filter["status"].toLowerCase());
        } else if (filter["search"] !== "") {
            data = data.filter((item) => item.campaignTitle.toLowerCase().includes(filter["search"].toLowerCase()));
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
            <script>{document.title="Data Files"}</script>
            {mainData === null || details === null ? <LoadingAnimation /> : 
            <>  
                <Box 
                    className="flexbox-flexEnd"
                    sx={{mb: 2}}
                >
                    <CustomButton 
                        text="Add campaign"
                        link="/campaigns/addcampaigns"
                    />
                </Box>
                <NonCollapsibleTable 
                    columnNames={columnNames}
                    mainData={mainData}
                    details={details}
                    filter={filter}
                    setFilter={setFilter}
                    isDataFiles={true}
                />
            </>
            }
        </div>
    )
}

export default Campaigns;

const data = [
    {   
        id: 1, 
        cardProgram: "SCIS Shopping Card", 
        campaignTitle: "6 points per dollar with Shopee, min spend 150 SGD",
        startDate: "01/02/2023",
        endDate: "28/02/2023",
        status: "inactive", 

    },

    {   
        id: 2, 
        cardProgram: "SCIS PlatinumMiles", 
        campaignTitle: "4 points per dollar with Grab, min spend 100 SGD ",
        startDate: "01/02/2023",
        endDate: "28/02/2023",
        status: "active", 

    },
]