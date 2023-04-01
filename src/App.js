import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

import Rewards from "./Pages/Rewards/Rewards";
import CustomerLayout from "./Layout/CustomerLayout";
import TenantLayout from "./Layout/TenantLayout";
import DataFiles from "./Pages/DataFiles/DataFiles";
import Campaigns from "./Pages/Campaigns/Campaigns";
import Error404 from "./Pages/ErrorPage/Error404";
import UploadData from "./Pages/UploadData/UploadData";
import Login from "./Pages/Login/Login";
import AddCampaigns from "./Pages/AddCampaign/AddCampaigns";
import Unauthorised from "./Pages/ErrorPage/Unauthorised";
import ProtectedRoute from "./Layout/ProtectedRoute/ProtectedRoute";
import CustomMeta from "./Components/CustomMeta/CustomMeta";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <CssBaseline>
        <CustomMeta />
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="*" element={<Error404 />} />
            <Route path="/401" element={<Unauthorised />} />
                        
            <Route element={
              <ProtectedRoute>
                <CustomerLayout />
              </ProtectedRoute>
            }>
              <Route path="/rewards" element={<Rewards />} />
            </Route>
            
            <Route element={
              <ProtectedRoute>
                <TenantLayout />
              </ProtectedRoute>
            }>
              <Route path="/datafiles" element={<DataFiles />} />
              <Route path="/datafiles/upload" element={<UploadData />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/addcampaigns" element={<AddCampaigns />} />
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </HelmetProvider>
    </QueryClientProvider>
    </div>
  );
}

export default App;
