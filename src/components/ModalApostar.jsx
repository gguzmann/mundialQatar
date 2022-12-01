import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { newApuesta } from '../helpers/getData'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

export const ModalApostar = ({ open, modalApuesta, match, apuesta, setApuesta, error, setError }) => {

    const { addApuesta } = useStore()



    const handleWinner = (team) => {
        setApuesta({ ...apuesta, winner: team })
    }

    const hadleChange = (e) => {
        console.log('change')
        const { value, name } = e.target
        if (!/^\d+$/.test(value)) {
            e.target.value = null
            setApuesta({
                ...apuesta,
                [name]: null
            })
        } else {
            setApuesta({
                ...apuesta,
                [name]: value
            })
            if(e.target.form[2].value != '') {
                
                e.target.form[4].focus()
            }else{
                
                console.log(e.target.form[2].value)
            }
            
        }
    }

    const handleApostar = async (e) => {
        e.preventDefault()
        setApuesta({ ...apuesta, id: match.id })
        if (apuesta.winner == match.home_team.name && apuesta.home_goals < apuesta.away_goals) { setError('Resultado Imposible'); return false }
        if (apuesta.winner == match.away_team.name && apuesta.away_goals < apuesta.home_goals) { setError('Resultado Imposible'); return false }
        console.log('apuesta:', apuesta.winner, 'resultado:', apuesta.home_goals, apuesta.away_goals)
        try {
            newApuesta(apuesta, match.home_team_country + '_' + match.away_team_country + '_' + apuesta.name.split('@')[0])

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
            <Box sx={{ p: 3 }} component="form" onSubmit={handleApostar} autoComplete='off' onChange={hadleChange}>

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
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="home_goals" inputProps={{ maxLength: 1 }} autoFocus required  />
                            vs
                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="away_goals" inputProps={{ maxLength: 1 }} required  />
                        </Box>

                        {/* <Typography sx={{ textAlign: 'center', m: 1 }}>Cantidad de goles:</Typography>
                        <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center' }}>

                            <IconButton>
                                <SportsSoccerIcon />
                            </IconButton>
                            {Number(apuesta.home_goals) + Number(apuesta.away_goals)}
                        </Box> */}
                    </>
                }
                {
                    error &&
                    <Alert color="error" sx={{ m: 2 }}>{error}</Alert>
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