import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])
  const [other, setOther] = useState(false)
  const [bets, setBets] = useState([])

  const {matches, apuestas} = useStore()
  console.log(new Date())
  useEffect(() => {
    // setPartidos(matches.filter(x => x.status != "completed"))
    setPartidos(matches.filter(x => x.id > 20))
    // setPartidos(matches)
    setBets(apuestas)
  }, [matches, apuestas])

  

  return (
    <Box sx={{  }}>
      {
        apuestas &&
        partidos.map((match, i) => <MatchApuesta key={i} match={match} apuestas={bets.find(x => x.idMatch == match.id)} setOther={setOther} other={other}/>)
      }
    </Box>
  )
}
