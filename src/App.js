import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import Temp from "./Pages/Temp/Temp";
import PointsActivity from "./Pages/PointsActivity/PointsActivity";
import CustomerLayout from "./Layout/CustomerLayout";

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Temp />}/>
            <Route element={<CustomerLayout />}>
              <Route path="/points-activity" element={<PointsActivity />} />
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
