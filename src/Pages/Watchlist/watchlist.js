import React, { useContext, useEffect, useState } from "react"
import Layout from "../../Components/Layout/Layout"
import { getUserLists } from '../../utils/firebase-requests'
import userContext from "../../Context/user-context"
import MovieCard from "../../Components/SingleMovie/movie-card"


const Watchlist = () => {
    const context = useContext(userContext)
    const { user } = context
    const userID = user.uid
    const [watchlist, setWatchlist] = useState([])

    const getWatchlist = async () => {
        let list = await getUserLists(userID, "watchlist")
        setWatchlist(list)
    }

    useEffect(() => {
        getWatchlist()

    }, [])

    const renderMovies = () => {
        if (watchlist.length > 0) {
            return watchlist.map(movie => {
                
                return <MovieCard key={movie.movieID} title={movie.title} img={movie.poster} movieID={movie.movieID} />
               
            })
        } else {
            return <div>NO MOVIES IN LIST YET</div>
        }

    }

    return (
        <Layout>
            <div>
                {renderMovies()}
            </div>
        </Layout>

    )
}

export default Watchlist