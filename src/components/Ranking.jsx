import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { getAllApuestas } from '../helpers/getData'
import FlagIcon from '@mui/icons-material/Flag';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const Ranking = () => {
    const [users, setUsers] = useState([])
    const { matches, allApuestas } = useStore()

    const generatedRanking = () => {
        if (matches) {
            setUsers([])

            const acierto = allApuestas.filter(x => x.winner == matches[matches.findIndex(i => x.id == i.id)].winner )
            const userUnique = [...new Set(allApuestas.map(x => x.name))]
            userUnique.forEach(user => {
                const arr = acierto.filter(x => x.name == user)
                const arr2 = arr.filter(x => x.home_goals == matches[matches.findIndex(i => x.id == i.id)].home_team.goals && x.away_goals == matches[matches.findIndex(i => x.id == i.id)].away_team.goals)
                const obj = {
                    aciertos: arr.length,
                    apuestas: allApuestas.filter(e => e.name == user).length,
                    name: user,
                    aciertoResultado: arr2.length,
                }
                setUsers(users => [...users, obj])
            });
        }
    }

    useEffect(() => {
        generatedRanking()
    }, [matches, allApuestas])

    return (
        <>
           
            <Box sx={{ m: 2 }}>
                            
                < Grid container sx={{ backgroundColor: 'rgba(255, 255, 255, .1)', p:2 }} >
                    <Grid item xs={5} ></Grid>
                    <Grid item xs={2} ><EmojiEventsIcon /></Grid>
                    <Grid item xs={2} ><ScoreboardOutlinedIcon /></Grid>
                    <Grid item xs={2} ><FlagIcon /></Grid>
                    {/* <Typography sx={{ width: '19%' }}><SportsSoccerIcon /></Typography> */}
                </Grid>
                <Divider sx={{my:2}} />
                {
                    users.map((x, i) =>
                    <Box key={i} >
                        < Grid container key={i} spacing={2} >
                            <Grid item xs={5} >{x.name.split('@')[0]}</Grid>
                            <Grid item xs={2} >{x.aciertos + x.aciertoResultado}</Grid>
                            <Grid item xs={2} >{x.aciertoResultado}</Grid>
                            <Grid item xs={2} >{x.aciertos} </Grid>
                        </Grid>
                        <Divider sx={{my:2}} />
                    </Box>
                    )
                }
            </Box>
        </>
    )
}

