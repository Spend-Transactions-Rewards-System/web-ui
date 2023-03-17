import { cleanup, render, screen } from '@testing-library/react';

import UploadInProgress from "../UploadInProgress";

afterEach(cleanup)

const mockCancelFile = jest.fn();

describe("Upload in progress", () => {
    
    test("text rendered successfully", () => {
        render(
           <UploadInProgress 
                fileName="user.csv"
                cancelFile={mockCancelFile}
                index={0}
                type="user"
           />
        )  

        const textElement = screen.getByText(/user.csv/i)
        expect(textElement).toBeInTheDocument();
    })

})   

