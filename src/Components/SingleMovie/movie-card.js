import React, { useContext } from 'react'
import styles from './movie-card.module.css'
import { Link } from 'react-router-dom'
import { addToList } from '../../utils/firebase-requests'
import userContext from '../../Context/user-context'

const MovieCard = (props) => {
    
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
   
    
    const record = {
        movieID: props.movieID,
        title: props.title,
        poster: props.img
    }

    return (
        <div className={styles.card}>
            <div className={styles.buttons}>
                <button onClick={() => addToList(record, userID, "watchlist")}>ADD TO WATCHLIST</button>
                <button onClick={() => addToList(record, userID, "seenlist")}>MARK AS WATCHED</button>
           
            </div>

            <Link to={`/details/${props.movieID}`}> <img alt="pic" className={styles.image} src={props.img} ></img></Link>

            <div className={styles.title}>{props.title}</div>

        </div>
    )

}

export default MovieCard