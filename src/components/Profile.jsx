import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import Toast from './Toast'
import { useNavigate } from 'react-router-dom'
import Skills from './Skills'
import { USER_PROFILE_BG_URL } from '../utils/constants'
import Education from './Education'
import ProfileSkeleton from './skeletons/ProfileSkeleton'

const Profile = () => {

  const { id } = useParams()
  const [isConnected, setIsConnected] = useState(false)
  const loggedInUser = useSelector(store => store.user?.user)
  const [profileData, setProfileData] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {

      const res = await axios.get(BASE_URL + `/profile/${id}`, { withCredentials: true })
      const user = res?.data?.data
      setIsConnected(prev => res?.data?.isConnected)
      setProfileData(user)
      setMessage(res.data.data)
    }
    catch (err) {
      setMessage(err.message)
    }
  }

  const handleMessageClick = () => {

  }


  const handleConnectClick = async (e) => {
    try {
      const res = await axios.post(BASE_URL + `/request/send/interested/${id}`, {}, { withCredentials: true })
      setMessage(res?.data?.message)
      setShowToast(prev => !prev)

    }
    catch (err) {
      console.log(err)
      setMessage(err?.response?.data?.message)
      setShowToast(prev => !prev)
    }
    finally {
      setTimeout(() => {
        setShowToast(prev => !prev)
        setMessage('')
      }, 3000)
    }
  }

  useEffect(() => {
    if (id) {
      //we have to fetch other users profile
      fetchUserData()
    }
    else {
      setProfileData(loggedInUser)
    }
  }, [id, loggedInUser])

  if (!profileData) return <ProfileSkeleton />
  return (
    <>
      {showToast ? <Toast show={showToast} message={message} /> : ''}
      <div className='flex justify-start items-start mt-0  w-full px-4 flex-col mb-36 flex-grow'>
        <div className='w-full flex justify-center relative'>
          <img src={USER_PROFILE_BG_URL} alt="" className='absolute w-full h-30' />
        </div>
        <div className="card card-side  shadow-2xl w-[98%] flex flex-col t-0 mt-10 sm:px-5 sm:ml-2 mb-4 ">
          <div className="avatar ml-4 sm:ml-0">
            <div className=" w-36 h-36 sm:w-38 sm:h-38 rounded-xl ">
              <img src={profileData?.photoUrl} className='object-cover object-center' />
            </div>
          </div>
          <div className="card-body left-0 sm:-ml-5">
            <h2 className="card-title text-2xl sm:text-2xl font-bold">{profileData?.firstName} {profileData?.lastName} <span className='text-sm'>▸{isConnected ? "1st" : id==null ? "You" : "2nd+"}</span></h2>
            <p className='pb-5 text-sm sm:text-lg'>{profileData?.about}</p>
            {id ?
              <div className="card-actions justify-start">
                {
                  isConnected
                    ?
                    <button className="btn btn-primary" onClick={handleMessageClick}>
                      Message
                    </button>
                    :
                    <button className="btn btn-primary" onClick={handleConnectClick}>
                      Connect
                    </button>
                }
              </div> :
              <div className="card-actions justify-start btn-square">
                <button className="btn btn-primary" onClick={() => navigate('/profile/edit')}>Edit</button>
              </div>
            }
          </div>
        </div>
        {profileData.education ? <Education education={profileData?.education} /> : ''}
        {profileData.skills ? <Skills skills={profileData?.skills} /> : ''}
      </div>
    </>
  )
}

export default Profile
