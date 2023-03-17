import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

import AccountMenu from '../AccountMenu';


afterEach(cleanup)

const MockAccountMenu = () => {
    return(
        <BrowserRouter>
            <AccountMenu />
        </BrowserRouter>
    )
}

describe("AccountMenu", () => {
    
    it("should render AccountMenu with a logout text", () => {
        render(<MockAccountMenu />);
        const linkElement = screen.getByText(/logout/i);
        expect(linkElement).toBeInTheDocument();
    })
})
