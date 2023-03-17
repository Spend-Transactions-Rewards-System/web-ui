import { cleanup, render } from '@testing-library/react';

import LoadingAnimation from '../LoadingAnimation';

afterEach(cleanup)

describe("Loading Animation", () => {
    
    test("renders successfully", () => {
        render(
           <LoadingAnimation />
        )
    })

})   

