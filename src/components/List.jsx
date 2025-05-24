import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addRequests, removeRequest } from '../utils/store/slices/userRequests'
import { addSingleConnection } from '../utils/store/slices/userConnectionSlice'
import { removeOneUserFromFeed } from '../utils/store/slices/userFeedSlice'

const List = ({ listItems }) => {
    const dispatch = useDispatch()

    const handleAcceptRejectClick = async (e, listItem) => {
        try {

            e.preventDefault()

            if (listItem?.fromUserId == undefined) return

            const requestId = listItem?._id
            const fromUserId = listItem?.fromUserId?._id
            const review = e.target.textContent == 'Reject' ? 'rejected' : 'accepted'

            const res = await axios.post(BASE_URL + '/request/review/' + review + `/${requestId}`, {}, { withCredentials: true })

            if (review == 'accepted') {
                dispatch(addSingleConnection([listItem.fromUserId]))
                dispatch(removeRequest(requestId))
                dispatch(removeOneUserFromFeed(fromUserId))
            }
            else {
                dispatch(removeRequest(requestId))
                dispatch(removeOneUserFromFeed(fromUserId))
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    if (!listItems) return

    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md mt-10">
                {
                    listItems && listItems?.map((listItem, index) =>
                        listItem && <Link to={`/profile/${listItem?.fromUserId?._id || listItem?._id}`} key={listItem?._id || listItem?.fromUserId?._id} className=' shadow-md hover:cursor-pointer bg-base-200 my-1 '>
                            <li className="list-row hover:bg-base-300">
                                <div><img className="size-15 rounded-box object-cover object-center" src={listItem?.photoUrl || listItem?.fromUserId?.photoUrl} /></div>
                                <div className={`flex sm:flex-row  justify-between ${listItem?.fromUserId ? 'flex-col' : ''} items-center`}>
                                    <div className=''>
                                        <div className='text-lg font-bold'>{listItem?.firstName || listItem?.fromUserId?.firstName} {listItem?.lastName || listItem?.fromUserId?.lastName}</div>
                                        <div className="text-xs   opacity-60 h-4 overflow-hidden"><p className='text-xs overflow-hidden w-[90%]'>{listItem?.about?.slice(0,30)  || listItem?.fromUserId?.about.slice(0,30) + '...'}</p></div>
                                    </div>
                                    <div className='flex gap-2 mt-3 sm:mt-0 justify-end'>

                                        <button className="btn btn-ghost flex justify-center items-center btn-neutral btn-outline " onClick={(e) => handleAcceptRejectClick(e, listItem, index)}>
                                            {listItem?.fromUserId ? "Accept" : "Message"}
                                        </button>
                                        {
                                            listItem?.fromUserId && <button className="btn btn-ghost btn-outline btn-error flex justify-center items-center " onClick={(e) => handleAcceptRejectClick(e, listItem, index)}>
                                                Reject
                                            </button>
                                        }
                                    </div>
                                </div>
                            </li>
                        </Link>)
                }


            </ul>
        </>
    )
}

export default List