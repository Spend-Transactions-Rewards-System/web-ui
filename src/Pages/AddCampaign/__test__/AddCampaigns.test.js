import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import AddCampaigns from '../AddCampaigns';

afterEach(cleanup)

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

const MockAddCampaigns = () => {
    return(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AddCampaigns />
        </BrowserRouter>
      </QueryClientProvider>
    )
} 

describe("Add Campaign Page", () => {
    
    it("submit button should be disabled if form not filled", () => {
        render(<MockAddCampaigns />)
        const buttonElement = screen.getByRole("button", { name: /add campaign/i});
        expect(buttonElement).toBeDisabled();
    })  
})
