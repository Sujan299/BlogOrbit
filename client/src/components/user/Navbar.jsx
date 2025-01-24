import React from 'react'
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useLocation } from 'react-router-dom'

const MobileNav = ({ user, menuClick, handleLogout }) => {
  return (
    <div className={`fixed w-[50vw] h-[50vh] top-24 bg-blue-400 left-0 z-10 rounded-e-lg`}>
      <nav className='w-full h-full'>
        <ul className='ml-4 flex flex-col gap-3 mt-4'>
          <li><Link to='/home' onClick={menuClick}>Home</Link></li>
          <li><Link to='/categories' onClick={menuClick}>Categories</Link></li>
          <li><Link to='/books' onClick={menuClick}>Books</Link></li>
          <li><Link to='/contact' onClick={menuClick}>Contact Us</Link></li>
          <li>
            {
              user ?
                <div className='h-10 w-10 rounded-full bg-slate-500 md:flex hidden'>
                  <img src={user?.image} alt="" className='rounded-full' />
                </div> :
                <Link to='/login' className='' onClick={menuClick}>
                  <MdAccountCircle className='h-10 w-10' />
                </Link>

            }
          </li>

          {
            user ?
              <li><div className="">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div></li> : null
          }
          <li><button
            onClick={menuClick}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Close
          </button></li>
        </ul>
      </nav>
    </div>
  )
}

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    const setData = () => {
      const data = localStorage.getItem("user-info");
      const userData = JSON.parse(data);
      setUser(userData);
    }
    setData();
  }, [])
  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/");
    window.location.reload();
  }
  const menuClick = () => {
    setShowNav(!showNav);
  }
  return (
    <div className='flex h-32 items-center justify-between font-semibold px-8'>
      <ul className='flex gap-10 justify-center items-center'>
        <li><h1 className='md:text-3xl text-2xl'>
          <Link to='/home'>BlogOrbit</Link>
          </h1></li>
        <li className='md:flex hidden'><p>|</p></li>
        <li className={`md:flex hidden ${path === '/home' ? "text-blue-500" : ""}`}><Link to='/home'>Home</Link></li>
        <li className={`md:flex hidden ${path === '/categories' ? "text-blue-500" : ""}`}><Link to='/categories'>Categories</Link></li>
        <li className={`md:flex hidden ${path === '/books' ? "text-blue-500" : ""}`}><Link to='/books'>Books</Link></li>
        <li className={`md:flex hidden ${path === '/contact' ? "text-blue-500" : ""}`}><Link to='/contact'>Contact Us</Link></li>
      </ul>
      <ul className='flex gap-10 items-center'>
        <li>

          {
            user ?
              <div className='h-10 w-10 rounded-full bg-slate-500 md:flex hidden'>
                <img src={user?.image} alt="" className='rounded-full' />
              </div> :
              <Link to='/login' className='md:flex hidden '>
                <MdAccountCircle className='h-10 w-10' />
              </Link>

          }
        </li>
        <li>
          {
            user ?
              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="md:flex hidden px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div> : null
          }
        </li>
        <div className='md:hidden flex' onClick={menuClick}><CiMenuFries /></div>
      </ul>
      {
        showNav && <MobileNav user={user} menuClick={menuClick} handleLogout={handleLogout} />
      }
    </div>
  )
}

export default Navbar