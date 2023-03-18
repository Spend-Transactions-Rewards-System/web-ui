import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RewardsFilters from '../RewardsFilters';

afterEach(cleanup)

const mockFilter = { cards: "", search: "" }
const setMockFilter = jest.fn();

const MockRewardsFilters = ({ filter, setFilter}) => {
    return(
        <BrowserRouter>
            <table>
                <tbody>
                    <RewardsFilters 
                        filter={filter}
                        setFilter={setFilter}
                    />
                </tbody>
            </table>
        </BrowserRouter>
    )
}

describe("Rewards Filter",  () => {

    beforeEach(() => {
        render(
            <MockRewardsFilters 
                filter={mockFilter}
                setFilter={setMockFilter}
            />
        )
    })

    test("renders selects", () => {
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

