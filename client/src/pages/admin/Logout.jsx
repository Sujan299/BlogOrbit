import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            const response = await axios.post("https://blogorbit.onrender.com/admin/logout", {}, { withCredentials: true });
            console.log(response.data);
            if (response.status === 200) {
                navigate("/admin/login");
                const notify = () => { toast.success("Logout successfully !") }
                notify();
            }
        }
        logout();
    }, [])
}

export default Logout