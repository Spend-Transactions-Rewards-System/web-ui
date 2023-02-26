import { useState, useEffect } from "react";

import moment from "moment/moment";
import _ from "lodash";

import CollapsibleTable from "../../Components/CollapsibleTable/CollapsibleTable";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";

const columnNames = ["Date", "Description", "Type", "Change", "Balance", "Card"]

const Rewards = () => {

    const [origData, setOrigData] = useState(null);
    const [mainData, setMainData] = useState(null);
    const [details, setDetails] = useState(null);
    const [filter, setFilter] = useState({
        card: "", search: ""
    });

    const formatData = () => {
        let formatMain = [];
        let formatDetails = {};
        _.map(data, (aRow) => {
            formatMain.push({ 
                    id: aRow["id"],
                    date: moment(aRow["date"]).format("DD/MM/YYYY"), 
                    description: aRow["description"],
                    type: aRow["type"].charAt(0).toUpperCase() + aRow["type"].slice(1).toLowerCase(), 
                    change: "+" + aRow["change"].toLocaleString(),
                    balance: aRow["balance"].toLocaleString(),
                    card: aRow["card"],
                });
            formatDetails[aRow["id"]] = {
                    remarks: aRow["remarks"],
                    amountSpent: "$" + aRow["amountSpent"].toLocaleString(undefined, {minimumFractionDigits: 2})
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
        formatData(data);
    }, [])   

    useEffect(() => {
        if (mainData != null) {
            filterData();
        }
    }, [filter])  

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

const data = [
    {   
        id: 1, 
        date: new Date(), 
        description: "Checkout: FairPrice Finest",
        type: "earn", 
        change: 81,
        balance: 210182,
        card: "SCIS Shopping",
        remarks: "Get 10% in points",
        amountSpent: 3241
    }, 
    {   
        id: 2, 
        date: new Date(), 
        description: "Flight: AUS-SIN",
        type: "earn", 
        change: 2192,
        balance: 210263,
        card: "SCIS PremiumMiles",
        remarks: "Get 20 miles",
        amountSpent: 1234
    }, 
    {
        id: 3, 
        date: new Date(), 
        description: "Bath & Body Works Bonus",
        type: "earn", 
        change: 181182,
        balance: 391445,
        card: "SCIS Shopping",
        remarks: "Get 12% in points",
        amountSpent: 872
    }, 
    {
        id: 4, 
        date: new Date(), 
        description: "Petrol: Shell",
        type: "earn", 
        change: 160851,
        balance: 552296,
        card: "SCIS Freedom",
        remarks: "Get 10% in cashback",
        amountSpent: 3241
    }, 
    {
        id: 5, 
        date: new Date(), 
        description: "Flight: SIN-MY",
        type: "earn", 
        change: 2102,
        balance: 554398,
        card: "SCIS PlatinumMiles",
        remarks: "Get 30 miles",
        amountSpent: 780
    }, 
]