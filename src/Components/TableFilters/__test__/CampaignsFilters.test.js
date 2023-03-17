import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CampaignsFilters from '../CampaignsFilters';

afterEach(cleanup)

const mockFilter = { status: "", search: "" }
const setMockFilter = jest.fn();

const MockCampaignsFilters = ({ filter, setFilter}) => {
    return(
        <BrowserRouter>
            <table>
                <tbody>
                    <CampaignsFilters 
                        filter={filter}
                        setFilter={setFilter}
                    />
                </tbody>
            </table>
        </BrowserRouter>
    )
}

describe("Campaigns Filter",  () => {

    beforeEach(() => {
        render(
            <MockCampaignsFilters 
                filter={mockFilter}
                setFilter={setMockFilter}
            />
        )
    })

    test("renders select, reset button and searchbar", () => {
        const selectElements = screen.getAllByRole(/select/i);
        expect(selectElements.length).toBe(1);
    })

    test("renders reset button", () => {
        const buttonElements = screen.getAllByRole("button", { name: /reset filter/i });
        expect(buttonElements.length).toBe(1);
    })

    test("renders searchbar", () => {
        const searchBar = screen.getAllByRole(/searchbar/i);
        expect(searchBar.length).toBe(1);
    })

})   

