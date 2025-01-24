import React from "react";
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const BookDetails = () => {
    const {id} = useParams();
    const [book, setBook] = useState({});
    useEffect(()=>{
        const getBook = async()=>{
           try{
            const response = await axios.get(`https://blogorbit.onrender.com/books/book/${id}`);
            if(response.status===200){
                console.log(response.data);
                setBook(response.data);
            }
           }catch(err){
            console.log("Getting error while getting a book !", err);
           }
        }
        getBook();
    },[id]); // with this id, when is changes function runs, and state changes and component re-renders
    return (
        <div>
            <div className="min-h-screen bg-gray-50 py-10">
                {/* Main Book Detail Card */}
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Book Cover */}
                        <div className="p-6">
                            <img
                                src={book.coverImage}
                                alt="Book Cover"
                                className="rounded-lg shadow-md w-full h-auto object-cover"
                            />
                        </div>
                        {/* Book Details */}
                        <div className="p-6 space-y-6">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {book.title}
                            </h1>
                            <h2 className="text-xl text-gray-600">
                                By: <span className="font-semibold">{book.author}</span>
                            </h2>
                            <p className="text-gray-700">
                                {book.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <p className="text-lg text-gray-900 font-semibold">Price:</p>
                                <p className="text-xl font-bold text-green-600">${book.price}</p>
                            </div>
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                {/* Additional Details Section */}
                <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800">Book Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {book.description}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800">Book Details</h3>
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Genre: {book.genre}</li>
                            <li>Pages: {book.pages}</li>
                            <li>Publisher: {book.publisher}</li>
                            <li>Published: {book.publishDate}</li>
                            <li>Language: {book.language}</li>
                            <li>ISBN: {book.isbn}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails