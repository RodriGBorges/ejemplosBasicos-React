import { Col, Container, Row, Button, Toast } from "react-bootstrap";
import { useState } from "react";


export const ShowHideMessage = () => {

    const [show, setShow] = useState(false);

    const handleShowMessage = () => {
        setShow(!show)
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={12} lg={{span: 6, offset: 3}} className="text-center">
                <Button className="mb-2" variant={show ? 'danger' : 'success'} onClick={handleShowMessage}>
                    {show ? 'Ocultar' : 'Mostrar'} mensaje
                </Button>
                <Toast show={show} onClose={handleShowMessage} className="m-auto">
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">ReactJS</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Primer clase!!</Toast.Body>
                </Toast>
                </Col>
            </Row>
        </Container>
    );
};
