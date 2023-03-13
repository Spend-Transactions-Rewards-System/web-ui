import { useState, useEffect } from "react";
import { useQuery} from "react-query";
import moment from "moment/moment";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import { getRewards } from "../../API/api";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const columnNames = ["Date", "Description", "Type", "Change", "Balance", "Card"]

const cardDict = {
    "scis_premiummiles": "SCIS PremiumMiles",
    "scis_platinummiles": "SCIS PlatinumMiles",
    "scis_shopping":"SCIS Shopping",
    "scis_freedom":"SCIS Freedom",
}

const Rewards = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        card: "", search: ""
    });

    // from token
    const customerId = "customer03"
    const { isError } = useQuery([customerId, "scis_bank"], getRewards, {
        onSuccess: (data) => {
            formatData(data);
        },
    });

    const formatData = (data) => {
        let formatMain = [];
        let formatDetails = {};
        _.map(data, (aRow) => {
            console.log(aRow["change"])
            formatMain.push({ 
                    id: aRow["id"],
                    transactionDate: moment(aRow["transactionDate"]).format("YYYY/MM/DD"), 
                    description: aRow["description"],
                    type: aRow["type"].charAt(0).toUpperCase() + aRow["type"].slice(1).toLowerCase(), 
                    change: (aRow["type"].toLowerCase() === "earn" ? "+" : "-") + aRow["change"].toLocaleString(),
                    balance: aRow["balance"].toLocaleString(),
                    card: cardDict[aRow["card"]],
                });
            formatDetails[aRow["id"]] = {
                    remarks: aRow["remarks"],
                    currency: aRow["currency"],
                    amountSpent: "$" + aRow["amount"].toLocaleString(undefined, {minimumFractionDigits: 2})
                };
        });

        setMainData(formatMain);
        setOrigData(formatMain);
        setDetails(formatDetails);
    }

    const filterData = () => {
        let data = origData;
        if (filter["card"] !== "") {
            data = data.filter((item) => item.card.toLowerCase() === filter["card"].toLowerCase());
        }
        if (filter["search"] !== "") {
            data = data.filter((item) => item.description.toLowerCase().includes(filter["search"].toLowerCase()));
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
            <script>{document.title="Rewards"}</script>
            {mainData === null || details === null ? <LoadingAnimation /> : 
            <>  
                <CollapsibleTable 
                    columnNames={columnNames}
                    mainData={mainData}
                    details={details}
                    filter={filter}
                    setFilter={setFilter}
                    type="rewards"
                />
            </>
            }
        </div>
    )
}

export default Rewards;