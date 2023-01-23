import {useState} from 'react';

export const useForm = (initialState, refForm) => {

    const [state, setState] = useState(initialState);

    const handleChange = ({target: {name, value}}) => {
        //console.log({ [target.name]:target.value});
        setState({
            ...state,
            [name]: value
        });
    };
    
    const reset = () => {
        refForm.current?.reset();
        setState(initialState);
    };

    return [state, setState, handleChange, reset];
};
