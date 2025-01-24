import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from "axios";
import UserNameAndImage from '../../components/user/UserNameAndImage'

const socket = io("https://blogorbit.onrender.com", {
    transports: ["websocket"],
});
const Comments = ({ id }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const data = localStorage.getItem("user-info");
            const userData = JSON.parse(data);
            setUserInfo(userData);

            if (userData?.name) {
                const response = await axios.post("https://blogorbit.onrender.com/auth/google", { email: userData.email });
                if (response.status === 200) {
                    setUserId(response.data._id);
                }
            }
            if (userData?.username) {
                const response = await axios.post("https://blogorbit.onrender.com/users/validate_comment", { email: userData.email });
                if (response.status === 200) {
                    setUserId(response.data._id);
                }
            }
        };
        getUser();

        socket.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
        });

        const handleReceiveMsg = (content) => {
            console.log("Message received:", content);

            const addComment = async () => {
                try {
                    const response = await axios.post("https://blogorbit.onrender.com/comment", {
                        content, user_id: userId,
                        postId: id
                    });
                    if (response.status === 201) {
                        setMessages((prevMessages) => [...prevMessages, response.data]);
                    }
                } catch (err) {
                    console.error("Error adding comment:", err);
                }
            };
            addComment();
        };

        socket.on("receiveMsg", handleReceiveMsg);

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });

        return () => {
            socket.off("receiveMsg", handleReceiveMsg);
            socket.off("connect");
            socket.off("disconnect");
            socket.off("connect_error");
        };
    }, [userId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://blogorbit.onrender.com/comment/${id}`);
                setMessages(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };
        fetchComments();
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMsg", message);
            console.log("Message sent:", message);
            setMessage("");
        }
    };

    return (
        <div className='py-5'>
            {messages.map((msg) => (
                <div key={msg._id} className='flex flex-col gap-5'>
                    <div className='flex'>
                        <UserNameAndImage userId={msg.user_id} /><span className='flex items-center pl-2'>{msg.content}</span>
                    </div>
                    <hr />
                </div>
            ))}
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-4 py-3 text-sm w-96 h-12 focus:outline-none focus:ring focus:ring-blue-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={sendMessage}
                >
                    Submit
                </button>
            </div>


        </div>
    );
};

export default Comments;
