import { Box, Grid } from '@mui/material'
import React from 'react'
import LoginForm from './auth/login-form'
import MarketingPanel from './marketing/marketing-panel'


const LayoutPublic = ({user, setUser}) => {

    // use the Grid system in MUI to create a layout for the public pages
    // it will be similar to https://login.salesforce.com/ 
    // the page will be split in half, with the left side being a login form
    // the right side will be a marketing page
    // the login form will be a component that can be used on any page
    // the marketing page will be a component that can be used on any page
    // the right side will not be visible on mobile devices. only the login form will be visible on mobile devices.

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}  >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <LoginForm user={user} setUser={setUser}/>
                </Box>
            </Grid>
            <Grid item xs={0} sm={6} sx={{ display: { sm: 'block', xs: 'none' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <MarketingPanel/>   
                </Box>
            </Grid>
        </Grid>
            
        </>
    )
}

export default LayoutPublic
