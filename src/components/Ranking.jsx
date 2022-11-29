import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../context/storeContext'
import { getAllApuestas } from '../helpers/getData'

export const Ranking = () => {
    const [users, setUsers] = useState([])
    const { matches, allApuestas } = useStore()

    const generatedRanking = () => {
        if (matches) {
            setUsers([])

            allApuestas.forEach(element => {
                // console.log(element)
            });
            const acierto = allApuestas.filter(x => x.winner == matches[x.id - 1].winner)
            const noAcierto = allApuestas.filter(x => x.winner != matches[x.id - 1].winner)
            const userUnique = [...new Set(allApuestas.map(x => x.name))]
            userUnique.forEach(user => {
                const arr = acierto.filter(x => x.name == user)
                const arr2 = arr.filter(x => x.home_goals == matches[x.id - 1].home_team.goals && x.away_goals == matches[x.id - 1].away_team.goals)
                const arr3 = noAcierto.filter(x => x.name == user)
                const obj = {
                    aciertos: arr.length,
                    apuestas: allApuestas.filter(e => e.name == user).length,
                    name: user,
                    aciertoResultado: arr2.length,
                }
                setUsers(users => [...users, obj])
            });
        }
    }

    useEffect(() => {
        generatedRanking()
    }, [matches, allApuestas])

    return (
        <>
            <Box sx={{ m: 3 }}>
                <TableContainer sx={{ width: '100%' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, .1)' }}>
                            <TableRow>
                                <TableCell >Usuario</TableCell>
                                <TableCell align='center'>Puntos</TableCell>
                                <TableCell align='center'>Apuestas</TableCell>
                                <TableCell align='center'>Aciertos Resultado</TableCell>
                                <TableCell align='center'>Aciertos Win</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((x, i) =>
                                    < TableRow key={i}>
                                        <TableCell  width='10%'>{x.name}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertos + x.aciertoResultado}</TableCell>
                                        <TableCell align='center' width='10%'>{x.apuestas}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertos}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertoResultado}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


        </>
    )
}
