import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TenantLayout from '../TenantLayout';

afterEach(cleanup)

const MockTenantLayout = () => {
    return(
        <MemoryRouter initialEntries={[{ pathname: '/campaigns',}]}>
            <TenantLayout />
        </MemoryRouter>
    )
} 

describe("Tenant Layout", () => {

    test("breadcrumbs render based on selected tab", () => {
        const { container } = render(
            <MockTenantLayout />
        )
        const breadCrumbElement = container.querySelector(".MuiBreadcrumbs-li");
        expect(breadCrumbElement).toHaveTextContent(/campaigns/i);

    })  
})
