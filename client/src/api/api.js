import axios from 'axios'
const local = 'https://shiningtn.onrender.com'
const production = ''
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api