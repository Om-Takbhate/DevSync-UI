import React, { useEffect, useState } from 'react'
import List from './List'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addRequests } from '../utils/store/slices/userRequests'
import { useDispatch, useSelector } from 'react-redux'

const Requests = () => {

    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests.requests)

    const fetchConnectionRequests = async () => {
        try{

            const res = await axios.get(BASE_URL + `/user/requests/recieved`, { withCredentials: true })
            const requests = res?.data.data
            dispatch(addRequests(requests))
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if(requests.length == 0) fetchConnectionRequests()
    }, [])


    return (
        <div className='flex-grow pt-5 px-5 mb-20 w-[98%] sm:w-[80%] mx-auto'>
            <h1 className='text-2xl font-bold text-center mb-5'>Requests</h1>
            {/* {connections.length != 0 && <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5 flex-grow'>
                {
                    connections?.map(connection => <Link to={`/profile/${connection._id}`} key={connection._id} className='mx-auto'><UserCard isConnected={true} user={connection} /></Link>)
                }
            </div>} */}

            {
                <List listItems={requests} />
            }

            {requests?.length == 0 && <h2>No Reuests recieved</h2>}
        </div>
    )
}

export default Requests