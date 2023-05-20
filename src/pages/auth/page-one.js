import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { getCurrentUser } from '../../helpers/UserPool'
import { UploadFile } from '@mui/icons-material'
import AWS from 'aws-sdk'

const PageOne = (props) => {
    const cognitoUser = getCurrentUser()
    console.log(cognitoUser)
    cognitoUser.getSession((err, session) => {
        if(err) {
            console.log(err)
            return
        }
        console.log(session)
    })
    // get IdentityPoolId from Congito User Pool
    // get UserPoolId from Cognito User Pool

    console.log("jwt", cognitoUser.signInUserSession.idToken.jwtToken)
    AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
            Logins: {
                [`cognito-idp.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${process.env.REACT_APP_USER_POOL_ID}`]: cognitoUser.signInUserSession.idToken.jwtToken
            }
        })
    })


    const handleFileUpload = (event) => {
        // console.log(event.target.files[0])
        // console.log(cognitoUser)
        
        const file = event.target.files[0]
        const fileName = file.name
        AWS.config.update({
            region: process.env.REACT_APP_AWS_REGION,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
                Logins: {
                    [`cognito-idp.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${process.env.REACT_APP_USER_POOL_ID}`]: cognitoUser.signInUserSession.idToken.jwtToken
                }
            })
        })

        AWS.config.credentials.get(function(err) {
            if(err) {
                console.log(err)
                return
            }
            console.log("AWS Credentials", AWS.config.credentials)
        })

        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: process.env.REACT_APP_S3_BUCKET_NAME}
        })
        s3.upload({
            Key: `in/${fileName}`,
            Body: file,
            ContentType: file.type,
            // ACL: 'public-read'
        }, (err, data) => {
            if(err) {
                console.error(err)
                return
            }
            console.log(data)
        }
        )
        
    }
    return (
        <>
           
            <Typography variant="h1">Upload a File to S3</Typography>
            <Typography variant="p1">
                Click the button, select a file, and upload it to S3.
            </Typography>
            <Box sx={{mt:3}}>
                <Button component="label" variant="outlined" startIcon={<UploadFile/>}>
                    Upload File
                    <input type="file" hidden onChange={handleFileUpload}/>
                </Button>

            </Box>
            
        </>
    )
}

export default PageOne