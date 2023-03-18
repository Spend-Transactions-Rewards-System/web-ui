import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NavBar from '../NavBar';

afterEach(cleanup)

const MockNavBar = () => {
    return(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
}

describe("Button", () => {
    
    it("should contain 3 links", () => {
        render(
           <MockNavBar />
        )
        
        const links = screen.getAllByRole("link")  
        expect(links[0]).toHaveAttribute("href", "/datafiles");
        expect(links[1]).toHaveAttribute("href", "/datafiles");
        expect(links[2]).toHaveAttribute("href", "/campaigns");

    })

})   

