import React, { useState, useEffect, useCallback } from "react"
import Layout from "../../Components/Layout/Layout"
import MovieCard from "../../Components/SingleMovie/movie-card"
import styles from './search.module.css'
import { getFilteredMovies } from '../../utils/omdb-requests'
import Loader from "../../Components/Loader/loader"

const Search = () => {
    const [query, setQuery] = useState("")
    const [filteredMovies, setFilteredMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const setMovies = useCallback(async () => {
        setIsLoading(true)
        setFilteredMovies(await getFilteredMovies(query))
        setIsLoading(false)
    }, [query])

    useEffect(() => {
        let isSubscribed = true

        if (isSubscribed) {
            setMovies()

        }
        return () => {
            isSubscribed = false
        }
    }, [query, setMovies])


    const renderMovies = () => {
        if (isLoading === true && query !== '') {
            return <Loader />
        }
        if(isLoading === false && query ===''){
            return <img className={styles.img} src="./home.png" alt="img" />
        }
        if (filteredMovies) {
            return filteredMovies.map(movie => {
                return <MovieCard key={movie.imdbID} title={movie.Title} img={movie.Poster} movieID={movie.imdbID} />
            })
        }

    }
    return (
        <Layout>
        <div className={styles.container}>
        <h1 className={styles.title}>Search for a movie or TV series here...</h1>
            <div>
                <input className={styles.query} onChange={e => setQuery(e.target.value)}></input>

            </div>

            <div className={styles.list}>
                {renderMovies()}

            </div>
        </div>
            
        </Layout >

    )
}

export default Search