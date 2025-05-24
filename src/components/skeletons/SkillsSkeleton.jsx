import React from 'react'

const SkillsSkeleton = () => {
    return (
        <div className='shadow-2xl sm:ml-2 mt-64 rounded-lg bg-base-100 w-[98%] hover:bg-base-200 hover:cursor-pointer'>
            <div className=''>
                <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-32 w-full">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillsSkeleton