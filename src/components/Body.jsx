import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/store/slices/userSlice'

const Body = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store => store.user.user)

  const fetchUser = async () => {
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
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
    else {
      navigate('/')
    }
  }, [])

  return (
    <div className='relative min-h-screen flex flex-col'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body