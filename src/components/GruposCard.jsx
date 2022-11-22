import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export const GruposCard = ({ group }) => {
    return (
        <>
        Grupo {group.letter}
            <TableContainer sx={{m: 2, maxWidth: '80%', border: 1, borderColor: 'divider'}} >
                <Table >
                    <TableHead component={Paper} elevation={3}>
                        <TableRow>
                        <TableCell>Equipo</TableCell>
                        <TableCell>Pts</TableCell>
                        <TableCell>PJ</TableCell>
                        <TableCell>DF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            group.teams.map((x, i) => (
                                <TableRow key={i} hover>
                                    <TableCell><img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${x.name.split(' ').join('_')}.jpg`} width="20" height='20' /> {x.name}</TableCell>
                                    <TableCell>{x.group_points}</TableCell>
                                    <TableCell>{x.games_played}</TableCell>
                                    <TableCell>{x.goal_differential}</TableCell>
                                </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
