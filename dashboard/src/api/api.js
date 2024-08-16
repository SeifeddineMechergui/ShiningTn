import axios from 'axios'
const api = axios.create({
    baseURL: 'https://shiningtn.onrender.com/api'
})
export default api