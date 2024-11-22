import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Cart from '../components/common/Cart';

export default function Routing() {
    return (
        <Routes>
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/' element ={<Dashboard/>}/>
            <Route exact path='/cart' element ={<Cart/>}/>
        </Routes>
    )
}
