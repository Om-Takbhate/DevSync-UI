import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import List from './List'
import { addConnections } from '../utils/store/slices/userConnectionSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Connections = () => {
    
    const dispatch = useDispatch()
    const connections = useSelector(store => store.userConnections.connections)
    const fetchConnections = async () => {
        if(connections.length != 0) return
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            dispatch(addConnections(res?.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };
    
    useEffect(()=>{
        if(connections.length !=0 ) return
        fetchConnections();

    }, [])

    return (
        <div className='flex-grow pt-5 px-5 mb-20 w-[98%] sm:w-[80%] mx-auto flex-grow'>
            <h1 className='text-2xl font-bold text-center '>Connections</h1>
            {/* {connections?.length != 0 && <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-5 flex-grow'>
                {
                    connections?.map(connection => <Link to={`/profile/${connection._id}`} key={connection._id} className='mx-auto'><UserCard isConnected={true} user={connection} /></Link>)
                }
            </div>} */}

            {connections.length > 0 ?
                (
                    <List listItems={connections} />
                ) : <h2>No Connections</h2>
            }

        </div>
    )
}

export default Connections