import { Box } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'
import { MatchApuesta } from './MatchApuesta'

export const Apostar = () => {

  const [partidos, setPartidos] = useState([])
  const [apuestas, setApuestas] = useState([])
  const [other, setOther] = useState(false)


  useEffect(() => {

    fetch('https://worldcupjson.net/matches')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        // setPartidos(data.filter(x => x.id > 3))
        setPartidos(data.filter(x => x.id < 9))
        // setPartidos(data.filter(x => x.stage_name == "Round of 16"))
        console.log(data)
      } )
    cargarApuestas()


  }, [other])

  const { user } = useAuth()

  const cargarApuestas = async () => {
    const collectionApuestas = collection(db, "apuestas")
    const q = query(collectionApuestas, where("name", "==", user.email))

    const arr = []
    const queryApuestas = await getDocs(q)
    queryApuestas.forEach((doc) => {
      const obj = doc.data()
      console.log(doc.data())
      arr.push(obj)
    })
    setApuestas(apuestas => arr)
  }

  useEffect(() => {

    cargarApuestas()

  }, [])
  

  return (
    <Box sx={{mx: '15%', mt: 5}}>
      {
        apuestas &&
        partidos.map((match, i) => <MatchApuesta key={i} match={match} apuestas={apuestas} setOther={setOther} other={other}/>)
      }
    </Box>
  )
}
