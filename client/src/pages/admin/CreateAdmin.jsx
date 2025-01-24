import React from 'react';
import '../../styles/admin/login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const CreateAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const createAdmin = async (e) => {
    e.preventDefault();

    const response = await axios.post("https://blogorbit.onrender.com/admin/create_admin",
      {
        username,
        password,
        role
      }
      , {
        withCredentials: true, // browser can not accept cookies without credentials
      }
    );
    console.log("code is here!")
    setTimeout(() => {
      if (response.status === 201) {
        navigate("/admin/dashboard");
        notify();
      }

    }, 1000)
  }
  const notify = () => toast.success("User created successfully !");

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Admin</h1>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Add Username:
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin username"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Add Password:
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin password"
          />
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
            Add Role:
          </label>
          <input
            type="text"
            name="role"
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin role"
          />
        </div>

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="SUBMIT"
            onClick={createAdmin}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default CreateAdmin