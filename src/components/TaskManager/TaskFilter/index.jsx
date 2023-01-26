import { Button, ButtonGroup } from "react-bootstrap";

export const TaskFilter = () => {
    return (
        <ButtonGroup>
            <Button variant="outline-secondary">Todos</Button>
            <Button variant="outline-secondary">En proceso</Button>
            <Button variant="outline-secondary">Pendiente</Button>
            <Button variant="outline-secondary">Completado</Button>
        </ButtonGroup>
    );
};
