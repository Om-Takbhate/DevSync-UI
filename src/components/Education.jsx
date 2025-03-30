const Education = ({ education }) => {
    return (
        <div className='shadow-2xl sm:ml-2 rounded-lg bg-base-100 w-[98%] mb-6 rounded-xl'>
            {education.length != 0 && <div className='px-3 py-10'>
                <h2 className='text-2xl font-bold mb-4 ml-3'>Education</h2>
                <div className=''>
                    {
                        education.map(edu =>
                            <div key={edu.name} className="w-[100%] shadow-lg py-4 my-2 px-3 bg-base-200 my-4 hover:cursor-pointer hover:bg-base-300 rounded-md ">
                                <div className="w-[100%] px-3">
                                    <h2 key={edu.name} className=" flex justify-between items-center text-xl font-medium">
                                        {edu.name}
                                        <p className="text-xs sm:text-sm ml-3 font-normal">- {edu?.field}</p>

                                    </h2>
                                    <span className="text-sm sm:text-md font-thin">{edu.fromYear} - {edu.toYear}</span>
                                </div>
                                <div className="mt-3">
                                    {
                                        edu?.subjects.map(subject =>
                                            <button key={subject} className="btn  btn-neutral m-1">
                                                {subject}
                                            </button>)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Education