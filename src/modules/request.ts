import axios from "axios"

const base = import.meta.env.VITE_BASE_URL
const apiKey = {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
}

export const getData = async (path: string): Promise<any> => {
    try {
        const res = await axios.get(base + path, apiKey)

        return res
    } catch(error) {
        return
    }
}