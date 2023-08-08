import React, {useEffect, useState} from 'react';

import {Button, Card, Col, Container, ListGroup, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getFileInfo, openFile, removeFile} from "../API/fileAPI";
import FileListItem from "../components/FileListItem";
import FileInfoCard from "../components/FileInfoCard";
import ToastBottomInfo from "../components/ToastBottomInfo";
import {useRequest} from "../hooks/useRequest";

const FileInfo = () => {
    const {id} = useParams();

    const [file, setFile] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getFileInfo(id)
            .then((data) => {
                setFile(data);
            })
            .catch(e => console.log(e));
    }, []);

    const [removeFileH, remButtonsDisabled, remFileError, setRemFileError] = useRequest(async (id) => {
        await removeFile(id);
        setToastTitle('Документ успешно удален!');
        setShowToast(true);
        setTimeout(() => {
                navigate('..');
            }
            , 2000);
    });

    const [openFileH, opnButtonsDisabled, opnFileError, setOpnFileError] = useRequest(async (id, name) => {
        await openFile(id, name);
        setToastTitle('Документ успешно открыт!');
        setShowToast(true);
    });

    if (!file) {
        return <Spinner/>
    }

    return (
        <Container>
            <Row className="mt-2 mb-3">
                <Col>
                    <Button as={Link} to="../" variant="secondary">Назад</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={8} className="mb-3">
                    <FileInfoCard file={file}/>
                </Col>
                <Col md={4} className="mb-3 justify-content-end">
                    <Card style={{width: 'auto', minWidth: '15rem'}}>
                        <Card.Img variant="top" src=""/>
                        <Card.Body>
                            <Card.Title>Выберите действие над документом</Card.Title>
                        </Card.Body>
                        {remButtonsDisabled || opnButtonsDisabled
                            ?
                            <Spinner animation="grow"/>
                            :
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    <Button
                                        variant="success"
                                        className="w-50"
                                        disabled={opnButtonsDisabled}
                                        onClick={() => openFileH(file.id, file.name)}
                                    >Открыть</Button>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button
                                        variant="danger"
                                        className="w-50"
                                        disabled={remButtonsDisabled}
                                        onClick={() => removeFileH(file.id)}
                                    >
                                        <span>Удалить</span>
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        }
                    </Card>
                </Col>
            </Row>
            {/* TODO: раздел версии в инфо о документе*/}
            <Row className="mt-2 mb-3">
                <Col md={12}>
                    <FileListItem
                        caption="Версии документа"
                        files={[]}
                        handleClick={() => {
                        }}
                        handleDelete={() => {
                        }}
                    />
                </Col>
            </Row>
            <ToastBottomInfo show={showToast} setShow={setShowToast} title={toastTitle}/>
            {(remFileError) &&
                <ToastBottomInfo
                    show={!!remFileError}
                    setShow={setRemFileError}
                    title={remFileError}
                    variant="danger"
                    delay={5000}
                />
            }
            {(opnFileError) &&
                <ToastBottomInfo
                    show={!!opnFileError}
                    setShow={setOpnFileError}
                    title={opnFileError}
                    variant="danger"
                    delay={5000}
                />
            }
        </Container>
    );
};

export default FileInfo;