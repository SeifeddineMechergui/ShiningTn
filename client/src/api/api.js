import axios from 'axios'
const local = 'https://shining-tn.vercel.app'
const production = ''
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api