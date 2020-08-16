import React, { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { getUserLists } from '../../Services/firebase-requests'
import userContext from "../../Context/user-context"
import MovieCard from "../../Components/SingleMovie/movie-card"
import Loader from "../../Components/Loader/loader"
import styles from './seenlist.module.css'

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

    const renderMovies = () => {
        if(isLoading === true){
            return <Loader/>
        }
        if (seenlist.length > 0) {
            return seenlist.map(movie => {
                
                return <MovieCard key={movie.movieID} title={movie.title} img={movie.poster} movieID={movie.movieID} />
               
            })
        } else {
            return <div>No movies in this list yet!</div>
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

export default Seenlist