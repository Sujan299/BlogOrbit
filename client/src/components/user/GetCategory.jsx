import React, { useEffect, useState } from 'react';
import axios from 'axios'

const GetCategory = ({ category_id }) => {
    const [category, setCategory] = useState({});
    useEffect(() => {
        const getCategory = async () => {
            const response = await axios.get(`https://blogorbit.onrender.com/categories/category/${category_id}`);
            if (response.status === 200) {
                setCategory(response.data);
            }
        }
        console.log(category)
        getCategory();
    }, [])

    return (
        <div>
            {
                category.name
            }
        </div>
    )
}

export default GetCategory