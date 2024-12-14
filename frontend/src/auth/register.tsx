import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { registerAsync } from "../state/slice/registerSlice";

type RegisterProps = {
  switchToLogin: () => void;
};

const Register = ({switchToLogin}: RegisterProps) => {
    const dispatch = useAppDispatch();
    const { loading, success, error } = useAppSelector((state) => state.register);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const formData = { name, email, password };
        await dispatch(registerAsync(formData));
      } catch (error) {
        console.error("There was an error!", error);
      }
    }

    if (success) {
      return (
        <div className='flex items-center justify-center'>
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
              {error && <p className="text-red-600">{error}</p>}
              <p 
                className="mt-4 text-blue-600 cursor-pointer"
                onClick={switchToLogin}
              >
                Already have an account? Login
              </p>
              <button 
                className='bg-red-600 text-white p-3'
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}  
              </button>
            </form>
        </div>
      </div>
    )
}


export default Register;