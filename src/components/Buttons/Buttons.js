import React from 'react';

const Buttons = (props) => {
    return (
        <button className={`btn ${props.btnClass}`} type='button' onClick={props.run}>{props.name}</button>
    );
};

export default Buttons;