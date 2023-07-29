import React from 'react';
import {Button, Table} from "react-bootstrap";

const FileListItem = ({files, offset, handleClick, handleDelete, handleOpen, buttonsDisabled, caption}) => {
    return (
        <Table striped bordered hover variant="light" className="caption-top">
            {caption && <caption>{caption}</caption>}
            <thead>
            <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Версия</th>
                <th>Кем создан</th>
                <th>Кем изменен</th>
                <th>Когда создан</th>
                <th>Изменен</th>
            </tr>
            </thead>
            <tbody>
            {files.map((file, index) =>
                <tr key={file.id}>
                    <td>{offset + index + 1}</td>
                    <td className="d-flex">
                        <div className="me-auto">{file.name}</div>
                        <div className="mr-1">
                            <Button type="button" size="sm" variant="outline-light" className="me-1"
                                    disabled={buttonsDisabled}
                                    onClick={() => handleClick(file.id)}>
                                <i className="bi-folder2-open"
                                   style={{color: "black", fontSize: "1rem"}}
                                   role="button"
                                />
                            </Button>
                            <Button type="button"
                                    size="sm"
                                    variant="outline-light"
                                    className="me-1"
                                    disabled={buttonsDisabled}
                                    onClick={() => handleOpen(file.id, file.name)}>
                                <i className="bi-cloud-download"
                                   style={{color: "black", fontSize: "1rem"}}
                                   role="button"
                                />
                            </Button>
                            <Button type="button" size="sm" variant="outline-light" className="me-1"
                                    disabled={buttonsDisabled}
                                    onClick={() => handleDelete(file.id)}>
                                <i className="bi-trash"
                                   style={{color: "black", fontSize: "1rem"}}
                                   role="button"
                                />
                            </Button>
                        </div>
                    </td>
                    <td>{file.version}</td>
                    <td>{file.creator.name} {file.creator.lastname}</td>
                    <td>{file.editor.name} {file.editor.lastname}</td>
                    <td>{file.createdAt}</td>
                    <td>{file.updatedAt}</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default FileListItem;