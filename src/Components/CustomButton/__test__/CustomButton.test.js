import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CustomButton from '../CustomButton';

afterEach(cleanup)

const mockHandleOnClick = jest.fn();

const MockCustomButton = ({ text, handleOnClick, link, disabled, fullWidth, className }) => {
    return(
        <BrowserRouter>
             <CustomButton 
                text={text}
                handleOnClick={handleOnClick}
                link={link}
                disabled={disabled}
                fullWidth={fullWidth}
                className={className}
            />
        </BrowserRouter>
    )
}

describe("Button", () => {

    it("should contain the correct text", () => {
        render(
            <MockCustomButton 
                 text="Upload"
                 handleOnClick={mockHandleOnClick}
                 disabled={false}
             />
        )

        const buttonElement = screen.queryByRole("button", { name: "Upload"});
        expect(buttonElement).toBeInTheDocument();
    })

    test("button disabled", () => {
        render(
            <MockCustomButton 
                 text="Upload"
                 handleOnClick={mockHandleOnClick}
                 disabled={true}
             />
        )

        const buttonElement = screen.queryByRole("button", { name: "Upload"});
        expect(buttonElement).toBeDisabled();
    })

})   

