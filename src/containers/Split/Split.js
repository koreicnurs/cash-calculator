import React from 'react';
import './Split.css'
import Buttons from "../../components/Buttons/Buttons";
const Split = (props) => {
    return (
        <div>
            <form className='evenly'>
                <h3>Splitting this check three ways</h3>
                <input className="form-control" type="people" onChange={props.countPeople}/>
                <input className="form-control" type="priceOrder" onChange={props.countPrice}/>
                <input className="form-control" type="tips" onChange={props.countTips}/>
                <input className="form-control" type="transfer" onChange={props.countTransfer}/>
                <p>People quantity: {props.peopleQuantity}</p>
                <p>Result: {props.resultPrice}</p>
                <p>Split money: {props.eachPrice}</p>
                <Buttons btnClass='btn-warning' name='Count'run={props.count} />
            </form>
        </div>
    );
};

export default Split;