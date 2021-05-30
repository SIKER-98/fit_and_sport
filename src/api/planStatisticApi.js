import axios from './axiosHelper'

//TODO: pobranie statystyk dla planu
async function getStatisticToPlan() {

}

//TODO: dodawanie statystyki dla planu
async function addStatisticToPlan(exerciseId, planExerciseId, repetitions, series) {
    const api = 'api/exerciseStatistics/add'

    let status = 0

    await axios.get(api, {
        params: {
            exerciseId,
            planExerciseId,
            repetitions,
            series
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status
}


//TODO: usuwanie statystykid dla planu
async function deleteStatisticFromPlan(exerciseStatisticId) {
    const api = 'api/exerciseStatistics/delete'

    let status = 0

    await axios.delete(api, {
        params: {
            exerciseStatisticId
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status
}

//TODO: aktualizowanie statystyki dla planu
async function updateStatisticInPlan(exerciseStatisticId, repetitions, series) {
    const api = 'api/exerciseStatistics/update'

    let status = 0

    await axios.put(api, {}, {
        params: {
            exerciseStatisticId,
            repetitions,
            series
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status
}

export {addStatisticToPlan, deleteStatisticFromPlan, updateStatisticInPlan,getStatisticToPlan}
