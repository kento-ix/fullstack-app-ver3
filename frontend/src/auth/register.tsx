import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  switchToLogin: () => void;
}

const Register = ({switchToLogin}: RegisterProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

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