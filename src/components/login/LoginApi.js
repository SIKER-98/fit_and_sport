import axios from "../../api/axiosHelper";

async function loginUser(nickname, password) {
    const api = 'api/users/login'

    let status = 0;
    let id = 0

    await axios.post(api, {}, {
        params: {
            nickname: nickname,
            password: password
        }
    }).then(res => {
        console.log(res)
        status = res.status
        id = res.data

    }).catch(e => {
        status = e.response.status
    })

    return {
        status: status,
        id: id
    }
}

export {loginUser};
