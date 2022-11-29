import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { db } from '../firebase'
import { newApuesta } from '../helpers/getData'

export const ModalApostar = ({ open, modalApuesta, match }) => {

    const { user } = useAuth()
    const { addApuesta } = useStore()

    const [error, setError] = useState(null)
    const [apuesta, setApuesta] = useState({
        id: match.id,
        winner: null,
        home_goals: null,
        away_goals: null,
        name: user.email
    })

    const handleWinner = (team) => {
        setApuesta({ ...apuesta, winner: team })
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
        setApuesta({ ...apuesta, id: match.id })
        if(apuesta.winner == match.home_team.name && apuesta.home_goals < apuesta.away_goals) {setError('Resultado Imposible'); return false}
        if(apuesta.winner == match.away_team.name && apuesta.away_goals < apuesta.home_goals) {setError('Resultado Imposible'); return false}
        try {
            newApuesta(apuesta, match.home_team_country + '_' + match.away_team_country + '_' + apuesta.name.split('@')[0] )

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
            <Box sx={{ p: 3 }} component="form" onSubmit={handleApostar} autoComplete='off'>

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
                    error &&
                    <Alert color="error" sx={{m:2}}>{error}</Alert>
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