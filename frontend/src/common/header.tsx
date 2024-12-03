import React, { useState } from "react";
import Button from "../component/button";
import Modal from "../component/modal";
import Register from "../auth/register";
import Login from "../auth/login";

const Header = () => {
    const [modalType, setModalType] = useState<"register" | "login" | null>(null);

    const handleCloseModal = () => setModalType(null);
    
    return(
        <div className="border-b border-black h-20">
            <Button name="Register" onClick={() => setModalType("register")}/>

            <Button name="Login" onClick={() => setModalType("login")}/>


            <Modal isOpen={modalType !== null} onClose={handleCloseModal}>
                {modalType === "register" && 
                    <Register switchToLogin={() => setModalType("login")}/>}
                {modalType === "login" && (
                    <Login switchToRegister={() => setModalType("register")} />
                )}
            </Modal>
        </div>
    );
}

export default Header;