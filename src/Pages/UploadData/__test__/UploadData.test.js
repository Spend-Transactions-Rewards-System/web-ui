import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import UploadData from '../UploadData';

afterEach(cleanup)

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

const MockUploadData = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <UploadData />
      </QueryClientProvider>
    )
}

describe("Upload Data Page", () => {
    
    test("choose file button should be disabled", () => {
        render(<MockUploadData />)

        const buttonElement = screen.getByRole("button", { name: /choose file to upload/i});
        expect(buttonElement).toHaveAttribute('aria-disabled', "true");
    })  

    test("choose file button should be not disabled if file type is selected", () => {
        const { container } = render(<MockUploadData />)

        const radioElement = container.querySelector("input[value='spend']");
        fireEvent.click(radioElement);

        const buttonElement = screen.getByRole("button", { name: /Choose file to upload/i});
        expect(buttonElement).not.toHaveAttribute('aria-disabled', "true");
    })  
})