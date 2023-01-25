import { useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hook/useForm";
import { CardItem } from "./CardItem";
import { FormTask } from "./Form";


const generateId = () => Math.random().toString(36).substring(2, 18);

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

            return [...state, newTask];
        
        case "UPDATE":
            const taskToUpdate = action.payload;
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

        case "DELETE":
            const idTaskToDelete = action.payload;
            console.log(idTaskToDelete);
            const restTask = state.filter(task => task.id !== idTaskToDelete)

            return restTask;
        
        case "TOGGLE_ACTIVE":
            const idTaskToActive = action.payload;
            const tasksUpdatedActive = state.map((task) => {
                if(task.id === idTaskToActive) {
                    return {
                        ...task,
                        active: !task.active,
                        completed: task.completed ? false : task.completed
                    }
                }
                return task
            })

            return tasksUpdatedActive;

        case "TOGGLE_COMPLETE":
            const idTaskToCompleted = action.payload;
            const tasksUpdatedCompleted = state.map((task) => {
                if(task.id === idTaskToCompleted) {
                    return {
                        ...task,
                        completed: !task.completed,
                        active: task.active ? false : task.active
                    }
                }
                return task
            })

            return tasksUpdatedCompleted;
    
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
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputsValue} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={refForm} action={action} />
                </Col>
                <Col sm={12} lg={9}>
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
