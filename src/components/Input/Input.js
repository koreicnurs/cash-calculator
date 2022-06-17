import React from 'react';

const Input = (props) => {
    return <input className={props.name} type={props.type} onChange={props.change}/>
};

export default Input;