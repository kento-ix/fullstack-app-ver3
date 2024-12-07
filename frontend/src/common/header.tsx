import React, { useState } from "react";
import Button from "../component/button";
import Modal from "../component/modal";
import Register from "../auth/register";
import Login from "../auth/login";
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [modalType, setModalType] = useState<"register" | "login" | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleCloseModal = () => setModalType(null);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigateToMyListing = () => {
        setModalType(null); 
        setMenuOpen(false); 
        navigate("/mylisting"); 
    };
    
    return(
        <div className="border-b border-black h-20 flex items-center justify-between px-6">
            <Link to="/" className="hover:text-blue-400 text-2xl">
                Home
            </Link>

            <div className="relative">
                <MenuIcon onClick={handleMenuClick} className="cursor-pointer" />
                {menuOpen && (
                    <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-gray-300 shadow-lg w-48">
                        <ul>
                            <li><Button name="Register" onClick={() => setModalType("register")} /></li>
                            <li><Button name="Login" onClick={() => setModalType("login")} /></li>
                            <li>
                                <button
                                    onClick={handleNavigateToMyListing}
                                    className="hover:text-blue-400"
                                >
                                    My Listing
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <Modal isOpen={modalType !== null} onClose={handleCloseModal}>
                {modalType === "register" && <Register switchToLogin={() => setModalType("login")} />}
                {modalType === "login" && <Login switchToRegister={() => setModalType("register")} />}
            </Modal>
        </div>
    );
}

export default Header;