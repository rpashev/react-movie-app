import React, { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { getUserLists } from '../../Services/firebase-requests'
import userContext from "../../Context/user-context"
import styles from './watchlist.module.css'
import { renderMovies } from '../../utils/renderMovies'

const Watchlist = () => {
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [watchlist, setWatchlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getWatchlist = async () => {
        let list = await getUserLists(userID, "watchlist")
        setWatchlist(list)
        setIsLoading(false)
    }

    useEffect(() => {

        getWatchlist()


    }, [])

    return (
        <Layout>
            <div className={styles.list}>
                {renderMovies(isLoading, watchlist)}
            </div>
        </Layout>

    )
}

export default Watchlist