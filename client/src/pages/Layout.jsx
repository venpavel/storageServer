import React from 'react';
import {Outlet} from "react-router-dom";
import NavbarSt from "../components/NavbarSt";

const Layout = () => {
    return (
        <div className="App">
            <NavbarSt/>
            <Outlet />
        </div>
    );
};

export default Layout;