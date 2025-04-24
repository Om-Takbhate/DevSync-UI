import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import Loader from './Loader'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/store/slices/userSlice'

const Body = () => {

  const [isStillFetchingUser, setIsStillFetchingUser] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store => store.user.user)

  const fetchUser = async () => {
    setIsStillFetchingUser(true)
    try {
      const data = await axios.get(BASE_URL + '/profile/view', { withCredentials: true })
      dispatch(addUser(data.data))
    }
    catch (err) {
      if (err.status == 401) {
        dispatch(removeUser())
        navigate('/login')
      }
      else {
        console.log(err.message)
      }
    }
    finally {
      setIsStillFetchingUser(false)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
    else {
      setIsStillFetchingUser(false)
      navigate('/')
    }
  }, [])



  return (
    <div className='relative min-h-screen flex flex-col'>
      {isStillFetchingUser ?
        <Loader /> :
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      }
    </div>
  )
}

export default Body