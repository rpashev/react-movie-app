import { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { logout } from '../../Services/firebase-requests'


const Logout = () => {
    let history = useHistory()

    useEffect(() => {
        logout()
        history.push("/login");
    })
    return null
}

export default Logout
