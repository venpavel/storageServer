import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import {authRoutes, publicRoutes} from "./routes";
import {AppContext} from "../context";
import FileInfo from "../pages/FileInfo";
import Files from "../pages/Files";
import FilesList from "../pages/FilesList";

const AppRouter = () => {
    const {user} = useContext(AppContext);
    return (
        user.isAuth
            ?
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    {authRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.element}/>
                    )}
                    {/*<Route path="fileinfo" element={<FileInfo/>}>*/}
                    {/*    <Route path=":id" element={<FileInfo/>}/>*/}
                    {/*</Route>*/}
                    <Route path="files" element={<Files/>}>
                        <Route index element={<FilesList/>}/>
                        <Route path=":id" element={<FileInfo/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/"/>}/>
                </Route>
            </Routes>
            :
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    {publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.element}/>
                    )}
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Route>
            </Routes>
    );
};

export default AppRouter;