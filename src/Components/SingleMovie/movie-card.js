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

    const setFlag = async () => {
        let flags = await checkMovie(props.movieID, userID)
        setIsInWatchlist(flags.isInWatchList)
    }

    useEffect(() => {
        setFlag()
    }, [])

    const record = {
        movieID: props.movieID,
        title: props.title,
        poster: props.img
    }

    return (
        <div className={styles.card}>
            <div className={styles.buttons}>


            </div>

            <Link to={`/details/${props.movieID}`}> <img alt="pic" className={styles.image} src={props.img} ></img></Link>
           {!isInWatchlist ? <img title = "Add to watchlist" onClick={() => addToList(record, userID, "watchlist") && setIsInWatchlist(true)}  className={styles.add} src='./add.png' alt='pic' />
        : <img title = "Movie is in watchlist!"  className={styles.add} src='./tick.png' alt='pic' />} 
            <div className={styles.title}><p>{props.title}</p></div>

        </div>
    )

}
// <button onClick={() => addToList(record, userID, "watchlist")}>ADD TO WATCHLIST</button>
//                 <button onClick={() => addToList(record, userID, "seenlist")}>MARK AS WATCHED</button>


export default MovieCard