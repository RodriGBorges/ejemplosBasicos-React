import React from 'react'
import { Button, Form } from 'react-bootstrap'

export const FormTask = ({ onChange, inputsValues, onSubmit, refForm }) => {
    return (
        <Form onSubmit={onSubmit} ref={refForm}>
            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Ingresar un título" value={inputsValues.title} onChange={onChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="text" placeholder="Ingresar un url" value={inputsValues.img} onChange={onChange} name="img" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                {/* as={'textarea'} para cambiar de tipo text a text-area */}
                <Form.Control as={'textarea'} type="text" placeholder="Ingresar un descripción" value={inputsValues.description} onChange={onChange} name="description" />
            </Form.Group>
            <Button variant="success" type="submit" className="mx-2" >
                Agregar
            </Button>
            <Button variant="danger" type="reset">
                Reiniciar
            </Button>
        </Form>
    )
}
