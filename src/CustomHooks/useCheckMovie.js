import React, { useState, useEffect } from 'react'
import { getUserLists } from '../utils/firebase-requests'

export const useCheckMovie = (movieID, userID) => {
    const [isInSeenlist, setIsInSeenlist] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)

    useEffect(() => {
        const listsFunc = async () => {
            try {
                let watchlist = await getUserLists(userID, "watchlist")
                let seenlist = await getUserLists(userID, "seenlist")
                watchlist.forEach(movie => {
                    if (movie.movieID === movieID) {
                        setIsInWatchlist(true)
                    }
                })
                seenlist.forEach(movie => {
                    if (movie.movieID === movieID) {
                        setIsInSeenlist(true)
                    }
                })
            } catch (err) {
                alert(err)
            }
            
        } 
        listsFunc()  
    }, [])
    return { isInSeenlist, isInWatchlist }
}