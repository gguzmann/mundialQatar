import { Box, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])
  const [other, setOther] = useState(false)
  const [bets, setBets] = useState([])

  const [select, setSelect] = useState(0)

  const {matches, apuestas} = useStore()
  console.log(new Date())
  useEffect(() => {
    // setPartidos(matches.filter(x => x.status != "completed"))
    setPartidos(matches.filter(x => x.id > 20))
    // setPartidos(matches)
    setBets(apuestas)
  }, [matches, apuestas])

  const handleChange = (e) => {
    setSelect(e.target.value)
    if(e.target.value == 0) setPartidos(matches)
    if(e.target.value == 1) setPartidos(matches.filter(x => x.stage_name === "First stage"))
    if(e.target.value == 2) setPartidos(matches.filter(x => x.stage_name === "Round of 16"))
    if(e.target.value == 3) setPartidos(matches.filter(x => x.stage_name === "Quarter-final"))
    if(e.target.value == 4) setPartidos(matches.filter(x => x.stage_name === "Semi-final"))
    if(e.target.value == 5) setPartidos(matches.filter(x => x.stage_name === "Final"))
  }

  return (
    <Box >
      <Select onChange={handleChange} value={select} sx={{ m : 3, width: '25%' }}>
        <MenuItem value={0}>Todos</MenuItem>
        <MenuItem value={1}>Fase inicial</MenuItem>
        <MenuItem value={2}>Octavos</MenuItem>
        <MenuItem value={3}>Cuartos</MenuItem>
        <MenuItem value={4}>Semis</MenuItem>
        <MenuItem value={5}>Final</MenuItem>
      </Select>
      {
        apuestas &&
        partidos.map((match, i) => <MatchApuesta key={i} match={match} apuestas={bets.find(x => x.idMatch == match.id)} setOther={setOther} other={other}/>)
      }
    </Box>
  )
}
