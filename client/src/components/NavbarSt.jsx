import React, {useContext} from "react";
import {Button, ButtonGroup, Container, Nav, Navbar} from "react-bootstrap";
import {AppContext} from "../context";
import {NavLink} from "react-router-dom";
import {ABOUT_ROUTE, LOGIN_ROUTE, FILES_ROUTE} from '../config'

const NavbarSt = () => {
    const {user} = useContext(AppContext);

    const logout = (e) => {
        e.preventDefault();
        user.setIsAuth(false);
        user.setCurrent({});
        localStorage.removeItem('storagefToken');
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <i className="bi-archive" style={{color: "white"}} role="img"></i>
                </Navbar.Brand>
                <Nav className="me-auto">
                    {user.isAuth
                        ?
                        <>
                            <NavLink to={ABOUT_ROUTE} className="nav-link">О сервисе</NavLink>
                            <NavLink to={FILES_ROUTE} className="nav-link">Файлы</NavLink>
                            <NavLink to="/admin" className="nav-link">Админ панель</NavLink>
                        </>
                        :
                        <NavLink to={ABOUT_ROUTE} className="nav-link">О сервисе</NavLink>
                    }
                </Nav>
                <div className="col-md-5 text-end">
                    {user.isAuth
                        ?
                        <ButtonGroup>
                            {/* TODO: Переход на страницу пользователя */}
                            <Button type="button" variant="outline-light" className="me-2" >{user.current?.name}</Button>
                            <Button type="button" variant="outline-danger" className="me-2" onClick={logout}>Выйти</Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup>
                            <Button as={NavLink} to={LOGIN_ROUTE} type="button" variant="outline-light" className="me-2">Войти</Button>
                            <Button type="button" variant="light">Зарегистрироваться</Button>
                        </ButtonGroup>
                    }
                </div>
            </Container>
        </Navbar>
    );
};

export default NavbarSt;
