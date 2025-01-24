import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const CreatePost = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  // rich text editor - react quill
  const [content, setContent] = useState("");

  const quillRef = useRef();
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post("https://blogorbit.onrender.com/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        const imageUrl = response.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        quill.insertEmbed(range.index, "image", imageUrl);
      }
      catch (err) {
        console.error("Image upload failded: ", err);
      }


    }



  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        [{ align: [] }],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);


  const handleSubmit = async () => {
    console.log('Editor Content:', content); // Save or process the editor content

    try {
      const response = await axios.post("https://blogorbit.onrender.com/posts/create_post",
        {
          title,
          image,
          content,
          author,
          tags,
          category
        }
      );

      if (response.status !== 201) {
        console.log("error in posting a post");
      }
      else {
        console.log(response.data);
        navigate("/home");
        const notify = () => { toast.success("Post created successfully !") }
        notify();
      }
    }
    catch (err) {
      console.log("can not insert data");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://blogorbit.onrender.com/admin/create_post",
          {
            withCredentials: true
          }
        );
        console.log(response.data);

        if (response.status !== 200) {
          setError('Error fetching data of create post');
        }
       
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Post</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the post title"
        />
      </div>

      {/* Image Link */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image Link:</label>
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the image URL"
        />
      </div>

      {/* Content (ReactQuill) */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content:</label>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Write something amazing..."
          className="border border-gray-300 rounded-md"
        />
      </div>

      {/* Author Id */}
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author Id:</label>
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the author ID"
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">Tags:</label>
        <input
          type="text"
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter tags separated by commas"
        />
      </div>

      {/* Category Id */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category Id:</label>
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the category ID"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        POST
      </button>
    </div>
  );
};

export default CreatePost;
