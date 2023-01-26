import { useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hook/useForm";
import { taskReducer } from "../../reducers/taskReducer";
import { CardItem } from "./CardItem";
import { FormTask } from "./Form";
import { TaskFilter } from "./TaskFilter";


export const TaskManager = () => {

    const formTaskInitialState = {
        id: "",
        title: "",
        description: "",
        img: "",
        active: false,
        completed: false,
        date: ""
    };

    const refForm = useRef(null);
    const [inputsValues, setInputsValues, handleChangeInputsValue, reset] = useForm(formTaskInitialState, refForm);

    const [action, setAction] = useState("CREATE"); //Acción del submit para usar el mismo formulario para actualizar o editar

    const [tasks, dispatch] = useReducer(taskReducer, []); // dispatch({type, payload})

    const handleSubmit = (e) => {
        e.preventDefault();

        if(action === "CREATE") {
            dispatch({type:"ADD", payload: inputsValues});
        }
        if(action === "UPDATE") {
            dispatch({type:"UPDATE", payload: inputsValues});
        }
        reset();

        setAction("CREATE"); //Solucion bug => después de editar una tarea el boton se queda en actualizar
    }

    const handleUpdate = (id) => {

        const taskFound = tasks.find(task => task.id === id);
        setAction("UPDATE");

        setInputsValues(taskFound);
    }

    const handleDelete = (id) => {
        dispatch({type: "DELETE", payload: id}); //se envía solo el ID
    }

    const handleTaskActive = (id) => {
        dispatch({type: "TOGGLE_ACTIVE", payload: id}); //se envía solo el ID
    }

    const handleTaskCompleted = (id) => {
        dispatch({type: "TOGGLE_COMPLETE", payload: id}); //se envía solo el ID
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} lg={{span:6, offset: 5}} className="mb-4">
                    <TaskFilter />
                </Col>
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputsValue} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={refForm} action={action} />
                </Col>
                <Col sm={12} lg={9} className="d-flex flex-wrap align-items-start gap-2">
                    {
                        tasks.map((task) => {
                            return ( 
                            <CardItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} onActive={handleTaskActive} onCompleted={handleTaskCompleted} />
                            );
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}
