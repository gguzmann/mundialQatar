import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])
  const [other, setOther] = useState(false)
  const [bets, setBets] = useState([])

  const {matches, apuestas, setApuestas} = useStore()

  useEffect(() => {
    // setPartidos(matches.filter(x => x.id > 14))
    setPartidos(matches)
    setBets(apuestas)
  }, [matches, apuestas])

  

  return (
    <Box sx={{mx: '15%', mt: 5}}>
      {
        apuestas &&
        partidos.map((match, i) => <MatchApuesta key={i} match={match} apuestas={bets.find(x => x.idMatch == match.id)} setOther={setOther} other={other}/>)
      }
    </Box>
  )
}