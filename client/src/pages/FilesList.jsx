import React, {useContext, useEffect, useState} from 'react';
import {Col, Form, Row, Spinner} from "react-bootstrap";
import {AppContext} from "../context";
import {useNavigate} from "react-router-dom";
import {getFolderContent, openFile, removeFile} from "../API/fileAPI";
import FileListItem from "../components/FileListItem";
import ToastBottomInfo from "../components/ToastBottomInfo";
import {useRequest} from "../hooks/useRequest";
import {getPageCount} from "../utils/commonMethods";
import PaginationST from "../components/PaginationST";
import FileListFilter from "../components/FileListFilter";
import {useFiles} from "../hooks/useFiles";
import StSelect from "../components/UI/select/StSelect";

const FilesList = () => {
    const {user} = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({sortBy: '', query: ''});

    const [showToast, setShowToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFiles(page, limit);
    }, []);

    const [fetchFiles, filesLoading, fetchFilesError, setFetchFilesError] = useRequest(async (page, limit) => {
        const offset = page * limit - limit;
        const data = await getFolderContent(3, offset, limit);
        console.log('Общее кол-во файлов: ', data.count);
        setFiles(data.rows);
        setTotalPages(getPageCount(data.count, limit));
    });

    const sortedAndFilteredFiles = useFiles(files, filter.sortBy, filter.query);

    const [removeFileH, remButtonsDisabled, remFileError, setRemFileError] = useRequest(async (id) => {
        await removeFile(id);
        setToastTitle('Документ успешно удален!');
        setShowToast(true);
        setFiles([...files.filter(file => file.id !== id)])
    });

    const [openFileH, opnButtonsDisabled, opnFileError, setOpnFileError] = useRequest(async (id, name) => {
        await openFile(id, name);
        setToastTitle('Документ успешно открыт!');
        setShowToast(true);
    });

    const handleClick = (id) => {
        navigate(`${id}`);
    }

    const changePage = (page) => {
        setPage(page);
        fetchFiles(page, limit)
    }

    if (filesLoading) {
        return <Spinner/>
    }

    return (
        <>
            <Row>
                <Col md={12} className="mt-2">
                    <h5 style={{fontSize: "1.2rem"}}>Содержимое каталога пользователя {user.current?.name}.</h5>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mt-2 mb-2">
                    <FileListFilter filter={filter} setFilter={setFilter}/>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mb-1">
                    <FileListItem
                        files={sortedAndFilteredFiles}
                        offset={page * limit - limit}
                        handleClick={handleClick}
                        handleDelete={removeFileH}
                        handleOpen={openFileH}
                        buttonsDisabled={remButtonsDisabled || opnButtonsDisabled}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <PaginationST totalPages={totalPages} page={page} changePage={changePage}/>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Кол-во элементов на странице</Form.Label>
                        <StSelect
                            value={limit}
                            onChange={value => {
                                setLimit(value);
                                setPage(1);
                                fetchFiles(1, value);
                            }}
                            defaultValue="Кол-во элементов на странице"
                            options={[
                                {value: 5, name: '5'},
                                {value: 10, name: '10'},
                                {value: 25, name: '25'},
                                {value: 9999, name: 'Все'},
                            ]}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
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
                    {(fetchFilesError) &&
                        <ToastBottomInfo
                            show={!!fetchFilesError}
                            setShow={setFetchFilesError}
                            title={fetchFilesError}
                            variant="danger"
                            delay={5000}
                        />
                    }
                </Col>
            </Row>
        </>
    );
};

export default FilesList;