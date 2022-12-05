import { collection, doc, FieldValue, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"
// import { partidos } from "../partidos"

const URL = 'https://world-cup-json-2022.fly.dev/'

export const getAllMatches = async () => {
        const response = await fetch('https://worldcupjson.net/matches')
        const partidos = await response.json()
        const data = partidos.map(x => {

                if(x.stage_name === "First stage") return x
                if(x.status !== "completed") return x

                if(x.home_team.goals == x.away_team.goals){

                        return {
                                ...x,
                                winner: 'Draw'
                        }
                }else{
                        return x
                }
        })
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
        if (!user) return false

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
        if (!user) return false

        const collectionApuestas = collection(db, "apuestas")
        const arr = []
        const queryApuestas = await getDocs(collectionApuestas)
        queryApuestas.forEach((doc) => {
                const obj = doc.data()
                arr.push(obj)
        })
        return arr
}

export const validarUsuario = async (email) => {
        const collectionParticipantes = collection(db, "participantes")
        const q = query(collectionParticipantes, where("user", "==", email))

        const arr = []
        const queryParticipantes = await getDocs(q)
        queryParticipantes.forEach(x => arr.push(x.data()))

        return arr.length > 0 ? true : false
}

export const newApuesta = async (apuesta, nameApuesta) => {
        const collApuestas = collection(db, "apuestas")
        const docRef = doc(collApuestas, nameApuesta)
        await setDoc(docRef, apuesta)
}

export const countParticipantes = async (user) => {
        if (!user) return false

        const collParticipantes = collection(db, "participantes")
        const docRef = doc(collParticipantes, user.email)

        const usuario = await getDoc(docRef)
        if (usuario.exists()) {
                await updateDoc(docRef, { count: increment(1) })
        }else{
                await setDoc(docRef, { count: increment(1) })
        }

}