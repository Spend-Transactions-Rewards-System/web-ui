import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import SearchBar from '../SearchBar';

afterEach(cleanup)

const mockHandleOnChange = jest.fn();

describe("Search bar", () => {

    beforeEach(() => {
        render(
            <SearchBar 
                 placeholder="Search by Campaign Title"
                 handleOnChange={mockHandleOnChange}
            />
         )  
    })
    
    test("text rendered successfully", () => {
        const textElement = screen.getByLabelText(/search by campaign title/i);
        expect(textElement).toBeInTheDocument();
    })

    it("should be able to add input", () => {        
        const inputElement = screen.getByLabelText(/search by campaign title/i);
        fireEvent.change(inputElement, { target: { value: "Mandai" } })

        expect(inputElement.value).toBe("Mandai");
    })

})   

