import React from 'react'
import Spinner from './Spinner'

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center h-[100vh]'>
        <Spinner />
    </div>
  )
}

export default Loader