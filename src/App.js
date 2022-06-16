import React, {useState} from 'react';
import Split from "./containers/Split/Split";
import './App.css'
import Individual from "./containers/Individual/Individual";

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
                    <Individual/>
                )}
        </>
    );
};

export default App;