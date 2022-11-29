import { useTheme } from '@emotion/react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { CurrentMatchCard } from './CurrentMatchCard'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import FlagIcon from '@mui/icons-material/Flag';

export const Home = () => {

  const [current, setCurrent] = useState([])
  const { currentMatch, apuestas } = useStore()


  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setCurrent(currentMatch)
  }, [currentMatch])

  console.log(apuestas)

  return (
    <>
      <Box sx={{ display: isMobile ? 'flex-wrap' : 'flex', gap: 3, m: 3, justifyContent: 'center' }}>
        {
          current.map(x => <CurrentMatchCard key={x.id} match={x} />)
        }
      </Box>
        <Typography variant='h4' sx={{textAlign:'center'}}>Puntaje</Typography>
      <Box sx={{ m: 3, display:'flex', justifyContent:'center' }}>
        <TableContainer sx={{ maxWidth: '40%' }}>
          <Table>
          <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, .1)' }}>
                            <TableRow>
                                <TableCell >Acierto</TableCell>
                                <TableCell align='center'>Puntos</TableCell>
                            </TableRow>
                        </TableHead>
            <TableBody>
              <TableRow >
                <TableCell sx={{display:'flex', alignItems:'center'}} > <ScoreboardOutlinedIcon/> Resultado</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{display:'flex', alignItems:'center'}}> <FlagIcon/> Ganador</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{display:'flex', alignItems:'center'}}> <SportsSoccerIcon/> Goles</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
