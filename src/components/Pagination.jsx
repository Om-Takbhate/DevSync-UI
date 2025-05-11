import React from 'react'

const Pagination = ({currentPage, setCurrentPage}) => {
    return (
        <div className=" join inline">
            <button className="join-item btn" onClick={() => setCurrentPage(prev => prev-1)} >«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={() => setCurrentPage(prev => prev+1)} >»</button>
        </div>
    )
}

export default Pagination