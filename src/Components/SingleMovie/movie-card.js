import React from 'react'
import styles from './movie-card.module.css'
import { Link } from 'react-router-dom'

const MovieCard = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.buttons}>
                <button>ADD TO WATCHLIST</button>
                <button>MARK AS WATCHED</button>

            </div>

            <Link to={`/details/${props.movieID}`}> <img alt="pic" className={styles.image} src={props.img} ></img></Link>

            <div className={styles.title}>{props.title}</div>

        </div>
    )

}

export default MovieCard