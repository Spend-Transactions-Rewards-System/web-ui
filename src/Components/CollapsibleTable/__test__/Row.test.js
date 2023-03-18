import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Row from '../Row';
import { mockRowData } from './mockData';

afterEach(cleanup)

const MockRow = ({ currRow, type, details, colSpan }) => {
    return(
        <table>
            <tbody>
                <Row 
                    currRow={currRow}
                    type={type}
                    details={details}
                    colSpan={colSpan}
                />
            </tbody>
        </table>
    )
}

describe("Collabsible Table Row", () => {
    
    test("click View Details button to show collapsible table", () => {
        render(
            <MockRow 
                currRow={mockRowData["currRow"]}
                type="dataFiles"
                details={mockRowData["details"][0]}
                colSpan={mockRowData["colSpan"]}
            />
        )

        const buttonElement = screen.queryByRole("button", { name: "View Details"});
        fireEvent.click(buttonElement);
        const text = screen.queryByText("Complete Date Time");
        expect(text).toBeInTheDocument();
    })

    it("should not have download button when status is 'Processing'", () => {
        render(
            <MockRow 
                currRow={mockRowData["currRow"]}
                type="dataFiles"
                details={mockRowData["details"][0]}
                colSpan={mockRowData["colSpan"]}
            />
        )

        const buttonElement = screen.queryByRole("button", { name: "View Details"});
        fireEvent.click(buttonElement);
        const downloadButton = screen.queryByRole("button", { name: "Download Erroneous Transaction(s)"});
        expect(downloadButton).not.toBeInTheDocument();
    })

    it("should not have download button when rejected is 0", () => {
        render(
            <MockRow 
                currRow={mockRowData["currRow"]}
                type="dataFiles"
                details={mockRowData["details"][1]}
                colSpan={mockRowData["colSpan"]}
            />
        )

        const buttonElement = screen.queryByRole("button", { name: "View Details"});
        fireEvent.click(buttonElement);
        const downloadButton = screen.queryByRole("button", { name: "Download Erroneous Transaction(s)"});
        expect(downloadButton).not.toBeInTheDocument();
    })

    it("should have download button when rejected is more than 0", () => {
        render(
            <MockRow 
                currRow={mockRowData["currRow"]}
                type="dataFiles"
                details={mockRowData["details"][2]}
                colSpan={mockRowData["colSpan"]}
            />
        )

        const buttonElement = screen.queryByRole("button", { name: "View Details"});
        fireEvent.click(buttonElement);
        const downloadButton = screen.queryByRole("button", { name: "Download Erroneous Transaction(s)"});
        expect(downloadButton).toBeInTheDocument();
    })
})
