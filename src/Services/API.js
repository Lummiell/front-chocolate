import axios from 'axios'

const API = axios.create({baseURL:'https://api-chocolate-backend.herokuapp.com/'});

export default API;