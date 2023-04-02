import { Helmet } from "react-helmet-async";

const CustomMeta = () => {
    return(
        <Helmet>
            <meta 
                http-equiv="Content-Security-Policy" 
                content={`default-src 'self'; 
                    connect-src 'self' ${process.env.REACT_APP_API_DOMAIN} ${process.env.REACT_APP_COGNITO_DOMAIN}; 
                    script-src 'self' 'unsafe-inline'; 
                    style-src 'self' 'unsafe-inline'; 
                    object-src 'none'; 
                    img-src 'self' data:;`}
            /> 
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        </Helmet>
    )
}

export default CustomMeta;