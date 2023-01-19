import { useState } from 'react';

/* El hook es una función que me permite hacer ese "enganche" para poder sintetizar, modularizar y reutilizar */

export const useShow = (initialState) => {

    const [show, setShow] = useState(initialState);

    const handleShowMessage = () => {
        setShow(!show)
    };

    return { show, handleShowMessage };
};
