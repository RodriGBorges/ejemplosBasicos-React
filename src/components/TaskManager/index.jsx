import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hook/useForm";
import { FormTask } from "./Form";


export const TaskManager = () => {

    const refForm = useRef(null);
    const [inputsValues, setInputsValues, handleChangeInputsValue, reset] = useForm({}, refForm);


    /* const [inputsValues, setInputsValues] = useState({});

    const handleChangeInputsValue = ({target: {name, value}}) => {
        //console.log({ [target.name]:target.value});
        setInputsValues({
            ...inputsValues,
            [name]: value
        });
    } */

    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={12} lg={3}>
                    <FormTask onChange={handleChangeInputsValue} inputsValues={inputsValues} onSubmit={handleSubmit} refForm={refForm} />
                </Col>
                <Col sm={12} lg={9}>
                    Contenido
                </Col>
            </Row>
        </Container>
    )
}
