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
        if(isLoading === true && query !== ''){
            return <Loader />
        }
        if (filteredMovies) {
            return filteredMovies.map(movie => {
                return <MovieCard key={movie.imdbID} title={movie.Title} img={movie.Poster} movieID={movie.imdbID} />
            })
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