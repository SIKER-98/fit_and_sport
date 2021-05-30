import axios from "./axiosHelper";

async function addRun(userId, distance, time) {
    const api = 'api/runs/add'

    let status = 0
    let data = []

    await axios.post(api, {}, {
        params: {
            userId,
            distance,
            time
        }
    }).then(res => {
        // console.log(res)
        data = res.data
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return {status, data}
}

async function deleteRun(runScoreId) {
    const api = 'api/runs/delete'

    let status

    await axios.delete(api, {
        params: {
            runScoreId
        }
    }).then(res => {
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status
}

// TODO: edycja statystyki biegowej
async function updateRun(userId, runScoreId, distance, time) {
    const api = 'api/runs/update'
}

async function getUserRuns(userId) {
    const api = 'api/runs/user'

    let status = 0
    let data = []

    await axios.get(api, {
        params: {
            userId
        }
    }).then(res => {
        // console.log(res)
        data = res.data
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return {status, data}
}

async function getAnalize(userId, runScoreId) {
    const api = 'api/runs/analize'

    let status = 0
    let comment = 'No premium user'

    await axios.get(api, {
        params: {
            userId,
            runScoreId
        }
    }).then(res => {
        // console.log(res.data.message)
        status = res.status
        comment = res.data.message
    }).catch(e => {
        status = e.status
    })

    return {status, comment}
}

export {addRun, deleteRun, updateRun, getUserRuns, getAnalize}
