import { createContext, useContext, useEffect, useState } from "react";
import { getAllMatches, getAllTeams, getApuestas, getMatchCurrent } from "../helpers/getData";
import { useAuth } from "./authContext";


export const storeContext = createContext()

export const useStore = () => useContext(storeContext)

export function StoreProvider({ children }) {

    const [matches, setMatches] = useState([])
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentMatch, setCurrentMatch] = useState([])
    const [apuestas, setApuestas] = useState([])


    const { user } = useAuth()

    useEffect(() => {
        console.log('asd')
        Promise.all([
            getAllMatches(),
            getAllTeams(),
            getMatchCurrent(),
            getApuestas(user)
        ])
            .then(([dataMatches, dataTeams, dataCurrent, dataApuestas]) => {
                setMatches(dataMatches)
                const { groups } = dataTeams
                setTeams(groups)
                setCurrentMatch(dataCurrent)
                setApuestas(dataApuestas)
            })
            console.log('store')
    }, [user])


    return (
        <storeContext.Provider value={{ matches, teams, currentMatch, apuestas }}>
            {children}
        </storeContext.Provider>
    )
}