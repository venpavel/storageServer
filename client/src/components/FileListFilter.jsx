import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import StSelect from "./UI/select/StSelect";

const FileListFilter = ({filter, setFilter}) => {
    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Поиск по имени документа</Form.Label>
                            <Form.Control
                                type="text"
                                value={filter.query}
                                onChange={(e) => setFilter({...filter, query: e.target.value})}
                                placeholder="Введите часть имени..."
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Сортировка по:</Form.Label>
                            <StSelect
                                options={[
                                    {value: 'name', name: 'По названию'},
                                    {value: 'createdAt', name: 'В начале новые'}
                                ]}
                                defaultValue="Сортировка по"
                                value={filter.sortBy}
                                onChange={(res) => setFilter({...filter, sortBy: res})}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default FileListFilter;