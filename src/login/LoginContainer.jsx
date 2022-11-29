import { Button } from '@mui/material'
import React, { useState } from 'react'
import { ModalLogin } from './ModalLogin'
import { ModalRegister } from './ModalRegister'

export const LoginContainer = () => {
    const [login, setLogin] = useState(true)
    const [open, setOpen] = useState(false)
    const handleModal = () => {
        setOpen(!open)
        setLogin(true)
    }
    return (
        <>
            <Button color="inherit" onClick={() => handleModal()} sx={{ flexGrow: 1 }}>Login</Button>

            {
                login ?
                    <ModalLogin open={open} handleModal={handleModal} setLogin={setLogin} />
                    :
                    <ModalRegister open={open} handleModal={handleModal} setLogin={setLogin} />
            }

        </>
    )
}
