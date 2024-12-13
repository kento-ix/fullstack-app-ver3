import React, { useState, useEffect, useRef } from "react";
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
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleCloseModal = () => setModalType(null);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigation = (path:string) => {
        setModalType(null);
        setMenuOpen(false);
        navigate(path);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border-b border-black h-20 flex items-center justify-between px-6">
            <Link to="/" className="hover:text-blue-400 text-2xl">
                Home
            </Link>

            <div className="relative" ref={menuRef}>
                <MenuIcon onClick={handleMenuClick} className="cursor-pointer" />
                {menuOpen && (
                    <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-gray-300 shadow-lg w-48">
                        <ul>
                            <li>
                                <Button name="Register" onClick={() => setModalType("register")} />
                            </li>
                            <li>
                                <Button name="Login" onClick={() => setModalType("login")} />
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("/mylisting")}
                                    className="hover:text-blue-400"
                                >
                                    My Listing
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("/setting")}
                                    className="hover:text-blue-400"
                                >
                                    Setting
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation("/favorites")}
                                >
                                    Favorites
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
};

export default Header;
