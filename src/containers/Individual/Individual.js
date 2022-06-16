import React from 'react';
import Buttons from "../../components/Buttons/Buttons";
import {nanoid} from "nanoid";
import {useState} from "react";

const Individual = (props) => {

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
        <form className='each'>
            <h3>Every man for himself</h3>
            {people.map(person => (
                <div key={person.id} className='each__inner'>
                    <input className="form-control" type="text" name='name' value={person.name}
                           onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                    <input className="form-control" type="text" name='price' value={person.price}
                           onChange={(e) => bindingPerson(e.target.name, e.target.value, person.id)}/>
                    <Buttons btnClass='btn-danger' run={() => removePerson(person.id)} name='Remove'/>
                </div>
            ))}
            <input className="form-control" type="tipsEach" onChange={e => inputEachCountTips(e.target.value)}/>
            <input className="form-control" type="transferEach" onChange={e => inputEachCountTransfer(e.target.value)}/>
            <p>{personPrice}</p>
            {people.map(p => {
                return (
                    <p>{p.name}: {p.resultPricePerson}</p>
                )
            })}
            <Buttons btnClass='btn-info' run={addPerson} name='Add'/>
            <Buttons btnClass='btn-warning' run={countEach} name='Count'/>
        </form>
    );
};

export default Individual;