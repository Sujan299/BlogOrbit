import React from 'react';
import '../../styles/admin/login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginAdmin = async (e) => {
    e.preventDefault();

    const response = await axios.post("https://blogorbit.onrender.com/admin/login",
      {
        username,
        password
      }
      , {
        withCredentials: true, // browser can not accept cookies without credentials
      }
    );
    setTimeout(() => {
      if (response.status === 200) {
        navigate("/admin/dashboard");
        const notify = () => { toast.success("Login successfully !") }
        notify();
      }
    }, 1000)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={loginAdmin}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        {/* Form Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">Admin Login</h1>

        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="SUBMIT"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}

export default LoginAdmin