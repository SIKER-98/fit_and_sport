import axios from './axiosHelper'

async function createTrainingPlan(planName, description, userId) {
    const api = 'api/plans/add'

    let status;
    let planId;

    await axios.post(api, {}, {
        params: {
            userId,
            planName,
            description,
        }
    }).then(res => {
        // console.log(res)
        status = res.status
        planId = res.data.id
    }).catch(e => {
        // console.log(e)
        status = e.status
    })

    return {status, planId}
}

async function fetchTrainingPlans() {
    const api = 'api/plans'

    let status = 0
    let plans = []

    await axios.get(api)
        .then(res => {
            status = res.status
            plans = res.data
        }).catch(e => {
            status = e.status
        })

    return {status, plans}
}

async function getUserTrainingPlans(userId) {
    const api = 'api/plans/userPlans'

    let status = 0
    let plans = []

    await axios.get(api, {params: {userId}})
        .then(res => {
            // console.log(res.data)
            status = res.status
            plans = res.data
        }).catch(e => {
            status = e.status
        })

    return {status, plans}
}


//TODO: Usuwanie planu
async function deleteTrainingPlan(planId) {
    const api = 'api/plans/delete'

    let status = 0

    await axios.delete(api, {params: {planId}})
        .then(res => {
            // console.log(res)
            status = res.status
        }).catch(e => {
            // console.log(e)
            status = e.status
        })

    return status
}

async function editTrainingPlan(plan) {
    const api = 'api/plans/update'

    let status = 0

    await axios.put(api, {}, {
        params: {
            planId: plan.id,
            planName: plan.planName,
            description: plan.description,
        }
    }).then(res => {
        console.log(res)
        status = res.status
    }).catch(e => {
        status = e.status
    })

    return status
}





export {
    createTrainingPlan,
    deleteTrainingPlan,
    editTrainingPlan,
    fetchTrainingPlans,
    getUserTrainingPlans
}
