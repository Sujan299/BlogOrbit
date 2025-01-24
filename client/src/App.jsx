import React from 'react'
import Login from './pages/admin/Login.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


// admin pages and components
import PrivateRoute from './pages/admin/PrivateRoute.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import CreatePost from './pages/admin/CreatePost.jsx';
import CreateAdmin from './pages/admin/CreateAdmin.jsx';
import AdminSettingsPage from './pages/admin/Settings.jsx';
import Logout from './pages/admin/Logout.jsx';

// components
import Navbar from './components/user/Navbar.jsx';
import Footer from './components/user/Footer.jsx';

// user pages
import Home from './pages/user/Home.jsx';
import Categories from './pages/user/Categories.jsx';
import Category from "./pages/user/Category.jsx";
import BookDetails from './pages/user/BookDetails.jsx';
import Contact from './pages/user/Contact.jsx';
import Books from './pages/user/Books.jsx';
import UserSignup from './pages/user/Signup.jsx';
import UserLogin from './pages/user/Login.jsx';
import BlogPostPage from './pages/user/Blog.jsx';
import PageNotFound from './components/user/PageNotFound.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [stateChange, setStateChange] = useState(false);
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='410849405245-a0k9kkq4g3ssecl4fv5sukc0vhh3rrf4.apps.googleusercontent.com'>
        <UserLogin />
      </GoogleOAuthProvider>
    )
  }
  return (

    <div className='xl:px-48 lg:px-24'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div>
        <Router>
          <Navbar/>
          <Routes>
            {/* admin routes */}
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />
            <Route path='/admin/create_post' element={<CreatePost />} />
            <Route path='/admin/create_admin' element={<CreateAdmin />} />
            <Route path='/admin/settings' element={<AdminSettingsPage />} />
            <Route path='/admin/logout' element={<Logout />} />

            {/* user routes */}
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/category/:id' element={<Category />} />
            <Route path='/books/book/:id' element={<BookDetails />} />
            <Route path='/blog/:id' element={<BlogPostPage />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/books' element={<Books />} />
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/login' element={<GoogleAuthWrapper />} />

            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  )
}

export default App