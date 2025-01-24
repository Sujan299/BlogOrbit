import React from "react";
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Category = () => {
    const {id} = useParams();
    const [category, setCategory] = useState({});
    useEffect(()=>{
        const getCategory = async()=>{
            const response = await axios.get(`https://blogorbit.onrender.com/categories/category/${id}`);
            if(response.status===200){
                console.log(response.data);
                setCategory(response.data);
            }
        }
        getCategory();
    },[id])
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{category.name}</h1>
      
      {/* Blog Image */}
      <div className="w-full rounded-lg overflow-hidden mb-6">
        <img src={category.image} alt="Blog Post" className="w-full h-auto" />
      </div>
      
      {/* Blog Content */}
      <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
        {category.description}
      </div>
      {/* comment section started */}
      <hr className='text-dark mt-1'/>
    </div>
  );
};

export default Category;
