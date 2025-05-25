import React from 'react'

const ConnectionsSkeleton = () => {
    return (
        <div className='flex-grow pt-5 px-5 mb-20 mt-18 w-[98%] sm:w-[80%] mx-auto'>
            <div className="flex w-full flex-col gap-4 mt-3">
                <div className="skeleton h-24 w-full">
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 mt-3">
                <div className="skeleton h-24 w-full">
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 mt-3">
                <div className="skeleton h-24 w-full">
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 mt-3">
                <div className="skeleton h-24 w-full">
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 mt-3">
                <div className="skeleton h-24 w-full">
                </div>
            </div>
        </div>
    )
}

export default ConnectionsSkeleton