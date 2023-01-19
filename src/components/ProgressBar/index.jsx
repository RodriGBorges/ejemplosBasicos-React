import { useRef, useState } from "react";
import { Button, Card, Col, Container, Row, ProgressBar as BarProgress, FormControl } from "react-bootstrap";
/* Importamos ProgressBar de reactBootstrap y para que no choque con el nombre del componente le ponemos un alias "as BarProgress"*/

export const ProgressBar = () => {

    const [now, setNow] = useState(0);
    const inputRef = useRef(null);

    /* manejador de descarga */
    const handleDownload = () => {

    const valueInput = inputRef.current?.value; /* inputRef.current? => pregunta si existe / deja de ser nulo */
    const interval = setInterval(() => {
        setNow((now) => {
            /* se necesita el callback para ir actualizando el estado y no pierda el número / va a ir retornando now en el estado que se encuentre */
            if (now === parseInt(valueInput)) {
                clearInterval(interval);
                return now;
            }
            /* va actualizando el valor de now cada 1seg */
            return now + 1;
        });
    }, 1000);
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={12} lg={{span: 8, offset: 2}} className="text-center">
                <Card style={{ width: '40rem' }} className="m-auto">
                <Card.Body>
                    <Card.Title>ProgressBar</Card.Title>
                    <BarProgress animated now={now} label={`${now}%`} variant='danger' />
                    <FormControl
                    ref={inputRef}
                    placeholder="Ingresar tiempo de descarga"
                    className="my-3"
                    >
                    
                    </FormControl>
                    <Button variant="primary" onClick={handleDownload}>Descargar</Button>
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
};
