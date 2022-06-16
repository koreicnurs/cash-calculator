import React, {useState} from 'react';
import {nanoid} from "nanoid";
import Split from "./containers/Split/Split";
import './App.css'
import Buttons from "./components/Buttons/Buttons";

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

    let [personPrice, setPersonPrice] = useState(0)

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
        let resultPrice = (order.orderPrice * order.tips / 100) + Number(order.transfer)

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
            {name: '', price: '', resultPricePerson: 0, id: nanoid()}
        ]))
    }

    const bindingPerson = (name, value, id) => {
        setPeople(() => {
            return people.map(person => {
                if (person.id === id) {
                    return {
                        ...person,
                        [name]: value
                    };
                }
                return person
            });
        });
    };

    const removePerson = (id) => {
        const peopleCopy = people.filter(p => {
            return p.id !== id
        })
        setPeople(peopleCopy)
    }

    const countEach = () => {
        let a = 0;
        const copyP = people.map(p => {
            a += ((p.price * order.tips) / 100) + Number(p.price)
            return {
                ...p,
                resultPricePerson: ((p.price * order.tips) / 100) + Number(p.price)
            }
        })
        personPrice = a
        setPersonPrice(personPrice)
        setPeople(copyP)
    }

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
                    <Split
                        countPeople={e => inputCountPeople(e.target.value)}
                        countPrice={e => inputCountPrice(e.target.value)}
                        countTips={e => inputCountTips(e.target.value)}
                        countTransfer={e => inputCountTransfer(e.target.value)}
                        peopleQuantity={order.peopleQuantity}
                        resultPrice={result.resultPrice}
                        eachPrice={result.eachPrice}
                        count={count}
                    />
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
                                <Buttons btnClass='btn-danger' run={() => removePerson(person.id)} name='Remove'/>
                            </div>
                        ))}
                        <input type="tips" onChange={e => inputCountTips(e.target.value)}/>
                        <input type="transfer" onChange={e => inputCountTransfer(e.target.value)}/>
                        <p>{personPrice}</p>
                        {people.map(p => {
                            return (
                                <p>{p.name}: {p.resultPricePerson}</p>
                            )
                        })}
                        <Buttons btnClass='btn-info' run={addPerson} name='Add'/>
                        <Buttons btnClass='btn-warning' run={countEach} name='Count'/>
                    </form>
                )}
        </>
    );
};

export default App;