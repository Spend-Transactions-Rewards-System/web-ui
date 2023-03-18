import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CustomerLayout from '../CustomerLayout';

afterEach(cleanup)

const MockCustomerLayout = () => {
    return(
        <BrowserRouter>
            <CustomerLayout />
        </BrowserRouter>
    )
}

describe("Customer Layout", () => {
    
    it("should render rewards text", () => {
        render(<MockCustomerLayout />);
        const textElement = screen.getByText(/rewards/i);
        expect(textElement).toBeInTheDocument();
    })   
})
