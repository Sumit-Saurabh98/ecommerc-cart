import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../componenets/CartPage';
import Products from '../componenets/Products';

function Allrouter(props) {
    return (
        <Routes>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/' element={<Products/>}/>
        </Routes>
    );
}

export default Allrouter;