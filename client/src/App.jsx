import React, {useEffect, useState} from 'react';
import AppRouter from "./routes/AppRouter";
import {AppContext} from './context/index'
import {BrowserRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {check, logout} from "./API/userAPI";
import {LOGIN_ROUTE} from './config'
import {Spinner} from "react-bootstrap";

function App() {

    const initialAuth = () => {
        const accessToken = localStorage.getItem('accessToken');
        return !!accessToken;
    };
    const initialUser = () => {
        const accessToken = localStorage.getItem('accessToken');
        return accessToken ? jwt_decode(accessToken) : {};
    };

    const [isAuth, setIsAuth] = useState(false);
    const [current, setCurrent] = useState(initialUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('initial auth = ', initialAuth());
        if(!initialAuth()) {
            setIsLoading(false);
            return;
        }
        check()
            .then((data) => {
                setCurrent(data);
                setIsAuth(true);
            })
            .catch(async (e) => {
                setIsAuth(false);
                setCurrent({});
                localStorage.removeItem('accessToken');
                await logout();
                location.href = LOGIN_ROUTE;
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading){
        return <Spinner/>;
    }

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
