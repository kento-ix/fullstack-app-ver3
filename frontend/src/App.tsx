import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './common/header';
import MyListing from './pages/Listing'
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/mylisting" element={<MyListing />} />
      </Routes>
    </Router>
  );
}

export default App;
