import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { Match } from './Match'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Ranking2 = () => {
    const { matches } = useStore()
    const [partidos, setPartidos] = useState([])
    useEffect(() => {
        setPartidos(matches.filter(x => x.status == "completed"))
    }, [matches])

    return (
        <>
            {
                partidos.map((match, i) => <Drop key={match.id} match={match} />)
            }
        </>

    )
}

const Drop = ({ match }) => {
    const [apuestas, setApuestas] = useState([])
    const { allApuestas, matches } = useStore()



    useEffect(() => {
        setApuestas(allApuestas.filter(x => x.id == match.id))
        console.log(allApuestas)
    }, [matches, allApuestas])

    return (
        <Accordion sx={{ m: 1 }}>
            <AccordionSummary expandIcon={apuestas.length > 0 && <ExpandMoreIcon />}>
            <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width:'100%' }}>

                <Box sx={{ width: '20%' }}>

                    <img src={match.home_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="30" height='30' />
                </Box>
                <Typography sx={{ textAlign: 'center', width: '60%' }}>
                    {match.home_team.name} {match.home_team.goals} vs {match.away_team.goals} {match.away_team.name} 
                </Typography>
                <Box sx={{ width: '20%' }}>

                    <img src={match.away_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="30" height='30' />
                </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                < Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                    <Typography >Usuario</Typography>
                    <Typography >+3</Typography>
                    <Typography >+2</Typography>
                    <Typography >+1</Typography>
                </Box>
                <Divider />
                {
                    apuestas.map((x, i) =>
                        < Box key={i} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                            <Typography >{x.name.split('@')[0]}</Typography>
                            <Typography ><Button variant='outlined' color={match.home_team.goals == x.home_goals && match.away_team.goals == x.away_goals ? 'success' : 'error'}>{x.home_goals} - {x.away_goals}</Button></Typography>
                            <Typography ><Button variant='outlined' color={match.winner == x.winner ? 'success' : 'error'}>{x.winner.slice(0, 3)}</Button></Typography>
                            <Typography ><Button variant='outlined' color={Number(match.home_team.goals) + Number(match.away_team.goals) == Number(x.home_goals) + Number(x.away_goals) ? 'success' : 'error'}>{Number(x.home_goals) + Number(x.away_goals)}</Button></Typography>
                        </Box>
                    )
                }
            </AccordionDetails>
        </Accordion>
    )
}