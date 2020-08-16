import React, { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { getUserLists } from '../../Services/firebase-requests'
import userContext from "../../Context/user-context"
import MovieCard from "../../Components/SingleMovie/movie-card"
import Loader from "../../Components/Loader/loader"
import styles from './watchlist.module.css'

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

    const renderMovies = () => {
        if(isLoading === true){
            return <Loader/>
        }
        if (watchlist.length > 0) {
            
            return watchlist.map(movie => {

                return <MovieCard key={movie.movieID} title={movie.title} img={movie.poster} movieID={movie.movieID} />

            })
        } else {
            return <p>No movies in this list yet!</p>
        }

    }

    return (
        <Layout>
            <div className={styles.list}>
                {renderMovies()}
            </div>
        </Layout>

    )
}

export default Watchlist