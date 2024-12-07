import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Register from './auth/register';
import Login from './auth/login';
import Header from './common/header';
import MyListing from './pages/listing'

const App: React.FC = () => {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/mylisting" element={<MyListing />} />
      </Routes>
    </Router>
  );
}

export default App;
