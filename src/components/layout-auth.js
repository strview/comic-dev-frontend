import React, { useEffect, useState } from 'react'
import {AppBar as  MuiAppBar, Box, Toolbar, IconButton, Typography,  Menu, MenuItem, 
           Drawer, List, ListItem, ListItemButton, ListItemIcon, 
        ListItemText, CssBaseline, Divider, Avatar, Tooltip 
        } from '@mui/material'
import {Menu as MenuIcon, Brightness4, Brightness7, ChevronLeft as ChevronLeftIcon,
        ChevronRight as ChevronRightIcon, MoveToInbox as InboxIcon, Mail as MailIcon,
        PersonAdd, Settings, Logout 
        } from '@mui/icons-material'
import {
        BrowserRouter as Router,
        Routes,
        Route,
        Link
        } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles'

import getUserPool from '../helpers/UserPool'
import PageOne from '../pages/auth/page-one'
import PageTwo from '../pages/auth/page-two'


const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))



const LayoutAuth = ({mode, setMode, user, setUser}) => {
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const accountMenuOpen = Boolean(accountMenuAnchorEl)
  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchorEl(event.currentTarget)
  }
  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null)
  }

  const storeUserSetPreference = (pref) => {
    localStorage.setItem("mode", pref)
}

const getUserSetPreference = () => {
    return localStorage.getItem("mode")
}


const toggleMode = () => {
    // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    storeUserSetPreference(newMode)
}

useEffect(() => {
    const userPreference =  getUserSetPreference()
    // console.log(userPreference)
    if(userPreference) {
        setMode(userPreference)
    }
}, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    // if(mobileOpen) setMobileOpen(!mobileOpen)
    
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    getUserPool().getCurrentUser().signOut()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Persistent drawer
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
                onClick={handleAccountMenuClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={drawerOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={drawerOpen ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
        </Tooltip>
        <Menu
        anchorEl={accountMenuAnchorEl}
        id="account-menu"
        open={accountMenuOpen}
        onClose={handleAccountMenuClose}
        onClick={handleAccountMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAccountMenuClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAccountMenuClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>



          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        </Toolbar>
      </AppBar>

      <Router>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding >
              <ListItemButton component={Link} to="/pageone" selected={selectedIndex === 1}  onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={"Page One"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/pagetwo" selected={selectedIndex === 2}  onClick={(event) => handleListItemClick(event, 2)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Page Two"} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton selected={selectedIndex === 3}  onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"All Mail"} />
              </ListItemButton>
            </ListItem>
         
        </List>
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />

        <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/pageone" element={<PageOne />} />
            <Route path="/pagetwo" element={<PageTwo />} />
        </Routes>    
      </Main>
    </Router>
    </Box>
  )
}

export default LayoutAuth