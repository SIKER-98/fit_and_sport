import axios from './axiosHelper'

async function getPlanExercises(planId) {
    const api = 'api/plans/getPlanExercises'

    let status = 0;
    let exercises = []

    await axios.get(api, {
        params: {
            planId: planId
        }
    }).then(res => {
        console.log(res)
        status = res.status
        exercises = res.data
    }).catch(e => {
        status = e.status
    })

    return {status, exercises}
}


async function addExerciseToTrainingPlan(planId, exerciseId) {
    const api = 'api/planExercise/add'

    let status = 0
    let data = null

    await axios.post(api, {}, {
        params: {
            exerciseId: exerciseId * 1,
            planId: planId * 1,
            repetitions: 0,
            series: 0,
        }
    }).then(res => {
        console.log(res)
        status = res.status
        data = res.data
    }).catch(e => {
        status = e.status
    })

    return {status, data}
}

//TODO: usuwanie cwiczenia z planu
async function deleteExerciseFromTrainingPlan(id) {
    const api = 'api/planExercise/delete'

    let status = 0

    console.log(id)

    await axios.delete(api, {
        params: {
            planExerciseId: id
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status;
}


//TODO: edycja cwiczenia w planie
async function updateExerciseFromTrainingPlan(planExerciseId, repetitions, series) {
    const api = 'api/planExercise/update'

    let status = 0

    await axios.put(api, {}, {
        params: {
            planExerciseId,
            repetitions,
            series
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status;
}

export {
    getPlanExercises,
    addExerciseToTrainingPlan,
    deleteExerciseFromTrainingPlan,
    updateExerciseFromTrainingPlan,

}
