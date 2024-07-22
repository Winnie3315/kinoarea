import axios from "axios"

const base = import.meta.env.VITE_BASE_URL
const apiKey = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2U2NzIyZDhmZmNmNzRkODllZjA0NDdiYzZhMTE3MiIsInN1YiI6IjY2MDg0ZmRlOGEwZTliMDE0OTRjODA5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GqI0pjw5wdAQA0bwTl5N2-AlXMUS-QObkcyDtJRa1is'
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