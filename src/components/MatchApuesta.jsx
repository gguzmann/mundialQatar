import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { ModalApuesta } from './ModalApuesta'

export const MatchApuesta = ({ match, apuestas, other, setOther }) => {
    const [open, setOpen] = useState(false)
    const [apuesta, setApuesta] = useState(null)
    const modalApuesta = () => {
        setOpen(!open)
    }
    useEffect(() => {
        setApuesta(apuestas.find(x => x.idMatch == match.id))

    }, [match])

    return (
        <>
            <Paper>
                <Box sx={{ flexGrow: 10 }}>

                    {
                        <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                            <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                            {
                                apuesta ?
                                    <>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.home_team.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="home_goals" value={apuesta.home_goals} disabled />
                                            vs
                                            <TextField sx={{ width: 50 }} id="outlined-basic" variant="outlined" name="away_goals" value={apuesta.away_goals} disabled />
                                        </Box>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.away_team.name}
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.home_team.name}
                                        </Typography>
                                        <Button onClick={modalApuesta} variant="contained" color="success">Apostar</Button>
                                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                                            {match.away_team.name}
                                        </Typography>
                                    </>
                            }
                            <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                        </Box>
                    }
                </Box>
            </Paper>
            <ModalApuesta open={open} modalApuesta={modalApuesta} match={match} setOther={setOther} other={other} />
        </>
    )
}
