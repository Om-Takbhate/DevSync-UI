import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUsersFeed, removeOneUserFromFeed } from '../utils/store/slices/userFeedSlice'
import { Link, useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import { addConnections } from '../utils/store/slices/userConnectionSlice'
import Toast from './Toast'

const Feed = () => {

  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const usersFeed = useSelector(store => store.usersFeed?.feed)
  const navigate = useNavigate()
  let toastTimeout;

  const handleConnectClick = async (e, user) => {
    e.preventDefault()
    const id = user._id
    try {
      const res = await axios.post(BASE_URL + `/request/send/interested/${id}`, {}, {
        withCredentials: true
      })
      clearTimeout(toastTimeout)
      setMessage(res?.data?.message)
      setShowToast(prev => !prev)
      dispatch(removeOneUserFromFeed(user._id))

    }
    catch (err) {

      console.log(err)
      setMessage(err?.response?.data?.message)
      setShowToast(prev => !prev)
    }
    finally {
      toastTimeout = setTimeout(() => {
        setShowToast(prev => !prev)
        setMessage('')
      }, 3000)
    }
  }

  const getUsersFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true })
      const usersFeed = res?.data?.data
      dispatch(addUsersFeed(usersFeed))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (usersFeed.length == 0) getUsersFeed();
  }, [])

  if(usersFeed.length == 0) return <h2 className='text-xl text-center flex-grow pt-20'>No new Users found!</h2>


  return (
    // <div className='flex justify-center items-center flex-wrap gap-4 p-3 flex-grow p-4 mt-3'>
    <>
      {showToast ? <Toast show={showToast} message={message} /> : ''}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5 flex-grow'>
        {
          usersFeed?.map(user => <Link to={`/profile/${user?._id}`} key={user?._id} className='mx-auto'> <UserCard user={user} onClick={handleConnectClick} /> </Link>)
        }

      </div>
    </>
  )
}

export default Feed