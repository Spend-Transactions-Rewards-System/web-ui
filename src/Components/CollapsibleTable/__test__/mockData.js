const mockRowData = {
    currRow: {
        fileName: "1678622832-spend_test.csv",
        id: "1678622832-spend_test.csv",
        rejected: 0,
        status: "Processing",
        type: "Spend",
        uploadDateTime: "12/03/2023 08:07 PM"
    }, 
    details: [
            {
                completeDateTime: "null",
                processed: "null",
                rejected: "null", 
                rejectedFile: ""
            }, 
            {
                completeDateTime: "10/03/2023 11:47 PM",
                processed: 90000,
                rejected: 0, 
                rejectedFile: ""
            }, 
            {
                completeDateTime: "10/03/2023 11:47 PM",
                processed: 458603,
                rejected: 20000, 
                rejectedFile: "https://spend-t3-bucket.s3.ap-southeast-1.amazonaws.com/error/1678463080-spend.csv"
            }, 
    ], 
    colSpan: 5
}

const mockTableData = {
    columnNames: ['Date', 'Description', 'Type', 'Change', 'Balance', 'Card'],
    mainData: [
        {
            balance: "14",
            card: "SCIS PremiumMiles",
            change: "+14",
            description: "Mandai Zoo",
            id: 3,
            transactionDate: "2023/03/01",
            type: "Earn"
        }, 
        {
            balance: "28",
            card: "SCIS PremiumMiles",
            change: "+14",
            description: "Sushiro",
            id: 4,
            transactionDate: "2023/03/01",
            type: "Earn"
        }, 
    ],
    details: [
        {
            amountSpent: "$100.00",
            currency: "SGD",
            remarks: "Base 1.4 Miles/SGD"
        },
        {
            amountSpent: "$100.00",
            currency: "SGD",
            remarks: "Base 1.4 Miles/SGD"
        },
    ],
    filter: {
        card: '', 
        search: ''
    }
}


export { mockRowData, mockTableData };