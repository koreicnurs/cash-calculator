import React, {useState} from 'react';

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

    const choice = (e) => {
        if(e.target.value === 'same') {

            console.log('hi')
        } else {
            console.log('ho')
        }
    }

    return (
        <>
            <input type="radio" name='choice' value='same' onClick={e => choice(e)}/>
            <input type="radio" name='choice' value='each' onClick={e => choice(e)}/>
            <div className='first'>
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
            </div>
            <div className='second'>
                <div>Second</div>
            </div>
        </>
    );
};

export default App;