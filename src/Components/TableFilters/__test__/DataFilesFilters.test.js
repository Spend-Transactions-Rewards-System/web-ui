import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import DataFilesFilters from '../DataFilesFilters';

afterEach(cleanup)

const mockFilter = { 
    status: "", 
    type: "", 
    startDate: null, 
    endDate: null,  
    search: ""
}
const setMockFilter = jest.fn();

const MockDataFilesFilters = ({ filter, setFilter}) => {
    return(
        <BrowserRouter>
            <table>
                <tbody>
                    <DataFilesFilters 
                        filter={filter}
                        setFilter={setFilter}
                    />
                </tbody>
            </table>
        </BrowserRouter>
    )
}

describe("Data Files Filter",  () => {

    beforeEach(() => {
        render(
            <MockDataFilesFilters 
                filter={mockFilter}
                setFilter={setMockFilter}
            />
        )
    })

    test("renders selects", () => {
        const selectElements = screen.getAllByRole(/select/i);
        expect(selectElements.length).toBe(2);
    })
    
    test("renders start and end date", () => {
        const calendarElements = screen.getAllByPlaceholderText("dd/mm/yyyy");
        expect(calendarElements.length).toBe(2);
    })
    
    test("renders reset button", () => {
        const buttonElements = screen.getAllByRole("button", { name: /reset filter/i });
        expect(buttonElements.length).toBe(1);
    })
})   

