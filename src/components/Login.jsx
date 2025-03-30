import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/store/slices/userSlice'

const Login = () => {

  const user = useSelector(store => store?.user?.user)

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  axios.defaults.withCredentials = true
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    try {
      setError('')
      const res = await axios.post(BASE_URL + '/login', {
        emailId, password
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      navigate('/')
    }
    catch (err) {
      // let errorMessage = err?.response?.data?.error || ("something went wrong")
      // setError(errorMessage)
    }
  }

  const handleSinupClick = async() => {
    try {
      const res = await axios.post(BASE_URL + '/signup', {
        emailId,password,firstName,lastName
      },{withCredentials: true})

      dispatch(addUser(res?.data?.data))
      navigate('/profile/edit')
    }
    catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if(user) navigate('/')
  },[user])

  return (
    <div className='flex justify-center items-center my-10 flex-grow mx-6 sm:mx-4'>
      <div className="card bg-base-100 w-96 shadow-xl bg-base-300">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login" : 'Sign Up'}</h2>
          <div className=''>
            {!isLogin ?
              <> <label className="form-control w-full max-w-lg my-6">
                <div className="label my-2">
                  <span className="label-text">First Name</span>
                </div>
                <input type="text" value={firstName} placeholder='Enter your first name' onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs border-none outline-none" />
              </label>
                <label className="form-control w-full max-w-lg my-6">
                  <div className="label my-2">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input type="text" value={lastName} placeholder='Enter your last name' onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs border-none outline-none" />
                </label>
              </> : ''
            }
            <label className="form-control w-full max-w-lg my-6">
              <div className="label my-2">
                <span className="label-text">Email Id</span>
              </div>
              <input type="text" value={emailId} placeholder='Enter your email here' onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs border-none outline-none" />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input type="password" placeholder='Enter your password here' value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs border-none outline-none" />
            </label>
          </div>
          {error ? <p className='my-1 text-red-500 font-sans'>{error}</p> : ""}
          <div className="card-actions justify-center mt-4">
            <button onClick={isLogin ? handleLoginClick : handleSinupClick} className="btn btn-primary">{isLogin ? "Login" : 'Sign Up'}</button>
          </div>
          <p className='mx-auto mt-3 cursor-pointer' onClick={() => setIsLogin(prev => !prev)}>{isLogin ? "New user? Sign up now" : "Already have an accound? Login"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login