import React from 'react'
import { USER_PROFILE_BG_URL } from '../../utils/constants'
import SkillsSkeleton from './SkillsSkeleton'

const ProfileSkeleton = () => {
    return (
        <div>
            <>
                {/* {showToast ? <Toast show={showToast} message={message} /> : ''} */}
                <div className='flex justify-start items-start mt-0  w-full  flex-col mb-36 flex-grow'>
                    <div className='w-full flex justify-center relative'>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
                    <div className="card card-side  absolute  shadow-2xl w-[98%] flex flex-col t-0 mt-10 sm:px-5 sm:ml-2 mb-4 ">
                        <div className="avatar ml-4 sm:ml-0">
                            <div className=" w-36 h-36 sm:w-38 sm:h-38 rounded-xl ">
                                <div className="skeleton w-36 h-36 sm:w-38 sm:h-38 rounded-xl bg-gray-950 "></div>
                                {/* <img src={profileData?.photoUrl} className='object-cover object-center' /> */}
                            </div>
                        </div>
                        <div className="card-body left-0 sm:-ml-5">
                            {/* <h2 className="card-title text-2xl sm:text-2xl font-bold">{profileData?.firstName} {profileData?.lastName}</h2> */}

                            <div className="flex w-full sm:w-52 flex-col gap-4">
                                <div className="skeleton h-4 w-full"></div>
                            </div>

                            {/* <p className='pb-5 text-sm sm:text-lg'>{profileData?.about}</p> */}
                            <div className="flex w-full sm:w-[70%] flex-col gap-4">

                                <div className="skeleton h-4 w-full"></div>
                            </div>
                            {/* {id ?
                                <div className="card-actions justify-start">
                                    <button className="btn btn-primary">
                                        Connect
                                    </button>
                                </div> :
                                <div className="card-actions justify-start btn-square">
                                    <button className="btn btn-primary" onClick={() => navigate('/profile/edit')}>Edit</button>
                                </div>
                            } */}
                        </div>
                    </div>

                    <SkillsSkeleton />

                </div>
            </>
        </div>
    )
}

export default ProfileSkeleton