import React, { useState, useEffect, useCallback } from "react"
import Layout from "../../Components/Layout/Layout"
import styles from './details.module.css'
import { getSingleMovie } from '../../utils/omdb-requests'
import { useParams } from "react-router-dom"


const Details = () => {
    const [movie, setMovie] = useState({})
    const params = useParams()

    const setState = useCallback(async () => {
        setMovie(await getSingleMovie(params.movieID))
    }, [params])

    useEffect(() => {
        setState()

    }, [setState])

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
                    <button>WATCHLIST</button>
                    <button>SEEN</button>

                </div>
            </div>

        </Layout>

    )
}
export default Details