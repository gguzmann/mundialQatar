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
            const userUnique = [...new Set(acierto.map(x => x.name))]
            userUnique.forEach(user => {
                const arr = acierto.filter(x => x.name == user)
                const obj = {
                    aciertos: arr.length,
                    apuestas: allApuestas.filter(e => e.name == user).length,
                    name: user
                }
                console.log(obj)
                setUsers(users => [...users, obj])
            });
        }
    }

    useEffect(() => {
        generatedRanking()
    }, [])

        return (
        <>
            <Box sx={{ mx: '15%' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Apuestas</TableCell>
                                <TableCell>Aciertos Win</TableCell>
                                <TableCell>Aciertos Resultado</TableCell>
                                <TableCell>No Aciertos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((x, i) => 
                                < TableRow key={i}>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>{x.apuestas}</TableCell>
                                    <TableCell>{x.aciertos}</TableCell>
                                    <TableCell>{x.apuestas - x.aciertos}</TableCell>
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
