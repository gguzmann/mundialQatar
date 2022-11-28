import { Box, Divider, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

export const Match = ({ match }) => {

    const fecha = new Date(match.datetime)
    const fechaProgress = new Date(match.datetime)
    const dia = new Date(match.datetime).toLocaleDateString("es-CL", { weekday: 'short', month: 'numeric', day: 'numeric' })
    const hora = fecha.getHours() + ':00'
    const hoy = new Date()

    return (
        <>
            <Paper sx={{ display: 'flex', m: 2, p: 2, maxWidth: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' ,  width: '25%' }}>
                    <Box>
                        <div>{dia}</div>

                        {
                            hoy > new Date(fecha.setHours(fecha.getHours() + 2)) ?
                                'Finalizado'
                                :
                                <div>{hora}</div>

                        }

                        {
                            hoy > new Date(fechaProgress.setHours(fechaProgress.getHours()))
                                && hoy < new Date(fechaProgress.setHours(fechaProgress.getHours() + 2))
                                ?

                                <>
                                    <LinearProgress />
                                    <Typography color="primary">
                                        {hoy.getMinutes() + "'"}
                                    </Typography>
                                </>
                                :
                                ''
                        }

                    </Box>
                </Box>
                <Box sx={{ width: '80%' }}>

                    <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                            {match.home_team.name}
                        </Typography>
                        <Typography sx={{ fontSize: 30 }}>
                            {match.home_team.goals != null ? match.home_team.goals : '-'}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                        <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                            {match.away_team.name}
                        </Typography>
                        <Typography sx={{ fontSize: 30 }}>
                            {match.away_team.goals != null ? match.away_team.goals : '-'}
                        </Typography>
                    </Box>
                </Box>
                {/* <Typography color='secondary' sx={{ position: 'relative', top: '100%', right: '75%' }}>
                    {hora}
                </Typography> */}

            </Paper>
        </>
    )
}
