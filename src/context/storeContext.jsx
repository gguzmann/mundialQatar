import { createContext, useContext, useEffect, useState } from "react";
import { getAllApuestas, getAllMatches, getAllTeams, getApuestas, getMatchCurrent } from "../helpers/getData";
import { useAuth } from "./authContext";


export const storeContext = createContext()

export const useStore = () => useContext(storeContext)

export function StoreProvider({ children }) {

    const [matches, setMatches] = useState([])
    const [teams, setTeams] = useState([])
    const [currentMatch, setCurrentMatch] = useState([])
    const [apuestas, setApuestas] = useState([])
    const [allApuestas, setAllApuestas] = useState([])

    const { user } = useAuth()

    useEffect(() => {
        Promise.all([
            getAllMatches(),
            getAllTeams(),
            getMatchCurrent(),
            getApuestas(user),
            getAllApuestas(user)
        ])
            .then(([dataMatches, dataTeams, dataCurrent, dataApuestas, dataAllApuestas]) => {
                setMatches(dataMatches)
                const { groups } = dataTeams
                setTeams(groups)
                setCurrentMatch(dataCurrent)
                setApuestas(dataApuestas)
                setAllApuestas(dataAllApuestas)
            })
        console.log('store update')
    }, [user])


    const addApuesta = (apuesta) => {
        setApuestas(apuestas => [...apuestas, apuesta])
        setAllApuestas(allApuestas => [...allApuestas, apuesta])
    }

    return (
        <storeContext.Provider value={{ matches, teams, currentMatch, apuestas, addApuesta, allApuestas }}>
            {children}
        </storeContext.Provider>
    )
}