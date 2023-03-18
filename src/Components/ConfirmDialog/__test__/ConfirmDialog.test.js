import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ConfirmDialog from '../ConfirmDialog';

afterEach(cleanup)

const mockSetOpen = jest.fn();
const mockHandeleConfirm = jest.fn();


const MockConfirmDialog = ({ open, setOpen, text, header, handleConfirm }) => {
    return(
        <BrowserRouter>
             <ConfirmDialog 
                open={open}
                setOpen={setOpen}
                text={text}
                header={header}
                handleConfirm={handleConfirm}
            />
        </BrowserRouter>
    )
}

describe("Confirm Dialog", () => {

    beforeEach(() => {
        render(
            <MockConfirmDialog 
                open={true}
                setOpen={mockSetOpen}
                text="Are you sure you want to proceed?"
                header="Confirm Action"
                handleConfirm={mockHandeleConfirm}
            />
        )
    })
    
    it("should have yes and no button", () => {        
        const yesButton = screen.queryByRole("button", { name: /yes/i} );
        const noButton = screen.queryByRole("button", { name: /no/i} )

        expect(yesButton).toBeInTheDocument();
        expect(noButton).toBeInTheDocument();
    })

    it("should have the correct text and header", () => {
        const textElement = screen.getByText(/are you sure you want to proceed?/i);
        const headerElement = screen.getByText(/confirm action/i);

        expect(textElement).toBeInTheDocument();
        expect(headerElement).toBeInTheDocument();
    })

})   

