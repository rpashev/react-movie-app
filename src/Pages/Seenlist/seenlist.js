import React, { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { getUserLists } from '../../Services/firebase-requests'
import userContext from "../../Context/user-context"
import styles from './seenlist.module.css'
import { renderMovies } from '../../utils/renderMovies'


const Seenlist = () => {
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [seenlist, setSeenlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getSeenList = async () => {
        let list = await getUserLists(userID, "seenlist")
        setSeenlist(list)
        setIsLoading(false)
    }

    useEffect(() => {
        getSeenList()

    }, [])

    return (
        <Layout>
            <div className={styles.list}>
                {renderMovies(isLoading, seenlist)}
            </div>
        </Layout>

    )
}

export default Seenlist