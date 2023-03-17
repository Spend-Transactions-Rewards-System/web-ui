import { Box, CircularProgress } from "@mui/material";

const LoadingAnimation = () => {
    return(
        <Box className="flexbox-center">
            <CircularProgress
                sx={{
                    color: "#2B3674",
                    mx: "3rem auto",
                }}
            />
        </Box>
    )
}

export default LoadingAnimation;