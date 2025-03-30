const UserCard = ({ user, isConnected, onClick }) => {
    return (
        <div className="card bg-base-200  w-56 hover:bg-base-300 hover:shadow-lg transition-shadow duration-100 shadow-base-300 ">
            <div className="avatar pt-2">
                <div className="w-24 mx-auto rounded-full">
                    <img src={user?.photoUrl} />
                </div>
            </div>
            <div className="card-body items-center text-center">
                <h2 className="card-title ">{user?.firstName} {user?.lastName}</h2>
                <p className="text-xs pb-2 w-[60%]">{user?.about.slice(0, 20) + '...'}</p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={(e) => onClick(e, user)}>{isConnected ? 'Message' : 'Connect'}</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard