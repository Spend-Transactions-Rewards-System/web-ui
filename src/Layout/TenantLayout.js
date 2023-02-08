import { Outlet, useLocation } from "react-router";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

import NavBar from "../Components/NavBar/NavBar";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs/CustomBreadcrumbs";
import { linkMap } from "../Utils/LinkMap";
import AccountMenu from "../Components/AccountMenu/AccountMenu";

const TenantLayout = () => {

    const location = useLocation();
    const currPath = location.pathname.split("/").slice(-1)[0];
    const currPage = linkMap[currPath];

    return(
        <Box
            sx={{
                backgroundColor: "#E0E5F2",
                p: "16px 32px 40px 32px",
                minHeight: "100vh",
            }}
        >
            <NavBar />
            <Box sx={{ml: "200px"}} >   
                <Box 
                    className="format-spaceBetween"
                    sx={{mb: "24px"}}
                >
                    <Box>
                        <CustomBreadcrumbs currPage={currPage} />
                        <Typography className="pageHeader-tenant" >
                            {currPage["name"]}
                        </Typography>
                    </Box>
                    <AccountMenu />
                </Box>
                <Outlet />
            </Box>
        </Box>
    )
}

export default TenantLayout;