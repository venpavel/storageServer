import jwt_decode from "jwt-decode";
import {hostAPI, hostSecureAPI} from './rootAPI';

const userApiRoutes = {
    login: {method: 'post', path: 'users/login'},
    auth: {method: 'post', path: 'users/auth'},
}

export const login = async (email, password) => {
    const {data} = await hostAPI.post(userApiRoutes.login.path, {
        email,
        password
    });
    const decoded = jwt_decode(data.token);
    localStorage.setItem('storagefToken', data.token);

    // console.log('-----login func-----');
    // console.log(decoded);
    // console.log('--- token----');
    // console.log(data.token);
    // console.log('-----login func end-----');
    return decoded;
}

export const check = async () => {
    const {data} = await hostSecureAPI.post(userApiRoutes.auth.path);
    const decoded = jwt_decode(data.token);
    localStorage.setItem('storagefToken', data.token);

    // console.log('-----check func-----');
    // console.log(decoded);
    // console.log('--- token----');
    // console.log(data.token);
    // console.log('-----check func end-----');
    return decoded;
}