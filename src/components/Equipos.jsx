import React, { useEffect, useState } from 'react'
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
    <>
      <div>Equipos</div>
      <ul>
        {
          groups.map((x, i) => (
            <div key={i}>
              <li >{x.letter}</li>
              <ul>
              {
                x.teams.map((y,i) => <li key={i}>{y.name}</li>)
              }
              </ul>
            </div>
          ))
        }
      </ul>
    </>
  )
}
