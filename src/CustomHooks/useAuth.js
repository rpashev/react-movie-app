import React, {useState} from 'react'
import firebase from "firebase/app";
export const useAuth = () => {
    const [state, setState] = useState(() => {
        const user = firebase.auth().currentUser
        return { initializing: !user, user, }
    })
    function onChange(user) {
        setState({ initializing: false, user })
    }

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        return () => unsubscribe()
    }, [])

    return state
}