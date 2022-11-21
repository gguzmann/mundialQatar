import React, { useEffect, useState } from 'react'

export const Partidos = () => {

  const [partidos, setPartidos] = useState([])


  useEffect(() => {

    fetch('https://worldcupjson.net/matches')
      .then(response => response.json())
      .catch(err => err)
      .then(data => {
        setPartidos(data)
        console.log(data)
      } )

  }, [])

  return (
    <>
      <div>Partidos</div>
      <ul>

      {
        partidos.map((match, i) => <li key={i}>{match.home_team.name} vs {match.away_team.name}</li>)
      }
      </ul>
    </>
  )
}
