import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap';

const oneOrTwoNum = (num) => num > 9 ? num : `0${num}`;

export const StopwatchTimer = () => {
    
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [velocity, setVelocity] = useState(0);
    const [velocityName, setVelocityName] = useState("");

    const [stateIntervalSeconds, setIntervalSeconds] = useState(null);
    const [stateIntervalMinutes, setIntervalMinutes] = useState(null);
    const [stateIntervalHours, setIntervalHours] = useState(null);
    
    const handleStart = () => {


        const intervalHours = setInterval(() => {
            setHours((hrs) => {
                return hrs + 1;
            });
        }, velocity ? (61000 * 60) / velocity : (61000 * 60));
        
        const intervalMinutes = setInterval(() => {
            setMinutes((min) => {
                if(min === 59) {
                    return 0;
                }
                return min + 1;
            });
        }, velocity ? 61000 / velocity : 61000);
        
        const intervalSeconds = setInterval(() => {
            setSeconds((seg) => {
                if(seg === 59) {
                    return 0;
                }
                return seg + 1;
            });
        }, velocity ? 1000 / velocity : 1000);

        setIntervalSeconds(intervalSeconds);
        setIntervalMinutes(intervalMinutes);
        setIntervalHours(intervalHours);

    };

    const handleStop = () => {
        if(stateIntervalSeconds && stateIntervalMinutes && stateIntervalHours) {
            clearInterval(stateIntervalSeconds);
            clearInterval(stateIntervalMinutes);
            clearInterval(stateIntervalHours);
        }

        setIntervalSeconds(null);
        setIntervalMinutes(null);
        setIntervalHours(null);
    };

    const handleReset = () => {
        handleStop();
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    };

    const handleVelocity = (vel = null, velText) => {
        setVelocity(vel);
        handleStop();
        setVelocityName(velText);
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col xs={12} lg={{span: 6, offset: 3}} className="text-center">
                <ButtonGroup aria-label="Basic example" className="d-block my-1">
                        <Button variant="outline-success" onClick={handleStart} disabled={stateIntervalSeconds && stateIntervalMinutes && stateIntervalHours}>Comenzar</Button>
                        <Button variant="outline-danger" onClick={handleStop}>Detener</Button>
                        <Button variant="outline-dark" onClick={handleReset}>Reiniciar</Button>
                </ButtonGroup>
                <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-dark" className={velocityName === "min" && "active"} onClick={() => handleVelocity(0, "min")} >Min</Button>
                        <Button variant="outline-dark" className={velocityName === "x2" && "active"} onClick={() => handleVelocity(2, "x2")} >x2</Button>
                        <Button variant="outline-dark" className={velocityName === "x4" && "active"} onClick={() => handleVelocity(4, "x4")} >x4</Button>
                        <Button variant="outline-dark" className={velocityName === "x6" && "active"} onClick={() => handleVelocity(6, "x6")} >x6</Button>
                        <Button variant="outline-dark" className={velocityName === "max" && "active"} onClick={() => handleVelocity(10, "max")} >Max</Button>
                </ButtonGroup>
                <Card style={{ width: '25rem' }} className="m-auto my-3">
                <Card.Body>
                    <Card.Title>Stopwatch / Timer</Card.Title>
                    <Card.Text>
                    {oneOrTwoNum(hours)} horas - {oneOrTwoNum(minutes)} minutos - {oneOrTwoNum(seconds)} segundos
                    </Card.Text>
                </Card.Body>
                <Card.Footer>{oneOrTwoNum(hours)}:{oneOrTwoNum(minutes)}:{oneOrTwoNum(seconds)}</Card.Footer>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}