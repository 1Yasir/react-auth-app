import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
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
        </Routes>
      </Router>

    </div>
  )
}

export default App