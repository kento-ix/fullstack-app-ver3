import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./common/header";
import MyListing from "./pages/listing/Listing";
import Setting from "./pages/Setting";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

import AddItem from "./pages/listing/addItem/addItem";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />/
        <Route path="mylisting" element={<MyListing />} />
        <Route path="setting" element={<Setting />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="additem" element={<AddItem/>} />
      </Routes>
    </Router>
  );
};

export default App;
