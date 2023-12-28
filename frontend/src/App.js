import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from 'react';

import Glad from './Glad';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UpdatePassword from './UpdatePassword';

function App() {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/registration/glad-screen/:id?" element={<Glad />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App;
