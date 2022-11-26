import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from '@mui/material'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { db } from '../firebase'

export const ModalApuesta = ({ open, match, modalApuesta, other, setOther }) => {
    const { user } = useAuth()
    const [apuesta, setApuesta] = useState({
        idMatch: match.id,
        winner: null,
        home_goals: null,
        away_goals: null,
        name: user.email
    })


    const {addApuesta} = useStore()

    const hadleChange = (e) => {
        const { value, name } = e.target
        if (!/^\d+$/.test(value)) {
            e.target.value = null
        } else {
            setApuesta({
                ...apuesta,
                [name]: value
            })
            e.target.form[2].focus()
        }
    }

    const handleApostar = async (e) => {
        e.preventDefault()
        try {
            if(apuesta.home_goals > apuesta.away_goals) apuesta.winner = match.home_team_country
            if(apuesta.home_goals < apuesta.away_goals) apuesta.winner = match.away_team_country
            if(apuesta.home_goals == apuesta.away_goals) apuesta.winner = "Draw"

            const collApuesta = collection(db, "apuestas")
            const docRef = doc(collApuesta)
            const newApuesta = await setDoc(docRef, apuesta)
            addApuesta(apuesta)
            e.target.reset()
            modalApuesta()
            setOther(!other)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Dialog
            open={open}
            onClose={modalApuesta}>
            <DialogTitle sx={{ textAlign: 'center' }}>
                {match.home_team.name} vs {match.away_team.name}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box sx={{ flexGrow: 10 }} component='form' onSubmit={handleApostar} autoComplete='off' onChange={hadleChange}>

                    <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                            {match.home_team.name}
                        </Typography>
                        <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="home_goals" inputProps={{ maxLength: 1 }} autoFocus required />
                            vs
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="away_goals" inputProps={{ maxLength: 1 }} required />
                        </Box>
                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                            {match.away_team.name}
                        </Typography>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                    </Box>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button variant="contained" color="success" type='submit'>Apostar</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
