import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Input, Modal, Paper, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { LoginContainer } from '../login/LoginContainer'

export const NavBar = () => {
  const { user, logout } = useAuth()
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
            <Typography variant='h6' component='div' sx={{ flexGrow: 10 }}>Copa Mundial Qatar 2022</Typography>
            <Button color="inherit" onClick={() => navigate('/')} sx={{ flexGrow: 1 }}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/partidos')} sx={{ flexGrow: 1 }}>Resultados</Button>
            <Button color="inherit" onClick={() => navigate('/equipos')} sx={{ flexGrow: 1 }}>Fase inicial</Button>
            {
              user ?
                (
                  <>
                  <Button color="inherit" onClick={() => navigate('/apostar')} sx={{ flexGrow: 1 }}>Apostar</Button>
                  <Button color="inherit" onClick={() => navigate('/ranking')} sx={{ flexGrow: 1 }}>Ranking</Button>
                  <Button color="inherit" onClick={handleLogout} sx={{ flexGrow: 1 }}>{user.email}</Button>
                  </>
                )
                :
                <LoginContainer />
            }
          </Toolbar>
        </Paper>
      </AppBar>
      <Outlet />

    </>
  )
}
