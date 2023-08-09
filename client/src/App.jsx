import React, {useEffect, useState} from 'react';
import AppRouter from "./routes/AppRouter";
import {AppContext} from './context/index'
import {BrowserRouter} from "react-router-dom";
import jwt from "jwt-decode";
import {check} from "./API/userAPI";
import {LOGIN_ROUTE} from './config'

function App() {

    const initialAuth = () => {
        const token = localStorage.getItem('storagefToken');
        return !!token;
    };
    const initialUser = () => {
        const token = localStorage.getItem('storagefToken');
        return token ? jwt(token) : {};
    };

    const [isAuth, setIsAuth] = useState(initialAuth);
    const [current, setCurrent] = useState(initialUser);

    useEffect(() => {
        console.log('initial auth = ', initialAuth());
        if(!initialAuth()) {
            return;
        }
        check()
            .then((data) => {
                setCurrent(data);
                setIsAuth(true);
            })
            .catch((e) => {
                console.log(e);
                setIsAuth(false);
                setCurrent({});
                localStorage.removeItem('storagefToken');
                location.href = LOGIN_ROUTE;
            });
    }, []);

    return (
        <AppContext.Provider value={{
            user: {
                isAuth,
                setIsAuth,
                current,
                setCurrent
            },
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;



// old fashion with isloading:
//
// const [isLoading, setIsLoading] = useState(true);
// useEffect(() => {
//     console.log('Первичная загрузка. В сторедже isAuth: ', localStorage.getItem('isAuth'));
//     setIsAuth(localStorage.getItem('isAuth') || false);
//     setIsLoading(false);
// }, []);

// return (
//     isLoading
//         ? <Spinner/>
//         : (
//             <AppContext.Provider value={{
//                 isAuth,
//                 setIsAuth
//             }}>
//                 <BrowserRouter>
//                     <AppRouter/>
//                 </BrowserRouter>
//             </AppContext.Provider>
//         )
// );