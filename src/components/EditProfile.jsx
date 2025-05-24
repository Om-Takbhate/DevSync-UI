import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Spinner from './Spinner'
import { addUser } from "../utils/store/slices/userSlice";

const EditProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [about, setAbout] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [skills, setSkills] = useState([]);
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false)
    const [age, setAge] = useState('');
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()



    const profileData = useSelector(store => store?.user?.user)
    const handleSaveChanges = async () => {
        setMessage('')
        try {
            setLoading(prev => true)
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                about, firstName, lastName, photoUrl, gender, skills
            }, { withCredentials: true })
            const updatedUser = res.data.user

            setMessage(res.data.message)
            dispatch(addUser(updatedUser))
        }
        catch (err) {
            console.log(err)
            setMessage(err?.response?.data)
        }
        finally {
            setLoading(prev => false)
        }
    }

    useEffect(() => {
        if (profileData) {
            setFirstName(profileData?.firstName ?? '');
            setLastName(profileData?.lastName ?? '');
            setAbout(profileData?.about ?? '');
            setPhotoUrl(profileData?.photoUrl ?? '');
            setSkills(profileData?.skills.join(' , ') ?? '');
            setGender(profileData?.gender ?? '');
            setAge(profileData?.age ?? '');
        }
    }, [profileData]);


    if (profileData == null) return

    return (
        <div className='mt-3 flex-grow '>
            <h1 className="text-3xl text-center font-bold">Edit Profile</h1>
            <div className="flex-grow mx-2 flex mt-4 mb-4 justify-center items-center mx-3">
                <div className="card card-side bg-base-300 shadow-sm px-5 py-5 flex justify-center items-center sm:flex-row flex-col gap-2 ">
                    <figure>
                        <img
                            className="w-24 h-24 sm:w-36 sm:h-36 object-cover object-centre"
                            src={profileData?.photoUrl}
                            alt="Movie" />
                    </figure>
                    <div className="card-body sm:w-[80%] ">
                        <div className="flex justify-center items-center gap-3 flex-col">
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                <input type="input" required placeholder="First name" minLength="2" maxLength="30"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="focus:outline-none focus:border-none " />
                            </label>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>

                                <input type="input" required placeholder="Last name" pattern="[A-Za-z][A-Za-z]*" minLength="3" maxLength="30" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="focus:outline-none focus:border-none"
                                />
                            </label>
                            <label className="input">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></g></svg>
                                <input type="text" className="grow" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" />
                            </label>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></svg>
                                <input type="url" placeholder="https://" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$" />
                            </label>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                                <input type="text" placeholder="Enter comma seperated skills" value={skills} minLength={3} onChange={(e) => setSkills(e.target.value)} />
                            </label>
                            <div className="flex justify-start items-center">
                                <label>Gender</label>
                                <div className="flex justify-center">
                                    <div className="mx-4">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            className="radio cursor-pointer"
                                            checked={gender === "male"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label htmlFor="male" className="mx-2 cursor-pointer">Male</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            className="radio cursor-pointer"
                                            checked={gender === "female"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <label htmlFor="female" className="mx-2 cursor-pointer">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {message ? <p className={`w-54 ${message.includes('Your profile') ? 'text-green-700' : 'text-red-600'}`} >{message}</p> : ''}
                        <button className="btn btn-secondary mt-3" disabled={loading} onClick={handleSaveChanges} >{loading ? <Spinner /> :  "Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile