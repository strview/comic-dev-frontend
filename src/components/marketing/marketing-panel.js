import { Box, Container, Typography } from "@mui/material"
import React from "react"
// import MarketingImage from './STRViewMarketingImage.png'
//I want to set the STRViewMarketingImage.png in the public folder as the background image for the marketing panel
//Q: how do I do that?
//A: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
//Q: how to make an image fit the container?
//A: https://stackoverflow.com/questions/43817118/how-to-make-an-image-fit-the-container

const backUrl = process.env.PUBLIC_URL + '/STRViewMarketingImage.png'
const MarketingPanel = (props) => {
    return (
        <>
        <Container component="main">
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '100%',
                backgroundImage : `url(${backUrl})`
                }} >
                <Typography component="h1" variant="h5">
                    STRView
                </Typography>
            </Box>
        </Container>
            
        </>
    )
}

export default MarketingPanel