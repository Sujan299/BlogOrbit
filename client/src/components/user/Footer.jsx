import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="py-6">
      <div className="flex justify-between items-center flex-col md:flex-row px-8 gap-4">
        {/* Branding */}
        <div>
          <h1 className="text-lg font-bold text-black">BloggingApp</h1>
          <p className="text-sm text-gray-400">Sharing ideas and stories, one blog at a time.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/about" className="">
            About Us
          </a>
          <a href="/contact" className="">
            Contact
          </a>
          <a href="/privacy" className="">
            Privacy Policy
          </a>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" className="text-gray-400 hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="https://facebook.com" className="text-gray-400 hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BloggingApp. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
