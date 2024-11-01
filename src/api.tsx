import axios, { InternalAxiosRequestConfig } from "axios"
import store from "../redux/store"


let apiwithtoken = axios.create({
    baseURL: "https://backend.dejaneesconcepts.com.ng/",
    
})
let api = axios.create({
    baseURL: "https://backend.dejaneesconcepts.com.ng/",
    
})

apiwithtoken.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store?.getState()?.user?.token?.access;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})







export  {apiwithtoken, api}