import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import cartReducer from '../reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

function CartPage(props) {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(cartReducer, {
        cartData: []
    });

    const [subtotal, setSubtotal] = useState(0);

    const getCartData = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
        const cartDataWithQuantity = data.map(item => ({ ...item, quantity: 1 }));
        dispatch({
            type: "CARTDATA",
            payload: cartDataWithQuantity
        });
    }

    useEffect(() => {
        getCartData();
    }, []);

    const handleIncrease = (itemId) => {
        dispatch({
            type: "INCREMENT",
            payload: itemId
        });
    }

    const handleDecrease = (itemId) => {
        dispatch({
            type: "DECREMENT",
            payload: itemId
        });
    }

    const handleRemove = (itemId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/cart/${itemId}`)
        dispatch({
            type: "REMOVE",
            payload: itemId
        });
    }

    useEffect(() => {
        const newSubtotal = state.cartData.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setSubtotal(newSubtotal);
    }, [state.cartData]);

    return (
        <div>
            <h1>SubTotal: {subtotal}</h1>
            <button onClick={()=>navigate('/')}>Home Page</button>
        <div>
            {state.cartData.map((data) => (
                <div style={{ width: "200px" }} key={data.id}>
                    <div>
                        <img style={{ height: "40px", objectFit: "cover" }} src={data.thumbnail} alt='thumbnail' />
                        <h3>{data.price}</h3>
                        <h3>{data.title}</h3>
                    </div>
                    <div>
                        <button onClick={() => handleDecrease(data.id)}>-</button>
                        <p>{data.quantity}</p>
                        <button onClick={() => handleIncrease(data.id)}>+</button><br />
                        <button onClick={() => handleRemove(data.id)}>Remove from cart</button>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default CartPage;
