import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const defaultValues = {
  email: '',
  password: ''
}

export const ModalLogin = ({ handleModal, open, setLogin }) => {

  const [usuario, setUsuario] = useState(defaultValues)
  const [error, setError] = useState('')
  const { signin, loginGoogle } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await signin(usuario.email, usuario.password)
      setUsuario(defaultValues)
      handleModal()
      navigate('/')
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
  
  const handleGoogle = async () => {
    try {
      await loginGoogle()
      navigate('/')
    } catch (error) {
      
    }
  }

  return (
    <Dialog open={open}
      onClose={handleModal}
    >
      <DialogTitle id="alert-dialog-title">
        Login
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="error" size="large" onClick={handleGoogle} >Google</Button>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={() => { setLogin(false) }}>Registrarse</Button>
      </DialogActions>
    </Dialog>

  )
}
