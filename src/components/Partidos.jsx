import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { Match } from './Match'

export const Partidos = () => {

  const [partidos, setPartidos] = useState([])
  const {matches} = useStore()

  useEffect(() => {

    // setPartidos(matches.filter(x => x.id > 3))
    setPartidos(matches)

  }, [matches])

  return (
    <Box sx={{ mx: '15%' }}>
      {
        partidos.map((match, i) => <Match key={i} match={match} />)
      }
    </Box>
  )
}
