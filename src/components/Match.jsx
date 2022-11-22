import { Box, Divider, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

export const Match = ({ match }) => {

    const fecha = new Date(match.datetime)
    const dia = new Date(match.datetime).toLocaleDateString("es-CL", { weekday: 'short',  month: 'numeric', day: 'numeric' })
    const hora = fecha.getHours() + ':00'
    const hoy = new Date()

        console.log('hoy', hoy.getHours())
        console.log('fecha', fecha.getHours() )
    return (
        <>
            <Paper sx={{ display: 'flex', m: 2, p: 2 }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Box>
                        <div>{dia}</div>
                        <div>{hora}</div>
                        {hoy.getDay() == new Date(match.datetime).getDay() 
                        && hoy.getHours() > fecha.getHours() && hoy.getHours() <= fecha.getHours() + 2 ?
                         <LinearProgress /> 
                         :  
                          '' }
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 10 }}>

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
