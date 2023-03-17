import { cleanup, render, screen } from '@testing-library/react';

import CustomBreadcrumbs from '../CustomBreadcrumbs';

afterEach(cleanup)

describe("Custom Breadcrumbs", () => {
    
    it("should return a clickable link and a text ", () => {
        render(
           <CustomBreadcrumbs 
                currPage={{ name: 'Upload Data', prevLink: '/datafiles'}}
            />
        )
        
        const textElement = screen.queryByRole("link", { name: "Upload Data"});
        const linkElement = screen.queryByRole("link", { name: "Data Files"});

        expect(textElement).toBe(null);
        expect(linkElement).toBeInTheDocument();
    })

    it("should return a text only", () => {
        render(
            <CustomBreadcrumbs 
                 currPage={{ name: 'Data Files', prevLink: ''}}
             />
         )
        
        const textElement = screen.queryByRole("link", { name: "Data Files"});

        expect(textElement).toBe(null);
    })

})   

