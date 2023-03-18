import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CollapsibleTable from '../CollapsibleTable';
import { mockTableData } from './mockData';

afterEach(cleanup)

const mockSetFilter = jest.fn();

const MockCollapsibleTable = ({ columnNames, mainData, details, filter, setFilter, type }) => {
    return(
        <BrowserRouter>
            <CollapsibleTable 
                columnNames={mockTableData["columnNames"]}
                mainData={mockTableData["mainData"]}
                details={mockTableData["details"]}
                filter={mockTableData["filter"]}
                setFilter={mockSetFilter}
                type="rewards"
            />
        </BrowserRouter>
    )
}

describe("Collapsible Table", () => {
    
    test("table renders successfully", () => {
        render(
            <MockCollapsibleTable 
                columnNames={mockTableData["columnNames"]}
                mainData={mockTableData["mainData"]}
                details={mockTableData["details"]}
                filter={mockTableData["filter"]}
                setFilter={mockSetFilter}
                type="rewards"
            />
        )
    })
})   

