import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useState } from 'react'
import { Ranking } from './Ranking'
import { Ranking2 } from './Ranking2'

export const RankingContainer = () => {
    const [seccion, setSeccion] = useState(0)

    const handleSelect = (e, value) => {
        setSeccion(value)
    }
    return (
        <>
            <ToggleButtonGroup sx={{ m: 2 }} value={seccion} onChange={handleSelect} exclusive>
                <ToggleButton value={0}>General</ToggleButton>
                <ToggleButton value={1}>Por Partido</ToggleButton>
            </ToggleButtonGroup>
            {
                seccion == 0 ? 
                <>
                <Ranking/>
                </>
                :
                <>
                <Ranking2/>
                </>
            }
        </>
    )
}
