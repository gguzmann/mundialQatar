import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { ModalApuesta } from './ModalApuesta'

export const MatchApuesta = ({ match, apuestas, other, setOther }) => {
    const [open, setOpen] = useState(false)
    const [apuesta, setApuesta] = useState(null)
    const modalApuesta = () => {
        setOpen(!open)
    }
    let test = ''
    useEffect(() => {
        setApuesta(apuestas)
    }, [apuestas])
    
    if (apuesta) {
        test = apuesta.winner == match.winner_code ? 'rgba(0,255,0,.1)' : 'rgba(255,0,0,.1)'
    }
    return (
        <>
            <Paper sx={{ backgroundColor: test }}>
                <Tooltip title={'winner: '+match.winner}>

                <Box sx={{ flexGrow: 10 }}>
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
                                            {/* <Typography sx={{border: 'solid', p:2, borderColor:'green', borderRadius: 3}}>{apuesta.home_goals}</Typography> */}
                                            <Button variant='outlined' color={apuesta.home_goals == match.home_team.goals ? 'success' : 'error'} sx={{ p: 1, fontSize: 20 }}>{apuesta.home_goals}</Button>
                                            vs
                                            {/* <Typography sx={{border: 'solid', p:2, borderRadius: 3}} color=''>{apuesta.away_goals}</Typography> */}
                                            <Button variant='outlined' color={apuesta.away_goals == match.away_team.goals ? 'success' : 'error'} sx={{ p: 1, fontSize: 20 }}>{apuesta.away_goals}</Button>
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
                </Box>
                </Tooltip>

            </Paper>
            <ModalApuesta open={open} modalApuesta={modalApuesta} match={match} setOther={setOther} other={other} />
        </>
    )
}
