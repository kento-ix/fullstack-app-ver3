import React, { useState } from "react";
import axios from "axios";


type LoginProps = {
    switchToRegister: () => void;
};

const Login = ({switchToRegister}: LoginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); 
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post("http://localhost:4000/api/flask/login", formData);
            console.log('Response:', response.data);
            if (response.status === 200) {
                setLoginSuccess(true); 
            }
        } catch (error) {
            console.error("There was an error!", error);
            setErrorMessage("Invalid email or password"); 
        }
    };

    if (loginSuccess) {
        return (
            <div className='mt-9 flex item-center justify-center'>
                <h1 className='text-xl text-green-600'>Login Successful!</h1>
            </div>
        );
    }

    return (
        <div>
            <div className='mt-9 flex item-center justify-center'>
                <form onSubmit={handleSubmit} className='border border-gray-500 p-3 flex flex-col gap-6 w-60'>
                    <input 
                        type="text" 
                        placeholder='Email' 
                        className='border border-black'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        className='border border-black'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <p 
                        className="mt-4 text-blue-600 cursor-pointer"
                        onClick={switchToRegister}
                    >
                        Do not have account? Register
                    </p>
                    <button className='bg-red-600 text-white p-3'>Login</button>
                </form>
            </div>
        </div>
    )
};

export default Login;
