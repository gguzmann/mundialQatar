import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { ModalApostar } from './ModalApostar'
import { ModalApuesta } from './ModalApuesta'

export const MatchApuesta = ({ match, apuestas, other, setOther }) => {
    const [open, setOpen] = useState(false)
    const [apuesta, setApuesta] = useState(null)
    const modalApuesta = () => {
        setOpen(!open)
    }
    let test = ''
    let colorGoals = ''
    useEffect(() => {
        setApuesta(apuestas)
    }, [apuestas])

    if (apuesta) {
        if (new Date(match.datetime) < new Date()) {

            test = apuesta.winner == match.winner_code ? 'rgba(0,255,0,.1)' : 'rgba(255,0,0,.1)'
            colorGoals = apuesta.home_goals == match.home_team.goals ? 'success' : 'error'
        }
    }
    return (
        <>
            <Paper sx={{ backgroundColor: test }}>

                <Box>
                    {/* <Box>
                        Winner: {match.winner}
                    </Box> */}
                    <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>

                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                        {
                            apuesta ?
                                <>
                                    <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                        {match.home_team.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                        <Button variant='outlined' color={colorGoals != '' ? colorGoals : 'primary'} sx={{ p: 1, fontSize: 20 }}>{apuesta.home_goals}</Button>
                                        vs
                                        <Button variant='outlined' color={colorGoals != '' ? colorGoals : 'primary'} sx={{ p: 1, fontSize: 20 }}>{apuesta.away_goals}</Button>
                                    </Box>
                                    <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                        {match.away_team.name}
                                    </Typography>
                                </>
                                :
                                new Date(match.datetime) > new Date() ?
                                    <>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.home_team.name}
                                        </Typography>
                                        <Button onClick={modalApuesta} variant="contained" color="success">Apostar</Button>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.away_team.name}
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.home_team.name}
                                        </Typography>
                                        <Button variant="outlined" color="error">Finalizado</Button>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.away_team.name}
                                        </Typography>
                                    </>
                        }
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                    </Box>
                </Box>

            </Paper>
            {/* <ModalApuesta open={open} modalApuesta={modalApuesta} match={match} setOther={setOther} other={other} /> */}
            <ModalApostar open={open} modalApuesta={modalApuesta} match={match} />
        </>
    )
}


export const ModalTest = ({ open, modalApuesta, match }) => {
    return (
        <Dialog
            open={open}
            onClose={modalApuesta}
        >
            <Box sx={{ p: 3 }}>

                <DialogTitle sx={{ textAlign: 'center' }}>
                    {match.home_team.name} vs {match.away_team.name}
                </DialogTitle>
                <Divider />
                <Typography sx={{ textAlign: 'center', m: 1 }}>Elige al ganador:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', m: 1 }}>
                    <Button variant='outlined' sx={{ p: 2 }} color='success'>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="30" height='25' />
                    </Button>
                    <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="home_goals" inputProps={{ maxLength: 1 }} autoFocus required />
                        vs
                        <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="away_goals" inputProps={{ maxLength: 1 }} required />
                    </Box>
                </Box>
                    <Button variant='outlined' sx={{ p: 2 }}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="30" height='25' />
                    </Button>
                </Box>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="success" type='submit' disabled>Apostar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}