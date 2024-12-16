import React, { useState } from "react";
import { useAppSelector } from "../state/hooks";
import ItemModal from "../component/itemModal";

const MyListing = () =>{
    const { user, isAuthenticated } = useAppSelector((state) => state.login);
    const [menuOpen, setMenuOpen] = useState(false);


    const handleButtonClick = () => {
        setMenuOpen(!menuOpen);
    }

    return(
        <div className="p-4">
            {isAuthenticated && user ? (
                <p className="text-2xl font-light">Welcome {user?.name}!</p>



            ) : (
                <p className="mt-4 text-lg">You are not logged in</p>
            )}
        </div>
    );
}

export default MyListing;