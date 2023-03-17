import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import AddCampaignForm from '../AddCampaignForm';

afterEach(cleanup)

const mockFormData = {
    title: "",
    cardProgram: null,
    pointsPerDollar: "",
    minSpend: "",
    merchant: null, 
    startDate: null,
    endDate: null,
    notificationTitle: "", 
    notificationMessage: ""
}
const mockSetFormData = jest.fn();
const mockSetOpen = jest.fn();

const MockAddCampaignForm = ({ formData, setFormData, setOpen }) => {
    return(
        <BrowserRouter>
            <AddCampaignForm 
                formData={formData}
                setFormData={setFormData}
                setOpen={setOpen}
            />
        </BrowserRouter>
    )
}

describe("AddCampaignForm", () => {
    
    it("should render input elements", () => {
        render(
            <MockAddCampaignForm 
                formData={mockFormData} 
                setFormData={mockSetFormData}
                setOpen={mockSetOpen}
            />
        )
        const inputElements = screen.getAllByRole("textbox");
        const autoCompleteElements = screen.getAllByRole("combobox");
        const startDateElement = screen.getAllByLabelText("Start Date");
        const endDateElement = screen.getAllByLabelText("End Date");

        expect(inputElements.length + autoCompleteElements.length
                + startDateElement.length + endDateElement.length).toBe(9);
    })
})