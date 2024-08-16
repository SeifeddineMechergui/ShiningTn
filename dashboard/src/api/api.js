import axios from 'axios'
const api = axios.create({
    baseURL: 'https://shining-tn.vercel.app/api'
})
export default api