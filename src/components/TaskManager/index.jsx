import { useEffect, useReducer, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { filterTask } from "../../constants";
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
    const [statusFilter, setStatusFilter] = useState(filterTask.ALL);

    const tasksStore = localStorage.getItem("tasks");
    const initialStateReducer = JSON.parse(tasksStore) || []; //estado inicial de tareas, si no existe se crea un array vacío
    const [tasks, dispatch] = useReducer(taskReducer, initialStateReducer); // dispatch({type, payload})

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

    useEffect(() => {
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); //useEffect escuchando si hay nuevos cambios en las tareas y crea el localStorage

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

    //recibe string como parámetro del estado del filtro
    const handleStatusFilter = (status = "") => {
        setStatusFilter(status);
    };

    const filterTaskMethod = (task) => {
        switch (statusFilter) {
            case filterTask.IN_PROCESS:
                return task.active === true;
            case filterTask.PENDING:
                return task.active === false && task.completed === false;
            case filterTask.COMPLETED:
                return task.completed === true;
            default:
                return task;
        }
    }; //filtro en una variable aparte

    const handleReset = () => {
        reset();
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} lg={{span:6, offset: 5}} className="mb-4">
                    <TaskFilter onChangeFilter= {handleStatusFilter} />
                </Col>
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputsValue} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={refForm} action={action} onReset={handleReset} />
                </Col>
                <Col sm={12} lg={9} className="d-flex flex-wrap align-items-start gap-2">
                    {
                        tasks.filter(filterTaskMethod).map((task) => {
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
