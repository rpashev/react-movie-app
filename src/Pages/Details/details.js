import React, { useState, useEffect, useCallback, useContext } from "react"
import Layout from "../../Components/Layout/Layout"
import styles from './details.module.css'
import { getSingleMovie } from '../../utils/omdb-requests'
import { useParams } from "react-router-dom"
import userContext from "../../Context/user-context"
import { addToList, removeFromList } from '../../utils/firebase-requests'
import { checkMovie } from '../../utils/checkLists'

const Details = () => {
    const [movie, setMovie] = useState({})
    const params = useParams()
    const { movieID } = params
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [isInWatchlist, setIsInWatchlist] = useState()
    const [isInSeenlist, setIsInSeenlist] = useState()

    const setFlags = async () => {
        let flags = await checkMovie(movieID, userID)
        setIsInWatchlist(flags.isInWatchList)
        setIsInSeenlist(flags.isInSeenlist)
    }

    useEffect(() => {
        setFlags()
    }, [])


    const setState = useCallback(async () => {
        setMovie(await getSingleMovie(movieID))
    }, [movieID])



    useEffect(() => {
        setState()
    }, [setState])

    const record = {
        movieID,
        title: movie.Title,
        poster: movie.Poster
    }


    return (
        <Layout>
            <div className={styles.details}>
                <div className={styles.side}>
                    <img src={movie.Poster} alt=""></img>
                    <p>{movie.Genre}</p>
                    <p>{movie.Runtime}</p>
                    <p>{movie.Year}</p>
                    <p>{movie.Country}</p>

                </div>

                <div className={styles.side}>
                    <h1>{movie.Title}</h1>
                    <div>Ratings</div>
                    <p>PG</p>
                    <p>{movie.Plot}</p>
                    <p>{movie.Director}</p>
                    <p>Writers</p>
                    <p>{movie.Actors}</p>
                    <p>Boxoffice</p>
                    <p>IMDB</p>
                    {!isInWatchlist ? <button onClick={() => { addToList(record, userID, "watchlist"); setIsInWatchlist(true); }}>WATCHLIST</button> : null}
                    {isInWatchlist ? <button onClick={() => { window.confirm("Are you sure you wish to remove movie from watchlist?") && removeFromList(userID, "watchlist", movieID) && setIsInWatchlist(false) }} >REMOVE FROM WATCHLIST</button> : null}
                    {!isInSeenlist ? <button onClick={() => { addToList(record, userID, "seenlist"); setIsInSeenlist(true) }}>SEEN</button> : null}
                    {isInSeenlist ? <button onClick={() => { window.confirm("Are you sure you wish to remove movie from already seen movies?") && removeFromList(userID, "seenlist", movieID) && setIsInSeenlist(false) }}>REMOVE FROM SEENLIST</button> : null}

                </div>
            </div>

        </Layout >

    )
}

export default Details