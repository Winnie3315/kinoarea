import axios from "axios"

const apiKey = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2U2NzIyZDhmZmNmNzRkODllZjA0NDdiYzZhMTE3MiIsInN1YiI6IjY2MDg0ZmRlOGEwZTliMDE0OTRjODA5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GqI0pjw5wdAQA0bwTl5N2-AlXMUS-QObkcyDtJRa1is'
    }
}

export const getData = async (path) => {
    try {
        const res = await axios.get(path, apiKey)

        return res
    } catch(error) {
        alert(error.message)
    }
}