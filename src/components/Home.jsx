import { useTheme } from '@emotion/react'
import { Button, ButtonGroup, Divider, getStepContentUtilityClass, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useStore } from '../context/storeContext'
import { CurrentMatchCard } from './CurrentMatchCard'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ScoreboardOutlinedIcon from '@mui/icons-material/ScoreboardOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Home = () => {

  const [current, setCurrent] = useState(0)
  const [today, setToday] = useState([])
  const { currentMatch } = useStore()
  const [select, setSelect] = useState(0)


  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setToday(currentMatch)
  }, [currentMatch])


  return (
    <>
      <Box sx={{ m: 3, mb: 5 }}>

        {
          today.length > 0 &&
            isMobile ?
            <>
              <Box value={select} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <IconButton onClick={() => { current > 0 && setCurrent(current - 1) }}  variant="outlined"><ArrowBackIosNewIcon /></IconButton>
                </Box>
                <CurrentMatchCard match={today[current]} />
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <IconButton onClick={() => { current < 3 && setCurrent(current + 1) }}  variant="outlined"><ArrowForwardIosIcon /></IconButton>
                </Box>
              </Box>
            </>
            :
            <Box sx={{ display: 'flex', gap: 3, m: 3, justifyContent: 'center' }}>
              {
                today.map(x => <CurrentMatchCard key={x.id} match={x} />)
              }
            </Box>
        }
      </Box>



      <Typography variant='h4' sx={{ textAlign: 'center', m: 3 }}>Puntaje</Typography>
      <Box sx={{ m: 3, display: 'flex', justifyContent: 'center' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, .1)' }}>
              <TableRow>
                <TableCell >Acierto</TableCell>
                <TableCell align='center'>Puntos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell sx={{ display: 'flex', alignItems: 'center' }} > <ScoreboardOutlinedIcon /> Resultado</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}> <FlagIcon /> Ganador</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}> <SportsSoccerIcon /> Goles</TableCell>
                <TableCell align='center'>+1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
