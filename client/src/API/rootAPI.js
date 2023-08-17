import axios from 'axios';
import {BASE_URL} from '../config'

export const hostAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true
});

export const hostAPIfiles = axios.create({
    baseURL: BASE_URL,
    timeout: 300000,
    responseType: 'blob',
    withCredentials: true,
});

export const hostSecureAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
});

hostSecureAPI.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
});

hostSecureAPI.interceptors.response.use(
    (response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true; // если прийдет подряд опять 401.
            try {
                const response = await hostAPI.get(`${BASE_URL}users/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                return hostSecureAPI.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН!');
            }
        }
        throw error;
    }
);
