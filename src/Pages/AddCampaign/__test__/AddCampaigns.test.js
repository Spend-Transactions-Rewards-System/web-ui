import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AddCampaigns from '../AddCampaigns';

afterEach(cleanup)

const MockAddCampaigns = () => {
    return(
        <BrowserRouter>
            <AddCampaigns />
        </BrowserRouter>
    )
} 

describe("Add Campaign Page", () => {
    
    it("submit button should be disabled if form not filled", () => {
        render(<MockAddCampaigns />)
        const buttonElement = screen.getByRole("button", { name: /add campaign/i});
        expect(buttonElement).toBeDisabled();
    })  
})
