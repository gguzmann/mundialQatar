import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])


  useEffect(() => {

    fetch('https://worldcupjson.net/matches')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        // setPartidos(data.filter(x => x.id > 3))
        setPartidos(data.filter(x => x.stage_name == "Round of 16"))
        console.log(data)
      } )

  }, [])

  return (
    <Box sx={{mx: '15%', mt: 5}}>
      {
        partidos.map((match, i) => <MatchApuesta key={i} match={match} />)
      }
    </Box>
  )
}
