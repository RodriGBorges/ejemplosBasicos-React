import { Button, Form, Image, Toast } from "react-bootstrap";
import classes from './style.module.css'

export const CardItem = ({ task, onUpdate, onDelete }) => {
    return (
        <Toast onClose={() => onDelete(task.id)}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{task.title}</strong>
                <small>{task.date}</small>
            </Toast.Header>

            <Toast.Body>
                <Image fluid src={task.img} alt="" className={classes["img-100"]} />
                <p className="d-inline-block ps-2" >{task.description}</p>
                
            <Form.Group className="m-3 d-inline-flex gap-1">
                <Form.Check name="active" id="active"/>
                <Form.Label htmlFor="active">Pendiente</Form.Label>
            </Form.Group>

            <Form.Group className="m-3 d-inline-flex gap-1">
                <Form.Check name="completed" id="completed"/>
                <Form.Label htmlFor="completed">Completado</Form.Label>
            </Form.Group>
            <Button variant="outline-dark" onClick={() => onUpdate(task.id)}>Editar</Button>
            </Toast.Body>
        </Toast>
    )
}