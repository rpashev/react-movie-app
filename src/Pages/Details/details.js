import React, { useState, useEffect, useCallback, useContext } from "react"
import Layout from "../../Components/Layout/Layout"
import styles from './details.module.css'
import { getSingleMovie } from '../../Services/omdb-requests'
import { useParams } from "react-router-dom"
import userContext from "../../Context/user-context"
import { addToList, removeFromList } from '../../Services/firebase-requests'
import { checkMovie } from '../../utils/checkLists'
import Loader from "../../Components/Loader/loader"

const Details = () => {
    const [movie, setMovie] = useState({})
    const params = useParams()
    const { movieID } = params
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [isInWatchlist, setIsInWatchlist] = useState()
    const [isInSeenlist, setIsInSeenlist] = useState()
    const [isLoading, setIsLoading] = useState(true)


    const setFlags = async () => {
        let flags = await checkMovie(movieID, userID)
        setIsInWatchlist(flags.isInWatchList)
        setIsInSeenlist(flags.isInSeenlist)
        setIsLoading(false)
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
    
    let ratings
    if (movie.Ratings) {
        ratings = movie.Ratings.map(el => el.Value)
    }

    if (isLoading) {
        return <Loader />
    } else {
        return (
            <Layout>
                <div className={styles.details}>
                    <div className={styles.leftside}>
                        <img src={movie.Poster} alt=""></img>
                        <p>Genre: {movie.Genre}</p>
                        <p>Runtime: {movie.Runtime}</p>
                        <p>Year: {movie.Year}</p>


                    </div>

                    <div className={styles.rightside}>
                        <h1>{movie.Title}</h1>
                        {ratings ? <div className={styles.ratings}>
                            <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
                                <img title="View on IMDB" className={styles.img} alt="pic" src='/imdb2.png' />
                            </a>
                            <p className={styles.rating} className={styles.imdb}>
                                {ratings[0]}
                            </p>
                            <p className={styles.rating}>Rotten Tomatoes: {ratings[1]}</p>
                            <p className={styles.rating}>Metacritic: {ratings[2]}</p>
                        </div> : null}
                        <p>{movie.Plot}</p>
                        <p>Director: {movie.Director}</p>
                        <p>Writer: {movie.Writer}</p>
                        <p>Stars: {movie.Actors}</p>
                        <p>Boxoffice: {movie.BoxOffice}</p>
                        <p>Country: {movie.Country}</p>
                        <div className={styles.buttons}>

                            {!isInWatchlist ? <button className={styles.addButtonWatch} onClick={() => { addToList(record, userID, "watchlist") && setIsInWatchlist(true) }}>ADD TO WATCHLIST</button> : null}
                            {isInWatchlist ? <button className={styles.removeButton} onClick={() => { window.confirm("Are you sure you wish to remove movie from watchlist?") && removeFromList(userID, "watchlist", movieID) && setIsInWatchlist(false) }} >REMOVE FROM WATCHLIST</button> : null}
                            {!isInSeenlist ? <button className={styles.addButtonSeen} onClick={() => { addToList(record, userID, "seenlist") && setIsInSeenlist(true) }}>ADD TO ALREADY WATCHED</button> : null}
                            {isInSeenlist ? <button className={styles.removeButton} onClick={() => { window.confirm("Are you sure you wish to remove movie from already seen movies?") && removeFromList(userID, "seenlist", movieID) && setIsInSeenlist(false) }}>REMOVE FROM WATCHED</button> : null}
                        </div>

                    </div>
                </div>

            </Layout >

        )
    }

}

export default Details