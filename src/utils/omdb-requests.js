// import axios from 'axios'
// export const getFilteredMovies = async (query) => {

//     let response = await axios.get(`http://www.omdbapi.com/?apikey=6b7999b9&s=${query}`)
//     let data = await response.data
//     let apimovies = data.Search
//     return apimovies
// }


import axios from 'axios'
export const getFilteredMovies = async (query) => {

    let response = await axios.get(`http://www.omdbapi.com/?apikey=6b7999b9&s=${query}`)
    let data = await response.data
    return data.Search
    // let apimovies = data.Search
    // return apimovies
}


