import { Button, Form, Image } from 'react-bootstrap';
import classes from './style.module.css';

export const FormTask = ({ onChange, inputsValues, onSubmit, refForm, action, onReset }) => {
    return (
        <Form onSubmit={onSubmit} ref={refForm}>
            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control placeholder="Ingresar un título" value={inputsValues.title} onChange={onChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3">

                <Image className={classes.imgPreview} fluid src={inputsValues.img} />

                <Form.Label>Imagen</Form.Label>
                <Form.Control placeholder="Ingresar un url" value={inputsValues.img} onChange={onChange} name="img" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                {/* as={'textarea'} para cambiar de tipo text a text-area */}
                <Form.Control as={'textarea'} placeholder="Ingresar un descripción" onChange={onChange} name="description" defaultValue={inputsValues.description} />
            </Form.Group>
            <Button variant="success" type="submit" className="mx-2" >
                {action === "CREATE" ? "Crear" : "Actualizar"}
            </Button>
            <Button variant="danger" type="reset" onClick={onReset}>
                {action === "CREATE" ? "Reiniciar" : "Cancelar"}
            </Button>
        </Form>
    )
}
