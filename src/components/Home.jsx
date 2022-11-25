import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { CurrentMatchCard } from './CurrentMatchCard'

export const Home = () => {

  const [current, setCurrent] = useState([])
  const { currentMatch, apuestas } = useStore()


  useEffect(() => {
    setCurrent(currentMatch)
  }, [currentMatch])

  // console.log(teams)
  console.log(apuestas)
  // console.log(matches)

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
