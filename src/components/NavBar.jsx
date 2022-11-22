import { AppBar, Button, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const navigation = useNavigate()
  return (
    <>
    <AppBar position='static'>
      <Paper elevation={24}>

      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 10 }}>Copa Mundial Qatar 2022</Typography>
        <Button color="inherit" onClick={() => navigation('/home')} sx={{ flexGrow: 1 }}>Home</Button>
        <Button color="inherit" onClick={() => navigation('/partidos')} sx={{ flexGrow: 1 }}>Partidos</Button>
        <Button color="inherit" onClick={() => navigation('/equipos')} sx={{ flexGrow: 1 }}>Equipos</Button>
        {/* <Button color="inherit" onClick={() => navigation('/test')} sx={{ flexGrow: 1 }}>Login</Button> */}
      </Toolbar>
      </Paper>
    </AppBar>
    <Outlet/>
    </>
  )
}
