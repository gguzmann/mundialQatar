import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../firebase";

export const authContext = createContext()

export const useAuth = () => useContext(authContext)

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const signin = async (email, password) => {
        const credential = await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => await signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, current => {
            setUser(current)
            setLoading(false)
        })
    }, [])
    

    return (
        <authContext.Provider value={{ signup, signin, user, logout }}>
            {
            !loading &&
            children
            }
        </authContext.Provider>
    )
}