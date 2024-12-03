import React, { useState } from "react";
import axios from "axios";

type RegisterProps = {
  switchToLogin: () => void;
};

const Register = ({switchToLogin}: RegisterProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await axios.post("http://localhost:4000/api/flask/register", formData);
            console.log('Response:', response.data);
            if (response.status === 201) {
              setRegisterSuccess(true); 
            }
        } catch (error) {
            console.error("There was an error!", error);
            setErrorMessage("Invalid input"); 
        }
    };

    if (registerSuccess) {
      return (
        <div className='flex item-center justify-center'>
          <h1 className='text-xl mr-3'>Register Successful! </h1>
          <h1 
            className="text-xl text-red-600 cursor-pointer"
            onClick={switchToLogin}
          >
            Move to Login
          </h1>
        </div>
      );
    }

    return (
      <div>
          <div className='mt-9 flex item-center justify-center '>
            <form onSubmit={handleSubmit} className='border border-gray-500 p-3 flex flex-col gap-6 w-60'>
              <input 
                type="text" 
                placeholder='Username' 
                className='border border-black'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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
                onClick={switchToLogin}
              >
                Already have an account? Login
              </p>
              <button className='bg-red-600 text-white p-3'>Register</button>
            </form>
        </div>
      </div>
    )
}


export default Register;