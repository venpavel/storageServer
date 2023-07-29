import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

const ToastBottomInfo = ({title, show, setShow, variant = 'light', delay = 2000}) => {
    return (
        <ToastContainer position="bottom-end" className="p-3" style={{zIndex: 1}}>
            <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={delay} autohide>
                <Toast.Header>
                    <strong className="me-auto">storage server</strong>
                    <small>сейчас</small>
                </Toast.Header>
                <Toast.Body>{title}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastBottomInfo;