import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Button from "../component/button";
import Modal from "../component/modal";
import Register from "../auth/register";
import Login from "../auth/login";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div className="border-b border-black h-20">
            <Button name="Register" onClick={() => setIsModalOpen(true)}/>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Register />
            </Modal>

            <Button name="Login" onClick={() => setIsModalOpen(true)}/>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Login />
            </Modal>
        </div>
    );
}

export default Header;