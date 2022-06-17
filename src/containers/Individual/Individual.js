import React from 'react';
import Buttons from "../../components/Buttons/Buttons";
import {nanoid} from "nanoid";
import {useState} from "react";
import './Individual.css'
import Input from "../../components/Input/Input";
import Span from "../../components/Span/Span";

const Individual = () => {

    const [order, setOrder] = useState({
        tips: 0,
        transfer: 0,
    })

    let [personPrice, setPersonPrice] = useState(0)

    const [people, setPeople] = useState([])

    const inputEachCountTips = value => {
        setOrder(prev => ({
            ...prev,
            tips: value,
        }))
    }

    const inputEachCountTransfer = value => {
        setOrder(prev => ({
            ...prev,
            transfer: value,
        }))
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
        let b = 0;
        const copyP = people.map(p => {
            if (p.price < 0 || !Number(p.price) || p.name === '' || !String(p.name) || order.transfer < 0 || order.tips < 0 || !Number(order.tips)) {
                alert('Not correct data');
            } else {
                a += Math.ceil((p.price * order.tips) / 100) + Number(p.price) + Number(order.transfer)
                if (order.transfer > 0 && Number(order.transfer)) {
                    b = Math.ceil(order.transfer / people.length)
                }
                return {
                    ...p,
                    resultPricePerson: Math.ceil((p.price * order.tips) / 100) + Number(p.price) + b
                }
            }
            return p
        })
        personPrice = a
        setPersonPrice(personPrice)
        setPeople(copyP)
    }

    return (
        <form className='each'>
            <h3>Every man for himself</h3>
            {people.map(person => (
                <div key={person.id} className='input-group'>
                    <Span name="input-group-text" info='First name and your cash<'/>
                    <input className="form-control" type="text" name='name' value={person.name}
                           onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                    <input className="form-control" type="text" name='price'
                           value={person.price}
                           onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                    <Buttons btnClass='btn btn-danger' run={() => removePerson(person.id)} name='Remove'/>
                </div>
            ))}
            <div className='input-group mb-3'>
                <div className='input-group'>
                    <Span name="input-group-text" info='Tips'/>
                    <Input name="each__input-transfer form-control" type="tipsEach" change={e => inputEachCountTips(e.target.value)}/>

                </div>
                <div className='input-group'>
                    <Span name="input-group-text" info='Transfer'/>
                    <Input name="each__input-transfer form-control" type="transferEach" change={e => inputEachCountTransfer(e.target.value)}/>
                </div>
            </div>

            <p className="input-group-text">Price: {personPrice}</p>
            {people.map(p => {
                return (
                    <div className="input-group mb-3 span-box" key={p.id + p.index}>
                        <Span name="input-group-text count-span" info={p.name}/>
                        <Span name="input-group-text count-span" info={p.resultPricePerson}/>
                    </div>

                )
            })}
            <Buttons btnClass='btn-info' run={addPerson} name='Add'/>
            <Buttons btnClass='btn-warning' run={countEach} name='Count'/>
        </form>
    );
};

export default Individual;