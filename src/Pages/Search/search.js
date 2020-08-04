import React, { useState, useEffect, useCallback } from "react"
import Layout from "../../Components/Layout/Layout"
import MovieCard from "../../Components/SingleMovie/movie-card"
import styles from './search.module.css'
// import axios from 'axios'
import { getFilteredMovies } from '../../utils/omdb-requests'

const Search = () => {
    const [query, setQuery] = useState("")
    const [filteredMovies, setFilteredMovies] = useState([])

    const setMovies = useCallback(async () => {
        setFilteredMovies(await getFilteredMovies(query))
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
        if (filteredMovies) {
            return filteredMovies.map(movie => {
                return <MovieCard key={movie.imdbID} title={movie.Title} img={movie.Poster} />
            })
        } else {
            return 0
        }

    }
    return (
        <Layout>
            <h1>Search</h1>
            <div>
                <input onChange={e => setQuery(e.target.value)}></input>

            </div>

            <div className={styles.list}>
                {renderMovies()}
            </div>

        </Layout >

    )


}

export default Search