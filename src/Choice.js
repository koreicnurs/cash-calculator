import React from 'react';
import {useState} from "react";
import Split from "./containers/Split/Split";
import Individual from "./containers/Individual/Individual";

const Choice = () => {
    const [type, setType] = useState('evenly')

    const choice = value => {
        setType(value)
    }

    return (
        <>
            <div className='choice'>
                <div className="form-check form-switch">
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name='choice' value='evenly'
                               checked={type === 'evenly'}
                               onChange={e => choice(e.target.value)}/>
                        Evenly
                    </label>
                </div>
                <div className="form-check form-switch">
                    <label>
                        <input className="form-check-input" type="radio" name='choice' value='each'
                               checked={type === 'each'}
                               onChange={e => choice(e.target.value)}/>
                        Each
                    </label>
                </div>
            </div>
            {type === 'evenly' ? (
                    <Split/>
                )
                : (
                    <Individual/>
                )}
        </>
    );
};

export default Choice;