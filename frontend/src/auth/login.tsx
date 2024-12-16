import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { loginAsync, logout } from "../state/slice/loginSlice";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  switchToRegister: () => void;
};

const Login = ({ switchToRegister }: LoginProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error, user } = useAppSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { email, password };
    await dispatch(loginAsync(formData));
  };

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Replace with your desired protected route
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="mt-9 flex items-center justify-center">
        {isAuthenticated ? (
          <div className="flex flex-col items-center">
            <h1 className="text-xl mb-3">Welcome, {user?.name}!</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white p-3"
            >
              Logout
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-gray-500 p-3 flex flex-col gap-6 w-60"
          >
            <input
              type="text"
              placeholder="Email"
              className="border border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600">{error}</p>}
            <p
              className="mt-4 text-blue-600 cursor-pointer"
              onClick={switchToRegister}
            >
              Don’t have an account? Register
            </p>
            <button
              className="bg-red-600 text-white p-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
