import React from 'react'
import styles from './movie-card.module.css'

const MovieCard = (props) => {
    return (
        <div className={styles.card}>
            <img alt="pic" className={styles.image} src={props.img} ></img>
            <div>{props.title}</div>
        </div>
    )

}

export default MovieCard