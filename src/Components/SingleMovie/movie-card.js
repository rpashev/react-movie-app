import React, { useContext, useState, useEffect } from 'react'
import styles from './movie-card.module.css'
import { Link } from 'react-router-dom'
import { addToList } from '../../utils/firebase-requests'
import userContext from '../../Context/user-context'
import { checkMovie } from '../../utils/checkLists'

const MovieCard = (props) => {

    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [isInWatchlist, setIsInWatchlist] = useState()
    const [isInSeenlist, setIsInSeenlist] = useState()

    const setFlags = async () => {
        let flags = await checkMovie(props.movieID, userID)
        setIsInWatchlist(flags.isInWatchList)
        setIsInSeenlist(flags.isInSeenlist)
    }

    useEffect(() => {
        setFlags()
    }, [])

    const record = {
        movieID: props.movieID,
        title: props.title,
        poster: props.img
    }

    return (
        <div className={styles.card}>
            
            <Link to={`/details/${props.movieID}`}> <img alt="pic" className={styles.image} src={props.img} ></img></Link>
            {!isInWatchlist ? <img title="Add to watchlist" onClick={() => addToList(record, userID, "watchlist") && setIsInWatchlist(true)} className={styles.watchlistIcon} src='add4.png' alt='pic' />
                : <img title="Movie is in watchlist!" className={styles.watchlistIcon} src='./inwatched.svg' alt='pic' />}
            <div className={styles.title}><p>{props.title}</p></div>
            {!isInSeenlist ? <img title="Add to already watched list!" onClick={() => addToList(record, userID, "seenlist") && setIsInSeenlist(true)} className={styles.seenIcon} src='./addtowatched.png' alt='pic' />
                : <img title="Movie is in already watched!" className={styles.seenIcon} src='./tick.png' alt='pic' />}

        </div>
    )
}



export default MovieCard