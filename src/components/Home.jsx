import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { CurrentMatchCard } from './CurrentMatchCard'

export const Home = () => {

  const [current, setCurrent] = useState([])

  useEffect(() => {
    fetch('https://worldcupjson.net/matches/today')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        // setPartidos(data.filter(x => x.id > 3))
        console.log(data)
        setCurrent(data)
      })
  }, [])

  return (
    <>
      <Box sx={{display:'flex', gap: 3, m: 3, justifyContent: 'center'}}>
      {
        current.map(x => <CurrentMatchCard key={x.id} match={x}/>)
      }
      </Box>
    </>
  )
}
