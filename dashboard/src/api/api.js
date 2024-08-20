import axios from "axios";
const api = axios.create({
  baseURL: "https://shining-api.onrender.com",
});
export default api;
