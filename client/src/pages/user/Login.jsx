import React, { useState } from 'react'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../../api/googleoauth'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // google auth
    const responseGoogle = async (authResult) => {
        console.log(authResult)
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult.code);
                // const result = await axios.get(`https://blogorbit.onrender.com/auth/google?code=${authResult.code}`)
                const { email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = {
                    email,
                    name,
                    image,
                    token
                };
                localStorage.setItem("user-info", JSON.stringify(obj));
                console.log(email, name, image);
                navigate("/home");
                const notify = () => { toast.success("Login successfully !") }
                notify();
            }
            console.log(authResult);
        } catch (error) {
            console.error("Error while requesting google code: ", error);
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://blogorbit.onrender.com/users/login",
                {
                    email, password
                },
                {
                    withCredentials: true
                }
            );
            // console.log(response.data.username);
            if (response.status === 200) {
                const email = response.data.email;
                const username = response.data.username;
                const image = response.data.profile_picture;
                const obj = {
                    email,
                    username,
                    image
                };
                localStorage.setItem("user-info", JSON.stringify(obj));
                console.log(email, username, image);
                navigate("/home");
                const notify = () => { toast.success("Login successfully !") }
                notify();
            }

        } catch (err) {
            console.log("Can not login ", err);
        }

    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
            >
                {/* Email Field */}
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

                {/* Password Field */}
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

                {/* Login Button */}
                <input
                    type="submit"
                    value="Login"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                />

                {/* Google Login */}
                <button
                    type="button"
                    onClick={googleLogin}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Login with Google
                </button>

                {/* Divider */}
                <div className="text-center text-gray-500 my-2">OR</div>

                {/* Sign-Up Button */}
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                    Sign Up
                </button>
            </form>

        </div>
    )
}

export default Login