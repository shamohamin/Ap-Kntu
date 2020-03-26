import React, { useContext } from 'react';
import { FormContext } from "./FormContext";

export const ShowErrorMsg = ({field}) => {
    const context = useContext(FormContext);

    return context.showErrors(field).map(item => <div style={{color:'red'}} key={item}>
        {item}
    </div>)
}