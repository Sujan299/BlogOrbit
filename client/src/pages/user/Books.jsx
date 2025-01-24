import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("https://blogorbit.onrender.com/books/");
        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (err) {
        console.log("Error while getting books !", err)
      }
    }
    getBooks();
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Books Collection</h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
            {/* Book Image */}
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 object-cover"
            />

            {/* Book Info */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 truncate">{book.title}</h2>
              <p className="text-gray-600 text-sm mt-2">by {book.author}</p>
              <p className="text-gray-700 mt-4 text-sm">{book.description}</p>

              {/* View More Button */}

              <Link to={`/books/book/${book._id}`}>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
