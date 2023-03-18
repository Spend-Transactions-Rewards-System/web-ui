import { cleanup, render, screen } from '@testing-library/react';

import OrderTable from '../OrderTable';

afterEach(cleanup)

describe("Order Table", () => {
    
    test("text rendered successfully", () => {
        render(
           <OrderTable />
        )
        
        const textElement = screen.getByText(/spend column names/i);

        expect(textElement).toBeInTheDocument();
    })

})   

