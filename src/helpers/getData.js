import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"

const URL = 'https://world-cup-json-2022.fly.dev/'

export const getAllMatches = async () => {
        const response = await fetch('https://worldcupjson.net/matches')
        const data = await response.json()
        return data
}

export const getAllTeams = async () => {
        const response = await fetch('https://worldcupjson.net/teams')
        const data = await response.json()
        return data
}

export const getMatchCurrent = async () => {
        const response = await fetch('https://worldcupjson.net/matches/today')
        const data = await response.json()
        return data
}

export const getApuestas = async (user) => {
        if(!user) return false

        const collectionApuestas = collection(db, "apuestas")
        const q = query(collectionApuestas, where("name", "==", user.email))
    
        const arr = []
        const queryApuestas = await getDocs(q)
        queryApuestas.forEach((doc) => {
          const obj = doc.data()
          arr.push(obj)
        })
        return arr
}

export const getAllApuestas = async (user) => {
        if(!user) return false

        const collectionApuestas = collection(db, "apuestas")
        const arr = []
        const queryApuestas = await getDocs(collectionApuestas)
        queryApuestas.forEach((doc) => {
          const obj = doc.data()
          arr.push(obj)
        })
        return arr


}