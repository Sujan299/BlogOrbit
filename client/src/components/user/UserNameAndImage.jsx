import React, { useEffect, useState } from 'react';
import axios from 'axios'

const UserNameAndImage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [conditionGoogleLogin, setCondition] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`https://blogorbit.onrender.com/users/user/${userId}`)
      // console.log(response.data);
      if (response.data.username) {
        setCondition(false);
      } else {
        setCondition(true);
      }
      setUser(response.data);
    }
    getUser();
  }, [])
  return (
    <div className=''>
      {
        conditionGoogleLogin ?
          <div className='flex gap-4 items-center'>
            <img src={user.image} alt='' className='h-8 w-8 rounded-full' />
            <p>{user.name}</p>
            <p> commented : </p>
          </div> : <div className='flex gap-4 items-center'>
            <img src={user.profile_picture} alt='' className='h-8 w-8 rounded-full' />
            <p>{user.username}</p>
            <p> commented : </p>
          </div>
      }
    </div>
  )
}

export default UserNameAndImage