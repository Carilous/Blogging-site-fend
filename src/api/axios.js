import axios from "axios";


const API = axios.create({
  baseURL: " https://blogging-site-bcd-3.onrender.com",
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;