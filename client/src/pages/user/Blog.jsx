import React from "react";
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Comments from './Comments.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';

const BlogPostPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`https://blogorbit.onrender.com/posts/get_a_post/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        setPost(response.data);
      }
    }
    getPost();
  }, [id])
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{post.title}</h1>

      {/* Blog Image */}
      <div className="w-full rounded-lg overflow-hidden mb-6">
        <img src={post.image} alt="Blog Post" className="w-full h-auto" />
      </div>

      {/* Blog Content */}
      <div className="space-y-6 text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>
      {/* comment section started */}
      {
        user ?
          <div>
            <h4 className='text-xl mt-10'>Comments</h4>
            <hr className='text-dark mt-1' />
              <Comments id={id} />
          </div> : null
      }
    </div>
  );
};

export default BlogPostPage;
