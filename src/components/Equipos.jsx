import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { GruposCard } from './GruposCard'
export const Equipos = () => {

const [grupos, setGrupos] = useState([])
  const {teams} = useStore()

  useEffect(() => {
    setGrupos(teams)
}, [teams])

return (
  <Box sx={{ }}>
    {
      teams.map((x, i) => <GruposCard key={i} group={x} />)
    }
  </Box>
)
}
