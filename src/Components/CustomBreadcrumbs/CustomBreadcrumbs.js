import { Breadcrumbs, Link, Typography } from "@mui/material";

import { linkMap } from "../../Utils/LinkMap";

const CustomBreadcrumbs = ({ currPage }) => {

    return(
        <Breadcrumbs>
            { currPage["prevLink"] &&
                <Link 
                    underline="hover" 
                    href={currPage["prevLink"]}
                    color="#707EAE"
                    sx={{fontSize: "14px"}}
                >
                    {linkMap[currPage["prevLink"].substring(1)]["name"]}
                </Link>
            } 
            <Typography
                sx={{
                    color: "#707EAE", 
                    fontSize: "14px"
                }}
            >
                {currPage["name"]}
            </Typography>
        </Breadcrumbs>
    )
}

export default CustomBreadcrumbs;