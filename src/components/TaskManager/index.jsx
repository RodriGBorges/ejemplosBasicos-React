import { useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hook/useForm";
import { CardItem } from "./CardItem";
import { FormTask } from "./Form";


const generateId = () => Math.random().toString(36).substring(2, 18);

console.log(generateId());

const taskReducer = (state, action) => { // state = representa el array con todas las tareas
    
    switch (action.type) {
        case "ADD":

            const inputsValues = action.payload;
            const newTask = {
                ...inputsValues,
                id: generateId(),
                active: false,
                completed: false,
                date: new Date().toLocaleString()
            };

            console.log("Acción Agregar", newTask);
            return [...state, newTask];
        
        case "UPDATE":
            const taskToUpdate = action.payload
            const tasksUpdated = state.map((task) => {
                if(task.id === taskToUpdate.id) {
                    return {
                        ...task,
                        ...taskToUpdate
                    }
                }
                return task;
            });
            return tasksUpdated;
    
        default:
            return state;
    }

}

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
        console.log('Actualizar la tarea ID: ' + id);

        const taskFound = tasks.find(task => task.id === id);
        setAction("UPDATE");

        setInputsValues(taskFound);
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputsValue} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={refForm} action={action} />
                </Col>
                <Col sm={12} lg={9}>
                    {
                        tasks.map(task => {
                            return <CardItem key={task.id} task={task} onUpdate={handleUpdate} />
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}
