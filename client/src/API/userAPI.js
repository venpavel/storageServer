import jwt_decode from "jwt-decode";
import {hostAPI} from './rootAPI';

export const userApiRoutes = {
    login: {method: 'post', path: 'users/login'},
    logout: {method: 'post', path: 'users/logout'},
    auth: {method: 'post', path: 'users/auth'},
    refresh: {method: 'get', path: 'users/refresh'}
}

export const login = async (email, password) => {
    const {data} = await hostAPI.post(userApiRoutes.login.path, {
        email,
        password
    });
    const decoded = jwt_decode(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);

    // console.log('-----login func-----');
    // console.log(decoded);
    // console.log('--- accessToken----');
    // console.log(data.accessToken);
    // console.log('-----login func end-----');
    return decoded;
}

export const logout = async () => {
    const result = await hostAPI.post(userApiRoutes.logout.path);
    return result;
}

export const check = async () => {
    // console.log('-----check func-----');

    const {data} = await hostAPI.get(userApiRoutes.refresh.path);
    const decoded = jwt_decode(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);

    // console.log(decoded);
    // console.log('--- accessToken----');
    // console.log(data.accessToken);
    // console.log('-----check func end-----');
    return decoded;
}
