import React from 'react';
import {Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const Files = () => {


    return (
        <Container>
            <Row>
                <Col md={12} className="mt-2">
                    {/*<h5 style={{fontSize: "1.2rem"}}>Общие ф-ии секции файлов</h5>*/}
                </Col>
            </Row>
            <Outlet/>
        </Container>
    );
};

export default Files;