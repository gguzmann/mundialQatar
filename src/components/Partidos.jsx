import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Match } from './Match'

export const Partidos = () => {

  const [partidos, setPartidos] = useState([])


  useEffect(() => {

    fetch('https://worldcupjson.net/matches')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        // setPartidos(data.filter(x => x.id > 3))
        setPartidos(data)
        console.log(data)
      } )

  }, [])

  return (
    <Box sx={{mx: '15%'}}>
      <div>Partidos</div>


      {
        partidos.map((match, i) => <Match key={i} match={match} />)
      }
    </Box>
  )
}
