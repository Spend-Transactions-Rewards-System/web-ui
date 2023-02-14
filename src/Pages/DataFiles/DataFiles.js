import { useState,useEffect } from "react";

import { Box } from "@mui/material";
import moment from "moment/moment";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";

const columnNames = ["File Name", "Type", "Uploaded Data & Time", "Status"]

const DataFiles = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        status: "", type: "", startDate: null, endDate: null 
    });

    const formatData = () => {
        let formatMain = []
        let formatDetails = {}
        _.map(data, (aRow) => {
            formatMain.push({ 
                    id: aRow["id"],
                    fileName: aRow["fileName"], 
                    type: aRow["type"].charAt(0).toUpperCase() + aRow["type"].slice(1).toLowerCase(), 
                    uploadDateTime: moment(aRow["uploadDateTime"]).format("DD/MM/YYYY hh:mm A"), 
                    status: aRow["status"].charAt(0).toUpperCase() + aRow["status"].slice(1).toLowerCase(), 
                    rejected: aRow["rejected"]
                });
            formatDetails[aRow["id"]] = {
                    completeDateTime: aRow["completeDateTime"] 
                                    ? moment(aRow["completeDateTime"]).format("DD/MM/YYYY hh:mm A") 
                                    : "null",
                    processed: aRow["processed"] ? aRow["processed"] : "null", 
                    rejected: aRow["rejected"] ? aRow["rejected"] : "null", 
                    rejectedFile: aRow["rejectedFile"]
                };
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
        }
        if (filter["type"] !== "") {
            data = data.filter((item) => item.type.toLowerCase() === filter["type"].toLowerCase());
        }
        if (filter["startDate"] !== null) {
            data = data.filter((item) => moment(moment(item.uploadDateTime).format("DD/MM/YYYY"))
                                            .isSameOrAfter(filter["startDate"]));
        }
        if (filter["endDate"] !== null) {
            data = data.filter((item) => moment(moment(item.uploadDateTime).format("DD/MM/YYYY"))
                                            .isSameOrBefore(filter["endDate"]));
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
                        text="Upload data"
                        link="/datafiles/upload"
                    />
                </Box>
                <CollapsibleTable 
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

export default DataFiles;

const data = [
    {   
        id: 1, 
        fileName: "01-02-23.csv", 
        type: "users", 
        uploadDateTime: new Date(), 
        status: "processing", 
        completeDateTime: null,
        processed: null, 
        rejected: null, 
        rejectedFile: null
    }, 
    {   
        id: 2,
        fileName: "01-02-23.csv", 
        type: "spendings", 
        uploadDateTime: new Date(), 
        status: "completed", 
        completeDateTime: new Date(),
        processed: 1000000, 
        rejected: 0, 
        rejectedFile: null
    }, 
    {
        id: 3,
        fileName: "01-02-23.csv", 
        type: "spendings", 
        uploadDateTime: new Date(), 
        status: "error", 
        completeDateTime: null,
        processed: null, 
        rejected: null, 
        rejectedFile: null
    }, 
    {
        id: 4,
        fileName: "31-01-23.csv", 
        type: "spendings", 
        uploadDateTime: new Date(), 
        status: "completed", 
        completeDateTime: null,
        processed: 900000, 
        rejected: 100000, 
        rejectedFile: null
    }, 
]