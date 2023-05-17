import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors'
import { Box } from '@mui/material'

const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...amber,
        ...(mode === 'light' 
        ? {
            main: amber[300],
        }
        : {
            main: amber[900],
        }),
      },
        ...(mode === 'light'
        ? {
            background: {
                default: grey[400],
                paper: amber[400],
            },
        }
        : {
            background: {
                default: grey[900],
                paper: amber[900],
            },
        }),
      text: {
        ...(mode === 'light'
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: '#fff',
              secondary: grey[500],
            }),
      },
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    ...(mode === 'light'
                    ? {
                    color: amber[300],
                    backgroundColor: grey[900],
                    }
                    : {
                    color: deepOrange[500],
                    backgroundColor: '#fff',
                    }),
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        ...(mode === 'light'
                        ? {
                            color: grey[900] ,
                            backgroundColor:amber[700] ,
                        }
                        : {
                            color: '#fff',
                            backgroundColor: deepOrange[700] ,
                        }),
                    },   
                },
            },
        },
    },
  })

const darkModeTheme = createTheme(getDesignTokens('dark'))
const lightModeTheme = createTheme(getDesignTokens('light'))

const DarkMode = ({children, mode}) => {
    const [modeTheme, setModeTheme] = React.useState(lightModeTheme)

    useEffect(() => {
        if(mode === 'dark') {
            setModeTheme(darkModeTheme)
            // localStorage.setItem('mode', 'dark')
        } else {
            setModeTheme(lightModeTheme)
            // localStorage.setItem('mode', 'light') 
        }

    }, [mode])

    return (
        <>
            <ThemeProvider theme={modeTheme}>
                <Box sx={{ 
                    bgcolor: 'background.default', 
                    color: 'text.primary' }}>
                {children}
                </Box>
            </ThemeProvider>
        </>
    )
}

export default DarkMode