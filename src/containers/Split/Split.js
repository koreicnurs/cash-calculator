import React from 'react';
import {useState} from "react";
import Buttons from "../../components/Buttons/Buttons";
import './Split.css'
import Span from "../../components/Span/Span";

const Split = () => {

    const [order, setOrder] = useState({
        peopleQuantity: 0,
        orderPrice: 0,
        tips: 0,
        transfer: 0,
    })

    const [result, setResult] = useState({
        quantity: 0,
        eachPrice: 0,
        resultPrice: 0,
    })

    const inputCountPeople = value => {
        setOrder(prev => ({
            ...prev,
            peopleQuantity: value,
        }))
    }

    const inputCountPrice = value => {
        setOrder(prev => ({
            ...prev,
            orderPrice: value,
        }))
    }

    const inputCountTips = value => {
        setOrder(prev => ({
            ...prev,
            tips: value,
        }))
    }

    const inputCountTransfer = value => {
        setOrder(prev => ({
            ...prev,
            transfer: value,
        }))
    }

    const count = () => {
        if (order.peopleQuantity < 0 || !Number(order.peopleQuantity)) {
            alert('Not correct people quantity');
        } else if (order.orderPrice < 0 || !Number(order.orderPrice)) {
            alert('Not correct total amount')
        } else if (order.tips < 0 || !Number(order.tips)) {
            alert('Not correct tips number')
        } else if (order.transfer < 0) {
            alert('Not correct transfer number')
        } else {
            let resultPrice = (order.orderPrice * order.tips / 100) + Number(order.transfer)

            setResult({
                quantity: order.peopleQuantity,
                resultPrice: result.resultPrice = (resultPrice += Number(order.orderPrice)),
                eachPrice: result.eachPrice = (Math.ceil(resultPrice / order.peopleQuantity))
            })
        }
    }

    return (
        <div>
            <form className='evenly'>
                <h3>Splitting this check three ways</h3>
                <div className='box-input'>
                    <div className='input-group'>
                        <Span name="input-group-text" info='People'/>
                        <input className="form-control input-part--one" type="people" onChange={e => inputCountPeople(e.target.value)}/>
                    </div>
                    <div className='input-group'>
                        <Span name="input-group-text" info='Price order'/>
                        <input className="form-control input-part--one" type="priceOrder" onChange={e => inputCountPrice(e.target.value)}/>
                    </div>
                    <div className='input-group'>
                        <Span name="input-group-text" info='Tips'/>
                        <input className="form-control input-part--one" type="tips" onChange={e => inputCountTips(e.target.value)}/>
                    </div>
                    <div className='input-group'>
                        <Span name="input-group-text" info='Transfer'/>
                        <input className="form-control input-part--one" type="transfer" onChange={e => inputCountTransfer(e.target.value)}/>
                    </div>
                </div>
                <div className='info-box'>
                    <div className='input-group'>
                        <Span name="input-group-text info-text" info='Number of people'/>
                        <Span name='info-number' info={result.quantity}/>
                    </div>
                    <div className='input-group'>
                        <Span name="input-group-text info-text" info='Split money'/>
                        <Span name='info-number' info={result.eachPrice}/>
                    </div>
                    <div className='input-group'>
                        <Span name="input-group-text info-text" info='Result'/>
                        <Span name='info-number' info={result.resultPrice}/>
                    </div>
                </div>
                <Buttons btnClass='btn-warning' name='Count' run={count}/>
            </form>
        </div>
    );
};

export default Split;