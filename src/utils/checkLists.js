import { getUserLists } from '../Services/firebase-requests'

export const checkMovie = async (movieID, userID) => {
    let isInWatchList = false
    let isInSeenlist = false
    try {
        let watchlist = await getUserLists(userID, "watchlist")
        let seenlist = await getUserLists(userID, "seenlist")

        watchlist.forEach(movie => {
            if (movie.movieID === movieID) {
                isInWatchList = true
            } 
        })
        seenlist.forEach(movie => {
            if (movie.movieID === movieID) {
                isInSeenlist = true
            } 
        })
    } catch (err) {
        alert(err)
    }

    return { isInWatchList, isInSeenlist }
}

