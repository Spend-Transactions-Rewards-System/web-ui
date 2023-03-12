import { useState,useEffect } from "react";
import { useQuery } from "react-query";

import { Box } from "@mui/material";
import moment from "moment/moment";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { getDataFiles } from "../../API/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const columnNames = ["File Name", "Type", "Uploaded Data & Time", "Status"]

const DataFiles = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        status: "", type: "", startDate: null, endDate: null 
    });
    
    const { isError } = useQuery(["tenant", "scis_bank"], getDataFiles, {
        onSuccess: (data) => {
            formatData(data.data);
        }, 
    });

    const formatData = (data) => {
        let formatMain = []
        let formatDetails = {}
        _.map(data, (aRow) => {
            formatMain.push({ 
                    id: aRow["filename"],
                    fileName: aRow["filename"], 
                    type: aRow["type"].charAt(0).toUpperCase() + aRow["type"].slice(1).toLowerCase(), 
                    uploadDateTime: moment(aRow["uploadTimestamp"]).format("DD/MM/YYYY hh:mm A"), 
                    status: aRow["completeTimestamp"] === 0 ? "Processing" : "Completed",
                    rejected: aRow["numberOfRejected"]
                });
            formatDetails[aRow["filename"]] = {
                    completeDateTime: aRow["completeTimestamp"] 
                                    ? moment(aRow["completeTimestamp"]).format("DD/MM/YYYY hh:mm A") 
                                    : "null",
                    processed: aRow["numberOfProcessed"] ? aRow["numberOfProcessed"] : "null", 
                    rejected: aRow["numberOfRejected"] ? aRow["numberOfRejected"] : "null", 
                    rejectedFile: aRow["url"]["error"]
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
            data = data.filter((item) => moment(moment(item.uploadDateTime, "DD/MM/YYYY hh:mm A")).isSameOrAfter(filter["startDate"]));
        }
        if (filter["endDate"] !== null) {
            data = data.filter((item) => moment(moment(item.uploadDateTime,"DD/MM/YYYY hh:mm A")).isSameOrBefore(filter["endDate"]));
        }
        setMainData(data);
    }

    useEffect(() => {
        if (mainData != null) {
            filterData();
        }
    }, [filter])   

    if (isError) {
        return <ErrorMessage /> 
    }

    return (
        <div> 
            <script>{document.title="Data Files"}</script>
            { mainData === null || details === null ? <LoadingAnimation /> :   
            <>  
                <Box 
                    className="flexbox-flexEnd"
                    sx={{mb: 2}}
                >
                    <CustomButton 
                        text="Upload data"
                        link="/datafiles/upload"
                        nameOfClass="customButton"
                    />
                </Box>
                <CollapsibleTable 
                    columnNames={columnNames}
                    mainData={mainData}
                    details={details}
                    filter={filter}
                    setFilter={setFilter}
                    type="dataFiles"
                />
            </>
            }
        </div>
    )
}

export default DataFiles;
