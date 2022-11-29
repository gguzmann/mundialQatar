import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, Input, List, ListItem, Modal, Paper, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { LoginContainer } from '../login/LoginContainer'
import MenuIcon from '@mui/icons-material/Menu';

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { user, logout } = useAuth()

  const theme = useTheme()

  const handleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    logout()
  }
  return (
    <>
      <AppBar position='static'>
        <Paper elevation={24}>

          <Toolbar>
            <img src="https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18" width={isMobile ? '80' : '50'} height={isMobile ? '80' : '50'} alt="qatar2022" sx={{p: 1}}/>
            <Typography variant='h6' component='div' sx={{ flexGrow: 10, m: 2 }}>Qatar 2022</Typography>
            {
              !isMobile ?
                <>
                  <Button color="inherit" onClick={() => navigate('/')} sx={{ flexGrow: 1 }}>Home</Button>
                  <Button color="inherit" onClick={() => navigate('/partidos')} sx={{ flexGrow: 1 }}>Partidos</Button>
                  <Button color="inherit" onClick={() => navigate('/equipos')} sx={{ flexGrow: 1 }}>Grupos</Button>
                  {
                    user ?

                      <>
                        <Button color="inherit" onClick={() => navigate('/apostar')} sx={{ flexGrow: 1 }}>Apostar</Button>
                        <Button color="inherit" onClick={() => navigate('/ranking')} sx={{ flexGrow: 1 }}>Ranking</Button>
                        <Button color="inherit" onClick={handleLogout} sx={{ flexGrow: 1 }}>Cerrar Sesion</Button>
                      </>

                      :
                      <>
                        <LoginContainer />
                      </>
                  }
                </>

                :
                <>
                  <IconButton color="inherit" onClick={handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  {
                    !user &&
                    <LoginContainer />
                  }
                </>
            }

          </Toolbar>
        </Paper>
        <Drawer
          anchor='left'
          open={openMenu}
          onClose={handleMenu}

        >
          <List sx={{ width: 300 }} onClick={handleMenu}>
            <ListItem><Button color="inherit" onClick={() => navigate('/')} sx={{ flexGrow: 1 }}>Home</Button></ListItem>
            <ListItem><Button color="inherit" onClick={() => navigate('/partidos')} sx={{ flexGrow: 1 }}>Partidos</Button></ListItem>
            <ListItem><Button color="inherit" onClick={() => navigate('/equipos')} sx={{ flexGrow: 1 }}>Grupos</Button></ListItem>
            {
              user ?
                (
                  <>
                    <ListItem><Button color="inherit" onClick={() => navigate('/apostar')} sx={{ flexGrow: 1 }}>Apostar</Button></ListItem>
                    <ListItem><Button color="inherit" onClick={() => navigate('/ranking')} sx={{ flexGrow: 1 }}>Ranking</Button></ListItem>
                    <ListItem><Button color="inherit" onClick={handleLogout} sx={{ flexGrow: 1 }}>Cerrar Sesion</Button></ListItem>
                  </>
                )
                :
                <></>
              // <ListItem><LoginContainer /></ListItem>
            }
          </List>

        </Drawer>
      </AppBar>
      <Outlet />

    </>
  )
}
