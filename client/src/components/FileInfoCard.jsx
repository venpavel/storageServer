import React from 'react';
import {Card, ListGroup} from "react-bootstrap";

const FileInfoCard = ({file}) => {
    return (
        <Card style={{width: '25rem'}}>
            <Card.Img variant="top" src=""/>
            <Card.Body>
                <Card.Title>{file.name}</Card.Title>
                <Card.Text>
                    {/* TODO: добавить поле описание*/}
                    Описание документа
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Создан:</div>
                    <div className="mr-1 fw-medium">{file.createdAt}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Кем создан:</div>
                    <div className="mr-1 fw-medium">{file.creator.name} {file.creator.lastname}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Изменен:</div>
                    <div className="mr-1 fw-medium">{file.updatedAt}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Кем изменен:</div>
                    <div className="mr-1 fw-medium">{file.editor.name} {file.editor.lastname}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Текущая версия:</div>
                    <div className="mr-1 fw-medium">{file.version}</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                    <div className="me-auto">Зарезервирован:</div>
                    <div className="mr-1 fw-medium">{file.reserved ? 'Да' : 'Нет'}</div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default FileInfoCard;