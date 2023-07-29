import React from 'react';
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const NoMatch = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Нет такой страницы</h2>
                    <p>
                        <Link to="/">Перейти на главную</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default NoMatch;