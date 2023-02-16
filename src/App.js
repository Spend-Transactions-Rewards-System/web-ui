import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import Rewards from "./Pages/Rewards/Rewards";
import CustomerLayout from "./Layout/CustomerLayout";
import TenantLayout from "./Layout/TenantLayout";
import DataFiles from "./Pages/DataFiles/DataFiles";
import Campaigns from "./Pages/Campaigns/Campaigns";
import Error404 from "./Pages/Error404/Error404";
import UploadData from "./Pages/UploadData/UploadData";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="*" element={<Error404 />} />

            <Route element={<CustomerLayout />}>
              <Route path="/rewards" element={<Rewards />} />
            </Route>
            
            <Route element={<TenantLayout />}>
              <Route path="/datafiles" element={<DataFiles />} />
              <Route path="/datafiles/upload" element={<UploadData />} />
              <Route path="/campaigns" element={<Campaigns />} />
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
