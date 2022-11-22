import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GruposCard } from './GruposCard'
export const Equipos = () => {

  const [groups, setGroups] = useState([])

  useEffect(() => {

    fetch('https://worldcupjson.net/teams')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        console.log(data)
        setGroups(data.groups)
      })

  }, [])

  return (
    <Box >
      <ul>
        <Box >
        {
          groups.map((x, i) => <GruposCard key={i} group={x}/>)
        }
        </Box>
      </ul>
    </Box>
  )
}
