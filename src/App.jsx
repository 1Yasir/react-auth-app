import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import DashBoard from './components/DashBoard';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


  console.log("app component");
  return (
    <div className='app'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App