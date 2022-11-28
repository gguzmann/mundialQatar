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
            const acierto = allApuestas.filter(x => x.winner == matches[x.idMatch - 1].winner_code)
            const userUnique = [...new Set(allApuestas.map(x => x.name))]
            userUnique.forEach(user => {
                const arr = acierto.filter(x => x.name == user)
                const arr2 = arr.filter(x => x.home_goals == matches[x.idMatch - 1].home_team.goals && x.away_goals == matches[x.idMatch - 1].away_team.goals)
                const obj = {
                    aciertos: arr.length,
                    apuestas: allApuestas.filter(e => e.name == user).length,
                    name: user,
                    aciertoResultado: arr2.length
                }
                console.log(obj)
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
                <TableContainer sx={{ maxWidth: '100%' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, .1)' }}>
                            <TableRow>
                                <TableCell align=''>Usuario</TableCell>
                                <TableCell align='center'>Apuestas</TableCell>
                                <TableCell align='center'>Aciertos Win</TableCell>
                                <TableCell align='center'>Aciertos Resultado</TableCell>
                                <TableCell align='center'>No Aciertos</TableCell>
                                <TableCell align='center'>Puntos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((x, i) =>
                                    < TableRow key={i}>
                                        <TableCell align='' width='40%'>{x.name}</TableCell>
                                        <TableCell align='center' width='10%'>{x.apuestas}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertos}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertoResultado}</TableCell>
                                        <TableCell align='center' width='10%'>{x.apuestas - x.aciertos}</TableCell>
                                        <TableCell align='center' width='10%'>{x.aciertos + x.aciertoResultado}</TableCell>
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
