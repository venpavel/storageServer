import axios from 'axios';
import {BASE_URL} from '../config'

export const hostAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

export const hostAPIfiles = axios.create({
    baseURL: BASE_URL,
    timeout: 300000,
    responseType: 'blob',
});

export const hostSecureAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

hostSecureAPI.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('storagefToken')}`;
    return config;
});