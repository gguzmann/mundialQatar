import { Box, Dialog, Button, DialogActions, DialogContent, DialogTitle, Divider, TextField, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'

const defaultValues = {
  email: '',
  password: ''
}

export const ModalRegister = ({ handleModal, open, setLogin }) => {
  const [usuario, setUsuario] = useState(defaultValues)
  const [error, setError] = useState('')

  const {signup} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(usuario.email, usuario.password)
      console.log('register', usuario)
      setLogin(true)
      setUsuario(defaultValues)
    } catch (err) {
      setError(err.code)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario({
      ...usuario,
      [name]: value
    })
  }


  return (
    <Dialog open={open}
      onClose={handleModal}
    >
      <DialogTitle id="alert-dialog-title">
        Register
      </DialogTitle>
      <Divider />
      <DialogContent >

        <Box
          component="form"
          noValidate
          autoComplete='off'
          sx={{}}
          onSubmit={handleSubmit}
        >
          <Box sx={{ mb: 2 }}>
            <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={usuario.email} onChange={handleChange} />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name="password" value={usuario.password} onChange={handleChange} />
          </Box>
          {
            error.length > 0 &&
            <Alert severity="error">{error}</Alert>
          }
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>

            <Button variant="contained" size="large" type='submit'>Acceder</Button>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={() => {setLogin(true)}}>Login</Button>
        </DialogActions> 
      </Dialog>
  )
}
 