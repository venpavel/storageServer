import React, {useContext, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {AppContext} from "../context";
import {login} from "../API/userAPI";
import {useNavigate} from "react-router-dom";
import {FILES_ROUTE} from '../config';

const Login = () => {
    const {user} = useContext(AppContext);
    // TODO: перевести на объект loginData
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const data = await login(email, password);
            user.setCurrent(data);
            user.setIsAuth(true);
            navigate(FILES_ROUTE);
        } catch (e) {
            // TODO: Обработчик ошибок
            console.log(e.response);
            throw new Error(e.response.data.message)
        }
    };

    return (
        <Container className="d-flex align-items-center m-auto" style={{maxWidth: "370px", height: "90vh"}}>
            <Row>
                <Col>
                    <Form>
                        <i className="bi-archive mb-4" style={{color: "black", fontSize: "3rem"}} role="img"></i>
                        <h1 className="h3 mb-3 fw-normal">Введите учетные данные</h1>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email адрес"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="name@server.ru"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Пароль">
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        <Form.Check
                            className="my-3"
                            type="switch"
                            id="custom-switch"
                            label="Запомнить меня"
                        />

                        <Button variant="dark" className="w-100 py-2" type="submit" onClick={handleLogin}>
                            Войти
                        </Button>
                        <p className="mt-5 mb-3 text-body-secondary">© 2022–2023</p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
