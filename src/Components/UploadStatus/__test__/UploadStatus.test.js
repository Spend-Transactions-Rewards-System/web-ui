import { cleanup, render, screen } from '@testing-library/react';

import UploadStatus from "../UploadStatus";

afterEach(cleanup)

const mockCancelFile = jest.fn();

describe("Upload Status", () => {
    
    test("show the correct filename", () => {
        render(
           <UploadStatus 
                isSuccess={true}
                fileName="user.csv"
                cancelFile={mockCancelFile}
                index={0}
                type="user"
           />
        )  

        const textElement = screen.getByText(/user.csv/i);
        expect(textElement).toBeInTheDocument();
    })
    
    test("success status rendered successfully", () => {
        render(
           <UploadStatus 
                isSuccess={true}
                fileName="user.csv"
                type="user"
                cancelFile={mockCancelFile}
                index={0}
           />
        )  

        const statusElement = screen.getByTestId(/alertTitle/i);
        expect(statusElement).toHaveTextContent("File uploaded successfully (user)");
    })

    test("error message rendered successfully", () => {
        render(
           <UploadStatus 
                isSuccess={false}
                fileName="spend.csv"
                type="spend"
                errorMessage="Please check your column names"
                cancelFile={mockCancelFile}
                index={0}
           />
        )  
        
        const errorMessage = screen.getByText(/please check your column names/i);
        expect(errorMessage).toBeInTheDocument();
    })

})   

