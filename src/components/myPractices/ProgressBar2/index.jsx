import { useRef, useState } from "react";
import { Button, Card, Col, Container, Row, ProgressBar as BarProgress, FormControl, Modal } from "react-bootstrap";
import { ProgressBar2Practica } from "./ProgressBar2";
/* Importamos ProgressBar de reactBootstrap y para que no choque con el nombre del componente le ponemos un alias "as BarProgress"*/

export const ProgressBarPractica = () => {

    const [now, setNow] = useState(0);

    /* nuevo estado con el intervalo para el boton de reset */
    const [intervalState, setIntervalState] = useState(null);

    const [bttnDisable, setBttnDisable] = useState(true);

    const inputRef = useRef(null);

    const [showModal, setShowModal] = useState(false);

    /* manejador de descarga */
    const handleDownload = () => {

    const valueInput = parseInt(inputRef.current?.value); /* inputRef.current? => pregunta si existe / deja de ser nulo */
    const isValueValid = !isNaN(valueInput) && valueInput > 0 && valueInput <= 100;/* validación del número ingresado */
    setShowModal(!isValueValid);

    if(intervalState) {
        /* si hay un intervalo ejecutandose / existente */
        clearInterval(intervalState);
    }

    if(isValueValid) {
        
        let interval = setInterval(() => {
            setNow((now) => {
                /* se necesita el callback para ir actualizando el estado y no pierda el número / va a ir retornando now en el estado que se encuentre */
                if (now === valueInput) {
                    clearInterval(interval);
                    return now;
                }
                /* va actualizando el valor de now cada 1seg */
                return now + 1;
            });
        }, 1000);
        setIntervalState(interval);
    } else {
        handleReset();
    }

    };

    const handleReset = () => {
        clearInterval(intervalState);
        setNow(0);
    };

    const handleChange = ({target: { value }}) => {
        /* 
        console.log(event.target.value); 
        console.log(value);
        console.log(+value);
        console.log(!+value);
        console.log(!!+value);
        console.log(!!!+value);
        */
        setBttnDisable(!!!+value)
    }

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={12} lg={{span: 8, offset: 2}} className="text-center">
                <Card style={{ width: '40rem' }} className="m-auto">
                <Card.Body>
                    <Card.Title>ProgressBar</Card.Title>
                    <BarProgress 
                    animated 
                    now={now} 
                    label={`${now}%`} 
                    variant='danger' 
                    
                    />

                    <ProgressBar2Practica now={now} label={`${now}%`}/>

                    <FormControl
                    ref={inputRef}
                    placeholder="Ingresar tiempo de descarga"
                    className="my-3"
                    onChange={handleChange}
                    >
                    
                    </FormControl>
                    <Button 
                    variant="primary" 
                    onClick={handleDownload} 
                    className="mx-1"
                    disabled={bttnDisable}
                    >Descargar</Button>
                    <Button variant="danger" onClick={handleReset}>Reiniciar</Button>
                </Card.Body>
                </Card>
                </Col>

            </Row>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                    <h2 className="text-danger text-center py-4">ERROR.. ❌</h2>
                    <p className="text-muted fs-4 text-center">
                        Solo se acepta valores numéricos. El valor debe ser entre 1 y 100.
                    </p>
                    </>
                </Modal.Body>
            </Modal>
        </Container>
    );
};
