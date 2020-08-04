import React from 'react'
import styles from './movie-card.module.css'
import { Link } from 'react-router-dom'

const MovieCard = (props) => {
    return (
        <div className={styles.card}>
            <Link to={`/details/${props.movieID}`}> <img alt="pic" className={styles.image} src={props.img} ></img></Link>

            <div>{props.title}</div>
        </div>
    )

}

export default MovieCard