import { Box, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])
  const [bets, setBets] = useState([])

  const [select, setSelect] = useState(0  )

  const {matches, apuestas} = useStore()
  console.log(new Date())
  useEffect(() => {
    // setPartidos(matches.filter(x => x.id > 50))
    setBets(apuestas)
  }, [apuestas])
  
  useEffect(() => {
    if(select == 0) setPartidos(matches)
    if(select == 1) setPartidos(matches.filter(x => x.stage_name == "First stage"))
    if(select == 2) setPartidos(matches.filter(x => x.stage_name == "Round of 16"))
    if(select == 3) setPartidos(matches.filter(x => x.stage_name == "Quarter-final"))
    if(select == 4) setPartidos(matches.filter(x => x.stage_name == "Semi-final"))
    if(select == 5) setPartidos(matches.filter(x => x.stage_name == "Final"))

  }, [matches])

  const handleChange = (e) => {
    setSelect(e.target.value)
    if(e.target.value == 0) setPartidos(matches)
    if(e.target.value == 1) setPartidos(matches.filter(x => x.stage_name == "First stage"))
    if(e.target.value == 2) setPartidos(matches.filter(x => x.stage_name == "Round of 16"))
    if(e.target.value == 3) setPartidos(matches.filter(x => x.stage_name == "Quarter-final"))
    if(e.target.value == 4) setPartidos(matches.filter(x => x.stage_name == "Semi-final"))
    if(e.target.value == 5) setPartidos(matches.filter(x => x.stage_name == "Final"))
    if(e.target.value == 6) setPartidos(matches.filter(x => new Date(x.datetime).getDate() == new Date().getDate()))
  }

  return (
    <Box sx={{m:3}}>
      <Select onChange={handleChange} value={select} sx={{ m : 3, width: '50%', maxWidth: '300px' }}>
        <MenuItem value={0}>Todos</MenuItem>
        <MenuItem value={6}>Hoy</MenuItem>
        <MenuItem value={1}>Fase inicial</MenuItem>
        <MenuItem value={2}>Octavos</MenuItem>
        <MenuItem value={3}>Cuartos</MenuItem>
        <MenuItem value={4}>Semis</MenuItem>
        <MenuItem value={5}>Final</MenuItem>
      </Select>
      {
        apuestas &&
        partidos.map((match, i) => <MatchApuesta key={match.id} match={match} apuestas={bets.find(x => x.id == match.id)}/>)
      }
    </Box>
  )
}
