import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

export const MatchApuesta = ({ match }) => {
    return (
        <Paper>
            <Box sx={{ flexGrow: 10 }}>

                <Box sx={{ textAlign: 'center', p: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                    <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                        {match.home_team.name}
                    </Typography>
                    <Button variant="contained" color="success">Apostar</Button>
                    {/* <Typography sx={{ fontSize: 30 }}>
                        {match.home_team.goals != null ? match.home_team.goals : '-'}
                    </Typography>
                    <Typography sx={{ fontSize: 30 }}>
                        {match.away_team.goals != null ? match.away_team.goals : '-'}
                    </Typography> */}
                    <Typography sx={{ flexGrow: 1, fontSize: 20 }}>
                        {match.away_team.name}
                    </Typography>
                    <img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg`} width="50" height='50' />
                </Box>
            </Box>
        </Paper>
    )
}
