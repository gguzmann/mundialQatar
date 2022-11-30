import { Box, Button, Paper, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { ModalApostar } from './ModalApostar'
import { ModalApuesta } from './ModalApuesta'

export const MatchApuesta = ({ match, apuestas }) => {
    const [open, setOpen] = useState(false)
    const [apuesta, setApuesta] = useState(null)
    const [error, setError] = useState(null)


    const modalApuesta = () => {
        setOpen(!open)
        setAp({
            id: match.id,
            winner: null,
            home_goals: null,
            away_goals: null,
            name: user.email
        })
        setError('')
    }
    const { user } = useAuth()

    const [ap, setAp] = useState({
        id: match.id,
        winner: null,
        home_goals: null,
        away_goals: null,
        name: user.email
    })

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))


    let test = ''
    let colorGoalsHome = ''
    let colorGoalsAway = ''
    useEffect(() => {
        setApuesta(apuestas)
    }, [apuestas])

    if (apuesta) {
        if (new Date(match.datetime) < new Date()) {

            test = apuesta.winner == match.winner ? 'rgba(0,255,0,.1)' : 'rgba(255,0,0,.1)'
            colorGoalsHome = apuesta.home_goals == match.home_team.goals ? 'success' : 'error'
            colorGoalsAway = apuesta.away_goals == match.away_team.goals ? 'success' : 'error'
        }
    }
    return (
        <>
            <Paper sx={{ backgroundColor: match.winner && test, width: '100%' }}>

                <Box sx={{ p: 2, mb: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        {
                            apuesta &&
                            <>
                                win: {apuesta.winner}
                            </>
                        }
                    </Box>
                    <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Box sx={{ width: '20%' }}>

                            <img src={match.home_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="50" height='50' />
                        </Box>
                        {
                            !isMobile &&
                            <Typography sx={{ fontSize: 20, width: '25%' }}>
                                {match.home_team.name}
                            </Typography>
                        }
                        <Box sx={{ display: 'flex', mx: 1, justifyContent: 'center', alignItems: 'center', gap: 1, width: '60%' }}>
                            {
                                apuesta ?
                                    <>
                                        <Button variant='outlined' color={match.winner && colorGoalsHome != '' ? colorGoalsHome : 'primary'} sx={{ p: 1, fontSize: 20 }}>{apuesta.home_goals}</Button>
                                        <Button variant='outlined' color={match.winner && colorGoalsAway != '' ? colorGoalsAway : 'primary'} sx={{ p: 1, fontSize: 20 }}>{apuesta.away_goals}</Button>
                                    </>
                                    :
                                    // <Button onClick={modalApuesta} variant="contained" color="success">Apostar</Button>

                                    new Date(match.datetime) > new Date() ?
                                        !match.home_team_country && !match.home_team_country ?
                                            <Button variant="outlined" color="primary">Undefined</Button>
                                            :
                                            <Button onClick={modalApuesta} variant="contained" color="success">Apostar</Button>
                                        :
                                        <>

                                            <Button variant="outlined" color="error">Finalizado</Button>
                                        </>
                            }
                        </Box>
                        {
                            !isMobile &&
                            <Typography sx={{ width: '25%', fontSize: 20 }}>
                                {match.away_team.name}
                            </Typography>
                        }
                        <Box sx={{ width: '20%' }}>

                            <img src={match.away_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="50" height='50' />
                        </Box>
                    </Box>
                </Box>

            </Paper>
            <ModalApostar open={open} modalApuesta={modalApuesta} match={match} apuesta={ap} setApuesta={setAp} error={error} setError={setError} />
        </>
    )
}

