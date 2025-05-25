import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import List from './List'
import { addConnections } from '../utils/store/slices/userConnectionSlice'
import axios from 'axios'
import Pagination from './Pagination'
import { BASE_URL } from '../utils/constants'
import ConnectionsSkeleton from './skeletons/ConnectionsSkeleton'

const Connections = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [hasConnections, setHasConnections] = useState(true)
    const dispatch = useDispatch()

    const connections = useSelector(store => store.userConnections.connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections?page=${currentPage}`, { withCredentials: true });
            dispatch(addConnections(res?.data.data));
            let hasAnyConnections = res?.data.data.length == 0
            setHasConnections(prev => (!hasAnyConnections))
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        fetchConnections();

    }, [currentPage])

    if (connections.length == 0 && hasConnections) {
        return <ConnectionsSkeleton />
    }

    return (
        <div className='flex-grow pt-5 px-5 mb-20 w-[98%] sm:w-[80%] mx-auto'>
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

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Connections