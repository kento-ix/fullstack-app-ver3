import React, { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { Link, useNavigate } from "react-router-dom";

const MyListing = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if(!isAuthenticated) {
        return;
    }
    navigate(path);
  };

  return (
    <div className="p-4 flex space-x-9">
      {isAuthenticated && user ? (
        <p className="text-2xl font-light">Welcome {user?.name}!</p>
      ) : (
        <p className="mt-4 text-lg">You are not logged in</p>
      )}

      <button
        onClick={() => handleNavigation("/additem")}
        className="border rounded-md bg-blue-200 p-2"
      >
        Upload New Items
      </button>
    </div>
  );
};

export default MyListing;
