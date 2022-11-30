import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { Match } from './Match'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
export const Ranking2 = () => {
    const { matches } = useStore()
    const [partidos, setPartidos] = useState([])
    const [select, setSelect] = useState(6)


    const handleChange = (e) => {
        setSelect(e.target.value)
        // if (e.target.value == 0) setPartidos(matches)
        // if (e.target.value == 1) setPartidos(matches.filter(x => x.stage_name == "First stage"))
        if (e.target.value == 2) setPartidos(matches.filter(x => x.stage_name == "Round of 16"))
        if (e.target.value == 3) setPartidos(matches.filter(x => x.stage_name == "Quarter-final"))
        if (e.target.value == 4) setPartidos(matches.filter(x => x.stage_name == "Semi-final"))
        if (e.target.value == 5) setPartidos(matches.filter(x => x.stage_name == "Final"))
        if (e.target.value == 6) setPartidos(matches.filter(x => new Date(x.datetime).getDate() == new Date().getDate()))
    }

    useEffect(() => {
        // setPartidos(matches.filter(x => x.status == "completed"))
        setPartidos(matches.filter(x => new Date(x.datetime).getDate() == new Date().getDate()))
    }, [matches])

    return (
        <Box>
            <Select onChange={handleChange} value={select} sx={{ m: 3, width: '50%', maxWidth: '300px' }}>
                {/* <MenuItem value={0}>Todos</MenuItem> */}
                <MenuItem value={6}>Hoy</MenuItem>
                {/* <MenuItem value={1}>Fase inicial</MenuItem> */}
                <MenuItem value={2}>Octavos</MenuItem>
                <MenuItem value={3}>Cuartos</MenuItem>
                <MenuItem value={4}>Semis</MenuItem>
                <MenuItem value={5}>Final</MenuItem>
            </Select>
            {
                partidos.map((match, i) => <Drop key={match.id} match={match} />)
            }
        </Box>

    )
}

const Drop = ({ match }) => {
    const [apuestas, setApuestas] = useState([])
    const { allApuestas, matches } = useStore()



    useEffect(() => {
        setApuestas(allApuestas.filter(x => x.id == match.id))
    }, [matches, allApuestas])

    return (
        <Accordion sx={{ m: 1 }}>
            <AccordionSummary expandIcon={apuestas.length > 0 && <ExpandMoreIcon />}>
                <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>

                    <Box sx={{ width: '20%' }}>

                        <img src={match.home_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.home_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="30" height='30' />
                    </Box>
                    <Box sx={{ textAlign: 'center', width: '100%', display:'flex', justifyContent:'space-around',  }}>
                        <Typography>{match.home_team.name}</Typography> 
                        <Typography>{match.home_team.goals}</Typography> 
                        vs 
                        <Typography>{match.away_team.goals}</Typography> 
                        <Typography>{match.away_team.name}</Typography>
                    </Box>
                    <Box sx={{ width: '20%' }}>

                        <img src={match.away_team_country ? `https://www.sciencekids.co.nz/images/pictures/flags96/${match.away_team.name.split(' ').join('_')}.jpg` : 'https://bolt-gcdn.sc-cdn.net/3/hxTBED1t41k8SBqUgBNOq?bo=EhgaABoAMgF9OgEEQgYInJjWhgZIAlASYAE%3D&uc=18'} width="30" height='30' />
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                < Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                    <Typography sx={{ width: '35%' }}></Typography>
                    <Typography sx={{ width: '19%' }}><ScoreboardOutlinedIcon /></Typography>
                    <Typography sx={{ width: '19%' }}><FlagIcon /></Typography>
                    {/* <Typography sx={{ width: '19%' }}><SportsSoccerIcon /></Typography> */}
                </Box>
                <Divider />
                {
                    apuestas.map((x, i) =>
                        < Box key={i} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', my: 1 }}>
                            <Typography sx={{ width: '35%' }} >{x.name.split('@')[0]}</Typography>
                            <Typography sx={{ width: '20%' }} ><Button variant='outlined' color={match.home_team.goals == x.home_goals && match.away_team.goals == x.away_goals ? 'success' : 'error'}>{x.home_goals} - {x.away_goals}</Button></Typography>
                            <Typography sx={{ width: '20%' }} ><Button variant='outlined' color={match.winner == x.winner ? 'success' : 'error'}>{x.winner.slice(0, 3)}</Button></Typography>
                            {/* <Typography sx={{ width: '20%' }} ><Button variant='outlined' color={Number(match.home_team.goals) + Number(match.away_team.goals) == Number(x.home_goals) + Number(x.away_goals) ? 'success' : 'error'}>{Number(x.home_goals) + Number(x.away_goals)}</Button></Typography> */}
                        </Box>
                    )
                }
            </AccordionDetails>
        </Accordion>
    )
}