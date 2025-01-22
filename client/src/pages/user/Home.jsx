import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom'
import GetCategory from '../../components/user/GetCategory';
import GetAuthor from '../../components/user/GetAuthor';
// import { toast } from 'react-toastify'

// displays all the posts
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const setData = () => {
      const data = localStorage.getItem("user-info");
      const userData = JSON.parse(data);
      setUser(userData);
    }
    setData();
    console.log(user);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/get_all_posts/",
          {
            withCredentials: true
          }
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err, "I am getting an error")
      }
    }
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 grid-cols-1 mt-16 justify-between gap-12">
        <div className="flex-1 bg-gray-200 rounded-xl overflow-hidden">
          <img src={posts[3]?.image} alt="Featured Post" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-around text-gray-700">
          <div className="opacity-65 my-1">{posts[3]?.date}</div>
          <h1 className="text-4xl font-semibold my-2">{posts[3]?.title}</h1>
          <div className="rounded-lg my-2 opacity-75" dangerouslySetInnerHTML={{ __html: posts[3]?.content }} />
        </div>
      </div>

      {/* Latest News Section */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Latest News!</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post._id}`}>
            <div className="rounded-md bg-white shadow-lg overflow-hidden transform transition-all hover:scale-105 my-2">
              <img src={post.image} className="rounded-t-lg h-48 w-full object-cover" alt={post.title} />
              <div className="px-4 py-2">
                <div className="opacity-65 my-1">{post.date}</div>
                <h1 className="text-xl font-semibold text-gray-800 my-2 h-40">{post.title}</h1>
                {/* <div className="text-sm opacity-75" dangerouslySetInnerHTML={{ __html: post.content }} /> */}
                <div className="opacity-80 my-1 flex justify-between font-semibold">
                  <div className='flex'>
                    <span>Category:</span><span className='text-blue-500'><GetCategory category_id={post.category} /></span>
                  </div>
                  <div className='flex'>
                    <span>By:</span><span className='text-blue-500'>
                      <GetAuthor authorId={post.author} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Subscribe Section */}
      <div className="h-48 bg-gradient-to-r bg-light_white rounded-3xl mt-10 grid md:grid-cols-2 grid-cols-1 px-8 justify-center items-center">
        <div>
          <h3 className="text-xl font-semibold">Get First Updates!</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatem esse doloribus in.</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-l-md text-black h-10"
          />
          <button className="px-4 py-2 bg-red-600 text-white rounded-r-md h-10 hover:bg-red-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>


  )
}

export default Home

