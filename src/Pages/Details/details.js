import React, { useState, useEffect, useCallback, useContext } from "react"
import Layout from "../../Components/Layout/Layout"
import styles from './details.module.css'
import { getSingleMovie } from '../../utils/omdb-requests'
import { useParams } from "react-router-dom"
import userContext from "../../Context/user-context"
import { addToList } from '../../utils/firebase-requests'
import db from '../../firebase'
import firebase from "firebase/app";


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

    useEffect(() => {
        setState()

    }, [setState])

    const record = {
        [movieID]: {
            title: movie.Title,
            poster: movie.Poster
        }
    }

    const removeFromWatchlist = async () => {
        try {
            await db
                .collection("userData")
                .doc(this.userID)
                .update({
                    toRead: firebase.firestore.FieldValue.arrayRemove(movieID)
                });

        } catch (err) {
            alert(err);
        }
        console.log('haha')
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
                    <button onClick={() => addToList(record, userID, "watchlist")}>WATCHLIST</button>
                    <button onClick={() => addToList(record, userID, "seenlist")}>SEEN</button>
                    <button onClick={() => removeFromWatchlist}>REMOVE FROM WATCHLIST</button>
                    <button>REMOVE FROM SEENLIST</button>

                </div>
            </div>

        </Layout>

    )
}
export default Details