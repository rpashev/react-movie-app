import React, { useState, useEffect, useCallback, useContext } from "react"
import Layout from "../../Components/Layout/Layout"
import styles from './details.module.css'
import { getSingleMovie } from '../../utils/omdb-requests'
import { useParams } from "react-router-dom"
import userContext from "../../Context/user-context"
import { addToList, removeFromList } from '../../utils/firebase-requests'
import { useCheckMovie } from '../../CustomHooks/useCheckMovie'


const Details = () => {
    const [movie, setMovie] = useState({})
    const params = useParams()
    const { movieID } = params
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid

    const setState = useCallback(async () => {
        setMovie(await getSingleMovie(movieID))
    }, [movieID])

    const { isInSeenlist, isInWatchlist } = useCheckMovie(movieID, userID)


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
                    {!isInWatchlist ? <button onClick={() => addToList(record, userID, "watchlist")} onClick={() => console.log(isInWatchlist)}>WATCHLIST</button>
                        : <button onClick={() => removeFromList(userID, "watchlist", movieID)}>REMOVE FROM WATCHLIST</button>}
                    {!isInSeenlist ? <button onClick={() => addToList(record, userID, "seenlist")}>SEEN</button>
                        : <button onClick={() => removeFromList(userID, "seenlist", movieID)}>REMOVE FROM SEENLIST</button>}



                </div>
            </div>

        </Layout >

    )
}

export default Details