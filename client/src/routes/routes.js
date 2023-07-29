import React from "react";
import Files from "../pages/Files";
import About from "../pages/About";
import {ABOUT_ROUTE, FILES_ROUTE, LOGIN_ROUTE} from '../config';
import Login from "../pages/Login";

export const authRoutes = [
    {path: ABOUT_ROUTE, element: <About/>},
    // {path: FILES_ROUTE, element: <Files/>},
];

export const publicRoutes = [
    {path: LOGIN_ROUTE, element: <Login/>},
    {path: ABOUT_ROUTE, element: <About/>},
];
