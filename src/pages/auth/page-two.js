import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { getCurrentUser } from '../../helpers/UserPool'

// This page will have a form to publish an episode
// It will have a text field for the series name
// It will have a text field for the episode name
// It will have a button with the text "Publish Episode"
// use MUI components for the form
// when the user types in the series name, save it to state
// when the user types in the episode name, save it to state
// when the user clicks the button, console.log the series name and episode name



const PageTwo = (props) => {
    const [seriesName, setSeriesName] = React.useState("")
    const [episodeName, setEpisodeName] = React.useState("")

    const handlePublishEpisode = () => {
        console.log("Publish Episode")
        console.log("Series Name", seriesName)
        console.log("Episode Name", episodeName)
        // we will need to make an API call to publish the episode
        // we will be logged in using Cognito
        // we will need to pass the JWT token to the API
        // we will need to pass the series name and episode name to the API

        const body = {
            series: seriesName,
            episode: episodeName   
        }
        const cognitoUser = getCurrentUser()
        cognitoUser.getSession((err, session) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(session)
        })
    
        console.log("jwt", cognitoUser.signInUserSession.idToken.jwtToken)
        const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken
        const apiURL = process.env.REACT_APP_API_ENDPOINT

        const apiEndpoint = `${apiURL}/publish-scenes`
        const apiOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": jwtToken
            },
            body: JSON.stringify(body)
        }
        fetch(apiEndpoint, apiOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }
        )   

        

    }

    return (
        <>
            <Box sx={{ mb: 2}}>
                <Typography variant="h1">Publish Episode</Typography>
                <Typography variant="p1">
                    Give it the series and Episode
                </Typography>
                
            </Box>

            
            <Box sx={{ mb: 2}}>
                <TextField
                    
                    label="Series Name"
                    variant="outlined"
                    value={seriesName}
                    onChange={(event) => setSeriesName(event.target.value)}
                />
            </Box>
            <Box sx={{ mb: 2}}>
                <TextField
                 
                    label="Episode Name"
                    variant="outlined"
                    value={episodeName}
                    onChange={(event) => setEpisodeName(event.target.value)}
                />
            </Box>
            <Box sx={{ mb: 2}}>
                <Button
                    variant="contained"
                    onClick={handlePublishEpisode}
                >
                    Publish Episode
                </Button>
            </Box>


            
        </>
    )
}

export default PageTwo