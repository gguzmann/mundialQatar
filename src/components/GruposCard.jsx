import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export const GruposCard = ({ group }) => {
    let teams = group.teams.map(x => x)
    return (
        <>
        Grupo {group.letter}
            <TableContainer sx={{m: 2, maxWidth: '90%', border: 1, borderColor: 'divider'}} >
                <Table >
                    <TableHead sx={{backgroundColor: 'rgba(255, 255, 255, .1)'}}>
                        <TableRow>
                        <TableCell>Equipo</TableCell>
                        <TableCell>Pts</TableCell>
                        <TableCell>PJ</TableCell>
                        <TableCell>DF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            group.teams.sort((a, b) => a.group_points < b.group_points).map((x, i) => (
                                <TableRow key={i} hover>
                                    <TableCell width='40%'><img src={`https://www.sciencekids.co.nz/images/pictures/flags96/${x.name.split(' ').join('_')}.jpg`} width="20" height='20' /> {x.name}</TableCell>
                                    <TableCell width='20%'>{x.group_points}</TableCell>
                                    <TableCell width='20%'>{x.games_played}</TableCell>
                                    <TableCell width='20%'>{x.goal_differential}</TableCell>
                                </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
