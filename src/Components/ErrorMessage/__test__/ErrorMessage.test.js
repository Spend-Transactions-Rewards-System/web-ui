import { cleanup, render, screen } from '@testing-library/react';

import ErrorMessage from '../ErrorMessage';

afterEach(cleanup)

describe("Error Message", () => {
    
    test("text rendered successfully", () => {
        render(
           <ErrorMessage />
        )
        
        const textElement = screen.getByText(/an error occurred while loading the table, please try again later/i);

        expect(textElement).toBeInTheDocument();
    })

})   

