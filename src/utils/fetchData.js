import axios from 'axios'

const TMDB_TOKEN = import.meta.env.VITE_TMDB_API
const BASE_URL = "https://api.themoviedb.org/3/"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN
}

const fetchData = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export default fetchData