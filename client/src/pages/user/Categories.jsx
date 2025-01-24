import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("https://blogorbit.onrender.com/categories/categories/");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (err) {
        console.log("Error while getting categories !", err)
      }
    }
    getCategories();
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">Explore Categories</h1>
        <p className="text-lg text-gray-600 mt-4">Discover articles and posts in various categories</p>
      </div>

      {/* Categories Grid Section */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            // to={`/categories/${category.name.toLowerCase()}`}

            // remember, _id is here when I populated things here
            to={`/categories/category/${category._id}`}
            className="rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
                <p className="text-sm text-white opacity-75">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
