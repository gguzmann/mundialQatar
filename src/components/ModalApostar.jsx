import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { db } from '../firebase'

export const ModalApostar = ({ open, modalApuesta, match }) => {

    const { user } = useAuth()
    const { addApuesta } = useStore()

    const defaultStateApuesta = {
        idMatch: match.id,
        winner: null,
        home_goals: null,
        away_goals: null,
        name: user.email
    }
    const [apuesta, setApuesta] = useState(defaultStateApuesta)

    const handleWinner = (team) => {
        setApuesta({ ...apuesta, winner: team })
        console.log(apuesta)
    }

    const hadleChange = (e) => {
        const { value, name } = e.target
        if (!/^\d+$/.test(value)) {
            e.target.value = null
        } else {
            setApuesta({
                ...apuesta,
                [name]: value
            })
            // e.target.form[2].focus()
        }
    }

    const handleApostar = async (e) => {
        e.preventDefault()
        try {

            const collApuesta = collection(db, "apuestas")
            const docRef = doc(collApuesta)
            const newApuesta = await setDoc(docRef, apuesta)
            addApuesta(apuesta)
            e.target.reset()
            modalApuesta()
            // setOther(!other)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={modalApuesta}
        >
            <Box sx={{ p: 3 }} component="form" onSubmit={handleApostar}>

                <DialogTitle sx={{ textAlign: 'center' }}>
                    {match.home_team.name} vs {match.away_team.name}
                </DialogTitle>
                <Divider />
                <Typography sx={{ textAlign: 'center', m: 1 }}>Elige al ganador:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', m: 1 }}>
                    <Button variant={apuesta.winner == match.home_team.name ? 'contained' : 'outlined'} sx={{ p: 2 }} color='success' onClick={() => handleWinner(match.home_team.name)}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="30" height='25' />
                    </Button>

                    <Button variant={apuesta.winner == match.away_team.name ? 'contained' : 'outlined'} sx={{ p: 2 }} color='success' onClick={() => handleWinner(match.away_team.name)}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="30" height='25' />
                    </Button>
                </Box>
                {
                    apuesta.winner &&
                    <>
                        <Typography sx={{ textAlign: 'center', m: 1 }}>Elige el resultado:</Typography>

                        <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="home_goals" inputProps={{ maxLength: 1 }} autoFocus required onChange={hadleChange} />
                            vs
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="away_goals" inputProps={{ maxLength: 1 }} required onChange={hadleChange} />
                        </Box>
                    </>
                }
                {
                    apuesta.home_goals && apuesta.away_goals && apuesta.home_goals != '' && apuesta.away_goals != '' &&
                    <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="success" type='submit'>Apostar</Button>
                    </DialogActions>
                }
            </Box>
        </Dialog>
    )
}