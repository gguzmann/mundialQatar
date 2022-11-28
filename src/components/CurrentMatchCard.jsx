import { useTheme } from '@emotion/react'
import { Box, Card, CardContent, LinearProgress, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export const CurrentMatchCard = ({ match }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const fecha = new Date(match.datetime)
    const fechaProgress = new Date(match.datetime)
    const dia = new Date(match.datetime).toLocaleDateString("es-CL", { weekday: 'short', month: 'numeric', day: 'numeric' })
    const hora = fecha.getHours() + ':00'
    const hoy = new Date()

    // console.log((hoy - fecha)/60)

    return (
        <Card key={match.id} sx={{ width: isMobile ? '100%' : '25%', m: 1 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {
                        hoy > new Date(fecha.setHours(fecha.getHours() + 2)) ?
                            'Finalizado'
                            :
                            hora

                    }
                        {}
                    {
                        hoy > new Date(fechaProgress.setHours(fechaProgress.getHours()))
                            && hoy < new Date(fechaProgress.setHours(fechaProgress.getHours() + 2))
                            ?
                            ' - EN VIVO ' 
                            :
                            ''
                    }
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div" sx={{display:'flex', alignItems: 'center', gap: 2}}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="25" height='25' />
                        {match.home_team.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {match.home_team.goals}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div" sx={{display:'flex', alignItems: 'center', gap: 2}}>
                        <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="25" height='25' />
                        {match.away_team.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {match.away_team.goals}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
