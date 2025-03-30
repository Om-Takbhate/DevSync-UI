import React from 'react'

const Skills = ({ skills }) => {
    return (
        <div className='shadow-2xl sm:ml-2 rounded-lg bg-base-100 w-[98%] hover:bg-base-200 hover:cursor-pointer'>
            {skills.length != 0 && <div className='px-3 py-10'>
                    <h2 className='text-2xl font-bold mb-4 ml-3'>Skills</h2>
                    <div className=''>
                        {
                            skills.map(skill =>
                                <button key={skill} className="btn m-1  btn-neutral">
                                    {skill}
                                </button>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Skills