import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './userContext';
import './App.css';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

import AddProduct from './pages/AddProduct';
import ViewProducts from './pages/ViewProducts';




function App() {
  const token = localStorage.getItem('token');
console.log(token)
  return (
    <div className="App">
     
      <UserProvider>
        
        <Router>
        
          <Header />
          <Routes>
            
            
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<ViewProducts />} />
          </Routes>
        </Router>
        <ToastContainer />
      </UserProvider>
    </div>
  );
}

export default App;
