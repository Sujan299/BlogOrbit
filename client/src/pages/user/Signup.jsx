import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile_picture, setProfilePicture] = useState("");
    const [bio, setBio] = useState("");
    console.log(username, email)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profile_picture)

        try {
            const response = await axios.post("https://blogorbit.onrender.com/users/signup",
                {
                    username, email, password, profile_picture, bio
                },
                {
                    withCredentials: true
                }
            )
            if (response.status === 201) {
                console.log("User added successfully !");
                navigate("/login");
                const notify = () => { toast.success("Singup successfully !") }
                notify();
            }

        } catch (err) {
            console.log("Can not add user ", err);
        }

    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
            >
                {/* Username */}
                <label htmlFor="username" className="text-gray-700 font-medium">
                    Username:
                </label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username"
                />

                {/* Email */}
                <label htmlFor="email" className="text-gray-700 font-medium">
                    Email:
                </label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />

                {/* Password */}
                <label htmlFor="password" className="text-gray-700 font-medium">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                />

                {/* Profile Picture */}
                <label htmlFor="profile_picture" className="text-gray-700 font-medium">
                    Profile Picture URL:
                </label>
                <input
                    type="text"
                    name="profile_picture"
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                />

                {/* Bio */}
                <label htmlFor="bio" className="text-gray-700 font-medium">
                    Bio:
                </label>
                <input
                    type="text"
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a short bio"
                />

                {/* Submit Button */}
                <input
                    type="submit"
                    value="Sign Up"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                />
            </form>

        </div>
    )
}

export default Signup