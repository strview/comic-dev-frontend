import React from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
//import UserPool from '../../helpers/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
//import UserPool from '../../helpers/UserPool'
import getUserPool from '../../helpers/UserPool'


const LoginForm = ({user, setUser}) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        // const poolData = {
        //   UserPoolId: "us-east-1_cDKzDttnN",
        //   ClientId: "34u1vp1i2ovedjetg0133elivg"
        // }
        // const UserPool = new CognitoUserPool(poolData)
        const UserPool = getUserPool()
        const cognitoUser = new CognitoUser({
          Username: data.get("email"),
          Pool: UserPool,
        })
        const authDetails = new AuthenticationDetails({
          Username: data.get("email"),
          Password: data.get("password"),
        })
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (data) => {
            console.log("onSuccess:", data)
            const tempUser = {
              username: data.idToken.payload["cognito:username"],
              email: data.idToken.payload.email,
              role : data.idToken.payload["custom:role"],
              groups : data.idToken.payload["cognito:groups"],
              test : "test",
              loggedIn : true
            } 
            setUser(tempUser)
            localStorage.setItem('user', JSON.stringify(tempUser))
          },
          onFailure: (err) => {
            console.error("onFailure:", err)
          },
          newPasswordRequired: (data) => {
            console.log("newPasswordRequired:", data)
            cognitoUser.completeNewPasswordChallenge("NewPassword1", {})
          },
        })

      }
    
      return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{  
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )
}

export default LoginForm