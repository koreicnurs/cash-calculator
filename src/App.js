import React, {useState} from 'react';
import {nanoid} from "nanoid";

const App = () => {

    const [order, setOrder] = useState({
        peopleQuantity: 0,
        orderPrice: 0,
        tips: 0,
        transfer: 0,
    })

    const [result, setResult] = useState({
        eachPrice: 0,
        resultPrice: 0,
    })

    const [people, setPeople] = useState([])

    const [type, setType] = useState('evenly')

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
        let resultPrice = order.orderPrice * order.tips / 100

        setResult({
            resultPrice: result.resultPrice = (resultPrice += Number(order.orderPrice)),
            eachPrice: result.eachPrice = (Math.ceil(resultPrice / order.peopleQuantity))
        })
    }

    const choice = value => {
        setType(value)
    }

    const addPerson = () => {
        setPeople(prev => ([
            ...prev,
            {name: '', price: 0, id: nanoid()}
        ]))
    }

    const bindingPerson = (name, value, id) => {
        setPeople(() => {
            return people.map(person => {
                if(person.id === id) {
                    return {
                        ...person,
                        [name]: value
                    };
                }
                return person
            });
        });
    };

    return (
        <>
            <div className='choice'>
                <label>
                    <input type="radio" name='choice' value='evenly' checked={type === 'evenly'}
                           onChange={e => choice(e.target.value)}/>
                    Evenly
                </label>
                <label>
                    <input type="radio" name='choice' value='each' checked={type === 'each'}
                           onChange={e => choice(e.target.value)}/>
                    Each
                </label>
            </div>
            {type === 'evenly' ? (
                    <form className='evenly'>
                        <h3>Splitting this cheack three ways</h3>
                        <input type="people" onChange={e => inputCountPeople(e.target.value)}/>
                        <input type="priceOrder" onChange={e => inputCountPrice(e.target.value)}/>
                        <input type="tips" onChange={e => inputCountTips(e.target.value)}/>
                        <input type="transfer" onChange={e => inputCountTransfer(e.target.value)}/>
                        <p>{order.peopleQuantity}</p>
                        <p>{order.orderPrice}</p>
                        <p>{order.tips}</p>
                        <p>{order.transfer}</p>
                        <p>{result.resultPrice}</p>
                        <p>{result.eachPrice}</p>
                        <button onClick={count}>Count</button>
                    </form>
                )
                : (
                    <form className='each'>
                        <h3>Every man for himself</h3>
                        {people.map(person => (
                            <div key={person.id} className='each__inner'>
                                <input type="text" name='name' value={person.name}
                                       onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                                <input type="text" name='price' value={person.price}
                                       onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                                <button type='button'>Remove</button>
                            </div>
                        ))}
                        <button type='button' onClick={addPerson}>Add</button>
                    </form>
                )}
        </>
    );
};

export default App;