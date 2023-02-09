import { Box, CircularProgress } from "@mui/material";

const LoadingAnimation = () => {
    return(
        <Box className="format-center">
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