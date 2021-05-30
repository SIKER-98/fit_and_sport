import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44323/',
});

export default instance;
