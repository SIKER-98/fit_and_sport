import axios from './axiosHelper'

async function fetchExercises() {
    const api = 'api/exercises'

    let status = 0;
    let exercises = []

    await axios.get(api)
        .then(res => {
            status = res.status
            exercises = res.data
        })
        .catch(e => {
            status = e.status
        })

    return {status, exercises}
}

export {fetchExercises}
