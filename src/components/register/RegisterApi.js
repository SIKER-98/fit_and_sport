import axios from "../../api/axiosHelper";

async function registerUser(nickname, password, height) {
    const api = 'api/users/register'

    let status = 0;
    let id = 0

    await axios.post(api, {}, {
        params: {
            nickname: nickname,
            password: password,
            height: height,
        }
    }).then(res => {
        status = res.status

    }).catch(e => {
        status = e.response.status
    })

    return {
        status: status,
    }
}

export {registerUser};
